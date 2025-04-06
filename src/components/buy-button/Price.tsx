
import React from 'react';
import { Star, Info } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface PriceProps {
  currentPrice: string;
  animatePrice: boolean;
  pulseDiscount: boolean;
  discountPercentage: number;
  rotateIcons: boolean;
  setShowPriceIncrease: React.Dispatch<React.SetStateAction<boolean>>;
  variantColors: Record<string, string>;
  selectedVariant: string;
  variantChangeAnimation: boolean;
}

const Price = ({
  currentPrice,
  animatePrice,
  pulseDiscount,
  discountPercentage,
  rotateIcons,
  setShowPriceIncrease,
  variantColors,
  selectedVariant,
  variantChangeAnimation,
}: PriceProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center relative overflow-hidden ${variantChangeAnimation ? 'animate-spin' : ''}`}>
        <div 
          className={`absolute inset-1 rounded ${variantColors[selectedVariant]} ${variantChangeAnimation ? 'animate-pulse' : ''}`}
        ></div>
      </div>
      
      <div>
        <div className="flex items-center">
          <span className={`font-bold text-sm ${animatePrice ? 'scale-up-down text-red-500' : ''}`}>
            ${currentPrice}
          </span>
          <span className="text-xs text-gray-500 line-through ml-1">
            $79.99
          </span>
          <span className={`text-xs text-red-500 ml-1 ${pulseDiscount ? 'animate-pulse font-bold' : ''}`}>
            -{discountPercentage}%
          </span>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className={`ml-1 ${rotateIcons ? 'animate-spin' : ''}`} onClick={() => setShowPriceIncrease(true)}>
                  <Info size={10} className="text-gray-400" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                <p>Dynamic pricing based on demand</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star, i) => (
            <Star 
              key={star} 
              fill={i < 4 ? "#FFD700" : "none"} 
              color="#FFD700" 
              size={8}
              className={`${i === Math.floor(Math.random() * 5) && rotateIcons ? 'animate-ping' : ''}`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">1.2K</span>
        </div>
      </div>
    </div>
  );
};

export default Price;
