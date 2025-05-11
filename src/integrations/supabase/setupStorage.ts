
import { supabase } from "./client";

/**
 * Sets up storage buckets for the application if they don't exist
 */
export const setupStorageBuckets = async () => {
  try {
    // Check if the product-images bucket already exists
    const { data: buckets, error } = await supabase
      .storage
      .listBuckets();
    
    if (error) {
      console.error('Error checking buckets:', error);
      return;
    }
    
    console.log('Available buckets:', buckets);
    
    // Check for hero-banners bucket
    const heroBannersBucketExists = buckets.some(bucket => bucket.name === 'hero-banners');
    
    if (!heroBannersBucketExists) {
      console.log('Hero banners bucket does not exist, this should be created via SQL migration');
    }
    
    // Check for product-images bucket
    const productImagesBucketExists = buckets.some(bucket => bucket.name === 'product-images');
    
    if (!productImagesBucketExists) {
      console.log('Product images bucket does not exist, this should be created via SQL migration');
    }
  } catch (error) {
    console.error('Error setting up storage buckets:', error);
  }
};
