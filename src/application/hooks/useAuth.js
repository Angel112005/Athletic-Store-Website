import { useState, useEffect } from 'react'
import { signIn, signOut, getSession, onAuthStateChange } from '@/infrastructure/supabase/authRepository'

/**
 * Hook: estado de autenticación del admin.
 */
export function useAuth() {
  const [session,  setSession]  = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    // Cargar sesión inicial
    getSession().then((s) => {
      setSession(s)
      setLoading(false)
    })

    // Suscribir a cambios
    const unsubscribe = onAuthStateChange((s) => {
      setSession(s)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = async (email, password) => {
    setError(null)
    setLoading(true)
    try {
      const s = await signIn(email, password)
      setSession(s)
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await signOut()
    setSession(null)
  }

  return {
    session,
    user:         session?.user ?? null,
    isAuthenticated: !!session,
    loading,
    error,
    login,
    logout,
  }
}
