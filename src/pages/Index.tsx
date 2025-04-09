
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

export default function Index() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Banner Carousel */}
        <HeroBanner />
        
        {/* Featured Categories */}
        <div className="bg-white mb-2 mt-2">
          <FeaturedCategories />
        </div>
        
        {/* Flash Deals Section */}
        <div className="mb-2">
          <FlashDeals />
        </div>
        
        {/* Super Deals */}
        <div className="mb-2">
          <SuperDealsSection />
        </div>
        
        {/* Top Brands */}
        <div className="bg-white mb-2">
          <TopBrands />
        </div>
        
        {/* Recommended Products */}
        <div className="bg-white mb-2">
          <ProductRecommendations products={products} />
        </div>
        
        {/* All Products Grid with Filters */}
        <div className="bg-white">
          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
