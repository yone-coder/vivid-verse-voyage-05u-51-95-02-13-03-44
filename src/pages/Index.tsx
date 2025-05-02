import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/client";
import AliExpressHeader from "@/components/home/AliExpressHeader";
import HeroBanner from "@/components/home/HeroBanner";
import SpaceSavingCategories from "@/components/home/SpaceSavingCategories";
import FlashDeals from "@/components/home/FlashDeals";
import SuperDeals from "@/components/home/SuperDealsSection";
import ProductGrid from "@/components/home/ProductGrid";
import TopBrands from "@/components/home/TopBrands";
import ProductRecommendations from "@/components/home/ProductRecommendations";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import SecondaryFlashDeals from "@/components/home/SecondaryFlashDeals";
import Newsletter from "@/components/home/Newsletter";
import PopularSearches from "@/components/home/PopularSearches";
import RecentlyViewed from "@/components/home/RecentlyViewed";
import BenefitsBanner from "@/components/home/BenefitsBanner";

export default function Index() {
  const { data: products, isLoading } = useQuery({
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

  if (!isReady) {
    return null; // Prevent flash while detecting mobile
  }

  return (
    <div className="flex-grow pb-20 md:pb-0">
      {/* AliExpressHeader component - will overlay on top of the hero banner */}
      <AliExpressHeader />

      {/* Main content area - NO padding at the top to allow hero banner to go behind header */}
      <div className="relative">
        {/* Hero Banner positioned directly at the top */}
        <HeroBanner />
        
        {/* The rest of the content with normal flow */}
        <div className="mb-1 bg-white">
          <BenefitsBanner />
        </div>

        <div className="bg-white mb-1">
          <SpaceSavingCategories />
        </div>

        <div className="mb-1">
          <FlashDeals />
        </div>

        <div className="mb-1 bg-white">
          <PopularSearches />
        </div>

        <div className="mb-1">
          <SuperDeals />
        </div>

        <div className="bg-white mb-1">
          <SecondaryFlashDeals />
        </div>

        <div className="bg-white mb-1">
          <TopBrands />
        </div>

        <div className="mb-1">
          <SecondaryFlashDeals />
        </div>

        <div className="bg-white mb-1">
          <ProductRecommendations products={products || []} />
        </div>

        <div className="bg-white mb-1">
          <RecentlyViewed />
        </div>

        <div className="mb-1">
          <Newsletter />
        </div>

        <div className="bg-white pb-16 md:pb-6">
          <ProductGrid products={products || []} isLoading={isLoading} />
        </div>

        {/* Extra bottom padding for mobile to account for fixed navigation */}
        {isMobile && <div className="h-16"></div>}
      </div>
    </div>
  );
}