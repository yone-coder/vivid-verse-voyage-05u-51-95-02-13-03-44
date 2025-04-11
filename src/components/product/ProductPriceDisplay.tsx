
import React from "react";

interface ProductPriceDisplayProps {
  currentPrice: number;
  originalPrice: number;
}

const ProductPriceDisplay: React.FC<ProductPriceDisplayProps> = ({
  currentPrice,
  originalPrice
}) => {
  const formatPrice = (price: number) => price.toFixed(2);
  
  // Calculate discount percentage
  const discountPercentage = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  
  return (
    <div className="flex items-baseline">
      <span className="text-xl font-bold text-red-500 relative animate-pulse">${formatPrice(currentPrice)}</span>
      <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
      {discountPercentage > 0 && (
        <span className="ml-2 text-xs font-medium bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
          -{discountPercentage}%
        </span>
      )}
    </div>
  );
};

export default ProductPriceDisplay;
