import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, AlertCircleIcon, CheckCircleIcon, PackageIcon } from "lucide-react";
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
  const [quantityAnimation, setQuantityAnimation] = useState(false);
  const [priceAnimation, setPriceAnimation] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const displayStock = stockInfo?.currentStock !== undefined
    ? Math.floor(stockInfo.currentStock)
    : inStock;

  const effectiveMaxQuantity = Math.min(maxQuantity, displayStock);
  const isMaxQuantity = quantity >= effectiveMaxQuantity;
  const isMinQuantity = quantity <= minQuantity;
  
  const stockPercentage = stockInfo?.stockPercentage !== undefined
    ? stockInfo.stockPercentage
    : Math.min(100, (displayStock / 200) * 100);

  const getStockStatus = () => {
    if (displayStock === 0) {
      return {
        level: "out-of-stock",
        color: "bg-gray-300",
        textColor: "text-gray-500",
        indicator: "bg-gray-400",
        message: "Out of Stock",
        badge: "SOLD OUT",
        badgeVariant: "destructive",
        showBadge: true,
        urgent: false,
        icon: <AlertCircleIcon size={14} className="text-gray-500" />
      };
    } else if (displayStock <= 5) {
      return {
        level: "critical",
        color: "bg-red-500",
        textColor: "text-red-600",
        indicator: "bg-red-500",
        message: `Only ${displayStock} left!`,
        badge: "LAST CHANCE",
        badgeVariant: "destructive",
        showBadge: true,
        urgent: true,
        icon: <AlertCircleIcon size={14} className="text-red-500" />
      };
    } else if (displayStock <= 15) {
      return {
        level: "low",
        color: "bg-orange-400",
        textColor: "text-orange-600",
        indicator: "bg-orange-400",
        message: "Low stock",
        badge: "SELLING FAST",
        badgeVariant: "warning",
        showBadge: true,
        urgent: false,
        icon: <AlertCircleIcon size={14} className="text-orange-400" />
      };
    } else if (displayStock <= 50) {
      return {
        level: "medium",
        color: "bg-yellow-300",
        textColor: "text-yellow-700",
        indicator: "bg-yellow-300",
        message: "Limited availability",
        badge: "POPULAR",
        badgeVariant: "default",
        showBadge: true,
        urgent: false,
        icon: <PackageIcon size={14} className="text-yellow-600" />
      };
    } else {
      return {
        level: "high",
        color: "bg-green-400",
        textColor: "text-green-600",
        indicator: "bg-green-400",
        message: "In stock",
        badge: null,
        badgeVariant: "default",
        showBadge: false,
        urgent: false,
        icon: <CheckCircleIcon size={14} className="text-green-500" />
      };
    }
  };

  const stockStatus = getStockStatus();
  const formatPrice = (value) => value.toFixed(2);
  const totalPrice = price * quantity;

  const handleIncrement = () => {
    if (isMaxQuantity) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      
      const reason = displayStock <= maxQuantity 
        ? `Only ${displayStock} ${productName}${displayStock !== 1 ? 's' : ''} available`
        : `Maximum of ${maxQuantity} per order`;
        
      toast.warning(`Cannot add more items`, {
        description: reason
      });
      return;
    }

    setQuantityAnimation(true);
    setTimeout(() => setQuantityAnimation(false), 300);

    if (price > 0) {
      setPriceAnimation(true);
      setTimeout(() => setPriceAnimation(false), 800);
    }

    onIncrement();
  };

  const handleDecrement = () => {
    if (!isMinQuantity) {
      setQuantityAnimation(true);
      setTimeout(() => setQuantityAnimation(false), 300);

      if (price > 0) {
        setPriceAnimation(true);
        setTimeout(() => setPriceAnimation(false), 800);
      }

      onDecrement();
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Quantity Controls */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Quantity</span>
          {displayStock > 0 && (
            <div className="flex items-center gap-1">
              {stockStatus.icon}
              <span className={`text-xs ${stockStatus.textColor} ${stockStatus.urgent ? 'animate-pulse font-semibold' : ''}`}>
                {stockStatus.message}
              </span>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="flex items-center rounded-lg border bg-white shadow-sm">
            <Button
              onClick={handleDecrement}
              variant="ghost"
              size="icon"
              disabled={isMinQuantity}
              className={`h-10 w-10 rounded-l-lg border-r p-0 ${isMinQuantity ? 'opacity-40' : 'hover:bg-gray-50'}`}
            >
              <MinusIcon size={16} />
            </Button>
            
            <div className={`flex h-10 w-12 items-center justify-center font-medium transition-all duration-200 ${quantityAnimation ? 'scale-110 text-blue-600' : ''}`}>
              {quantity}
            </div>
            
            <Button
              onClick={handleIncrement}
              variant="ghost"
              size="icon"
              disabled={isMaxQuantity}
              className={`h-10 w-10 rounded-r-lg border-l p-0 ${isMaxQuantity ? 'opacity-40' : 'hover:bg-gray-50'}`}
            >
              <PlusIcon size={16} />
            </Button>
          </div>
          
          {showTooltip && (
            <div className="absolute -right-2 top-12 z-10 w-44 rounded-md bg-white p-2 text-xs shadow-lg ring-1 ring-black ring-opacity-5">
              {displayStock <= maxQuantity 
                ? `Limited inventory: only ${displayStock} available`
                : `Maximum ${maxQuantity} per order allowed`}
              <div className="absolute -top-1 right-4 h-2 w-2 rotate-45 bg-white"></div>
            </div>
          )}
        </div>
      </div>

      {/* Stock Status Bar */}
      <div className="space-y-1">
        <div className="relative">
          <Progress 
            value={stockPercentage} 
            className="h-2 w-full overflow-hidden rounded-full bg-gray-100"
            indicatorClassName={`${stockStatus.color} ${stockStatus.urgent ? 'animate-pulse' : ''} transition-all duration-300`}
          />
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-gray-600">
            {displayStock === 0 
              ? 'Currently unavailable'
              : `${displayStock} ${displayStock === 1 ? 'unit' : 'units'} available`}
          </div>
          
          {effectiveMaxQuantity > 1 && displayStock > 0 && (
            <div className="text-gray-500">
              Limit: {effectiveMaxQuantity} per order
            </div>
          )}
        </div>
      </div>

      {/* Price Calculation */}
      {price > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
          <span className="text-sm text-gray-600">Subtotal:</span>
          <div className={`font-medium text-lg transition-all duration-300 ${priceAnimation ? 'scale-110 text-blue-600' : 'text-gray-900'}`}>
            ${formatPrice(totalPrice)}
          </div>
        </div>
      )}

      {/* Badge for Limited Stock */}
      {stockStatus.showBadge && (
        <Badge variant={stockStatus.badgeVariant} className={`px-2 py-1 text-xs ${stockStatus.urgent ? 'animate-pulse' : ''}`}>
          {stockStatus.badge}
        </Badge>
      )}
    </div>
  );
};

export default ProductQuantitySelector;