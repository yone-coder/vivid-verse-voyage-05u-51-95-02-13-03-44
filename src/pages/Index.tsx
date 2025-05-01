
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
      {/* AliExpressHeader now outside of the Hero Banner container */}
      <AliExpressHeader />
      
      {/* Hero Banner without header overlay */}
      <div className="pt-0">
        <HeroBanner />
      </div>
      
      {/* Benefits Banner with improved layout */}
      <div className="mb-1 bg-white">
        <BenefitsBanner />
      </div>
      
      {/* Featured Categories - replaced with SpaceSavingCategories */}
      <div className="bg-white mb-1">
        <SpaceSavingCategories />
      </div>
      
      {/* Flash Deals Section */}
      <div className="mb-1">
        <FlashDeals />
      </div>
      
      {/* Enhanced Popular Searches */}
      <div className="mb-1 bg-white">
        <PopularSearches />
      </div>
      
      {/* Super Deals */}
      <div className="mb-1">
        <SuperDeals />
      </div>
      
      {/* Secondary Flash Deals - Replaced New Arrivals */}
      <div className="bg-white mb-1">
        <SecondaryFlashDeals />
      </div>
      
      {/* Top Brands */}
      <div className="bg-white mb-1">
        <TopBrands />
      </div>
      
      {/* Duplicate Limited Offers section (replacing Trending Products) */}
      <div className="mb-1">
        <SecondaryFlashDeals />
      </div>
      
      {/* Recommended Products */}
      <div className="bg-white mb-1">
        <ProductRecommendations products={products || []} />
      </div>
      
      {/* Recently Viewed - Updated Component */}
      <div className="bg-white mb-1">
        <RecentlyViewed />
      </div>
      
      {/* Enhanced Newsletter */}
      <div className="mb-1">
        <Newsletter />
      </div>
      
      {/* All Products Grid with Filters */}
      <div className="bg-white pb-16 md:pb-6">
        <ProductGrid products={products || []} isLoading={isLoading} />
      </div>
      
      {/* Extra bottom padding for mobile to account for fixed navigation */}
      {isMobile && <div className="h-16"></div>}
    </div>
  );
}
