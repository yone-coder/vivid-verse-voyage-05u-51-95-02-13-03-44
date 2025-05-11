
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/products";
import ProductCarousel from "@/components/home/ProductCarousel";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FlashDeals from "@/components/home/FlashDeals";
import NewArrivals from "@/components/home/NewArrivals";
import Newsletter from "@/components/home/Newsletter";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import AliExpressHeader from "@/components/home/AliExpressHeader";

export default function ForYou() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const isMobile = useIsMobile();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isMobile !== undefined) {
      setIsReady(true);
    }
  }, [isMobile]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overscroll-none">
      {/* AliExpressHeader component with active tab set to recommendations */}
      <AliExpressHeader activeTabId="recommendations" />

      <div className="pt-[72px]">
        <HeroBanner />
              <SpaceSavingCategories />
        <FlashDeals products={products} isLoading={isLoading} />
        <ProductCarousel title="Just For You" products={products} isLoading={isLoading} />
        <NewArrivals products={products} isLoading={isLoading} />
        <Newsletter />
      </div>
    </div>
  );
}
