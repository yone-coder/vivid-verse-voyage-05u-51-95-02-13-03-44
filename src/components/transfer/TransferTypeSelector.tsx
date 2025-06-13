
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
    <div className="space-y-4">
      {/* Simple Toggle Options */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onTransferTypeChange('international')}
            className={`p-4 rounded-lg border-2 transition-all ${
              transferType === 'international'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                transferType === 'international' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Globe className={`h-4 w-4 ${
                  transferType === 'international' ? 'text-blue-600' : 'text-gray-600'
                }`} />
              </div>
              <div className="text-center">
                <h3 className={`font-medium text-sm ${
                  transferType === 'international' ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  International
                </h3>
                <p className={`text-xs ${
                  transferType === 'international' ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  USD to HTG
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onTransferTypeChange('national')}
            className={`p-4 rounded-lg border-2 transition-all ${
              transferType === 'national'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                transferType === 'national' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <MapPin className={`h-4 w-4 ${
                  transferType === 'national' ? 'text-green-600' : 'text-gray-600'
                }`} />
              </div>
              <div className="text-center">
                <h3 className={`font-medium text-sm ${
                  transferType === 'national' ? 'text-green-900' : 'text-gray-900'
                }`}>
                  National
                </h3>
                <p className={`text-xs ${
                  transferType === 'national' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  HTG to HTG
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferTypeSelector;
