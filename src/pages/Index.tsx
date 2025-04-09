
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
import FeaturedProduct from "@/components/home/FeaturedProduct";
import TrendingProducts from "@/components/home/TrendingProducts";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import CategoryGrid from "@/components/home/CategoryGrid";

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

  // Get a random featured product
  const featuredProduct = products && products.length > 0 
    ? products[Math.floor(Math.random() * products.length)]
    : null;

  return (
    <div className="flex-grow pb-20 md:pb-0">
      {/* Hero Banner Carousel */}
      <div className="mb-1">
        <HeroBanner />
      </div>
      
      {/* Featured Categories - shown in a compact grid on mobile */}
      <div className="bg-white mb-1">
        <FeaturedCategories />
      </div>
      
      <div className="container mx-auto px-4 py-4">
        {/* Featured Product */}
        <FeaturedProduct product={featuredProduct} isLoading={isLoading} />
        
        {/* Category Grid */}
        <CategoryGrid />
        
        {/* Flash Deals Section */}
        <div className="mb-6">
          <FlashDeals />
        </div>
        
        {/* Trending Products */}
        <TrendingProducts products={products} isLoading={isLoading} />
        
        {/* Newsletter Signup */}
        <NewsletterSignup />
        
        {/* Super Deals */}
        <div className="mb-6">
          <SuperDealsSection />
        </div>
        
        {/* Top Brands */}
        <div className="bg-white rounded-lg mb-6">
          <TopBrands />
        </div>
        
        {/* Recommended Products */}
        <div className="bg-white rounded-lg mb-6">
          <ProductRecommendations products={products} />
        </div>
        
        {/* All Products Grid with Filters */}
        <div className="bg-white rounded-lg pb-16 md:pb-6">
          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </div>
      
      {/* Extra bottom padding for mobile to account for fixed navigation */}
      {isMobile && <div className="h-16"></div>}
    </div>
  );
}
