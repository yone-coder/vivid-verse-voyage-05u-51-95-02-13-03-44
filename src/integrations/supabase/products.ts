import { supabase } from './client';
import { getPublicUrl } from './setupStorage';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount_price?: number;
  image: string;
  inventory: number;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('Starting fetchProducts...');
    
    // Need to explicitly type the response to avoid type errors
    const { data, error } = await supabase
      .from('products')
      .select('*') as { 
        data: Product[] | null; 
        error: any; 
      };
      
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    console.log('Raw data from Supabase:', data);
    
    if (!data || data.length === 0) {
      console.log('No products found in database');
      return [];
    }
    
    // Transform the data to ensure image URLs are properly formatted
    const products = data.map(product => {
      // Check if the image is a full URL or just a path
      let imageUrl = product.image;
      
      console.log(`Processing product ${product.id} with image path: ${imageUrl}`);
      
      // If the image already starts with http or https, assume it's a complete URL
      if (imageUrl && !imageUrl.startsWith('http')) {
        try {
          // Get public URL from Supabase storage
          imageUrl = getPublicUrl('products', imageUrl);
          console.log(`Transformed image URL for ${product.id}: ${product.image} -> ${imageUrl}`);
        } catch (err) {
          console.error(`Failed to get public URL for ${product.image}:`, err);
        }
      }
      
      return {
        ...product,
        image: imageUrl
      };
    });
    
    console.log('Transformed products:', products);
    return products;
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    return [];
  }
};

// Fetch products for a specific user
export const fetchUserProducts = async (userId: string): Promise<Product[]> => {
  try {
    console.log(`Fetching products for user ${userId}...`);
    
    // Need to explicitly type the response to avoid type errors
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', userId) as { 
        data: Product[] | null; 
        error: any; 
      };
      
    if (error) {
      console.error(`Error fetching products for user ${userId}:`, error);
      return [];
    }

    console.log(`Raw data from Supabase for user ${userId}:`, data);
    
    if (!data || data.length === 0) {
      console.log(`No products found for user ${userId}`);
      return [];
    }
    
    // Transform the data to ensure image URLs are properly formatted
    const products = data.map(product => {
      // Check if the image is a full URL or just a path
      let imageUrl = product.image;
      
      // If the image already starts with http or https, assume it's a complete URL
      if (imageUrl && !imageUrl.startsWith('http')) {
        try {
          // Get public URL from Supabase storage
          imageUrl = getPublicUrl('products', imageUrl);
        } catch (err) {
          console.error(`Failed to get public URL for ${product.image}:`, err);
        }
      }
      
      return {
        ...product,
        image: imageUrl
      };
    });
    
    return products;
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
