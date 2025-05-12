
import React from "react";
import { fetchAllProducts } from "@/integrations/supabase/products";
import { useQuery } from "@tanstack/react-query";
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
import Newsletter from "@/components/home/Newsletter";
import PopularSearches from "@/components/home/PopularSearches";
import TranslationExample from "@/components/home/TranslationExample";
import NewArrivals from "@/components/home/NewArrivals";
import HeroBanner from "@/components/home/HeroBanner";

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
      {/* Hero Banner - with proper header spacing */}
      <div className="mt-[80px] md:mt-[92px]">
        <HeroBanner />
      </div>
      
      <div className="space-y-1">
        <SpaceSavingCategories />
        <FlashDeals />
        
        {/* Pass products array safely */}
        {Array.isArray(products) && products.length > 0 && (
          <SuperDealsSection products={products} />
        )}
        
        <SecondaryHeroBanner />
        <TranslationExample />
        <PopularSearches />
        <TopBrands />
        
        {/* Pass products array safely */}
        {Array.isArray(products) && products.length > 0 && (
          <VendorProductCarousel 
            title="Technology" 
            products={products.slice(0, 10)} 
          />
        )}
        
        <SecondaryFlashDeals />
        <BenefitsBanner />
        <TopVendorsCompact />
        
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
