
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
  
  // Calculate discount percentage based on the difference between original and current price
  const discountAmount = originalPrice - currentPrice;
  const discountPercentage = Math.round((discountAmount / originalPrice) * 100);
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-red-500">${formatPrice(currentPrice)}</span>
        <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
        {discountPercentage > 0 && (
          <span className="ml-3 text-sm font-medium text-red-600">
            -{discountAmount.toFixed(2)} (-{discountPercentage}%)
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductPriceDisplay;
