
import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PayPalCheckout: React.FC = () => {
  const [amount, setAmount] = useState("10.00");
  const [currency, setCurrency] = useState("USD");
  const [description, setDescription] = useState("Payment for services");
  const [isProcessing, setIsProcessing] = useState(false);

  const paypalOptions = {
    clientId: "AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj",
    currency: currency,
    intent: "capture" as const,
  };

  const createOrder = (data: any, actions: any) => {
    console.log('Creating PayPal order with amount:', amount, 'currency:', currency);
    
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount,
          },
          description: description,
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    setIsProcessing(true);
    try {
      console.log('PayPal payment approved, capturing order:', data.orderID);
      
      const details = await actions.order.capture();
      console.log('Payment captured successfully:', details);
      
      toast.success(`Payment successful! Transaction ID: ${details.id}`);
      
      // Here you can add logic to handle the successful payment
      // For example, redirect to a success page or update your database
      
    } catch (error) {
      console.error('Error capturing payment:', error);
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const onError = (err: any) => {
    console.error('PayPal payment error:', err);
    toast.error('Payment failed. Please try again.');
    setIsProcessing(false);
  };

  const onCancel = (data: any) => {
    console.log('Payment cancelled by user:', data);
    toast.info('Payment was cancelled.');
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              PayPal Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment Configuration */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                  className="mt-1"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
                  Currency
                </Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1"
                  placeholder="What is this payment for?"
                />
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Payment Summary</h3>
              <div className="flex justify-between text-sm">
                <span>Amount:</span>
                <span className="font-medium">{currency} {amount}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Description:</span>
                <span className="font-medium text-right max-w-[150px] truncate">{description}</span>
              </div>
            </div>

            {/* PayPal Buttons */}
            <div className="space-y-4">
              {isProcessing && (
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                    Processing payment...
                  </div>
                </div>
              )}
              
              <PayPalScriptProvider options={paypalOptions}>
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "paypal",
                    height: 45,
                  }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                  onCancel={onCancel}
                  disabled={isProcessing}
                />
              </PayPalScriptProvider>
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-start">
                <div className="text-green-600 mr-2">🔒</div>
                <div className="text-sm text-green-700">
                  <p className="font-medium">Secure Payment</p>
                  <p>Your payment is processed securely through PayPal. We don't store your payment information.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayPalCheckout;
