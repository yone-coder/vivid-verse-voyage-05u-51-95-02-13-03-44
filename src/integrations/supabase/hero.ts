
import { supabase } from './client';

export interface HeroBanner {
  id: string;
  image: string;
  alt: string;
  created_at?: string;
  updated_at?: string;
}

export const fetchHeroBanners = async (): Promise<HeroBanner[]> => {
  try {
    const { data, error } = await supabase
      .from('hero_banners')
      .select('*')
      .order('position', { ascending: true });
      
    if (error) {
      console.error('Error fetching hero banners:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchHeroBanners:', error);
    return [];
  }
};

export const createHeroBanner = async (banner: Omit<HeroBanner, 'id' | 'created_at' | 'updated_at'>): Promise<HeroBanner | null> => {
  try {
    const { data, error } = await supabase
      .from('hero_banners')
      .insert(banner)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating hero banner:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in createHeroBanner:', error);
    return null;
  }
};

export const deleteHeroBanner = async (id: string): Promise<boolean> => {
  try {
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
