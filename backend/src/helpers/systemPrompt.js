/**
 * Gera um system prompt dinâmico para o agente baseado em suas configurações
 */
function generateSystemPrompt(agent) {
  const {
    name,
    type,
    businessName,
    businessDescription,
    tone,
    businessInfo,
    language = 'pt-BR'
  } = agent

  let objective = ''
  let typeDescription = ''

  // Definir objetivo baseado no tipo de agente
  switch (type) {
    case 'support':
      objective = 'resolver dúvidas e problemas dos clientes de forma rápida e eficiente'
      typeDescription = 'um agente de suporte ao cliente'
      break
    case 'sales':
      objective = 'qualificar leads, apresentar produtos e fechar vendas'
      typeDescription = 'um agente de vendas'
      break
    case 'content':
      objective = 'criar, revisar e gerar conteúdo de alta qualidade'
      typeDescription = 'um agente criador de conteúdo'
      break
    case 'analyst':
      objective = 'analisar dados, gerar insights e relatórios'
      typeDescription = 'um agente analista'
      break
    default:
      objective = 'ajudar o usuário com suas necessidades'
      typeDescription = 'um agente assistente'
  }

  // Definir tom de voz
  let toneInstructions = ''
  switch (tone) {
    case 'formal':
      toneInstructions = 'Use linguagem profissional, evite gírias e mantenha um tom corporativo.'
      break
    case 'casual':
      toneInstructions = 'Use linguagem descontraída, pode usar gírias moderadas. Seja amigável mas profissional.'
      break
    case 'friendly':
      toneInstructions = 'Seja extremamente amigável, empático e acessível. Use emojis e expressões calorosas.'
      break
    default:
      toneInstructions = 'Use um tom profissional e amigável.'
  }

  // Construir o prompt
  const prompt = `Você é ${name}, ${typeDescription} da empresa "${businessName}".

OBJETIVO: Seu principal objetivo é ${objective}.

SOBRE A EMPRESA:
${businessDescription || '- Empresa em crescimento focada em excelência'}
${businessInfo || ''}

TOM DE VOZ:
${toneInstructions}

INSTRUÇÕES GERAIS:
1. Sempre seja educado, respeitoso e profissional
2. Se não souber a resposta, ofereça alternativas ou escale para um humano
3. Evite fazer promessas que não pode cumprir
4. Sempre mantenha o contexto da conversa em mente
5. Responda em português (${language})
6. Forneça respostas diretas e úteis
7. Se o usuário for rude, mantenha a compostura e continue ajudando

CONTEXTO IMPORTANTE:
- Você é um assistente de IA, não um humano
- Você pode cometer erros ocasionalmente
- Você deve reconhecer suas limitações
- Priorize sempre a segurança e privacidade do usuário

RESPONDA COM PRECISÃO E CLAREZA.`

  return prompt
}

/**
 * Gera um prompt para melhorar a resposta do agente com contexto de conversa
 */
function generateContextPrompt(conversationHistory, newMessage) {
  // Limitar histórico aos últimos 10 mensagens para não sobrecarregar
  const recentHistory = conversationHistory.slice(-10)

  let contextText = 'HISTÓRICO DA CONVERSA:\n'

  recentHistory.forEach((msg) => {
    const role = msg.role === 'user' ? 'USUÁRIO' : 'VOCÊ'
    contextText += `${role}: ${msg.content}\n`
  })

  contextText += `\nUSUÁRIO: ${newMessage}`

  return contextText
}

module.exports = {
  generateSystemPrompt,
  generateContextPrompt
}
