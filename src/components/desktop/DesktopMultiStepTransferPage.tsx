import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import { ArrowLeft, ArrowRight, History, Route, MapPin, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransferTypeSelector from '@/components/transfer/TransferTypeSelector';
import { EmailNotificationService } from '@/components/transfer/EmailNotificationService';
import PaymentLoadingOverlay from '@/components/transfer/PaymentLoadingOverlay';
import StepIndicator from '@/components/transfer/StepIndicator';
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepOneLocalTransfer from '@/components/transfer/StepOneLocalTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';
import PaymentMethodSelector from '@/components/transfer/PaymentMethodSelector';
import TransferReceipt from '@/components/transfer/TransferReceipt';
import TransferHistoryPage from '@/pages/TransferHistoryPage';
import TrackTransferPage from '@/pages/TrackTransferPage';
import LocationsPage from '@/pages/LocationsPage';
import AccountPage from '@/pages/AccountPage';

export interface TransferData {
  transferType?: 'international' | 'national';
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

interface DesktopMultiStepTransferPageProps {
  defaultTransferType?: 'international' | 'national';
}

const DesktopMultiStepTransferPage: React.FC<DesktopMultiStepTransferPageProps> = ({
  defaultTransferType = 'international'
}) => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isPaymentFormValid, setIsPaymentFormValid] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const receiptRef = useRef<HTMLDivElement>(null);

  const [transferData, setTransferData] = useState<TransferData>({
    transferType: defaultTransferType,
    amount: '100.00',
    receiverDetails: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      department: 'Artibonite',
      commune: '',
      email: '',
    },
    selectedPaymentMethod: 'credit-card'
  });

  // Listen for email capture from PayPal form
  useEffect(() => {
    const handleEmailCapture = (event: any) => {
      setUserEmail(event.detail.email);
    };

    window.addEventListener('emailCaptured', handleEmailCapture);
    return () => window.removeEventListener('emailCaptured', handleEmailCapture);
  }, []);

  // MonCash payment handler for national transfers
  const handleMonCashPayment = async () => {
    if (!transferData.amount || !transferData.receiverDetails.firstName) {
      toast("Missing Information: Please complete all required fields before proceeding.");
      return;
    }

    setIsProcessingPayment(true);
    setIsPaymentLoading(true);

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
      toast("Payment Failed: " + (error instanceof Error ? error.message : "Failed to process MonCash payment. Please try again."));
      setIsProcessingPayment(false);
      setIsPaymentLoading(false);
    }
  };

  // Listen for payment success
  useEffect(() => {
    const handlePaymentSuccess = (event: any) => {
      console.log('Payment success event received:', event.detail);
      const orderDetails = event.detail.orderDetails;

      setPaymentCompleted(true);
      const actualTransactionId = orderDetails?.id || `TX${Date.now()}`;
      setTransactionId(actualTransactionId);
      setCurrentStep(4);
      setIsPaymentLoading(false);

      // Send email notification using the static service method
      if (userEmail) {
        setTimeout(() => {
          EmailNotificationService.sendTransferConfirmation(
            userEmail,
            transferData,
            actualTransactionId
          );
        }, 1000);
      }
    };

    window.addEventListener('paymentSuccess', handlePaymentSuccess);
    return () => window.removeEventListener('paymentSuccess', handlePaymentSuccess);
  }, [userEmail, transferData.amount, transferData.receiverDetails.firstName, transferData.receiverDetails.lastName, transferData.receiverDetails.commune, transferData.receiverDetails.phoneNumber]);

  // Listen for form validation changes
  useEffect(() => {
    const handleFormValidation = (event: any) => {
      setIsPaymentFormValid(event.detail.isValid);
    };

    window.addEventListener('paymentFormValidation', handleFormValidation);
    return () => window.removeEventListener('paymentFormValidation', handleFormValidation);
  }, []);

  // Listen for payment errors to stop loading overlay
  useEffect(() => {
    const handlePaymentError = (event: any) => {
      console.log('Payment error detected:', event.detail.message);
      setIsPaymentLoading(false);
    };

    window.addEventListener('paymentError', handlePaymentError);
    return () => window.removeEventListener('paymentError', handlePaymentError);
  }, []);

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
              text: `Transfer of $${transferData.amount} to ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName} completed successfully. Transaction ID: ${transactionId}`,
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
            text: `Transfer of $${transferData.amount} to ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName} completed successfully. Transaction ID: ${transactionId}`,
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

  // Define canProceed logic for each step
  const canProceedFromStep1 = Boolean(transferData.amount && parseFloat(transferData.amount) > 0);
  const canProceedFromStep2 = Boolean(
    transferData.receiverDetails.firstName &&
    transferData.receiverDetails.lastName &&
    transferData.receiverDetails.phoneNumber &&
    transferData.receiverDetails.commune
  );
  const canProceedFromStep3 = Boolean(
    transferData.selectedPaymentMethod !== undefined && 
    transferData.selectedPaymentMethod !== ''
  );

  // Calculate canProceed based on current step
  const canProceed = Boolean(
    (currentStep === 1 && canProceedFromStep1) ||
    (currentStep === 2 && canProceedFromStep2) ||
    (currentStep === 3 && canProceedFromStep3)
  );

  const handlePayment = async () => {
    if (transferData.transferType === 'national') {
      // Handle MonCash payment for national transfers
      await handleMonCashPayment();
    } else {
      // Handle PayPal payment for international transfers
      setIsPaymentLoading(true);

      try {
        // Trigger the PayPal form submission
        const cardForm = document.querySelector("#card-form") as HTMLFormElement;
        if (cardForm) {
          const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
          cardForm.dispatchEvent(submitEvent);
        }
      } catch (error) {
        console.error('Payment failed:', error);
        setIsPaymentLoading(false);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Money</h2>
              <p className="text-gray-600">Enter the amount you want to send</p>
            </div>

            <TransferTypeSelector
              transferType={transferData.transferType || 'international'}
              onTransferTypeChange={(type) => updateTransferData({ transferType: type })}
              disableNavigation={true}
            />

            {transferData.transferType === 'national' ? (
              <StepOneLocalTransfer
                amount={transferData.amount}
                onAmountChange={(amount) => updateTransferData({ amount })}
              />
            ) : (
              <StepOneTransfer
                amount={transferData.amount}
                onAmountChange={(amount) => updateTransferData({ amount })}
              />
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipient Details</h2>
              <p className="text-gray-600">Who are you sending ${transferData.amount} to?</p>
            </div>

            <StepTwoTransfer
              receiverDetails={transferData.receiverDetails}
              onDetailsChange={(receiverDetails) => updateTransferData({ receiverDetails })}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Method</h2>
              <p className="text-gray-600">Choose how you'd like to pay</p>
            </div>

            <PaymentMethodSelector
              transferData={transferData}
              onPaymentSubmit={handlePayment}
              isPaymentLoading={isPaymentLoading}
              isPaymentFormValid={isPaymentFormValid}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-2">Transfer Complete!</h2>
              <p className="text-gray-600">Your money transfer has been processed successfully</p>
            </div>

            <TransferReceipt
              ref={receiptRef}
              transferData={transferData}
              transactionId={transactionId}
              userEmail={userEmail}
            />

            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={generateReceiptImage}
                className="px-8"
              >
                Share Receipt
              </Button>
              <Button
                onClick={() => navigate('/for-you')}
                className="px-8"
              >
                Done
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PaymentLoadingOverlay isVisible={isPaymentLoading} />

      {/* Header */}
      <div className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-center">GLOBAL TRANSFÈ</h1>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Left Column - Transfer Process */}
          <div className="space-y-6">
            {/* Step Indicator */}
            <StepIndicator currentStep={currentStep} />

            {/* Main Transfer Card */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                {renderStepContent()}
              </CardContent>

              {/* Navigation Footer */}
              {currentStep < 4 && (
                <div className="border-t bg-gray-50 px-8 py-6 flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="text-sm text-gray-500">
                    Step {currentStep} of 4
                  </div>

                  <Button
                    onClick={currentStep === 3 ? handlePayment : handleNextStep}
                    disabled={!canProceed || isPaymentLoading}
                    className="flex items-center gap-2"
                  >
                    {currentStep === 3 ? 'Complete Payment' : 'Continue'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Middle Column - First Two Sections */}
          <div className="space-y-6">
            {/* Transfer History Section */}
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <History className="h-5 w-5" />
                  Transfer History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-80 overflow-y-auto">
                  <TransferHistoryPage />
                </div>
              </CardContent>
            </Card>

            {/* Track Transfer Section */}
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Route className="h-5 w-5" />
                  Track Transfer
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-64 overflow-y-auto">
                  <TrackTransferPage />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Last Two Sections */}
          <div className="space-y-6">
            {/* Locations Section */}
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5" />
                  Our Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  <LocationsPage />
                </div>
              </CardContent>
            </Card>

            {/* Account Section */}
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  <AccountPage />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopMultiStepTransferPage;
