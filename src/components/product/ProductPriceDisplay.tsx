
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
  const discountPercentage = Math.round((1 - currentPrice / originalPrice) * 100);
  
  return (
    <div className="flex items-baseline">
      <span className="text-xl font-bold text-red-500">${formatPrice(currentPrice)}</span>
      <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
      <span className="ml-2 text-xs px-1.5 py-0.5 bg-red-100 text-red-500 rounded">
        {discountPercentage}% OFF
      </span>
    </div>
  );
};

export default ProductPriceDisplay;
