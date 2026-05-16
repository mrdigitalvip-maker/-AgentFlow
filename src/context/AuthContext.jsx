import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function loadSession() {
      const { data } = await supabase.auth.getSession()
      if (!mounted) return
      setUser(data.session ? data.session.user : null)
      setLoading(false)
    }
    loadSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      mounted = false
      listener?.subscription?.unsubscribe?.()
    }
  }, [])

  const signIn = async ({ email, password }) => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) throw new Error(error.message)
    setUser(data.user)
    return data
  }

  const signUp = async ({ email, password, full_name }) => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name } } })
    setLoading(false)
    if (error) throw new Error(error.message)
    return data
  }

  const signOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    setUser(null)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
