
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/client";
import AliExpressHeader from "@/components/home/AliExpressHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Store, Star, ShoppingBag, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ShopsSkeleton from "@/components/skeletons/ShopsSkeleton";

export default function Shops() {
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
    return <ShopsSkeleton />;
  }
  
  if (isLoading) {
    return <ShopsSkeleton />;
  }

  // Mock data for shops
  const shops = [
    {
      id: 1,
      name: "TechGadget Official Store",
      logo: "https://picsum.photos/id/1/100",
      banner: "https://picsum.photos/id/180/600/200",
      rating: 4.8,
      followers: "28.5K",
      products: 328,
      featured: ["https://picsum.photos/id/10/200", "https://picsum.photos/id/20/200", "https://picsum.photos/id/30/200"],
      tags: ["Electronics", "Top Rated", "Fast Shipping"],
      isOfficial: true
    },
    {
      id: 2,
      name: "Fashion Boutique",
      logo: "https://picsum.photos/id/2/100",
      banner: "https://picsum.photos/id/11/600/200",
      rating: 4.6,
      followers: "15.2K",
      products: 452,
      featured: ["https://picsum.photos/id/40/200", "https://picsum.photos/id/50/200", "https://picsum.photos/id/60/200"],
      tags: ["Fashion", "Trending", "Budget Friendly"],
      isOfficial: false
    },
    {
      id: 3,
      name: "Home & Living Essentials",
      logo: "https://picsum.photos/id/3/100",
      banner: "https://picsum.photos/id/12/600/200",
      rating: 4.7,
      followers: "42.1K",
      products: 613,
      featured: ["https://picsum.photos/id/70/200", "https://picsum.photos/id/80/200", "https://picsum.photos/id/90/200"],
      tags: ["Home Decor", "Kitchen", "Best Seller"],
      isOfficial: true
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overscroll-none overflow-x-hidden">
      {/* AliExpressHeader component with active tab set to shops */}
      <AliExpressHeader activeTabId="shops" />

      <div className="pt-[44px] pb-16">
        {/* Featured Categories */}
        <div className="p-3 bg-white">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            <Badge variant="outline" className="whitespace-nowrap px-3 py-1">
              All Shops
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap px-3 py-1">
              Electronics
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap px-3 py-1">
              Fashion
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap px-3 py-1">
              Home Decor
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap px-3 py-1">
              Beauty
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap px-3 py-1">
              Sports
            </Badge>
          </div>
        </div>
        
        {/* Shops List */}
        <div className="max-w-md mx-auto mt-2">
          {shops.map(shop => (
            <div key={shop.id} className="bg-white mb-3 rounded-lg shadow">
              {/* Shop Banner */}
              <div className="relative">
                <img 
                  src={shop.banner} 
                  alt={`${shop.name} banner`} 
                  className="w-full h-28 object-cover rounded-t-lg"
                />
                <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white">
                      <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-2 text-white">
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium">{shop.name}</h3>
                        {shop.isOfficial && (
                          <Badge className="ml-1 bg-blue-500 text-[9px] h-4">Official</Badge>
                        )}
                      </div>
                      <div className="flex items-center text-xs space-x-2">
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-0.5 text-yellow-400 fill-yellow-400" />
                          {shop.rating}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-0.5" />
                          {shop.followers}
                        </span>
                        <span className="flex items-center">
                          <ShoppingBag className="w-3 h-3 mr-0.5" />
                          {shop.products}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Shop Tags */}
              <div className="px-3 pt-2 flex gap-1 flex-wrap">
                {shop.tags.map((tag, idx) => (
                  <Badge 
                    key={idx} 
                    className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-0 text-[10px]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Featured Products */}
              <div className="grid grid-cols-3 gap-1 p-3">
                {shop.featured.map((product, idx) => (
                  <img 
                    key={idx} 
                    src={product} 
                    alt={`Featured product ${idx + 1}`} 
                    className="w-full aspect-square object-cover rounded-md"
                  />
                ))}
              </div>
              
              {/* Shop Actions */}
              <div className="flex justify-between items-center px-3 py-2.5 border-t border-gray-100">
                <Button 
                  size="sm" 
                  variant="default"
                  className="text-[10px] px-3 py-1 h-7 bg-red-500 hover:bg-red-600"
                >
                  Visit Shop
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-[10px] px-3 py-1 h-7"
                >
                  Follow
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra bottom padding for mobile to account for fixed navigation */}
      {isMobile && <div className="h-16"></div>}
    </div>
  );
}
