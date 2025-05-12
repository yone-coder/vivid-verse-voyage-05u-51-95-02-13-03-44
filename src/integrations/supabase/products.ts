
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
  product_images?: { id: string; src: string; alt?: string }[];
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('Starting fetchProducts...');
    
    // Need to explicitly type the response to avoid type errors
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*)');
      
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
      // Use the first product image as the main image or a placeholder
      let imageUrl = product.product_images && product.product_images.length > 0 
        ? product.product_images[0].src
        : '';
      
      console.log(`Processing product ${product.id} with image path: ${imageUrl}`);
      
      // If the image already starts with http or https, assume it's a complete URL
      if (imageUrl && !imageUrl.startsWith('http')) {
        try {
          // Get public URL from Supabase storage
          imageUrl = getPublicUrl('products', imageUrl);
          console.log(`Transformed image URL for ${product.id}: ${imageUrl}`);
        } catch (err) {
          console.error(`Failed to get public URL for image:`, err);
        }
      }
      
      // Always default inventory to 0 since it doesn't exist in the database response
      const inventoryValue = 0;
      
      return {
        ...product,
        image: imageUrl,
        inventory: inventoryValue
      } as Product;
    });
    
    console.log('Transformed products:', products);
    return products;
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    return [];
  }
};

// Add alias for fetchAllProducts
export const fetchAllProducts = fetchProducts;

// Fetch products for a specific user
export const fetchUserProducts = async (userId: string): Promise<Product[]> => {
  try {
    console.log(`Fetching products for user ${userId}...`);
    
    // Need to explicitly type the response to avoid type errors
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*)')
      .eq('user_id', userId);
      
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
      // Use the first product image as the main image or a placeholder
      let imageUrl = product.product_images && product.product_images.length > 0 
        ? product.product_images[0].src
        : '';
      
      // If the image already starts with http or https, assume it's a complete URL
      if (imageUrl && !imageUrl.startsWith('http')) {
        try {
          // Get public URL from Supabase storage
          imageUrl = getPublicUrl('products', imageUrl);
        } catch (err) {
          console.error(`Failed to get public URL for image:`, err);
        }
      }
      
      // Always default inventory to 0 since it doesn't exist in the database response
      const inventoryValue = 0;
      
      return {
        ...product,
        image: imageUrl,
        inventory: inventoryValue
      } as Product;
    });
    
    return products;
  } catch (error) {
    console.error(`Error in fetchUserProducts for user ${userId}:`, error);
    return [];
  }
};

// Add fetchProductById function
export const fetchProductById = async (productId: string): Promise<Product | null> => {
  try {
    console.log(`Fetching product details for id ${productId}...`);
    
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*)')
      .eq('id', productId)
      .single();
      
    if (error) {
      console.error(`Error fetching product ${productId}:`, error);
      return null;
    }

    if (!data) {
      console.log(`No product found for id ${productId}`);
      return null;
    }
    
    // Process image URL
    let imageUrl = data.product_images && data.product_images.length > 0 
      ? data.product_images[0].src
      : '';
      
    if (imageUrl && !imageUrl.startsWith('http')) {
      try {
        imageUrl = getPublicUrl('products', imageUrl);
      } catch (err) {
        console.error(`Failed to get public URL for image:`, err);
      }
    }
    
    // Always default inventory to 0 since it doesn't exist in the database response
    const inventoryValue = 0;
    
    return {
      ...data,
      image: imageUrl,
      inventory: inventoryValue
    } as Product;
  } catch (error) {
    console.error(`Error in fetchProductById for id ${productId}:`, error);
    return null;
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
  user_id?: string;
}): Promise<Product | null> => {
  try {
    // Need to explicitly type the response to avoid type errors
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating product:', error);
      return null;
    }
    
    console.log('Successfully created product:', data);
    return {
      ...data,
      image: '',
      inventory: 0
    } as Product;
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
      });
    
    if (error) {
      console.error(`Error updating product ${id}:`, error);
      return null;
    }
    
    console.log(`Successfully updated product ${id}:`, data);
    
    // Transform data to match Product interface
    if (Array.isArray(data)) {
      return data.map(item => ({
        ...item,
        image: '', // Default image as empty string
        inventory: 0 // Default inventory as 0
      })) as Product[];
    }
    
    return null;
  } catch (error) {
    console.error(`Error in updateProduct for id ${id}:`, error);
    return null;
  }
};
