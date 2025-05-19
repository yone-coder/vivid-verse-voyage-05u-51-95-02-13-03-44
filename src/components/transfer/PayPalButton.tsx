
import React, { useEffect, useRef } from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: any) => {
        render: (element: HTMLElement) => void;
      };
    }
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

  useEffect(() => {
    // Only load the script once
    if (scriptLoaded.current) return;

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=test&currency=USD';
    script.async = true;
    
    script.onload = () => {
      scriptLoaded.current = true;
      if (window.paypal && paypalButtonRef.current) {
        renderPayPalButton();
      }
    };
    
    script.onerror = () => {
      console.error('Failed to load PayPal SDK');
      if (onError) {
        onError('Failed to load PayPal SDK');
      }
    };
    
    document.body.appendChild(script);
    
    // Clean up
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  useEffect(() => {
    // Re-render button when amount changes
    if (window.paypal && scriptLoaded.current && paypalButtonRef.current) {
      renderPayPalButton();
    }
  }, [amount]);
  
  const renderPayPalButton = () => {
    if (!window.paypal || !paypalButtonRef.current) return;
    
    // Clear the container first
    paypalButtonRef.current.innerHTML = '';
    
    window.paypal.Buttons({
      createOrder: (_data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: amount
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
    }).render(paypalButtonRef.current);
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
