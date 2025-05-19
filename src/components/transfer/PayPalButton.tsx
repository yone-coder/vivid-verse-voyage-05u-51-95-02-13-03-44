
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
  setLoading?: (isLoading: boolean) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ 
  amount, 
  isDisabled = false, 
  onSuccess, 
  onError,
  clientId: propClientId,
  currency = 'USD',
  setLoading
}) => {
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isScriptError, setIsScriptError] = useState(false);
  const [scriptLoadCount, setScriptLoadCount] = useState(0);
  
  // Get client ID from props or localStorage
  const clientId = propClientId || localStorage.getItem('paypal_client_id') || 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R';
  
  // Check for valid amount and client ID
  const validAmount = amount && parseFloat(amount) > 0;
  
  // Function to load PayPal SDK
  const loadPayPalScript = () => {
    if (isDisabled || !validAmount || isScriptLoaded || scriptLoadCount > 2) return;
    
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
    // Include 'buttons,hosted-fields' components to ensure we have all necessary components
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&components=buttons,hosted-fields&intent=capture`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('PayPal SDK script loaded successfully');
      setIsScriptLoaded(true);
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
        if (onError) onError('PayPal Buttons API not available after script load');
      }
    };
    
    script.onerror = (error) => {
      console.error('Error loading PayPal SDK script:', error);
      setIsScriptError(true);
      if (setLoading) setLoading(false);
      setScriptLoadCount(prev => prev + 1);
      
      toast({
        title: "PayPal Error",
        description: "Could not load PayPal. Please check your API key or try again later.",
        variant: "destructive",
      });
      
      if (onError) {
        onError(error);
      }
    };
    
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  };
  
  // Function to render the PayPal button
  const renderPayPalButton = () => {
    if (!window.paypal || !window.paypal.Buttons) {
      console.error('PayPal SDK loaded but Buttons API not available');
      if (onError) onError('PayPal Buttons API not available');
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
          console.log('Creating PayPal order with amount:', amount);
          // Create the actual order with real amount
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
        onApprove: (data: any, actions: any) => {
          console.log('Payment approved:', data);
          if (setLoading) setLoading(true);
          return actions.order.capture().then((details: any) => {
            console.log('Payment completed successfully', details);
            toast({
              title: "Payment Successful",
              description: `Your payment of ${currency} ${amount} was completed successfully.`,
              variant: "success",
            });
            
            if (onSuccess) {
              onSuccess(details);
            }
            
            if (setLoading) setLoading(false);
          });
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
        if (onError) onError('PayPal button is not eligible for this browser or device');
      }
    } catch (error) {
      console.error('Error creating PayPal button:', error);
      setIsScriptError(true);
      if (onError) onError(error);
    }
  };
  
  // Load the PayPal SDK when component mounts or amount/currency changes
  useEffect(() => {
    loadPayPalScript();
    
    // Clean up function
    return () => {
      const scripts = document.querySelectorAll('script[src*="paypal.com/sdk/js"]');
      scripts.forEach(script => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      });
    };
  }, [clientId, currency, validAmount, isDisabled]);
  
  // Render the PayPal button when script is loaded and when amount changes
  useEffect(() => {
    if (isScriptLoaded && !isScriptError && validAmount && !isDisabled) {
      renderPayPalButton();
    }
  }, [isScriptLoaded, amount, isDisabled, validAmount]);
  
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
  
  // If there was an error loading the script, show a fallback button that opens PayPal in a new window
  if (isScriptError) {
    return (
      <Button
        onClick={() => {
          const paypalCheckoutUrl = `https://www.paypal.com/checkoutnow?token=EC-DEMO`;
          window.open(paypalCheckoutUrl, '_blank', 'noopener,noreferrer');
        }}
        className="w-full bg-[#0070BA] hover:bg-[#005ea6] mb-2 flex items-center justify-center gap-2"
      >
        <CreditCard className="h-4 w-4" />
        <span>Continue with PayPal</span>
      </Button>
    );
  }
  
  // Return a container for the PayPal button to render in
  return (
    <div className="w-full mb-2">
      {(!isScriptLoaded || (setLoading && isScriptLoaded && !window.paypal?.Buttons)) && (
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
