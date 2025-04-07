
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/integrations/supabase/client";

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
  });
}
