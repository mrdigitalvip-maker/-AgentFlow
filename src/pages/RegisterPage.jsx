import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage(){
  const { signUp } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) return setError('As senhas não coincidem.')
    if (password.length < 6) return setError('Senha deve ter ao menos 6 caracteres.')
    setLoading(true)
    try {
      await signUp({ email, password, full_name: name })
      navigate('/dashboard')
    } catch (err) { setError(err.message || 'Erro ao criar conta') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-gray-100">
      <div className="w-full max-w-md bg-[#070707] p-8 rounded-md">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">AgentFlow</div>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm">Nome completo</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 mt-1 mb-4 bg-gray-900 rounded" />
          <label className="block text-sm">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 mt-1 mb-4 bg-gray-900 rounded" />
          <label className="block text-sm">Senha</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 mt-1 mb-4 bg-gray-900 rounded" />
          <label className="block text-sm">Confirmar senha</label>
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} className="w-full p-2 mt-1 mb-4 bg-gray-900 rounded" />
          {error && <div className="text-red-400 mb-2">{error}</div>}
          <button className="w-full py-2 bg-[#7C3AED] rounded-md font-semibold" disabled={loading}>{loading? 'Criando...' : 'Criar Conta'}</button>
        </form>
        <div className="mt-4 text-sm text-gray-400">Já tem conta? <Link to="/login" className="text-white">Entrar</Link></div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock register
    localStorage.setItem('token', 'demo-token')
    localStorage.setItem('user', JSON.stringify({ email, name }))
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0f0f1e] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#11121f] border border-[#2d2d44] rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Criar Conta</h2>
        <p className="text-sm text-gray-400 mb-6">Registre-se e comece a usar o AgentFlow</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full px-4 py-3 bg-[#0f1220] border border-[#2d2d44] rounded-md text-white" placeholder="Nome" value={name} onChange={(e)=>setName(e.target.value)} />
          <input className="w-full px-4 py-3 bg-[#0f1220] border border-[#2d2d44] rounded-md text-white" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" className="w-full px-4 py-3 bg-[#0f1220] border border-[#2d2d44] rounded-md text-white" placeholder="Senha" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <div className="flex items-center justify-between">
            <button className="px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white rounded-lg font-semibold">Criar Conta</button>
          </div>
        </form>
      </div>
    </div>
  )
}
