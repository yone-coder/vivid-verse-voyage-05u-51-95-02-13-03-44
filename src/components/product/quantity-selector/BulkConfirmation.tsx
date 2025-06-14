
import React from 'react';
import { Info, Check } from 'lucide-react';
import { PRICE_TIERS } from './price-tiers';

interface BulkConfirmationProps {
  show: boolean;
  quantity: number;
  activeTierIndex: number;
  onClose: () => void;
  onReduce: () => void;
}

const BulkConfirmation: React.FC<BulkConfirmationProps> = ({ 
  show, 
  quantity, 
  activeTierIndex,
  onClose, 
  onReduce 
}) => {
  if (!show) return null;
  
  return (
    <div className="absolute bottom-0 left-0 right-0 transform translate-y-full p-0.5 z-30">
      <div className="bg-blue-600 text-white p-2 rounded shadow-lg text-sm flex items-start">
        <Info size={18} className="mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-bold mb-1">Bulk Order Selected</div>
          <div className="text-blue-100 text-xs mb-2">You've selected {quantity} units (Tier {activeTierIndex + 1} pricing)</div>
          <div className="flex gap-2">
            <button 
              className="bg-white text-blue-600 px-3 py-0.5 rounded text-xs font-medium hover:bg-blue-50"
              onClick={onClose}
            >
              <Check size={12} className="inline mr-1" />
              Confirm
            </button>
            <button 
              className="bg-blue-700 text-white px-3 py-0.5 rounded text-xs font-medium hover:bg-blue-800"
              onClick={onReduce}
            >
              Reduce Quantity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkConfirmation;
