const express = require('express')
const router = express.Router()
const {
  createAgent,
  listAgents,
  getAgent,
  updateAgent,
  deleteAgent,
  chatWithAgent,
  getConversations,
} = require('../controllers/agentController')

// Middleware para verificar autenticação (você precisará implementar)
const authMiddleware = (req, res, next) => {
  // TODO: Implementar verificação de token JWT
  // Por enquanto, mock para testes
  req.user = { id: 'user-uuid' }
  next()
}

router.use(authMiddleware)

// POST /api/agents - Criar novo agente
router.post('/create', createAgent)

// GET /api/agents - Listar agentes do usuário
router.get('/', listAgents)

// GET /api/agents/:id - Obter detalhes de um agente
router.get('/:id', getAgent)

// PUT /api/agents/:id - Atualizar agente
router.put('/:id', updateAgent)

// DELETE /api/agents/:id - Deletar agente
router.delete('/:id', deleteAgent)

// POST /api/agents/:id/chat - Enviar mensagem para o agente
router.post('/:id/chat', chatWithAgent)

// GET /api/agents/:id/conversations - Obter histórico de conversas
router.get('/:id/conversations', getConversations)

module.exports = router
