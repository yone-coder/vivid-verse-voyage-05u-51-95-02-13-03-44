
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, DollarSign, User, CreditCard, Shield, Clock, CheckCircle, Receipt, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import TransferTypeSelector from '@/components/transfer/TransferTypeSelector';
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';
import StepThreeTransfer from '@/components/transfer/StepThreeTransfer';
import CompactCardSelection from '@/components/transfer/CompactCardSelection';

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
  selectedPaymentMethod?: string;
}

const MultiStepTransferSheetDesktopPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  
  const [transferData, setTransferData] = useState<TransferData>({
    transferType: 'international',
    amount: '',
    receiverDetails: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      department: 'Artibonite',
      commune: '',
    },
    selectedPaymentMethod: 'credit-card'
  });

  const handleNextStep = () => {
    if (currentStep < 6) {
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

  const handlePaymentSuccess = (details?: any) => {
    console.log('Payment successful:', details);
    setPaymentCompleted(true);
    setTransactionId(details?.id || `TX${Date.now()}`);
    setCurrentStep(6); // Move to receipt step
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
  };

  const canProceedFromStep1 = transferData.transferType !== undefined;
  const canProceedFromStep2 = transferData.amount && parseFloat(transferData.amount) > 0;
  const canProceedFromStep3 = transferData.receiverDetails.firstName && 
                              transferData.receiverDetails.lastName &&
                              transferData.receiverDetails.phoneNumber && 
                              transferData.receiverDetails.commune;
  const canProceedFromStep4 = transferData.selectedPaymentMethod;

  const stepTitles = ['Transfer Type', 'Send Money', 'Recipient Details', 'Payment Method', 'Review & Pay', 'Transfer Complete'];

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {stepTitles[currentStep - 1]}
          </h1>
          <p className="text-gray-600">Complete your money transfer in a few simple steps</p>
        </div>
        
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <motion.div 
                  className={`rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 shadow-sm ${
                    step === currentStep 
                      ? 'w-auto h-8 px-3 bg-red-600 text-white' 
                      : 'w-8 h-8 bg-gray-200 text-gray-600'
                  }`}
                  variants={stepVariants}
                  initial="inactive"
                  animate={
                    step === currentStep ? 'active' : 
                    step < currentStep ? 'completed' : 
                    'inactive'
                  }
                  whileTap={{ scale: 0.95 }}
                >
                  {step < currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : step === currentStep ? (
                    <div className="flex items-center space-x-1">
                      {step === 1 ? (
                        <Globe className="h-4 w-4" />
                      ) : step === 2 ? (
                        <DollarSign className="h-4 w-4" />
                      ) : step === 3 ? (
                        <User className="h-4 w-4" />
                      ) : step === 4 ? (
                        <CreditCard className="h-4 w-4" />
                      ) : step === 5 ? (
                        <Shield className="h-4 w-4" />
                      ) : (
                        <Receipt className="h-4 w-4" />
                      )}
                      <span className="font-medium whitespace-nowrap text-sm">
                        {stepTitles[index].split(' ')[0]}
                      </span>
                    </div>
                  ) : (
                    step
                  )}
                </motion.div>
                {index < 5 && (
                  <motion.div 
                    className="flex-1 h-0.5 mx-4 rounded-full origin-left w-16"
                    variants={lineVariants}
                    initial="inactive"
                    animate={step < currentStep ? 'active' : 'inactive'}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Card */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            {/* Transfer Type Selector - Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600">Choose your transfer type</p>
                </div>
                <TransferTypeSelector 
                  transferType={transferData.transferType || 'international'}
                  onTransferTypeChange={(type) => updateTransferData({ transferType: type })}
                  disableNavigation={true}
                />
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-800">
                        Secure & Fast Transfers
                      </h3>
                      <p className="text-xs text-blue-600 mt-1">
                        All transfers are encrypted and protected. Send money to Haiti with confidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Amount Input - Step 2 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600">Enter the amount you want to send</p>
                </div>
                
                <StepOneTransfer 
                  amount={transferData.amount}
                  onAmountChange={(amount) => updateTransferData({ amount })}
                />

                {transferData.amount && parseFloat(transferData.amount) > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Exchange Rate:</span>
                        <span className="font-medium">1 USD = 127.5 HTG</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Recipient will receive:</span>
                        <span className="font-medium text-green-600">{receiverAmount} HTG</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Transfer fee:</span>
                        <span className="font-medium">${transferFee}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Recipient Details - Step 3 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600">Who are you sending ${transferData.amount} to?</p>
                </div>
                
                <StepTwoTransfer 
                  receiverDetails={transferData.receiverDetails}
                  onDetailsChange={(receiverDetails) => updateTransferData({ receiverDetails })}
                />
                
                {(transferData.receiverDetails.firstName || transferData.receiverDetails.lastName) && (
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
            
            {/* Payment Method - Step 4 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Choose Payment Method</h2>
                  <p className="text-gray-600">
                    Sending ${transferData.amount} to {transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}
                  </p>
                </div>
                
                <CompactCardSelection
                  selectedMethod={transferData.selectedPaymentMethod}
                  onMethodChange={handlePaymentMethodChange}
                />
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Bank-Level Security</p>
                      <p className="text-xs text-blue-600">Your payment information is fully encrypted and protected</p>
                    </div>
                  </div>
                </div>
                
                <StepThreeTransfer 
                  amount={transferData.amount}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </div>
            )}

            {/* Review & Pay - Step 5 */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Review Your Transfer</h2>
                  <p className="text-gray-600">Please review all details before proceeding</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold text-white mb-4">Transfer Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Recipient:</span>
                        <span className="font-medium">{transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Phone:</span>
                        <span className="font-medium">+509 {transferData.receiverDetails.phoneNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Location:</span>
                        <span className="font-medium text-right">{transferData.receiverDetails.commune}, {transferData.receiverDetails.department}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Send Amount:</span>
                        <span className="font-medium">${transferData.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Transfer Fee:</span>
                        <span className="font-medium">${transferFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Exchange Rate:</span>
                        <span className="font-medium">1 USD = 127.5 HTG</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
                    <span className="font-semibold text-lg">Total to Pay:</span>
                    <span className="text-2xl font-bold text-green-400">${totalAmount}</span>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
                    <span className="font-semibold">Recipient Gets:</span>
                    <span className="text-xl font-bold text-blue-400">{receiverAmount} HTG</span>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={handlePaymentSuccess}
                    className="bg-green-600 hover:bg-green-700 text-white px-12 py-3 text-lg"
                    size="lg"
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Complete Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Transfer Complete - Step 6 */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Successful!</h2>
                  <p className="text-gray-600">Your money has been sent successfully</p>
                </div>
                
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Receipt className="h-6 w-6 mr-2" />
                      Transfer Receipt
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction ID:</span>
                        <span className="font-mono text-gray-900">{transactionId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="text-green-600 font-medium">Completed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium capitalize">
                          {transferData.selectedPaymentMethod?.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount Sent:</span>
                        <span className="font-medium">${transferData.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transfer Fee:</span>
                        <span className="font-medium">${transferFee}</span>
                      </div>
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total Paid:</span>
                        <span className="text-blue-600">${totalAmount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 space-y-3">
                    <h4 className="font-semibold text-gray-900">Recipient Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">+509 {transferData.receiverDetails.phoneNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{transferData.receiverDetails.commune}, {transferData.receiverDetails.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Will Receive:</span>
                        <span className="font-medium text-green-600">{receiverAmount} HTG</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900">Delivery Information</h4>
                        <p className="text-sm text-green-700 mt-1">
                          The recipient will receive the funds within 24-48 hours. They will be notified via SMS when the money is ready for pickup.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      const shareData = {
                        title: 'Transfer Receipt',
                        text: `Transfer of $${transferData.amount} to ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName} completed successfully. Transaction ID: ${transactionId}`,
                      };
                      
                      if (navigator.share) {
                        navigator.share(shareData).catch(() => {
                          navigator.clipboard?.writeText(`Transaction ID: ${transactionId}`);
                        });
                      } else {
                        navigator.clipboard?.writeText(`Transaction ID: ${transactionId}`);
                      }
                    }}
                    className="px-8"
                  >
                    Share Receipt
                  </Button>
                  <Button 
                    onClick={() => window.location.reload()}
                    className="px-8"
                  >
                    Send Another Transfer
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        {currentStep < 6 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-4 max-w-md">
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStep}
                  className="px-8"
                  size="lg"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
              
              {currentStep < 5 && (
                <Button 
                  onClick={handleNextStep}
                  disabled={
                    (currentStep === 1 && !canProceedFromStep1) ||
                    (currentStep === 2 && !canProceedFromStep2) ||
                    (currentStep === 3 && !canProceedFromStep3) ||
                    (currentStep === 4 && !canProceedFromStep4)
                  }
                  className="px-8"
                  size="lg"
                >
                  {currentStep === 1 ? 'Get Started' : 'Continue'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepTransferSheetDesktopPage;
