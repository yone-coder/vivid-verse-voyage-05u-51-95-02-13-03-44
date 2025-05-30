
import React, { useState } from 'react';
import { CreditCard, Smartphone, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface StepThreeTransferProps {
  amount: string;
  transferType?: 'international' | 'national';
}

// Backend API URLs
const MONCASH_BACKEND_URL: string = 'https://moncash-backend.onrender.com';
const PAYPAL_BACKEND_URL: string = 'https://paypal-with-nodejs.onrender.com';

const StepThreeTransfer: React.FC<StepThreeTransferProps> = ({ amount, transferType = 'international' }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const currencySymbol = transferType === 'international' ? '$' : 'HTG ';
  const paymentMethod = transferType === 'international' ? 'Credit/Debit Card' : 'MonCash';
  const PaymentIcon = transferType === 'international' ? CreditCard : Smartphone;

  // Handle MonCash payment process
  const handleMonCashPayment = async () => {
    setIsProcessing(true);

    try {
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

  // Handle PayPal credit card payment
  const handleCreditCardPayment = async () => {
    setIsProcessing(true);

    try {
      console.log('Creating PayPal order for credit card payment...');

      const response = await fetch(`${PAYPAL_BACKEND_URL}/api/paypal/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: 'USD',
          description: `Transfer payment of $${amount}`
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create PayPal order');
      }

      const orderData = await response.json();
      console.log('PayPal order created:', orderData);

      // Find the approval URL from PayPal response
      const approvalUrl = orderData.links?.find((link: any) => 
        link.rel === 'approve' || link.rel === 'payer-action'
      )?.href;

      if (!approvalUrl) {
        console.error('Available links:', orderData.links);
        throw new Error('No approval URL received from PayPal');
      }

      // Redirect to PayPal for payment
      window.location.href = approvalUrl;

    } catch (error) {
      console.error('PayPal payment error:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to process credit card payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  // Handle payment method selection and routing
  const handleCompletePayment = () => {
    if (transferType === 'international') {
      handleCreditCardPayment();
    } else {
      handleMonCashPayment();
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
            Processing...
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
