
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface StockIndicatorProps {
  stockRemaining: number;
  highlightStock: boolean;
  rotateIcons: boolean;
  pulseDiscount: boolean;
  stockPercentage: number;
  stockProgressAnimation: boolean;
}

const StockIndicator = ({
  stockRemaining,
  highlightStock,
  rotateIcons,
  pulseDiscount,
  stockPercentage,
  stockProgressAnimation
}: StockIndicatorProps) => {
  return (
    <>
      <div className={`bg-red-50 py-0.5 px-3 border-t border-red-100 flex items-center justify-between ${highlightStock ? 'animate-pulse bg-red-100' : ''}`}>
        <div className="flex items-center">
          <AlertTriangle size={12} className={`text-red-500 mr-1 ${rotateIcons ? 'animate-spin' : ''}`} />
          <span className={`text-xs font-bold text-red-700 ${highlightStock ? 'animate-bounce' : ''}`}>
            {stockRemaining <= 1 ? 'Last one available!' : `Only ${stockRemaining} left in stock!`}
          </span>
        </div>
        <div className={`text-xs text-red-600 ${pulseDiscount ? 'animate-pulse' : ''}`}>
          {stockRemaining <= 20 && "Prices may increase!"}
        </div>
      </div>
      
      <div className="h-0.5 w-full bg-gray-200">
        <div 
          className={`h-full ${stockRemaining <= 10 ? 'bg-red-500' : stockRemaining <= 30 ? 'bg-amber-500' : 'bg-green-500'} 
                    ${stockProgressAnimation ? 'animate-pulse' : ''} transition-all duration-1000 ease-in-out`}
          style={{ width: `${stockPercentage}%` }}
        ></div>
      </div>
    </>
  );
};

export default StockIndicator;
