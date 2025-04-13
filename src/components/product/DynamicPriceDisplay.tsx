
import React, { useState, useEffect, useMemo } from 'react';
import ProductPriceDisplay from './ProductPriceDisplay';

const DynamicPriceDisplay = () => {
  const [currentPrice, setCurrentPrice] = useState(167.79);
  const [originalPrice, setOriginalPrice] = useState(199.99);
  const [previousPrice, setPreviousPrice] = useState(145.99);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() - 0.5) * 4;
      const newPrice = Math.max(parseFloat((currentPrice + fluctuation).toFixed(2)), 120);
      
      setPreviousPrice(currentPrice);
      setCurrentPrice(newPrice);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentPrice]);
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <ProductPriceDisplay currentPrice={currentPrice} originalPrice={originalPrice} />
      </div>
    </div>
  );
};

export default DynamicPriceDisplay;
