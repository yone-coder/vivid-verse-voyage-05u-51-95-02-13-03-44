
import React from 'react';
import { ArrowRight, PhoneCall, Tv } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const SpaceSavingCategories = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Transfer Money shortcut component with device-aware navigation
  const TransferShortcut = () => {
    const handleTransferClick = () => {
      if (isMobile) {
        navigate('/multi-step-transfer-page');
      } else {
        navigate('/multi-step-transfer-desktop');
      }
    };

    return (
      <div 
        className="flex flex-col items-center w-16 flex-shrink-0 active:opacity-80 transition-opacity touch-manipulation"
        onClick={handleTransferClick}
      >
        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-green-100 shadow-sm flex items-center justify-center">
          <img 
            src="/lovable-uploads/45eddf56-11aa-4191-b09a-dc6ebfe3e7cc.png"
            alt="Global Transfer"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full">
            <div className="flex items-center justify-center w-full px-1 py-0.5 text-[7px] font-bold bg-green-600/90 text-white">
              TRANSFER
            </div>
          </div>
        </div>
        <span className="text-[10px] font-medium text-gray-700 text-center truncate w-full leading-snug mt-0.5">
          Transfer Money
        </span>
      </div>
    );
  };
  
  // Top Up shortcut component with navigation
  const TopUpShortcut = () => (
    <div 
      className="flex flex-col items-center w-16 flex-shrink-0 active:opacity-80 transition-opacity touch-manipulation"
      onClick={() => navigate('/topup')}
    >
      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-blue-100 shadow-sm flex items-center justify-center">
        <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
          <PhoneCall className="h-6 w-6 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full">
          <div className="flex items-center justify-center w-full px-1 py-0.5 text-[7px] font-bold bg-blue-600/90 text-white">
            TOP UP
          </div>
        </div>
      </div>
      <span className="text-[10px] font-medium text-gray-700 text-center truncate w-full leading-snug mt-0.5">
        Top Up
      </span>
    </div>
  );

  // Netflix shortcut component with navigation
  const NetflixShortcut = () => (
    <div 
      className="flex flex-col items-center w-16 flex-shrink-0 active:opacity-80 transition-opacity touch-manipulation"
      onClick={() => navigate('/netflix')}
    >
      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-red-100 shadow-sm flex items-center justify-center">
        <div className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center">
          <Tv className="h-6 w-6 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full">
          <div className="flex items-center justify-center w-full px-1 py-0.5 text-[7px] font-bold bg-red-700/90 text-white">
            NETFLIX
          </div>
        </div>
      </div>
      <span className="text-[10px] font-medium text-gray-700 text-center truncate w-full leading-snug mt-0.5">
        Netflix
      </span>
    </div>
  );

  return (
    <div className="w-full bg-white">
      <div className="py-3 bg-white">
        <div className="flex justify-center space-x-4 px-4">
          <TransferShortcut />
          <TopUpShortcut />
          <NetflixShortcut />
        </div>
      </div>
    </div>
  );
};

export default SpaceSavingCategories;
