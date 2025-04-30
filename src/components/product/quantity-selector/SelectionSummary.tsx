import React, { useMemo } from 'react';
import { Tag, Percent, CheckCircle, TrendingUp, ArrowRight, Gift } from 'lucide-react';
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
  const nextTier = PRICE_TIERS.find(tier => tier.minQuantity > quantity);
  const itemsForNextTier = nextTier ? nextTier.minQuantity - quantity : 0;
  const totalPrice = (quantity * activeTier.price).toFixed(2);
  const originalPrice = (quantity * PRICE_TIERS[0].price).toFixed(2);

  const savings = useMemo(() => calculateSavings(quantity, activeTier), [quantity, activeTier]);

  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-2 mb-3 border border-orange-100">
      {/* Top row with key information and total price */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-600">Selected:</span>
          <span className="font-medium text-orange-600 text-sm">{quantity} pcs</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-600">Total:</span>
          <span className="text-sm font-bold text-orange-600">${totalPrice}</span>
        </div>
      </div>

      {/* Middle row with tier, price, and delivery info */}
      <div className="flex items-center justify-between text-xs mb-1">
        <div className="flex items-center gap-1 flex-wrap">
          <div className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full flex items-center">
            <Tag size={10} className="mr-0.5" />
            ${activeTier.price.toFixed(2)}/pc
          </div>
          {activeTier.discount > 0 && (
            <div className="bg-orange-200 text-orange-700 px-1.5 py-0.5 rounded-full flex items-center">
              <Percent size={10} className="mr-0.5" />
              {activeTier.discount}% off
            </div>
          )}
        </div>
        <div className="text-gray-600 flex items-center">
          <CheckCircle size={10} className="mr-0.5 text-green-500" />
          Free shipping {quantity >= 50 ? "included" : `at ${50 - quantity} more`}
        </div>
      </div>

      {/* Bottom row with savings information or next tier info */}
      <div className="flex justify-between items-center text-xs pt-1 border-t border-orange-200">
        {activeTier.discount > 0 ? (
          <>
            <div className="text-gray-500">
              Original: <span className="line-through">${originalPrice}</span>
            </div>
            <div className="text-green-600 font-medium flex items-center">
              <TrendingUp size={10} className="mr-0.5" />
              Saving ${savings}
            </div>
          </>
        ) : (
          <div className="w-full text-center text-gray-500 flex items-center justify-center">
            <ArrowRight size={10} className="mr-0.5" />
            Add {itemsForNextTier} more for {nextTier?.discount}% off
          </div>
        )}
      </div>

      {/* Bonus benefits row */}
      <div className="flex justify-between items-center text-xs pt-1 border-t border-orange-100 mt-1">
        <div className="flex-1"></div>
        {quantity >= 100 && (
          <div className="flex items-center text-purple-600">
            <Gift size={10} className="mr-0.5" />
            Free gift included
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionSummary;