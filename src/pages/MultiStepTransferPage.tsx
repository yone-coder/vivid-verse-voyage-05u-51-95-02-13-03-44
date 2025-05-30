
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TransferHeader from '@/components/transfer/TransferHeader';
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

const MultiStepTransferPage: React.FC = () => {
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
    <div className="min-h-screen bg-gray-50">
      <TransferHeader />
      
      {/* Step Indicator */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-center mb-6">
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

        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold">
            {currentStep === 1 && 'Enter Amount'}
            {currentStep === 2 && 'Recipient Details'}
            {currentStep === 3 && 'Payment'}
          </h2>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-md mx-auto px-4 pb-16">
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

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6">
          {currentStep > 1 && (
            <Button 
              variant="outline" 
              onClick={handlePreviousStep}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}
          
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

export default MultiStepTransferPage;
