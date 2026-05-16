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
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-gray-100">
      <div className="w-full max-w-md bg-[#070707] p-8 rounded-md">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">AgentFlow</div>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm">Email</label>
          <input className="w-full p-2 mt-1 mb-4 bg-gray-900 rounded" value={email} onChange={e=>setEmail(e.target.value)} />
          <label className="block text-sm">Senha</label>
          <input type="password" className="w-full p-2 mt-1 mb-4 bg-gray-900 rounded" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div className="text-red-400 mb-2">{error}</div>}
          <button className="w-full py-2 bg-[#7C3AED] rounded-md font-semibold" disabled={loading}>{loading? 'Entrando...' : 'Entrar'}</button>
        </form>
        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <a href="#">Esqueci a senha</a>
          <Link to="/register">Criar conta</Link>
        </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('Preencha email e senha')
      return
    }
    setLoading(true)
    // Mock login: em produção, chame sua API
    setTimeout(() => {
      localStorage.setItem('token', 'demo-token')
      localStorage.setItem('user', JSON.stringify({ email }))
      setLoading(false)
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#0f0f1e] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#11121f] border border-[#2d2d44] rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Entrar na sua conta</h2>
        <p className="text-sm text-gray-400 mb-6">Use suas credenciais para acessar o painel</p>

        {error && <div className="mb-4 text-sm text-red-400">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-3 bg-[#0f1220] border border-[#2d2d44] rounded-md text-white placeholder-gray-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-4 py-3 bg-[#0f1220] border border-[#2d2d44] rounded-md text-white placeholder-gray-500"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <button
              className="px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white rounded-lg font-semibold"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            <Link to="/register" className="text-sm text-gray-400 hover:underline">
              Criar conta
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
