
import React from "react";
import { Button } from "@/components/ui/button";
import { BadgePercent, Info, Copy, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { useToast } from "@/hooks/use-toast";

interface Coupon {
  code: string;
  discount: string;
}

interface ProductCouponsProps {
  coupons: Coupon[];
}

const ProductCoupons: React.FC<ProductCouponsProps> = ({ coupons }) => {
  const { toast } = useToast();

  const copyCouponToClipboard = (coupon: string) => {
    navigator.clipboard.writeText(coupon);
    toast({
      title: "Coupon copied!",
      description: `${coupon} has been copied to your clipboard`,
    });
  };

  const applyCoupon = (code: string) => {
    toast({
      title: "Coupon applied!",
      description: `${code} discount has been applied to your order`,
    });
  };

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-md border border-red-100 shadow-sm">
      <div className="text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <BadgePercent className="h-4 w-4 mr-1.5 text-red-500" />
          <span>Available Coupons:</span>
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
              <Info className="h-3.5 w-3.5 text-gray-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs max-w-[200px]">
            Apply coupons at checkout or copy the code
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {coupons.map((coupon, index) => (
          <div key={index} className="group relative">
            <div className="flex overflow-hidden rounded-md border border-dashed border-red-300 hover:border-red-500 transition-colors bg-white">
              <div className="relative flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 text-white px-3 py-2.5">
                <div className="absolute right-0 top-0 bottom-0 w-2">
                  <div className="absolute top-0 bottom-0 -right-1 w-2">
                    <div className="absolute top-0 h-2 w-2 rounded-full bg-white translate-x-1/2 -translate-y-1/2"></div>
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="absolute w-2 h-2 rounded-full bg-white translate-x-1/2" style={{ top: `${(i+1) * 16.66}%` }}></div>
                    ))}
                    <div className="absolute bottom-0 h-2 w-2 rounded-full bg-white translate-x-1/2 translate-y-1/2"></div>
                  </div>
                </div>
                <div className="text-xs font-bold tracking-wider">
                  {coupon.code}
                </div>
              </div>
              
              <div className="flex flex-1 items-center justify-between px-3">
                <div>
                  <div className="text-xs font-medium text-red-600">
                    {coupon.discount}
                  </div>
                  {index === 2 && (
                    <div className="text-[10px] text-gray-500 mt-0.5 flex items-center">
                      <Clock className="h-2.5 w-2.5 mr-0.5" />
                      Expires in 4h 23m
                    </div>
                  )}
                </div>
                
                <div className="flex gap-1 items-center">
                  <HoverCard openDelay={300} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7 w-7 p-0 rounded-full hover:bg-gray-100"
                        onClick={() => copyCouponToClipboard(coupon.code)}
                      >
                        <Copy className="h-3.5 w-3.5 text-gray-500" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-auto p-2 text-xs">
                      Copy code
                    </HoverCardContent>
                  </HoverCard>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 bg-red-50 hover:bg-red-100 text-red-600 text-xs px-2"
                    onClick={() => applyCoupon(coupon.code)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>

            {index === 0 && (
              <Badge 
                variant="outline" 
                className="absolute -top-2 -right-2 text-[10px] py-0 px-1.5 bg-yellow-100 text-yellow-800 border-yellow-200"
              >
                POPULAR
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCoupons;
