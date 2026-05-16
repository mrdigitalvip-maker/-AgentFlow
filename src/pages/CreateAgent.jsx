import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function CreateAgent(){
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [type, setType] = useState('Atendimento')
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')
  const [product, setProduct] = useState('')
  const [tone, setTone] = useState('Amigável')
  const navigate = useNavigate()

  const previewPrompt = () => `Você é ${name || 'um agente'} do tipo ${type} para a empresa ${company}. Tom: ${tone}. Descrição: ${description}. Produto: ${product}. Responda em português.`

  async function handleCreate(){
    const { data, error } = await supabase.from('agents').insert([{ name, type, company, description, product, tone }])
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
            <div className="bg-[#7C3AED] h-2 rounded" style={{width: `${(step-1)/2*100}%`}}></div>
          </div>

          {step === 1 && (
            <div className="mt-6 bg-[#0f0f0f] p-6 rounded">
              <label>Nome do agente</label>
              <input className="w-full p-2 mt-1 bg-gray-900 rounded" value={name} onChange={e=>setName(e.target.value)} />
              <label className="mt-4">Tipo</label>
              <select className="w-full p-2 mt-1 bg-gray-900 rounded" value={type} onChange={e=>setType(e.target.value)}>
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
              <input className="w-full p-2 mt-1 bg-gray-900 rounded" value={company} onChange={e=>setCompany(e.target.value)} />
              <label className="mt-4">Descrição do negócio</label>
              <textarea className="w-full p-2 mt-1 bg-gray-900 rounded" value={description} onChange={e=>setDescription(e.target.value)} />
              <label className="mt-4">Produto ou serviço principal</label>
              <input className="w-full p-2 mt-1 bg-gray-900 rounded" value={product} onChange={e=>setProduct(e.target.value)} />
            </div>
          )}

          {step === 3 && (
            <div className="mt-6 bg-[#0f0f0f] p-6 rounded">
              <label>Tom</label>
              <select className="w-full p-2 mt-1 bg-gray-900 rounded" value={tone} onChange={e=>setTone(e.target.value)}>
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
            <button disabled={step===1} onClick={()=>setStep(s=>s-1)} className="px-4 py-2 border rounded">Voltar</button>
            {step < 3 ? (
              <button onClick={()=>setStep(s=>s+1)} className="px-4 py-2 bg-[#7C3AED] rounded">Próximo</button>
            ) : (
              <button onClick={handleCreate} className="px-4 py-2 bg-[#06B6D4] rounded text-black">Criar e Ativar Agente</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateSystemPrompt } from '../helpers/systemPrompt'

export default function CreateAgent(){
  const navigate = useNavigate()
  const [step,setStep] = useState(1)
  const [form,setForm] = useState({name:'', type:'support', businessName:'', businessDescription:'', tone:'friendly', businessInfo:''})

  const handleNext = ()=>{ if(step<3) setStep(s=>s+1) }
  const handlePrev = ()=>{ if(step>1) setStep(s=>s-1) }
  const handleCreate = async ()=>{
    // mock create
    navigate('/agents')
  }

  return (
    <div className="min-h-screen bg-[#0f0f1e] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Criar Agente</h1>
        <div className="bg-[#11121f] border border-[#2d2d44] rounded-lg p-6">
          {step===1 && (
            <div>
              <label className="block text-sm text-gray-300">Nome do Agente</label>
              <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full p-3 bg-[#0f1220] rounded mt-2" />
              <label className="block text-sm text-gray-300 mt-4">Tipo</label>
              <select value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})} className="w-full p-3 bg-[#0f1220] rounded mt-2">
                <option value="support">Suporte</option>
                <option value="sales">Vendas</option>
                <option value="content">Conteúdo</option>
                <option value="analyst">Analista</option>
              </select>
            </div>
          )}

          {step===2 && (
            <div>
              <label className="block text-sm text-gray-300">Nome da Empresa</label>
              <input value={form.businessName} onChange={(e)=>setForm({...form,businessName:e.target.value})} className="w-full p-3 bg-[#0f1220] rounded mt-2" />
              <label className="block text-sm text-gray-300 mt-4">Descrição</label>
              <textarea value={form.businessDescription} onChange={(e)=>setForm({...form,businessDescription:e.target.value})} className="w-full p-3 bg-[#0f1220] rounded mt-2" rows={4} />
            </div>
          )}

          {step===3 && (
            <div>
              <label className="block text-sm text-gray-300">Tom de Voz</label>
              <select value={form.tone} onChange={(e)=>setForm({...form,tone:e.target.value})} className="w-full p-3 bg-[#0f1220] rounded mt-2">
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
                <option value="friendly">Amigável</option>
              </select>

              <div className="mt-4">
                <h4 className="text-sm text-gray-300 mb-2">Preview do Prompt:</h4>
                <pre className="bg-[#0f1220] p-3 rounded text-xs text-gray-300">{generateSystemPrompt(form)}</pre>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button onClick={handlePrev} disabled={step===1} className="px-4 py-2 bg-[#11121f] rounded">← Voltar</button>
            {step<3 ? (
              <button onClick={handleNext} className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded text-white">Próximo →</button>
            ) : (
              <button onClick={handleCreate} className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded text-white">Criar e Ativar</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
