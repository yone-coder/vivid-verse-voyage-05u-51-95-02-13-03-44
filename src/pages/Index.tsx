
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FlashDeals from "@/components/home/FlashDeals";
import SuperDealsSection from "@/components/home/SuperDealsSection";
import ProductGrid from "@/components/home/ProductGrid";
import TopBrands from "@/components/home/TopBrands";
import ProductRecommendations from "@/components/home/ProductRecommendations";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Index() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });
  
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow pb-16 md:pb-0">
        {/* Hero Banner Carousel */}
        <HeroBanner />
        
        {/* Featured Categories */}
        <div className="bg-white mb-1 mt-1">
          <FeaturedCategories />
        </div>
        
        {/* Flash Deals Section */}
        <div className="mb-1">
          <FlashDeals />
        </div>
        
        {/* Super Deals */}
        <div className="mb-1">
          <SuperDealsSection />
        </div>
        
        {/* Top Brands */}
        <div className="bg-white mb-1">
          <TopBrands />
        </div>
        
        {/* Recommended Products */}
        <div className="bg-white mb-1">
          <ProductRecommendations products={products} />
        </div>
        
        {/* All Products Grid with Filters */}
        <div className="bg-white">
          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </main>
      
      {/* Footer - hide on mobile since we have bottom navigation */}
      {!isMobile && <Footer />}
    </div>
  );
}
