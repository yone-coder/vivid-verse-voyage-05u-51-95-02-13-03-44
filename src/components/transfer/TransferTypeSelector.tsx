
import React from 'react';
import { Globe, MapPin } from 'lucide-react';

interface TransferTypeSelectorProps {
  transferType: 'international' | 'national';
  onTransferTypeChange: (type: 'international' | 'national') => void;
}

const TransferTypeSelector: React.FC<TransferTypeSelectorProps> = ({
  transferType,
  onTransferTypeChange
}) => {
  return (
    <div className="w-full">
      <div className="flex w-full border-b border-gray-200">
        <button
          onClick={() => onTransferTypeChange('international')}
          className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-colors relative ${
            transferType === 'international'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Globe className="h-4 w-4" />
          <span>International</span>
        </button>
        
        <button
          onClick={() => onTransferTypeChange('national')}
          className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-colors relative ${
            transferType === 'national'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <MapPin className="h-4 w-4" />
          <span>National</span>
        </button>
      </div>
    </div>
  );
};

export default TransferTypeSelector;
