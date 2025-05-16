
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/products";
import AliExpressHeader from "@/components/home/AliExpressHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import VendorProductCarousel from "@/components/home/VendorProductCarousel";
import PostsSkeleton from "@/components/skeletons/PostsSkeleton";

export default function Posts() {
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
    return <PostsSkeleton />;
  }

  if (isLoading) {
    return <PostsSkeleton />;
  }

  // Vendor data for multiple carousels
  const vendors = [
    {
      id: 1,
      title: "Fashion Boutique",
      products: products.slice(0, 10)
    },
    {
      id: 2,
      title: "Tech Gadgets Store",
      products: [...products].reverse().slice(0, 8)
    },
    {
      id: 3,
      title: "Home Decor Shop",
      products: [...products].sort(() => 0.5 - Math.random()).slice(0, 9)
    },
    {
      id: 4,
      title: "Sports Equipment",
      products: products.slice(0, 7)
    },
    {
      id: 5,
      title: "Kitchen Essentials",
      products: [...products].reverse().slice(0, 6)
    },
    {
      id: 6,
      title: "Beauty Products",
      products: [...products].sort(() => 0.5 - Math.random()).slice(0, 8)
    },
    {
      id: 7,
      title: "Outdoor Gear",
      products: products.slice(0, 5)
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overscroll-none overflow-x-hidden">
      {/* AliExpressHeader component with active tab set to posts */}
      <AliExpressHeader activeTabId="posts" />

      <div className="pt-[44px] pb-16">
        {/* Infinite list of VendorProductCarousel components */}
        <div className="space-y-6 mt-2 pb-8">
          {vendors.map(vendor => (
            <div key={vendor.id} className="bg-white pb-4">
              <VendorProductCarousel 
                title={vendor.title}
                products={vendor.products}
              />
              <div className="border-b border-gray-200 mt-4"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra bottom padding for mobile to account for fixed navigation */}
      {isMobile && <div className="h-16"></div>}
    </div>
  );
}
