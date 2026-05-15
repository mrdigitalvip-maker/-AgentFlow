# 🤖 Sistema de Agentes com IA - Guia de Configuração

## Instalação

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Configuração das Variáveis de Ambiente

### Backend (.env.local)

```env
# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-chave-de-serviço

# OpenAI
OPENAI_API_KEY=sua-chave-openai

# JWT
JWT_SECRET=agentflow-dev-secret-key
JWT_EXPIRY=7d
```

### Frontend (.env.local)

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_KEY=sua-chave-anonima-aqui
```

## Como Obter as Chaves Necessárias

### 1. Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá para **Settings > API**
4. Copie:
   - `SUPABASE_URL`
   - `service_role` key (para backend)
   - `anon` key (para frontend)

### 2. OpenAI API

1. Acesse [platform.openai.com](https://platform.openai.com)
2. Crie uma conta / faça login
3. Vá para **API Keys**
4. Crie uma nova chave secreta
5. Copie e adicione a `.env.local`

## Criando as Tabelas no Supabase

Execute os seguintes SQL scripts no Supabase SQL Editor:

```sql
-- Tabela de Agentes
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('support', 'sales', 'content', 'analyst')),
  business_name TEXT NOT NULL,
  business_description TEXT,
  tone TEXT NOT NULL DEFAULT 'friendly' CHECK (tone IN ('formal', 'casual', 'friendly')),
  business_info TEXT,
  system_prompt TEXT,
  custom_instructions TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'archived')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Conversas
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  messages JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Interações
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_agents_user_id ON agents(user_id);
CREATE INDEX idx_conversations_agent_id ON conversations(agent_id);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_interactions_agent_id ON interactions(agent_id);
CREATE INDEX idx_interactions_user_id ON interactions(user_id);
```

## Iniciando os Servidores

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

O servidor rodará em `http://localhost:3000`

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

O frontend rodará em `http://localhost:5173`

## Fluxo de Uso

1. **Registre-se** em `http://localhost:5173/register`
2. **Faça login** em `http://localhost:5173/login`
3. **Crie um novo agente** em `http://localhost:5173/agents/create`
   - Preencha as 3 etapas do wizard
   - Visualize o preview do system prompt
4. **Converse com seu agente** em `http://localhost:5173/agents/:id/chat`
   - Envie mensagens e receba respostas da IA
   - O histórico é salvo automaticamente

## Estrutura do Sistema

### Backend Controllers

- `agentController.js` - Lógica de criação, listagem e gerenciamento de agentes
- Integração com OpenAI para gerar respostas de IA

### Backend Helpers

- `systemPrompt.js` - Geração dinâmica de prompts baseado na configuração do agente

### Frontend Components

- `CreateAgent.jsx` - Wizard em 3 etapas para criar novos agentes
- `AgentChat.jsx` - Interface de chat estilo WhatsApp
- `AgentsPage.jsx` - Listagem de agentes do usuário

## Tipos de Agentes

1. **🎧 Suporte ao Cliente** - Resolve dúvidas e problemas
2. **💰 Vendas** - Qualifica leads e fecha vendas
3. **✍️ Conteúdo** - Cria e revisa conteúdo
4. **📊 Análise** - Analisa dados e gera relatórios

## Tons de Voz

1. **Formal** - Linguagem profissional e corporativa
2. **Casual** - Descontraído mas profissional
3. **Amigável** - Empático e acessível

## Troubleshooting

### Erro: "Variáveis de ambiente Supabase não configuradas"

- Verifique se `.env.local` existe no backend
- Confirme que `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` estão preenchidas

### Erro: "OPENAI_API_KEY is required"

- Adicione uma chave válida do OpenAI em `backend/.env.local`
- Verifique se tem crédito na sua conta OpenAI

### Erro: "Agente não encontrado"

- Certifique-se que está logado
- Verifique se o agente foi criado corretamente no Supabase

## Deploy para Produção

### Vercel (Frontend)

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente no Vercel
3. Deploy automático ao fazer push

### Railway / Render (Backend)

1. Conecte seu repositório
2. Configure as variáveis de ambiente
3. Deploy automático

## Próximas Melhorias

- [ ] Histórico persistido de conversas
- [ ] Métricas de uso de agentes
- [ ] Fine-tuning de modelos com dados do usuário
- [ ] Integração com Zapier/Make
- [ ] Webhooks para eventos de agentes
- [ ] API pública para integração com terceiros

## Suporte

Para dúvidas ou problemas, consulte a documentação:
- [Supabase Docs](https://supabase.com/docs)
- [OpenAI Docs](https://platform.openai.com/docs)
- [Express Docs](https://expressjs.com)
