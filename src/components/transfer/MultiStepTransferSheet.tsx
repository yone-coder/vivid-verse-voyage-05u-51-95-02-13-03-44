import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowLeft, X, GripHorizontal } from 'lucide-react';
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

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ y: 0, height: 0 });
  const [panelHeight, setPanelHeight] = useState(60);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const currentHeight = panelRef.current?.offsetHeight || 0;
    setDragStart({ y: clientY, height: (currentHeight / window.innerHeight) * 100 });
    
    // Prevent any other interactions during drag
    document.body.style.userSelect = 'none';
    document.body.style.pointerEvents = 'none';
    if (panelRef.current) {
      panelRef.current.style.pointerEvents = 'auto';
    }
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = dragStart.y - clientY;
    const deltaPercent = (deltaY / window.innerHeight) * 100;
    const newHeight = Math.min(95, Math.max(30, dragStart.height + deltaPercent));
    
    setPanelHeight(newHeight);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Restore normal interactions
    document.body.style.userSelect = '';
    document.body.style.pointerEvents = '';
    if (panelRef.current) {
      panelRef.current.style.pointerEvents = '';
    }
    
    // Snap to common positions
    if (panelHeight < 40) {
      setPanelHeight(30);
    } else if (panelHeight < 70) {
      setPanelHeight(60);
    } else {
      setPanelHeight(90);
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleDragMove(e);
      };
      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleDragMove(e);
      };
      const handleMouseUp = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleDragEnd();
      };
      const handleTouchEnd = (e: TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleDragEnd();
      };

      document.addEventListener('mousemove', handleMouseMove, { capture: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
      document.addEventListener('mouseup', handleMouseUp, { capture: true });
      document.addEventListener('touchend', handleTouchEnd, { capture: true });

      return () => {
        document.removeEventListener('mousemove', handleMouseMove, { capture: true });
        document.removeEventListener('touchmove', handleTouchMove, { capture: true });
        document.removeEventListener('mouseup', handleMouseUp, { capture: true });
        document.removeEventListener('touchend', handleTouchEnd, { capture: true });
      };
    }
  }, [isDragging, dragStart, panelHeight]);

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

  return (
    <div 
      ref={panelRef}
      className={`flex flex-col h-full bg-white rounded-t-lg shadow-lg transition-all duration-200 ${
        isDragging ? 'select-none' : ''
      }`}
      style={{ height: `${panelHeight}vh` }}
    >
      {/* Enhanced Drag Handle - Only this area should be draggable */}
      <div 
        className={`flex flex-col items-center py-3 cursor-grab active:cursor-grabbing bg-gray-50 rounded-t-lg border-b border-gray-200 transition-all duration-200 hover:bg-gray-100 ${
          isDragging ? 'bg-gray-200 cursor-grabbing' : ''
        }`}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{ touchAction: 'none' }}
      >
        <div className="w-12 h-1 bg-gray-400 rounded-full mb-2"></div>
        <GripHorizontal className="h-4 w-4 text-gray-500" />
        <div className="text-xs text-gray-500 mt-1">Drag to resize</div>
        
        {/* Close button in top right */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-gray-200"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Compact Step Indicator */}
      <div className="px-6 py-3 border-b bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((step, index) => (
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
              {index < 3 && (
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

      {/* Navigation Buttons - These should remain sticky and not interfere with dragging */}
      <div className="border-t bg-white p-4 sticky bottom-0">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={currentStep === 1 ? onClose : handlePreviousStep}
            className="flex-1"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
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
              className="flex-1"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
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
