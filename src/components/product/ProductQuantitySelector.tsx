import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, AlertTriangle, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VariantStockInfo } from "@/hooks/useVariantStockDecay";
import { cn } from "@/lib/utils";

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
  const [progress, setProgress] = useState(0);
  const [recentStockChange, setRecentStockChange] = useState<number | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const [priceChangeHistory, setPriceChangeHistory] = useState<Array<{ price: number; timestamp: Date }>>([]);
  const [showPriceAlert, setShowPriceAlert] = useState(false);
  const [priceIncreaseWarning, setPriceIncreaseWarning] = useState(false);
  const [quantityChangeStreak, setQuantityChangeStreak] = useState(0);
  
  const displayStock = stockInfo?.currentStock !== undefined
    ? Math.floor(stockInfo.currentStock)
    : inStock;
  
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
        color: 'bg-gray-500',
        textColor: 'text-gray-500',
        label: 'Out of Stock',
        animate: false,
        badge: 'SOLD OUT'
      };
    } else if (currentStock <= 3) {
      return {
        level: 'extremely-low',
        color: 'bg-red-800',
        textColor: 'text-red-800',
        label: 'Extremely Low Stock!',
        animate: true,
        badge: 'LAST FEW ITEMS!'
      };
    } else if (currentStock <= 7) {
      return {
        level: 'very-low',
        color: 'bg-red-400',
        textColor: 'text-red-400',
        label: 'Very Low Stock!',
        animate: true,
        badge: 'ALMOST GONE!'
      };
    } else if (currentStock <= 15) {
      return {
        level: 'low',
        color: 'bg-orange-500',
        textColor: 'text-orange-500',
        label: 'Low Stock',
        animate: true,
        badge: 'SELLING FAST!'
      };
    } else if (currentStock <= 30) {
      return {
        level: 'below-medium',
        color: 'bg-amber-400',
        textColor: 'text-amber-500',
        label: 'Limited Stock',
        animate: false,
        badge: 'POPULAR ITEM'
      };
    } else if (currentStock <= 60) {
      return {
        level: 'medium',
        color: 'bg-yellow-300',
        textColor: 'text-yellow-600',
        label: 'Medium Stock',
        animate: false,
        badge: null
      };
    } else if (currentStock <= 90) {
      return {
        level: 'above-medium',
        color: 'bg-lime-600',
        textColor: 'text-lime-600',
        label: 'Good Stock',
        animate: false,
        badge: null
      };
    } else if (currentStock <= 130) {
      return {
        level: 'high',
        color: 'bg-green-300',
        textColor: 'text-green-500',
        label: 'High Stock',
        animate: false,
        badge: null
      };
    } else if (currentStock <= 180) {
      return {
        level: 'very-high',
        color: 'bg-green-500',
        textColor: 'text-green-600',
        label: 'Very High Stock',
        animate: false,
        badge: null
      };
    } else {
      return {
        level: 'overstocked',
        color: 'bg-teal-500',
        textColor: 'text-teal-600',
        label: 'Fully Stocked',
        animate: false,
        badge: 'PLENTY AVAILABLE'
      };
    }
  };
  
  const stockLevelInfo = getStockLevelInfo();

  const handleStockChange = useCallback((newStock: number) => {
    const change = newStock - displayStock;
    if (change !== 0) {
      setRecentStockChange(change);
      setLastUpdateTime(new Date());
      
      if (change < 0) {
        toast.warning(`Stock decreased by ${Math.abs(change)}`, {
          description: `${displayStock - Math.abs(change)} units remaining`
        });
      }
      
      setTimeout(() => setRecentStockChange(null), 5000);
    }
  }, [displayStock]);

  useEffect(() => {
    if (stockInfo?.currentStock !== undefined) {
      handleStockChange(Math.floor(stockInfo.currentStock));
    }
  }, [stockInfo?.currentStock, handleStockChange]);

  useEffect(() => {
    if (price > 0) {
      setPriceChangeHistory(prev => [...prev, { price, timestamp: new Date() }]);
      
      if (priceChangeHistory.length > 1) {
        const lastPrice = priceChangeHistory[priceChangeHistory.length - 2].price;
        if (price > lastPrice) {
          setPriceIncreaseWarning(true);
          setTimeout(() => setPriceIncreaseWarning(false), 5000);
        }
      }
    }
  }, [price, priceChangeHistory]);

  const handleIncrementWithFeedback = () => {
    if (quantity >= maxQuantity || quantity >= displayStock) {
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
    setPriceAnimation(true);
    setQuantityChangeStreak(prev => prev + 1);
    
    if (quantityChangeStreak > 2) {
      toast.info("Adding items quickly!", {
        description: "You're on a roll! 🚀"
      });
    }
    
    setTimeout(() => setShowAnimation(false), 300);
    setTimeout(() => setPriceAnimation(false), 800);
    
    onIncrement();
  };

  const handleDecrementWithFeedback = () => {
    if (quantity <= minQuantity) {
      toast.error(`Minimum quantity is ${minQuantity}`, {
        description: `Cannot decrease quantity further`
      });
      return;
    }
    
    setShowAnimation(true);
    setPriceAnimation(true);
    setQuantityChangeStreak(0);
    
    setTimeout(() => setShowAnimation(false), 300);
    setTimeout(() => setPriceAnimation(false), 800);
    
    onDecrement();
  };

  useEffect(() => {
    if (isLowStock) {
      const interval = setInterval(() => {
        setStockPulse(true);
        setTimeout(() => setStockPulse(false), 1000);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isLowStock]);

  useEffect(() => {
    if (stockInfo?.isActive) {
      let animationFrameId: number;
      
      const updateAnimation = (timestamp: number) => {
        if (!animationTimestamp) {
          setAnimationTimestamp(timestamp);
        }
        
        if (stockInfo?.stockPercentage !== undefined) {
          setProgress(stockInfo.stockPercentage);
        }
        
        animationFrameId = requestAnimationFrame(updateAnimation);
      };
      
      animationFrameId = requestAnimationFrame(updateAnimation);
      
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [stockInfo, animationTimestamp]);

  return (
    <div className="space-y-2 font-aliexpress relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          {displayStock <= 30 && (
            <div className={cn(
              "text-xs inline-flex items-center gap-1",
              isExtremelyLowStock ? "text-red-600" : 
              isVeryLowStock ? "text-orange-600" : 
              "text-amber-600"
            )}>
              <AlertTriangle size={12} className={stockPulse ? "animate-pulse" : ""} />
              {lowStockText}
            </div>
          )}
        </div>
        
        {recentStockChange && (
          <div className={cn(
            "absolute -top-8 right-0 text-xs font-medium px-2 py-1 rounded-full transition-all duration-300",
            recentStockChange < 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          )}>
            <div className="flex items-center gap-1">
              {recentStockChange < 0 ? <ArrowDown size={12} /> : <ArrowUp size={12} />}
              {Math.abs(recentStockChange)} units {recentStockChange < 0 ? "sold" : "restocked"}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
          <Button 
            onClick={handleDecrementWithFeedback} 
            variant="ghost" 
            size="sm"
            className={cn(
              "h-8 px-2 rounded-none border-r border-gray-300 transition-all duration-300",
              quantity <= minQuantity ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100",
              showAnimation && "scale-95"
            )}
            disabled={quantity <= minQuantity}
          >
            <MinusIcon size={16} className="text-gray-600" />
          </Button>
          
          <div className={cn(
            "w-12 text-center font-medium transition-all duration-300",
            showAnimation ? "scale-110" : "",
            quantity === maxQuantity ? "text-red-600" : ""
          )}>
            {quantity}
          </div>
          
          <Button 
            onClick={handleIncrementWithFeedback} 
            variant="ghost" 
            size="sm"
            className={cn(
              "h-8 px-2 rounded-none border-l border-gray-300 transition-all duration-300",
              quantity >= maxQuantity || quantity >= displayStock ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100",
              showAnimation && "scale-95"
            )}
            disabled={quantity >= maxQuantity || quantity >= displayStock}
          >
            <PlusIcon size={16} className="text-gray-600" />
          </Button>
        </div>
        
        {price > 0 && (
          <div className={cn(
            "ml-4 text-sm font-medium",
            priceAnimation ? "scale-110 text-green-600" : "text-gray-700",
            "transition-all duration-300"
          )}>
            Subtotal: ${formatPrice(totalPrice)}
          </div>
        )}
      </div>

      {priceIncreaseWarning && (
        <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
          <TrendingUp size={12} />
          Price increased due to high demand
        </div>
      )}

      <div className="flex flex-col space-y-1">
        <div className="relative pt-1">
          <Progress 
            value={stockPercentage} 
            className="h-1.5 w-full"
            indicatorClassName={cn(
              stockLevelInfo.color,
              stockPulse ? "animate-pulse" : "",
              stockInfo?.isActive ? "transition-all duration-300 ease-linear" : ""
            )}
          />
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <div className={cn(
            stockLevelInfo.textColor,
            "flex items-center"
          )}>
            <span className={cn(
              "w-2 h-2 rounded-full mr-1.5",
              stockLevelInfo.color,
              stockLevelInfo.animate ? "animate-pulse" : ""
            )}></span>
            {displayStock === 0 
              ? "Currently out of stock" 
              : displayStock === 1 
                ? "Last item in stock!" 
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
        <Badge 
          variant="aliHot" 
          className={cn(
            "text-xs py-0.5",
            stockLevelInfo.animate ? "animate-pulse" : ""
          )}
        >
          {stockLevelInfo.badge}
        </Badge>
      )}
    </div>
  );
};

export default ProductQuantitySelector;
