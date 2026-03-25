import { useState, useEffect, useCallback } from 'react'
import {
  fetchAdminProducts,
  fetchProductForEdit,
  saveProduct,
  removeProduct,
  toggleProduct,
} from '@/application/use-cases/admin/manageProducts'
import { getAllCategories } from '@/infrastructure/supabase/categoryRepository'

/**
 * Hook: gestión de productos en el panel admin.
 */
export function useAdminProducts() {
  const [products,   setProducts]   = useState([])
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [saving,     setSaving]     = useState(false)
  const [error,      setError]      = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [prods, cats] = await Promise.all([
        fetchAdminProducts(),
        getAllCategories(),
      ])
      setProducts(prods)
      setCategories(cats)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const save = async (formData, existingId = null, onProgress = null) => {
    setSaving(true)
    setError(null)
    try {
      const result = await saveProduct(formData, existingId, onProgress)
      await load()
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    setError(null)
    try {
      await removeProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const toggle = async (id, isActive) => {
    setError(null)
    try {
      await toggleProduct(id, isActive)
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isActive } : p))
      )
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    products,
    categories,
    loading,
    saving,
    error,
    reload: load,
    save,
    remove,
    toggle,
    fetchProductForEdit,
  }
}
