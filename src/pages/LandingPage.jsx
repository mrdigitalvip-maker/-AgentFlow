import React from 'react'
import { Link } from 'react-router-dom'

const GradientButton = ({ children }) => (
  <button className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-black px-5 py-3 rounded-md font-semibold">{children}</button>
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
          <p className="mt-2">Agende seu agente, treine e comece a atender clientes imediatamente.</p>
          <div className="mt-6 flex justify-center"><Link to="/register" className="bg-white px-6 py-3 rounded-md font-semibold">Comece Agora</Link></div>
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
export default function LandingPage(){
	return (
		<div className="min-h-screen bg-[#0f0f1e] text-white antialiased">
			{/* Navbar */}
			<nav className="max-w-7xl mx-auto flex items-center justify-between py-6 px-6 lg:px-0">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] flex items-center justify-center font-bold">AF</div>
					<span className="text-lg font-semibold">AgentFlow</span>
				</div>

				<div className="hidden md:flex items-center gap-6">
					<a href="#features" className="text-gray-300 hover:text-white">Recursos</a>
					<a href="/pricing" className="text-gray-300 hover:text-white">Preços</a>
					<a href="/agents" className="text-gray-300 hover:text-white">Agentes</a>
					<a href="/pricing" className="px-4 py-2 rounded-md bg-transparent border border-[#2d2d44] text-sm">Contato</a>
				</div>

				<div className="flex items-center gap-3">
					<a href="/login" className="text-gray-300 hover:text-white">Entrar</a>
					<a href="/register" className="hidden md:inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-sm font-semibold">Começar grátis</a>
				</div>
			</nav>

			{/* Hero */}
			<header className="max-w-7xl mx-auto px-6 lg:px-0 mt-12">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div>
						<div className="inline-flex items-center gap-3 bg-green-900/20 text-green-400 px-3 py-1 rounded-full text-sm mb-6 animate-pulse">
							<span>🟢</span>
							<span>47 empresas ativas agora</span>
						</div>

						<h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
							Seu Negócio <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]">Atendendo e Vendendo 24h</span>
							<br />— Sem Parar
						</h1>

						<p className="text-gray-400 max-w-xl mb-6">Agentes de IA personalizados que atendem clientes, qualificam leads e geram conteúdo com tom de voz adaptado à sua marca.</p>

						<div className="flex flex-wrap gap-3">
							<a href="/register" className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] font-semibold">Começar Grátis</a>
							<a href="#demo" className="px-6 py-3 rounded-full border border-[#2d2d44] text-gray-300">Ver Demo</a>
						</div>
					</div>

					<div>
						<div className="bg-[#11121f] border border-[#2d2d44] rounded-2xl p-6 shadow-lg">
							<h4 className="text-white font-bold mb-3">Demonstração Rápida</h4>
							<div className="space-y-2 text-sm text-gray-300">
								<div className="bg-[#0f1220] p-3 rounded">Cliente: "Qual é o status do meu pedido?"</div>
								<div className="bg-[#071428] p-3 rounded text-[#cfe]">Agente: "Olá! Seu pedido #1234 saiu para entrega ontem às 14:32."</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Pain points */}
			<section className="max-w-7xl mx-auto px-6 lg:px-0 mt-16 grid md:grid-cols-3 gap-6">
				<div className="p-6 bg-[#11121f] border border-[#2d2d44] rounded-lg">
					<h3 className="font-bold text-lg mb-2">Perda de oportunidades</h3>
					<p className="text-gray-400">Clientes entram em contato fora do horário e perdem vendas — nossos agentes atuam 24/7.</p>
				</div>
				<div className="p-6 bg-[#11121f] border border-[#2d2d44] rounded-lg">
					<h3 className="font-bold text-lg mb-2">Respostas inconsistentes</h3>
					<p className="text-gray-400">Padronize o atendimento com um sistema prompt personalizado para sua marca.</p>
				</div>
				<div className="p-6 bg-[#11121f] border border-[#2d2d44] rounded-lg">
					<h3 className="font-bold text-lg mb-2">Custo com equipe</h3>
					<p className="text-gray-400">Automatize tarefas repetitivas e foque sua equipe no que agrega mais valor.</p>
				</div>
			</section>

			{/* Features */}
			<section id="features" className="max-w-7xl mx-auto px-6 lg:px-0 mt-16">
				<h2 className="text-2xl font-bold mb-6">Recursos principais</h2>
				<div className="grid md:grid-cols-4 gap-4">
					<div className="p-4 bg-[#11121f] border border-[#2d2d44] rounded-lg">
						<h4 className="font-semibold mb-2">Atendimento</h4>
						<p className="text-sm text-gray-400">Respostas rápidas e contextualizadas para clientes.</p>
					</div>
					<div className="p-4 bg-[#11121f] border border-[#2d2d44] rounded-lg">
						<h4 className="font-semibold mb-2">Vendas</h4>
						<p className="text-sm text-gray-400">Qualificação de leads e scripts de vendas automatizados.</p>
					</div>
					<div className="p-4 bg-[#11121f] border border-[#2d2d44] rounded-lg">
						<h4 className="font-semibold mb-2">Conteúdo</h4>
						<p className="text-sm text-gray-400">Geração de textos, postagens e templates.</p>
					</div>
					<div className="p-4 bg-[#11121f] border border-[#2d2d44] rounded-lg">
						<h4 className="font-semibold mb-2">Follow-up</h4>
						<p className="text-sm text-gray-400">Lembretes e acompanhamento automático de leads.</p>
					</div>
				</div>
			</section>

			{/* Pricing */}
			<section className="max-w-7xl mx-auto px-6 lg:px-0 mt-16">
				<h2 className="text-2xl font-bold mb-6">Planos</h2>
				<div className="grid md:grid-cols-3 gap-6">
					<div className="p-6 bg-[#11121f] border border-[#2d2d44] rounded-lg">
						<h3 className="font-bold text-lg">Starter</h3>
						<p className="text-4xl font-extrabold text-[#7C3AED] mt-4">R$297</p>
						<p className="text-sm text-gray-400 mt-2">Ideal para freelancers e pequenos negócios</p>
					</div>

					<div className="p-6 bg-gradient-to-tr from-[#171524] to-[#0f1220] border-2 border-[#7C3AED] rounded-lg shadow-lg">
						<h3 className="font-bold text-lg">Pro</h3>
						<p className="text-4xl font-extrabold text-white mt-4">R$597</p>
						<p className="text-sm text-gray-300 mt-2">Equipe em crescimento — mais controles e integrações</p>
					</div>

					<div className="p-6 bg-[#11121f] border border-[#2d2d44] rounded-lg">
						<h3 className="font-bold text-lg">Enterprise</h3>
						<p className="text-4xl font-extrabold text-[#7C3AED] mt-4">R$1.497</p>
						<p className="text-sm text-gray-400 mt-2">Soluções customizadas e suporte dedicado</p>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="max-w-7xl mx-auto px-6 lg:px-0 mt-16">
				<h2 className="text-2xl font-bold mb-6">Depoimentos</h2>
				<div className="grid md:grid-cols-3 gap-6">
					<blockquote className="p-6 bg-[#11121f] border border-[#2d2d44] rounded-lg text-gray-300">
						“O AgentFlow dobrou nosso SLA de atendimento e ainda aumentou as vendas em 23% — impressionante.”
						<footer className="mt-3 text-sm text-gray-500">— Ana Reis, CEO da Loja Nova</footer>
					</blockquote>
					<blockquote className="p-6 bg-[#11121f] border border-[#2d2d44] rounded-lg text-gray-300">
						“Integração simples e respostas consistentes. Nosso time foca em casos complexos agora.”
						<footer className="mt-3 text-sm text-gray-500">— Carlos M., Head de Suporte</footer>
					</blockquote>
					<blockquote className="p-6 bg-[#11121f] border border-[#2d2d44] rounded-lg text-gray-300">
						“O conteúdo gerado agilizou nossa estratégia de marketing — um parceiro essencial.”
						<footer className="mt-3 text-sm text-gray-500">— Mariana T., Marketing</footer>
					</blockquote>
				</div>
			</section>

			{/* Footer */}
			<footer className="mt-20 border-t border-[#2d2d44] pt-10 pb-12">
				<div className="max-w-7xl mx-auto px-6 lg:px-0 grid md:grid-cols-3 gap-6">
					<div>
						<div className="flex items-center gap-3 mb-3">
							<div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] flex items-center justify-center font-bold">AF</div>
							<div>
								<div className="font-semibold">AgentFlow</div>
								<div className="text-sm text-gray-400">Atendimento e vendas por IA</div>
							</div>
						</div>
					</div>

					<div className="text-sm text-gray-300">
						<div className="font-semibold mb-2">Produtos</div>
						<div className="flex flex-col gap-2">
							<a href="#" className="text-gray-400 hover:text-white">Agentes</a>
							<a href="#" className="text-gray-400 hover:text-white">API</a>
							<a href="#" className="text-gray-400 hover:text-white">Integrações</a>
						</div>
					</div>

					<div className="text-sm text-gray-300">
						<div className="font-semibold mb-2">Suporte</div>
						<div className="flex flex-col gap-2">
							<a href="#" className="text-gray-400 hover:text-white">Documentação</a>
							<a href="#" className="text-gray-400 hover:text-white">Contato</a>
							<a href="#" className="text-gray-400 hover:text-white">Política de Privacidade</a>
						</div>
					</div>
				</div>

				<div className="max-w-7xl mx-auto px-6 lg:px-0 mt-8 text-sm text-gray-500">© 2026 AgentFlow. Todos os direitos reservados.</div>
			</footer>
		</div>
	)
}
