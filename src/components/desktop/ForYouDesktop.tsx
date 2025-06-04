
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

export default function ForYouDesktop() {
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
      {/* Hero Banner */}
      <HeroBanner />

      {/* Main Desktop Layout with Multiple Columns */}
      <div className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Sidebar - 3 columns */}
          <div className="col-span-3 space-y-4">
            <SpaceSavingCategories />
            <TopVendorsCompact />
            <PopularSearches />
            <TranslationExample />
          </div>

          {/* Main Content Area - 6 columns */}
          <div className="col-span-6 space-y-4">
            <FlashDeals />
            
            {Array.isArray(products) && products.length > 0 && (
              <SuperDealsSection products={products} />
            )}
            
            <SecondaryHeroBanner />
            
            {Array.isArray(products) && products.length > 0 && (
              <VendorProductCarousel 
                title="Technology" 
                products={products.slice(0, 10)} 
              />
            )}
            
            <SecondaryFlashDeals />
            
            <div className="bg-white mb-1">
              {Array.isArray(products) && products.length > 0 && (
                <ProductRecommendations products={products} />
              )}
            </div>
          </div>

          {/* Right Sidebar - 3 columns */}
          <div className="col-span-3 space-y-4">
            <TopBrands />
            <MobileOptimizedReels />
            <BenefitsBanner />
            
            {/* New Arrivals section */}
            {Array.isArray(products) && products.length > 0 && (
              <NewArrivals products={products.slice(0, 4)} />
            )}
            
            <Newsletter />
          </div>
        </div>
      </div>
    </div>
  );
}
