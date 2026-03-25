import { useState, useEffect } from 'react'
import { getProductDetail } from '@/application/use-cases/getProductDetail'

/**
 * Hook: detalle de un producto + relacionados.
 */
export function useProductDetail(id) {
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    setLoading(true)
    setError(null)

    getProductDetail(id)
      .then(({ product: p, related: r }) => {
        if (!cancelled) {
          setProduct(p)
          setRelated(r)
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [id])

  return { product, related, loading, error }
}
