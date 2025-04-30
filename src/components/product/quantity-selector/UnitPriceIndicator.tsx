import React from 'react';
import { Tag, Percent } from 'lucide-react';

interface UnitPriceIndicatorProps {
  price: number;
  discount: number;
}

const UnitPriceIndicator: React.FC<UnitPriceIndicatorProps> = ({ price, discount }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full flex items-center">
        <Tag size={10} className="mr-0.5" />
        ${price.toFixed(2)}/pc
      </div>
      {discount > 0 && (
        <div className="bg-orange-200 text-orange-600 px-1.5 py-0.5 rounded-full flex items-center">
          <Percent size={10} className="mr-0.5" />
          {discount}% off
        </div>
      )}
    </div>
  );
};

export default UnitPriceIndicator;