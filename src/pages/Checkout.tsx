import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const Checkout = () => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency || "USD");
  const [amount, setAmount] = useState("8.99");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const API_BASE = 'https://paypal-with-nodejs.onrender.com';

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

  // Create order on your backend
  const onCreateOrder = async (data, actions) => {
    setIsProcessing(true);
    setMessage("");
    
    try {
      console.log('Creating order with amount:', amount, 'currency:', currency);

      const response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: currency
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to create order:', response.status, errorText);
        throw new Error(`Failed to create order: ${response.status}`);
      }

      const orderData = await response.json();
      console.log('Order created:', orderData);

      if (orderData.id) {
        return orderData.id;
      } else {
        throw new Error('No order ID received from backend');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setMessage('Failed to create order. Please try again.');
      setIsProcessing(false);
      throw error;
    }
  };

  // Capture the order on your backend
  const onApproveOrder = async (data, actions) => {
    setIsProcessing(true);
    
    try {
      console.log('Capturing order:', data.orderID);

      const response = await fetch(`${API_BASE}/api/orders/${data.orderID}/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to capture order:', response.status, errorText);
        throw new Error(`Failed to capture payment: ${response.status}`);
      }

      const orderData = await response.json();
      console.log('Order captured:', orderData);

      if (orderData.success || orderData.status === 'COMPLETED') {
        setMessage(`✅ Payment completed successfully! Order ID: ${data.orderID}`);
        // You can redirect or update UI here
        // window.location.href = '/success';
      } else {
        throw new Error('Payment capture failed - invalid response');
      }
    } catch (error) {
      console.error('Error capturing order:', error);
      setMessage('❌ Payment processing failed. Please try again.');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const onError = (err) => {
    console.error('PayPal error:', err);
    setMessage('❌ An error occurred during payment processing.');
    setIsProcessing(false);
  };

  const onCancel = (data) => {
    console.log('Payment cancelled:', data);
    setMessage('ℹ️ Payment was cancelled.');
    setIsProcessing(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">PayPal Checkout</h2>

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
                Amount ($):
              </label>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0.01"
                disabled={isProcessing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency:
              </label>
              <select 
                value={currency} 
                onChange={onCurrencyChange}
                disabled={isProcessing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="USD">💵 USD</option>
                <option value="EUR">💶 Euro</option>
              </select>
            </div>
          </div>

          {message && (
            <div className={`p-3 mb-4 rounded-md ${
              message.includes('✅') ? 'bg-green-50 text-green-800 border border-green-200' :
              message.includes('❌') ? 'bg-red-50 text-red-800 border border-red-200' :
              'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              {message}
            </div>
          )}

          {isProcessing && (
            <div className="flex items-center justify-center py-4 mb-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Processing payment...</span>
            </div>
          )}

          <PayPalButtons 
            style={{ 
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "paypal",
              height: 40
            }}
            disabled={isProcessing || !amount || parseFloat(amount) <= 0}
            createOrder={onCreateOrder}
            onApprove={onApproveOrder}
            onError={onError}
            onCancel={onCancel}
          />

          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>Test Mode: Use PayPal sandbox credentials</p>
            <p>Amount: ${amount} {currency}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;