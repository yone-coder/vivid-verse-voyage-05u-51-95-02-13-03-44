
import React from "react";
import { TrendingDown, Truck, RefreshCw, PackageCheck, Shield, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

interface ProductPriceDisplayProps {
  currentPrice: number;
  originalPrice: number;
}

const ProductPriceDisplay: React.FC<ProductPriceDisplayProps> = ({
  currentPrice,
  originalPrice
}) => {
  const isMobile = useIsMobile();
  const formatPrice = (price: number) => price.toFixed(2);
  
  // Calculate discount percentage based on the difference between original and current price
  const discountAmount = originalPrice - currentPrice;
  const discountPercentage = Math.round((discountAmount / originalPrice) * 100);
  
  return (
    <div className="flex flex-col w-full">
      {/* Main price display section */}
      <div className={cn(
        "flex", 
        isMobile ? "flex-col gap-1.5" : "items-center justify-between"
      )}>
        {/* Price and discount area - all in one horizontal line */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-bold text-red-500">
              ${formatPrice(currentPrice)}
            </span>
            
            <span className="text-sm md:text-base line-through text-gray-400">
              ${formatPrice(originalPrice)}
            </span>
            
            <span className="text-sm text-green-600">
              Save ${discountAmount.toFixed(2)}
            </span>
            
            {discountPercentage > 0 && (
              <span className="text-xs md:text-sm font-bold px-1.5 md:px-2 py-0.5 bg-red-500 text-white rounded">
                <TrendingDown className="inline w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1" />
                {discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Enhanced shipping and returns information */}
      <div className="mt-1 text-[10px] md:text-xs flex items-center justify-between flex-wrap gap-y-1">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 px-2 py-0.5 rounded-md text-green-600 border-green-100 flex items-center">
            <Truck className="mr-1 h-3 w-3" />
            <span className="font-medium">Free shipping</span>
            <span className="mx-1">•</span>
            <CalendarClock className="mr-1 h-3 w-3" />
            <span>7-15 days</span>
          </Badge>
          
          <Badge variant="outline" className="bg-blue-50 px-2 py-0.5 rounded-md text-blue-600 border-blue-100 flex items-center">
            <RefreshCw className="mr-1 h-3 w-3" />
            <span className="font-medium">Free returns</span>
            <span className="mx-1">•</span>
            <Shield className="mr-1 h-3 w-3" />
            <span>30 days</span>
          </Badge>
        </div>
        
        <div className="flex items-center">
          <Badge variant="outline" className="bg-purple-50 px-2 py-0.5 rounded-md text-purple-600 border-purple-100 flex items-center">
            <PackageCheck className="mr-1 h-3 w-3" />
            <span className="font-medium">Buyer protection</span>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ProductPriceDisplay;
