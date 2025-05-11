import { supabase } from './client';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  created_at?: string;
  updated_at?: string;
  product_images?: ProductImage[];
  user_id?: string;
  inventory?: number;
  sales?: number; // Add missing property
  status?: string; // Add missing property
}

export interface ProductImage {
  id: string;
  product_id: string;
  src: string;
  alt: string;
  created_at?: string;
  updated_at?: string;
}

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    // Need to explicitly type the response to avoid type errors
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*)
      `);
      
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchAllProducts:', error);
    return [];
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    // Need to explicitly type the response to avoid type errors
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*)
      `)
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

// Add the missing fetchUserProducts function
export const fetchUserProducts = async (userId: string): Promise<Product[]> => {
  try {
    if (!userId) {
      console.error('No user ID provided to fetchUserProducts');
      return [];
    }
    
    console.log(`Fetching products for user: ${userId}`);
    
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images(*)
      `)
      .eq('user_id', userId);
      
    if (error) {
      console.error(`Error fetching products for user ${userId}:`, error);
      return [];
    }
    
    console.log(`Found ${data?.length || 0} products for user ${userId}`);
    return data || [];
  } catch (error) {
    console.error(`Error in fetchUserProducts for user ${userId}:`, error);
    return [];
  }
};

// Subscribe to realtime changes - return cleanup function
export const subscribeToProductChanges = (
  callback: () => void
): (() => void) => {
  // Create subscription
  const subscription = supabase
    .channel('products-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'products' },
      callback
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'product_images' },
      callback
    )
    .subscribe();
  
  // Return cleanup function
  return () => {
    console.log('Cleaning up subscription');
    subscription.unsubscribe();
  };
};

export const createProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  user_id?: string; // Add user_id to productData
}): Promise<Product | null> => {
  try {
    // Need to explicitly type the response to avoid type errors
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single() as {
        data: Product | null;
        error: any;
      };
      
    if (error) {
      console.error('Error creating product:', error);
      return null;
    }
    
    console.log('Successfully created product:', data);
    return data;
  } catch (error) {
    console.error('Error in createProduct:', error);
    return null;
  }
};

export const updateProduct = async (
  id: string,
  updates: {
    name?: string;
    description?: string;
    price?: number;
    discount_price?: number | null;
  }
): Promise<Product[] | null | { noChanges: boolean }> => {
  try {
    // Check if there are actually changes (for name specifically)
    if ('name' in updates) {
      const { data: existingProduct } = await supabase
        .from('products')
        .select('name')
        .eq('id', id)
        .single();
      
      if (existingProduct && existingProduct.name === updates.name) {
        console.log('No changes detected in name field');
        return { noChanges: true };
      }
    }
    
    // Apply updates if there are changes
    console.log(`Updating product ${id} with:`, updates);
    
    // Call the update_product function
    const { data, error } = await supabase
      .rpc('update_product', {
        p_id: id,
        p_name: updates.name || null,
        p_description: updates.description || null,
        p_price: updates.price || null,
        p_discount_price: updates.discount_price
      }) as {
        data: Product[] | null;
        error: any;
      };
    
    if (error) {
      console.error(`Error updating product ${id}:`, error);
      return null;
    }
    
    console.log(`Successfully updated product ${id}:`, data);
    return data;
  } catch (error) {
    console.error(`Error in updateProduct for id ${id}:`, error);
    return null;
  }
};
