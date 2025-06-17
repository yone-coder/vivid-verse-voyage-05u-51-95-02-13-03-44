import React from 'react';
import { Globe, Search } from 'lucide-react';
import LanguageSelector from '@/components/common/LanguageSelector';

const TransferHeader: React.FC = () => {
  return (
    <header className="bg-blue-600 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-xl font-semibold text-white tracking-wide">
            GLOBAL TRANSFÈ
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <LanguageSelector variant="compact" />
          <button 
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TransferHeader;