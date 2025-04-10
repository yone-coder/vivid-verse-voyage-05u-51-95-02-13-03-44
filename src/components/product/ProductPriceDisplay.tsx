
import React, { useMemo } from "react";

interface ProductPriceDisplayProps {
  currentPrice: number;
  originalPrice: number;
}

const ProductPriceDisplay: React.FC<ProductPriceDisplayProps> = ({
  currentPrice,
  originalPrice
}) => {
  const formatPrice = (price: number) => price.toFixed(2);
  
  // Calculate discount percentage based on original and current price
  const discountPercentage = useMemo(() => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }, [originalPrice, currentPrice]);
  
  return (
    <div className="flex items-baseline">
      <span className="text-xl font-bold text-red-500 relative animate-pulse">${formatPrice(currentPrice)}</span>
      <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
      <span className="ml-2 text-sm text-red-600">-{discountPercentage}%</span>
    </div>
  );
};

export default ProductPriceDisplay;
