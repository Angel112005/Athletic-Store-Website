import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} from '@/infrastructure/supabase/productRepository'

import { getOrCreateCategory } from '@/infrastructure/supabase/categoryRepository'
import { uploadImage }          from '@/infrastructure/cloudinary/uploadService'

/**
 * Obtiene todos los productos para el admin.
 */
export async function fetchAdminProducts() {
  return getAllProducts()
}

/**
 * Obtiene un producto por ID para edición.
 */
export async function fetchProductForEdit(id) {
  return getProductById(id)
}

/**
 * Caso de uso: guardar producto (crear o actualizar).
 * Orquesta:
 *  1. Resolver categoría (crear si no existe)
 *  2. Subir imágenes nuevas a Cloudinary
 *  3. Persistir producto + imágenes en Supabase
 *
 * @param {object} formData
 * @param {string|null} existingId  — null = crear, string = editar
 * @param {Function} onProgress  — callback(percent)
 */
export async function saveProduct(formData, existingId = null, onProgress = null) {
  const {
    name,
    description,
    brand,
    categoryName,
    price,
    discountPercentage,
    isActive,
    images, // [{ file?: File, url?: string, is_main: bool, order: number }]
  } = formData

  // 1. Resolver categoría
  let categoryId = null
  if (categoryName?.trim()) {
    const category = await getOrCreateCategory(categoryName)
    categoryId = category.id
  }

  // 2. Subir imágenes nuevas a Cloudinary
  const resolvedImages = []
  for (let i = 0; i < images.length; i++) {
    const img = images[i]
    if (img.file) {
      // Nueva imagen — subir
      const uploaded = await uploadImage(img.file, {
        onProgress: onProgress ? (p) => onProgress(i, images.length, p) : undefined,
      })
      resolvedImages.push({
        url:     uploaded.url,
        is_main: img.is_main,
        order:   i,
      })
    } else if (img.url) {
      // Imagen existente (ya tiene URL)
      resolvedImages.push({
        url:     img.url,
        is_main: img.is_main,
        order:   i,
      })
    }
  }

  // 3. Datos del producto
  const productData = {
    name:                name.trim(),
    description:         description?.trim() ?? '',
    brand:               brand?.trim() ?? '',
    category_id:         categoryId,
    price:               parseFloat(price),
    discount_percentage: discountPercentage ? parseInt(discountPercentage) : null,
    is_active:           isActive,
  }

  // 4. Persistir
  if (existingId) {
    return updateProduct(existingId, productData, resolvedImages)
  }
  return createProduct(productData, resolvedImages)
}

/**
 * Elimina un producto.
 */
export async function removeProduct(id) {
  return deleteProduct(id)
}

/**
 * Cambia el estado activo/inactivo de un producto.
 */
export async function toggleProduct(id, isActive) {
  return toggleProductStatus(id, isActive)
}
