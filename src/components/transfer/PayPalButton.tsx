
import React, { useEffect, useRef, useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    paypal?: any;
  }
}

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
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isScriptError, setIsScriptError] = useState(false);
  const [scriptAttempts, setScriptAttempts] = useState(0);
  
  // Always use the provided client ID or default
  const clientId = propClientId || DEFAULT_CLIENT_ID;
  
  // Environment based on props
  const environment = isProduction ? 'production' : 'sandbox';
  
  // Check for valid amount
  const validAmount = amount && parseFloat(amount) > 0;
  
  // Function to load PayPal SDK
  const loadPayPalScript = () => {
    if (isDisabled || !validAmount || isScriptLoaded || scriptAttempts >= 3) return;
    
    setScriptAttempts(prev => prev + 1);
    
    if (setLoading) setLoading(true);
    
    // Remove any existing PayPal scripts to avoid conflicts
    const existingScripts = document.querySelectorAll('script[src*="paypal.com/sdk/js"]');
    existingScripts.forEach(script => {
      document.body.removeChild(script);
    });
    
    // Clear the global PayPal object if it exists
    if (window.paypal) {
      delete window.paypal;
    }
    
    // Create and add the script with proper parameters
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&components=buttons`;
    script.async = true;
    
    script.onload = () => {
      console.log(`PayPal SDK script loaded successfully in ${environment} mode`);
      setIsScriptLoaded(true);
      setIsScriptError(false);
      if (setLoading) setLoading(false);
      
      // Verify PayPal object is properly loaded before rendering
      if (window.paypal && window.paypal.Buttons) {
        console.log('PayPal Buttons API is available');
        // Wait a moment for PayPal to initialize fully
        setTimeout(() => {
          renderPayPalButton();
        }, 100);
      } else {
        console.error('PayPal object is loaded but Buttons API is not available');
        setIsScriptError(true);
        if (onError) onError(new Error('PayPal Buttons API not available after script load'));
        
        // Show toast error
        toast({
          title: "PayPal Error",
          description: "There was an issue initializing PayPal. Please refresh and try again.",
          variant: "destructive",
        });
      }
    };
    
    script.onerror = (error) => {
      console.error('Error loading PayPal SDK script:', error);
      setIsScriptError(true);
      if (setLoading) setLoading(false);
      
      // Show toast error
      if (scriptAttempts >= 3) {
        toast({
          title: "PayPal Error",
          description: "Could not load PayPal. Please try again later.",
          variant: "destructive",
        });
      } else {
        // Try again after a delay
        setTimeout(() => {
          loadPayPalScript();
        }, 1500);
      }
      
      if (onError) {
        onError(error);
      }
    };
    
    document.body.appendChild(script);
  };
  
  // Function to render the PayPal button
  const renderPayPalButton = () => {
    if (!window.paypal || !window.paypal.Buttons) {
      console.error('PayPal SDK loaded but Buttons API not available');
      if (onError) onError(new Error('PayPal Buttons API not available'));
      setIsScriptError(true);
      return;
    }
    
    if (!paypalButtonRef.current || !validAmount || isDisabled) return;
    
    // Clear the container
    paypalButtonRef.current.innerHTML = '';
    
    try {
      const button = window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'pay'
        },
        createOrder: (_data: any, actions: any) => {
          console.log(`Creating PayPal order with amount: ${amount} in ${environment} mode`);
          // Create the order with real amount
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [{
              amount: {
                currency_code: currency,
                value: amount
              },
              description: 'Money Transfer Service'
            }],
            application_context: {
              shipping_preference: 'NO_SHIPPING',
              user_action: 'PAY_NOW'
            }
          });
        },
        onApprove: async (data: any, actions: any) => {
          console.log('Payment approved:', data);
          if (setLoading) setLoading(true);
          
          try {
            // Capture the funds from the transaction
            const details = await actions.order.capture();
            console.log('Payment completed successfully', details);
            
            // Send transaction details to our backend
            const response = await fetch('https://wkfzhcszhgewkvwukzes.supabase.co/functions/v1/paypal-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-paypal-transaction-id': details.purchase_units[0].payments.captures[0].id,
                'x-paypal-order-id': data.orderID,
                'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token || ''}`
              },
              body: JSON.stringify({
                amount: amount,
                currency: currency,
                paymentMethod: 'paypal'
              })
            });
            
            if (!response.ok) {
              throw new Error('Failed to verify payment with server');
            }
            
            const serverResponse = await response.json();
            
            toast({
              title: "Payment Successful",
              description: `Your payment of ${currency} ${amount} was completed successfully.`,
              variant: "success",
            });
            
            if (onSuccess) {
              onSuccess({...details, serverData: serverResponse});
            }
          } catch (error) {
            console.error('Error finalizing payment:', error);
            if (onError) onError(error);
            
            toast({
              title: "Payment Verification Failed",
              description: "There was an issue verifying your payment with our server.",
              variant: "destructive",
            });
          } finally {
            if (setLoading) setLoading(false);
          }
        },
        onCancel: (data: any) => {
          console.log('Payment cancelled:', data);
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the PayPal payment process.",
            variant: "default",
          });
          if (setLoading) setLoading(false);
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          toast({
            title: "Payment Failed",
            description: "There was an issue processing your PayPal payment. Please try again.",
            variant: "destructive",
          });
          
          if (onError) {
            onError(err);
          }
          
          if (setLoading) setLoading(false);
        }
      });
      
      // Check if button can be rendered
      if (button.isEligible && button.isEligible()) {
        console.log('PayPal button is eligible for rendering');
        button.render(paypalButtonRef.current);
      } else {
        console.warn('PayPal button is not eligible for this browser or device');
        setIsScriptError(true);
        if (onError) onError(new Error('PayPal button is not eligible for this browser or device'));
        
        toast({
          title: "PayPal Error",
          description: "PayPal is not available on this device or browser. Please try another payment method.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error creating PayPal button:', error);
      setIsScriptError(true);
      if (onError) onError(error);
      
      toast({
        title: "PayPal Error",
        description: "Could not initialize PayPal. Please try again later.",
        variant: "destructive",
      });
    }
  };
  
  // Load the PayPal SDK when component mounts or amount/currency changes
  useEffect(() => {
    if (validAmount && !isDisabled && !isScriptLoaded && scriptAttempts < 3) {
      loadPayPalScript();
    }
    
    // Clean up function
    return () => {
      const scripts = document.querySelectorAll('script[src*="paypal.com/sdk/js"]');
      scripts.forEach(script => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      });
    };
  }, [clientId, currency, validAmount, isDisabled, scriptAttempts]);
  
  // Return a container for the PayPal button to render in
  return (
    <div className="w-full mb-2">
      {(!isScriptLoaded || isScriptError) && (
        <div className="flex items-center justify-center p-4 text-gray-500 text-sm">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading PayPal...
        </div>
      )}
      <div 
        ref={paypalButtonRef}
        className="paypal-button-container"
        style={{ minHeight: '45px' }}
      />
      {isScriptLoaded && !isScriptError && environment === 'production' && (
        <div className="mt-1 text-center">
          <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
            Live Production Mode
          </span>
        </div>
      )}
    </div>
  );
};

export default PayPalButton;
