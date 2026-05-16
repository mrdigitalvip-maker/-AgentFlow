import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { sendMessageToAgent } from '../lib/openai'

export default function AgentChat() {
  const { id } = useParams()
  const [agent, setAgent] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    fetchAgent()
    fetchMessages()
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function fetchAgent() {
    const { data } = await supabase.from('agents').select('*').eq('id', id).single()
    setAgent(data)
  }

  async function fetchMessages() {
    const { data } = await supabase.from('messages').select('*').eq('agent_id', id).order('created_at', { ascending: true }).limit(100)
    setMessages(data || [])
  }

  async function send() {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages((prev) => [...prev, { ...userMsg, from: 'user' }])
    setInput('')
    setLoading(true)

    try {
      const systemPrompt = agent?.system_prompt || `Agente: ${agent?.name || 'assistente'}`
      const reply = await sendMessageToAgent([{ role: 'user', content: userMsg.content }], systemPrompt)
      await supabase.from('messages').insert([
        { agent_id: id, role: 'user', content: userMsg.content },
        { agent_id: id, role: 'assistant', content: reply },
      ])
      setMessages((prev) => [...prev, { role: 'assistant', content: reply, from: 'agent' }])
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `Erro: ${err.message}`, from: 'agent' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <Sidebar />
      <div className="ml-72 p-8 flex flex-col h-screen">
        <div className="flex-1 overflow-auto mb-4">
          <div className="max-w-3xl mx-auto">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{agent?.name || 'Agente'}</h2>
                <div className="text-sm text-gray-400">{agent?.type || 'Tipo de agente'}</div>
              </div>
            </header>
            <div className="mt-6 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${m.from === 'user' ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-black' : 'bg-gray-900 text-gray-100'} p-3 rounded-md max-w-xl`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && <div className="text-gray-400">Respondendo<span className="animate-pulse">...</span></div>}
              <div ref={endRef} />
            </div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 p-3 bg-gray-900 rounded" placeholder="Escreva sua mensagem" />
            <button onClick={send} className="px-4 py-2 bg-[#7C3AED] rounded">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
