import { getPublicProducts as fetchProducts } from '@/infrastructure/supabase/productRepository'
import { getPublicCategories }                from '@/infrastructure/supabase/categoryRepository'

/**
 * Caso de uso: obtener productos públicos con filtros opcionales.
 * Orquesta repositorios y aplica lógica de negocio.
 */
export async function getPublicProducts(filters = {}) {
  return fetchProducts(filters)
}

/**
 * Caso de uso: obtener catálogo completo (productos + categorías).
 */
export async function getCatalogData(filters = {}) {
  const [products, categories] = await Promise.all([
    fetchProducts(filters),
    getPublicCategories(),
  ])
  return { products, categories }
}
