
import React, { useEffect, useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import ProductCarousel from "@/components/ProductCarousel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard, { ProductProps } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useNavigate } from "react-router-dom";
import LiveActivityNotifications from "@/components/LiveActivityNotifications";
import { Separator } from "@/components/ui/separator";

const ForYou = () => {
  const [selectedTab, setSelectedTab] = useState<string>("for_you");
  const { data: products } = useProducts();
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    
    switch(value) {
      case "trending":
        navigate("/trending");
        break;
      case "posts":
        navigate("/posts");
        break;
      case "live":
        navigate("/reels");
        break;
      default:
        // stay on for_you
        break;
    }
  };
  
  const featuredProducts = products?.slice(0, 6) || [];
  const trendingProducts = products?.slice(6, 12) || [];
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Tab Navigation */}
      <div className="w-full overflow-x-auto bg-white sticky top-16 z-10 border-b">
        <div className="container px-4 mx-auto">
          <Tabs 
            value={selectedTab} 
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="w-full justify-start bg-transparent px-0 h-12">
              <TabsTrigger 
                value="for_you" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none px-4"
              >
                For You
              </TabsTrigger>
              <TabsTrigger 
                value="trending" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none px-4"
              >
                Trending
              </TabsTrigger>
              <TabsTrigger 
                value="posts" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none px-4"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger 
                value="live" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none px-4"
              >
                Live
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        <div className="container mx-auto px-4">
          {/* Featured Products */}
          <ProductCarousel title="Featured Products" />
          
          <Separator className="my-6" />
          
          {/* Trending Products */}
          <div className="py-6">
            <h2 className="text-2xl font-bold mb-6">Trending Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
              {trendingProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product} 
                />
              ))}
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {/* Recommended Products */}
          <div className="py-6">
            <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
              {featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Live Activity Notifications */}
      <LiveActivityNotifications />
    </div>
  );
};

export default ForYou;
