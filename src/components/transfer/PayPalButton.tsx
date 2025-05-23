
import React, { useState, useEffect } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Button } from "@/components/ui/button";
import { Check, RefreshCw, AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { PAYPAL_BACKEND_URL } from './PaymentMethods';

// Define the PayPal global object type
declare global {
  interface Window {
    paypal?: {
      Buttons?: any;
      [key: string]: any;
    };
  }
}

interface PayPalButtonProps {
  amount: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
  currency?: string;
  showFallbackButton?: boolean;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  onSuccess,
  onError,
  currency = 'USD',
  showFallbackButton = true
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderID, setOrderID] = useState<string | null>(null);

  const createOrder = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      throw new Error("Invalid amount");
    }

    try {
      setLoading(true);
      setError(null);

      // Create order on the server
      const response = await fetch(`${PAYPAL_BACKEND_URL}/create-paypal-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: currency,
        }),
      });

      const orderData = await response.json();
      
      if (!response.ok) {
        throw new Error(orderData.message || "Failed to create PayPal order");
      }

      const { id } = orderData;
      setOrderID(id);
      return id;
    } catch (err) {
      console.error("Error creating PayPal order:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to create PayPal order";
      setError(errorMessage);
      onError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const onApprove = async (data: any) => {
    try {
      setLoading(true);
      
      // Call server to capture the order
      const response = await fetch(`${PAYPAL_BACKEND_URL}/capture-paypal-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });

      const orderData = await response.json();
      
      if (!response.ok) {
        throw new Error(orderData.message || "Failed to capture PayPal order");
      }

      console.log("Capture result", orderData);
      
      // Check if the payment was completed
      const captureDetails = orderData.purchase_units[0].payments.captures[0];
      if (captureDetails.status === "COMPLETED") {
        toast({
          title: "Payment Successful",
          description: `Your payment of ${currency} ${amount} was completed successfully.`,
          variant: "default",
        });
        onSuccess(orderData);
      } else {
        throw new Error(`Payment not completed. Status: ${captureDetails.status}`);
      }
      
      return orderData;
    } catch (err) {
      console.error("Error capturing PayPal order:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to process payment";
      setError(errorMessage);
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      });
      onError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDirectPayment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Direct payment through our backend
      const response = await fetch(`${PAYPAL_BACKEND_URL}/direct-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: currency,
        }),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to process payment");
      }
      
      toast({
        title: "Payment Initiated",
        description: "Your payment has been initiated. You will be redirected to complete it.",
        variant: "default",
      });
      
      // If there's a redirect URL, navigate to it
      if (responseData.redirectUrl) {
        window.location.href = responseData.redirectUrl;
      } else {
        // If no redirect, consider it successful
        onSuccess(responseData);
      }
      
    } catch (err) {
      console.error("Error with direct payment:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to process payment";
      setError(errorMessage);
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      });
      onError(err);
    } finally {
      setLoading(false);
    }
  };

  // Always show the direct payment button since PayPal buttons are not working reliably
  return (
    <div className="space-y-3">
      <Button 
        onClick={handleDirectPayment} 
        disabled={loading} 
        className="w-full bg-blue-500 hover:bg-blue-600"
      >
        {loading ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>Pay ${amount} with PayPal</>
        )}
      </Button>
      
      {error && (
        <div className="text-xs text-red-500 flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {error}
        </div>
      )}
      
      {loading && (
        <div className="flex justify-center items-center mt-2">
          <RefreshCw className="h-4 w-4 animate-spin mr-1" />
          <span className="text-xs">Processing your payment...</span>
        </div>
      )}
      
      {orderID && !loading && (
        <div className="flex items-center justify-center text-xs text-green-600 mt-2">
          <Check className="h-3 w-3 mr-1" />
          Order created successfully
        </div>
      )}
    </div>
  );
};

export default PayPalButton;
