import React, { useMemo } from 'react';
import { Percent, TrendingUp, Gift, CheckCircle, ArrowRight } from 'lucide-react';
import { PRICE_TIERS } from './price-tiers';

interface SelectionSummaryProps {
  quantity: number;
  activeTier: typeof PRICE_TIERS[0];
  originalPricePerUnit: number;
  itemsForNextTier: number;
}

const calculateSavings = (quantity: number, tierPrice: number, originalPrice: number) => {
  const original = quantity * originalPrice;
  const discounted = quantity * tierPrice;
  return (original - discounted).toFixed(2);
};

const Badge: React.FC<{ icon: React.ReactNode; text: string; color?: string }> = ({ icon, text, color }) => (
  <div
    className={`flex items-center text-xs px-1.5 py-0.5 rounded-full ${
      color || 'bg-orange-100 text-orange-700'
    }`}
  >
    {icon}
    <span className="ml-1">{text}</span>
  </div>
);

const SelectionSummary: React.FC<SelectionSummaryProps> = ({
  quantity,
  activeTier,
  originalPricePerUnit,
  itemsForNextTier,
}) => {
  const savings = useMemo(
    () => calculateSavings(quantity, activeTier.price, originalPricePerUnit),
    [quantity, activeTier.price, originalPricePerUnit]
  );

  const totalPrice = (quantity * activeTier.price).toFixed(2);
  const freeGiftEligible = quantity >= 100;
  const freeShippingMsg =
    quantity >= 50 ? 'Free shipping included' : `Free shipping at ${50 - quantity} more`;

  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-2 mb-3 border border-orange-100 text-gray-700">
      {/* Top Row */}
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-medium">
            Selected: <span className="text-orange-600">{quantity} pcs</span>
          </div>
          <div className="text-xs text-gray-500">
            Unit price: <span className="font-medium text-orange-600">${activeTier.price.toFixed(2)}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Total price:</div>
          <div className="text-lg font-bold text-orange-600">${totalPrice}</div>
        </div>
      </div>

      {/* Discount Row */}
      {activeTier.discount > 0 && (
        <div className="mt-1 flex items-center justify-between">
          <Badge icon={<Percent size={12} aria-label="Discount" />} text={`${activeTier.discount}% discount applied`} />
          <div className="text-xs text-green-600 font-medium flex items-center">
            <TrendingUp size={12} className="mr-0.5" aria-label="Savings" />
            Saving ${savings}
          </div>
        </div>
      )}

      {/* Shipping Row */}
      <div className="mt-1 flex items-center justify-between text-xs text-gray-600 border-t border-orange-200 pt-1">
        <div className="flex gap-1 flex-wrap">
          <Badge icon={<CheckCircle size={10} aria-label="Shipping info" />} text={freeShippingMsg} color="bg-orange-100 text-gray-700" />
        </div>
        {freeGiftEligible && (
          <Badge icon={<Gift size={10} aria-label="Free gift" />} text="Free gift included" color="bg-green-100 text-green-700" />
        )}
      </div>

      {/* Bottom CTA Row */}
      {activeTier.discount === 0 && itemsForNextTier > 0 && (
        <div className="mt-1 flex items-center text-xs text-orange-700">
          <ArrowRight size={12} className="mr-1" aria-label="Next tier" />
          Add {itemsForNextTier} more for next discount tier
        </div>
      )}
    </div>
  );
};

export default SelectionSummary;