import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/agents', label: 'Agentes' },
  { to: '/agents', label: 'Conversas' },
  { to: '/pricing', label: 'Preços' },
  { to: '/settings', label: 'Configurações' },
]

export default function Sidebar() {
  const { user, signOut } = useAuth()

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-[#070707] border-r border-gray-800 text-gray-200 flex flex-col">
      <div className="px-6 py-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-md flex items-center justify-center font-bold">AF</div>
        <div>
          <div className="font-bold text-lg">AgentFlow</div>
          <div className="text-xs text-gray-400">Agentes 24/7</div>
        </div>
      </div>

      <nav className="px-4 py-2 flex-1">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => `block px-3 py-2 rounded-md my-1 ${isActive ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-black font-semibold' : 'text-gray-300 hover:bg-gray-800'}`}>
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-6 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">{user?.email?.charAt(0)?.toUpperCase()}</div>
          <div className="flex-1">
            <div className="text-sm">{user?.user_metadata?.full_name || user?.email}</div>
            <button onClick={signOut} className="text-xs text-red-400 mt-1">Sair</button>
          </div>
        </div>
      </div>
    </aside>
  )
}
