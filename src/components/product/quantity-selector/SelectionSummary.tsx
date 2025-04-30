import React from 'react';
import { Percent, TrendingUp } from 'lucide-react';
import { PRICE_TIERS } from './price-tiers';

interface SelectionSummaryProps {
  quantity: number;
  activeTier: typeof PRICE_TIERS[0];
}

const calculateSavings = (quantity: number, tier: typeof PRICE_TIERS[0]) => {
  const originalPrice = quantity * PRICE_TIERS[0].price;
  const discountedPrice = quantity * tier.price;
  return (originalPrice - discountedPrice).toFixed(2);
};

const SelectionSummary: React.FC<SelectionSummaryProps> = ({ quantity, activeTier }) => {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-2 mb-3 border border-orange-100">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-medium text-gray-700">
            Selected: <span className="text-orange-600">{quantity} pcs</span>
          </div>
          <div className="text-xs text-gray-500">
            Unit price:{' '}
            <span className="font-medium text-orange-600">
              ${activeTier.price.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Total price:</div>
          <div className="text-lg font-bold text-orange-600">
            ${(quantity * activeTier.price).toFixed(2)}
          </div>
        </div>
      </div>

      {activeTier.discount > 0 && (
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center text-xs bg-orange-200 text-orange-700 px-1.5 py-0.5 rounded-full">
            <Percent size={12} className="mr-0.5" />
            {activeTier.discount}% discount applied
          </div>
          <div className="text-xs text-green-600 font-medium flex items-center">
            <TrendingUp size={12} className="mr-0.5" />
            Saving ${calculateSavings(quantity, activeTier)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionSummary;