
import React from 'react';
import { CreditCard, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompactCardSelectionProps {
  selectedMethod?: string | null;
  onMethodChange: (methodId: string) => void;
}

const cardTypes = [
  {
    id: 'visa',
    name: 'Visa',
    icon: '💳',
    bgColor: 'bg-blue-500',
    textColor: 'text-white'
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    icon: '💳',
    bgColor: 'bg-red-500',
    textColor: 'text-white'
  },
  {
    id: 'amex',
    name: 'American Express',
    icon: '💳',
    bgColor: 'bg-green-600',
    textColor: 'text-white'
  },
  {
    id: 'discover',
    name: 'Discover',
    icon: '💳',
    bgColor: 'bg-orange-500',
    textColor: 'text-white'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🅿️',
    bgColor: 'bg-blue-600',
    textColor: 'text-white'
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: '🍎',
    bgColor: 'bg-black',
    textColor: 'text-white'
  }
];

const CompactCardSelection: React.FC<CompactCardSelectionProps> = ({
  selectedMethod,
  onMethodChange
}) => {
  return (
    <div className="space-y-3">
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <CreditCard className="h-5 w-5 text-gray-600 mr-2" />
          <span className="text-sm font-medium text-gray-700">Select Payment Method</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {cardTypes.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => onMethodChange(card.id)}
            className={`
              relative p-3 rounded-lg border-2 transition-all duration-200
              ${selectedMethod === card.id 
                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col items-center space-y-1">
              <div className={`
                w-8 h-8 rounded-md flex items-center justify-center text-lg
                ${card.bgColor} ${card.textColor}
              `}>
                {card.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">
                {card.name}
              </span>
            </div>
            
            {selectedMethod === card.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-xs">✓</span>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
      
      <div className="text-center mt-3">
        <p className="text-xs text-gray-500">
          All payments are secured with 256-bit SSL encryption
        </p>
      </div>
    </div>
  );
};

export default CompactCardSelection;
