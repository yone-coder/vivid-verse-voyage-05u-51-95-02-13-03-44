
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProductQuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  price?: number;
  maxQuantity?: number;
  minQuantity?: number;
  inStock?: number;
  productName?: string;
}

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  price = 0,
  maxQuantity = 10,
  minQuantity = 1,
  inStock = 999,
  productName = "item"
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [priceAnimation, setPriceAnimation] = useState(false);
  const [stockPulse, setStockPulse] = useState(false);
  
  const formatPrice = (value: number) => {
    return value.toFixed(2);
  };

  const totalPrice = price * quantity;
  const isMaxQuantity = quantity >= maxQuantity || quantity >= inStock;
  const isMinQuantity = quantity <= minQuantity;
  
  const effectiveMaxQuantity = Math.min(maxQuantity, inStock);
  // Reverses the percentage - if inStock is 100, progress is 0%; if inStock is 0, progress is 100%
  const maxStockValue = 100; // Assuming max stock we'd represent is 100
  const stockPercentage = Math.max(0, Math.min(100, 100 - ((inStock / maxStockValue) * 100)));
  const isLowStock = inStock < 10;
  const isMediumStock = inStock >= 10 && inStock < 30;
  
  const handleIncrementWithFeedback = () => {
    if (isMaxQuantity) {
      setStockPulse(true);
      setTimeout(() => setStockPulse(false), 1000);
      
      if (inStock <= maxQuantity) {
        toast.warning(`Limited stock available`, {
          description: `Only ${inStock} ${productName}${inStock !== 1 ? 's' : ''} left in stock.`
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
  
  useEffect(() => {
    if (isLowStock) {
      const interval = setInterval(() => {
        setStockPulse(true);
        setTimeout(() => setStockPulse(false), 1000);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isLowStock]);

  return (
    <div className="space-y-2 font-aliexpress">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          {inStock < 20 && (
            <span className={`ml-2 text-xs text-red-500 inline-flex items-center ${stockPulse ? 'animate-pulse' : ''}`}>
              {inStock < 10 ? 'Almost sold out!' : 'Selling fast!'}
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
            indicatorClassName={`${
              isLowStock 
                ? 'bg-red-500' 
                : isMediumStock 
                  ? 'bg-amber-500' 
                  : 'bg-green-500'
            } ${stockPulse ? 'animate-pulse' : ''}`}
          />
        </div>
        
        <div className="flex items-center justify-between text-xs">
          {inStock < 20 && (
            <div className="text-red-500 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
              Only {inStock} left in stock
            </div>
          )}
          
          {inStock >= 20 && (
            <div className="flex items-center text-green-600 font-semibold">
              {inStock} left in stock
            </div>
          )}
          
          {effectiveMaxQuantity > 1 && (
            <div className="text-gray-500 flex items-center gap-1">
              Buy up to {effectiveMaxQuantity} at once
            </div>
          )}
        </div>
      </div>
      
      {inStock < 5 && (
        <Badge variant="aliHot" className="text-xs py-0.5 animate-pulse">
          HOT ITEM - SELLING FAST!
        </Badge>
      )}
    </div>
  );
};

export default ProductQuantitySelector;
