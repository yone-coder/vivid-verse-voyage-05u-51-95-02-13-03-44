
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Flame, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductGrid";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TrendingProducts({ products }) {
  const isMobile = useIsMobile();
  
  if (!products?.length) return null;
  
  return (
    <div className="py-4 bg-gradient-to-r from-orange-50 to-red-50">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold">Trending Now</h2>
          </div>
          <Link to="/trending" className="text-xs text-orange-500 hover:underline flex items-center">
            View All <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {products.map(product => (
            <div key={product.id} className="relative h-full">
              <ProductCard product={product} />
              <div className="absolute top-1 left-1 z-10">
                <div className="flex items-center bg-orange-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm">
                  <Flame className="h-3 w-3 mr-0.5" /> Trending
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
