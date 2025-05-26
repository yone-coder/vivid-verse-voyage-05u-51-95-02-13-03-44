import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const Checkout = () => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency || "USD");
  const [amount, setAmount] = useState("8.99");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const onCurrencyChange = ({ target: { value } }) => {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  };

  // Create order directly with PayPal (no backend needed for demo)
  const onCreateOrder = (data, actions) => {
    console.log('Creating order with amount:', amount, 'currency:', currency);
    
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount,
          },
          description: `Payment of ${amount} ${currency}`,
        },
      ],
      application_context: {
        brand_name: "Your Store Name",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: window.location.origin + "/success",
        cancel_url: window.location.origin + "/cancel",
      },
    });
  };

  // Handle order approval
  const onApproveOrder = (data, actions) => {
    setIsProcessing(true);
    console.log('Approving order:', data.orderID);

    return actions.order.capture().then((details) => {
      console.log('Order captured:', details);
      
      const name = details.payer.name.given_name;
      const transactionId = details.purchase_units[0].payments.captures[0].id;
      
      setMessage(`🎉 Payment completed successfully by ${name}! Transaction ID: ${transactionId}`);
      setIsProcessing(false);
      
      // Here you would typically:
      // 1. Send the transaction details to your backend
      // 2. Update your database
      // 3. Send confirmation email
      // 4. Redirect to success page
      
      console.log("Transaction completed:", details);
    }).catch((error) => {
      console.error('Error capturing order:', error);
      setMessage("❌ Payment processing failed. Please try again.");
      setIsProcessing(false);
    });
  };

  const onError = (err) => {
    console.error('PayPal error:', err);
    setMessage("❌ An error occurred during payment processing.");
    setIsProcessing(false);
  };

  const onCancel = (data) => {
    console.log('Payment cancelled:', data);
    setMessage("ℹ️ Payment was cancelled.");
    setIsProcessing(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        PayPal Checkout
      </h2>

      {message && (
        <div className={`p-4 mb-4 rounded-lg ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : message.includes('cancelled')
            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {isPending ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading PayPal...</span>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ({currency}):
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.01"
                  min="0.01"
                  disabled={isProcessing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency:
                <select 
                  value={currency} 
                  onChange={onCurrencyChange}
                  disabled={isProcessing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="USD">💵 USD</option>
                  <option value="EUR">💶 EUR</option>
                  <option value="GBP">💷 GBP</option>
                  <option value="CAD">🍁 CAD</option>
                  <option value="AUD">🇦🇺 AUD</option>
                </select>
              </label>
            </div>
          </div>

          {isProcessing && (
            <div className="flex items-center justify-center py-4 mb-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Processing payment...</span>
            </div>
          )}

          <div className={isProcessing ? 'opacity-50 pointer-events-none' : ''}>
            <PayPalButtons 
              style={{ 
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "paypal",
                height: 40
              }}
              createOrder={onCreateOrder}
              onApprove={onApproveOrder}
              onError={onError}
              onCancel={onCancel}
              disabled={isProcessing}
            />
          </div>

          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>💳 Test with PayPal sandbox accounts</p>
            <p>🔒 Secure payment processing</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;