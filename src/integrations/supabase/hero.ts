
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
    
    // Need to explicitly type the response to avoid type errors
    const { data, error } = await supabase
      .from('hero_banners')
      .select('*')
      .order('position', { ascending: true }) as { 
        data: HeroBanner[] | null; 
        error: any; 
      };
      
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
      
      // If the image doesn't start with http/https or isn't a local path, assume it's a filename in the bucket
      if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/lovable-uploads')) {
        try {
          // Get the public URL for the file in the hero-banners bucket
          const { data } = supabase.storage
            .from('hero-banners')
            .getPublicUrl(imageUrl);
          
          imageUrl = data.publicUrl;
          console.log(`Generated public URL for ${banner.id}: ${imageUrl}`);
        } catch (err) {
          console.error(`Failed to get public URL for ${banner.image}:`, err);
        }
      }
      
      return {
        ...banner,
        image: imageUrl
      };
    });
    
    console.log('Transformed hero banners with full URLs:', banners);
    return banners;
  } catch (error) {
    console.error('Error in fetchHeroBanners:', error);
    return [];
  }
};

// Use RPC function to bypass RLS policies
export const createHeroBanner = async (banner: { 
  image: string; 
  alt: string; 
  position: number; 
}): Promise<HeroBanner | null> => {
  try {
    console.log('Creating hero banner with data:', banner);

    // Call the create_hero_banner stored function to bypass RLS
    const { data, error } = await supabase
      .rpc('create_hero_banner', {
        p_image: banner.image,
        p_alt: banner.alt,
        p_position: banner.position
      }) as {
        data: HeroBanner | null;
        error: any;
      };
      
    if (error) {
      console.error('Error creating hero banner:', error);
      
      // Fallback: Try direct insert with service role key (if available)
      try {
        console.log('Attempting direct insert as fallback...');
        const { data: insertData, error: insertError } = await supabase
          .from('hero_banners')
          .insert({
            image: banner.image,
            alt: banner.alt,
            position: banner.position
          })
          .select()
          .single() as {
            data: HeroBanner | null;
            error: any;
          };
        
        if (insertError) {
          console.error('Fallback insert failed:', insertError);
          return null;
        }
        
        console.log('Successfully created hero banner via fallback:', insertData);
        return insertData;
      } catch (fallbackError) {
        console.error('Error in fallback creation:', fallbackError);
        return null;
      }
    }
    
    console.log('Successfully created hero banner:', data);
    return data;
  } catch (error) {
    console.error('Error in createHeroBanner:', error);
    return null;
  }
};

export const deleteHeroBanner = async (id: string): Promise<boolean> => {
  try {
    // MODIFIED: Removed auth check for demo purposes
    const { error } = await supabase
      .from('hero_banners')
      .delete()
      .eq('id', id) as {
        error: any;
      };
      
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
    // MODIFIED: Removed auth check for demo purposes
    const { error } = await supabase
      .from('hero_banners')
      .update({ position })
      .eq('id', id) as {
        error: any;
      };
      
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
