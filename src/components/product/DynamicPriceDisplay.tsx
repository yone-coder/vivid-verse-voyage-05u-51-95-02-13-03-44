
import React, { useState, useEffect, useMemo } from 'react';
import ProductPriceDisplay from './ProductPriceDisplay';

interface DynamicPriceDisplayProps {
  selectedColor?: string;
}

const DynamicPriceDisplay: React.FC<DynamicPriceDisplayProps> = ({ selectedColor = "Black" }) => {
  // Base prices for each color
  const colorPrices = {
    "Black": 79.99,
    "White": 89.99,
    "Jet Black": 89.99
  };
  
  // Get base price for selected color or default to Black's price
  const basePrice = colorPrices[selectedColor as keyof typeof colorPrices] || colorPrices.Black;
  
  const [currentPrice, setCurrentPrice] = useState(basePrice);
  const [originalPrice, setOriginalPrice] = useState(199.99);
  const [previousPrice, setPreviousPrice] = useState(basePrice - 20);
  
  // Reset the current price when selected color changes
  useEffect(() => {
    const colorBasePrice = colorPrices[selectedColor as keyof typeof colorPrices] || colorPrices.Black;
    setCurrentPrice(colorBasePrice);
    setPreviousPrice(colorBasePrice - 20);
  }, [selectedColor]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Small price fluctuations around the base price for the selected color
      const fluctuation = (Math.random() - 0.5) * 4;
      const colorBasePrice = colorPrices[selectedColor as keyof typeof colorPrices] || colorPrices.Black;
      const minPrice = colorBasePrice - 10;
      
      // Make sure price doesn't go below the minimum for that color
      const newPrice = Math.max(parseFloat((currentPrice + fluctuation).toFixed(2)), minPrice);
      
      setPreviousPrice(currentPrice);
      setCurrentPrice(newPrice);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentPrice, selectedColor]);
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <ProductPriceDisplay currentPrice={currentPrice} originalPrice={originalPrice} />
      </div>
    </div>
  );
};

export default DynamicPriceDisplay;
