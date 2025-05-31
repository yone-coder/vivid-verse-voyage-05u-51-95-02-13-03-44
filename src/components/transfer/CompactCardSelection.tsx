
import React from 'react';
import { CreditCard, Wallet, Building2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompactCardSelectionProps {
  selectedMethod?: string | null;
  onMethodChange: (methodId: string) => void;
}

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit or Debit Card',
    description: 'Visa, Mastercard, Amex, Discover',
    icon: CreditCard,
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
    processingTime: 'Instant',
    hasSubOptions: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay with your PayPal account',
    icon: '🅿️',
    bgColor: 'bg-blue-600',
    textColor: 'text-white',
    processingTime: 'Instant'
  },
  {
    id: 'venmo',
    name: 'Venmo',
    description: 'Quick payment with Venmo',
    icon: '💙',
    bgColor: 'bg-blue-400',
    textColor: 'text-white',
    processingTime: 'Instant'
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    description: 'Direct transfer from your bank account',
    icon: Building2,
    bgColor: 'bg-green-600',
    textColor: 'text-white',
    processingTime: '1-2 business days'
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
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <CreditCard className="h-5 w-5 text-gray-600 mr-2" />
          <span className="text-sm font-medium text-gray-700">Select Payment Method</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            onClick={() => onMethodChange(method.id)}
            className={`
              w-full relative p-4 rounded-lg border-2 transition-all duration-200 text-left
              ${selectedMethod === method.id 
                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center text-lg flex-shrink-0
                  ${method.bgColor} ${method.textColor}
                `}>
                  {typeof method.icon === 'string' ? (
                    method.icon
                  ) : (
                    <method.icon className="h-6 w-6" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {method.name}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2">
                      {method.processingTime}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 mt-1">
                    {method.description}
                  </p>
                  
                  {/* Show card logos for the card option */}
                  {method.hasSubOptions && (
                    <div className="flex items-center space-x-2 mt-2">
                      {cardLogos.map((card, index) => (
                        <div key={index} className={`text-sm ${card.color}`}>
                          {card.emoji}
                        </div>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">and more</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {selectedMethod === method.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                )}
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          All payments are secured with 256-bit SSL encryption
        </p>
      </div>
    </div>
  );
};

export default CompactCardSelection;
