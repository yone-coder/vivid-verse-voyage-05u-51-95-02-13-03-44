
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PayPalCheckout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect to the PayPal hosted checkout page
    window.location.href = 'https://paypal-with-nodejs.onrender.com';
  }, []);

  // This component will only show briefly before the redirect happens
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Redirecting to Secure Checkout</h1>
        <p className="text-gray-600">Please wait, you're being redirected to our secure payment processor...</p>
      </div>

      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <div className="mt-6 text-center">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Cancel and go back
        </Button>

        <p className="text-xs text-gray-500 mt-4">
          If you're not automatically redirected,
          <a 
            href="https://paypal-with-nodejs.onrender.com" 
            className="text-blue-500 hover:underline ml-1"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default PayPalCheckout;
