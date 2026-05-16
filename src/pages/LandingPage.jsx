import React from 'react'
import { Link } from 'react-router-dom'

const GradientButton = ({ children }) => (
  <button className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-black px-5 py-3 rounded-md font-semibold">
    {children}
  </button>
)

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-inter">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-white font-bold text-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">AgentFlow</div>
          <nav className="hidden md:flex gap-6 text-gray-300">
            <a href="#produto">Produto</a>
            <a href="#precos">Preços</a>
            <a href="#sobre">Sobre</a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-gray-300">Entrar</Link>
          <Link to="/register" className="px-4 py-2 bg-[#7C3AED] rounded-md">Começar Grátis</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="text-center py-12">
          <div className="inline-flex items-center gap-2 text-sm bg-gray-800 px-3 py-1 rounded-full animate-pulse">🟢 47 empresas ativas agora</div>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-6">Seu Negócio Atendendo e Vendendo 24h — Sem Parar.</h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">Crie agentes de IA que respondem clientes, geram conteúdo e convertem vendas enquanto você foca no crescimento.</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link to="/register"><GradientButton>Começar Grátis</GradientButton></Link>
            <a href="#demo" className="px-5 py-3 border border-gray-700 rounded-md">Ver Demo</a>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
            <div className="bg-gray-900 p-6 rounded-lg">500+ empresas</div>
            <div className="bg-gray-900 p-6 rounded-lg">98% satisfação</div>
            <div className="bg-gray-900 p-6 rounded-lg">24/7 ativo</div>
          </div>
        </section>

        <section id="dores" className="mt-12">
          <h2 className="text-2xl font-bold">Os principais problemas</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="bg-red-900 p-6 rounded-lg">Leads perdidos por falta de resposta rápida</div>
            <div className="bg-red-900 p-6 rounded-lg">Atendimento inconsistente e lento</div>
            <div className="bg-red-900 p-6 rounded-lg">Conteúdo que nunca sai no prazo</div>
          </div>
        </section>

        <section id="solucao" className="mt-12">
          <h2 className="text-2xl font-bold">Soluções</h2>
          <div className="mt-4 grid md:grid-cols-4 gap-4">
            <div className="bg-[#0f0b1a] p-6 rounded-lg border border-gray-800">🤖 Agente de Atendimento</div>
            <div className="bg-[#0f0b1a] p-6 rounded-lg border border-gray-800">💰 Agente de Vendas</div>
            <div className="bg-[#0f0b1a] p-6 rounded-lg border border-gray-800">✍️ Agente de Conteúdo</div>
            <div className="bg-[#0f0b1a] p-6 rounded-lg border border-gray-800">🔄 Agente de Follow-up</div>
          </div>
        </section>

        <section id="precos" className="mt-12">
          <h2 className="text-2xl font-bold">Preços</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="font-bold">STARTER</h3>
              <div className="text-3xl font-extrabold mt-4">R$297<span className="text-sm">/mês</span></div>
              <ul className="mt-4 text-gray-300 space-y-2">
                <li>1 Agente de IA</li>
                <li>Conversas ilimitadas</li>
                <li>Relatórios básicos</li>
                <li>Suporte por email</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border-2 border-[#06B6D4]">
              <div className="text-sm text-yellow-300 font-semibold">MAIS POPULAR</div>
              <h3 className="font-bold mt-2">PRO</h3>
              <div className="text-3xl font-extrabold mt-4">R$597<span className="text-sm">/mês</span></div>
              <ul className="mt-4 text-gray-300 space-y-2">
                <li>3 Agentes de IA</li>
                <li>Analytics avançado</li>
                <li>Integração WhatsApp</li>
                <li>Suporte prioritário</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="font-bold">ENTERPRISE</h3>
              <div className="text-3xl font-extrabold mt-4">R$1.497<span className="text-sm">/mês</span></div>
              <ul className="mt-4 text-gray-300 space-y-2">
                <li>Agentes ilimitados</li>
                <li>API personalizada</li>
                <li>Gestor dedicado</li>
                <li>SLA garantido</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="depoimentos" className="mt-12">
          <h2 className="text-2xl font-bold">Depoimentos</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="bg-gray-900 p-6 rounded-lg">Carlos Silva, clínica estética, São Paulo</div>
            <div className="bg-gray-900 p-6 rounded-lg">Ana Rodrigues, e-commerce de moda, Rio de Janeiro</div>
            <div className="bg-gray-900 p-6 rounded-lg">Pedro Mendes, imobiliária, Belo Horizonte</div>
          </div>
        </section>

        <section className="mt-12 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] p-12 rounded-lg text-black text-center">
          <h3 className="text-2xl font-bold">Comece Hoje e Veja Resultados em 24 Horas</h3>
          <p className="mt-2">Comece agora e veja resultados em 24 horas.</p>
          <div className="mt-6 flex justify-center">
            <Link to="/register" className="bg-white px-6 py-3 rounded-md font-semibold">Comece Agora</Link>
          </div>
        </section>
      </main>

      <footer className="mt-12 bg-[#070707] text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between">
          <div>
            <div className="font-bold text-xl">AgentFlow</div>
            <div className="text-sm mt-2 max-w-md">Agentes de IA para seu negócio 24/7 — automatize atendimento, vendas e conteúdo.</div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex gap-6">
              <a href="#">Produto</a>
              <a href="#">Empresa</a>
              <a href="#">Suporte</a>
            </div>
            <div className="text-sm mt-4">© 2026 AgentFlow</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
