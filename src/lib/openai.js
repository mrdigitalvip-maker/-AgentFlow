const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

export async function sendMessageToAgent(messages = [], systemPrompt = '') {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    if (!apiKey) throw new Error('Chave da OpenAI não configurada (VITE_OPENAI_API_KEY).')

    const payload = {
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt || 'Você é um assistente útil.' },
        ...messages,
      ],
      temperature: 0.2,
      max_tokens: 800,
    }

    const res = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Erro na API OpenAI: ${res.status} - ${errText}`)
    }

    const data = await res.json()
    const msg = data.choices && data.choices[0] && data.choices[0].message
    return msg ? msg.content.trim() : ''
  } catch (err) {
    console.error('sendMessageToAgent error:', err)
    throw new Error(err.message || 'Erro ao comunicar com a OpenAI.')
  }
}

export default sendMessageToAgent
