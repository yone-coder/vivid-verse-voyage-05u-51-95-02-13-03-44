
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowRight, ArrowLeft, X, DollarSign, User, CreditCard, Shield, CheckCircle, Clock, AlertCircle } from 'lucide-react';
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
  const dragThreshold = 80;

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

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('mouseup', handleMouseUp);

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

  const stepLabels = ['Amount', 'Recipient', 'Payment', 'Review'];
  const stepIcons = [DollarSign, User, CreditCard, CheckCircle];

  // Calculate dynamic height with smooth transitions
  const getSheetHeight = () => {
    const baseHeight = isExpanded ? 95 : 60;
    const dragEffect = isDragging ? Math.max(-5, Math.min(5, dragOffset / 20)) : 0;
    return Math.max(40, Math.min(98, baseHeight + dragEffect));
  };

  // Calculate transfer fee and total
  const transferFee = transferData.amount ? parseFloat(transferData.amount) * 0.029 : 0;
  const totalAmount = transferData.amount ? parseFloat(transferData.amount) + transferFee : 0;

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
      {/* Enhanced Drag Bar */}
      <div 
        className="flex flex-col items-center py-4 cursor-grab active:cursor-grabbing bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b touch-none select-none"
        onTouchStart={handleDragStart}
        onMouseDown={handleDragStart}
        style={{ touchAction: 'none' }}
      >
        <div className={`w-12 h-1 bg-gray-300 rounded-full transition-all duration-200 ${
          isDragging ? 'bg-blue-400 w-16' : ''
        }`}></div>
        
        {/* Transfer Title */}
        <div className="mt-2 text-center">
          <h2 className="text-lg font-bold text-gray-900">International Transfer</h2>
          <p className="text-sm text-gray-600">Send money worldwide securely</p>
        </div>
        
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
      
      {/* Enhanced Step Indicator */}
      <div className="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-blue-50 flex-shrink-0">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step, index) => {
            const StepIcon = stepIcons[index];
            return (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    step === currentStep 
                      ? 'bg-blue-600 text-white scale-110 shadow-lg' 
                      : step < currentStep 
                        ? 'bg-green-500 text-white shadow-md' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium transition-colors ${
                    step === currentStep ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {stepLabels[index]}
                  </span>
                </div>
                {index < 3 && (
                  <div className={`flex-1 h-1 mx-3 rounded-full transition-all duration-300 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Transfer Summary Bar */}
      {transferData.amount && (
        <div className="px-6 py-3 bg-blue-50 border-b flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Sending: <span className="text-blue-600">${transferData.amount}</span>
            </span>
          </div>
          {transferData.receiverDetails.fullName && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">
                To: <span className="font-medium">{transferData.receiverDetails.fullName}</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Step Content - Enhanced */}
      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ 
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch'
      }}>
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">How much are you sending?</h3>
              <p className="text-gray-600 mb-6">Enter the amount you want to transfer</p>
            </div>
            
            <StepOneTransfer 
              amount={transferData.amount}
              onAmountChange={(amount) => updateTransferData({ amount })}
            />
            
            {/* Exchange Rate Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">Exchange Rate</span>
              </div>
              <p className="text-sm text-amber-700">
                1 USD = 0.85 EUR • Rate locked for 30 minutes
              </p>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Who are you sending to?</h3>
              <p className="text-gray-600 mb-6">Enter recipient details</p>
            </div>
            
            <StepTwoTransfer 
              receiverDetails={transferData.receiverDetails}
              onDetailsChange={(receiverDetails) => updateTransferData({ receiverDetails })}
            />
            
            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Secure Transfer</span>
              </div>
              <p className="text-sm text-green-700">
                All transfers are encrypted and monitored for your security
              </p>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Payment Method</h3>
              <p className="text-gray-600 mb-6">
                Select how you'd like to pay for this transfer
              </p>
            </div>
            
            <PaymentMethodList
              methods={internationalPaymentMethods}
              selectedMethod={transferData.selectedPaymentMethod || null}
              onMethodChange={handlePaymentMethodChange}
            />
            
            {/* Fee Breakdown */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3">Fee Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transfer amount:</span>
                  <span className="font-medium">${transferData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transfer fee (2.9%):</span>
                  <span className="font-medium">${transferFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-medium text-gray-900">Total to pay:</span>
                  <span className="font-bold text-blue-600">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Review & Confirm</h3>
              <p className="text-gray-600 mb-6">Please review your transfer details</p>
            </div>
            
            {/* Transfer Summary */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <span className="text-gray-600">You're sending</span>
                <span className="text-2xl font-bold text-blue-600">${transferData.amount}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">To</span>
                  <span className="font-medium">{transferData.receiverDetails.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium">{transferData.receiverDetails.phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address</span>
                  <span className="font-medium text-right max-w-48">{transferData.receiverDetails.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment method</span>
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total cost</span>
                  <span className="font-bold text-green-600">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 mb-1">Important</p>
                  <p className="text-sm text-yellow-700">
                    Transfer will be processed within 1-3 business days. You'll receive email confirmation once completed.
                  </p>
                </div>
              </div>
            </div>
            
            <StepThreeTransfer amount={transferData.amount} />
          </div>
        )}
      </div>

      {/* Enhanced Navigation Buttons */}
      <div className="border-t bg-white p-4 flex-shrink-0">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={currentStep === 1 ? onClose : handlePreviousStep}
            className="flex-1 transition-all duration-200 hover:bg-gray-50"
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
              className="flex-1 transition-all duration-200 bg-blue-600 hover:bg-blue-700"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={() => {
                console.log('Transfer confirmed!', transferData);
                onClose();
              }}
              className="flex-1 transition-all duration-200 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirm Transfer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepTransferSheet;
