
import React from 'react';
import ProductPriceDisplay from './ProductPriceDisplay';

interface DynamicPriceDisplayProps {
  selectedColor?: string;
}

const DynamicPriceDisplay: React.FC<DynamicPriceDisplayProps> = ({ selectedColor = "Black" }) => {
  // Static prices for each color
  const colorPrices = {
    "Black": 79.99,
    "White": 89.99,
    "Jet Black": 89.99,
    "Blue": 219.99,
    "Red": 229.99
  };
  
  // Get price for selected color or default to Black's price
  const currentPrice = colorPrices[selectedColor as keyof typeof colorPrices] || colorPrices.Black;
  const originalPrice = 199.99;
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <ProductPriceDisplay currentPrice={currentPrice} originalPrice={originalPrice} />
      </div>
    </div>
  );
};

export default DynamicPriceDisplay;
