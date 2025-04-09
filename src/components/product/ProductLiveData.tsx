
import React from "react";
import { Eye, Users, Flame, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ProductAnalytics } from "@/hooks/useProduct";

interface ProductLiveDataProps {
  analytics: ProductAnalytics;
  onClose: () => void;
}

const ProductLiveData: React.FC<ProductLiveDataProps> = ({ analytics, onClose }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div className="flex items-center space-x-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center text-xs text-purple-700">
            <Eye className="h-3 w-3 mr-0.5" />
            <span>{formatNumber(analytics.viewCount)}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="p-2 text-xs">
          <div className="font-medium">Live Views</div>
          <div className="text-gray-600">{analytics.viewCount} people viewed this today</div>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center text-xs text-green-600">
            <Users className="h-3 w-3 mr-0.5" />
            <span>{analytics.recentViewers}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="p-2 text-xs">
          <div className="font-medium">Active Viewers</div>
          <div className="text-gray-600">{analytics.recentViewers} people looking right now</div>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center text-xs text-amber-500">
            <Flame className="h-3 w-3 mr-0.5" />
            <span>{analytics.salesLastHour}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="p-2 text-xs">
          <div className="font-medium">Hot Deal</div>
          <div className="text-gray-600">{analytics.salesLastHour} sold in the last hour</div>
        </TooltipContent>
      </Tooltip>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-5 w-5 p-0"
        onClick={onClose}
      >
        <X className="h-3 w-3 text-gray-500" />
      </Button>
    </div>
  );
};

export default ProductLiveData;
