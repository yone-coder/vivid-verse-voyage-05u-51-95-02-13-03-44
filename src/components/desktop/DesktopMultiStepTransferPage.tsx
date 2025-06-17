
import React, { useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DesktopTransferProcess from "@/components/desktop/DesktopTransferProcess";
import DesktopSidebarSections from "@/components/desktop/DesktopSidebarSections";
import TrackTransferSection from "@/components/transfer/TrackTransferSection";
import html2canvas from 'html2canvas';

export interface TransferData {
  transferType?: 'international' | 'national';
  amount: string;
  receiverDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    address: string;
  };
  paymentMethod?: string;
}

const DesktopMultiStepTransferPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isPaymentFormValid, setIsPaymentFormValid] = useState(false);
  const [transactionId] = useState(`TXN${Date.now()}`);
  const [userEmail] = useState('user@example.com');
  const receiptRef = useRef<HTMLDivElement>(null);

  const [transferData, setTransferData] = useState<TransferData>({
    transferType: 'international',
    amount: '',
    receiverDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      address: ''
    }
  });

  const updateTransferData = (data: Partial<TransferData>) => {
    setTransferData(prev => ({ ...prev, ...data }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onPaymentSubmit = async () => {
    setIsPaymentLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsPaymentLoading(false);
      setCurrentStep(4);
    }, 3000);
  };

  const generateReceiptImage = async () => {
    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current);
        const link = document.createElement('a');
        link.download = `receipt-${transactionId}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error generating receipt image:', error);
      }
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return transferData.amount && parseFloat(transferData.amount) > 0;
      case 2:
        return transferData.receiverDetails.firstName && 
               transferData.receiverDetails.lastName && 
               transferData.receiverDetails.email;
      case 3:
        return isPaymentFormValid;
      default:
        return true;
    }
  };

  if (isMobile) {
    return null; // This component is only for desktop
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Transfer Form and Track Transfer */}
          <div className="lg:col-span-2 space-y-8">
            <DesktopTransferProcess
              currentStep={currentStep}
              transferData={transferData}
              updateTransferData={updateTransferData}
              onPaymentSubmit={onPaymentSubmit}
              isPaymentLoading={isPaymentLoading}
              isPaymentFormValid={isPaymentFormValid}
              setIsPaymentFormValid={setIsPaymentFormValid}
              transactionId={transactionId}
              userEmail={userEmail}
              receiptRef={receiptRef}
              generateReceiptImage={generateReceiptImage}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
              canProceed={canProceed()}
            />
            <TrackTransferSection />
          </div>
          
          {/* Right Column - Sidebar Sections */}
          <div className="lg:col-span-1">
            <DesktopSidebarSections />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopMultiStepTransferPage;
