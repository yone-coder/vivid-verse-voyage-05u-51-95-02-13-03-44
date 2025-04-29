
import React from 'react';
import { Gift, ChevronUp, ChevronDown } from 'lucide-react';
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
      <h4 className="font-medium text-orange-600 mb-1 flex items-center">
        <Gift size={14} className="text-orange-500 mr-1" />
        Select Bundle Option
        <span className="ml-1 text-xs bg-orange-100 text-orange-700 px-1 rounded">Save more</span>
      </h4>

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
