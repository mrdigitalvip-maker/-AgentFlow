/** Gera system prompt para preview no frontend */
export function generateSystemPrompt(agent) {
  const { name = 'Agente', type = 'support', businessName = 'Empresa', businessDescription = '', tone = 'friendly', businessInfo = '' } = agent || {}

  let objective = ''
  let typeDescription = ''
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

  return `Você é ${name}, ${typeDescription} da empresa "${businessName}".\n\nOBJETIVO: ${objective}.\n\nSOBRE A EMPRESA:\n${businessDescription || '-'}\n${businessInfo || ''}\n\nTOM DE VOZ:\n${toneInstructions}\n\nRESPONDA EM PORTUGUÊS COM EDUCAÇÃO E CLAREZA.`
}
