
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/integrations/supabase/client";

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
  });
}

// Add new hook for product analytics
export function useProductAnalytics(productId: string) {
  return useQuery({
    queryKey: ['product-analytics', productId],
    queryFn: async () => {
      // Simulated data that would come from a real API
      return {
        viewCount: Math.floor(Math.random() * 50) + 120,
        recentViewers: Math.floor(Math.random() * 15) + 5,
        salesLastHour: Math.floor(Math.random() * 20) + 10,
        trending: true,
        historicalPrices: [39.99, 34.99, 29.99, 27.99, 24.99],
        priceDropDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        salesVelocity: "high",
        stockVelocity: "decreasing",
        popularity: 87,
      };
    },
    refetchInterval: 60000, // Refetch every minute
    enabled: !!productId,
  });
}
