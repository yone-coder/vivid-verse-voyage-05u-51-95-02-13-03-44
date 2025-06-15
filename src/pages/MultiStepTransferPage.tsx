
import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import TransferHeader from '@/components/transfer/TransferHeader';
import TransferTypeSelector from '@/components/transfer/TransferTypeSelector';
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';
import StepThreeTransfer from '@/components/transfer/StepThreeTransfer';

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
}

interface MultiStepTransferPageProps {
  isEmbedded?: boolean;
}

const MultiStepTransferPage: React.FC<MultiStepTransferPageProps> = ({ isEmbedded = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  // Initialize state from navigation or default values
  const locationState = location.state as any;
  const initialStep = locationState?.skipToStep ?? 0;
  const initialAmount = locationState?.amount ?? '';
  const initialTransferType = locationState?.transferType === 'international' ? 'international' : 'national';
  
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [transferData, setTransferData] = useState<TransferData>({
    transferType: initialTransferType,
    amount: initialAmount,
    receiverDetails: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      department: 'Artibonite',
      commune: '',
    }
  });

  // Auto-advance to step 1 if amount is pre-filled
  useEffect(() => {
    if (initialAmount && parseFloat(initialAmount) > 0 && initialStep === 1) {
      setCurrentStep(1);
    }
  }, [initialAmount, initialStep]);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (!isEmbedded) {
      navigate('/transfer');
    }
  };

  const updateTransferData = (data: Partial<TransferData>) => {
    setTransferData(prev => ({ ...prev, ...data }));
  };

  const handleMonCashPayment = async () => {
    if (!transferData.amount || !transferData.receiverDetails.firstName) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingPayment(true);

    try {
      // First get the access token
      const tokenResponse = await fetch('https://moncash-backend.onrender.com/api/get-token', {
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

      // Create payment with access token
      const orderId = `TX${Date.now()}`;
      const paymentResponse = await fetch('https://moncash-backend.onrender.com/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken,
          amount: transferData.amount,
          orderId
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
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to process MonCash payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessingPayment(false);
    }
  };

  const canProceedFromStep0 = transferData.transferType !== undefined;
  const canProceedFromStep1 = transferData.amount && parseFloat(transferData.amount) > 0;
  const canProceedFromStep2 = transferData.receiverDetails.firstName && 
                              transferData.receiverDetails.lastName && 
                              transferData.receiverDetails.phoneNumber && 
                              transferData.receiverDetails.commune;

  const NavigationButtons = (
    <div className={isEmbedded ? "bg-white p-4" : "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4"}>
      <div className="max-w-md mx-auto flex gap-3">
        <Button 
          variant="outline" 
          onClick={handlePreviousStep}
          className="flex-1"
          disabled={isEmbedded && currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {currentStep === 0 && !isEmbedded ? 'Back to Home' : 'Previous'}
        </Button>
        
        {currentStep < 3 && (
          <Button 
            onClick={handleNextStep}
            disabled={
              (currentStep === 0 && !canProceedFromStep0) ||
              (currentStep === 1 && !canProceedFromStep1) || 
              (currentStep === 2 && !canProceedFromStep2)
            }
            className="flex-1"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className={isEmbedded ? "" : "min-h-screen bg-gray-50 pb-20"}>
      {!isEmbedded && <TransferHeader />}
      
      {/* Step Indicator */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-center mb-6">
          {[0, 1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === currentStep 
                  ? 'bg-blue-600 text-white' 
                  : step < currentStep 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
              }`}>
                {step + 1}
              </div>
              {step < 3 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  step < currentStep ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold">
            {currentStep === 0 && 'Transfer Type'}
            {currentStep === 1 && 'Enter Amount'}
            {currentStep === 2 && 'Recipient Details'}
            {currentStep === 3 && 'Payment'}
          </h2>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-md mx-auto px-4">
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-gray-600">Choose your transfer type</p>
            </div>
            <TransferTypeSelector 
              transferType={transferData.transferType || 'international'}
              onTransferTypeChange={(type) => updateTransferData({ transferType: type })}
            />
          </div>
        )}

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
              <h3 className="text-lg font-semibold">Payment Details</h3>
              <p className="text-gray-600">
                {transferData.transferType === 'national' 
                  ? `Complete your HTG ${(parseFloat(transferData.amount || '0') * 127.5).toFixed(2)} transfer`
                  : `Complete your $${transferData.amount} transfer`
                }
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Recipient:</span>
                <span className="font-medium">
                  {transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">
                  {transferData.transferType === 'national' 
                    ? `HTG ${(parseFloat(transferData.amount || '0') * 127.5).toFixed(2)}`
                    : `$${transferData.amount}`
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transfer Type:</span>
                <span className="font-medium capitalize">
                  {transferData.transferType}
                </span>
              </div>
            </div>

            {/* Payment Method Based on Transfer Type */}
            {transferData.transferType === 'national' ? (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">MonCash Payment</h4>
                  <p className="text-sm text-red-700 mb-3">
                    You will be redirected to MonCash to complete your payment securely.
                  </p>
                  <ul className="text-sm text-red-600 space-y-1">
                    <li>• Make sure you have your MonCash account ready</li>
                    <li>• Have sufficient funds in your MonCash wallet</li>
                    <li>• Complete the payment on MonCash website</li>
                    <li>• You will be redirected back after payment</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={handleMonCashPayment}
                  disabled={isProcessingPayment}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  size="lg"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing MonCash Payment...
                    </>
                  ) : (
                    'Pay with MonCash'
                  )}
                </Button>
              </div>
            ) : (
              <StepThreeTransfer 
                amount={transferData.amount}
                onPaymentSuccess={() => {
                  console.log('Payment successful for', transferData.transferType, 'transfer');
                  // Handle payment success
                }}
              />
            )}
          </div>
        )}
      </div>

      {NavigationButtons}
    </div>
  );
};

export default MultiStepTransferPage;
