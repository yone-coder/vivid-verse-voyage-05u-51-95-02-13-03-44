import React from 'react';
import {
  ChevronUp,
  ChevronDown,
  Package,
  Clock,
  Star
} from 'lucide-react';
import { PRICE_TIERS } from './price-tiers';

interface BundleOptionsProps {
  quantity: number;
  isExpanded: boolean;
  onQuantityChange: (quantity: number) => void;
  toggleExpand: () => void;
}

const BundleOptions: React.FC<BundleOptionsProps> = ({
  quantity,
  isExpanded,
  onQuantityChange,
  toggleExpand,
}) => {
  const visibleTiers = isExpanded ? PRICE_TIERS : PRICE_TIERS.slice(0, 3);

  return (
    <div className="mb-2 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <Package size={16} className="text-orange-500" />
          <h3 className="font-medium text-sm">Bundle Deals</h3>
          <div className="bg-orange-100 text-orange-600 text-xs px-1.5 py-0.5 rounded-full font-medium">
            Save up to 30%
          </div>
        </div>
        <div className="text-xs text-gray-500 flex items-center">
          <Clock size={12} className="mr-1" />
          Limited time offer
        </div>
      </div>

      {/* Tiers grid */}
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {visibleTiers.map((tier, index) => {
          const isSelected =
            quantity >= tier.min && quantity <= tier.max;
          const rangeLabel =
            tier.max === Infinity
              ? `${tier.min}+`
              : `${tier.min}-${tier.max}`;

          return (
            <div
              key={index}
              className={`rounded-lg p-2 text-center cursor-pointer border relative transition-all ${
                isSelected
                  ? 'bg-orange-50 border-orange-500 shadow-sm'
                  : 'bg-gray-50 border-gray-200'
              }`}
              onClick={() => onQuantityChange(tier.min)}
            >
              <div className="text-xs font-medium">{rangeLabel} pcs</div>
              <div className="text-orange-600 font-semibold text-xs">
                ${tier.price.toFixed(2)} each
              </div>
              <div
  className={`text-xs rounded-full px-1.5 py-0.5 mt-1 font-medium ${
    tier.discount > 0
      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
      : 'bg-gray-200 text-gray-600'
  }`}
>
  {tier.discount}% Off
</div>
                  {tier.discount}% Off
                </div>
              )}
              {isSelected && (
                <div className="absolute -top-1 -right-1 bg-orange-500 rounded-full p-0.5">
                  <Star size={12} className="text-white" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Toggle button */}
      <div className="text-center mt-1">
        <button
          onClick={toggleExpand}
          className="text-red-500 text-xs font-medium flex items-center justify-center mx-auto"
        >
          {isExpanded ? 'View less' : 'View more'}
          {isExpanded ? (
            <ChevronUp size={12} className="ml-1" />
          ) : (
            <ChevronDown size={12} className="ml-1" />
          )}
        </button>
      </div>
    </div>
  );
};

export default BundleOptions;