
import React, { useState } from 'react';
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
import { Loader2, AlertCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

// Backend API URLs as explicit string types
const MONCASH_BACKEND_URL: string = 'https://moncash-backend.onrender.com';
const PAYPAL_BACKEND_URL: string = 'https://paypal-backend-9mw4.onrender.com';

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

  // Handle Credit Card payment via PayPal backend
  const handleCreditCardPayment = async () => {
    if (transferType !== 'international' || selectedMethod.id !== 'credit-card') {
      return onContinue();
    }

    setIsProcessing(true);
    
    try {
      // Get the base URL for the current site to use for return/cancel URLs
      const baseUrl = window.location.origin;
      
      // Create order via PayPal backend
      const response = await fetch(`${PAYPAL_BACKEND_URL}/api/paypal/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount).toFixed(2),
          currency: 'USD',
          returnUrl: `${baseUrl}/transfer/success`,
          cancelUrl: `${baseUrl}/transfer/cancel`,
          description: 'Money transfer payment',
          brandName: 'Money Transfer Service'
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment');
      }
      
      const data = await response.json();
      console.log('Payment order created:', data);
      
      // Find the approval URL to redirect the user to PayPal Checkout
      const approvalLink = data.links && data.links.find((link: any) => link.rel === 'approve');
      
      if (approvalLink && approvalLink.href) {
        // Redirect to PayPal checkout
        window.location.href = approvalLink.href;
      } else {
        throw new Error('No approval URL found in PayPal response');
      }
      
    } catch (error) {
      console.error('Credit card payment error:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to process credit card payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  // Handle payment method selection and routing
  const handlePaymentContinue = () => {
    if (transferType === 'national' && selectedMethod.id === 'moncash') {
      return handleMonCashPayment();
    } else if (transferType === 'international' && selectedMethod.id === 'credit-card') {
      return handleCreditCardPayment();
    } else {
      return onContinue();
    }
  };

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
            transferType === 'national' && selectedMethod.id === 'moncash' ? 
              'Continue to MonCash' : 
                transferType === 'international' && selectedMethod.id === 'credit-card' ?
                  'Continue to Payment' : 'Continue to Payment'
          )}
        </Button>
        <DrawerClose asChild>
          <Button variant="outline" disabled={isLoading || isProcessing}>Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default TransferConfirmationDrawer;
