
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';
import StepThreeTransfer from '@/components/transfer/StepThreeTransfer';
import PaymentMethodList from '@/components/transfer/PaymentMethodList';
import PayPalHostedCheckout from '@/components/transfer/PayPalHostedCheckout';
import { internationalPaymentMethods } from '@/components/transfer/PaymentMethods';

export interface TransferData {
  amount: string;
  receiverDetails: {
    fullName: string;
    phoneNumber: string;
    address: string;
    additionalInfo?: string;
  };
  selectedPaymentMethod?: string;
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
    },
    selectedPaymentMethod: 'credit-card'
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragCurrentY, setDragCurrentY] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragThreshold = 80; // Pixels to drag before expanding/collapsing

  // Get client Y coordinate from touch or mouse event
  const getClientY = useCallback((e: TouchEvent | MouseEvent | React.TouchEvent | React.MouseEvent) => {
    if ('touches' in e) {
      return e.touches[0]?.clientY || 0;
    }
    return e.clientY;
  }, []);

  // Handle drag start
  const handleDragStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const clientY = getClientY(e);
    setIsDragging(true);
    setDragStartY(clientY);
    setDragCurrentY(clientY);
    setDragOffset(0);
  }, [getClientY]);

  // Handle drag move with throttling
  const handleDragMove = useCallback((e: TouchEvent | MouseEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const clientY = getClientY(e);
    const deltaY = dragStartY - clientY;
    
    setDragCurrentY(clientY);
    setDragOffset(deltaY);

    // Smooth expansion/collapse based on drag distance
    if (deltaY > dragThreshold && !isExpanded) {
      setIsExpanded(true);
      setDragOffset(0);
    } else if (deltaY < -dragThreshold && isExpanded) {
      setIsExpanded(false);
      setDragOffset(0);
    }
  }, [isDragging, dragStartY, dragThreshold, isExpanded, getClientY]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setDragOffset(0);
    setDragStartY(0);
    setDragCurrentY(0);
  }, [isDragging]);

  // Set up event listeners for drag
  useEffect(() => {
    if (!isDragging) return;

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleDragMove(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleDragMove(e);
    };

    const handleTouchEnd = () => handleDragEnd();
    const handleMouseUp = () => handleDragEnd();

    // Add event listeners with passive: false for touch events to allow preventDefault
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup function
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const handleNextStep = () => {
    if (currentStep < 4) {
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

  const handlePaymentMethodChange = (methodId: string) => {
    updateTransferData({ selectedPaymentMethod: methodId });
  };

  const handlePaymentSuccess = (details: any) => {
    console.log('Payment successful:', details);
    onClose();
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
  };

  const canProceedFromStep1 = transferData.amount && parseFloat(transferData.amount) > 0;
  const canProceedFromStep2 = transferData.receiverDetails.fullName && 
                              transferData.receiverDetails.phoneNumber && 
                              transferData.receiverDetails.address;
  const canProceedFromStep3 = transferData.selectedPaymentMethod;

  const stepLabels = ['Amount', 'Recipient', 'Payment Method', 'Payment'];

  // Calculate dynamic height with smooth transitions
  const getSheetHeight = () => {
    const baseHeight = isExpanded ? 95 : 60;
    const dragEffect = isDragging ? Math.max(-5, Math.min(5, dragOffset / 20)) : 0;
    return Math.max(40, Math.min(98, baseHeight + dragEffect));
  };

  return (
    <div 
      ref={sheetRef}
      className={`flex flex-col bg-white rounded-t-lg shadow-lg transition-all duration-300 ease-out ${
        isDragging ? 'transition-none' : ''
      }`}
      style={{ 
        height: `${getSheetHeight()}vh`,
        transform: isDragging ? `translateY(${Math.max(-10, Math.min(10, -dragOffset / 8))}px)` : 'none'
      }}
    >
      {/* Improved Drag Bar */}
      <div 
        className="flex flex-col items-center py-4 cursor-grab active:cursor-grabbing bg-gray-50 rounded-t-lg border-b touch-none select-none"
        onTouchStart={handleDragStart}
        onMouseDown={handleDragStart}
        style={{ touchAction: 'none' }}
      >
        <div className={`w-12 h-1 bg-gray-300 rounded-full transition-all duration-200 ${
          isDragging ? 'bg-blue-400 w-16' : ''
        }`}></div>
        
        {/* Close button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="absolute top-3 right-3 h-8 w-8 p-0 hover:bg-gray-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Step Indicator */}
      <div className="px-6 py-3 border-b bg-gray-50 flex-shrink-0">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                  step === currentStep 
                    ? 'bg-blue-600 text-white scale-110' 
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
              {index < 3 && (
                <div className={`flex-1 h-0.5 mx-3 transition-all duration-300 ${
                  step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-4" style={{ 
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch'
      }}>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Payment Method</h3>
              <p className="text-sm text-gray-600">
                Select how you'd like to send ${transferData.amount} to {transferData.receiverDetails.fullName}
              </p>
            </div>
            <PaymentMethodList
              methods={internationalPaymentMethods}
              selectedMethod={transferData.selectedPaymentMethod || null}
              onMethodChange={handlePaymentMethodChange}
            />
          </div>
        )}

        {currentStep === 4 && (
          <StepThreeTransfer amount={transferData.amount} />
        )}
      </div>

      {/* Sticky Navigation Buttons */}
      <div className="border-t bg-white p-4 flex-shrink-0">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={currentStep === 1 ? onClose : handlePreviousStep}
            className="flex-1 transition-all duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </Button>
          
          {currentStep < 4 ? (
            <Button 
              onClick={handleNextStep}
              disabled={
                (currentStep === 1 && !canProceedFromStep1) ||
                (currentStep === 2 && !canProceedFromStep2) ||
                (currentStep === 3 && !canProceedFromStep3)
              }
              className="flex-1 transition-all duration-200"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <div className="flex-1"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepTransferSheet;
