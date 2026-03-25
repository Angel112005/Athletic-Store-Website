import { getPublicProductById } from '@/infrastructure/supabase/productRepository'
import { getPublicProducts }    from '@/infrastructure/supabase/productRepository'

/**
 * Caso de uso: obtener detalle de un producto + productos relacionados.
 */
export async function getProductDetail(id) {
  const product = await getPublicProductById(id)

  // Productos relacionados de la misma categoría
  let related = []
  if (product.categoryId) {
    const all = await getPublicProducts({ categoryId: product.categoryId })
    related = all.filter((p) => p.id !== id).slice(0, 4)
  }

  return { product, related }
}
