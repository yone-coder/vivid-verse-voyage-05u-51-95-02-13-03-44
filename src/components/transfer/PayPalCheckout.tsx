
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

interface PayPalCheckoutProps {
  amount: number;
  onSuccess: (orderData: any) => void;
  onError: (error: any) => void;
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: any) => {
        render: (selector: string | HTMLElement) => Promise<void>;
      };
      CardFields: (config: any) => {
        isEligible: () => boolean;
        NameField: (config: any) => { render: (selector: string) => void };
        NumberField: (config: any) => { render: (selector: string) => void };
        CVVField: (config: any) => { render: (selector: string) => void };
        ExpiryField: (config: any) => { render: (selector: string) => void };
        submit: (data: any) => Promise<void>;
      };
    };
  }
}

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({ amount, onSuccess, onError }) => {
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const cardFieldsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if PayPal script is already loaded
    if (window.paypal) {
      setPaypalLoaded(true);
      setLoading(false);
      initializePayPal();
      return;
    }

    // Load PayPal SDK
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AVHblE6HlBNWN_oyhv9PBWS_TfIhJCM5rSc8TaV4j6kggMNM6I5YJQxxCsJGcxV-bCl3dF6FHGX8IqCo&buyer-country=US&currency=USD&components=buttons,card-fields&enable-funding=venmo`;
    script.setAttribute('data-sdk-integration-source', 'developer-studio');
    
    script.onload = () => {
      setPaypalLoaded(true);
      setLoading(false);
      initializePayPal();
    };

    script.onerror = () => {
      console.error('Failed to load PayPal SDK');
      setLoading(false);
      onError(new Error('Failed to load PayPal SDK'));
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      const existingScript = document.querySelector('script[data-sdk-integration-source="developer-studio"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const createOrder = async () => {
    try {
      // Create a simple order object for demo purposes
      // In a real app, you'd call your backend API here
      return new Promise((resolve) => {
        // Simulate order creation
        setTimeout(() => {
          resolve('DEMO_ORDER_ID_' + Date.now());
        }, 1000);
      });
    } catch (error) {
      console.error('Error creating order:', error);
      onError(error);
      throw error;
    }
  };

  const onApprove = async (data: any) => {
    try {
      // In a real app, you'd capture the payment here
      console.log('Payment approved:', data);
      
      // Simulate successful payment
      const orderData = {
        id: data.orderID,
        status: 'COMPLETED',
        purchase_units: [{
          payments: {
            captures: [{
              id: 'CAPTURE_' + Date.now(),
              status: 'COMPLETED',
              amount: {
                value: amount.toString(),
                currency_code: 'USD'
              }
            }]
          }
        }]
      };

      onSuccess(orderData);
    } catch (error) {
      console.error('Error capturing payment:', error);
      onError(error);
    }
  };

  const initializePayPal = () => {
    if (!window.paypal || !paypalButtonRef.current) return;

    // Clear any existing content
    if (paypalButtonRef.current) {
      paypalButtonRef.current.innerHTML = '';
    }

    try {
      // Render PayPal Buttons
      window.paypal.Buttons({
        createOrder: createOrder,
        onApprove: onApprove,
        onError: function (error: any) {
          console.error('PayPal Button Error:', error);
          onError(error);
        },
        style: {
          shape: "rect",
          layout: "vertical",
          color: "gold",
          label: "paypal",
        },
      }).render(paypalButtonRef.current);

    } catch (error) {
      console.error('Error initializing PayPal:', error);
      onError(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading PayPal...</span>
      </div>
    );
  }

  if (!paypalLoaded) {
    return (
      <div className="text-center p-4">
        <p className="text-red-600">Failed to load PayPal. Please try again.</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline" 
          className="mt-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="paypal-checkout-container">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Pay with PayPal</h3>
        <p className="text-sm text-gray-600 mb-4">
          Amount: ${amount.toFixed(2)} USD
        </p>
      </div>
      
      {/* PayPal Button Container */}
      <div ref={paypalButtonRef} className="paypal-button-container"></div>
    </div>
  );
};

export default PayPalCheckout;
