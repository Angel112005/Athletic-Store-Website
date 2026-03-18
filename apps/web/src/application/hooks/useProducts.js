import { useEffect, useState } from 'react'
import { getPublicProducts } from '../use-cases/getPublicProducts'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getPublicProducts()
        setProducts(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}