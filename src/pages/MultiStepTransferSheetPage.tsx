import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, DollarSign, User, CreditCard, Shield, Clock, CheckCircle, Receipt, ChevronLeft, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';
import StepThreeTransfer from '@/components/transfer/StepThreeTransfer';
import PaymentMethodList from '@/components/transfer/PaymentMethodList';
import PayPalHostedCheckout from '@/components/transfer/PayPalHostedCheckout';
import CompactCardSelection from '@/components/transfer/CompactCardSelection';
import PayPalIframeCheckout from '@/components/transfer/PayPalIframeCheckout';
import { internationalPaymentMethods } from '@/components/transfer/PaymentMethods';

export interface TransferData {
  amount: string;
  receiverDetails: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    department: string;
    arrondissement: string;
    commune: string;
  };
  selectedPaymentMethod?: string;
}

const MultiStepTransferSheetPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [showPayPalIframe, setShowPayPalIframe] = useState(false);
  
  const [transferData, setTransferData] = useState<TransferData>({
    amount: '100.00',
    receiverDetails: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      department: 'Artibonite',
      arrondissement: '',
      commune: '',
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

  const handleBackClick = () => {
    if (currentStep === 1) {
      navigate(-1);
    } else {
      handlePreviousStep();
    }
  };

  const handleCloseClick = () => {
    navigate(-1);
  };

  const updateTransferData = (data: Partial<TransferData>) => {
    setTransferData(prev => ({ ...prev, ...data }));
  };

  const handlePaymentMethodChange = (methodId: string) => {
    updateTransferData({ selectedPaymentMethod: methodId });
    // Remove the automatic iframe show logic
  };

  const handlePayPalButtonClick = () => {
    // Redirect to PayPal checkout instead of showing iframe
    window.open('https://www.paypal.com/checkoutnow', '_blank');
  };

  const handlePaymentSuccess = (details: any) => {
    console.log('Payment successful:', details);
    setPaymentCompleted(true);
    setTransactionId(details.id || `TX${Date.now()}`);
    setCurrentStep(4); // Move to receipt step (now step 4 instead of 5)
    setShowPayPalIframe(false);
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
    setShowPayPalIframe(false);
  };

  const handlePaymentCancel = () => {
    console.log('Payment cancelled');
    setShowPayPalIframe(false);
  };

  const canProceedFromStep1 = transferData.amount && parseFloat(transferData.amount) > 0;
  const canProceedFromStep2 = transferData.receiverDetails.firstName && 
                              transferData.receiverDetails.lastName &&
                              transferData.receiverDetails.phoneNumber && 
                              transferData.receiverDetails.arrondissement &&
                              transferData.receiverDetails.commune;
  const canProceedFromStep3 = transferData.selectedPaymentMethod;

  const stepTitles = ['Send Money', 'Recipient Details', 'Payment Method', 'Transfer Complete'];

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
    <div className="min-h-screen bg-white">
      {/* Header with reduced height, back button (chevron), step title, and close button */}
      <div className="bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between p-2 h-12">
          <button 
            onClick={handleBackClick}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Step title in the middle */}
          <div className="flex-1 flex justify-center">
            <h1 className="text-lg font-semibold text-gray-900">
              {stepTitles[currentStep - 1]}
            </h1>
          </div>
          
          <button 
            onClick={handleCloseClick}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Animated Step Indicator */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <motion.div 
                    className={`rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 shadow-sm ${
                      step === currentStep 
                        ? 'w-auto h-7 px-2 bg-red-600 text-white' 
                        : 'w-7 h-7 bg-gray-200 text-gray-600'
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
                      <CheckCircle className="h-3 w-3" />
                    ) : step === currentStep ? (
                      <div className="flex items-center space-x-1">
                        {step === 1 ? (
                          <DollarSign className="h-3 w-3" />
                        ) : step === 2 ? (
                          <User className="h-3 w-3" />
                        ) : step === 3 ? (
                          <CreditCard className="h-3 w-3" />
                        ) : (
                          <Receipt className="h-3 w-3" />
                        )}
                        <span className="font-medium whitespace-nowrap text-xs">
                          {stepTitles[index].split(' ')[0]}
                        </span>
                      </div>
                    ) : (
                      step
                    )}
                  </motion.div>
                </div>
                {index < 3 && (
                  <motion.div 
                    className="flex-1 h-0.5 mx-2 rounded-full origin-left"
                    variants={lineVariants}
                    initial="inactive"
                    animate={step < currentStep ? 'active' : 'inactive'}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="px-4 py-4">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-600">Enter the amount you want to send</p>
              </div>
              
              <StepOneTransfer 
                amount={transferData.amount}
                onAmountChange={(amount) => updateTransferData({ amount })}
              />
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-600">Who are you sending ${transferData.amount} to?</p>
              </div>
              
              <StepTwoTransfer 
                receiverDetails={transferData.receiverDetails}
                onDetailsChange={(receiverDetails) => updateTransferData({ receiverDetails })}
              />
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Complete Your Payment</h2>
                <p className="text-gray-600 leading-relaxed">
                  Sending <span className="font-semibold text-blue-600">${transferData.amount}</span> to{' '}
                  <span className="font-semibold text-gray-900">
                    {transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}
                  </span>
                </p>
              </div>
              
              {/* PayPal Button Section */}
              <div className="space-y-4">
                <Button
                  onClick={handlePayPalButtonClick}
                  className="w-full h-14 bg-[#0070ba] hover:bg-[#005ea6] text-white font-semibold text-lg rounded-lg flex items-center justify-center space-x-3"
                >
                  <img 
                    src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" 
                    alt="PayPal"
                    className="w-6 h-6 object-contain"
                  />
                  <span>Pay with PayPal</span>
                </Button>
              </div>

              {/* Separator Section */}
              <div className="flex items-center space-x-4 my-6">
                <Separator className="flex-1" />
                <span className="text-sm text-gray-500 font-medium px-3">or continue with</span>
                <Separator className="flex-1" />
              </div>

              {/* PayPal Iframe Section - Below separator, only show when button is clicked */}
              {showPayPalIframe && (
                <div className="space-y-4">
                  <PayPalIframeCheckout
                    amount={totalAmount}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    onCancel={handlePaymentCancel}
                    onClose={() => setShowPayPalIframe(false)}
                  />
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-gray-600">Your money has been sent successfully</p>
              </div>
              
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-4">
                
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Receipt className="h-5 w-5 mr-2" />
                    Receipt
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono text-gray-900">{transactionId}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status</span>
                    <span className="text-green-600 font-medium">Completed</span>
                  </div>
                  
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Recipient</span>
                      <span className="font-medium">{transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Phone Number</span>
                      <span className="font-medium">+509 {transferData.receiverDetails.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium text-right max-w-xs">{transferData.receiverDetails.commune}, {transferData.receiverDetails.arrondissement}, {transferData.receiverDetails.department}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount Sent</span>
                      <span className="font-medium">${transferData.amount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Transfer Fee</span>
                      <span className="font-medium">${transferFee}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t pt-2">
                      <span>Total Paid</span>
                      <span className="text-blue-600">${totalAmount}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium capitalize">
                        {transferData.selectedPaymentMethod?.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 mt-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Delivery Information</h4>
                      <p className="text-sm text-green-700 mt-1">
                        The recipient will receive the funds within 24-48 hours. They will be notified via SMS when the money is ready for pickup.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigator.share?.({
                      title: 'Transfer Receipt',
                      text: `Transfer of $${transferData.amount} to ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName} completed successfully. Transaction ID: ${transactionId}`,
                    }).catch(() => {
                      navigator.clipboard?.writeText(`Transaction ID: ${transactionId}`);
                    });
                  }}
                  className="flex-1"
                >
                  Share Receipt
                </Button>
                <Button 
                  onClick={() => navigate('/for-you')}
                  className="flex-1"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Navigation Buttons - Fixed at bottom of viewport */}
      {currentStep < 4 && (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-white px-4 py-3 z-[60] shadow-lg">
          <div className="flex gap-3 max-w-md mx-auto">
            {currentStep === 1 ? (
              <Button 
                onClick={handleNextStep}
                disabled={!canProceedFromStep1}
                className="flex-1 transition-all duration-200"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStep}
                  className="flex-1 transition-all duration-200"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                
                {currentStep < 3 ? (
                  <Button 
                    onClick={handleNextStep}
                    disabled={
                      (currentStep === 2 && !canProceedFromStep2)
                    }
                    className="flex-1 transition-all duration-200"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : currentStep === 3 ? (
                  <Button 
                    onClick={() => {
                      if (transferData.selectedPaymentMethod === 'paypal') {
                        setShowPayPalIframe(true);
                      } else if (transferData.selectedPaymentMethod === 'card') {
                        // Card payment form is already shown, user needs to complete it
                      }
                    }}
                    disabled={!canProceedFromStep3}
                    className="flex-1 transition-all duration-200"
                  >
                    {transferData.selectedPaymentMethod === 'paypal' ? 'Pay with PayPal' : 'Continue'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex-1"></div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepTransferSheetPage;
