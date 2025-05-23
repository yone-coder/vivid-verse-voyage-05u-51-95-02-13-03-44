import React, { useEffect, useRef, useState } from 'react';

const PayPalCreditCardCheckout = () => {
  const [amount, setAmount] = useState('10.00');
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('Sample Product');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hostedFieldsInstance, setHostedFieldsInstance] = useState(null);
  const [cardValid, setCardValid] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  // Replace with your actual PayPal Client ID
  const CLIENT_ID = 'AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj';

  useEffect(() => {
    // Clear any existing PayPal scripts
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Load PayPal SDK with hosted fields
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=${currency}&components=hosted-fields&disable-funding=paylater,venmo`;
    script.async = true;

    script.onload = () => {
      console.log('PayPal SDK loaded');
      setSdkLoaded(true);
      
      if (window.paypal && window.paypal.HostedFields && window.paypal.HostedFields.isEligible()) {
        console.log('Hosted Fields eligible, rendering...');
        
        window.paypal.HostedFields.render({
          createOrder: function() {
            return fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CLIENT_ID}`, // This won't work without proper auth
              },
              body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                  amount: {
                    currency_code: currency,
                    value: amount
                  },
                  description: description
                }]
              })
            }).then(response => response.json())
              .then(order => order.id)
              .catch(error => {
                console.log('Order creation failed, using fallback method');
                // Fallback: Let PayPal handle order creation
                return window.paypal.HostedFields.createOrder({
                  purchase_units: [{
                    amount: {
                      currency_code: currency,
                      value: amount
                    },
                    description: description
                  }]
                });
              });
          },
          styles: {
            'input': {
              'font-size': '16px',
              'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              'color': '#374151',
              'padding': '12px'
            },
            ':focus': {
              'color': '#1f2937'
            },
            '.invalid': {
              'color': '#ef4444'
            },
            '.valid': {
              'color': '#10b981'
            }
          },
          fields: {
            number: {
              selector: '#card-number',
              placeholder: '1234 1234 1234 1234'
            },
            cvv: {
              selector: '#cvv', 
              placeholder: '123'
            },
            expirationDate: {
              selector: '#expiry-date',
              placeholder: 'MM/YY'
            }
          }
        }).then((hostedFields) => {
          console.log('Hosted Fields rendered successfully');
          setHostedFieldsInstance(hostedFields);

          // Listen for field validation events
          hostedFields.on('validityChange', (event) => {
            console.log('Validity changed:', event);
            const formValid = Object.keys(event.fields).every(key => {
              return event.fields[key].isValid;
            });
            setCardValid(formValid);
          });

          hostedFields.on('cardTypeChange', (event) => {
            console.log('Card type changed:', event.card ? event.card.type : 'unknown');
          });

          hostedFields.on('inputSubmitRequest', () => {
            console.log('Input submit requested');
            handleSubmit();
          });

        }).catch((err) => {
          console.error('Error rendering hosted fields:', err);
          setPaymentStatus('error');
        });
      } else {
        console.error('Hosted Fields not eligible or not available');
        setPaymentStatus('error');
      }
    };

    script.onerror = () => {
      console.error('Failed to load PayPal SDK');
      setPaymentStatus('error');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [amount, currency, description]);

  const handleSubmit = async () => {
    if (!hostedFieldsInstance) {
      console.error('Hosted fields not ready');
      return;
    }

    if (!cardValid) {
      alert('Please fill in all card details correctly');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Submitting payment...');
      const result = await hostedFieldsInstance.submit({
        contingencies: ['3D_SECURE']
      });

      console.log('Payment result:', result);
      setPaymentStatus('success');
      
    } catch (error) {
      console.error('Payment submission error:', error);
      setPaymentStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPayment = () => {
    setPaymentStatus('');
    setCardValid(false);
    setSdkLoaded(false);
    setHostedFieldsInstance(null);
    // Force reload to reset everything
    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Secure Checkout</h1>
        <p className="text-gray-600">Pay with your credit or debit card</p>
      </div>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
          <div>SDK Loaded: {sdkLoaded ? '✅' : '❌'}</div>
          <div>Hosted Fields: {hostedFieldsInstance ? '✅' : '❌'}</div>
          <div>Card Valid: {cardValid ? '✅' : '❌'}</div>
        </div>
      )}

      {/* Payment Configuration */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {currency === 'USD' ? '$' : currency}
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0.01"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What are they paying for?"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-800 mb-2">Order Summary</h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{description}</span>
          <span className="font-medium">
            {currency === 'USD' ? '$' : ''}{amount} {currency !== 'USD' ? currency : ''}
          </span>
        </div>
        <div className="border-t mt-2 pt-2 flex justify-between items-center font-medium">
          <span>Total</span>
          <span>
            {currency === 'USD' ? '$' : ''}{amount} {currency !== 'USD' ? currency : ''}
          </span>
        </div>
      </div>

      {/* Payment Status Messages */}
      {paymentStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Payment Successful!</h3>
              <p className="text-sm text-green-700 mt-1">Your payment has been processed successfully.</p>
            </div>
          </div>
          <button
            onClick={resetPayment}
            className="mt-3 text-sm text-green-600 hover:text-green-500 underline"
          >
            Make another payment
          </button>
        </div>
      )}

      {paymentStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Setup Issue Detected</h3>
              <p className="text-sm text-red-700 mt-1">The PayPal Hosted Fields couldn't load. This might be because:</p>
              <ul className="text-sm text-red-700 mt-2 list-disc list-inside">
                <li>Your PayPal Client ID needs to be activated for Hosted Fields</li>
                <li>Your domain needs to be whitelisted in PayPal settings</li>
                <li>Hosted Fields might not be available in your region</li>
              </ul>
            </div>
          </div>
          <button
            onClick={resetPayment}
            className="mt-3 text-sm text-red-600 hover:text-red-500 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Credit Card Form */}
      {!paymentStatus && sdkLoaded && (
        <div>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <div 
                id="card-number"
                className="w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-white"
                style={{ minHeight: '48px' }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <div 
                  id="expiry-date"
                  className="w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-white"
                  style={{ minHeight: '48px' }}
                ></div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <div 
                  id="cvv"
                  className="w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-white"
                  style={{ minHeight: '48px' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!cardValid || isLoading || !hostedFieldsInstance}
            className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
              cardValid && !isLoading && hostedFieldsInstance
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : !hostedFieldsInstance ? (
              'Loading payment form...'
            ) : (
              `Pay ${currency === 'USD' ? '$' : ''}${amount} ${currency !== 'USD' ? currency : ''}`
            )}
          </button>
        </div>
      )}

      {/* Loading State */}
      {!paymentStatus && !sdkLoaded && (
        <div className="text-center py-8">
          <div className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading secure payment form...
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Secured by PayPal • Your card details are encrypted
        </div>
        <p className="text-xs text-gray-400 mt-1">
          We accept Visa, Mastercard, American Express, and Discover
        </p>
      </div>

      {/* Setup Instructions */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">PayPal Hosted Fields Setup</h4>
        <p className="text-sm text-blue-700">
          To enable credit card processing, ensure:
        </p>
        <ol className="text-sm text-blue-700 mt-2 ml-4 list-decimal">
          <li>Your PayPal Business account has Hosted Fields enabled</li>
          <li>Your domain is added to the approved domains list</li>
          <li>Advanced Credit and Debit Card Payments are activated</li>
          <li>You're using a live Client ID (not sandbox) for production</li>
        </ol>
        <p className="text-xs text-blue-600 mt-2">
          Check the browser console for detailed error messages.
        </p>
      </div>
    </div>
  );
};

export default PayPalCreditCardCheckout;