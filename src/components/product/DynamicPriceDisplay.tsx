
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Bell, Heart, TrendingUp, AlertTriangle, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceHistoryPoint {
  day: string;
  price: number;
}

const DynamicPriceDisplay = () => {
  // Initial values
  const [currentPrice, setCurrentPrice] = useState(149.99);
  const [originalPrice, setOriginalPrice] = useState(199.99);
  const [previousPrice, setPreviousPrice] = useState(145.99);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryPoint[]>([
    { day: '7d', price: 147.99 },
    { day: '6d', price: 151.20 },
    { day: '5d', price: 148.50 },
    { day: '4d', price: 146.75 },
    { day: '3d', price: 149.30 },
    { day: '2d', price: 150.25 },
    { day: '1d', price: 149.99 }
  ]);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [currency, setCurrency] = useState('USD');
  
  // Calculate discount percentage
  const discountPercentage = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  
  // Calculate lowest price in 30 days
  const lowestPrice = Math.min(...priceHistory.map(item => item.price), currentPrice);
  
  // Function to get currency symbol
  const getCurrencySymbol = (curr: string) => {
    switch(curr) {
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'JPY': return '¥';
      default: return '$';
    }
  };
  
  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate market-like fluctuations (small random changes)
      const fluctuation = (Math.random() - 0.5) * 4;
      const newPrice = Math.max(parseFloat((currentPrice + fluctuation).toFixed(2)), 120);
      
      setPreviousPrice(currentPrice);
      setCurrentPrice(newPrice);
      
      // Update price history - shift array and add new price
      setPriceHistory(prev => {
        const updatedHistory = [...prev.slice(1), { day: 'Now', price: currentPrice }];
        // Rename the last day to "Now"
        for (let i = 0; i < updatedHistory.length - 1; i++) {
          updatedHistory[i].day = `${updatedHistory.length - i - 1}d`;
        }
        return updatedHistory;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentPrice]);
  
  // Determine if current price is a good deal
  const isGoodDeal = currentPrice <= (lowestPrice * 1.03); // Within 3% of lowest price
  
  // Custom tooltip for the line chart
  const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any[] }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded text-xs">
          <p>{`${payload[0].payload.day}: ${getCurrencySymbol(currency)}${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full">
      {/* Main price display row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-6">
          {/* Current price */}
          <div className="text-2xl font-bold text-red-500">
            {getCurrencySymbol(currency)}{currentPrice.toFixed(2)}
          </div>
          
          {/* Original price */}
          <div className="text-gray-500 line-through text-sm">
            {getCurrencySymbol(currency)}{originalPrice.toFixed(2)}
          </div>
          
          {/* Discount badge */}
          <div className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-md font-medium flex items-center">
            <ChevronDown size={14} className="mr-1" />
            <span>{discountPercentage}% OFF</span>
          </div>
        </div>
        
        {/* Toggle button for price history */}
        <button 
          onClick={() => setShowPriceHistory(!showPriceHistory)}
          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors text-blue-600"
          aria-label={showPriceHistory ? "Hide price history" : "Show price history"}
        >
          {showPriceHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      
      {/* Price history section */}
      {showPriceHistory && (
        <div className="pt-3 border-t border-gray-100 mt-2 animate-accordion-down">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-800">Price History</h3>
            <div>
              <button 
                className="p-1 rounded-full bg-gray-50 text-blue-600"
              >
                <TrendingUp size={16} />
              </button>
            </div>
          </div>
          
          {/* Chart */}
          <div className="mb-3">
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 10 }}
                    axisLine={{ stroke: '#e0e0e0' }}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    tick={{ fontSize: 10 }}
                    axisLine={{ stroke: '#e0e0e0' }}
                    tickLine={false}
                    tickFormatter={(value) => `${getCurrencySymbol(currency)}${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone"
                    dataKey="price"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#3b82f6", stroke: "#3b82f6" }}
                    activeDot={{ r: 5, fill: "#1d4ed8", stroke: "#3b82f6" }}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Lowest: {getCurrencySymbol(currency)}{lowestPrice.toFixed(2)}</span>
              <span>Highest: {getCurrencySymbol(currency)}{Math.max(...priceHistory.map(item => item.price)).toFixed(2)}</span>
            </div>
          </div>
          
          {/* Deal indicator */}
          {isGoodDeal && (
            <div className="flex items-center space-x-1 bg-green-50 p-2 rounded-md mb-2 text-sm text-green-700">
              <Star size={16} className="text-yellow-500 mr-1" fill="#EAB308" />
              <span>Good deal! Near 30-day low price.</span>
            </div>
          )}
          
          {/* Currency selector */}
          <div className="flex items-center space-x-2 text-xs text-gray-600 mb-3">
            <span>Currency:</span>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="border border-gray-200 rounded p-1 text-xs"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicPriceDisplay;
