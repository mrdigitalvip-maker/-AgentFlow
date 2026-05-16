import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function Settings(){
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(()=>{ setName(user?.user_metadata?.full_name || '') },[user])

  async function saveProfile(){
    setLoading(true)
    const updates = { id: user.id, full_name: name }
    await supabase.from('profiles').upsert(updates)
    setLoading(false)
    alert('Perfil salvo')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <Sidebar />
      <div className="ml-72 p-8 max-w-3xl">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <section className="mt-6 bg-[#0f0f0f] p-6 rounded">
          <h3 className="font-semibold">Perfil</h3>
          <label className="block text-sm mt-2">Nome</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 mt-1 bg-gray-900 rounded" />
          <label className="block text-sm mt-4">Email</label>
          <input value={user?.email} disabled className="w-full p-2 mt-1 bg-gray-900 rounded" />
          <div className="mt-4 flex justify-end">
            <button onClick={saveProfile} className="px-4 py-2 bg-[#7C3AED] rounded">{loading? 'Salvando...':'Salvar'}</button>
          </div>
        </section>

        <section className="mt-6 bg-[#0f0f0f] p-6 rounded">
          <h3 className="font-semibold">Segurança</h3>
          <button className="mt-4 px-4 py-2 border rounded">Alterar senha</button>
        </section>

        <section className="mt-6 bg-[#0f0f0f] p-6 rounded">
          <h3 className="font-semibold text-red-400">Danger Zone</h3>
          <button className="mt-4 px-4 py-2 bg-red-700 rounded">Deletar conta</button>
        </section>
      </div>
    </div>
  )
}
