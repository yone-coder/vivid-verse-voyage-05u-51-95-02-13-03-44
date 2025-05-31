import React from 'react';
import { CreditCard, Building2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompactCardSelectionProps {
  selectedMethod?: string | null;
  onMethodChange: (methodId: string) => void;
}

// PayPal Logo SVG Component
const PayPalLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#003087" d="M8.1 21.7H5.2c-.3 0-.5-.2-.4-.5L7.1 7.8c0-.2.2-.4.4-.4h4.3c2.9 0 4.8 1.4 4.4 4.3-.5 3.5-2.9 5.4-6.2 5.4H8.5l-.4 4.6z"/>
    <path fill="#009cde" d="M12.2 7.4h-1.8c-.2 0-.4.2-.4.4l-1.1 8.4h1.5c2.5 0 4.5-1.5 4.9-4.2.4-2.4-.7-4.6-3.1-4.6z"/>
    <path fill="#012169" d="M16.8 7.1c-.4 2.6-2.1 4.2-4.6 4.2h-1.5l-.7 4.2c0 .2.1.3.3.3h2.2c.2 0 .4-.1.4-.3l.6-4.4h1.2c2.9 0 4.8-1.8 5.2-4.8.3-2.1-.4-3.8-2.1-4.4-.3.7-.7 1.2-1 1.2z"/>
  </svg>
);

// Venmo Logo SVG Component
const VenmoLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <rect width="24" height="24" rx="4" fill="#3D95CE"/>
    <path fill="white" d="M18.5 5.5c.8 1.2 1.2 2.6 1.2 4.2 0 4.8-4.2 10.8-7.8 10.8h-3l-2.4-15h3.8l1.2 11.2c1.8-2.4 3.2-5.8 3.2-8.2 0-1-.2-1.8-.6-2.4l3.4-.6z"/>
  </svg>
);

// Visa Logo SVG Component
const VisaLogo = () => (
  <svg viewBox="0 0 48 24" className="w-8 h-5">
    <rect width="48" height="24" rx="4" fill="#1A1F71"/>
    <path fill="white" d="M18.5 8.5l-2.8 7h-2.4l-1.4-5.4c-.1-.4-.2-.5-.5-.7-.5-.3-1.3-.6-2-.8l.05-.1h3.5c.4 0 .8.3.9.7l.8 4.2 2-4.9h2.75zm7.35 4.7c.01-1.8-2.5-1.9-2.48-2.7.01-.24.23-.5.72-.56.24-.03.9-.05 1.65.29l.29-1.35c-.4-.15-1-.3-1.7-.3-1.8 0-3.06 1-3.07 2.4-.01 1.05.94 1.64 1.65 1.99.73.36 .98.59.98 .91-.01.49-.59.71-1.13.72-.95.01-1.5-.26-1.94-.46l-.34 1.59c.44.2 1.26.37 2.1.38 1.91 0 3.16-.94 3.17-2.4zm4.84 2.3h2.4l-2.1-7h-2.2c-.5 0-.9.3-1.1.7l-3.9 6.3h2.75l.55-1.5h3.35l.26 1.5zm-2.92-2.4l1.37-3.8.32 3.8h-1.69zm-8.55-4.6l-2.17 7h-2.62l2.17-7h2.62z"/>
  </svg>
);

// Mastercard Logo SVG Component
const MastercardLogo = () => (
  <svg viewBox="0 0 48 24" className="w-8 h-5">
    <rect width="48" height="24" rx="4" fill="#000"/>
    <circle cx="18" cy="12" r="6" fill="#EB001B"/>
    <circle cx="30" cy="12" r="6" fill="#F79E1B"/>
    <path fill="#FF5F00" d="M24 7.2c1.05.96 1.8 2.31 1.8 3.8s-.75 2.84-1.8 3.8c-1.05-.96-1.8-2.31-1.8-3.8s.75-2.84 1.8-3.8z"/>
  </svg>
);

// American Express Logo SVG Component
const AmexLogo = () => (
  <svg viewBox="0 0 48 24" className="w-8 h-5">
    <rect width="48" height="24" rx="4" fill="#006FCF"/>
    <path fill="white" d="M6.5 8.5h4l.8 1.8.8-1.8h4v.6l3.2 4.4v-5h3.8l.6 1.4.6-1.4H28l1.4 3.2v-3.2h4.2l.8 2 .8-2h4v7h-3.4l-.8-1.8-.8 1.8h-4.8v-1.4l-.4 1.4h-2.4l-.4-1.4v1.4H15.2l-.8-1.8-.8 1.8H9.8l-1.4-3.2v3.2H6.5v-7zm2.2 1.2v4.6h1.2l1.2-2.8 1.2 2.8h1.2V9.7h-.8v3.4L11.5 10h-.8v3.1L9.5 10H8.7v4.6z"/>
  </svg>
);

