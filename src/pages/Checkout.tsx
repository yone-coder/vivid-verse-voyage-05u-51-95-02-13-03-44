import React, { useEffect, useState } from 'react';
import { CreditCard, Lock, AlertCircle, CheckCircle, Info } from 'lucide-react';

const PayPalHostedFields = () => {
  const [isLoading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [hostedFieldsInstance, setHostedFieldsInstance] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [fieldStates, setFieldStates] = useState({});
  const [debugInfo, setDebugInfo] = useState([]);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [clientToken, setClientToken] = useState(null);
  const [initializationComplete, setInitializationComplete] = useState(false);

  const PAYPAL_CLIENT_ID = 'AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj';
  const BACKEND_URL = 'https://paypal-with-nodejs.onrender.com';

  const addDebugInfo = (message) => {
    console.log(message);
    setDebugInfo((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const getClientToken = async () => {
    try {
      addDebugInfo('Fetching client token from backend...');
      const response = await fetch(`${BACKEND_URL}/api/paypal/client-token`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      addDebugInfo(`Client token received: ${data.clientToken ? 'SUCCESS' : 'FAILED'}`);
      if (data.clientToken) {
        addDebugInfo(`Token starts with: ${data.clientToken.substring(0, 10)}...`);
      }
      return data.clientToken;
    } catch (error) {
      addDebugInfo(`Error getting client token: ${error.message}`);
      throw error;
    }
  };

  const loadPayPalSDK = () => {
    return new Promise((resolve, reject) => {
      addDebugInfo('Loading PayPal SDK...');

      const existingScript = document.querySelector(`script[src*="paypal.com/sdk/js"]`);
      if (existingScript) {
        addDebugInfo('PayPal script already exists, removing...');
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=hosted-fields`;
      script.async = true;

      script.onload = () => {
        addDebugInfo('PayPal SDK loaded successfully');
        console.log('window.paypal:', window.paypal);
        addDebugInfo(`Available components: ${Object.keys(window.paypal || {}).join(', ')}`);
        if (window.paypal && window.paypal.HostedFields) {
          addDebugInfo('HostedFields component available');
          const hostedFields = window.paypal.HostedFields();
          if (hostedFields.isEligible()) {
            addDebugInfo('HostedFields is eligible for this account');
          } else {
            addDebugInfo('ERROR: HostedFields is NOT eligible. Check PayPal account settings.');
            setPaymentStatus('Advanced Card Payments not supported. Contact support or use another payment method.');
          }
        } else {
          addDebugInfo('ERROR: HostedFields component not available after SDK load');
          setPaymentStatus('Hosted Fields not available. Ensure Advanced Card Payments is enabled in your PayPal account.');
        }
        setSdkLoaded(true);
        resolve();
      };

      script.onerror = (error) => {
        addDebugInfo(`Error loading PayPal SDK: ${error.toString()}`);
        setPaymentStatus('Failed to load PayPal SDK. Please try again.');
        reject(error);
      };

      document.head.appendChild(script);
    });
  };

  const initializeHostedFields = async (token) => {
    addDebugInfo('Initializing Hosted Fields...');

    const cardNumberEl = document.getElementById('card-number');
    const cvvEl = document.getElementById('cvv');
    const expirationDateEl = document.getElementById('expiration-date');
    if (!cardNumberEl || !cvvEl || !expirationDateEl) {
      addDebugInfo('ERROR: One or more DOM elements for Hosted Fields are missing');
      setPaymentStatus('Payment form initialization failed: DOM elements missing');
      return;
    }

    if (!window.paypal) {
      addDebugInfo('ERROR: PayPal SDK not available on window object');
      setPaymentStatus('PayPal SDK not loaded. Please try again.');
      return;
    }

    if (!window.paypal.HostedFields) {
      addDebugInfo('ERROR: PayPal HostedFields not available');
      setPaymentStatus('Hosted Fields not available. Ensure Advanced Card Payments is enabled in your PayPal account.');
      return;
    }

    if (!token) {
      addDebugInfo('ERROR: Client token not available');
      setPaymentStatus('Client token not received. Please try again.');
      return;
    }

    if (typeof token !== 'string' || token.length < 10) {
      addDebugInfo(`ERROR: Invalid client token format. Token: ${token}`);
      setPaymentStatus('Invalid client token. Please try again.');
      return;
    }

    addDebugInfo(`Initializing with token: ${token.substring(0, 20)}...`);

    try {
      const hostedFields = await window.paypal.HostedFields.render({
        authorization: token,
        createOrder: async () => {
          addDebugInfo('Creating order...');
          try {
            const response = await fetch(`${BACKEND_URL}/api/paypal/create-order`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ amount: '10.00', currency: 'USD' }),
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
          '.valid': { color: '#28a745' },
          '.invalid': { color: '#dc3545' },
          input: {
            'font-size': '16px',
            'font-family': 'system-ui, -apple-system, sans-serif',
            color: '#374151',
            padding: '12px',
            border: 'none',
            outline: 'none',
            width: '100%',
            'box-sizing': 'border-box',
            background: 'transparent',
          },
          ':focus': { outline: 'none' },
        },
        fields: {
          number: { selector: '#card-number', placeholder: '1234 5678 9012 3456' },
          cvv: { selector: '#cvv', placeholder: '123' },
          expirationDate: { selector: '#expiration-date', placeholder: 'MM/YY' },
        },
      });

      addDebugInfo('Hosted Fields rendered successfully');
      setHostedFieldsInstance(hostedFields);
      setInitializationComplete(true);

      hostedFields.on('validityChange', (event) => {
        addDebugInfo(`Field ${event.emittedBy} validity changed`);
        const field = event.fields[event.emittedBy];
        setFieldStates((prev) => ({
          ...prev,
          [event.emittedBy]: { isValid: field.isValid, isPotentiallyValid: field.isPotentiallyValid },
        }));
        const allFieldsValid = Object.values(event.fields).every((field) => field.isValid);
        setIsFormValid(allFieldsValid);
        addDebugInfo(`All fields valid: ${allFieldsValid}`);
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

      hostedFields.on('empty', (event) => {
        addDebugInfo(`Field ${event.emittedBy} is empty`);
      });

      hostedFields.on('notEmpty', (event) => {
        addDebugInfo(`Field ${event.emittedBy} is not empty`);
      });
    } catch (error) {
      addDebugInfo(`Error rendering Hosted Fields: ${error.message}`);
      console.error('Hosted Fields Error:', error);
      setPaymentStatus('Failed to initialize payment form: ' + error.message);
    }
  };

  useEffect(() => {
    const initializePayPal = async () => {
      addDebugInfo('Starting PayPal initialization...');
      setInitializationComplete(false);
      setClientToken(null);
      setSdkLoaded(false);

      try {
        await loadPayPalSDK();
        const token = await getClientToken();
        if (!token) {
          throw new Error('No client token received from backend');
        }
        addDebugInfo('SDK loaded and client token received, setting state...');
        setClientToken(token);
      } catch (error) {
        addDebugInfo(`Initialization failed: ${error.message}`);
        setPaymentStatus('Failed to initialize payment system: ' + error.message);
      }
    };

    setHostedFieldsInstance(null);
    setFieldStates({});
    setIsFormValid(false);
    setPaymentStatus('');
    initializePayPal();
  }, []);

  useEffect(() => {
    if (sdkLoaded && clientToken && !initializationComplete && !hostedFieldsInstance) {
      addDebugInfo('Both SDK loaded and client token available, initializing hosted fields...');
      setTimeout(() => {
        initializeHostedFields(clientToken);
      }, 1000);
    }
  }, [sdkLoaded, clientToken, initializationComplete, hostedFieldsInstance]);

  const submitForm = async () => {
    if (!hostedFieldsInstance) {
      addDebugInfo('Submit blocked: Hosted fields not initialized');
      setPaymentStatus('Payment form not ready. Please wait...');
      return;
    }

    if (!isFormValid) {
      addDebugInfo('Submit blocked: Form validation failed');
      setPaymentStatus('Please fill in all required fields correctly');
      return;
    }

    setIsLoading(true);
    setPaymentStatus('');
    addDebugInfo('Submitting form...');

    try {
      const result = await hostedFieldsInstance.submit({
        contingencies: ['SCA_WHEN_REQUIRED'],
      });

      addDebugInfo(`Form submitted, Order ID: ${result.orderId}`);
      const response = await fetch(`${BACKEND_URL}/api/paypal/capture-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderID: result.orderId }),
      });

      const captureResult = await response.json();
      addDebugInfo(`Capture result: ${JSON.stringify(captureResult)}`);

      if (captureResult.success) {
        setPaymentStatus('Payment successful!');
        addDebugInfo('Payment completed successfully');
      } else {
        setPaymentStatus('Payment failed: ' + (captureResult.error || 'Unknown error'));
        addDebugInfo(`Payment failed: ${captureResult.error || 'Unknown error'}`);
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
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      addDebugInfo(`Backend test successful: ${JSON.stringify(data)}`);
    } catch (error) {
      addDebugInfo(`Backend test failed: ${error.message}`);
    }
  };

  const resetPayPal = () => {
    addDebugInfo('Resetting PayPal integration...');
    setInitializationComplete(false);
    setHostedFieldsInstance(null);
    setClientToken(null);
    setSdkLoaded(false);
    setFieldStates({});
    setIsFormValid(false);
    setPaymentStatus('');

    const existingScript = document.querySelector(`script[src*="paypal.com/sdk/js"]`);
    if (existingScript) {
      existingScript.remove();
    }

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>
        </div>

        {!initializationComplete && !paymentStatus.includes('Failed') && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-800 rounded-lg flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            Initializing payment form...
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
            <div
              className={`border rounded-lg p-0 min-h-[50px] flex items-center ${
                getFieldStatus('number') === 'valid'
                  ? 'border-green-500 bg-green-50'
                  : getFieldStatus('number') === 'invalid'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div id="card-number" className="w-full p-3"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <div
                className={`border rounded-lg p-0 min-h-[50px] flex items-center ${
                  getFieldStatus('expirationDate') === 'valid'
                    ? 'border-green-500 bg-green-50'
                    : getFieldStatus('expirationDate') === 'invalid'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div id="expiration-date" className="w-full p-3"></div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
              <div
                className={`border rounded-lg p-0 min-h-[50px] flex items-center ${
                  getFieldStatus('cvv') === 'valid'
                    ? 'border-green-500 bg-green-50'
                    : getFieldStatus('cvv') === 'invalid'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div id="cvv" className="w-full p-3"></div>
              </div>
            </div>
          </div>

          <button
            onClick={submitForm}
            disabled={isLoading || !isFormValid || !initializationComplete}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
              isLoading || !isFormValid || !initializationComplete
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

        {paymentStatus && (
          <div
            className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
              paymentStatus.includes('successful')
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {paymentStatus.includes('successful') ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {paymentStatus}
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500 flex items-center gap-1">
          <Lock className="w-3 h-3" />
          Your payment information is secure and encrypted
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium text-gray-800">Debug Information</h3>
          <div className="ml-auto flex gap-2">
            <button
              onClick={testBackendConnection}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Test Backend
            </button>
            <button
              onClick={resetPayPal}
              className="px-3 py-1 text-sm bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">SDK Loaded:</span>{' '}
              <span className={sdkLoaded ? 'text-green-600' : 'text-red-600'}>
                {sdkLoaded ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="font-medium">Client Token:</span>{' '}
              <span className={clientToken ? 'text-green-600' : 'text-red-600'}>
                {clientToken ? `Yes (${clientToken.length} chars)` : 'No'}
              </span>
            </div>
            <div>
              <span className="font-medium">Initialization:</span>{' '}
              <span className={initializationComplete ? 'text-green-600' : 'text-orange-600'}>
                {initializationComplete ? 'Complete' : 'In Progress'}
              </span>
            </div>
            <div>
              <span className="font-medium">Form Valid:</span>{' '}
              <span className={isFormValid ? 'text-green-600' : 'text-red-600'}>
                {isFormValid ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <div className="font-medium text-sm mb-2">Recent Activity:</div>
            <div className="bg-white rounded border max-h-40 overflow-y-auto">
              {debugInfo.length === 0 ? (
                <div className="p-2 text-gray-500 text-sm">No debug info yet...</div>
              ) : (
                debugInfo.slice(-15).map((info, index) => (
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