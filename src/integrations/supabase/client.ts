
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Define the Product interface based on the database schema
export interface Product {
  id: string
  name: string
  description: string
  price: number
  discount_price: number | null
  created_at: string
  updated_at: string
  product_images?: ProductImage[]
}

// Define the ProductImage interface
export interface ProductImage {
  id: string
  product_id: string
  src: string
  alt: string
  created_at: string
  updated_at: string
}

// Get the Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wkfzhcszhgewkvwukzes.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZnpoY3N6aGdld2t2d3VremVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3MDE1NzksImV4cCI6MjA1NDI3NzU3OX0.TzSh8M9NOTnsmVaNxquif4xzSxWaVZp9sePHcjrgCVI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
