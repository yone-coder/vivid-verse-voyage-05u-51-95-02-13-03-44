
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HoverCardWithDuration,
  HoverCardTrigger,
  HoverCardContent
} from "@/components/ui/hover-card";
import { ExternalLink } from "lucide-react";

interface ProductRatingsProps {
  rating: number;
  reviewCount: number;
  soldCount: number;
  productId?: string;
}

const ProductRatings: React.FC<ProductRatingsProps> = ({
  rating,
  reviewCount,
  soldCount,
  productId = "nebula-pro-2025"
}) => {
  const formatNumber = (num: number): string => {
    if (!num && num !== 0) return "0"; // Handle undefined/null values
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div className="flex items-center mt-1 text-sm">
      <div className="flex items-center">
        <div className="flex text-amber-400">
          {'★'.repeat(Math.floor(rating))}
          {rating % 1 !== 0 && '☆'}
          {'☆'.repeat(5 - Math.ceil(rating))}
          <span className="ml-1 text-black">{rating}</span>
        </div>
        <span className="mx-2 text-gray-300">|</span>
        
        <HoverCardWithDuration openDelay={300} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant="link" className="h-5 p-0 text-sm text-gray-500">
              {reviewCount} Reviews
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-56 p-2">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <div className="text-amber-400 mr-1">★★★★★</div>
                  <span>5 star</span>
                </div>
                <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <span className="text-gray-500">72%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <div className="text-amber-400 mr-1">★★★★☆</div>
                  <span>4 star</span>
                </div>
                <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '18%' }}></div>
                </div>
                <span className="text-gray-500">18%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <div className="text-amber-400 mr-1">★★★☆☆</div>
                  <span>3 star</span>
                </div>
                <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '6%' }}></div>
                </div>
                <span className="text-gray-500">6%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <div className="text-amber-400 mr-1">★★☆☆☆</div>
                  <span>2 star</span>
                </div>
                <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '3%' }}></div>
                </div>
                <span className="text-gray-500">3%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <div className="text-amber-400 mr-1">★☆☆☆☆</div>
                  <span>1 star</span>
                </div>
                <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '1%' }}></div>
                </div>
                <span className="text-gray-500">1%</span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCardWithDuration>
        
        <span className="mx-2 text-gray-300">|</span>
        
        <Link to={`/product/${productId}/sales`} className="flex items-center text-sm text-gray-500 hover:text-gray-700">
          <span>{formatNumber(soldCount)}+ Sold</span>
          <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

export default ProductRatings;
