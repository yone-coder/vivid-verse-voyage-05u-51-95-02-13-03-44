
// Import the specific types needed to avoid circular references
import { supabase } from './client';

// Define Product type directly in the file since it's not exported from types.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price?: number | null;
  created_at: string;
  updated_at: string;
  product_images?: ProductImage[];
  image?: string;
  inventory?: number;
  sales?: number;
  user_id?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  src: string;
  alt: string;
}

// Fetch all products from the supabase table
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*)');

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    const products = data.map(product => ({
      ...product,
      image: product.product_images && product.product_images.length > 0
        ? product.product_images[0].src
        : 'https://via.placeholder.com/400'
    }));

    return products;
  } catch (err) {
    console.error('Unexpected error fetching products:', err);
    return [];
  }
}

// Fetch products for a specific user
export async function fetchUserProducts(userId: string): Promise<Product[]> {
  try {
    if (!userId) {
      console.error('No user ID provided for fetching products');
      return [];
    }
    
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*)')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user products:', error);
      return [];
    }

    return data.map(product => ({
      ...product,
      image: product.product_images && product.product_images.length > 0
        ? product.product_images[0].src
        : 'https://via.placeholder.com/400'
    }));
  } catch (err) {
    console.error('Unexpected error fetching user products:', err);
    return [];
  }
}

// Fetch a single product by its ID
export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      return null;
    }

    return {
      ...data,
      image: data.product_images && data.product_images.length > 0
        ? data.product_images[0].src
        : 'https://via.placeholder.com/400'
    };
  } catch (err) {
    console.error(`Unexpected error fetching product with ID ${id}:`, err);
    return null;
  }
}

// Search products by a query string
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    // This will search the name column for the query string (ilike is case insensitive)
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*)')
      .ilike('name', `%${query}%`);

    if (error) {
      console.error('Error searching products:', error);
      return [];
    }

    return data.map(product => ({
      ...product,
      image: product.product_images && product.product_images.length > 0
        ? product.product_images[0].src
        : 'https://via.placeholder.com/400'
    }));
  } catch (err) {
    console.error('Unexpected error searching products:', err);
    return [];
  }
}

// Create a new product
export async function createProduct(productData: {
  name: string;
  description: string;
  price: number;
  discount_price?: number | null;
  user_id?: string;
}): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select('*')
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error creating product:', err);
    return null;
  }
}

// Update an existing product
export async function updateProduct(
  id: string, 
  updates: Partial<Product>
): Promise<Product[] | null> {
  try {
    // Check if there's actually something to update
    if (Object.keys(updates).length === 0) {
      console.warn('No updates provided for product update');
      return { noChanges: true } as any;
    }

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select('*');

    if (error) {
      console.error('Error updating product:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error updating product:', err);
    return null;
  }
}

// Subscribe to product changes
export function subscribeToProductChanges(callback: () => void): () => void {
  // Subscribe to the products table
  const channel = supabase
    .channel('products_channel')
    .on(
      'postgres_changes',
      {
        event: '*', // Listen for all events (insert, update, delete)
        schema: 'public',
        table: 'products'
      },
      () => {
        console.log('Product change detected');
        callback();
      }
    )
    .subscribe((status) => {
      console.log(`Supabase channel status: ${status}`);
    });

  // Return a cleanup function
  return () => {
    console.log('Unsubscribing from products channel');
    supabase.removeChannel(channel);
  };
}
