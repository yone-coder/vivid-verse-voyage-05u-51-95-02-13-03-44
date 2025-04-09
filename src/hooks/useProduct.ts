
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type ProductWithImages = Tables<"products"> & {
  product_images: Tables<"product_images">[];
};

export interface ProductAnalytics {
  viewCount: number;
  recentViewers: number;
  salesLastHour: number;
  trending: boolean;
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
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
