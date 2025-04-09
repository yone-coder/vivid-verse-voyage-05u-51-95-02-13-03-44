
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProductAnalytics {
  viewCount: number;
  recentViewers: number;
  salesLastHour: number;
  trending: boolean;
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_images(*)')
        .eq('id', productId)
        .single();
        
      if (error) {
        console.error('Error fetching product:', error);
        throw new Error('Failed to fetch product');
      }
      
      return data;
    },
    enabled: !!productId,
  });
}

export function useProductAnalytics(productId: string) {
  return useQuery({
    queryKey: ['product-analytics', productId],
    queryFn: async (): Promise<ProductAnalytics> => {
      // Mock analytics data - in a real app, this would be a real API call
      return {
        viewCount: 1435,
        recentViewers: 28,
        salesLastHour: 12,
        trending: true
      };
    },
    enabled: !!productId,
  });
}
