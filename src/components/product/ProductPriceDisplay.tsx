
import React from "react";
import { AlertCircle, TrendingDown, Clock, Star, StarHalf, ChevronRight } from "lucide-react";
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
      {/* Product title - Added new section */}
      <h1 className="text-lg font-semibold text-gray-900 mb-1">Premium Headphones</h1>
      
      {/* Price & Discount Section */}
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-2xl font-bold text-red-600">
          ${formatPrice(currentPrice)}
        </span>
        
        <span className="line-through text-gray-400 text-sm">
          ${formatPrice(originalPrice)}
        </span>
        
        {discountPercentage > 0 && (
          <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">
            {discountPercentage}% OFF
          </span>
        )}
      </div>
      
      {/* Savings amount */}
      <div className="text-sm text-red-500 mb-2">
        Save ${discountAmount.toFixed(2)}
      </div>
      
      {/* Promo & Alert Section */}
      <div className="flex flex-col sm:flex-row gap-1 text-xs text-gray-500 mb-2">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> Limited time offer
        </div>
        <div className="flex items-center gap-1 text-yellow-600">
          <AlertCircle className="w-3 h-3" /> Price may increase soon
        </div>
      </div>
      
      {/* Shipping & Returns Section */}
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">Free shipping</span>
        <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">Free returns</span>
      </div>
      
      {/* Rating & Reviews Section */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-800 mb-2">
        <div className="flex items-center text-yellow-400">
          <Star className="h-4 w-4 fill-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400" />
          <StarHalf className="h-4 w-4 fill-yellow-400" />
        </div>
        <span className="font-semibold">4.8</span>
        <a href="#" className="text-blue-600 underline">2543 Reviews</a>
        <span className="text-gray-500">| 5.0k+ Sold</span>
      </div>
      
      {/* Badges & Links Section */}
      <div className="flex flex-wrap justify-between items-center mt-2">
        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded">Top Seller</span>
        <a href="#" className="text-blue-600 text-sm flex items-center">
          All Reviews <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default ProductPriceDisplay;
