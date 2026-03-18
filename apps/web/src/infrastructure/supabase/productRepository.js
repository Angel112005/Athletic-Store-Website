import { supabase } from './client'

export const productRepository = {
  async getAllPublicProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        price,
        discount_percentage,
        brand,
        is_active,
        categories (
          id,
          name
        ),
        product_images (
          id,
          url,
          is_main
        )
      `)
      .eq('is_active', true)

    if (error) {
      console.error('Error fetching products:', error)
      throw error
    }

    return data
  }
}