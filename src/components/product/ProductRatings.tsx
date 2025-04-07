
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart } from "lucide-react";
import {
  HoverCardWithDuration,
  HoverCardTrigger,
  HoverCardContent
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { PurchaseHistoryModal } from "./PurchaseHistoryModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface ProductRatingsProps {
  rating: number;
  reviewCount: number;
  soldCount: number;
  comparisonMode: boolean;
  toggleComparisonMode: () => void;
}

const ProductRatings: React.FC<ProductRatingsProps> = ({
  rating,
  reviewCount,
  soldCount,
  comparisonMode,
  toggleComparisonMode
}) => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <>
      <div className="flex flex-col gap-2 mt-1">
        <div className="flex items-center text-sm">
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
                <Button variant="link" className="h-5 p-0 text-sm text-gray-700">
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
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="h-5 p-0 text-sm text-gray-700 flex items-center group">
                  <span>{formatNumber(soldCount)}+ Sold</span>
                  <BarChart className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                </Button>
              </DialogTrigger>
              <PurchaseHistoryModal soldCount={soldCount} />
            </Dialog>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleComparisonMode}
            className="h-6 text-xs border-gray-200 ml-auto"
          >
            <ChevronRight className={`h-3.5 w-3.5 mr-1 transition-transform ${comparisonMode ? "rotate-90" : ""}`} />
            Compare
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductRatings;
