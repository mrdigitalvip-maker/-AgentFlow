import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function CreateAgent() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [type, setType] = useState('Atendimento')
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')
  const [product, setProduct] = useState('')
  const [tone, setTone] = useState('Amigável')
  const navigate = useNavigate()

  const previewPrompt = () => `Você é ${name || 'um agente'} do tipo ${type} para a empresa ${company}. Tom: ${tone}. Descrição: ${description}. Produto: ${product}. Responda em português.`

  async function handleCreate() {
    const { error } = await supabase.from('agents').insert([{ name, type, company, description, product, tone, system_prompt: previewPrompt(), user_id: null }])
    if (error) return alert('Erro ao criar agente: ' + error.message)
    navigate('/agents')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <Sidebar />
      <div className="ml-72 p-8 max-w-3xl">
        <h1 className="text-2xl font-bold">Criar Agente</h1>
        <div className="mt-4">
          <div className="w-full bg-gray-800 rounded h-2">
            <div className="bg-[#7C3AED] h-2 rounded" style={{ width: `${((step - 1) / 2) * 100}%` }} />
          </div>
          {step === 1 && (
            <div className="mt-6 bg-[#0f0f0f] p-6 rounded">
              <label>Nome do agente</label>
              <input className="w-full p-2 mt-1 bg-gray-900 rounded" value={name} onChange={(e) => setName(e.target.value)} />
              <label className="mt-4">Tipo</label>
              <select className="w-full p-2 mt-1 bg-gray-900 rounded" value={type} onChange={(e) => setType(e.target.value)}>
                <option>Atendimento</option>
                <option>Vendas</option>
                <option>Conteúdo</option>
                <option>Follow-up</option>
              </select>
            </div>
          )}
          {step === 2 && (
            <div className="mt-6 bg-[#0f0f0f] p-6 rounded">
              <label>Nome da empresa</label>
              <input className="w-full p-2 mt-1 bg-gray-900 rounded" value={company} onChange={(e) => setCompany(e.target.value)} />
              <label className="mt-4">Descrição do negócio</label>
              <textarea className="w-full p-2 mt-1 bg-gray-900 rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
              <label className="mt-4">Produto ou serviço principal</label>
              <input className="w-full p-2 mt-1 bg-gray-900 rounded" value={product} onChange={(e) => setProduct(e.target.value)} />
            </div>
          )}
          {step === 3 && (
            <div className="mt-6 bg-[#0f0f0f] p-6 rounded">
              <label>Tom</label>
              <select className="w-full p-2 mt-1 bg-gray-900 rounded" value={tone} onChange={(e) => setTone(e.target.value)}>
                <option>Formal</option>
                <option>Casual</option>
                <option>Amigável</option>
                <option>Direto</option>
              </select>
              <div className="mt-4">
                <label className="block text-sm text-gray-400">Preview do system prompt</label>
                <div className="mt-2 bg-gray-900 p-3 rounded text-sm">{previewPrompt()}</div>
              </div>
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <button disabled={step === 1} onClick={() => setStep((s) => s - 1)} className="px-4 py-2 border rounded">
              Voltar
            </button>
            {step < 3 ? (
              <button onClick={() => setStep((s) => s + 1)} className="px-4 py-2 bg-[#7C3AED] rounded">
                Próximo
              </button>
            ) : (
              <button onClick={handleCreate} className="px-4 py-2 bg-[#06B6D4] rounded text-black">
                Criar e Ativar Agente
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
