
import React from 'react';
import { Award } from 'lucide-react';
import { PRICE_TIERS } from './price-tiers';

interface SelectionSummaryProps {
  quantity: number;
  activeTier: typeof PRICE_TIERS[0];
}

const SelectionSummary: React.FC<SelectionSummaryProps> = ({ quantity, activeTier }) => {
  return (
    <div className="flex items-center justify-between p-1 rounded border border-gray-200">
      <div>
        <div className="text-xs text-gray-500">Current selection:</div>
        <div className="font-medium text-sm">
          {quantity} {quantity === 1 ? 'pc' : 'pcs'} × ${activeTier.price.toFixed(2)}
        </div>
        {activeTier.discount > 0 && (
          <div className="text-orange-600 text-xs font-medium flex items-center">
            <Award size={12} className="mr-1" />
            {activeTier.discount}% bulk discount applied
          </div>
        )}
      </div>
      <div className="text-right">
        <div className="text-xs text-gray-500">Total price:</div>
        <div className="text-base font-bold text-orange-600">
          US ${(quantity * activeTier.price).toFixed(2)}
        </div>
        {activeTier.discount > 0 && (
          <div className="text-xs text-gray-500 line-through">
            US ${(quantity * PRICE_TIERS[0].price).toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionSummary;
