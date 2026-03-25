import { useState, useEffect } from 'react'
import { getPublicCategories } from '@/infrastructure/supabase/categoryRepository'

/**
 * Hook: categorías públicas activas.
 */
export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    let cancelled = false
    getPublicCategories()
      .then((data) => { if (!cancelled) setCategories(data) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { categories, loading }
}
