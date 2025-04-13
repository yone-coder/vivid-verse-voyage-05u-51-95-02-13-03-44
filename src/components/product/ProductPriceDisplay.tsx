
import React from "react";
import { AlertCircle, TrendingDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
      <div className={`flex ${isMobile ? 'flex-col gap-1.5' : 'items-baseline justify-between'}`}>
        <div className="flex items-baseline">
          <span className="text-2xl md:text-3xl font-bold text-red-500">${formatPrice(currentPrice)}</span>
          <span className="ml-2 text-xs md:text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
          
          {discountPercentage > 0 && (
            <div className="ml-3 flex items-center">
              <span className="text-xs md:text-sm font-medium px-1.5 md:px-2 py-0.5 bg-red-100 text-red-600 rounded">
                <TrendingDown className="inline w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1" />
                {discountPercentage}% OFF
              </span>
            </div>
          )}
        </div>
        
        <div className={`flex ${isMobile ? 'justify-between' : 'flex-col items-end'}`}>
          <span className="text-xs md:text-sm font-medium text-red-600">
            Save ${discountAmount.toFixed(2)}
          </span>
          <div className="text-[10px] md:text-xs text-gray-500 flex items-center mt-0.5">
            <Clock className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1" />
            Limited time offer
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-[10px] md:text-xs flex items-center justify-between flex-wrap gap-y-1">
        <div className="flex items-center text-green-600">
          <span className="bg-green-100 px-1.5 md:px-2 py-0.5 rounded">Free shipping</span>
          <span className="mx-1 md:mx-2">•</span>
          <span>Free returns</span>
        </div>
        
        <div className="flex items-center text-amber-600">
          <AlertCircle className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1" />
          <span>Price may increase soon</span>
        </div>
      </div>
    </div>
  );
};

export default ProductPriceDisplay;
