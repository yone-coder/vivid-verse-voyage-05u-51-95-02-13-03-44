
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/client";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FlashDeals from "@/components/home/FlashDeals";
import SuperDealsSection from "@/components/home/SuperDealsSection";
import ProductGrid from "@/components/home/ProductGrid";
import TopBrands from "@/components/home/TopBrands";
import ProductRecommendations from "@/components/home/ProductRecommendations";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import TrendingProducts from "@/components/home/TrendingProducts";
import NewArrivals from "@/components/home/NewArrivals";
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
      {/* Hero Banner Carousel */}
      <div className="mb-1">
        <HeroBanner />
      </div>
      
      {/* Benefits Banner with improved layout */}
      <div className="mb-1 bg-white">
        <BenefitsBanner />
      </div>
      
      {/* Featured Categories - shown in a compact grid on mobile */}
      <div className="bg-white mb-1">
        <FeaturedCategories />
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
        <SuperDealsSection />
      </div>
      
      {/* New Arrivals - New Feature */}
      <div className="bg-white mb-1">
        <NewArrivals products={products?.slice(0, 4)} />
      </div>
      
      {/* Top Brands */}
      <div className="bg-white mb-1">
        <TopBrands />
      </div>
      
      {/* Trending Products - Enhanced */}
      <div className="mb-1">
        <TrendingProducts products={products?.slice(0, 6)} />
      </div>
      
      {/* Recommended Products */}
      <div className="bg-white mb-1">
        <ProductRecommendations products={products} />
      </div>
      
      {/* Recently Viewed */}
      <div className="bg-white mb-1">
        <RecentlyViewed />
      </div>
      
      {/* Enhanced Newsletter */}
      <div className="mb-1">
        <Newsletter />
      </div>
      
      {/* All Products Grid with Filters */}
      <div className="bg-white pb-16 md:pb-6">
        <ProductGrid products={products} isLoading={isLoading} />
      </div>
      
      {/* Extra bottom padding for mobile to account for fixed navigation */}
      {isMobile && <div className="h-16"></div>}
    </div>
  );
}
