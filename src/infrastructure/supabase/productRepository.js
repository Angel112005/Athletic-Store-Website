/**
 * Product Repository
 *
 * Capa de acceso a datos para productos.
 * Abstrae todas las queries a Supabase para que la capa
 * de aplicación no dependa directamente del cliente.
 */

import { supabase } from './client'
import { fromSupabase } from '@/domain/entities/product'

const PRODUCT_QUERY = `
  id,
  name,
  description,
  price,
  discount_percentage,
  brand,
  category_id,
  is_active,
  created_at,
  categories ( id, name ),
  product_images ( id, url, is_main, order )
`

// ─── PUBLIC ───────────────────────────────────────────────

/**
 * Obtiene todos los productos activos (cara pública).
 * @param {{ categoryId?: string, search?: string, sort?: string }} filters
 * @returns {Promise<object[]>}
 */
export async function getPublicProducts(filters = {}) {
  let query = supabase
    .from('products')
    .select(PRODUCT_QUERY)
    .eq('is_active', true)

  if (filters.categoryId) {
    query = query.eq('category_id', filters.categoryId)
  }

  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  switch (filters.sort) {
    case 'price_asc':
      query = query.order('price', { ascending: true })
      break
    case 'price_desc':
      query = query.order('price', { ascending: false })
      break
    case 'name_az':
      query = query.order('name', { ascending: true })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data, error } = await query

  if (error) throw error
  return (data ?? []).map(fromSupabase)
}

/**
 * Obtiene un producto activo por su ID.
 * @param {string} id
 * @returns {Promise<object>}
 */
export async function getPublicProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_QUERY)
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error) throw error
  return fromSupabase(data)
}

/**
 * Obtiene los productos destacados (más recientes, activos).
 * @param {number} limit
 * @returns {Promise<object[]>}
 */
export async function getFeaturedProducts(limit = 8) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_QUERY)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []).map(fromSupabase)
}

// ─── ADMIN ────────────────────────────────────────────────

/**
 * Obtiene TODOS los productos (panel admin).
 * @returns {Promise<object[]>}
 */
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_QUERY)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map(fromSupabase)
}

/**
 * Obtiene un producto por ID (admin, incluye inactivos).
 * @param {string} id
 * @returns {Promise<object>}
 */
export async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_QUERY)
    .eq('id', id)
    .single()

  if (error) throw error
  return fromSupabase(data)
}

/**
 * Crea un nuevo producto con sus imágenes.
 * @param {object} productData
 * @param {Array<{url: string, is_main: boolean, order: number}>} images
 * @returns {Promise<object>}
 */
export async function createProduct(productData, images = []) {
  const { data: product, error } = await supabase
    .from('products')
    .insert([productData])
    .select('id')
    .single()

  if (error) throw error

  if (images.length > 0) {
    const imageRows = images.map((img, idx) => ({
      product_id: product.id,
      url: img.url,
      is_main: img.is_main ?? idx === 0,
      order: img.order ?? idx,
    }))

    const { error: imgError } = await supabase
      .from('product_images')
      .insert(imageRows)

    if (imgError) throw imgError
  }

  return getProductById(product.id)
}

/**
 * Actualiza un producto existente.
 * @param {string} id
 * @param {object} productData
 * @param {Array} images  — imágenes actualizadas (replace completo)
 * @returns {Promise<object>}
 */
export async function updateProduct(id, productData, images = []) {
  const { error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)

  if (error) throw error

  // Replace de imágenes: eliminar las viejas e insertar nuevas
  const { error: delError } = await supabase
    .from('product_images')
    .delete()
    .eq('product_id', id)

  if (delError) throw delError

  if (images.length > 0) {
    const imageRows = images.map((img, idx) => ({
      product_id: id,
      url: img.url,
      is_main: img.is_main ?? idx === 0,
      order: img.order ?? idx,
    }))

    const { error: imgError } = await supabase
      .from('product_images')
      .insert(imageRows)

    if (imgError) throw imgError
  }

  return getProductById(id)
}

/**
 * Elimina un producto (también elimina imágenes por cascade).
 * @param {string} id
 */
export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
}

/**
 * Activa o desactiva un producto.
 * @param {string} id
 * @param {boolean} isActive
 */
export async function toggleProductStatus(id, isActive) {
  const { error } = await supabase
    .from('products')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) throw error
}
