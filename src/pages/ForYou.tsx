
import React from "react";
import { fetchAllProducts } from "@/integrations/supabase/products";
import { useQuery } from "@tanstack/react-query";
import HeroBannerSection from "@/components/HeroBanner";
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
import ProductGrid from "@/components/home/ProductGrid";
import Newsletter from "@/components/home/Newsletter";
import LogoutButton from "@/components/auth/LogoutButton";
import PopularSearches from "@/components/home/PopularSearches";
import TranslationExample from "@/components/home/TranslationExample";
import NewArrivals from "@/components/home/NewArrivals";

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
      {/* Logout Test Button - Positioned in the top right corner */}
      <div className="absolute top-2 right-2 z-50">
        <LogoutButton />
      </div>
      
      <HeroBannerSection />
      
      <div className="space-y-1">
        <SpaceSavingCategories />
        <FlashDeals />
        
        {/* Pass products array safely */}
        {Array.isArray(products) && products.length > 0 && (
          <SuperDealsSection 
            products={products} 
            isLoading={isLoading} 
          />
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
            isLoading={isLoading} 
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
