/**
 * Product Entity
 *
 * Encapsula la lógica de negocio pura del producto.
 * Sin dependencias externas. La capa de presentación
 * usa estas funciones para derivar valores calculados.
 */

/**
 * Calcula el precio final aplicando el descuento.
 * El precio original NO se almacena en la DB con el descuento ya aplicado.
 * @param {number} price
 * @param {number|null} discountPercentage
 * @returns {number}
 */
export function getDiscountedPrice(price, discountPercentage) {
  if (!discountPercentage || discountPercentage <= 0) return price
  return price - (price * discountPercentage) / 100
}

/**
 * Formatea un precio a moneda (USD por defecto).
 * @param {number} amount
 * @param {string} currency
 * @returns {string}
 */
export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Obtiene la imagen principal de un producto.
 * @param {Array} images
 * @returns {object|null}
 */
export function getMainImage(images = []) {
  if (!images.length) return null
  return images.find((img) => img.is_main) ?? images[0]
}

/**
 * Verifica si un producto tiene descuento activo.
 * @param {object} product
 * @returns {boolean}
 */
export function hasDiscount(product) {
  return product.discount_percentage > 0
}

/**
 * Transforma el raw de Supabase a la entidad de dominio.
 * Normaliza nombres de campos y agrega valores calculados.
 * @param {object} raw
 * @returns {object}
 */
export function fromSupabase(raw) {
  const mainImage = getMainImage(raw.product_images ?? [])
  const finalPrice = getDiscountedPrice(raw.price, raw.discount_percentage)

  return {
    id: raw.id,
    name: raw.name,
    description: raw.description ?? '',
    brand: raw.brand ?? '',
    price: raw.price,
    discountPercentage: raw.discount_percentage ?? 0,
    finalPrice,
    finalPriceFormatted: formatPrice(finalPrice),
    originalPriceFormatted: formatPrice(raw.price),
    isActive: raw.is_active,
    createdAt: raw.created_at,
    categoryId: raw.category_id,
    category: raw.categories ?? null,
    images: (raw.product_images ?? []).sort((a, b) => {
      if (a.is_main) return -1
      if (b.is_main) return 1
      return (a.order ?? 0) - (b.order ?? 0)
    }),
    mainImageUrl: mainImage?.url ?? null,
    hasDiscount: hasDiscount(raw),
  }
}
