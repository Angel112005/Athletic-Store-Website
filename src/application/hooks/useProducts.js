import { useState, useEffect, useCallback } from 'react'
import { getCatalogData } from '@/application/use-cases/getPublicProducts'
import { getFeaturedProducts } from '@/infrastructure/supabase/productRepository'

/**
 * Hook: productos públicos del catálogo con filtros.
 */
export function useProducts(initialFilters = {}) {
  const [products,   setProducts]   = useState([])
  const [categories, setCategories] = useState([])
  const [filters,    setFilters]    = useState(initialFilters)
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { products: p, categories: c } = await getCatalogData(filters)
      setProducts(p)
      setCategories(c)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => { load() }, [load])

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => setFilters({})

  return { products, categories, filters, loading, error, updateFilter, clearFilters, reload: load }
}

/**
 * Hook: productos destacados para la landing.
 */
export function useFeaturedProducts(limit = 8) {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    getFeaturedProducts(limit)
      .then((data) => { if (!cancelled) setProducts(data) })
      .catch((err)  => { if (!cancelled) setError(err.message) })
      .finally(()   => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [limit])

  return { products, loading, error }
}
