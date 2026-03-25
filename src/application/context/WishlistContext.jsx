import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'athletic_wishlist'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const toggle = useCallback((product) => {
    setItems((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    )
  }, [])

  const remove = useCallback((productId) => {
    setItems((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const has = useCallback((productId) => items.some((p) => p.id === productId), [items])

  const clear = useCallback(() => setItems([]), [])

  return (
    <WishlistContext.Provider value={{ items, toggle, remove, has, clear, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
