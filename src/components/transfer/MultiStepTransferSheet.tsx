
import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowLeft, X, GripHorizontal } from 'lucide-react';
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

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ y: 0, height: 0 });
  const [panelHeight, setPanelHeight] = useState(80);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const currentHeight = panelRef.current?.offsetHeight || 0;
    setDragStart({ y: clientY, height: (currentHeight / window.innerHeight) * 100 });
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = dragStart.y - clientY;
    const deltaPercent = (deltaY / window.innerHeight) * 100;
    const newHeight = Math.min(90, Math.max(40, dragStart.height + deltaPercent));
    
    setPanelHeight(newHeight);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleDragMove(e);
      const handleTouchMove = (e: TouchEvent) => handleDragMove(e);
      const handleMouseUp = () => handleDragEnd();
      const handleTouchEnd = () => handleDragEnd();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragStart]);

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

  const stepLabels = ['Amount', 'Recipient', 'Payment'];

  return (
    <div 
      ref={panelRef}
      className="flex flex-col h-full"
      style={{ height: `${panelHeight}vh` }}
    >
      {/* Drag Handle */}
      <div 
        className="flex justify-center py-2 cursor-grab active:cursor-grabbing bg-gray-50 rounded-t-lg"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <GripHorizontal className="h-5 w-5 text-gray-400" />
      </div>

      {/* Header */}
      <SheetHeader className="px-6 py-3 border-b">
        <div className="flex items-center justify-between">
          <SheetTitle className="text-lg">Send Money to Haiti</SheetTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </SheetHeader>
      
      {/* Compact Step Indicator */}
      <div className="px-6 py-3 border-b bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  step === currentStep 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : step < currentStep 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {step < currentStep ? '✓' : step}
                </div>
                <span className="text-xs text-gray-600 mt-1 font-medium">
                  {stepLabels[index]}
                </span>
              </div>
              {index < 2 && (
                <div className={`flex-1 h-0.5 mx-3 transition-all ${
                  step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
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
      <div className="border-t bg-white p-4">
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
