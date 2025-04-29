
import React from 'react';
import { DollarSign, Gift, Package } from 'lucide-react';
import { getNextDiscountThreshold, calculateSavings, PRICE_TIERS } from './price-tiers';

interface StatusNotificationProps {
  quantity: number;
  activeTier: typeof PRICE_TIERS[0];
}

const StatusNotification: React.FC<StatusNotificationProps> = ({ quantity, activeTier }) => {
  const nextThreshold = getNextDiscountThreshold(activeTier);
  const savings = calculateSavings(quantity, activeTier);
  
  return (
    <div className="bg-orange-50 border border-orange-200 p-1 rounded mb-2 text-xs">
      {activeTier.discount > 0 ? (
        <div className="flex items-center">
          <DollarSign size={14} className="text-orange-600 mr-1 flex-shrink-0" />
          <span className="text-orange-800">You saved <strong>${savings}</strong> with your bulk purchase! <span className="text-orange-600 font-medium">Extra coupon applied at checkout.</span></span>
        </div>
      ) : nextThreshold ? (
        <div className="flex items-center">
          <Gift size={14} className="text-orange-600 mr-1 flex-shrink-0" />
          <span className="text-orange-800">Add <strong>{nextThreshold - quantity}</strong> more to unlock a <strong>{PRICE_TIERS[1].discount}%</strong> discount!</span>
        </div>
      ) : (
        <div className="flex items-center">
          <Package size={14} className="text-orange-600 mr-1 flex-shrink-0" />
          <span className="text-orange-800">Buy <strong>3</strong> or more to get <strong>10% off</strong>! <span className="text-orange-600 font-medium">Limited time offer!</span></span>
        </div>
      )}
    </div>
  );
};

export default StatusNotification;
