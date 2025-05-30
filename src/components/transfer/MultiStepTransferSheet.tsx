import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, X, DollarSign, User, CreditCard, Shield, Clock, CheckCircle } from 'lucide-react';
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

  // Calculate transfer fee and total
  const transferFee = transferData.amount ? (parseFloat(transferData.amount) * 0.02).toFixed(2) : '0.00';
  const totalAmount = transferData.amount ? (parseFloat(transferData.amount) + parseFloat(transferFee)).toFixed(2) : '0.00';

  return (
    <div className="flex flex-col bg-white rounded-t-lg shadow-lg h-[95vh] relative">
      {/* Header Bar */}
      <div className="flex flex-col items-center py-4 bg-gray-50 rounded-t-lg border-b flex-shrink-0">
        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="absolute top-3 right-3 h-8 w-8 p-0 hover:bg-gray-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Transfer Summary Bar */}
      {transferData.amount && (
        <div className="px-6 py-3 bg-blue-50 border-b flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              Sending ${transferData.amount}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-blue-700">
            <Shield className="h-3 w-3" />
            <span>Secure Transfer</span>
          </div>
        </div>
      )}
      
      {/* Step Indicator */}
      <div className="px-6 py-3 border-b bg-gray-50 flex-shrink-0">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                  step === currentStep 
                    ? 'bg-blue-600 text-white scale-110 shadow-lg' 
                    : step < currentStep 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {step < currentStep ? <CheckCircle className="h-4 w-4" /> : 
                   step === 1 ? <DollarSign className="h-4 w-4" /> :
                   step === 2 ? <User className="h-4 w-4" /> :
                   step === 3 ? <CreditCard className="h-4 w-4" /> :
                   <Shield className="h-4 w-4" />}
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

      {/* Step Content - Scrollable with proper bottom padding for sticky buttons */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-6 py-4">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Money</h2>
                <p className="text-gray-600">Enter the amount you want to send</p>
              </div>
              
              <StepOneTransfer 
                amount={transferData.amount}
                onAmountChange={(amount) => updateTransferData({ amount })}
              />
              
              {transferData.amount && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900">Transfer Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount to send</span>
                      <span className="font-medium">${transferData.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transfer fee (2%)</span>
                      <span className="font-medium">${transferFee}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-semibold">Total amount</span>
                      <span className="font-bold text-blue-600">${totalAmount}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50 rounded-lg p-4 flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Fast Transfer</h4>
                  <p className="text-sm text-blue-700">Money typically arrives within minutes</p>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipient Details</h2>
                <p className="text-gray-600">Who are you sending ${transferData.amount} to?</p>
              </div>
              
              <StepTwoTransfer 
                receiverDetails={transferData.receiverDetails}
                onDetailsChange={(receiverDetails) => updateTransferData({ receiverDetails })}
              />
              
              {transferData.receiverDetails.fullName && (
                <div className="bg-green-50 rounded-lg p-4 flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Secure Transfer</h4>
                    <p className="text-sm text-green-700">Recipient information is encrypted and secure</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Method</h2>
                <p className="text-gray-600">
                  Choose how you'd like to send ${transferData.amount} to {transferData.receiverDetails.fullName}
                </p>
              </div>
              
              <PaymentMethodList
                methods={internationalPaymentMethods}
                selectedMethod={transferData.selectedPaymentMethod || null}
                onMethodChange={handlePaymentMethodChange}
              />
              
              <div className="bg-yellow-50 rounded-lg p-4 flex items-start space-x-3">
                <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Payment Security</h4>
                  <p className="text-sm text-yellow-700">All payment methods are secured with bank-level encryption</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Pay</h2>
                <p className="text-gray-600">Review your transfer details before proceeding</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Transfer Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recipient</span>
                      <span className="font-medium">{transferData.receiverDetails.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone</span>
                      <span className="font-medium">{transferData.receiverDetails.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-medium">${transferData.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fee</span>
                      <span className="font-medium">${transferFee}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total to pay</span>
                  <span className="text-xl font-bold text-blue-600">${totalAmount}</span>
                </div>
              </div>
              
              <StepThreeTransfer amount={transferData.amount} />
            </div>
          )}
        </div>
      </div>

      {/* Sticky Navigation Buttons - Absolute positioned relative to container */}
      <div className="absolute bottom-0 left-0 right-0 border-t bg-white px-4 py-3 z-50 shadow-lg">
        <div className="flex gap-3 max-w-md mx-auto">
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
