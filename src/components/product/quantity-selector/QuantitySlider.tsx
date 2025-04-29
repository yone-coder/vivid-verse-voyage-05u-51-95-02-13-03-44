
import React from 'react';
import { MAX_QUANTITY, PRICE_TIERS } from './price-tiers';

interface QuantitySliderProps {
  quantity: number;
  maxQuantity: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuantitySlider: React.FC<QuantitySliderProps> = ({ 
  quantity, 
  maxQuantity,
  onChange 
}) => {
  const renderMilestoneMarkers = () => {
    const milestones = [];
    
    // Add tier thresholds as milestones
    PRICE_TIERS.forEach((tier, index) => {
      if (index < PRICE_TIERS.length - 1) {
        const nextTier = PRICE_TIERS[index + 1];
        const percentage = (nextTier.min / maxQuantity) * 100;
        
        milestones.push(
          <div 
            key={`tier-${index}`}
            className="absolute h-4 w-1 bg-gray-400 rounded-full"
            style={{ left: `${percentage}%`, top: '50%', transform: 'translateY(-50%)' }}
          />
        );
      }
    });
    
    return milestones;
  };

  return (
    <div className="mb-2 relative">
      <div className="h-1 bg-gray-200 rounded-full mb-1 relative overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
          style={{ width: `${(quantity / maxQuantity) * 100}%` }}
        />
        {renderMilestoneMarkers()}
      </div>

      <input
        type="range"
        min="1"
        max={maxQuantity}
        value={quantity}
        onChange={onChange}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
      />

      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>1 pc</span>
        <span>Max {maxQuantity}</span>
      </div>
    </div>
  );
};

export default QuantitySlider;
