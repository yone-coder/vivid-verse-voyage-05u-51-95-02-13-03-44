
import React from 'react';
import { CreditCard, Wallet, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompactCardSelectionProps {
  selectedMethod?: string | null;
  onMethodChange: (methodId: string) => void;
}

const paymentMethods = [
  {
    id: 'card',
    name: 'Card',
    icon: CreditCard,
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
    hasSubOptions: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🅿️',
    bgColor: 'bg-blue-600',
    textColor: 'text-white'
  },
  {
    id: 'venmo',
    name: 'Venmo',
    icon: '💙',
    bgColor: 'bg-blue-400',
    textColor: 'text-white'
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    icon: Building2,
    bgColor: 'bg-green-600',
    textColor: 'text-white'
  }
];

const cardLogos = [
  { name: 'Visa', emoji: '💳', color: 'text-blue-600' },
  { name: 'Mastercard', emoji: '💳', color: 'text-red-600' },
  { name: 'Amex', emoji: '💳', color: 'text-green-600' },
  { name: 'Discover', emoji: '💳', color: 'text-orange-600' }
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
      
      <div className="grid grid-cols-2 gap-3">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            onClick={() => onMethodChange(method.id)}
            className={`
              relative p-4 rounded-lg border-2 transition-all duration-200
              ${selectedMethod === method.id 
                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`
                w-10 h-10 rounded-md flex items-center justify-center text-lg
                ${method.bgColor} ${method.textColor}
              `}>
                {typeof method.icon === 'string' ? (
                  method.icon
                ) : (
                  <method.icon className="h-5 w-5" />
                )}
              </div>
              
              <span className="text-sm font-medium text-gray-700 text-center">
                {method.name}
              </span>
              
              {/* Show card logos horizontally for the card option */}
              {method.hasSubOptions && (
                <div className="flex items-center space-x-1 mt-1">
                  {cardLogos.map((card, index) => (
                    <div key={index} className={`text-xs ${card.color}`}>
                      {card.emoji}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {selectedMethod === method.id && (
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
