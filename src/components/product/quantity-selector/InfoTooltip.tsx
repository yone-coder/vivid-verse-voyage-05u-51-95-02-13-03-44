
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { PRICE_TIERS } from './price-tiers';

interface InfoTooltipProps {
  show: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ show, onMouseEnter, onMouseLeave }) => {
  return (
    <div className="relative ml-2">
      <button
        className="text-gray-400 hover:text-gray-600"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <HelpCircle size={14} />
      </button>
      {show && (
        <div className="absolute z-20 bg-gray-800 text-white p-1 rounded shadow-lg text-xs w-56 left-0 top-6">
          <div className="font-semibold mb-1">About Bulk Pricing</div>
          <p className="mb-1">Our tiered pricing system offers discounts based on quantity purchased.</p>
          <ul className="text-gray-300 text-xs">
            {PRICE_TIERS.map((tier, i) => (
              <li key={i} className="flex justify-between">
                <span>{tier.min}-{tier.max === Infinity ? '+' : tier.max} pcs:</span>
                <span>${tier.price.toFixed(2)}/pc ({tier.discount}% off)</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
