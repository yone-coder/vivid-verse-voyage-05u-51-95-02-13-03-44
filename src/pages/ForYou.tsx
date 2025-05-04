import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/client";
import AliExpressHeader from "@/components/home/AliExpressHeader";
import HeroBanner from "@/components/home/HeroBanner";
import SpaceSavingCategories from "@/components/home/SpaceSavingCategories";
import FlashDeals from "@/components/home/FlashDeals";
import SuperDeals from "@/components/home/SuperDealsSection";
import ProductGrid from "@/components/home/ProductGrid";
import ProductCarousel from '@/components/home/ProductCarousel';
import TopVendorsCompact from '@/components/home/TopVendorsCompact';
import TopBrands from "@/components/home/TopBrands";
import ProductRecommendations from "@/components/home/ProductRecommendations";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import SecondaryFlashDeals from "@/components/home/SecondaryFlashDeals";
import Newsletter from "@/components/home/Newsletter";
import PopularSearches from "@/components/home/PopularSearches";
import RecentlyViewed from "@/components/home/RecentlyViewed";
import BenefitsBanner from "@/components/home/BenefitsBanner";
import SecondaryHeroBanner from "@/components/home/SecondaryHeroBanner";
import MobileOptimizedReels from "@/components/home/MobileOptimizedReels";
import VendorProductCarousel from "@/components/home/VendorProductCarousel";
import PageSkeleton from "@/components/skeletons/PageSkeleton";

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

  if (!isReady) {
    return <PageSkeleton />;
  }

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white overscroll-none overflow-x-hidden">
      {/* AliExpressHeader component with improved scroll behavior */}
      <AliExpressHeader activeTabId="recommendations" />

      {/* The HeroBanner now has margin-top to account for the header height */}
      <HeroBanner />

      <div className="mb-1">
        <SpaceSavingCategories />
      </div>
      
      {/* Flash Deals Section */}
      <div className="mb-1">
        <FlashDeals />
      </div>

      {/* Secondary Hero Banner - Added after Flash Deals */}
      <div className="mb-1">
        <SecondaryHeroBanner />
      </div>

      {/* Enhanced Popular Searches */}
      <div className="mb-1 bg-white">
        <PopularSearches />
      </div>

      {/* Product Carousel */}
      <div className="mb-1 bg-white">
        <ProductCarousel />
      </div>
      
      {/* Top Vendors Compact - Added after Product Carousel */}
      <div className="mb-1 bg-white">
        <TopVendorsCompact />
      </div>

      {/* Super Deals */}
      <div className="mb-1">
        <SuperDeals />
      </div>
      
      {/* Mobile Optimized Reels - Added after Super Deals */}
      <div className="mb-1 bg-white">
        <MobileOptimizedReels />
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
        <ProductRecommendations products={Array.isArray(products) ? products : []} />
      </div>

      {/* Recently Viewed - Updated Component */}
      <div className="bg-white mb-1">
        <RecentlyViewed />
      </div>

      <div className="bg-white mb-1">
        <VendorProductCarousel />
      </div>

      {/* Extra bottom padding for mobile to account for fixed navigation */}
      {isMobile && <div className="h-16"></div>}
    </div>
  );
}
