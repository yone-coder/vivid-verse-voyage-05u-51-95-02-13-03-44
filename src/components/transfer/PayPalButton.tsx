
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
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ 
  amount, 
  isDisabled = false, 
  onSuccess, 
  onError 
}) => {
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isScriptError, setIsScriptError] = useState(false);
  
  useEffect(() => {
    // Only try to load if we're not disabled and we haven't already loaded or errored
    if (isDisabled || isScriptLoaded || isScriptError) return;

    // Remove any existing PayPal scripts first to avoid conflicts
    const existingScripts = document.querySelectorAll('script[src*="paypal.com/sdk/js"]');
    existingScripts.forEach(script => {
      document.body.removeChild(script);
    });

    // Clear the global PayPal object if it exists
    if (window.paypal) {
      delete window.paypal;
    }

    // Create and add the script
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=test&currency=USD&components=buttons,funding-eligibility';
    script.async = true;
    
    script.onload = () => {
      console.log('PayPal SDK script loaded successfully');
      setIsScriptLoaded(true);
    };
    
    script.onerror = (error) => {
      console.error('Error loading PayPal SDK script:', error);
      setIsScriptError(true);
      toast({
        title: "PayPal Error",
        description: "Could not load PayPal. Please try again later.",
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
  }, [isDisabled, onError]);
  
  // Render PayPal button when script is loaded and when amount changes
  useEffect(() => {
    if (!isScriptLoaded || isDisabled || !paypalButtonRef.current) return;
    
    // Clear the container
    paypalButtonRef.current.innerHTML = '';
    
    // Safety timeout to ensure PayPal object is fully loaded
    const timeoutId = setTimeout(() => {
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
        
        if (button.isEligible && button.isEligible()) {
          button.render(paypalButtonRef.current).catch((renderError: any) => {
            console.error('Error rendering PayPal button:', renderError);
            if (onError) onError(renderError);
          });
        } else {
          console.warn('PayPal button is not eligible for this browser or device');
          if (onError) onError('PayPal button is not eligible for this browser or device');
        }
      } catch (error) {
        console.error('Error creating PayPal button:', error);
        if (onError) onError(error);
      }
    }, 1000); // Give it a full second to initialize
    
    return () => clearTimeout(timeoutId);
  }, [isScriptLoaded, amount, isDisabled, onSuccess, onError]);
  
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
      {!isScriptLoaded && (
        <div className="flex items-center justify-center p-4 text-gray-500 text-sm">
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
