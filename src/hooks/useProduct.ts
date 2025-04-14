
import { useQuery } from "@tanstack/react-query";
import { supabase, fetchProductById } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export interface ProductAnalytics {
  viewCount: number;
  recentViewers: number;
  salesLastHour: number;
  trending: boolean;
}

export function useProduct(productId: string) {
  const queryClient = useQueryClient();

  // Subscribe to real-time updates for this product
  useEffect(() => {
    if (!productId) return;

    const channel = supabase
      .channel(`product-${productId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'products',
          filter: `id=eq.${productId}`
        },
        (payload) => {
          console.log('Product updated:', payload);
          // Invalidate the query to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ['product', productId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [productId, queryClient]);

  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      return await fetchProductById(productId);
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
