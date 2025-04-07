
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface ProductBadgesProps {
  hasFreeShipping: boolean;
  isTopSeller: boolean;
  isFlashDeal: boolean;
  isTrending?: boolean;
}

const ProductBadges: React.FC<ProductBadgesProps> = ({
  hasFreeShipping,
  isTopSeller,
  isFlashDeal,
  isTrending
}) => {
  return (
    <div className="flex items-center flex-wrap gap-1">
      {isFlashDeal && (
        <Badge variant="outline" className="text-xs bg-red-50 text-red-500 border-red-200">
          Flash Deal
        </Badge>
      )}
      
      {isTopSeller && (
        <Badge variant="outline" className="text-xs bg-orange-50 text-orange-500 border-orange-200">
          Top Seller
        </Badge>
      )}
      
      {hasFreeShipping && (
        <Badge variant="outline" className="text-xs bg-green-50 text-green-500 border-green-200">
          Free Shipping
        </Badge>
      )}
      
      {isTrending && (
        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-600 border-purple-200 flex items-center">
          <TrendingUp className="h-3 w-3 mr-0.5" />
          <span className="whitespace-nowrap">Trending</span>
        </Badge>
      )}
    </div>
  );
};

export default ProductBadges;
