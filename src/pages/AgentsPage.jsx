import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'

export default function AgentsPage() {
  const [agents, setAgents] = useState([])

  useEffect(() => {
    fetchAgents()
  }, [])

  async function fetchAgents() {
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
            <div className="bg-[#0f0f0f] p-6 rounded col-span-full text-center">
              Nenhum agente — <Link to="/agents/create" className="text-[#06B6D4]">criar agora</Link>
            </div>
          ) : (
            agents.map((a) => (
              <div key={a.id} className="bg-[#0f0f0f] p-4 rounded">
                <div className="font-semibold">{a.name}</div>
                <div className="text-sm text-gray-400">{a.type}</div>
                <div className="mt-2 flex gap-2">
                  <Link to={`/agents/${a.id}/chat`} className="px-3 py-1 bg-[#7C3AED] rounded text-black">Chat</Link>
                  <button className="px-3 py-1 border border-gray-700 rounded">Configurar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
