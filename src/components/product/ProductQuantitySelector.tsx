
import React from "react";
import { Button } from "@/components/ui/button";

interface ProductQuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700">Quantity:</span>
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <Button 
          onClick={onDecrement} 
          variant="ghost" 
          className="h-8 px-3 rounded-none border-r border-gray-300"
          disabled={quantity <= 1}
        >
          -
        </Button>
        <div className="w-10 text-center">{quantity}</div>
        <Button 
          onClick={onIncrement} 
          variant="ghost" 
          className="h-8 px-3 rounded-none border-l border-gray-300"
          disabled={quantity >= 10}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default ProductQuantitySelector;
