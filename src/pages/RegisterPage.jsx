import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
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
    } catch (err) {
      setError(err.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-gray-100">
      <div className="w-full max-w-md bg-[#070707] p-8 rounded-md">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">AgentFlow</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm">Nome completo</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 mt-1 mb-2 bg-gray-900 rounded" />
          <label className="block text-sm">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mt-1 mb-2 bg-gray-900 rounded" />
          <label className="block text-sm">Senha</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mt-1 mb-2 bg-gray-900 rounded" />
          <label className="block text-sm">Confirmar senha</label>
          <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full p-2 mt-1 mb-2 bg-gray-900 rounded" />
          {error && <div className="text-red-400">{error}</div>}
          <button type="submit" disabled={loading} className="w-full py-2 bg-[#7C3AED] rounded-md font-semibold">
            {loading ? 'Criando...' : 'Criar Conta'}
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-400">
          Já tem conta? <Link to="/login" className="text-white">Entrar</Link>
        </div>
      </div>
    </div>
  )
}
