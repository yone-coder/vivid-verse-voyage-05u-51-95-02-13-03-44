
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
    <div className="flex items-center gap-3 my-2">
      <span className="text-3xl font-bold text-red-500">${formatPrice(currentPrice)}</span>
      <span className="text-lg text-gray-500 line-through">${formatPrice(originalPrice)}</span>
      {discountPercentage > 0 && (
        <div className="flex items-center text-red-500">
          <span className="text-lg font-medium">
            -${discountAmount.toFixed(2)} (-{discountPercentage}%)
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductPriceDisplay;
