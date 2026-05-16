import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { loadStripe } from '@stripe/stripe-js'

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

  const plans = [
    { id: 'starter', name: 'STARTER', price: 297 },
    { id: 'pro', name: 'PRO', price: 597, popular: true },
    { id: 'enterprise', name: 'ENTERPRISE', price: 1497 },
  ]

  async function handleCheckout(plan) {
    const stripe = await stripePromise
    if (!stripe) return alert('Stripe não configurado')
    alert(`Redirecionando para checkout — plano: ${plan}`)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <Sidebar />
      <div className="ml-72 p-8">
        <h1 className="text-2xl font-bold">Preços</h1>
        <div className="mt-4 flex items-center gap-4">
          <div>Mensal</div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={annual} onChange={(e) => setAnnual(e.target.checked)} />
            <span>Anual (-20%)</span>
          </label>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.id} className={`p-6 rounded bg-[#0f0f0f] ${p.popular ? 'border-2 border-[#06B6D4]' : ''}`}>
              {p.popular && <div className="text-yellow-300 text-sm">MAIS POPULAR</div>}
              <h3 className="font-bold mt-2">{p.name}</h3>
              <div className="text-3xl font-extrabold mt-4">R${annual ? Math.round(p.price * 12 * 0.8) : p.price}<span className="text-sm">/mês</span></div>
              <ul className="mt-4 text-gray-300 space-y-2">
                <li>{p.id === 'enterprise' ? 'Agentes ilimitados' : 'Limite conforme plano'}</li>
                <li>{p.id === 'pro' ? 'Analytics avançado' : 'Relatórios básicos'}</li>
              </ul>
              <button onClick={() => handleCheckout(p.id)} className="mt-4 px-4 py-2 bg-[#7C3AED] rounded">Assinar</button>
            </div>
          ))}
        </div>
        <div className="mt-6 text-sm text-gray-400">Garantia 7 dias</div>
      </div>
    </div>
  )
}
