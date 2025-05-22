
import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface PayPalButtonProps {
  amount: string;
  isDisabled?: boolean;
  onSuccess?: (details: any) => void;
  onError?: (err: any) => void;
  clientId?: string;
  currency?: string;
  setLoading?: (isLoading: boolean) => void;
  isProduction?: boolean;
}

// Define a type for the PayPal transaction details
interface PayPalTransactionDetails {
  purchase_units: Array<{
    payments?: {
      captures?: Array<{
        id: string;
      }>;
    };
  }>;
}

// Add PayPal to the Window interface
declare global {
  interface Window {
    paypal?: any;
  }
}

// Default sandbox client ID in case one isn't provided
const DEFAULT_CLIENT_ID = 'ASipB9r2XrYB0XD5cfzEItB8jtUq79EcN5uOYATHHJAEbWlQS3odGAH-RJb19wLH1QzHuk9zjUp1wUKc';

// Type-safe API URL as a constant string
const PAYPAL_API_URL = 'https://wkfzhcszhgewkvwukzes.supabase.co/functions/v1/paypal-payment';

const PayPalButton: React.FC<PayPalButtonProps> = ({ 
  amount, 
  isDisabled = false, 
  onSuccess, 
  onError,
  clientId: propClientId,
  currency = 'USD',
  setLoading,
  isProduction = false
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  
  // Always use the provided client ID or default
  const clientId = propClientId || DEFAULT_CLIENT_ID;
  
  // Check for valid amount
  const validAmount = amount && parseFloat(amount) > 0;
  
  // Format amount to 2 decimal places
  const formattedAmount = validAmount ? parseFloat(amount).toFixed(2) : '0.00';
  
  // PayPal configuration options
  const paypalOptions = {
    "client-id": clientId,
    currency: currency,
    components: "buttons",
    "disable-funding": "paylater,venmo,card",
    intent: "capture",
  };

  // Listen for when PayPal script is loaded
  useEffect(() => {
    const checkPayPalLoaded = () => {
      if (window.paypal && window.paypal.Buttons) {
        console.log("PayPal script detected as loaded");
        setScriptLoaded(true);
      }
    };

    // Check if already loaded
    checkPayPalLoaded();

    // Also listen for the custom event
    const handlePayPalScriptLoaded = () => {
      console.log("PayPal script loaded event received");
      setScriptLoaded(true);
    };
    
    document.addEventListener('paypal-script-loaded', handlePayPalScriptLoaded);
    
    // Fallback timer to check again in case events don't fire
    const timer = setTimeout(() => {
      checkPayPalLoaded();
    }, 2000);
    
    return () => {
      document.removeEventListener('paypal-script-loaded', handlePayPalScriptLoaded);
      clearTimeout(timer);
    };
  }, []);

  if (!validAmount || isDisabled) {
    return (
      <div className="w-full p-4 text-center text-gray-500 text-sm border rounded-md">
        {isDisabled ? "Payment option disabled" : "Please enter a valid amount"}
      </div>
    );
  }

  return (
    <div className="paypal-button-container">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Secure payment via PayPal</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="inline-flex items-center text-blue-500 hover:text-blue-700">
                <Info size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Credit card payments are securely processed through PayPal. You don't need a PayPal account to pay with your card.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="border border-blue-200 rounded-md p-3 bg-blue-50 mb-3">
        <div className="text-sm text-blue-800 font-medium mb-1">Test Mode Instructions:</div>
        <p className="text-xs text-blue-700">
          To test the payment, click the PayPal button below. When prompted, use the email <strong>sb-43toiq22868428@personal.example.com</strong> and password <strong>12345678</strong>.
        </p>
      </div>
      
      <PayPalScriptProvider options={paypalOptions}>
        {scriptLoaded ? (
          <PayPalButtons
            forceReRender={[amount, currency, clientId, isProduction]}
            fundingSource="paypal"
            style={{
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "pay",
              height: 45
            }}
            createOrder={(data, actions) => {
              if (setLoading) setLoading(true);
              console.log(`Creating PayPal order for amount ${formattedAmount} ${currency}`);
              
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: formattedAmount
                    },
                    description: `Money transfer of ${currency} ${formattedAmount}`
                  }
                ],
                application_context: {
                  brand_name: "Money Transfer Service",
                  locale: "en-US",
                  landing_page: "BILLING",
                  shipping_preference: "NO_SHIPPING",
                  user_action: "PAY_NOW",
                  return_url: window.location.href,
                  cancel_url: window.location.href,
                  // Add required fields for OrderApplicationContext
                  payment_method: {
                    payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED"
                  },
                  stored_payment_source: {
                    payment_initiator: "CUSTOMER",
                    payment_type: "ONEOFF"
                  }
                }
              });
            }}
            onApprove={async (data, actions) => {
              console.log("Payment approved by user:", data);
              try {
                // Capture the funds from the transaction
                const details = await actions.order.capture();
                console.log("Payment completed successfully:", details);
                
                // Send transaction details to our backend
                try {
                  const orderId = data.orderID;
                  // Cast details to our interface type and safely access properties
                  const transactionDetails = details as unknown as PayPalTransactionDetails;
                  const transactionId = transactionDetails.purchase_units?.[0]?.payments?.captures?.[0]?.id || '';
                  
                  const session = await supabase.auth.getSession();
                  const accessToken = session.data.session?.access_token || '';
                  
                  // Use explicit string type for the URL
                  const response = await fetch(PAYPAL_API_URL, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'x-paypal-transaction-id': transactionId,
                      'x-paypal-order-id': orderId,
                      'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                      amount: formattedAmount,
                      currency: currency,
                      paymentMethod: 'paypal'
                    })
                  });
                  
                  if (!response.ok) {
                    console.warn('Non-critical: Failed to verify payment with server, but payment was successful');
                  }
                } catch (serverError) {
                  console.warn('Non-critical: Error sending payment details to server:', serverError);
                }
                
                toast({
                  title: "Payment Successful",
                  description: `Your payment of ${currency} ${formattedAmount} was completed successfully.`,
                  variant: "success",
                });
                
                if (onSuccess) {
                  onSuccess(details);
                }
              } catch (err) {
                console.error('Error finalizing payment:', err);
                if (onError) onError(err);
                
                toast({
                  title: "Payment Failed",
                  description: "There was an issue completing your payment. Please try again.",
                  variant: "destructive",
                });
              } finally {
                if (setLoading) setLoading(false);
              }
            }}
            onCancel={() => {
              console.log("Payment cancelled by user");
              toast({
                title: "Payment Cancelled",
                description: "You cancelled the PayPal payment process.",
                variant: "default",
              });
              if (setLoading) setLoading(false);
            }}
            onError={(err) => {
              console.error("PayPal error:", err);
              toast({
                title: "Payment Failed",
                description: "There was an issue processing your PayPal payment. Please try again.",
                variant: "destructive",
              });
              
              if (onError) {
                onError(err);
              }
              
              if (setLoading) setLoading(false);
            }}
            onInit={() => {
              console.log("PayPal buttons initialized successfully");
              setScriptLoaded(true);
            }}
          />
        ) : (
          <div className="p-4 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading payment options...</p>
          </div>
        )}
      </PayPalScriptProvider>
      
      <div className="mt-2 text-center">
        <span className="text-xs text-gray-600">
          {isProduction ? 
            "You will be redirected to PayPal to complete your payment securely." : 
            "This is a test environment. No real payments will be processed."}
        </span>
      </div>
    </div>
  );
};

export default PayPalButton;
