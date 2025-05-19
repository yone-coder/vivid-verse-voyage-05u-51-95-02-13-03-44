
import React, { useState } from 'react';
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

// Default sandbox client ID in case one isn't provided
const DEFAULT_CLIENT_ID = 'ASipB9r2XrYB0XD5cfzEItB8jtUq79EcN5uOYATHHJAEbWlQS3odGAH-RJb19wLH1QzHuk9zjUp1wUKc';

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
    intent: "capture"
  };

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
      
      <PayPalScriptProvider options={paypalOptions} 
        onReady={() => {
          console.log("PayPal SDK loaded successfully");
          setScriptLoaded(true);
        }}
        onError={(err) => {
          console.error("Error loading PayPal SDK:", err);
          if (onError) onError(err);
        }}>
        <PayPalButtons
          disabled={!validAmount || isDisabled}
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
                shipping_preference: "NO_SHIPPING"
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
                const response = await fetch('https://wkfzhcszhgewkvwukzes.supabase.co/functions/v1/paypal-payment', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-paypal-transaction-id': details.purchase_units[0].payments.captures[0].id,
                    'x-paypal-order-id': data.orderID,
                    'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token || ''}`
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
        />
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
