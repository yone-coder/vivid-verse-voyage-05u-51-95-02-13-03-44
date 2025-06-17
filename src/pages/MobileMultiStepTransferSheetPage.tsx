import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import TransferTypeSelector from '@/components/transfer/TransferTypeSelector';
import { EmailNotificationService } from '@/components/transfer/EmailNotificationService';
import IndexBottomNav from '@/components/layout/IndexBottomNav';
import PaymentLoadingOverlay from '@/components/transfer/PaymentLoadingOverlay';
import TransferHeader from '@/components/transfer/TransferHeader';
import StepIndicator from '@/components/transfer/StepIndicator';
import StepContent from '@/components/transfer/StepContent';

export interface TransferData {
  transferType?: 'international' | 'national';
  amount: string;
  transferDetails: {
    receivingCountry: string;
    deliveryMethod: string;
  };
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

interface MobileMultiStepTransferSheetPageProps {
  defaultTransferType?: 'international' | 'national';
}

const MobileMultiStepTransferSheetPage: React.FC<MobileMultiStepTransferSheetPageProps> = ({
  defaultTransferType = 'international'
}) => {
  const navigate = useNavigate();
  const location = useLocation();

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
    transferDetails: {
      receivingCountry: '',
      deliveryMethod: ''
    },
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

  // Debug logging for step progression
  useEffect(() => {
    console.log(`Current step: ${currentStep}`);
    console.log('Transfer data:', transferData);
    console.log('Can proceed check:', canProceed);
  }, [currentStep, transferData]);

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
      setCurrentStep(7); // Fix: Set to step 7 instead of step 4
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
    console.log(`Attempting to move from step ${currentStep} to step ${currentStep + 1}`);
    console.log('Can proceed:', canProceed);
    
    if (currentStep < 7 && canProceed) {
      setCurrentStep(currentStep + 1);
      console.log(`Successfully moved to step ${currentStep + 1}`);
    } else {
      console.log(`Cannot proceed from step ${currentStep}. canProceed: ${canProceed}`);
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
    transferData.transferDetails.receivingCountry &&
    transferData.transferDetails.deliveryMethod
  );
  const canProceedFromStep3 = Boolean(
    transferData.receiverDetails.firstName &&
    transferData.receiverDetails.lastName &&
    transferData.receiverDetails.phoneNumber &&
    transferData.receiverDetails.commune
  );
  const canProceedFromStep4 = true; // Review step should always allow proceeding
  const canProceedFromStep5 = Boolean(
    transferData.selectedPaymentMethod !== undefined && 
    transferData.selectedPaymentMethod !== ''
  );
  const canProceedFromStep6 = Boolean(
    transferData.selectedPaymentMethod !== undefined && 
    transferData.selectedPaymentMethod !== ''
  );

  // Calculate canProceed based on current step
  const canProceed = Boolean(
    (currentStep === 1 && canProceedFromStep1) ||
    (currentStep === 2 && canProceedFromStep2) ||
    (currentStep === 3 && canProceedFromStep3) ||
    (currentStep === 4 && canProceedFromStep4) ||
    (currentStep === 5 && canProceedFromStep5) ||
    (currentStep === 6 && canProceedFromStep6)
  );

  // Debug logging for canProceed logic
  useEffect(() => {
    if (currentStep === 4) {
      console.log('Step 4 validation - canProceedFromStep4:', canProceedFromStep4);
      console.log('Overall canProceed:', canProceed);
    }
  }, [currentStep, canProceed, canProceedFromStep4]);

  // Handle sticky payment logic
  const handleStickyPayment = async () => {
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

  return (
    <div className="min-h-screen bg-white">
      <PaymentLoadingOverlay isVisible={isPaymentLoading} />

      {/* Header with blue background, GLOBAL TRANSFÈ, logo, and search icon */}
      <div className="sticky top-0 z-50">
        <TransferHeader />

        {/* Animated Step Indicator with white background and top spacing */}
        <StepIndicator currentStep={currentStep} />

        {/* Transfer Type Selector - Sticky below steps indicator - Only show on step 1 */}
        {currentStep === 1 && (
          <div className="bg-white">
            <TransferTypeSelector
              transferType={transferData.transferType || 'international'}
              onTransferTypeChange={(type) => updateTransferData({ transferType: type })}
              disableNavigation={true}
            />
          </div>
        )}
      </div>

      {/* Step Content - Reduced bottom padding since button is now in nav */}
      <div className="flex-1 overflow-y-auto pb-16">
        <StepContent
          currentStep={currentStep}
          transferData={transferData}
          updateTransferData={updateTransferData}
          onPaymentSubmit={handleStickyPayment}
          isPaymentLoading={isPaymentLoading}
          isPaymentFormValid={isPaymentFormValid}
          transactionId={transactionId}
          userEmail={userEmail}
          receiptRef={receiptRef}
          generateReceiptImage={generateReceiptImage}
        />
      </div>

      {/* Index Bottom Navigation with integrated continue button */}
      <IndexBottomNav
        showContinueButton={currentStep < 7}
        currentStep={currentStep}
        canProceed={canProceed}
        onContinue={currentStep === 6 ? handleStickyPayment : handleNextStep}
        onPrevious={handlePreviousStep}
        isPaymentLoading={isPaymentLoading}
        transferData={transferData}
        isPaymentFormValid={isPaymentFormValid}
      />
    </div>
  );
};

export default MobileMultiStepTransferSheetPage;
