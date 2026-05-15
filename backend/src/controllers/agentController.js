const { supabase } = require('../lib/supabase')
const OpenAI = require('openai')
const { generateSystemPrompt, generateContextPrompt } = require('../helpers/systemPrompt')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Criar novo agente
 */
async function createAgent(req, res) {
  try {
    const userId = req.user?.id // Do middleware de autenticação
    const {
      name,
      type,
      businessName,
      businessDescription,
      tone,
      businessInfo,
      customInstructions,
    } = req.body

    // Validação
    if (!name || !type || !businessName) {
      return res.status(400).json({
        error: 'Nome do agente, tipo e nome da empresa são obrigatórios',
      })
    }

    // Gerar system prompt
    const systemPrompt = generateSystemPrompt({
      name,
      type,
      businessName,
      businessDescription,
      tone: tone || 'professional',
      businessInfo,
    })

    // Salvar agente no Supabase
    const { data: agent, error: dbError } = await supabase
      .from('agents')
      .insert({
        user_id: userId,
        name,
        type,
        business_name: businessName,
        business_description: businessDescription,
        tone: tone || 'professional',
        business_info: businessInfo,
        system_prompt: systemPrompt,
        custom_instructions: customInstructions,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()

    if (dbError) {
      console.error('Database error:', dbError)
      return res.status(500).json({ error: 'Erro ao criar agente no banco de dados' })
    }

    return res.status(201).json({
      success: true,
      message: 'Agente criado com sucesso',
      agent: agent[0],
    })
  } catch (error) {
    console.error('Create agent error:', error)
    res.status(500).json({ error: error.message })
  }
}

/**
 * Listar agentes do usuário
 */
async function listAgents(req, res) {
  try {
    const userId = req.user?.id

    const { data: agents, error: dbError } = await supabase
      .from('agents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (dbError) {
      return res.status(500).json({ error: 'Erro ao listar agentes' })
    }

    return res.json({
      success: true,
      agents: agents || [],
      total: agents?.length || 0,
    })
  } catch (error) {
    console.error('List agents error:', error)
    res.status(500).json({ error: error.message })
  }
}

/**
 * Obter detalhes de um agente
 */
async function getAgent(req, res) {
  try {
    const { id } = req.params
    const userId = req.user?.id

    const { data: agent, error: dbError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (dbError) {
      return res.status(404).json({ error: 'Agente não encontrado' })
    }

    return res.json({
      success: true,
      agent,
    })
  } catch (error) {
    console.error('Get agent error:', error)
    res.status(500).json({ error: error.message })
  }
}

/**
 * Atualizar agente
 */
async function updateAgent(req, res) {
  try {
    const { id } = req.params
    const userId = req.user?.id
    const updates = req.body

    // Se alterar configurações que afetam o system prompt, regenerar
    if (
      updates.businessName ||
      updates.tone ||
      updates.businessDescription ||
      updates.businessInfo
    ) {
      // Buscar agente atual
      const { data: agent } = await supabase
        .from('agents')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .single()

      // Gerar novo system prompt
      const newSystemPrompt = generateSystemPrompt({
        ...agent,
        ...updates,
      })

      updates.system_prompt = newSystemPrompt
    }

    updates.updated_at = new Date().toISOString()

    const { data: updatedAgent, error: dbError } = await supabase
      .from('agents')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()

    if (dbError) {
      return res.status(500).json({ error: 'Erro ao atualizar agente' })
    }

    return res.json({
      success: true,
      message: 'Agente atualizado com sucesso',
      agent: updatedAgent[0],
    })
  } catch (error) {
    console.error('Update agent error:', error)
    res.status(500).json({ error: error.message })
  }
}

/**
 * Deletar agente
 */
async function deleteAgent(req, res) {
  try {
    const { id } = req.params
    const userId = req.user?.id

    const { error: dbError } = await supabase
      .from('agents')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (dbError) {
      return res.status(500).json({ error: 'Erro ao deletar agente' })
    }

    return res.json({
      success: true,
      message: 'Agente deletado com sucesso',
    })
  } catch (error) {
    console.error('Delete agent error:', error)
    res.status(500).json({ error: error.message })
  }
}

/**
 * Enviar mensagem para o agente e obter resposta da IA
 */
async function chatWithAgent(req, res) {
  try {
    const { id } = req.params
    const userId = req.user?.id
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Mensagem é obrigatória' })
    }

    // Buscar agente
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (agentError || !agent) {
      return res.status(404).json({ error: 'Agente não encontrado' })
    }

    // Buscar histórico de conversas
    const { data: conversations } = await supabase
      .from('conversations')
      .select('messages')
      .eq('agent_id', id)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)

    let messages = [
      {
        role: 'system',
        content: agent.system_prompt,
      },
    ]

    // Adicionar histórico
    if (conversations?.length > 0 && conversations[0].messages) {
      const conversationMessages = JSON.parse(conversations[0].messages)
      messages = messages.concat(conversationMessages.slice(-10)) // Últimas 10 mensagens
    }

    // Adicionar nova mensagem
    messages.push({
      role: 'user',
      content: message,
    })

    // Chamar OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: messages.filter((m) => m.role !== 'system').map((m) => ({
        role: m.role,
        content: m.content,
      })),
      system_prompt: agent.system_prompt,
      temperature: 0.7,
      max_tokens: 1000,
    })

    const aiResponse = response.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.'

    // Preparar histórico para salvar
    const updatedMessages = [
      ...messages.filter((m) => m.role !== 'system'),
      {
        role: 'assistant',
        content: aiResponse,
      },
    ]

    // Buscar ou criar conversa
    const { data: existingConversation } = await supabase
      .from('conversations')
      .select('id')
      .eq('agent_id', id)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)

    if (existingConversation?.length > 0) {
      // Atualizar conversa existente
      await supabase
        .from('conversations')
        .update({
          messages: JSON.stringify(updatedMessages),
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingConversation[0].id)
    } else {
      // Criar nova conversa
      await supabase.from('conversations').insert({
        agent_id: id,
        user_id: userId,
        messages: JSON.stringify(updatedMessages),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    }

    // Registrar interação
    await supabase.from('interactions').insert({
      agent_id: id,
      user_id: userId,
      user_message: message,
      ai_response: aiResponse,
      created_at: new Date().toISOString(),
    })

    return res.json({
      success: true,
      response: aiResponse,
      agentId: id,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: error.message })
  }
}

/**
 * Obter histórico de conversas
 */
async function getConversations(req, res) {
  try {
    const { id } = req.params
    const userId = req.user?.id

    // Verificar se agente pertence ao usuário
    const { data: agent } = await supabase
      .from('agents')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)

    if (!agent?.length) {
      return res.status(404).json({ error: 'Agente não encontrado' })
    }

    // Buscar conversas
    const { data: conversations } = await supabase
      .from('conversations')
      .select('*')
      .eq('agent_id', id)
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    // Parsear mensagens
    const formattedConversations = (conversations || []).map((conv) => ({
      ...conv,
      messages: JSON.parse(conv.messages || '[]'),
    }))

    return res.json({
      success: true,
      conversations: formattedConversations,
      total: formattedConversations.length,
    })
  } catch (error) {
    console.error('Get conversations error:', error)
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createAgent,
  listAgents,
  getAgent,
  updateAgent,
  deleteAgent,
  chatWithAgent,
  getConversations,
}
