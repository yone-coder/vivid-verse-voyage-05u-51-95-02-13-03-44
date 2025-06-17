
import React from 'react';
import { Home, Send, Clock, MapPin, User, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { TransferData } from '@/pages/MobileMultiStepTransferSheetPage';

interface IndexBottomNavProps {
  showContinueButton?: boolean;
  currentStep?: number;
  canProceed?: boolean;
  onContinue?: () => void;
  onPrevious?: () => void;
  isPaymentLoading?: boolean;
  transferData?: TransferData;
  isPaymentFormValid?: boolean;
}

const IndexBottomNav: React.FC<IndexBottomNavProps> = ({
  showContinueButton = false,
  currentStep = 1,
  canProceed = false,
  onContinue,
  onPrevious,
  isPaymentLoading = false,
  transferData,
  isPaymentFormValid = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/for-you' },
    { id: 'send', label: 'Send', icon: Send, path: '/send' },
    { id: 'history', label: 'History', icon: Clock, path: '/transfer-history' },
    { id: 'locations', label: 'Locations', icon: MapPin, path: '/locations' },
    { id: 'account', label: 'Account', icon: User, path: '/account' }
  ];

  const getActiveTab = () => {
    if (location.pathname === '/for-you') return 'home';
    if (location.pathname === '/send') return 'send';
    if (location.pathname === '/transfer-history') return 'history';
    if (location.pathname === '/locations') return 'locations';
    if (location.pathname === '/account') return 'account';
    return '';
  };

  const activeTab = getActiveTab();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const shouldShowContinueButton = showContinueButton && location.pathname === '/send';

  // Determine if we can proceed based on step and validation
  const canActuallyProceed = () => {
    if (currentStep === 6) {
      return transferData?.transferType === 'national' ? true : isPaymentFormValid;
    }
    return canProceed;
  };

  const getButtonText = () => {
    if (currentStep === 6) {
      return 'Complete Payment';
    }
    return 'Next';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      {shouldShowContinueButton ? (
        // Transfer flow navigation
        <div className="flex items-center justify-between px-4 py-3">
          {/* Back button - subtle chevron with round background */}
          <button
            onClick={onPrevious}
            disabled={currentStep === 1}
            className={`
              flex items-center justify-center w-10 h-10 rounded-full transition-all
              ${currentStep === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
              }
            `}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Next/Continue button */}
          <Button
            onClick={onContinue}
            disabled={!canActuallyProceed() || isPaymentLoading}
            className="h-12 px-8 text-base font-medium"
          >
            {getButtonText()}
          </Button>
        </div>
      ) : (
        // Regular bottom navigation
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IndexBottomNav;
