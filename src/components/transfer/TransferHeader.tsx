import React from 'react';
import { Globe, Search, ChevronRight, Bell } from 'lucide-react';

const TransferHeader: React.FC = () => {
  const exchangeRates = [
    { from: 'USD', to: 'EUR', rate: '0.92' },
    { from: 'USD', to: 'GBP', rate: '0.79' },
    { from: 'USD', to: 'JPY', rate: '148.5' },
    { from: 'EUR', to: 'GBP', rate: '0.86' },
    { from: 'USD', to: 'CAD', rate: '1.35' }
  ];

  return (
    <>
      <header className="bg-blue-600 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="flex items-center bg-white/10 rounded-md px-2 py-1 hover:bg-white/20 transition-colors cursor-pointer">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-500 via-white to-blue-500 mr-2"></div>
              <span className="text-white text-xs font-medium">EN</span>
              <ChevronRight className="w-3 h-3 text-white/70 ml-1" />
            </div>
            
            <button 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <button 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Exchange Rates News Band */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-semibold text-gray-700 mr-3">Live Rates:</span>
            <div className="flex items-center space-x-6 overflow-x-auto">
              {exchangeRates.map((rate, index) => (
                <div key={index} className="flex items-center space-x-1 whitespace-nowrap">
                  <span className="text-sm text-gray-600">{rate.from}/{rate.to}</span>
                  <span className="text-sm font-medium text-green-600">{rate.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferHeader;