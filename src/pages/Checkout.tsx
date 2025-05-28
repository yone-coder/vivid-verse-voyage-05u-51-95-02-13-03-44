import React, { useEffect, useState } from 'react';
import { CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';

const PayPalHostedFields = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [hostedFieldsInstance, setHostedFieldsInstance] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [fieldStates, setFieldStates] = useState({});

  // Replace with your actual PayPal client ID
  const PAYPAL_CLIENT_ID = 'YOUR_PAYPAL_CLIENT_ID';
  
  // Replace with your backend URL (Render.com)
  const BACKEND_URL = 'https://your-app.onrender.com';

  useEffect(() => {
    // Load PayPal SDK
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=hosted-fields`;
    script.async = true;
    script.onload = initializeHostedFields;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeHostedFields = () => {
    if (window.paypal) {
      window.paypal.HostedFields.render({
        createOrder: async () => {
          try {
            const response = await fetch(`${BACKEND_URL}/api/paypal/create-order`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: '10.00', // Replace with dynamic amount
                currency: 'USD'
              }),
            });
            
            const data = await response.json();
            return data.id;
          } catch (error) {
            console.error('Error creating order:', error);
            setPaymentStatus('Error creating payment order');
          }
        },
        
        styles: {
          '.valid': {
            'color': '#28a745'
          },
          '.invalid': {
            'color': '#dc3545'
          },
          'input': {
            'font-size': '16px',
            'font-family': 'system-ui, -apple-system, sans-serif',
            'color': '#374151',
            'padding': '12px',
            'border': '1px solid #d1d5db',
            'border-radius': '6px'
          },
          ':focus': {
            'border-color': '#3b82f6',
            'outline': 'none',
            'box-shadow': '0 0 0 3px rgba(59, 130, 246, 0.1)'
          }
        },
        
        fields: {
          number: {
            selector: '#card-number',
            placeholder: '1234 5678 9012 3456'
          },
          cvv: {
            selector: '#cvv',
            placeholder: '123'
          },
          expirationDate: {
            selector: '#expiration-date',
            placeholder: 'MM/YY'
          }
        }
      }).then((hostedFields) => {
        setHostedFieldsInstance(hostedFields);
        
        // Add validation listeners
        hostedFields.on('validityChange', (event) => {
          const field = event.fields[event.emittedBy];
          setFieldStates(prev => ({
            ...prev,
            [event.emittedBy]: {
              isValid: field.isValid,
              isPotentiallyValid: field.isPotentiallyValid
            }
          }));
          
          // Check if all fields are valid
          const allFieldsValid = Object.values(event.fields).every(field => field.isValid);
          setIsFormValid(allFieldsValid);
        });
        
        hostedFields.on('cardTypeChange', (event) => {
          // Handle card type changes if needed
          console.log('Card type:', event.card?.type);
        });
        
        hostedFields.on('inputSubmitRequest', () => {
          submitForm();
        });
      });
    }
  };

  const submitForm = async () => {
    if (!hostedFieldsInstance || !isFormValid) {
      setPaymentStatus('Please fill in all required fields correctly');
      return;
    }

    setIsLoading(true);
    setPaymentStatus('');

    try {
      const { orderId } = await hostedFieldsInstance.submit({
        // Collect additional form data
        contingencies: ['SCA_WHEN_REQUIRED']
      });

      // Capture the payment on your backend
      const response = await fetch(`${BACKEND_URL}/api/paypal/capture-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: orderId
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setPaymentStatus('Payment successful!');
      } else {
        setPaymentStatus('Payment failed: ' + result.error);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldStatus = (fieldName) => {
    const field = fieldStates[fieldName];
    if (!field) return '';
    if (field.isValid) return 'valid';
    if (!field.isPotentiallyValid) return 'invalid';
    return '';
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>
      </div>

      <div className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className={`relative ${getFieldStatus('number') === 'valid' ? 'border-green-500' : getFieldStatus('number') === 'invalid' ? 'border-red-500' : ''}`}>
            <div id="card-number" className="w-full"></div>
          </div>
        </div>

        {/* Expiration Date and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <div className={`relative ${getFieldStatus('expirationDate') === 'valid' ? 'border-green-500' : getFieldStatus('expirationDate') === 'invalid' ? 'border-red-500' : ''}`}>
              <div id="expiration-date" className="w-full"></div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <div className={`relative ${getFieldStatus('cvv') === 'valid' ? 'border-green-500' : getFieldStatus('cvv') === 'invalid' ? 'border-red-500' : ''}`}>
              <div id="cvv" className="w-full"></div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={submitForm}
          disabled={isLoading || !isFormValid}
          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
            isLoading || !isFormValid
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Pay $10.00
            </>
          )}
        </button>
      </div>

      {/* Status Messages */}
      {paymentStatus && (
        <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
          paymentStatus.includes('successful') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {paymentStatus.includes('successful') ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {paymentStatus}
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-4 text-xs text-gray-500 flex items-center gap-1">
        <Lock className="w-3 h-3" />
        Your payment information is secure and encrypted
      </div>
    </div>
  );
};

export default PayPalHostedFields;