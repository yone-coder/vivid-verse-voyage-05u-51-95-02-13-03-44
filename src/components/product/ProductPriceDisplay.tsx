
import React from "react";
import { Clock, AlertCircle, ChevronRight } from "lucide-react";
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
    <div className="flex flex-col w-full space-y-2">
      {/* Row 1: Price Details */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-red-500">
          ${formatPrice(currentPrice)}
        </span>
        
        <span className="text-sm line-through text-gray-500">
          ${formatPrice(originalPrice)}
        </span>
        
        {discountPercentage > 0 && (
          <span className="text-xs font-medium px-2 py-0.5 bg-red-100 text-red-600 rounded">
            {discountPercentage}% OFF
          </span>
        )}
      </div>
      
      {/* Row 2: Savings + Tags */}
      <div className="flex flex-wrap items-center justify-between">
        <span className="text-sm font-medium text-red-600">
          Save ${discountAmount.toFixed(2)}
        </span>
        
        <div className="flex items-center gap-2">
          <span className="text-xs px-4 py-1 bg-blue-100 text-blue-700 rounded-full">
            Top Seller
          </span>
          
          <span className="text-sm text-gray-600 flex items-center">
            <span className="hidden sm:inline">5.0k+ </span>
            <span className="inline sm:hidden">5k+ </span>
            Sold
          </span>
        </div>
      </div>
      
      {/* Row 3: Shipping & Returns */}
      <div className="flex items-center gap-2">
        <span className="bg-green-100 px-2 py-0.5 rounded text-green-600 text-xs">
          Free shipping
        </span>
        <span className="text-xs text-gray-500">•</span>
        <span className="text-green-600 text-xs">
          Free returns
        </span>
      </div>
      
      {/* Row 4: Ratings */}
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400">
          {'★'.repeat(Math.floor(4.8))}
          {4.8 % 1 !== 0 && '★½'}
          {'☆'.repeat(5 - Math.ceil(4.8))}
        </div>
        
        <span className="font-semibold text-gray-800">4.8</span>
        
        <a href="#reviews" className="text-blue-600 hover:underline">
          2543 Reviews
        </a>
      </div>
      
      {/* Row 5: Alerts */}
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-500 text-xs">
          <Clock className="w-3.5 h-3.5 mr-1" />
          <span>Limited time offer</span>
        </div>
        
        <div className="flex items-center text-amber-600 text-xs">
          <AlertCircle className="w-3.5 h-3.5 mr-1" />
          <span>Price may increase soon</span>
        </div>
      </div>
      
      {/* Row 6: Review Navigation */}
      <div className="flex justify-between items-center">
        <a href="#all-reviews" className="text-blue-600 flex items-center hover:underline">
          All Reviews <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default ProductPriceDisplay;
