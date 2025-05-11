
import { supabase } from './client';
import { PostgrestFilterBuilder } from '@supabase/supabase-js';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  product_images?: ProductImage[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  src: string;
  alt: string;
  created_at?: string;
  updated_at?: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*)');
      
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    return [];
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*)')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Error in fetchProductById for id ${id}:`, error);
    return null;
  }
};

export const fetchUserProducts = async (userId: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*)')
      .eq('user_id', userId);
      
    if (error) {
      console.error(`Error fetching products for user ${userId}:`, error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error in fetchUserProducts for user ${userId}:`, error);
    return [];
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    let searchBuilder: PostgrestFilterBuilder<any, any, any> = supabase
      .from('products')
      .select('*, product_images(*)');
      
    // If we have a search query, filter by name or description
    if (query && query.trim() !== '') {
      searchBuilder = searchBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%`);
    }
    
    const { data, error } = await searchBuilder;
      
    if (error) {
      console.error('Error searching products:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in searchProducts:', error);
    return [];
  }
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating product:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in createProduct:', error);
    return null;
  }
};

export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error(`Error updating product with id ${id}:`, error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Error in updateProduct for id ${id}:`, error);
    return null;
  }
};

export const subscribeToProductChanges = (callback: (payload: any) => void) => {
  const subscription = supabase
    .channel('products_channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, payload => {
      callback(payload);
    })
    .subscribe();

  // Return a cleanup function
  return () => {
    supabase.removeChannel(subscription);
  };
};
