
import React from 'react';
import { Globe, Banknote } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TransferTypeSelectorProps {
  transferType: 'international' | 'national';
  onTransferTypeChange: (value: 'international' | 'national') => void;
}

const TransferTypeSelector: React.FC<TransferTypeSelectorProps> = ({ transferType, onTransferTypeChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTransferTypeChange = (value: 'international' | 'national') => {
    onTransferTypeChange(value);
    
    // Navigate to appropriate route based on transfer type
    if (value === 'national' && location.pathname !== '/local-transfer') {
      navigate('/local-transfer');
    } else if (value === 'international' && location.pathname === '/local-transfer') {
      navigate('/multi-step-transfer-page');
    }
  };

  return (
    <div className="mb-4">
      {/* Classic Underline Tab Style */}
      <div className="w-full border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => handleTransferTypeChange('international')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              transferType === 'international'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Globe size={16} />
            <span>International (USD)</span>
          </button>
          
          <button
            onClick={() => handleTransferTypeChange('national')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              transferType === 'national'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Banknote size={16} />
            <span>National (HTG)</span>
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="mt-4">
        {transferType === 'international' && (
          <p className="text-sm text-gray-600">
            Send money internationally to Haiti in US Dollars from anywhere in the world.
          </p>
        )}
        
        {transferType === 'national' && (
          <p className="text-sm text-gray-600">
            Transfer money locally within Haiti using Haitian Gourdes.
          </p>
        )}
      </div>
    </div>
  );
};

export default TransferTypeSelector;
