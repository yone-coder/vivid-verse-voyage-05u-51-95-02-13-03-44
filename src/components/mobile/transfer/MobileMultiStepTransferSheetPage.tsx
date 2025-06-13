
import React from 'react';
import { Search } from 'lucide-react';
import MultiStepTransferSheetPage from '@/pages/MultiStepTransferSheetPage';

const MobileMultiStepTransferSheetPage: React.FC = () => {
  return (
    <div className="mobile-transfer-container">
      {/* Mobile-specific header override */}
      <div className="bg-blue-600 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4 h-14">
          {/* Left: Logo placeholder */}
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xs">GT</span>
          </div>
          
          {/* Center: GLOBAL TRANSFÈ text */}
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-semibold text-white">
              GLOBAL TRANSFÈ
            </h1>
          </div>
          
          {/* Right: Search icon */}
          <button className="p-2 rounded-full hover:bg-blue-700 text-white">
            <Search size={20} />
          </button>
        </div>
      </div>
      
      {/* Use the main transfer page but hide its header */}
      <div className="mobile-transfer-content">
        <style>{`
          .mobile-transfer-container .bg-blue-600:not(.mobile-transfer-container > .bg-blue-600) {
            display: none !important;
          }
        `}</style>
        <MultiStepTransferSheetPage />
      </div>
    </div>
  );
};

export default MobileMultiStepTransferSheetPage;
