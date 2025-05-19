
import React, { useEffect, useRef } from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ 
  amount, 
  isDisabled = false, 
  onSuccess, 
  onError 
}) => {
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef<boolean>(false);
  const scriptLoading = useRef<boolean>(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // Cleanup function to remove any existing PayPal scripts
  const cleanupPayPalScript = () => {
    if (scriptRef.current && document.body.contains(scriptRef.current)) {
      document.body.removeChild(scriptRef.current);
      scriptRef.current = null;
    }
    // Clean up any rendered buttons
    if (paypalButtonRef.current) {
      paypalButtonRef.current.innerHTML = '';
    }
    scriptLoaded.current = false;
    scriptLoading.current = false;
  };

  useEffect(() => {
    // Function to load the PayPal SDK script
    const loadPayPalScript = () => {
      if (scriptLoaded.current || scriptLoading.current) return;
      
      // Clean up any existing script first
      cleanupPayPalScript();
      
      scriptLoading.current = true;
      const script = document.createElement('script');
      scriptRef.current = script;
      
      // Make sure to include all required components and parameters
      script.src = 'https://www.paypal.com/sdk/js?client-id=test&currency=USD&components=buttons';
      script.async = true;
      
      script.onload = () => {
        scriptLoaded.current = true;
        scriptLoading.current = false;
        console.log("PayPal SDK loaded successfully");
        
        // Give a little delay to ensure the SDK is fully initialized
        setTimeout(() => {
          if (window.paypal && paypalButtonRef.current) {
            renderPayPalButton();
          }
        }, 500);
      };
      
      script.onerror = () => {
        scriptLoading.current = false;
        console.error('Failed to load PayPal SDK');
        if (onError) {
          onError('Failed to load PayPal SDK');
        }
      };
      
      document.body.appendChild(script);
    };

    loadPayPalScript();
    
    // Clean up on component unmount
    return () => {
      cleanupPayPalScript();
    };
  }, []);
  
  useEffect(() => {
    // Re-render button when amount changes if script is already loaded
    if (window.paypal && scriptLoaded.current && paypalButtonRef.current) {
      renderPayPalButton();
    }
  }, [amount]);
  
  const renderPayPalButton = () => {
    if (!window.paypal || !paypalButtonRef.current) {
      console.log("PayPal SDK or button container not available");
      return;
    }
    
    // Clear the container first
    paypalButtonRef.current.innerHTML = '';
    
    // Check if Buttons is properly loaded and available
    if (!window.paypal.Buttons) {
      console.error("PayPal Buttons constructor is not available");
      if (onError) {
        onError("PayPal Buttons constructor is not available");
      }
      return;
    }

    try {
      const button = window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (_data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'USD',
                value: amount || '0'
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log('Payment completed successfully', details);
            if (onSuccess) {
              onSuccess(details);
            }
          });
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          if (onError) {
            onError(err);
          }
        }
      });
      
      if (button.render) {
        button.render(paypalButtonRef.current)
          .catch((renderError: any) => {
            console.error("Error rendering PayPal button:", renderError);
            if (onError) {
              onError(renderError);
            }
          });
      } else {
        console.error("PayPal button render method not available");
        if (onError) {
          onError("PayPal button render method not available");
        }
      }
    } catch (error) {
      console.error("Error creating PayPal button:", error);
      if (onError) {
        onError(error);
      }
    }
  };

  // If the button is disabled, show our custom button instead of PayPal button
  if (isDisabled) {
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

  // Return a container for the PayPal button to render in
  return (
    <div className="w-full mb-2">
      <div 
        ref={paypalButtonRef}
        className="paypal-button-container"
        style={{ minHeight: '45px' }}
      />
    </div>
  );
};

export default PayPalButton;
