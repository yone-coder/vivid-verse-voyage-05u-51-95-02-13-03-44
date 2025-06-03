
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, X, ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import StepOneTransfer from './StepOneTransfer';
import StepTwoTransfer from './StepTwoTransfer';
import StepThreeTransfer from './StepThreeTransfer';

export interface TransferData {
  amount: string;
  receiverDetails: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    department: string;
    commune: string;
  };
}

interface MultiStepTransferSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const MultiStepTransferSheet: React.FC<MultiStepTransferSheetProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [transferData, setTransferData] = useState<TransferData>({
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
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateTransferData = (data: Partial<TransferData>) => {
    setTransferData(prev => ({ ...prev, ...data }));
  };

  const canProceedFromStep1 = transferData.amount && parseFloat(transferData.amount) > 0;
  const canProceedFromStep2 = transferData.receiverDetails.firstName && 
                              transferData.receiverDetails.lastName && 
                              transferData.receiverDetails.phoneNumber && 
                              transferData.receiverDetails.commune;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh]">
        <SheetHeader className="flex flex-row items-center justify-between pb-4">
          <button onClick={handlePreviousStep} className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>
          <SheetTitle>
            {currentStep === 1 && 'Enter Amount'}
            {currentStep === 2 && 'Recipient Details'}
            {currentStep === 3 && 'Payment'}
          </SheetTitle>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </SheetHeader>

        {/* Step Indicator */}
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

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto pb-20">
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

        {/* Sticky Navigation Buttons - Hidden in step 3 */}
        {currentStep < 3 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handlePreviousStep}
                className="flex-1"
                disabled={currentStep === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <Button 
                onClick={handleNextStep}
                disabled={currentStep === 1 ? !canProceedFromStep1 : !canProceedFromStep2}
                className="flex-1"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MultiStepTransferSheet;
