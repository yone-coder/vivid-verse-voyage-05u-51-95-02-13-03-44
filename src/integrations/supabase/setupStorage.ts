
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
    
    const productImagesBucketExists = buckets.some(bucket => bucket.name === 'product-images');
    
    if (!productImagesBucketExists) {
      // Create the bucket for product images
      const { error: createError } = await supabase.storage.createBucket('product-images', {
        public: true, // Make it publicly accessible
        fileSizeLimit: 5 * 1024 * 1024 // 5MB limit per file
      });
      
      if (createError) {
        console.error('Error creating product-images bucket:', createError);
        return;
      }
      
      console.log('Created product-images storage bucket');
    }
  } catch (error) {
    console.error('Error setting up storage buckets:', error);
  }
};
