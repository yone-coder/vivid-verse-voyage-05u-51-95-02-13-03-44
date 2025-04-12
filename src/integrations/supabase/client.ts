
import { createClient } from '@supabase/supabase-js'
import { Product } from './types'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
)

export const fetchProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (*)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}

export const fetchAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (*)
    `)

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

export const fetchProductAnalytics = async (id: string) => {
  // This is a placeholder for real analytics data
  // In a real app, you would fetch this from a table
  return {
    views: Math.floor(Math.random() * 10000) + 1000,
    wishlisted: Math.floor(Math.random() * 500) + 100,
    purchases: Math.floor(Math.random() * 300) + 50,
    conversionRate: (Math.random() * 5 + 1).toFixed(2),
  }
}
