
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';
import StepThreeTransfer from '@/components/transfer/StepThreeTransfer';

export interface TransferData {
  amount: string;
  receiverDetails: {
    fullName: string;
    phoneNumber: string;
    address: string;
    additionalInfo?: string;
  };
}

interface MultiStepTransferSheetProps {
  onClose: () => void;
}

const MultiStepTransferSheet: React.FC<MultiStepTransferSheetProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [transferData, setTransferData] = useState<TransferData>({
    amount: '',
    receiverDetails: {
      fullName: '',
      phoneNumber: '',
      address: '',
      additionalInfo: '',
    }
  });

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateTransferData = (data: Partial<TransferData>) => {
    setTransferData(prev => ({ ...prev, ...data }));
  };

  const canProceedFromStep1 = transferData.amount && parseFloat(transferData.amount) > 0;
  const canProceedFromStep2 = transferData.receiverDetails.fullName && 
                              transferData.receiverDetails.phoneNumber && 
                              transferData.receiverDetails.address;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <SheetHeader className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <SheetTitle>Send Money to Haiti</SheetTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </SheetHeader>
      
      {/* Step Indicator */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-center mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === currentStep 
                  ? 'bg-blue-600 text-white' 
                  : step < currentStep 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  step < currentStep ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold">
            {currentStep === 1 && 'Enter Amount'}
            {currentStep === 2 && 'Recipient Details'}
            {currentStep === 3 && 'Payment'}
          </h2>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {currentStep === 1 && (
          <StepOneTransfer 
            amount={transferData.amount}
            onAmountChange={(amount) => updateTransferData({ amount })}
          />
        )}
        
        {currentStep === 2 && (
          <StepTwoTransfer 
            receiverDetails={transferData.receiverDetails}
            onDetailsChange={(receiverDetails) => updateTransferData({ receiverDetails })}
          />
        )}
        
        {currentStep === 3 && (
          <StepThreeTransfer amount={transferData.amount} />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="border-t bg-white p-6">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={currentStep === 1 ? onClose : handlePreviousStep}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </Button>
          
          {currentStep < 3 && (
            <Button 
              onClick={handleNextStep}
              disabled={currentStep === 1 ? !canProceedFromStep1 : !canProceedFromStep2}
              className="flex-1"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepTransferSheet;
