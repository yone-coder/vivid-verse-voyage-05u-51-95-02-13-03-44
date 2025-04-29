
import React from 'react';

interface UnitPriceIndicatorProps {
  price: number;
  discount: number;
}

const UnitPriceIndicator: React.FC<UnitPriceIndicatorProps> = ({ price, discount }) => {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded px-2 h-8 flex items-center text-xs">
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <span className="text-orange-700 font-medium">
            Only ${price.toFixed(2)} each – Now {discount}% Off!
          </span>
        </div>
      </div>
    </div>
  );
};

export default UnitPriceIndicator;
