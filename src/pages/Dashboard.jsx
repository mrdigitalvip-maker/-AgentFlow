import React from 'react'
import Sidebar from '../components/Sidebar'

function MetricCard({ title, value }){
  return (
    <div className="bg-[#0f0f0f] p-4 rounded-md">
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

export default function Dashboard(){
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-inter">
      <Sidebar />
      <div className="ml-72 p-8">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Olá, bem-vindo de volta</h1>
          <button className="bg-[#7C3AED] px-4 py-2 rounded">Novo Agente</button>
        </header>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard title="Conversas" value="47" />
          <MetricCard title="Leads" value="12" />
          <MetricCard title="Taxa" value="98%" />
          <MetricCard title="Horas" value="8h" />
        </section>

        <section className="mt-8">
          <h2 className="font-bold text-xl">Seus Agentes</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="bg-[#0f0f0f] p-4 rounded">Agente: Suporte - Ativo</div>
            <div className="bg-[#0f0f0f] p-4 rounded">Agente: Vendas - Ativo</div>
            <div className="bg-[#0f0f0f] p-4 rounded">Agente: Conteúdo - Pausado</div>
          </div>
        </section>

        <section className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="bg-[#0f0f0f] p-4 rounded">
            <h3 className="font-semibold">Atividade recente</h3>
            <ul className="mt-2 text-gray-300 space-y-2">
              <li>Pedro iniciou conversa com Agente Vendas</li>
              <li>Ana criou novo agente de Conteúdo</li>
              <li>Relatório semanal gerado</li>
            </ul>
          </div>
          <div className="bg-[#0f0f0f] p-4 rounded">
            <h3 className="font-semibold">Gráfico semanal</h3>
            <div className="mt-4 flex items-end gap-2 h-32">
              {[5,8,3,9,7,4,6].map((v,i)=> (
                <div key={i} className="bg-[#7C3AED]" style={{height: `${v*8}px`, width: '24px', borderRadius: '4px'}}></div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
