
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchProductById } from "@/integrations/supabase/products";
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

    console.log(`Setting up real-time subscription for product: ${productId}`);
    
    // Create a channel for subscription to specific product changes
    const channel = supabase
      .channel(`product-${productId}`)
      .on(
        'postgres_changes',
        {
          event: '*', // Listen for all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'products',
          filter: `id=eq.${productId}`
        },
        (payload) => {
          console.log('Product update detected:', payload);
          // Invalidate the query to refetch the latest data
          queryClient.invalidateQueries({ queryKey: ['product', productId] });
        }
      )
      .subscribe((status) => {
        console.log(`Subscription status for product ${productId}:`, status);
      });

    return () => {
      console.log(`Cleaning up subscription for product: ${productId}`);
      supabase.removeChannel(channel);
    };
  }, [productId, queryClient]);

  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      console.log(`Fetching product data for ID: ${productId}`);
      const data = await fetchProductById(productId);
      console.log('Fetched product data:', data);
      return data;
    },
    enabled: !!productId,
    staleTime: 10000, // Consider data fresh for 10 seconds
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
