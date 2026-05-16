import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { sendMessageToAgent } from '../lib/openai'

export default function AgentChat(){
  const { id } = useParams()
  const [agent, setAgent] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef()

  useEffect(()=>{ fetchAgent(); fetchMessages() }, [])

  async function fetchAgent(){
    const { data } = await supabase.from('agents').select('*').eq('id', id).single()
    setAgent(data)
  }

  async function fetchMessages(){
    const { data } = await supabase.from('messages').select('*').eq('agent_id', id).order('created_at', {ascending:true}).limit(100)
    setMessages(data || [])
  }

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}) }, [messages, loading])

  async function send(){
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, { ...userMsg, from: 'user' }])
    setInput('')
    setLoading(true)
    try {
      const systemPrompt = agent?.system_prompt || `Agente: ${agent?.name || ''}`
      const reply = await sendMessageToAgent([{ role: 'user', content: userMsg.content }], systemPrompt)
      // save messages
      await supabase.from('conversations').insert([{ agent_id: id }])
      await supabase.from('messages').insert([
        { agent_id: id, role: 'user', content: userMsg.content },
        { agent_id: id, role: 'assistant', content: reply }
      ])
      setMessages(prev => [...prev, { role: 'assistant', content: reply, from: 'agent' }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Erro ao gerar resposta: '+err.message, from: 'agent' }])
    } finally { setLoading(false) }
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
                <div className="text-sm text-gray-400">{agent?.type}</div>
              </div>
            </header>

            <div className="mt-6 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from==='user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${m.from==='user' ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-black' : 'bg-gray-900'} p-3 rounded-md max-w-xl`}>{m.content}</div>
                </div>
              ))}
              {loading && <div className="text-gray-400">Respondendo<span className="animate-pulse">...</span></div>}
              <div ref={endRef} />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 p-3 bg-gray-900 rounded" placeholder="Escreva sua mensagem" />
            <button onClick={send} className="px-4 py-2 bg-[#7C3AED] rounded">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

export default function AgentChat(){
  const { id } = useParams()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}) },[messages])

  const send = async (e)=>{
    e.preventDefault()
    if(!input.trim()) return
    const userMsg = { role:'user', content: input }
    setMessages(m=>[...m,userMsg])
    setInput('')
    setLoading(true)
    // mock response
    setTimeout(()=>{
      setMessages(m=>[...m,{role:'assistant', content: `Resposta do agente ${id}: ${input}` } ])
      setLoading(false)
    },900)
  }

  return (
    <div className="min-h-screen bg-[#0f0f1e] text-white flex flex-col">
      <div className="h-16 bg-[#11121f] border-b border-[#2d2d44] flex items-center px-6">
        <h3 className="font-bold">Agente #{id}</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length===0 && <div className="text-center text-gray-400">Nenhuma mensagem ainda — diga olá!</div>}
        {messages.map((m,i)=>(
          <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}>
            <div className={`${m.role==='user'?'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white':'bg-[#11121f] text-gray-300'} px-4 py-3 rounded-lg max-w-lg`}>{m.content}</div>
          </div>
        ))}
        {loading && <div className="text-gray-400">Agente está respondendo...</div>}
        <div ref={endRef} />
      </div>
      <form onSubmit={send} className="p-4 bg-[#11121f] border-t border-[#2d2d44] flex gap-3">
        <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Digite sua mensagem..." className="flex-1 p-3 bg-[#0f1220] rounded text-white" />
        <button className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded">Enviar</button>
      </form>
    </div>
  )
}
