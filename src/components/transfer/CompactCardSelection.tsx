import React from 'react';
import { CreditCard, Building2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompactCardSelectionProps {
  selectedMethod?: string | null;
  onMethodChange: (methodId: string) => void;
}

// PayPal Logo Component using URL
const PayPalLogo = () => (
  <img 
    src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" 
    alt="PayPal"
    className="w-6 h-6 object-contain"
  />
);

// Venmo Logo Component using URL
const VenmoLogo = () => (
  <img 
    src="https://cdn.worldvectorlogo.com/logos/venmo-2.svg" 
    alt="Venmo"
    className="w-6 h-6 object-contain"
  />
);

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, Amex',
    icon: CreditCard,
    bgColor: 'bg-gradient-to-r from-gray-700 to-gray-900',
    textColor: 'text-white',
    processingTime: 'Instant',
    hasSubOptions: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay with PayPal account',
    icon: PayPalLogo,
    bgColor: 'bg-gradient-to-r from-blue-600 to-blue-800',
    textColor: 'text-white',
    processingTime: 'Instant'
  },
  {
    id: 'venmo',
    name: 'Venmo',
    description: 'Quick Venmo payment',
    icon: VenmoLogo,
    bgColor: 'bg-gradient-to-r from-blue-400 to-blue-600',
    textColor: 'text-white',
    processingTime: 'Instant'
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    description: 'Direct bank transfer',
    icon: Building2,
    bgColor: 'bg-gradient-to-r from-green-600 to-green-800',
    textColor: 'text-white',
    processingTime: '1-2 days'
  }
];

const cardLogos = [
  { 
    name: 'Visa', 
    url: 'https://brand.visa.com/content/dam/VCOM/Brand/Brand%20Gateway/visa-blue-logo-800x450.png'
  },
  { 
    name: 'Mastercard', 
    url: 'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_circles_92px_2x.png'
  },
  { 
    name: 'Amex', 
    url: 'https://www.americanexpress.com/content/dam/amex/us/merchant/supplies-tech/american-express-logo-blue-1x1.png'
  }
];

const CompactCardSelection: React.FC<CompactCardSelectionProps> = ({
  selectedMethod,
  onMethodChange
}) => {
  return (
    <div className="space-y-3 max-w-sm mx-auto px-2">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center mb-2">
          <CreditCard className="h-4 w-4 text-gray-600 mr-2" />
          <span className="text-sm font-medium text-gray-700">Payment Method</span>
        </div>
      </div>

      <div className="space-y-2">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            onClick={() => onMethodChange(method.id)}
            className={`
              w-full relative p-3 rounded-lg border-2 transition-all duration-300 text-left
              ${selectedMethod === method.id 
                ? 'border-blue-500 bg-blue-50 shadow-md ring-1 ring-blue-200' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }
            `}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm
                  ${method.bgColor} ${method.textColor}
                `}>
                  {React.createElement(method.icon, { className: "h-5 w-5" })}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate pr-2">
                      {method.name}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {method.processingTime}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mb-2">
                    {method.description}
                  </p>

                  {/* Simplified card logos for mobile */}
                  {method.hasSubOptions && (
                    <div className="flex items-center space-x-1">
                      {cardLogos.slice(0, 3).map((card, index) => (
                        <div key={index} className="bg-white rounded p-1 shadow-sm border w-6 h-4">
                          <img 
                            src={card.url} 
                            alt={card.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">+more</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center ml-2">
                {selectedMethod === method.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-sm mr-2"
                  >
                    <span className="text-white text-xs font-bold">✓</span>
                  </motion.div>
                )}
                <ChevronRight className={`h-4 w-4 transition-colors ${
                  selectedMethod === method.id ? 'text-blue-500' : 'text-gray-400'
                }`} />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="text-center mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-medium text-gray-700">Secure Payment</span>
        </div>
        <p className="text-xs text-gray-500">
          256-bit SSL encryption
        </p>
      </div>
    </div>
  );
};

export default CompactCardSelection;