import React, { useMemo } from 'react';
import { Percent, TrendingUp } from 'lucide-react';
import { PRICE_TIERS } from './price-tiers';

// Theme configuration for consistent styling
const theme = {
  orange: {
    text: 'text-orange-600',
    bg: 'bg-orange-200',
    gradient: 'from-orange-50 to-amber-50',
    border: 'border-orange-100',
  },
  green: {
    text: 'text-green-600',
  },
};

// Reusable Badge component
const Badge = ({ icon: Icon, text, color = 'orange' }: { icon: React.ElementType; text: string; color?: 'orange' | 'green' }) => (
  <div className={`flex items-center text-xs ${theme[color].bg} ${theme[color].text} px-1.5 py-0.5 rounded-full`} role="status">
    <Icon size={12} className="mr-0.5" aria-hidden="true" />
    <span>{text}</span>
  </div>
);

interface SelectionSummaryProps {
  quantity: number;
  activeTier: typeof PRICE_TIERS[0];
}

// Utility function for savings calculation
const calculateSavings = (quantity: number, tier: typeof PRICE_TIERS[0]) => {
  const originalPrice = quantity * PRICE_TIERS[0].price;
  const discountedPrice = quantity * tier.price;
  return (originalPrice - discountedPrice).toFixed(2);
};

const SelectionSummary: React.FC<SelectionSummaryProps> = ({ quantity, activeTier }) => {
  // Memoize savings calculation
  const savings = useMemo(() => calculateSavings(quantity, activeTier), [quantity, activeTier]);

  // Memoize total price
  const totalPrice = useMemo(() => (quantity * activeTier.price).toFixed(2), [quantity, activeTier]);

  return (
    <div
      className={`bg-gradient-to-r ${theme.orange.gradient} rounded-lg p-2 mb-3 border ${theme.orange.border}`}
      aria-label="Order summary"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-medium text-gray-700">
            Selected: <span className={theme.orange.text}>{quantity} pcs</span>
          </div>
          <div className="text-xs text-gray-500">
            Unit price:{' '}
            <span className={`font-medium ${theme.orange.text}`}>
              ${activeTier.price.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Total price:</div>
          <div className={`text-lg font-bold ${theme.orange.text}`}>
            ${totalPrice}
          </div>
        </div>
      </div>

      {activeTier.discount > 0 && (
        <div className="mt-1 flex items-center justify-between">
          <Badge icon={Percent} text={`${activeTier.discount}% discount applied`} />
          <Badge icon={TrendingUp} text={`Saving $${savings}`} color="green" />
        </div>
      )}
    </div>
  );
};

export default SelectionSummary;