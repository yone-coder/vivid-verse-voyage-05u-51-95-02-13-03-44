
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TransferTypeSelectorProps {
  transferType: 'international' | 'national';
  onTransferTypeChange: (value: 'international' | 'national') => void;
  disableNavigation?: boolean;
}

const TransferTypeSelector: React.FC<TransferTypeSelectorProps> = ({ 
  transferType, 
  onTransferTypeChange,
  disableNavigation = false 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTransferTypeChange = (value: 'international' | 'national') => {
    onTransferTypeChange(value);
    
    // Only navigate if navigation is not disabled
    if (!disableNavigation) {
      // Navigate to appropriate route based on transfer type
      if (value === 'national' && location.pathname !== '/local-transfer') {
        navigate('/local-transfer');
      } else if (value === 'international' && location.pathname === '/local-transfer') {
        navigate('/multi-step-transfer-page');
      }
    }
  };

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {/* Classic Underline Tab Style - Full Width */}
      <div className="w-full border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => handleTransferTypeChange('international')}
            className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              transferType === 'international'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span>International</span>
          </button>
          
          <button
            onClick={() => handleTransferTypeChange('national')}
            className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              transferType === 'national'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span>National</span>
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="mt-3 px-4">
        {transferType === 'international' && (
          <p className="text-xs text-gray-600 text-center">
            Send money internationally to Haiti from anywhere in the world.
          </p>
        )}
        
        {transferType === 'national' && (
          <p className="text-xs text-gray-600 text-center">
            Transfer money locally within Haiti.
          </p>
        )}
      </div>
    </div>
  );
};

export default TransferTypeSelector;
