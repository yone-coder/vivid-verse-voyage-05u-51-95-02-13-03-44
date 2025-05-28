import React, { useEffect, useState } from 'react';
import { CreditCard, Lock, AlertCircle, CheckCircle, Info } from 'lucide-react';

const PayPalHostedFields = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [hostedFieldsInstance, setHostedFieldsInstance] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [fieldStates, setFieldStates] = useState({});
  const [debugInfo, setDebugInfo] = useState([]);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  // Replace with your actual PayPal client ID
  const PAYPAL_CLIENT_ID = 'AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4';

  // Replace with your backend URL (Render.com)
  const BACKEND_URL = 'https://paypal-with-nodejs.onrender.com';

  const addDebugInfo = (message) => {
    console.log(message);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    addDebugInfo('Starting PayPal SDK load...');
    
    // Check if script already exists
    const existingScript = document.querySelector(`script[src*="paypal.com/sdk/js"]`);
    if (existingScript) {
      addDebugInfo('PayPal script already exists, removing...');
      existingScript.remove();
    }

    // Load PayPal SDK with additional parameters for debugging
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=hosted-fields&debug=true`;
    script.async = true;
    
    script.onload = () => {
      addDebugInfo('PayPal SDK loaded successfully');
      setSdkLoaded(true);
      initializeHostedFields();
    };
    
    script.onerror = (error) => {
      addDebugInfo('Error loading PayPal SDK: ' + error.toString());
    };
    
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const initializeHostedFields = () => {
    addDebugInfo('Initializing Hosted Fields...');
    
    if (!window.paypal) {
      addDebugInfo('ERROR: PayPal SDK not available on window object');
      return;
    }

    if (!window.paypal.HostedFields) {
      addDebugInfo('ERROR: PayPal HostedFields not available');
      return;
    }

    addDebugInfo('PayPal HostedFields available, rendering...');

    window.paypal.HostedFields.render({
      createOrder: async () => {
        addDebugInfo('Creating order...');
        try {
          const response = await fetch(`${BACKEND_URL}/api/paypal/create-order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: '10.00',
              currency: 'USD'
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          addDebugInfo(`Order created with ID: ${data.id}`);
          return data.id;
        } catch (error) {
          addDebugInfo(`Error creating order: ${error.message}`);
          setPaymentStatus('Error creating payment order: ' + error.message);
          throw error;
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
          'border-radius': '6px',
          'width': '100%',
          'box-sizing': 'border-box'
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
      addDebugInfo('Hosted Fields rendered successfully');
      setHostedFieldsInstance(hostedFields);

      // Add validation listeners
      hostedFields.on('validityChange', (event) => {
        addDebugInfo(`Field ${event.emittedBy} validity changed`);
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
        addDebugInfo(`Card type changed: ${event.card?.type || 'unknown'}`);
      });

      hostedFields.on('inputSubmitRequest', () => {
        addDebugInfo('Input submit requested');
        submitForm();
      });

      hostedFields.on('focus', (event) => {
        addDebugInfo(`Field ${event.emittedBy} focused`);
      });

      hostedFields.on('blur', (event) => {
        addDebugInfo(`Field ${event.emittedBy} blurred`);
      });

    }).catch((error) => {
      addDebugInfo(`Error rendering Hosted Fields: ${error.message}`);
      console.error('Hosted Fields Error:', error);
    });
  };

  const submitForm = async () => {
    if (!hostedFieldsInstance || !isFormValid) {
      const message = !hostedFieldsInstance ? 'Hosted fields not initialized' : 'Form validation failed';
      addDebugInfo(`Submit blocked: ${message}`);
      setPaymentStatus('Please fill in all required fields correctly');
      return;
    }

    setIsLoading(true);
    setPaymentStatus('');
    addDebugInfo('Submitting form...');

    try {
      const result = await hostedFieldsInstance.submit({
        contingencies: ['SCA_WHEN_REQUIRED']
      });

      addDebugInfo(`Form submitted, Order ID: ${result.orderId}`);

      // Capture the payment on your backend
      const response = await fetch(`${BACKEND_URL}/api/paypal/capture-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: result.orderId
        }),
      });

      const captureResult = await response.json();
      addDebugInfo(`Capture result: ${JSON.stringify(captureResult)}`);

      if (captureResult.success) {
        setPaymentStatus('Payment successful!');
        addDebugInfo('Payment completed successfully');
      } else {
        setPaymentStatus('Payment failed: ' + captureResult.error);
        addDebugInfo(`Payment failed: ${captureResult.error}`);
      }
    } catch (error) {
      addDebugInfo(`Payment error: ${error.message}`);
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

  const testBackendConnection = async () => {
    try {
      addDebugInfo('Testing backend connection...');
      const response = await fetch(`${BACKEND_URL}/health`);
      const data = await response.json();
      addDebugInfo(`Backend test successful: ${JSON.stringify(data)}`);
    } catch (error) {
      addDebugInfo(`Backend test failed: ${error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Main Payment Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
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
            <div className={`border rounded-lg p-3 min-h-[50px] ${getFieldStatus('number') === 'valid' ? 'border-green-500' : getFieldStatus('number') === 'invalid' ? 'border-red-500' : 'border-gray-300'}`}>
              <div id="card-number"></div>
            </div>
          </div>

          {/* Expiration Date and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <div className={`border rounded-lg p-3 min-h-[50px] ${getFieldStatus('expirationDate') === 'valid' ? 'border-green-500' : getFieldStatus('expirationDate') === 'invalid' ? 'border-red-500' : 'border-gray-300'}`}>
                <div id="expiration-date"></div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <div className={`border rounded-lg p-3 min-h-[50px] ${getFieldStatus('cvv') === 'valid' ? 'border-green-500' : getFieldStatus('cvv') === 'invalid' ? 'border-red-500' : 'border-gray-300'}`}>
                <div id="cvv"></div>
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

      {/* Debug Panel */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium text-gray-800">Debug Information</h3>
          <button
            onClick={testBackendConnection}
            className="ml-auto px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Test Backend
          </button>
        </div>
        
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">SDK Loaded:</span> 
              <span className={sdkLoaded ? 'text-green-600' : 'text-red-600'}>
                {sdkLoaded ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="font-medium">Form Valid:</span> 
              <span className={isFormValid ? 'text-green-600' : 'text-red-600'}>
                {isFormValid ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="font-medium">Backend URL:</span> 
              <span className="text-blue-600">{BACKEND_URL}</span>
            </div>
            <div>
              <span className="font-medium">Client ID:</span> 
              <span className="text-blue-600">{PAYPAL_CLIENT_ID.substring(0, 20)}...</span>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="font-medium text-sm mb-2">Recent Activity:</div>
            <div className="bg-white rounded border max-h-40 overflow-y-auto">
              {debugInfo.length === 0 ? (
                <div className="p-2 text-gray-500 text-sm">No debug info yet...</div>
              ) : (
                debugInfo.slice(-10).map((info, index) => (
                  <div key={index} className="p-2 text-xs border-b last:border-b-0 font-mono">
                    {info}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPalHostedFields;