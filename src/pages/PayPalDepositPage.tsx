
import React, { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { DollarSign, CreditCard, Wallet, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function PayPalDepositPage() {
  const navigate = useNavigate();
  const [depositAmount, setDepositAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // PayPal configuration
  const initialOptions = {
    "client-id": "AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj", // Using the same client ID found in other PayPal components
    currency: "USD",
    intent: "capture",
    components: "buttons",
  };

  // Predefined amount options
  const quickAmounts = [25, 50, 100, 250, 500];

  const handleAmountSelect = (amount: number) => {
    setDepositAmount(amount.toString());
  };

  const createOrder = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      setMessage("Please enter a valid deposit amount");
      setMessageType("error");
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      throw new Error("Invalid amount");
    }

    try {
      // Since we're using the same PayPal setup as in other components
      const response = await fetch("https://paypal-with-nodejs.onrender.com/create_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "capture",
          amount: depositAmount,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Create order error:", error);
      setMessage(`Could not create PayPal order: ${error instanceof Error ? error.message : String(error)}`);
      setMessageType("error");
      toast({
        title: "Order Creation Failed",
        description: "Could not create PayPal order. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const onApprove = async (data: any) => {
    setIsProcessing(true);
    try {
      const response = await fetch(
        `https://paypal-with-nodejs.onrender.com/complete_order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            intent: "capture",
            order_id: data.orderID,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const orderData = await response.json();
      
      const intentObject = "captures";
      const transaction = orderData.purchase_units[0]?.payments?.[intentObject]?.[0];
      
      if (transaction && transaction.status === "COMPLETED") {
        setMessage(`Deposit successful! Transaction ID: ${transaction.id}`);
        setMessageType("success");
        toast({
          title: "Deposit Successful",
          description: `Your deposit of $${transaction.amount.value} has been completed.`,
          variant: "success",
        });
        setDepositAmount("");
      } else {
        throw new Error("Transaction was not completed");
      }
    } catch (error) {
      console.error("Capture error:", error);
      setMessage(`Payment could not be processed: ${error instanceof Error ? error.message : String(error)}`);
      setMessageType("error");
      toast({
        title: "Payment Failed",
        description: "Your payment could not be processed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onError = (error: any) => {
    console.error("PayPal error:", error);
    setMessage("An error occurred with PayPal. Please try again.");
    setMessageType("error");
    toast({
      title: "Payment Error",
      description: "An error occurred with PayPal. Please try again.",
      variant: "destructive",
    });
    setIsProcessing(false);
  };

  const onCancel = () => {
    setMessage("Payment was cancelled");
    setMessageType("error");
    toast({
      title: "Payment Cancelled",
      description: "Your payment was cancelled.",
      variant: "destructive",
    });
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Wallet className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center">
              Add Funds
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Deposit money to your account
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deposit Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  min="1"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Quick amounts</p>
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-2 px-3 rounded-lg border transition-colors ${
                      depositAmount === amount.toString()
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* PayPal Buttons */}
            {depositAmount && parseFloat(depositAmount) > 0 && (
              <div className="mb-6">
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    onCancel={onCancel}
                    disabled={isProcessing}
                    style={{
                      layout: "vertical",
                      color: "blue",
                      shape: "rect",
                      label: "pay",
                      height: 48,
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}

            {/* Processing State */}
            {isProcessing && (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Processing payment...</span>
              </div>
            )}

            {/* Message Display */}
            {message && (
              <div className={`p-4 rounded-lg flex items-start space-x-3 ${
                messageType === "success" 
                  ? "bg-green-50 border border-green-200" 
                  : "bg-red-50 border border-red-200"
              }`}>
                {messageType === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                )}
                <div>
                  <p className={`text-sm font-medium ${
                    messageType === "success" ? "text-green-800" : "text-red-800"
                  }`}>
                    {messageType === "success" ? "Success!" : "Error"}
                  </p>
                  <p className={`text-sm ${
                    messageType === "success" ? "text-green-700" : "text-red-700"
                  }`}>
                    {message}
                  </p>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <CreditCard className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Secure Payment
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Your payment is processed securely through PayPal. We never store your payment information.
                  </p>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <Button 
              variant="outline" 
              className="w-full mt-6 flex items-center justify-center"
              onClick={() => navigate(-1)}
            >
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Powered by PayPal • Secure & Encrypted
          </p>
        </div>
      </div>
    </div>
  );
}
