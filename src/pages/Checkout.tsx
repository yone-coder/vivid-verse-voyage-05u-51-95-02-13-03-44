import React, { useEffect, useRef, useState } from 'react';
import { CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const PayPalHostedFields = () => {
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const hostedFieldsInstance = useRef(null);

  // PayPal configuration
  const PAYPAL_CLIENT_ID = 'YOUR_PAYPAL_CLIENT_ID'; // Replace with your actual client ID
  const PAYPAL_ENVIRONMENT = 'sandbox'; // Change to 'production' for live

  useEffect(() => {
    // Load PayPal SDK
    const loadPayPalSDK = () => {
      if (window.paypal) {
        setPaypalLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=hosted-fields`;
      script.onload = () => setPaypalLoaded(true);
      script.onerror = () => console.error('Failed to load PayPal SDK');
      document.head.appendChild(script);
    };

    loadPayPalSDK();
  }, []);

  useEffect(() => {
    if (!paypalLoaded || !window.paypal) return;

    // Initialize PayPal Hosted Fields
    window.paypal.HostedFields.render({
      createOrder: function() {
        const API_BASE_URL = process.env.NODE_ENV === 'production' 
          ? 'https://your-render-app.onrender.com'  // Replace with your Render app URL
          : 'http://localhost:3001';
        
        return fetch(`${API_BASE_URL}/api/paypal/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: '10.00', // Replace with dynamic amount
            currency: 'USD'
          })
        }).then(function(res) {
          return res.json();
        }).then(function(orderData) {
          return orderData.id;
        });
      },
      styles: {
        '.valid': {
          'color': '#10b981'
        },
        '.invalid': {
          'color': '#ef4444'
        },
        'input': {
          'font-size': '16px',
          'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          'color': '#374151',
          'padding': '12px 16px',
          'border': '2px solid #e5e7eb',
          'border-radius': '8px',
          'background-color': '#ffffff',
          'transition': 'border-color 0.2s ease'
        },
        'input:focus': {
          'border-color': '#3b82f6',
          'outline': 'none',
          'box-shadow': '0 0 0 3px rgba(59, 130, 246, 0.1)'
        },
        'input.invalid': {
          'border-color': '#ef4444'
        },
        'input.valid': {
          'border-color': '#10b981'
        }
      },
      fields: {
        number: {
          selector: '#card-number',
          placeholder: '1234 5678 9012 3456'
        },
        cvv: {
          selector: '#cvv',
          placeholder: 'CVV'
        },
        expirationDate: {
          selector: '#expiration-date',
          placeholder: 'MM/YY'
        }
      }
    }).then(function(hf) {
      hostedFieldsInstance.current = hf;

      // Handle field validation
      hf.on('validityChange', function(event) {
        const newErrors = {};
        let allValid = true;

        Object.keys(event.fields).forEach(function(field) {
          if (!event.fields[field].isValid) {
            allValid = false;
            if (event.fields[field].isEmpty) {
              newErrors[field] = 'This field is required';
            } else {
              newErrors[field] = 'Please enter a valid value';
            }
          }
        });

        setIsValid(allValid);
        setErrors(newErrors);
      });

      // Handle card type detection
      hf.on('cardTypeChange', function(event) {
        if (event.cards.length === 1) {
          console.log('Card type:', event.cards[0].type);
        }
      });

    }).catch(function(err) {
      console.error('Failed to render hosted fields:', err);
    });

    return () => {
      if (hostedFieldsInstance.current) {
        hostedFieldsInstance.current.teardown();
      }
    };
  }, [paypalLoaded]);

  const handleSubmit = async () => {
    
    if (!hostedFieldsInstance.current || !isValid) {
      return;
    }

    setIsProcessing(true);

    try {
      const { nonce } = await hostedFieldsInstance.current.submit();
      
      // Send nonce to your server for payment processing
      const API_BASE_URL = process.env.NODE_ENV === 'production' 
        ? 'https://your-render-app.onrender.com'  // Replace with your Render app URL
        : 'http://localhost:3001';
      
      const response = await fetch(`${API_BASE_URL}/api/paypal/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nonce: nonce,
          amount: '10.00',
          currency: 'USD'
        })
      });

      const result = await response.json();

      if (result.success) {
        setPaymentSuccess(true);
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Your payment has been processed successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <CreditCard className="h-8 w-8 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
      </div>

      {!paypalLoaded && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading PayPal...</p>
        </div>
      )}

      {paypalLoaded && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <div id="card-number" className="min-h-[50px]"></div>
            {errors.number && (
              <div className="flex items-center mt-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.number}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <div id="expiration-date" className="min-h-[50px]"></div>
              {errors.expirationDate && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.expirationDate}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <div id="cvv" className="min-h-[50px]"></div>
              {errors.cvv && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.cvv}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Amount:</span>
              <span className="font-semibold text-gray-900">$10.00 USD</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Lock className="h-3 w-3 mr-1" />
              Secured by PayPal
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isValid || isProcessing}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isValid && !isProcessing
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              'Pay Now'
            )}
          </button>

          <div className="text-xs text-gray-500 text-center">
            By clicking "Pay Now", you agree to our terms and conditions.
          </div>
        </div>
      )}
    </div>
  );
};

export default PayPalHostedFields;