import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn({ email, password })
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Erro ao entrar')
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
          <label className="block text-sm">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mt-1 mb-2 bg-gray-900 rounded" />
          <label className="block text-sm">Senha</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mt-1 mb-2 bg-gray-900 rounded" />
          {error && <div className="text-red-400">{error}</div>}
          <button type="submit" disabled={loading} className="w-full py-2 bg-[#7C3AED] rounded-md font-semibold">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <a href="#">Esqueci a senha</a>
          <Link to="/register" className="text-white">Criar conta</Link>
        </div>
      </div>
    </div>
  )
}
