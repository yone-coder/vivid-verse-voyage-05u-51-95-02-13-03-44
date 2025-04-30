import React, { useMemo } from 'react';
import { 
  Percent, 
  TrendingUp, 
  Tag, 
  CheckCircle, 
  ArrowRight, 
  Gift 
} from 'lucide-react';
import { PRICE_TIERS } from './price-tiers';

interface SelectionSummaryProps {
  quantity: number;
  activeTier: typeof PRICE_TIERS[0];
  itemsForNextTier?: number;
}

const theme = {
  orange: {
    text: "text-orange-600",
    bg: "bg-orange-100",
    border: "border-orange-200"
  },
  green: {
    text: "text-green-600",
    bg: "bg-green-100"
  }
};

const Badge = ({ 
  icon: Icon, 
  text, 
  color = "orange" 
}: { 
  icon: React.ComponentType<{ size: number }>;
  text: string;
  color?: keyof typeof theme;
}) => (
  <div className={`flex items-center text-xs ${theme[color].bg} ${theme[color].text} px-1.5 py-0.5 rounded-full`}>
    <Icon size={12} className="mr-0.5" />
    {text}
  </div>
);

const calculateSavings = (quantity: number, tier: typeof PRICE_TIERS[0]) => {
  const originalPrice = quantity * PRICE_TIERS[0].price;
  const discountedPrice = quantity * tier.price;
  return (originalPrice - discountedPrice).toFixed(2);
};

const SelectionSummary: React.FC<SelectionSummaryProps> = ({ 
  quantity, 
  activeTier,
  itemsForNextTier
}) => {
  const totalPrice = useMemo(() => (quantity * activeTier.price).toFixed(2), [quantity, activeTier.price]);
  const savings = useMemo(() => calculateSavings(quantity, activeTier), [quantity, activeTier]);
  const showFreeGift = quantity >= 100;
  const freeShippingAt = 50 - quantity;
  const hasShippingInfo = freeShippingAt > 0 || quantity >= 50;

  return (
    <section 
      className={`bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-3 mb-3 border ${theme.orange.border}`}
      aria-live="polite"
    >
      {/* Top Row: Quantity and Price */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-sm font-medium text-gray-700">
            Selected: <span className={theme.orange.text}>{quantity} pcs</span>
          </h3>
          <p className="text-xs text-gray-500">
            Unit price:{' '}
            <span className={`font-medium ${theme.orange.text}`}>
              ${activeTier.price.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Total price:</p>
          <p className="text-lg font-bold text-orange-600">
            ${totalPrice}
          </p>
        </div>
      </div>

      {/* Middle Row: Discount and Shipping */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        {activeTier.discount > 0 && (
          <Badge 
            icon={Percent} 
            text={`${activeTier.discount}% discount applied`} 
          />
        )}
        
        {hasShippingInfo && (
          <Badge 
            icon={CheckCircle} 
            text={quantity >= 50 
              ? "Free shipping included" 
              : `Free shipping at ${freeShippingAt} more`}
            color="green"
          />
        )}
      </div>

      {/* Bottom Row: Savings or Next Tier */}
      {activeTier.discount > 0 ? (
        <div className="flex items-center text-xs font-medium text-green-600">
          <TrendingUp size={12} className="mr-0.5" />
          Saving ${savings}
        </div>
      ) : itemsForNextTier && (
        <div className="flex items-center text-xs text-gray-600">
          <ArrowRight size={12} className="mr-0.5" />
          Add {itemsForNextTier} more for volume discount
        </div>
      )}

      {/* Bonus Row: Free Gift */}
      {showFreeGift && (
        <div className="mt-2 flex items-center text-xs font-medium text-purple-600">
          <Gift size={12} className="mr-0.5" />
          Free gift included with your order!
        </div>
      )}
    </section>
  );
};

export default SelectionSummary;