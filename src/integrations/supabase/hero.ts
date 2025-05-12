
import { supabase } from './client';
import { getPublicUrl } from './setupStorage';

export interface HeroBanner {
  id: string;
  image: string;
  alt: string;
  position: number;
  created_at?: string;
  updated_at?: string;
}

export const fetchHeroBanners = async (): Promise<HeroBanner[]> => {
  try {
    console.log('Starting fetchHeroBanners...');
    
    // Check if user is authenticated for debugging
    const { data: userData } = await supabase.auth.getUser();
    console.log('Current auth state:', userData?.user ? 'Authenticated' : 'Not authenticated');
    
    const { data, error } = await supabase
      .from('hero_banners')
      .select('*')
      .order('position', { ascending: true });
      
    if (error) {
      console.error('Error fetching hero banners:', error);
      return [];
    }

    console.log('Raw data from Supabase:', data);
    
    if (!data || data.length === 0) {
      console.log('No hero banners found in database');
      return [];
    }
    
    // Transform the data to ensure image URLs are properly formatted
    const banners = data.map(banner => {
      // Check if the image is a full URL or just a path
      let imageUrl = banner.image;
      
      console.log(`Processing banner ${banner.id} with image path: ${imageUrl}`);
      
      // If the image already starts with http or https, assume it's a complete URL
      if (imageUrl && !imageUrl.startsWith('http')) {
        try {
          // Get public URL from Supabase storage
          imageUrl = getPublicUrl('hero-banners', imageUrl);
          console.log(`Transformed image URL for ${banner.id}: ${banner.image} -> ${imageUrl}`);
        } catch (err) {
          console.error(`Failed to get public URL for ${banner.image}:`, err);
        }
      }
      
      return {
        ...banner,
        image: imageUrl
      };
    });
    
    console.log('Transformed hero banners:', banners);
    return banners;
  } catch (error) {
    console.error('Error in fetchHeroBanners:', error);
    return [];
  }
};

// Create a banner - simplified version without URL parsing
export const createHeroBanner = async (banner: { 
  image: string; 
  alt: string; 
  position: number; 
}): Promise<HeroBanner | null> => {
  try {
    // Check if user is authenticated before trying to create
    const { data: user } = await supabase.auth.getUser();
    if (!user || !user.user) {
      console.error('User not authenticated. Cannot create hero banner.');
      return null;
    }

    console.log('Creating hero banner with data:', banner);

    const { data, error } = await supabase
      .from('hero_banners')
      .insert(banner)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating hero banner:', error);
      return null;
    }
    
    console.log('Successfully created hero banner:', data);
    
    // Return the newly created banner with a proper image URL
    if (data.image && !data.image.startsWith('http')) {
      data.image = getPublicUrl('hero-banners', data.image);
    }
    
    return data;
  } catch (error) {
    console.error('Error in createHeroBanner:', error);
    return null;
  }
};

export const deleteHeroBanner = async (id: string): Promise<boolean> => {
  try {
    // Check if user is authenticated before trying to delete
    const { data: user } = await supabase.auth.getUser();
    if (!user || !user.user) {
      console.error('User not authenticated. Cannot delete hero banner.');
      return false;
    }
    
    // Get the banner to delete its image from storage
    const { data: banner } = await supabase
      .from('hero_banners')
      .select('image')
      .eq('id', id)
      .single();
    
    if (banner && banner.image) {
      // Extract the path from the image URL if it's a full URL
      let storagePath = banner.image;
      if (storagePath.startsWith('http')) {
        try {
          const url = new URL(storagePath);
          // Extract just the filename from the path
          const parts = url.pathname.split('/');
          storagePath = parts[parts.length - 1];
        } catch (e) {
          console.log('Could not parse URL, might be a direct storage path');
        }
      }
      
      // Only delete from storage if it doesn't start with http (otherwise might be an external URL)
      if (!banner.image.startsWith('http')) {
        console.log(`Attempting to delete image from storage: ${storagePath}`);
        const { error: storageError } = await supabase.storage
          .from('hero-banners')
          .remove([storagePath]);
        
        if (storageError) {
          console.warn('Could not delete image file from storage:', storageError);
          // Continue with deleting database record even if storage deletion fails
        }
      }
    }

    // Delete from database
    const { error } = await supabase
      .from('hero_banners')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error(`Error deleting hero banner with id ${id}:`, error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error in deleteHeroBanner for id ${id}:`, error);
    return false;
  }
};

export const updateHeroBannerPosition = async (id: string, position: number): Promise<boolean> => {
  try {
    // Check if user is authenticated before trying to update
    const { data: user } = await supabase.auth.getUser();
    if (!user || !user.user) {
      console.error('User not authenticated. Cannot update hero banner position.');
      return false;
    }

    const { error } = await supabase
      .from('hero_banners')
      .update({ position })
      .eq('id', id);
      
    if (error) {
      console.error(`Error updating hero banner position for id ${id}:`, error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error in updateHeroBannerPosition for id ${id}:`, error);
    return false;
  }
};
