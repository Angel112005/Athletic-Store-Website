import { productRepository } from '../../infrastructure/supabase/productRepository'

export const getPublicProducts = async () => {
  const products = await productRepository.getAllPublicProducts()

  return products.map(product => {
    const mainImage = product.product_images?.find(img => img.is_main)

    const discount = product.discount_percentage || 0
    const finalPrice = discount
      ? product.price - (product.price * discount) / 100
      : product.price

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discountPercentage: discount,
      finalPrice,
      brand: product.brand,
      category: product.categories?.name || 'Sin categoría',
      imageUrl: mainImage?.url || '',
    }
  })
}