
// Import the specific types needed to avoid circular references
import { Product } from './types';
import { supabase } from './client';

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
