
import React from "react";
import { Check, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { VariantStockInfo } from "@/hooks/useVariantStockDecay";

interface ProductVariant {
  name: string;
  price: number;
  stock: number;
  image?: string; // Made optional with the ? operator
  bestseller?: boolean;
  limited?: boolean;
}

interface ColorVariantItemProps {
  variant: ProductVariant;
  selectedColor: string;
  onColorChange: (color: string) => void;
  getColorHex: (name: string) => string;
  stockInfo?: VariantStockInfo;
  getTimeRemaining?: (variantName: string) => { minutes: number, seconds: number } | null;
}

const ColorVariantItem: React.FC<ColorVariantItemProps> = ({
  variant,
  selectedColor,
  onColorChange,
  getColorHex,
  stockInfo,
}) => {
  const isSelected = selectedColor === variant.name;
  
  const currentStock = stockInfo?.currentStock !== undefined 
    ? Math.floor(stockInfo.currentStock) 
    : variant.stock;
  
  const isLowStock = currentStock < 20;
  const isVeryLowStock = currentStock < 8;
  const isExtremelyLowStock = currentStock < 4;
  
  const lowStockText = currentStock === 0 ? "Sold out" :
                       currentStock === 1 ? "Last one!" :
                       isExtremelyLowStock ? `Only ${currentStock} left!` :
                       isVeryLowStock ? "Almost gone!" :
                       isLowStock ? "Low stock" : null;
  
  const isActive = stockInfo?.isActive || false;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            className={cn(
              "relative flex flex-col items-center p-1 rounded-md transition-all duration-200",
              isSelected 
                ? 'ring-2 ring-[#FF4D4F] bg-red-50/30' 
                : 'hover:bg-gray-50',
              currentStock === 0 && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => currentStock > 0 && onColorChange(variant.name)}
            aria-label={`Select color: ${variant.name}`}
            disabled={currentStock === 0}
          >
            <div 
              className={cn(
                "w-10 h-10 rounded-full overflow-hidden mb-1",
                isSelected ? "ring-2 ring-[#FF4D4F]" : "border border-gray-200",
                variant.name === 'White' && "border border-gray-200"
              )}
              style={{
                backgroundColor: getColorHex(variant.name)
              }}
            >
              {variant.image && (
                <img 
                  src={variant.image} 
                  alt={variant.name} 
                  className="w-full h-full object-cover" 
                />
              )}
              
              {currentStock === 0 && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <span className="text-[9px] font-medium text-[#FF4D4F]">Sold out</span>
                </div>
              )}
            </div>
            
            <span className="text-[10px] text-gray-600 truncate w-full text-center">
              {variant.name}
            </span>
            
            <span className="text-[10px] text-[#FF4D4F] font-medium truncate w-full text-center">
              ${variant.price.toFixed(2)}
            </span>
            
            {isLowStock && (
              <div className="mt-0.5 flex items-center justify-center">
                <span className={cn(
                  "text-[8px] flex items-center",
                  isExtremelyLowStock ? "text-[#FF4D4F]" : "text-orange-500",
                  isActive && isExtremelyLowStock && "animate-pulse"
                )}>
                  <AlertTriangle className="w-2 h-2 mr-0.5" />
                  {lowStockText}
                </span>
              </div>
            )}
            
            {variant.bestseller && (
              <Badge 
                className="absolute -top-1 -left-1 text-[7px] py-0 px-1 bg-[#FFA500] hover:bg-[#FFA500] border-none"
              >
                BEST
              </Badge>
            )}
            
            {variant.limited && (
              <Badge 
                className="absolute -top-1 -left-1 text-[7px] py-0 px-1 bg-[#FF4D4F] hover:bg-[#FF4D4F] border-none"
              >
                LIMITED
              </Badge>
            )}
            
            {isSelected && (
              <Check 
                className="absolute top-0 right-0 w-4 h-4 text-[#FF4D4F] bg-white rounded-full p-0.5 shadow-sm" 
              />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs p-2">
          <p className="font-medium">{variant.name}</p>
          <p className="text-[#FF4D4F]">${variant.price.toFixed(2)}</p>
          <p className={cn(
            isLowStock ? "text-[#FF4D4F]" : "text-gray-500"
          )}>
            {currentStock > 0 ? `${currentStock} in stock` : "Out of stock"}
          </p>
          {variant.bestseller && <p className="text-[#FFA500]">Bestseller</p>}
          {variant.limited && <p className="text-[#FF4D4F]">Limited Edition</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ColorVariantItem;
