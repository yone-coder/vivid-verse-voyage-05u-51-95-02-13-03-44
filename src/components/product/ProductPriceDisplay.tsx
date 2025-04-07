
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { PriceHistoryModal } from "./PriceHistoryModal";

interface ProductPriceDisplayProps {
  currentPrice: number;
  originalPrice: number;
  showPriceHistory?: boolean;
  onTogglePriceHistory?: () => void;
}

const ProductPriceDisplay: React.FC<ProductPriceDisplayProps> = ({
  currentPrice,
  originalPrice,
  showPriceHistory = false,
  onTogglePriceHistory
}) => {
  const formatPrice = (price: number) => price.toFixed(2);
  const discountPercentage = Math.round((1 - currentPrice / originalPrice) * 100);
  
  return (
    <div className="flex items-baseline">
      <span className="text-xl font-bold text-red-500">${formatPrice(currentPrice)}</span>
      <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
      <span className="ml-2 text-xs px-1.5 py-0.5 bg-red-100 text-red-500 rounded">
        {discountPercentage}% OFF
      </span>
      
      {onTogglePriceHistory && (
        <Button
          variant="ghost"
          size="sm"
          className="ml-1 h-5 w-5 p-0"
          onClick={onTogglePriceHistory}
        >
          <History className="h-3 w-3 text-gray-500" />
        </Button>
      )}
      
      {showPriceHistory && <PriceHistoryModal />}
    </div>
  );
};

export default ProductPriceDisplay;
