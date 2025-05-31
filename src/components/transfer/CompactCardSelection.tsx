
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
    logoUrl: 'https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png',
    bgColor: 'bg-blue-600',
    textColor: 'text-white',
    processingTime: 'Instant'
  },
  {
    id: 'venmo',
    name: 'Venmo',
    description: 'Quick payment with Venmo',
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/venmo-2.svg',
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
  { 
    name: 'Visa', 
    logoUrl: 'https://usa.visa.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg',
    color: 'text-blue-600' 
  },
  { 
    name: 'Mastercard', 
    logoUrl: 'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png',
    color: 'text-red-600' 
  },
  { 
    name: 'Amex', 
    logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/American-Express-Logo.png',
    color: 'text-green-600' 
  },
  { 
    name: 'Discover', 
    logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/Discover-Logo.png',
    color: 'text-orange-600' 
  }
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
                  {method.logoUrl ? (
                    <img 
                      src={method.logoUrl} 
                      alt={method.name}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        // Fallback to icon if logo fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : (
                    <method.icon className="h-6 w-6" />
                  )}
                  {method.logoUrl && (
                    <method.icon className="h-6 w-6 hidden" />
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
                        <div key={index} className="w-6 h-4 flex items-center justify-center">
                          <img 
                            src={card.logoUrl} 
                            alt={card.name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              // Fallback to text if logo fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="text-xs ${card.color}">${card.name}</span>`;
                              }
                            }}
                          />
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
