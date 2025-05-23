
import React, { useState, useEffect } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Button } from "@/components/ui/button";
import { Check, RefreshCw, AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { PAYPAL_BACKEND_URL } from './PaymentMethods';

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
  const [paypalReady, setPaypalReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderID, setOrderID] = useState<string | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    // Check if PayPal script is loaded and ready
    const checkPayPalReady = () => {
      if (window.paypal && window.paypal.Buttons) {
        setPaypalReady(true);
        setSdkLoaded(true);
        console.log("PayPal SDK loaded successfully with Buttons API");
      } else if (window.paypal) {
        console.log("PayPal SDK loaded but Buttons API not available");
        setSdkLoaded(true);
        setPaypalReady(false);
      } else {
        console.log("PayPal SDK not loaded yet");
        setPaypalReady(false);
        setSdkLoaded(false);
      }
    };

    checkPayPalReady();

    // Poll for PayPal availability for a few seconds
    const checkInterval = setInterval(checkPayPalReady, 1000);
    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
      checkPayPalReady();
      if (!paypalReady) {
        console.log("PayPal SDK not loaded properly after timeout");
        if (sdkLoaded && !window.paypal?.Buttons) {
          setError("PayPal checkout is currently unavailable. Please try again later or use an alternative payment method.");
        }
      }
    }, 5000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, []);

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

  const onApprove = async (data: any, actions: any) => {
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

      // This should be the full order details returned from PayPal
      console.log("Capture result", orderData);
      
      // Check if the payment was completed
      const captureDetails = orderData.purchase_units[0].payments.captures[0];
      if (captureDetails.status === "COMPLETED") {
        toast({
          title: "Payment Successful",
          description: `Your payment of ${currency} ${amount} was completed successfully.`,
          variant: "success",
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

  const handleFallbackButton = async () => {
    try {
      setLoading(true);
      
      // Send a direct payment request to our backend
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
      
      // If the payment was successful
      toast({
        title: "Payment Initiated",
        description: "Your payment has been initiated. You will be redirected to complete it.",
        variant: "success",
      });
      
      // If there's a redirect URL, navigate to it
      if (responseData.redirectUrl) {
        window.location.href = responseData.redirectUrl;
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
  
  // Try to reload PayPal SDK
  const reloadPayPalSDK = () => {
    setError(null);
    
    // Remove existing PayPal script if any
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript && existingScript.parentNode) {
      existingScript.parentNode.removeChild(existingScript);
    }
    
    // Create a new script element
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj&currency=USD&intent=capture&enable-funding=venmo,paylater,card&disable-funding=credit';
    script.async = true;
    script.onload = () => {
      console.log("PayPal SDK reloaded successfully");
      setTimeout(() => {
        if (window.paypal && window.paypal.Buttons) {
          setPaypalReady(true);
          setSdkLoaded(true);
          toast({
            title: "PayPal Ready",
            description: "PayPal checkout is now available.",
            variant: "success",
          });
        } else {
          setPaypalReady(false);
          setSdkLoaded(true);
          setError("PayPal checkout is still unavailable. Please try an alternative payment method.");
        }
      }, 1000);
    };
    script.onerror = () => {
      console.error("Failed to reload PayPal SDK");
      setError("Could not load PayPal. Please check your internet connection and try again.");
    };
    document.body.appendChild(script);
  };
  
  if (!paypalReady && showFallbackButton) {
    return (
      <div className="space-y-3">
        <Button 
          onClick={handleFallbackButton} 
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
        
        <div className="flex flex-col space-y-2">
          <div className="text-xs text-gray-500 text-center">
            PayPal buttons are not available right now.
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={reloadPayPalSDK} 
            disabled={loading}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Try to reload PayPal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="text-xs text-red-500 flex items-center mb-2">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {error}
        </div>
      )}
      
      {paypalReady ? (
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "pay",
          }}
          forceReRender={[amount, currency]}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(err) => {
            console.error("PayPal Error:", err);
            setError("An error occurred with PayPal. Please try again.");
            onError(err);
          }}
        />
      ) : (
        <div className="p-4 border border-gray-200 rounded bg-gray-50 flex items-center justify-center">
          <RefreshCw className="h-5 w-5 animate-spin mr-2 text-gray-400" />
          <span className="text-sm text-gray-500">Loading PayPal checkout...</span>
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
