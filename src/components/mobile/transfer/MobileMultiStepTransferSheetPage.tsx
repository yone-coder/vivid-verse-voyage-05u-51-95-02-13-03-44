
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransferHeroBanner from '@/components/transfer/TransferHeroBanner';
import MultiStepTransferSheet from '@/components/transfer/MultiStepTransferSheet';
import BottomNav from '@/components/layout/IndexBottomNav';

const MobileMultiStepTransferSheetPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [transferData, setTransferData] = useState({
    amount: '',
    selectedMethod: null,
    transferType: 'international' as 'international' | 'national'
  });

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setCurrentStep(1);
  };

  const handleContinue = () => {
    if (!isSheetOpen) {
      handleOpenSheet();
    }
  };

  // Determine if continue button should be shown and enabled
  const showContinueButton = !isSheetOpen;
  const continueButtonDisabled = false; // Always enabled for opening the sheet

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Banner */}
      <TransferHeroBanner onStartTransfer={handleOpenSheet} />
      
      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Send Money to Haiti
          </h2>
          <p className="text-gray-600">
            Fast, secure, and reliable money transfers to Haiti. 
            Get started by tapping the continue button below.
          </p>
        </div>
      </div>

      {/* Multi-step Transfer Sheet */}
      <MultiStepTransferSheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        transferData={transferData}
        onTransferDataChange={setTransferData}
      />

      {/* Bottom Navigation with Continue Button */}
      <BottomNav 
        showContinueButton={showContinueButton}
        onContinueClick={handleContinue}
        continueButtonText="Start Transfer"
        continueButtonDisabled={continueButtonDisabled}
      />
    </div>
  );
};

export default MobileMultiStepTransferSheetPage;
