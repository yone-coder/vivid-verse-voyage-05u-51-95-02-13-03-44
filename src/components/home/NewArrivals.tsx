
import React from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductGrid";
import { ChevronRight, CirclePlus, ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import { Product } from "@/integrations/supabase/products";

interface NewArrivalsProps {
  products?: Product[];
}

export default function NewArrivals({ products = [] }: NewArrivalsProps) {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  if (!products?.length) return null;
  
  return (
    <div className="py-3 w-full">
      <div className="container mx-auto px-3">
        {/* Updated header with consistent styling */}
        <div className="px-2 py-2 -mx-3">
          <div className="flex items-center justify-between mb-1 bg-gradient-to-r from-green-500 via-green-600 to-teal-600 px-2 py-1 -mx-2">
            {/* First element (New Arrivals) */}
            <div className="flex items-center gap-1 text-white text-xs font-bold uppercase tracking-wide">
              <Tag className="w-4 h-4" />
              NEW ARRIVALS
            </div>
            
            {/* Middle element (Badge) */}
            <div className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-3 py-0.5 rounded-full backdrop-blur-sm">
              <span className="whitespace-nowrap">Just In</span>
            </div>
            
            {/* Last element (View All) */}
            <Link
              to="/new-arrivals"
              className="text-xs text-white hover:underline flex items-center font-medium"
            >
              {t('product.viewAll')}
              <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {products.map(product => (
            <div key={product.id} className="relative h-full">
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
