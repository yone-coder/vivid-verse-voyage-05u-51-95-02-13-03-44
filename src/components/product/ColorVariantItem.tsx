
import React, { useEffect } from "react";
import { Check, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { VariantStockInfo } from "@/hooks/useVariantStockDecay";
import { Progress } from "@/components/ui/progress";

interface ProductVariant {
  name: string;
  price: number;
  stock: number;
  image: string;
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
  getTimeRemaining
}) => {
  const isSelected = selectedColor === variant.name;
  
  // Use time-based current stock from stockInfo or fallback to variant.stock
  const currentStock = stockInfo?.currentStock !== undefined 
    ? Math.floor(stockInfo.currentStock) 
    : variant.stock;
  
  // Log the current stock for this variant when selected
  useEffect(() => {
    if (isSelected && stockInfo) {
      console.log(`Selected ${variant.name}: stock=${currentStock}, active=${stockInfo.isActive}`);
    }
  }, [isSelected, stockInfo, variant.name, currentStock]);
  
  // Use time-based stock percentage from stockInfo or calculate a percentage based on stock level
  const stockPercentage = stockInfo?.stockPercentage !== undefined
    ? stockInfo.stockPercentage
    : (variant.stock < 20 ? 20 : variant.stock > 100 ? 100 : variant.stock);
  
  const isLowStock = currentStock < 20;
  const isVeryLowStock = currentStock < 8;
  const isExtremelyLowStock = currentStock < 4;
  const isSoldOut = currentStock <= 0;
  
  const lowStockText = isSoldOut ? "Sold out" :
                       currentStock === 1 ? "Last one!" :
                       isExtremelyLowStock ? `Only ${currentStock} left!` :
                       isVeryLowStock ? "Almost gone!" :
                       isLowStock ? "Low stock" : null;
  
  const timeRemaining = getTimeRemaining ? getTimeRemaining(variant.name) : null;
  
  const timeRemainingText = timeRemaining 
    ? `${timeRemaining.minutes}:${timeRemaining.seconds.toString().padStart(2, '0')} left`
    : null;
  
  const formatStartTime = () => {
    if (!stockInfo?.startTime) return "";
    
    const startDate = new Date(stockInfo.startTime);
    const hours = startDate.getHours();
    const minutes = startDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    return `Started at ${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  
  const getStockLevelColor = () => {
    if (isSoldOut) return "bg-gray-500"; // Grey — #9E9E9E
    if (stockPercentage <= 5) return "bg-red-800";   // Dark Red — #C62828
    if (stockPercentage <= 15) return "bg-red-400";   // Red — #EF5350
    if (stockPercentage <= 30) return "bg-orange-500"; // Orange — #FB8C00
    if (stockPercentage <= 50) return "bg-amber-400"; // Amber — #FFC107
    if (stockPercentage <= 70) return "bg-yellow-300"; // Yellow — #FFEB3B
    if (stockPercentage <= 85) return "bg-lime-600"; // Lime — #C0CA33
    return "bg-green-500"; // Green — #4CAF50
  };
  
  const stockLevelColor = getStockLevelColor();
  const isActive = stockInfo?.isActive || false;
  
  useEffect(() => {
    if (!isActive || !stockInfo?.currentStock) return;

    let animationFrame: number;
    
    const updateAnimation = () => {
      animationFrame = requestAnimationFrame(updateAnimation);
    };
    
    animationFrame = requestAnimationFrame(updateAnimation);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isActive, stockInfo?.currentStock]);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            className={cn(
              "relative flex flex-col items-center p-1 rounded-md transition-all duration-200",
              isSelected 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:bg-gray-100',
              isSoldOut && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !isSoldOut && onColorChange(variant.name)}
            aria-label={`Select color: ${variant.name}`}
            disabled={isSoldOut}
          >
            <div 
              className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 mb-1"
              style={{
                backgroundColor: getColorHex(variant.name),
                border: variant.name === 'White' ? '1px solid #E0E0E0' : 'none'
              }}
            >
              {variant.image ? (
                <img 
                  src={variant.image} 
                  alt={variant.name} 
                  className="w-full h-full object-cover" 
                />
              ) : null}
              
              {isSoldOut && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                  <span className="text-[9px] font-medium text-red-500">Sold out</span>
                </div>
              )}
            </div>
            
            <span className="text-[10px] text-gray-600 truncate w-full text-center">
              {variant.name}
            </span>
            
            <span className="text-[10px] text-blue-600 font-medium truncate w-full text-center">
              ${variant.price.toFixed(2)}
            </span>
            
            {isLowStock && (
              <div className="mt-0.5 flex items-center justify-center">
                <span className={`text-[8px] ${isExtremelyLowStock ? 'text-red-600' : 'text-red-500'} flex items-center ${isActive && isExtremelyLowStock ? 'animate-pulse' : ''}`}>
                  <AlertTriangle className="w-2 h-2 mr-0.5" />
                  {lowStockText}
                </span>
              </div>
            )}
            
            {isActive && timeRemainingText && !isExtremelyLowStock && (
              <div className="mt-0.5 flex items-center justify-center">
                <span className="text-[8px] text-amber-600 flex items-center">
                  <Clock className="w-2 h-2 mr-0.5" />
                  {timeRemainingText}
                </span>
              </div>
            )}
            
            {isActive && (
              <div className="w-full mt-1">
                <Progress 
                  value={stockPercentage} 
                  className="h-1.5 w-full"
                  indicatorClassName={`${stockLevelColor} ${isLowStock ? 'animate-pulse' : ''}`}
                />
              </div>
            )}
            
            {variant.bestseller && (
              <Badge 
                className="absolute -top-1 -right-1 text-[7px] py-0 px-1 bg-amber-400 hover:bg-amber-400"
              >
                BEST
              </Badge>
            )}
            
            {variant.limited && (
              <Badge 
                className="absolute -top-1 -right-1 text-[7px] py-0 px-1 bg-red-500 hover:bg-red-500"
              >
                LIMITED
              </Badge>
            )}
            
            {isSelected && (
              <Check 
                className="absolute top-0 right-0 w-4 h-4 text-blue-500 bg-white rounded-full p-0.5 shadow-sm" 
              />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs p-2">
          <p className="font-medium">{variant.name}</p>
          <p className="text-blue-600">${variant.price.toFixed(2)}</p>
          <p className={isLowStock ? "text-red-500" : "text-gray-500"}>
            {currentStock > 0 ? `${currentStock} in stock` : "Out of stock"}
          </p>
          {stockInfo?.startTime && (
            <p className="text-gray-600 text-[10px]">{formatStartTime()}</p>
          )}
          {isActive && timeRemaining && (
            <p className="text-amber-600">
              {timeRemaining.minutes === 0 && timeRemaining.seconds < 30 
                ? "Selling out soon!" 
                : `${timeRemaining.minutes}:${timeRemaining.seconds.toString().padStart(2, '0')} remaining`}
            </p>
          )}
          {variant.bestseller && <p className="text-amber-600">Bestseller</p>}
          {variant.limited && <p className="text-red-600">Limited Edition</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ColorVariantItem;
