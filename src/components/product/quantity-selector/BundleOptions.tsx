import React from 'react';
import { Gift, ChevronUp, ChevronDown, Package, Clock } from 'lucide-react';
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
  toggleExpand 
}) => {
  return (
    <div className="mb-2 text-xs">
      {/* New Header section */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <Package size={16} className="text-orange-500" />
          <h3 className="font-medium text-sm">Bundle Deals</h3>
          <div className="bg-orange-100 text-orange-600 text-xs px-1.5 py-0.5 rounded-full font-medium">Save up to 40%</div>
        </div>
        <div className="text-xs text-gray-500 flex items-center">
          <Clock size={12} className="mr-0.5" />
          Limited time offer
        </div>
      </div>

     

      {/* First row of cards - always visible */}
      <div className="grid grid-cols-3 gap-0.5 mb-0.5">
        {PRICE_TIERS.filter(tier => tier.discount > 0).slice(0, 3).map((tier, index) => (
          <div 
            key={index}
            className={`rounded p-0.5 text-center cursor-pointer transition-all border ${quantity >= tier.min ? 'bg-orange-50 border-orange-400' : 'bg-gray-50 border-gray-200'}`}
            onClick={() => onQuantityChange(tier.min)}
          >
            <div className="text-xs">{tier.min}+ pcs</div>
            <div className="font-semibold text-orange-600 text-xs">Only ${tier.price.toFixed(2)} each</div>
            <div className="bg-orange-500 text-white text-xs rounded-sm px-0.5 mt-0.5 font-medium">Now {tier.discount}% Off!</div>
          </div>
        ))}
      </div>

      {/* Expanded section with additional cards */}
      {isExpanded && (
        <div className="grid grid-cols-3 gap-0.5 mt-0.5">
          {/* Additional bundle options */}
          <div 
            className={`rounded p-0.5 text-center cursor-pointer transition-all border ${quantity >= 200 ? 'bg-orange-50 border-orange-400' : 'bg-gray-50 border-gray-200'}`}
            onClick={() => onQuantityChange(200)}
          >
            <div className="text-xs">200+ pcs</div>
            <div className="font-semibold text-orange-600 text-xs">Only $6.75 each</div>
            <div className="bg-orange-500 text-white text-xs rounded-sm px-0.5 mt-0.5 font-medium">Now 32.5% Off!</div>
          </div>

          <div 
            className={`rounded p-0.5 text-center cursor-pointer transition-all border ${quantity >= 250 ? 'bg-orange-50 border-orange-400' : 'bg-gray-50 border-gray-200'}`}
            onClick={() => onQuantityChange(250)}
          >
            <div className="text-xs">250+ pcs</div>
            <div className="font-semibold text-orange-600 text-xs">Only $6.50 each</div>
            <div className="bg-orange-500 text-white text-xs rounded-sm px-0.5 mt-0.5 font-medium">Now 35% Off!</div>
          </div>

          <div 
            className="rounded p-0.5 text-center cursor-pointer transition-all border bg-gray-50 border-gray-200"
            onClick={() => {
              // Open custom quantity dialog or similar functionality
            }}
          >
            <div className="text-xs">Custom</div>
            <div className="font-semibold text-blue-600 text-xs">Quote</div>
            <div className="bg-blue-500 text-white text-xs rounded-sm px-0.5 mt-0.5 font-medium">Contact us</div>
          </div>
        </div>
      )}

      {/* View more / View less button */}
      <div className="text-center mt-1">
        <button 
          className="text-red-500 text-xs font-medium flex items-center justify-center mx-auto"
          onClick={toggleExpand}
        >
          {isExpanded ? 'View less' : 'View more'}
          {isExpanded ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />}
        </button>
      </div>
    </div>
  );
};

export default BundleOptions;