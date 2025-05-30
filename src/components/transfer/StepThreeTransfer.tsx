
import React, { useState } from 'react';
import { CreditCard, Smartphone, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Backend API URL for MonCash
const MONCASH_BACKEND_URL: string = 'https://moncash-backend.onrender.com';

interface StepThreeTransferProps {
  amount: string;
  transferType?: 'international' | 'national';
}

const StepThreeTransfer: React.FC<StepThreeTransferProps> = ({ amount, transferType = 'international' }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const currencySymbol = transferType === 'international' ? '$' : 'HTG ';
  const paymentMethod = transferType === 'international' ? 'Credit/Debit Card' : 'MonCash';
  const PaymentIcon = transferType === 'international' ? CreditCard : Smartphone;

  // Handle MonCash payment process
  const handleMonCashPayment = async () => {
    if (transferType !== 'national') {
      toast({
        title: "Payment Method Not Available",
        description: "MonCash is only available for national transfers.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Getting MonCash access token...');
      
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

      console.log('Creating MonCash payment...');

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

      console.log('Redirecting to MonCash payment URL...');
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

  // Handle payment button click
  const handleCompletePayment = () => {
    if (transferType === 'national') {
      handleMonCashPayment();
    } else {
      // For international transfers, show a message or handle differently
      toast({
        title: "Payment Method",
        description: "International payment processing will be implemented soon.",
        variant: "default",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Payment Confirmation</h2>
        <p className="text-gray-600 text-sm">
          Review your transfer details and complete the payment.
        </p>
      </div>

      {/* Transfer Summary */}
      <div className="bg-white rounded-lg p-4 shadow-sm border space-y-4">
        <h3 className="font-medium text-gray-800 border-b pb-2">Transfer Summary</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Transfer Type:</span>
            <span className="font-medium capitalize">{transferType}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">{currencySymbol}{amount}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <div className="flex items-center">
              <PaymentIcon className="h-4 w-4 mr-1" />
              <span className="font-medium">{paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <Button 
        className="w-full" 
        size="lg"
        onClick={handleCompletePayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing MonCash Payment...
          </>
        ) : (
          `Complete Payment (${currencySymbol}${amount})`
        )}
      </Button>

      {/* Security Notice */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <h4 className="font-medium text-gray-800 mb-2">Security Information:</h4>
        <ul className="space-y-1">
          <li>• Your payment is secured with end-to-end encryption</li>
          <li>• Transaction will be processed within 24-48 hours</li>
          <li>• You will receive a confirmation email</li>
        </ul>
      </div>
    </div>
  );
};

export default StepThreeTransfer;
