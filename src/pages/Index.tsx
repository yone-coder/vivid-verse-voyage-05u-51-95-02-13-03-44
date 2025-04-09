
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Banner Carousel */}
        <HeroBanner />
        
        {/* Featured Categories */}
        <FeaturedCategories />
        
        {/* Flash Deals Section */}
        <FlashDeals />
        
        {/* Super Deals */}
        <SuperDealsSection />
        
        {/* Top Brands */}
        <TopBrands />
        
        {/* Recommended Products Tabs */}
        <ProductRecommendations products={products} />
        
        {/* All Products Grid with Filters */}
        <ProductGrid products={products} isLoading={isLoading} />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
