
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from "@/hooks/use-toast";

const PayPalCheckout = () => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState('10.00');
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('Sample Product');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Replace with your actual PayPal Client ID
  const CLIENT_ID = 'sb'; // Using sandbox for demo purposes

  useEffect(() => {
    // Load PayPal SDK
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=${currency}&disable-funding=credit,card`;
    script.async = true;
    
    script.onload = () => {
      if (window.paypal && paypalRef.current) {
        window.paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount,
                  currency_code: currency
                },
                description: description
              }]
            });
          },
          onApprove: async (data: any, actions: any) => {
            setIsLoading(true);
            try {
              const details = await actions.order.capture();
              setPaymentStatus('success');
              console.log('Payment completed:', details);
              toast({
                title: "Payment Successful",
                description: "Your payment has been processed successfully.",
                variant: "default",
              });
              
              // Here you would typically send the payment details to your backend
              // to verify and process the payment
              
            } catch (error) {
              console.error('Payment error:', error);
              setPaymentStatus('error');
              toast({
                title: "Payment Failed",
                description: "There was an error processing your payment.",
                variant: "destructive",
              });
            } finally {
              setIsLoading(false);
            }
          },
          onError: (err: any) => {
            console.error('PayPal error:', err);
            setPaymentStatus('error');
            toast({
              title: "Payment Error",
              description: "There was an error with PayPal. Please try again.",
              variant: "destructive",
            });
          },
          onCancel: (data: any) => {
            console.log('Payment cancelled:', data);
            setPaymentStatus('cancelled');
            toast({
              title: "Payment Cancelled",
              description: "You've cancelled the payment process.",
              variant: "default",
            });
          }
        }).render(paypalRef.current);
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [amount, currency, description, toast]);

  const resetPayment = () => {
    setPaymentStatus('');
    window.location.reload(); // Simple way to reset PayPal buttons
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Secure Checkout</h1>
        <p className="text-gray-600">Pay safely with PayPal</p>
      </div>

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
              <h3 className="text-sm font-medium text-red-800">Payment Failed</h3>
              <p className="text-sm text-red-700 mt-1">There was an error processing your payment. Please try again.</p>
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

      {paymentStatus === 'cancelled' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Payment Cancelled</h3>
              <p className="text-sm text-yellow-700 mt-1">Your payment was cancelled. You can try again when ready.</p>
            </div>
          </div>
        </div>
      )}

      {/* PayPal Button Container */}
      {!paymentStatus && (
        <div>
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">
              You'll be redirected to PayPal to complete your payment securely
            </p>
          </div>
          
          {isLoading && (
            <div className="text-center mb-4">
              <div className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing payment...
              </div>
            </div>
          )}
          
          <div ref={paypalRef}></div>
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Secured by PayPal
        </div>
      </div>

      {/* Setup Instructions */}
      {CLIENT_ID === 'YOUR_PAYPAL_CLIENT_ID' && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Setup Required</h4>
          <p className="text-sm text-blue-700">
            To use this checkout, you need to:
          </p>
          <ol className="text-sm text-blue-700 mt-2 ml-4 list-decimal">
            <li>Create a PayPal Developer account</li>
            <li>Get your Client ID from the PayPal Developer Dashboard</li>
            <li>Replace 'YOUR_PAYPAL_CLIENT_ID' in the code with your actual Client ID</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default PayPalCheckout;
