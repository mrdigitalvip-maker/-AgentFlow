import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'

export default function AgentsPage(){
  const [agents, setAgents] = useState([])

  useEffect(()=>{
    fetchAgents()
  },[])

  async function fetchAgents(){
    const { data, error } = await supabase.from('agents').select('*').order('created_at', { ascending: false }).limit(50)
    if (error) return console.error(error)
    setAgents(data || [])
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <Sidebar />
      <div className="ml-72 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Agentes</h1>
          <Link to="/agents/create" className="bg-[#7C3AED] px-4 py-2 rounded">Criar Agente</Link>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {agents.length === 0 ? (
            <div className="bg-[#0f0f0f] p-6 rounded col-span-full text-center">Nenhum agente — <Link to="/agents/create" className="text-[#06B6D4]">criar agora</Link></div>
          ) : agents.map(a => (
            <div key={a.id} className="bg-[#0f0f0f] p-4 rounded">
              <div className="font-semibold">{a.name}</div>
              <div className="text-sm text-gray-400">{a.type}</div>
              <div className="mt-2 flex gap-2">
                <Link to={`/agents/${a.id}/chat`} className="px-3 py-1 bg-[#7C3AED] rounded text-black">Chat</Link>
                <button className="px-3 py-1 border border-gray-700 rounded">Configurar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
import { useNavigate } from 'react-router-dom'

export default function AgentsPage(){
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#0f0f1e] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Meus Agentes</h1>
            <p className="text-gray-400">Gerencie seus assistentes de IA</p>
          </div>
          <button onClick={()=>navigate('/agents/create')} className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-lg font-semibold">+ Novo Agente</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholders */}
          {[1,2,3].map(i=>(
            <div key={i} className="p-4 bg-[#11121f] border border-[#2d2d44] rounded-lg">
              <h3 className="font-bold">Agente Exemplo #{i}</h3>
              <p className="text-gray-400 text-sm mt-2">Atende clientes e gera leads automaticamente.</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-400">🟢 Ativo</span>
                <div className="flex gap-2">
                  <button className="text-sm text-primary">Editar</button>
                  <button onClick={()=>navigate(`/agents/${i}/chat`)} className="text-sm font-semibold">Conversar →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
