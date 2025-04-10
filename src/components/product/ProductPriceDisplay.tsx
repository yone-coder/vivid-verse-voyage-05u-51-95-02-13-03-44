
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
  const discountPercentage = originalPrice > 0 ? 
    Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
  
  return (
    <div className="flex items-baseline">
      <span className="text-xl font-bold text-red-500 relative animate-pulse">${formatPrice(currentPrice)}</span>
      <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
      {discountPercentage !== 0 && (
        <span className="ml-2 text-xs text-red-500">
          {discountPercentage > 0 ? `-${discountPercentage}%` : `+${Math.abs(discountPercentage)}%`}
        </span>
      )}
    </div>
  );
};

export default ProductPriceDisplay;
