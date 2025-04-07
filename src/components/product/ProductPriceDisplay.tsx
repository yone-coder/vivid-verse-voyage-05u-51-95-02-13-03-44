
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { PriceHistoryModal } from "./PriceHistoryModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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
      <span className="text-2xl font-bold text-red-500">${formatPrice(currentPrice)}</span>
      <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
      <span className="ml-2 text-xs px-2 py-0.5 bg-red-100 text-red-500 rounded-md font-medium">
        {discountPercentage}% OFF
      </span>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="ml-1.5 h-6 w-6 p-0"
          >
            <History className="h-4 w-4 text-blue-600 hover:text-blue-800 transition-colors" />
          </Button>
        </DialogTrigger>
        <PriceHistoryModal />
      </Dialog>
    </div>
  );
};

export default ProductPriceDisplay;
