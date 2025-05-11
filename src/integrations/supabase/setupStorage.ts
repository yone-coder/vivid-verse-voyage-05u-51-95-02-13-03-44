
import { supabase } from "./client";

/**
 * Sets up storage buckets for the application if they don't exist
 */
export const setupStorageBuckets = async () => {
  try {
    // Check if the user is authenticated (needed for creating buckets)
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      console.log('User is not authenticated. Skipping bucket creation.');
      return;
    }

    // Check if the needed buckets already exist
    const { data: buckets, error } = await supabase
      .storage
      .listBuckets();
    
    if (error) {
      console.error('Error checking buckets:', error);
      return;
    }
    
    if (!buckets) {
      console.error('No buckets returned from Supabase');
      return;
    }
    
    console.log('Available buckets:', buckets);
    
    // Check for hero-banners bucket and create it if it doesn't exist
    const heroBannersBucketExists = buckets.some(bucket => bucket.name === 'hero-banners');
    
    if (!heroBannersBucketExists) {
      console.log('Hero banners bucket does not exist, creating it...');
      const { error: createError } = await supabase
        .storage
        .createBucket('hero-banners', {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        });
      
      if (createError) {
        console.error('Error creating hero-banners bucket:', createError);
        console.log('Note: You may need to enable bucket creation in your Supabase RLS policies');
      } else {
        console.log('Successfully created hero-banners bucket');
      }
    }
    
    // Check for product-images bucket and create it if it doesn't exist
    const productImagesBucketExists = buckets.some(bucket => bucket.name === 'product-images');
    
    if (!productImagesBucketExists) {
      console.log('Product images bucket does not exist, creating it...');
      const { error: createError } = await supabase
        .storage
        .createBucket('product-images', {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        });
      
      if (createError) {
        console.error('Error creating product-images bucket:', createError);
        console.log('Note: You may need to enable bucket creation in your Supabase RLS policies');
      } else {
        console.log('Successfully created product-images bucket');
      }
    }
  } catch (error) {
    console.error('Error setting up storage buckets:', error);
  }
};

// Helper function to generate public URL for a storage item
export const getPublicUrl = (bucket: string, path: string): string => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
