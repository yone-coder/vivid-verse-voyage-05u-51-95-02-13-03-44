import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PaymentMethod } from './PaymentMethodItem';
import { Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { PAYPAL_BACKEND_URL } from './PaymentMethods';
import ReceiverDetailsForm, { ReceiverDetails } from './ReceiverDetailsForm';
import PayPalButton from './PayPalButton';

// Backend API URLs as explicit string types
const MONCASH_BACKEND_URL: string = 'https://moncash-backend.onrender.com';

interface TransferConfirmationDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  selectedMethod: PaymentMethod | undefined;
  transferType: 'international' | 'national';
  currencySymbol: string;
  onContinue: () => void;
  isLoading?: boolean;
}

const TransferConfirmationDrawer: React.FC<TransferConfirmationDrawerProps> = ({
  isOpen,
  onOpenChange,
  amount,
  selectedMethod,
  transferType,
  currencySymbol,
  onContinue,
  isLoading = false
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiverDetails, setReceiverDetails] = useState<ReceiverDetails | null>(null);
  const [step, setStep] = useState<'summary' | 'receiverDetails' | 'confirmation'>('summary');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  if (!selectedMethod) return null;

  // Check if the selected method is available
  const isMethodAvailable = selectedMethod.available !== false;

  // If method is unavailable, show an error message
  if (!isMethodAvailable) {
    return (
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Payment Method Unavailable</DrawerTitle>
          <DrawerDescription>
            {selectedMethod.unavailableReason || "This payment method is currently unavailable."}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-6 flex flex-col items-center">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <p className="text-center text-gray-700">
            Please select MonCash as your payment method for national transfers at this time.
          </p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Go Back</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    );
  }

  // Calculate fees based on method and transfer type
  const calculateFee = () => {
    if (transferType === 'international') {
      switch (selectedMethod.id) {
        case 'zelle': return `${currencySymbol}0.00`;
        case 'bank-transfer': return `${currencySymbol}0.25`;
        case 'cashapp': return `${currencySymbol}${(parseFloat(amount) * 0.015).toFixed(2)}`;
        case 'paypal': return `${currencySymbol}${((parseFloat(amount) * 0.029) + 0.3).toFixed(2)}`;
        default: return `${currencySymbol}${((parseFloat(amount) * 0.035) + 0.3).toFixed(2)}`;
      }
    } else {
      // New fee structure for national transfers based on amount ranges
      const amountNum = parseFloat(amount);

      if (amountNum >= 1000 && amountNum <= 1999) {
        return '65 HTG';
      } else if (amountNum >= 2000 && amountNum <= 3999) {
        return '115 HTG';
      } else if (amountNum >= 4000 && amountNum <= 7999) {
        return '185 HTG';
      } else if (amountNum >= 8000 && amountNum <= 11999) {
        return '275 HTG';
      } else {
        // For amounts outside the specified ranges, keep the original logic
        switch (selectedMethod.id) {
          case 'moncash': return `${Math.max(5, parseFloat(amount) * 0.01).toFixed(2)} HTG`;
          case 'natcash': return `${Math.max(3, parseFloat(amount) * 0.005).toFixed(2)} HTG`;
          default: return '10 HTG';
        }
      }
    }
  };

  // Calculate total with the updated fee structure
  const calculateTotal = () => {
    if (transferType === 'international') {
      switch (selectedMethod.id) {
        case 'zelle': return `${currencySymbol}${amount}`;
        case 'bank-transfer': return `${currencySymbol}${(parseFloat(amount) + 0.25).toFixed(2)}`;
        case 'cashapp': return `${currencySymbol}${(parseFloat(amount) * 1.015).toFixed(2)}`;
        case 'paypal': return `${currencySymbol}${(parseFloat(amount) + ((parseFloat(amount) * 0.029) + 0.3)).toFixed(2)}`;
        default: return `${currencySymbol}${(parseFloat(amount) + ((parseFloat(amount) * 0.035) + 0.3)).toFixed(2)}`;
      }
    } else {
      const amountNum = parseFloat(amount);
      let fee = 0;

      // Calculate fee based on the new structure
      if (amountNum >= 1000 && amountNum <= 1999) {
        fee = 65;
      } else if (amountNum >= 2000 && amountNum <= 3999) {
        fee = 115;
      } else if (amountNum >= 4000 && amountNum <= 7999) {
        fee = 185;
      } else if (amountNum >= 8000 && amountNum <= 11999) {
        fee = 275;
      } else {
        // For amounts outside the specified ranges, keep the original logic
        switch (selectedMethod.id) {
          case 'moncash': fee = Math.max(5, amountNum * 0.01); break;
          case 'natcash': fee = Math.max(3, amountNum * 0.005); break;
          default: fee = 10; break;
        }
      }

      return `${(amountNum + fee).toFixed(2)} HTG`;
    }
  };

  // Handle MonCash payment process
  const handleMonCashPayment = async () => {
    if (transferType !== 'national' || selectedMethod.id !== 'moncash') {
      // For non-MonCash payments, use the regular flow
      onContinue();
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Get access token
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

      // Step 2: Create payment and get redirect URL
      const paymentResponse = await fetch(`${MONCASH_BACKEND_URL}/api/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          accessToken,
          amount: parseFloat(amount)
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

      // Step 3: Redirect to MonCash payment page
      window.location.href = paymentData.paymentUrl;

    } catch (error) {
      console.error('MonCash payment error:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to process MonCash payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  // Handle PayPal payment success
  const handlePayPalSuccess = (details: any) => {
    toast({
      title: "Payment Successful!",
      description: `Your payment of ${currencySymbol}${amount} has been processed successfully.`,
      variant: "default",
    });
    
    // Close the drawer and reset
    onOpenChange(false);
    setStep('summary');
    setReceiverDetails(null);
  };

  // Handle PayPal payment error
  const handlePayPalError = (error: any) => {
    console.error('PayPal error:', error);
    setIsProcessing(false);
    setPaymentError(error instanceof Error ? error.message : "An error occurred with PayPal. Please try again.");
    toast({
      title: "PayPal Error",
      description: "An error occurred with PayPal. Please try again or use another payment method.",
      variant: "destructive",
    });
  };

  // Validate receiver details for international transfers
  const isReceiverDetailsValid = () => {
    if (!receiverDetails) return false;

    const { fullName, phoneNumber, address } = receiverDetails;
    return fullName.trim() !== '' && phoneNumber.trim() !== '' && address.trim() !== '';
  };

  // Handle payment method selection and routing
  const handlePaymentContinue = () => {
    if (transferType === 'international') {
      // For international transfers, go to receiver details first
      setStep('receiverDetails');
    } else if (transferType === 'national' && selectedMethod.id === 'moncash') {
      return handleMonCashPayment();
    } else {
      return onContinue();
    }
  };

  // Render summary step
  if (step === 'summary') {
    return (
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Confirm Money Transfer</DrawerTitle>
          <DrawerDescription>
            You're about to send {currencySymbol}{amount} to Haiti using {selectedMethod.name}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <div className="rounded-lg border p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Amount:</span>
              <span className="font-medium">{currencySymbol}{amount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Fee:</span>
              <span className="font-medium">{calculateFee()}</span>
            </div>
            <div className="border-t my-2"></div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{calculateTotal()}</span>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button 
            onClick={handlePaymentContinue} 
            disabled={isLoading || isProcessing}
          >
            {isLoading || isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              transferType === 'international' ? 
                'Continue to Receiver Details' : 
                transferType === 'national' && selectedMethod.id === 'moncash' ? 
                  'Continue to MonCash' : 'Continue to Payment'
            )}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" disabled={isLoading || isProcessing}>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    );
  }

  // Render receiver details step
  if (step === 'receiverDetails') {
    return (
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Receiver Details</DrawerTitle>
          <DrawerDescription>
            Please provide details about who will receive the money in Haiti
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <ReceiverDetailsForm 
            onDetailsChange={setReceiverDetails} 
            amount={amount} 
          />
        </div>
        <DrawerFooter>
          <Button 
            onClick={() => setStep('confirmation')} 
            disabled={!isReceiverDetailsValid()}
          >
            Continue to Payment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => setStep('summary')}>
            Back
          </Button>
        </DrawerFooter>
      </DrawerContent>
    );
  }

  // Render confirmation step with PayPal integration
  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Complete Payment</DrawerTitle>
        <DrawerDescription>
          Review your transfer details and complete the payment
        </DrawerDescription>
      </DrawerHeader>
      <div className="px-4">
        <div className="rounded-lg border p-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Amount:</span>
            <span className="font-medium">{currencySymbol}{amount}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Fee:</span>
            <span className="font-medium">{calculateFee()}</span>
          </div>
          <div className="border-t my-2"></div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{calculateTotal()}</span>
          </div>
        </div>

        {receiverDetails && (
          <div className="rounded-lg border p-4 mb-4">
            <h4 className="font-medium mb-2">Receiver Details</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-500">Name:</span> {receiverDetails.fullName}</p>
              <p><span className="text-gray-500">Phone:</span> {receiverDetails.phoneNumber}</p>
              <p><span className="text-gray-500">Address:</span> {receiverDetails.address}</p>
              {receiverDetails.additionalInfo && (
                <p><span className="text-gray-500">Additional Info:</span> {receiverDetails.additionalInfo}</p>
              )}
            </div>
          </div>
        )}

        {/* PayPal Payment Component */}
        {transferType === 'international' && selectedMethod.id === 'credit-card' && (
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">
              Complete your payment securely with PayPal:
            </div>
            <PayPalButton
              amount={amount}
              currency={currencySymbol === '$' ? 'USD' : 'HTG'}
              onSuccess={handlePayPalSuccess}
              onError={handlePayPalError}
            />
            {paymentError && (
              <div className="mt-2 text-xs text-red-500 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {paymentError}
              </div>
            )}
          </div>
        )}
      </div>
      <DrawerFooter>
        <Button variant="outline" onClick={() => setStep('receiverDetails')}>
          Back to Receiver Details
        </Button>
        <DrawerClose asChild>
          <Button variant="outline" disabled={isProcessing}>Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default TransferConfirmationDrawer;
