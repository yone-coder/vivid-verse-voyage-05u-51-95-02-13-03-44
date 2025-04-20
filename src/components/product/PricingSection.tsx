
import { useState } from 'react';
import { TrendingDown, Clock, Scissors } from 'lucide-react';

const PricingSection = () => {
  // Define default values
  const finalPrice = 79.99;
  const originalPrice = 99.99;
  const currency = '$';

  // Calculate savings
  const savings = originalPrice - finalPrice;
  const savingsPercent = Math.round((savings / originalPrice) * 100);
  
  // AliExpress latest colors
  const primaryColor = '#FF4747';
  const secondaryColor = '#FF6E00';
  const bgColor = '#FFF7F0';
  const textColor = '#333333';
  
  // For countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  return (
    <div className="w-full bg-white rounded-none overflow-hidden">
      {/* Discount banner */}
      <div className="flex items-center justify-between bg-red-50 w-full">
        <div className="flex items-center">
          <TrendingDown size={12} className="text-red-500" />
          <span className="text-xs font-semibold text-red-500 ml-1">Limited Time Offer</span>
        </div>
        <div className="flex items-center">
          <Clock size={12} className="text-red-500" />
          <span className="text-xs font-medium text-red-500 ml-1">
            {timeLeft.hours}h:{timeLeft.minutes}m:{timeLeft.seconds}s
          </span>
        </div>
      </div>
      
      {/* Main price area with minimal padding */}
      <div className="flex items-center justify-between px-1 py-1 w-full">
        <div className="flex items-center">
          <span className="text-sm font-semibold" style={{ color: primaryColor }}>{currency}</span>
          <span className="text-2xl font-bold leading-none" style={{ color: primaryColor }}>
            {Math.floor(finalPrice)}
          </span>
          <span className="text-sm font-semibold" style={{ color: primaryColor }}>
            {(finalPrice % 1).toFixed(2).substring(1)}
          </span>
        </div>
        
        <div className="flex items-center ml-1">
          <Clock size={14} className="text-gray-500 mr-1 flex-shrink-0" />
          <span className="text-sm text-gray-500 line-through">{currency}{originalPrice.toFixed(2)}</span>
        </div>
        
        {/* Discount badge */}
        <div className="flex items-center ml-1">
          <div 
            className="flex items-center px-1 py-0.5 rounded-sm text-white text-xs"
            style={{ backgroundColor: secondaryColor }}
          >
            <TrendingDown size={12} className="text-white mr-0.5 flex-shrink-0" />
            <span className="font-bold whitespace-nowrap">{savingsPercent}% OFF</span>
          </div>
        </div>
        
        {/* Savings amount with scissors icon */}
        <div className="flex items-center ml-1">
          <Scissors size={14} className="text-green-500 mr-0.5 flex-shrink-0" />
          <span className="text-sm text-green-500 font-medium">Save {currency}{savings.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
