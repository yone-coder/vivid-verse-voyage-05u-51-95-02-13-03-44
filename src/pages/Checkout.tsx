
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const quantity = searchParams.get('quantity') || '1';
  const color = searchParams.get('color') || 'Black';
  const price = searchParams.get('price') || '79.99';

  return (
    <div className="max-w-2xl mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Wireless Bluetooth Earbuds ({color})</span>
            <span>${price}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Quantity</span>
            <span>{quantity}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${(parseFloat(price) * parseInt(quantity)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
        onClick={() => alert('Payment processing would be implemented here')}
      >
        Complete Purchase
      </button>
    </div>
  );
};

export default Checkout;
