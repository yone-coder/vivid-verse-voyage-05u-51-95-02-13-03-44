
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, DollarSign, User, CreditCard, Shield, Clock, CheckCircle, Receipt } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';
import StepThreeTransfer from '@/components/transfer/StepThreeTransfer';
import PaymentMethodList from '@/components/transfer/PaymentMethodList';
import PayPalHostedCheckout from '@/components/transfer/PayPalHostedCheckout';
import CompactCardSelection from '@/components/transfer/CompactCardSelection';
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
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  
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
    if (currentStep < 5) {
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
    setPaymentCompleted(true);
    setTransactionId(details.id || `TX${Date.now()}`);
    setCurrentStep(5); // Move to receipt step
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
  };

  const canProceedFromStep1 = transferData.amount && parseFloat(transferData.amount) > 0;
  const canProceedFromStep2 = transferData.receiverDetails.fullName && 
                              transferData.receiverDetails.phoneNumber && 
                              transferData.receiverDetails.address;
  const canProceedFromStep3 = transferData.selectedPaymentMethod;

  const stepTitles = ['Send Money', 'Recipient Details', 'Payment Method', 'Review & Pay', 'Transfer Complete'];

  // Animation variants for step indicator
  const stepVariants = {
    inactive: { 
      scale: 1,
      backgroundColor: '#E5E7EB',
      color: '#6B7280'
    },
    active: { 
      scale: 1.05,
      backgroundColor: '#DC2626',
      color: '#FFFFFF',
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    completed: {
      scale: 1,
      backgroundColor: '#10B981',
      color: '#FFFFFF',
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const lineVariants = {
    inactive: {
      backgroundColor: '#E5E7EB',
      scaleX: 1
    },
    active: {
      backgroundColor: '#10B981',
      scaleX: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  // Calculate transfer fee and total using new 15% per $100 logic
  const transferFee = transferData.amount ? (Math.ceil(parseFloat(transferData.amount) / 100) * 15).toFixed(2) : '0.00';
  const totalAmount = transferData.amount ? (parseFloat(transferData.amount) + parseFloat(transferFee)).toFixed(2) : '0.00';

  // Calculate receiver amount (assuming USD to HTG conversion rate of 127.5)
  const receiverAmount = transferData.amount ? (parseFloat(transferData.amount) * 127.5).toFixed(2) : '0.00';

  return (
    <div 
      ref={panelRef}
      className="flex flex-col bg-white rounded-t-lg shadow-lg h-[95vh] max-h-screen"
    >
      {/* Header with Title - Minimal */}
      <div className="flex items-center justify-center py-3 px-4 bg-white rounded-t-lg flex-shrink-0 border-b border-gray-100">
        <h1 className="text-lg font-medium text-gray-900">
          {stepTitles[currentStep - 1]}
        </h1>
      </div>
      
      {/* Compact Step Indicator */}
      <div className="px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-center">
          {[1, 2, 3, 4, 5].map((step, index) => (
            <React.Fragment key={step}>
              <motion.div 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  step === currentStep 
                    ? 'bg-red-600 text-white' 
                    : step < currentStep 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                }`}
                variants={stepVariants}
                initial="inactive"
                animate={
                  step === currentStep ? 'active' : 
                  step < currentStep ? 'completed' : 
                  'inactive'
                }
              >
                {step < currentStep ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  step
                )}
              </motion.div>
              {index < 4 && (
                <motion.div 
                  className="w-8 h-0.5 mx-1 rounded-full"
                  variants={lineVariants}
                  initial="inactive"
                  animate={step < currentStep ? 'active' : 'inactive'}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Centered Content Container - No scrolling */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {currentStep === 1 && (
            <div className="text-center space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">How much do you want to send?</h2>
                <p className="text-gray-600 text-sm">Enter the amount in USD</p>
              </div>
              
              <StepOneTransfer 
                amount={transferData.amount}
                onAmountChange={(amount) => updateTransferData({ amount })}
              />
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="text-center space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Who are you sending to?</h2>
                <p className="text-gray-600 text-sm">Recipient details for ${transferData.amount}</p>
              </div>
              
              <StepTwoTransfer 
                receiverDetails={transferData.receiverDetails}
                onDetailsChange={(receiverDetails) => updateTransferData({ receiverDetails })}
              />
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="text-center space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Choose Payment Method</h2>
                <p className="text-sm text-gray-600">
                  Sending ${transferData.amount} to {transferData.receiverDetails.fullName}
                </p>
              </div>
              
              <CompactCardSelection
                selectedMethod={transferData.selectedPaymentMethod}
                onMethodChange={handlePaymentMethodChange}
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Review & Confirm</h2>
                <p className="text-gray-600 text-sm">Please review your transfer details</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium">{transferData.receiverDetails.fullName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">${transferData.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fee:</span>
                  <span className="font-medium">${transferFee}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-lg font-bold text-blue-600">${totalAmount}</span>
                </div>
              </div>
              
              <Button 
                onClick={handlePaymentSuccess}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                Complete Payment
              </Button>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center space-y-6">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Transfer Complete!</h2>
                <p className="text-gray-600 text-sm">Your money has been sent successfully</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-left text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-mono">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Sent</span>
                  <span className="font-medium">${transferData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipient</span>
                  <span className="font-medium">{transferData.receiverDetails.fullName}</span>
                </div>
              </div>
              
              <Button 
                onClick={onClose}
                className="w-full"
                size="lg"
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Minimal Navigation Buttons - Fixed at bottom */}
      {currentStep < 5 && (
        <div className="flex-shrink-0 border-t bg-white px-6 py-4">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button 
                variant="outline" 
                onClick={handlePreviousStep}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            
            {currentStep < 4 && (
              <Button 
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && !canProceedFromStep1) ||
                  (currentStep === 2 && !canProceedFromStep2) ||
                  (currentStep === 3 && !canProceedFromStep3)
                }
                className={currentStep === 1 ? "w-full" : "flex-1"}
              >
                {currentStep === 1 ? 'Get Started' : 'Continue'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepTransferSheet;
