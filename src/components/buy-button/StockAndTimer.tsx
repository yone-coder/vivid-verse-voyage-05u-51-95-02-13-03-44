
import React from 'react';
import Timer from './Timer';

interface StockAndTimerProps {
  timeLeft: { minutes: number, seconds: number, milliseconds: number };
  highlightStock: boolean;
  stockRemaining: number;
  itemsInCart: number;
}

const StockAndTimer = ({
  timeLeft,
  highlightStock,
  stockRemaining,
  itemsInCart
}: StockAndTimerProps) => {
  return (
    <div className="relative">
      <div className="flex items-center space-x-1">
        <Timer timeLeft={timeLeft} highlightStock={highlightStock} />
      </div>
      <span className={`text-xs text-red-500 font-medium mt-0.5 block ${highlightStock ? 'animate-pulse' : ''}`}>
        {stockRemaining <= 1 ? 'Last one!' : `Only ${stockRemaining} left!`}
      </span>
      {itemsInCart > 0 && (
        <div 
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold shadow-md animate-bounce"
        >
          {itemsInCart}
        </div>
      )}
    </div>
  );
};

export default StockAndTimer;
