
import React from "react";
import { AlertCircle, TrendingDown, Clock, Star, ChevronRight, Package, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

interface ProductPriceDisplayProps {
  currentPrice: number;
  originalPrice: number;
  title?: string;
}

const ProductPriceDisplay: React.FC<ProductPriceDisplayProps> = ({
  currentPrice,
  originalPrice,
  title
}) => {
  const isMobile = useIsMobile();
  const formatPrice = (price: number) => price.toFixed(2);
  
  // Calculate discount percentage based on the difference between original and current price
  const discountAmount = originalPrice - currentPrice;
  const discountPercentage = Math.round((discountAmount / originalPrice) * 100);
  
  return (
    <div className="flex flex-col w-full">
      {title && (
        <h1 className="text-lg font-semibold text-gray-900 mb-1">{title}</h1>
      )}
      
      {/* Row 1: Price Breakdown */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl font-bold text-red-500">
          ${formatPrice(currentPrice)}
        </span>
        
        <span className="text-sm line-through text-gray-500">
          ${formatPrice(originalPrice)}
        </span>
        
        {discountPercentage > 0 && (
          <div className="flex items-center">
            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" />
              {discountPercentage}% OFF
            </span>
          </div>
        )}
      </div>
      
      {/* Row 2: Savings and Sold count */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-red-600">
          Save ${discountAmount.toFixed(2)}
        </span>
        
        <div className="flex items-center text-gray-600 text-sm">
          <ShoppingBag className="w-3.5 h-3.5 mr-1 text-gray-500" />
          <span>5.0k+ Sold</span>
        </div>
      </div>
      
      {/* Row 3: Shipping information */}
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="success" className="text-xs py-0.5 font-normal bg-green-100 text-green-600 hover:bg-green-100">
          Free shipping
        </Badge>
        
        <span className="text-xs text-gray-500 mx-0.5">•</span>
        
        <Badge variant="success" className="text-xs py-0.5 font-normal bg-green-100 text-green-600 hover:bg-green-100">
          Free returns
        </Badge>
      </div>
      
      {/* Row 4: Ratings */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex text-yellow-400">
          {'★'.repeat(4)}
          {'★'.repeat(1).replace('★', '★½')}
        </div>
        
        <span className="font-medium">4.8</span>
        
        <a href="#" className="text-sm text-blue-600 hover:underline">
          2543 Reviews
        </a>
      </div>
      
      {/* Row 5: Time-limited offers */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-gray-500 flex items-center">
          <Clock className="w-3.5 h-3.5 mr-1 text-gray-500" />
          Limited time offer
        </div>
        
        <div className="text-xs text-amber-600 flex items-center">
          <AlertCircle className="w-3.5 h-3.5 mr-1" />
          Price may increase soon
        </div>
      </div>
      
      {/* Row 6: Top seller badge and all reviews link */}
      <div className="flex justify-between items-center">
        <Badge variant="info" className="text-sm bg-blue-100 text-blue-700 hover:bg-blue-100">
          Top Seller
        </Badge>
        
        <a href="#" className="text-sm text-blue-600 hover:underline flex items-center">
          All Reviews 
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </a>
      </div>
    </div>
  );
};

export default ProductPriceDisplay;
