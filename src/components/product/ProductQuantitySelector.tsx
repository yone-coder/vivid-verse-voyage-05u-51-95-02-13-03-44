
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VariantStockInfo } from "@/hooks/useVariantStockDecay";

interface ProductQuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  price?: number;
  maxQuantity?: number;
  minQuantity?: number;
  inStock?: number;
  productName?: string;
  stockInfo?: VariantStockInfo;
}

// Define a separate type for the stock level information returned by getStockLevelInfo
interface StockLevelInfo {
  level: string;
  color: string;
  textColor: string;
  label: string;
  animate: boolean;
  badge: string | null;
}

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  price = 0,
  maxQuantity = 10,
  minQuantity = 1,
  inStock = 999,
  productName = "item",
  stockInfo
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [priceAnimation, setPriceAnimation] = useState(false);
  const [stockPulse, setStockPulse] = useState(false);
  
  // Use real-time stock info if available, otherwise fallback to static value
  const displayStock = stockInfo?.currentStock !== undefined
    ? Math.floor(stockInfo.currentStock)
    : inStock;
  
  // Use real-time stock percentage if available, otherwise calculate based on display stock
  const stockPercentage = stockInfo?.stockPercentage !== undefined
    ? stockInfo.stockPercentage
    : Math.min(100, (displayStock / 200) * 100);
  
  const isLowStock = displayStock < 20;
  const isVeryLowStock = displayStock < 8;
  const isExtremelyLowStock = displayStock < 4;
  
  const lowStockText = displayStock === 0 ? "Sold out" :
                       displayStock === 1 ? "Last one!" :
                       isExtremelyLowStock ? `Only ${displayStock} left!` :
                       isVeryLowStock ? "Almost gone!" :
                       isLowStock ? "Low stock" : null;
  
  const formatPrice = (value: number) => {
    return value.toFixed(2);
  };

  const totalPrice = price * quantity;
  const isMaxQuantity = quantity >= maxQuantity || quantity >= displayStock;
  const isMinQuantity = quantity <= minQuantity;
  
  const effectiveMaxQuantity = Math.min(maxQuantity, displayStock);
  
  const getStockLevelInfo = (): StockLevelInfo => {
    const currentStock = displayStock;
    
    if (currentStock === 0) {
      return {
        level: 'out-of-stock',
        color: 'bg-gray-500', // Grey — #9E9E9E
        textColor: 'text-gray-500',
        label: 'Out of Stock',
        animate: false,
        badge: 'SOLD OUT'
      };
    } else if (currentStock <= 3) {
      return {
        level: 'extremely-low',
        color: 'bg-red-800', // Dark Red — #C62828
        textColor: 'text-red-800',
        label: 'Extremely Low Stock!',
        animate: true,
        badge: 'LAST FEW ITEMS!'
      };
    } else if (currentStock <= 7) {
      return {
        level: 'very-low',
        color: 'bg-red-400', // Red — #EF5350
        textColor: 'text-red-400',
        label: 'Very Low Stock!',
        animate: true,
        badge: 'ALMOST GONE!'
      };
    } else if (currentStock <= 15) {
      return {
        level: 'low',
        color: 'bg-orange-500', // Orange — #FB8C00
        textColor: 'text-orange-500',
        label: 'Low Stock',
        animate: true,
        badge: 'SELLING FAST!'
      };
    } else if (currentStock <= 30) {
      return {
        level: 'below-medium',
        color: 'bg-amber-400', // Amber — #FFC107
        textColor: 'text-amber-500',
        label: 'Limited Stock',
        animate: false,
        badge: 'POPULAR ITEM'
      };
    } else if (currentStock <= 60) {
      return {
        level: 'medium',
        color: 'bg-yellow-300', // Yellow — #FFEB3B
        textColor: 'text-yellow-600',
        label: 'Medium Stock',
        animate: false,
        badge: null
      };
    } else if (currentStock <= 90) {
      return {
        level: 'above-medium',
        color: 'bg-lime-600', // Lime — #C0CA33
        textColor: 'text-lime-600',
        label: 'Good Stock',
        animate: false,
        badge: null
      };
    } else if (currentStock <= 130) {
      return {
        level: 'high',
        color: 'bg-green-300', // Light Green — #81C784
        textColor: 'text-green-500',
        label: 'High Stock',
        animate: false,
        badge: null
      };
    } else if (currentStock <= 180) {
      return {
        level: 'very-high',
        color: 'bg-green-500', // Green — #4CAF50
        textColor: 'text-green-600',
        label: 'Very High Stock',
        animate: false,
        badge: null
      };
    } else {
      return {
        level: 'overstocked',
        color: 'bg-teal-500', // Teal — #26A69A
        textColor: 'text-teal-600',
        label: 'Fully Stocked',
        animate: false,
        badge: 'PLENTY AVAILABLE'
      };
    }
  };
  
  // Renamed to 'stockLevelInfo' to avoid naming conflict with the prop
  const stockLevelInfo = getStockLevelInfo();
  
  const handleIncrementWithFeedback = () => {
    if (isMaxQuantity) {
      setStockPulse(true);
      setTimeout(() => setStockPulse(false), 1000);
      
      if (displayStock <= maxQuantity) {
        toast.warning(`Limited stock available`, {
          description: `Only ${displayStock} ${productName}${displayStock !== 1 ? 's' : ''} left in stock.`
        });
      } else {
        toast.info(`Maximum quantity reached`, {
          description: `You can only purchase up to ${maxQuantity} of this item at once.`
        });
      }
      return;
    }
    
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 300);
    
    setPriceAnimation(true);
    setTimeout(() => setPriceAnimation(false), 800);
    
    onIncrement();
  };
  
  // Add useEffect to show stock pulse animation for low stock
  useEffect(() => {
    if (isLowStock) {
      const interval = setInterval(() => {
        setStockPulse(true);
        setTimeout(() => setStockPulse(false), 1000);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isLowStock]);

  // Add new useEffect to force re-render when stockInfo changes for real-time updates
  useEffect(() => {
    // This empty dependency array with stockInfo will cause re-renders when stockInfo changes
    // which is necessary for smooth real-time animation of the progress bar
    if (stockInfo?.isActive) {
      // Force animation frame updates for smoother animation
      let animationFrameId: number;
      
      const updateAnimation = () => {
        // This causes a re-render on each animation frame
        animationFrameId = requestAnimationFrame(updateAnimation);
      };
      
      animationFrameId = requestAnimationFrame(updateAnimation);
      
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [stockInfo]);

  return (
    <div className="space-y-2 font-aliexpress">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          {displayStock <= 30 && (
            <span className={`ml-2 text-xs ${stockLevelInfo.textColor} inline-flex items-center ${stockLevelInfo.animate ? 'animate-pulse' : ''}`}>
              {stockLevelInfo.label}
            </span>
          )}
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
            <Button 
              onClick={onDecrement} 
              variant="ghost" 
              size="sm"
              className={`h-8 px-2 rounded-none border-r border-gray-300 transition-all duration-300
                ${isMinQuantity ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              disabled={isMinQuantity}
            >
              <MinusIcon size={16} className="text-gray-600" />
            </Button>
            
            <div className={`w-12 text-center font-medium ${showAnimation ? 'scale-110' : ''} transition-all duration-300`}>
              {quantity}
            </div>
            
            <Button 
              onClick={handleIncrementWithFeedback} 
              variant="ghost" 
              size="sm"
              className={`h-8 px-2 rounded-none border-l border-gray-300 transition-all duration-300
                ${isMaxQuantity ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              disabled={isMaxQuantity}
            >
              <PlusIcon size={16} className="text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
      
      {price > 0 && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-700">
            <span>Subtotal:</span>
          </div>
          <div className={`font-medium text-red-600 transition-all duration-500 ${priceAnimation ? 'scale-110' : ''}`}>
            ${formatPrice(totalPrice)}
          </div>
        </div>
      )}
      
      <div className="flex flex-col space-y-1">
        <div className="relative pt-1">
          <Progress 
            value={stockPercentage} 
            className="h-1.5 w-full"
            indicatorClassName={`${stockLevelInfo.color} ${stockPulse ? 'animate-pulse' : ''} ${stockInfo?.isActive ? 'transition-all duration-300 ease-linear' : ''}`}
          />
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <div className={`${stockLevelInfo.textColor} flex items-center`}>
            <span className={`w-2 h-2 ${stockLevelInfo.color} rounded-full mr-1.5 ${stockLevelInfo.animate ? 'animate-pulse' : ''}`}></span>
            {displayStock === 0 
              ? 'Currently out of stock' 
              : displayStock === 1 
                ? 'Last item in stock!' 
                : `${displayStock} units available`}
          </div>
          
          {effectiveMaxQuantity > 1 && (
            <div className="text-gray-500 flex items-center gap-1">
              Buy up to {effectiveMaxQuantity} at once
            </div>
          )}
        </div>
      </div>
      
      {stockLevelInfo.badge && (
        <Badge variant="aliHot" className={`text-xs py-0.5 ${stockLevelInfo.animate ? 'animate-pulse' : ''}`}>
          {stockLevelInfo.badge}
        </Badge>
      )}
    </div>
  );
};

export default ProductQuantitySelector;