// Discover Logo SVG Component
const DiscoverLogo = () => (
  <svg viewBox="0 0 48 24" className="w-8 h-5">
    <rect width="48" height="24" rx="4" fill="#FF6000"/>
    <path fill="white" d="M8 9h3.2c1.4 0 2.4 1 2.4 2.4v.2c0 1.4-1 2.4-2.4 2.4H8V9zm1.2 1v3h2c.7 0 1.2-.5 1.2-1.2v-.6c0-.7-.5-1.2-1.2-1.2h-2zm5.8 0v4h1.2v-4H15zm2 0v4h1.2v-1.6h.8l.8 1.6h1.4l-1-1.8c.6-.2 1-.8 1-1.4 0-.8-.6-1.4-1.4-1.4h-2.8v.6zm1.2.8h1.4c.3 0 .6.3.6.6s-.3.6-.6.6h-1.4v-1.2zm4.8-.8c-1.1 0-2 .9-2 2s.9 2 2 2c.6 0 1.1-.3 1.4-.7l-.8-.6c-.2.2-.4.3-.6.3-.5 0-.8-.4-.8-.8h2.4c0-.1 0-.2 0-.2 0-1.1-.9-2-2-2zm0 .8c.4 0 .7.3.8.6h-1.6c.1-.3.4-.6.8-.6zm3.2-.8v1.6c0 .4.3.8.8.8s.8-.4.8-.8v-1.6h-1.2v1.6c0 .1-.1.2-.2.2s-.2-.1-.2-.2v-1.6h-1.2zm3.6 0l.8 2.8.8-2.8h1.2l-1.4 4h-1.2l-1.4-4h1.2zm3.6 0v4h2.8v-.8h-1.6v-.8h1.4v-.8h-1.4v-.8h1.6V10h-2.8zm4 0v1.6c0 1.1.9 2 2 2h.4v-.8h-.4c-.7 0-1.2-.5-1.2-1.2V10h-1.2z"/>
  </svg>
);

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit or Debit Card',
    description: 'Visa, Mastercard, Amex, Discover',
    icon: CreditCard,
    bgColor: 'bg-gradient-to-r from-gray-700 to-gray-900',
    textColor: 'text-white',
    processingTime: 'Instant',
    hasSubOptions: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay with your PayPal account',
    icon: PayPalLogo,
    bgColor: 'bg-gradient-to-r from-blue-600 to-blue-800',
    textColor: 'text-white',
    processingTime: 'Instant'
  },
  {
    id: 'venmo',
    name: 'Venmo',
    description: 'Quick payment with Venmo',
    icon: VenmoLogo,
    bgColor: 'bg-gradient-to-r from-blue-400 to-blue-600',
    textColor: 'text-white',
    processingTime: 'Instant'
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    description: 'Direct transfer from your bank account',
    icon: Building2,
    bgColor: 'bg-gradient-to-r from-green-600 to-green-800',
    textColor: 'text-white',
    processingTime: '1-2 business days'
  }
];

const cardLogos = [
  { name: 'Visa', component: VisaLogo },
  { name: 'Mastercard', component: MastercardLogo },
  { name: 'Amex', component: AmexLogo },
  { name: 'Discover', component: DiscoverLogo }
];

const CompactCardSelection: React.FC<CompactCardSelectionProps> = ({
  selectedMethod,
  onMethodChange
}) => {
  return (
    <div className="space-y-4 max-w-md mx-auto">
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
              w-full relative p-4 rounded-xl border-2 transition-all duration-300 text-left
              ${selectedMethod === method.id 
                ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }
            `}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`
                  w-14 h-14 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-lg
                  ${method.bgColor} ${method.textColor}
                `}>
                  {React.createElement(method.icon, { className: "h-7 w-7" })}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {method.name}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2 bg-gray-100 px-2 py-1 rounded-full">
                      {method.processingTime}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mt-1">
                    {method.description}
                  </p>

                  {/* Show card logos for the card option */}
                  {method.hasSubOptions && (
                    <div className="flex items-center space-x-3 mt-3">
                      {cardLogos.map((card, index) => (
                        <div key={index} className="bg-white rounded-md p-1 shadow-sm border">
                          <card.component />
                        </div>
                      ))}
                      <span className="text-xs text-gray-500 ml-1 font-medium">+more</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {selectedMethod === method.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-sm font-bold">✓</span>
                  </motion.div>
                )}
                <ChevronRight className={`h-5 w-5 transition-colors ${
                  selectedMethod === method.id ? 'text-blue-500' : 'text-gray-400'
                }`} />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="text-center mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-medium text-gray-700">Secure Payment</span>
        </div>
        <p className="text-xs text-gray-500">
          All payments are secured with 256-bit SSL encryption
        </p>
      </div>
    </div>
  );
};



export default Demo;