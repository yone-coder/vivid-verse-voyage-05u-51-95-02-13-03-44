
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import TransferHeader from '@/components/transfer/TransferHeader';
import TransferTypeSelector from '@/components/transfer/TransferTypeSelector';
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';
import StepThreeTransfer from '@/components/transfer/StepThreeTransfer';

export interface TransferData {
  transferType?: 'international' | 'national';
  amount: string;
  receiverDetails: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    department: string;
    commune: string;
  };
}

const MultiStepTransferPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [transferData, setTransferData] = useState<TransferData>({
    transferType: undefined,
    amount: '',
    receiverDetails: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      department: 'Artibonite',
      commune: '',
    }
  });

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/transfer');
    }
  };

  const updateTransferData = (data: Partial<TransferData>) => {
    setTransferData(prev => ({ ...prev, ...data }));
  };

  const canProceedFromStep0 = transferData.transferType !== undefined;
  const canProceedFromStep1 = transferData.amount && parseFloat(transferData.amount) > 0;
  const canProceedFromStep2 = transferData.receiverDetails.firstName && 
                              transferData.receiverDetails.lastName && 
                              transferData.receiverDetails.phoneNumber && 
                              transferData.receiverDetails.commune;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TransferHeader />
      
      {/* Step Indicator */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-center mb-6">
          {[0, 1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === currentStep 
                  ? 'bg-blue-600 text-white' 
                  : step < currentStep 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
              }`}>
                {step + 1}
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
            {currentStep === 0 && 'Transfer Type'}
            {currentStep === 1 && 'Enter Amount'}
            {currentStep === 2 && 'Recipient Details'}
            {currentStep === 3 && 'Payment'}
          </h2>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-md mx-auto px-4">
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-gray-600">Choose your transfer type</p>
            </div>
            <TransferTypeSelector 
              transferType={transferData.transferType || 'international'}
              onTransferTypeChange={(type) => updateTransferData({ transferType: type })}
            />
          </div>
        )}

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
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Payment Details</h3>
              <p className="text-gray-600">
                {transferData.transferType === 'national' 
                  ? `Complete your HTG ${(parseFloat(transferData.amount || '0') * 127.5).toFixed(2)} transfer`
                  : `Complete your $${transferData.amount} transfer`
                }
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Recipient:</span>
                <span className="font-medium">
                  {transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">
                  {transferData.transferType === 'national' 
                    ? `HTG ${(parseFloat(transferData.amount || '0') * 127.5).toFixed(2)}`
                    : `$${transferData.amount}`
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transfer Type:</span>
                <span className="font-medium capitalize">
                  {transferData.transferType}
                </span>
              </div>
            </div>
            
            <StepThreeTransfer 
              amount={transferData.amount}
              onPaymentSuccess={() => {
                console.log('Payment successful for', transferData.transferType, 'transfer');
                // Handle payment success
              }}
            />
          </div>
        )}
      </div>

      {/* Sticky Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto flex gap-3">
          <Button 
            variant="outline" 
            onClick={handlePreviousStep}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentStep === 0 ? 'Back to Home' : 'Previous'}
          </Button>
          
          {currentStep < 3 && (
            <Button 
              onClick={handleNextStep}
              disabled={
                (currentStep === 0 && !canProceedFromStep0) ||
                (currentStep === 1 && !canProceedFromStep1) || 
                (currentStep === 2 && !canProceedFromStep2)
              }
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
