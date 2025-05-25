import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Package, CreditCard, Shield, Users, Clock } from 'lucide-react';

const PayPalGuestCheckout = () => {
  const [backendUrl, setBackendUrl] = useState('');
  const [productAmount, setProductAmount] = useState('29.99');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const paypalContainerRef = useRef<HTMLDivElement>(null);

  // Auto-detect local development
  useEffect(() => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      setBackendUrl('http://localhost:3000');
    }
  }, []);

  const showError = (message: string) => {
    setError(message);
    setSuccess('');
    setTimeout(() => setError(''), 5000);
  };

  const showSuccess = (message: string) => {
    setSuccess(message);
    setError('');
  };

  const loadPayPalSDK = (clientId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Remove existing PayPal script if any
      const existingScript = document.querySelector('script[src*="paypal.com/sdk"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
      document.head.appendChild(script);
    });
  };

  const initPayPalButtons = () => {
    if (!paypalContainerRef.current) return;
    
    // Clear existing buttons
    paypalContainerRef.current.innerHTML = '';

    if (typeof window.paypal === 'undefined') {
      showError('PayPal SDK not loaded properly');
      return;
    }

    window.paypal.Buttons({
      createOrder: async (data: any, actions: any) => {
        try {
          const response = await fetch(`${backendUrl}/api/paypal/create-order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: productAmount,
              currency: 'USD',
              description: 'Amazing Product Purchase'
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create order');
          }

          const orderData = await response.json();
          return orderData.id;
        } catch (error: any) {
          console.error('Create order error:', error);
          showError(`Failed to create order: ${error.message}`);
          throw error;
        }
      },

      onApprove: async (data: any, actions: any) => {
        try {
          const response = await fetch(`${backendUrl}/api/paypal/capture-order/${data.orderID}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to capture payment');
          }

          const details = await response.json();
          
          if (details.success) {
            showSuccess(`Payment completed successfully! Transaction ID: ${details.transactionID}`);
            console.log('Payment details:', details);
          } else {
            throw new Error('Payment was not completed successfully');
          }
        } catch (error: any) {
          console.error('Capture payment error:', error);
          showError(`Payment failed: ${error.message}`);
        }
      },

      onError: (err: any) => {
        console.error('PayPal error:', err);
        showError('A payment error occurred. Please try again.');
      },

      onCancel: (data: any) => {
        console.log('Payment cancelled:', data);
        showError('Payment was cancelled. You can try again anytime.');
      }

    }).render(paypalContainerRef.current);
  };

  const initializePayPal = async () => {
    if (!backendUrl.trim()) {
      showError('Please enter your backend URL');
      return;
    }

    const cleanUrl = backendUrl.replace(/\/$/, '');
    setIsLoading(true);
    
    try {
      // Test backend connection
      const testResponse = await fetch(`${cleanUrl}/health`);
      if (!testResponse.ok) {
        throw new Error('Backend server is not responding');
      }

      // Get PayPal configuration
      const configResponse = await fetch(`${cleanUrl}/api/paypal/config`);
      if (!configResponse.ok) {
        throw new Error('Failed to get PayPal configuration');
      }
      
      const config = await configResponse.json();
      
      if (!config.clientId) {
        throw new Error('PayPal client ID not configured on server');
      }

      // Load PayPal SDK
      await loadPayPalSDK(config.clientId);
      
      // Initialize PayPal buttons
      initPayPalButtons();
      
      setIsInitialized(true);
      setIsLoading(false);
      
    } catch (error: any) {
      console.error('Initialization error:', error);
      showError(`Failed to initialize PayPal: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">PayPal Guest Checkout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Configuration Section */}
            <Card className="bg-gray-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Setup Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backend-url">Backend URL (your Render app):</Label>
                  <Input
                    id="backend-url"
                    type="text"
                    placeholder="https://your-app-name.onrender.com"
                    value={backendUrl}
                    onChange={(e) => setBackendUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-amount">Product Price ($):</Label>
                  <Input
                    id="product-amount"
                    type="number"
                    placeholder="29.99"
                    value={productAmount}
                    onChange={(e) => setProductAmount(e.target.value)}
                    step="0.01"
                    min="0.01"
                  />
                </div>
                <Button 
                  onClick={initializePayPal}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Initializing...' : 'Initialize PayPal'}
                </Button>
              </CardContent>
            </Card>

            {/* Product Section */}
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold">Amazing Product</h1>
              <div className="text-3xl font-bold text-green-600">${productAmount}</div>
              <p className="text-gray-600 leading-relaxed">
                This is your amazing product that customers can purchase using PayPal guest checkout. 
                No PayPal account required - customers can pay with any credit or debit card!
              </p>
            </div>

            {/* Payment Section */}
            {isInitialized && (
              <Card className="border-t border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 justify-center">
                    <Shield className="h-5 w-5" />
                    Secure Payment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-red-700 text-sm">{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-green-700 text-sm">{success}</span>
                    </div>
                  )}

                  {isLoading && (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-gray-600 mt-2">Loading PayPal checkout...</p>
                    </div>
                  )}

                  <div ref={paypalContainerRef} className="min-h-[50px]"></div>

                  <div className="text-center text-sm text-gray-500 space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Secure payment processing</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Users className="h-4 w-4 text-green-500" />
                      <span>Guest checkout available</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>No PayPal account required</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayPalGuestCheckout;
