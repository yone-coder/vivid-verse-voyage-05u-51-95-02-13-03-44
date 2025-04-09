
import React, { useState, useEffect } from 'react';

const DynamicPriceDisplay = () => {
  // Initial values
  const [currentPrice, setCurrentPrice] = useState(149.99);
  const [originalPrice, setOriginalPrice] = useState(199.99);
  const [previousPrice, setPreviousPrice] = useState(145.99); // For percentage change calculation
  
  // Calculate discount percentage
  const discountPercentage = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  
  // Calculate percentage change from previous price
  const percentageChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  const isPositiveChange = percentageChange >= 0;
  
  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate market-like fluctuations (small random changes)
      const fluctuation = (Math.random() - 0.5) * 4;
      const newPrice = Math.max(parseFloat((currentPrice + fluctuation).toFixed(2)), 120);
      
      setPreviousPrice(currentPrice);
      setCurrentPrice(newPrice);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentPrice]);
  
  return (
    <div className="flex items-center justify-between w-full py-1 gap-3">
      {/* Current price */}
      <div className="text-xl font-bold text-red-500">
        ${currentPrice.toFixed(2)}
      </div>
      
      {/* Original price */}
      <div className="text-gray-500 line-through text-sm">
        ${originalPrice.toFixed(2)}
      </div>
      
      {/* Discount badge */}
      <div className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-md font-medium text-center">
        {discountPercentage}% OFF
      </div>
      
      {/* Percentage change indicator */}
      <div className={`flex items-center ${isPositiveChange ? 'text-green-600' : 'text-red-600'} text-xs font-medium`}>
        {isPositiveChange ? (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
          </svg>
        ) : (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        )}
        <span>{Math.abs(percentageChange).toFixed(2)}%</span>
      </div>
    </div>
  );
};

export default DynamicPriceDisplay;
