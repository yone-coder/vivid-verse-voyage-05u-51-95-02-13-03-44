
import React, { useEffect, useRef, useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ 
  amount, 
  isDisabled = false, 
  onSuccess, 
  onError,
  clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || 'sb', // 'sb' is PayPal's sandbox default
  currency = 'USD'
}) => {
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isScriptError, setIsScriptError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Check for valid amount and client ID
  const validAmount = amount && parseFloat(amount) > 0;
  const validClientId = clientId && clientId !== 'test';
  
  useEffect(() => {
    // Only try to load if we're not disabled, have valid amount, valid client ID, and haven't already loaded or errored
    if (isDisabled || !validAmount || !validClientId || isScriptLoaded || isScriptError) return;

    setIsLoading(true);

    // Remove any existing PayPal scripts first to avoid conflicts
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
      console.log('PayPal SDK script loaded successfully');
      setIsScriptLoaded(true);
      setIsLoading(false);
    };
    
    script.onerror = (error) => {
      console.error('Error loading PayPal SDK script:', error);
      setIsScriptError(true);
      setIsLoading(false);
      toast({
        title: "PayPal Error",
        description: "Could not load PayPal. Please check your internet connection or try again later.",
        variant: "destructive",
      });
      
      if (onError) {
        onError(error);
      }
    };
    
    document.body.appendChild(script);
    
    // Clean up function
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [isDisabled, validAmount, validClientId, clientId, currency, onError, isScriptLoaded, isScriptError]);
  
  // Render PayPal button when script is loaded and when amount or currency changes
  useEffect(() => {
    if (!isScriptLoaded || isDisabled || !paypalButtonRef.current || !validAmount) return;
    
    // Clear the container
    paypalButtonRef.current.innerHTML = '';
    
    try {
      if (!window.paypal || !window.paypal.Buttons) {
        console.error('PayPal SDK loaded but Buttons API not available');
        setIsScriptError(true);
        if (onError) {
          onError('PayPal Buttons API not available');
        }
        return;
      }
      
      const button = window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'pay'
        },
        createOrder: (_data: any, actions: any) => {
          // Create the actual order with real amount
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: currency,
                value: amount
              },
              description: 'Money Transfer Service'
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log('Payment completed successfully', details);
            toast({
              title: "Payment Successful",
              description: `Your payment of ${currency} ${amount} was completed successfully. Transaction ID: ${details.id}`,
              variant: "success",
            });
            
            if (onSuccess) {
              onSuccess(details);
            }
          });
        },
        onCancel: () => {
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the PayPal payment process.",
            variant: "default",
          });
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
        }
      });
      
      // Check if button can be rendered before attempting to render
      if (!button.isEligible || button.isEligible()) {
        button.render(paypalButtonRef.current).catch((renderError: any) => {
          console.error('Error rendering PayPal button:', renderError);
          setIsScriptError(true);
          if (onError) onError(renderError);
        });
      } else {
        console.warn('PayPal button is not eligible for this browser or device');
        setIsScriptError(true);
        if (onError) onError('PayPal button is not eligible for this browser or device');
      }
    } catch (error) {
      console.error('Error creating PayPal button:', error);
      setIsScriptError(true);
      if (onError) onError(error);
    }
  }, [isScriptLoaded, amount, currency, isDisabled, validAmount, onSuccess, onError]);
  
  // If the button is disabled or amount is invalid, show our custom button
  if (isDisabled || !validAmount) {
    return (
      <Button
        disabled={true}
        className="w-full bg-[#0070BA] hover:bg-[#005ea6] mb-2 flex items-center justify-center gap-2"
      >
        <CreditCard className="h-4 w-4" />
        <span>Pay with PayPal</span>
      </Button>
    );
  }
  
  // If there's no valid client ID, show a message
  if (!validClientId) {
    return (
      <div className="w-full mb-2 text-center p-3 border border-yellow-300 bg-yellow-50 rounded-md">
        <p className="text-sm text-yellow-800">
          PayPal client ID not configured. Please set up your PayPal credentials.
        </p>
      </div>
    );
  }
  
  // If there was an error loading the script, show a fallback button
  if (isScriptError) {
    return (
      <Button
        onClick={() => window.open('https://www.paypal.com', '_blank')}
        className="w-full bg-[#0070BA] hover:bg-[#005ea6] mb-2 flex items-center justify-center gap-2"
      >
        <CreditCard className="h-4 w-4" />
        <span>Pay with PayPal</span>
      </Button>
    );
  }
  
  // Return a container for the PayPal button to render in
  return (
    <div className="w-full mb-2">
      {(isLoading || !isScriptLoaded) && (
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
    </div>
  );
};

export default PayPalButton;
