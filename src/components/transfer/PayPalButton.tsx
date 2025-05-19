
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

  useEffect(() => {
    // Function to load the PayPal SDK script
    const loadPayPalScript = () => {
      if (scriptLoaded.current || scriptLoading.current) return;
      
      scriptLoading.current = true;
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=test&currency=USD&components=buttons';
      script.async = true;
      
      script.onload = () => {
        scriptLoaded.current = true;
        scriptLoading.current = false;
        console.log("PayPal SDK loaded successfully");
        if (window.paypal && paypalButtonRef.current) {
          setTimeout(() => {
            renderPayPalButton();
          }, 100); // Small delay to ensure SDK is initialized
        }
      };
      
      script.onerror = () => {
        scriptLoading.current = false;
        console.error('Failed to load PayPal SDK');
        if (onError) {
          onError('Failed to load PayPal SDK');
        }
      };
      
      document.body.appendChild(script);
      
      // Clean up
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        // Clean up any rendered buttons
        if (paypalButtonRef.current) {
          paypalButtonRef.current.innerHTML = '';
        }
      };
    };

    loadPayPalScript();
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
    
    // Ensure the PayPal.Buttons constructor is available
    if (!window.paypal.Buttons) {
      console.error("PayPal Buttons constructor is not available");
      if (onError) {
        onError("PayPal Buttons constructor is not available");
      }
      return;
    }

    try {
      // Clear the container first
      paypalButtonRef.current.innerHTML = '';
      
      const button = window.paypal.Buttons({
        fundingSource: window.paypal.FUNDING.PAYPAL,
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
      
      button.render(paypalButtonRef.current);
    } catch (error) {
      console.error("Error rendering PayPal button:", error);
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
