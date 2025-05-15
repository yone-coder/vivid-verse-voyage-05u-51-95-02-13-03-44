
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/products";
import PageSkeleton from "@/components/skeletons/PageSkeleton";
import SuperDealsSection from "@/components/home/SuperDealsSection";
import SecondaryHeroBanner from "@/components/home/SecondaryHeroBanner";
import FlashDeals from "@/components/home/FlashDeals";
import ProductRecommendations from "@/components/home/ProductRecommendations";
import SpaceSavingCategories from "@/components/home/SpaceSavingCategories";
import TopBrands from "@/components/home/TopBrands";
import VendorProductCarousel from "@/components/home/VendorProductCarousel";
import SecondaryFlashDeals from "@/components/home/SecondaryFlashDeals";
import BenefitsBanner from "@/components/home/BenefitsBanner";
import TopVendorsCompact from "@/components/home/TopVendorsCompact";
import MobileOptimizedReels from "@/components/home/MobileOptimizedReels";
import Newsletter from "@/components/home/Newsletter";
import PopularSearches from "@/components/home/PopularSearches";
import TranslationExample from "@/components/home/TranslationExample";
import NewArrivals from "@/components/home/NewArrivals";
import HeroBanner from "@/components/home/HeroBanner";

// NOTE: The AliExpressHeader has a total fixed height of about 80px (top bar + category tabs) on both mobile and desktop.
// To ensure the hero banner is visible below the fixed header, we add a top margin that matches or exceeds this header height.
export default function ForYou() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="max-w-screen overflow-hidden pb-16 relative">
      {/* Hero Banner: The header height is now handled dynamically in HeroBanner.tsx */}
      <HeroBanner />

      <div className="space-y-1">
        <SpaceSavingCategories />
        <FlashDeals />
        <TopVendorsCompact />
        <MobileOptimizedReels />
        
        {Array.isArray(products) && products.length > 0 && (
          <SuperDealsSection products={products} />
        )}
        
        <SecondaryHeroBanner />
        <TranslationExample />
        <PopularSearches />
        <TopBrands />
        
        {Array.isArray(products) && products.length > 0 && (
          <VendorProductCarousel 
            title="Technology" 
            products={products.slice(0, 10)} 
          />
        )}
        
        <SecondaryFlashDeals />
        <BenefitsBanner />
        
        <div className="bg-white mb-1">
          {Array.isArray(products) && products.length > 0 && (
            <ProductRecommendations products={products} />
          )}
        </div>
        
        {/* New Arrivals section */}
        {Array.isArray(products) && products.length > 0 && (
          <NewArrivals products={products.slice(0, 4)} />
        )}
        
        <Newsletter />
      </div>
    </div>
  );
}
