
import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from 'sonner';

const Checkout: React.FC = () => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency || "USD");
  const [amount, setAmount] = useState("8.99");

  const API_BASE = 'https://paypal-with-nodejs.onrender.com';

  const onCurrencyChange = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
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
  const onCreateOrder = async (data: any, actions: any) => {
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
      toast.error('Failed to create order. Please try again.');
      throw error;
    }
  };

  // Capture the order on your backend
  const onApproveOrder = async (data: any, actions: any) => {
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
        toast.success(`Payment completed successfully! Order ID: ${data.orderID}`);
        // You can redirect or update UI here
        // window.location.href = '/success';
      } else {
        throw new Error('Payment capture failed - invalid response');
      }
    } catch (error) {
      console.error('Error capturing order:', error);
      toast.error('Payment processing failed. Please try again.');
      throw error;
    }
  };

  const onError = (err: any) => {
    console.error('PayPal error:', err);
    toast.error('An error occurred during payment processing.');
  };

  const onCancel = (data: any) => {
    console.log('Payment cancelled:', data);
    toast.info('Payment was cancelled.');
  };

  return (
    <div className="checkout max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Checkout</h2>
      
      {isPending ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading PayPal...</span>
        </div>
      ) : (
        <>
          <div className="payment-options space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount: $
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.01"
                  min="0.01"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency:
                <select 
                  value={currency} 
                  onChange={onCurrencyChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="USD">💵 USD</option>
                  <option value="EUR">💶 Euro</option>
                </select>
              </label>
            </div>
          </div>

          <PayPalButtons 
            style={{ 
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "paypal"
            }}
            createOrder={onCreateOrder}
            onApprove={onApproveOrder}
            onError={onError}
            onCancel={onCancel}
          />
        </>
      )}
    </div>
  );
};

export default Checkout;
