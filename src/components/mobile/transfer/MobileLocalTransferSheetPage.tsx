import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, DollarSign, User, CreditCard, Shield, CheckCircle, Receipt, ChevronLeft, X, Key, Smartphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import StepOneLocalTransfer from '@/components/transfer/StepOneLocalTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';
import PaymentMethodList from '@/components/transfer/PaymentMethodList';
import { nationalPaymentMethods } from '@/components/transfer/PaymentMethods';
import { emailNotificationService } from '@/components/transfer/EmailNotificationService';
import { toast } from "@/hooks/use-toast";

// MonCash backend API URL
const MONCASH_BACKEND_URL = 'https://moncash-backend.onrender.com';

export interface LocalTransferData {
  amount: string;
  receiverDetails: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    department: string;
    commune: string;
    email?: string;
  };
  selectedPaymentMethod?: string;
}

const MobileLocalTransferSheetPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const receiptRef = useRef<HTMLDivElement>(null);
  
  const [transferData, setTransferData] = useState<LocalTransferData>({
    amount: '1000.00',
    receiverDetails: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      department: 'Artibonite',
      commune: '',
      email: '',
    },
    selectedPaymentMethod: 'moncash'
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

  const updateTransferData = (data: Partial<LocalTransferData>) => {
    setTransferData(prev => ({ ...prev, ...data }));
  };

  // MonCash payment handler
  const handleMonCashPayment = async () => {
    setIsPaymentLoading(true);
    setPaymentError('');

    try {
      console.log('Creating MonCash payment...');

      // Get MonCash access token
      const tokenResponse = await fetch(`${MONCASH_BACKEND_URL}/api/get-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        throw new Error(errorData.error || 'Failed to get MonCash access token');
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.accessToken;

      if (!accessToken) {
        throw new Error('Invalid access token received from MonCash');
      }

      // Create MonCash payment
      const paymentResponse = await fetch(`${MONCASH_BACKEND_URL}/api/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          accessToken,
          amount: parseFloat(transferData.amount)
        })
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json();
        throw new Error(errorData.error || 'Failed to create MonCash payment');
      }

      const paymentData = await paymentResponse.json();

      if (!paymentData.paymentUrl) {
        throw new Error('No payment URL received from MonCash');
      }

      // Redirect to MonCash payment page
      window.location.href = paymentData.paymentUrl;

    } catch (error) {
      console.error('MonCash payment error:', error);
      
      let errorMessage = "Failed to process MonCash payment. ";
      
      if (error instanceof Error) {
        if (error.message.includes('EHOSTUNREACH') || error.message.includes('Internal server error')) {
          errorMessage += "MonCash service is temporarily unavailable. Please try again later or use the demo option below.";
        } else {
          errorMessage += error.message;
        }
      } else {
        errorMessage += "Please try again.";
      }
      
      setPaymentError(errorMessage);
      
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsPaymentLoading(false);
    }
  };

  // Simulate payment completion for demo purposes
  const simulatePaymentCompletion = () => {
    setPaymentCompleted(true);
    const actualTransactionId = `MC${Date.now()}`;
    setTransactionId(actualTransactionId);
    setCurrentStep(4);
    setIsPaymentLoading(false);
    
    // Send email notification if email is provided
    if (userEmail) {
      setTimeout(() => {
        emailNotificationService.sendTransferConfirmation(
          userEmail,
          transferData,
          actualTransactionId
        );
      }, 1000);
    }
  };

  const generateReceiptImage = async () => {
    if (!receiptRef.current) return;

    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
      });

      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], 'receipt.png', { type: 'image/png' });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: 'Transfer Receipt',
              text: `Local transfer of ${transferData.amount} HTG to ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName} completed successfully. Transaction ID: ${transactionId}`,
              files: [file]
            });
          } catch (error) {
            console.log('Sharing cancelled or failed:', error);
            // Fallback to downloading the image
            downloadImage(canvas);
          }
        } else {
          // Fallback to downloading the image
          downloadImage(canvas);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error generating receipt image:', error);
      // Fallback to text sharing
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Transfer Receipt',
            text: `Local transfer of ${transferData.amount} HTG to ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName} completed successfully. Transaction ID: ${transactionId}`,
          });
        } catch (shareError) {
          console.log('Text sharing failed:', shareError);
          navigator.clipboard?.writeText(`Transaction ID: ${transactionId}`);
        }
      } else {
        navigator.clipboard?.writeText(`Transaction ID: ${transactionId}`);
      }
    }
  };

  const downloadImage = (canvas: HTMLCanvasElement) => {
    const link = document.createElement('a');
    link.download = `receipt-${transactionId}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const canProceedFromStep1 = transferData.amount && parseFloat(transferData.amount) > 0;
  const canProceedFromStep2 = transferData.receiverDetails.firstName && 
                              transferData.receiverDetails.lastName &&
                              transferData.receiverDetails.phoneNumber && 
                              transferData.receiverDetails.commune;
  const canProceedFromStep3 = transferData.selectedPaymentMethod;

  const stepTitles = ['Send Money', 'Recipient Details', 'Payment Method', 'Transfer Complete'];

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

  // Calculate 15% fee on the amount
  const transferFee = transferData.amount ? (parseFloat(transferData.amount) * 0.15).toFixed(2) : '0.00';
  const totalAmount = transferData.amount ? (parseFloat(transferData.amount) + parseFloat(transferFee)).toFixed(2) : '0.00';

  return (
    <div className="min-h-screen bg-white">
      {/* Payment Loading Overlay */}
      {isPaymentLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 mx-4 max-w-sm w-full text-center">
            <div className="relative mb-4">
              {/* Spinner */}
              <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto"></div>
              {/* MonCash Icon in the center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment</h3>
            <p className="text-sm text-gray-600">Connecting to MonCash...</p>
          </div>
        </div>
      )}

      {/* Header with reduced height, back button (chevron), step title, and close button */}
      <div className="bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between p-2 h-12">
          <button 
            onClick={handleBackClick}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex-1 flex justify-center">
            <h1 className="text-lg font-semibold text-gray-900">
              Local {stepTitles[currentStep - 1]}
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
                          <Smartphone className="h-3 w-3" />
                        ) : (
                          <Shield className="h-3 w-3" />
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
                <p className="text-gray-600">Enter the amount in HTG you want to send locally</p>
              </div>
              
              <StepOneLocalTransfer 
                amount={transferData.amount}
                onAmountChange={(amount) => updateTransferData({ amount })}
              />
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-600">Who are you sending {transferData.amount} HTG to locally?</p>
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
                  Sending <span className="font-semibold text-blue-600">{transferData.amount} HTG</span> to{' '}
                  <span className="font-semibold text-gray-900">
                    {transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}
                  </span>
                </p>
              </div>
              
              {/* Error Display */}
              {paymentError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 text-red-600 mt-0.5">⚠️</div>
                    <div>
                      <h4 className="font-medium text-red-900 mb-1">Payment Error</h4>
                      <p className="text-sm text-red-700">{paymentError}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* MonCash Payment Section */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Smartphone className="h-8 w-8 text-red-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800">MonCash Payment</h3>
                    <p className="text-sm text-red-600">Mobile money service by Digicel</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount to send:</span>
                    <span className="font-medium">{transferData.amount} HTG</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transfer fee (15%):</span>
                    <span className="font-medium">{transferFee} HTG</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total to pay:</span>
                      <span className="text-red-600">{totalAmount} HTG</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-2 text-gray-800">Payment Instructions:</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Click "Pay with MonCash" below</li>
                    <li>2. You'll be redirected to MonCash</li>
                    <li>3. Enter your MonCash PIN</li>
                    <li>4. Confirm the payment</li>
                    <li>5. Return here to see your receipt</li>
                  </ol>
                </div>
              </div>

              {/* Payment Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleMonCashPayment}
                  disabled={isPaymentLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold disabled:opacity-50"
                >
                  {isPaymentLoading ? 'Processing...' : `Pay ${totalAmount} HTG with MonCash`}
                </Button>
                
                {/* Demo/Testing Button - Show more prominently if there's an error */}
                <Button 
                  onClick={simulatePaymentCompletion}
                  variant={paymentError ? "default" : "outline"}
                  className={`w-full text-sm ${paymentError ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
                >
                  {paymentError ? 'Complete Payment (Demo Mode)' : 'Demo: Complete Payment (Testing)'}
                </Button>
                
                {paymentError && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Use demo mode while MonCash service is unavailable
                  </p>
                )}
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-4">              
              <div 
                ref={receiptRef}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Receipt className="h-5 w-5 mr-2" />
                    Local Transfer Receipt
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
                      <span className="font-medium text-right max-w-xs">{transferData.receiverDetails.commune}, {transferData.receiverDetails.department}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount Sent</span>
                      <span className="font-medium">{transferData.amount} HTG</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Transfer Fee (15%)</span>
                      <span className="font-medium">{transferFee} HTG</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t pt-2">
                      <span>Total Paid</span>
                      <span className="text-blue-600">{totalAmount} HTG</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium">MonCash</span>
                    </div>
                  </div>

                  {userEmail && (
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Confirmation Email</span>
                        <span className="font-medium">{userEmail}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 mt-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Local Transfer Information</h4>
                      <p className="text-sm text-green-700 mt-1">
                        The recipient will receive the funds within 2-4 hours. They will be notified via SMS when the money is ready for pickup.
                      </p>
                      {userEmail && (
                        <p className="text-sm text-green-700 mt-1">
                          A confirmation email has been sent to {userEmail}.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={generateReceiptImage}
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

      {/* Sticky Navigation Buttons - Exclude step 3 */}
      {(currentStep < 3 || currentStep === 4) && (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-white px-4 py-3 z-50 shadow-lg">
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
                
                {currentStep < 4 ? (
                  <Button 
                    onClick={handleNextStep}
                    disabled={
                      (currentStep === 2 && !canProceedFromStep2) ||
                      (currentStep === 3 && !canProceedFromStep3)
                    }
                    className="flex-1 transition-all duration-200"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={() => navigate('/for-you')}
                    className="flex-1"
                  >
                    Done
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileLocalTransferSheetPage;
