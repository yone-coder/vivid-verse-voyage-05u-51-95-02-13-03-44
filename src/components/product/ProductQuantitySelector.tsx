
import React from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

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
  const formatPrice = (value: number) => {
    return value.toFixed(2);
  };

  const totalPrice = price * quantity;
  const isMaxQuantity = quantity >= maxQuantity || quantity >= inStock;
  const isMinQuantity = quantity <= minQuantity;
  
  const effectiveMaxQuantity = Math.min(maxQuantity, inStock);
  
  const handleIncrementWithFeedback = () => {
    if (isMaxQuantity) {
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
    onIncrement();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <Button 
            onClick={onDecrement} 
            variant="ghost" 
            size="sm"
            className="h-8 px-3 rounded-none border-r border-gray-300"
            disabled={isMinQuantity}
          >
            <MinusIcon size={14} />
          </Button>
          <div className="w-10 text-center">{quantity}</div>
          <Button 
            onClick={handleIncrementWithFeedback} 
            variant="ghost" 
            size="sm"
            className="h-8 px-3 rounded-none border-l border-gray-300"
            disabled={isMaxQuantity}
          >
            <PlusIcon size={14} />
          </Button>
        </div>
      </div>
      
      {price > 0 && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <ShoppingBag size={14} className="mr-1" />
            <span>Subtotal:</span>
          </div>
          <div className="font-medium text-gray-900">
            ${formatPrice(totalPrice)}
          </div>
        </div>
      )}
      
      {inStock < 20 && (
        <div className="text-xs text-red-500 flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
          Only {inStock} left in stock
        </div>
      )}
      
      {effectiveMaxQuantity > 1 && (
        <div className="text-xs text-gray-500">
          Buy up to {effectiveMaxQuantity} at once
        </div>
      )}
    </div>
  );
};

export default ProductQuantitySelector;
