
import React from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductGrid";
import { ChevronRight, CirclePlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

export default function NewArrivals({ products }) {
  const isMobile = useIsMobile();
  
  if (!products?.length) return null;
  
  return (
    <div className="py-3">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold">New Arrivals</h2>
            <Badge variant="aliNew" className="text-[10px] py-0 h-4">NEW</Badge>
          </div>
          <Link to="/new-arrivals" className="text-xs text-orange-500 hover:underline flex items-center">
            View All <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {products.map(product => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <div className="absolute top-2 right-2 z-10 bg-green-600 h-5 w-5 rounded-full flex items-center justify-center">
                <CirclePlus className="h-3.5 w-3.5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
