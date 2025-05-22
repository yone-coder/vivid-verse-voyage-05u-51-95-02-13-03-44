import React, { useState, useEffect } from 'react';
import { ArrowRight, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import TransferHeader from '@/components/transfer/TransferHeader';
import TransferTypeSelector from '@/components/transfer/TransferTypeSelector';
import AmountInput from '@/components/transfer/AmountInput';
import PaymentMethodList from '@/components/transfer/PaymentMethodList';
import TransferConfirmationDrawer from '@/components/transfer/TransferConfirmationDrawer';
import PayPalButton from '@/components/transfer/PayPalButton';
import { internationalPaymentMethods, nationalPaymentMethods } from '@/components/transfer/PaymentMethods';
import { toast } from "@/hooks/use-toast";

// Default PayPal client ID - Using a sandbox client ID
const DEFAULT_PAYPAL_CLIENT_ID = 'ASipB9r2XrYB0XD5cfzEItB8jtUq79EcN5uOYATHHJAEbWlQS3odGAH-RJb19wLH1QzHuk9zjUp1wUKc';

// API URL as a constant
const PAYMENT_API_URL = 'https://wkfzhcszhgewkvwukzes.supabase.co/functions/v1/paypal-payment';

const TransferPage: React.FC = () => {
  const [transferType, setTransferType] = useState<'international' | 'national'>('international');
  const [selectedMethod, setSelectedMethod] = useState<string | null>('credit-card'); // Default to credit card
  const [amount, setAmount] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [paypalSuccess, setPaypalSuccess] = useState(false);
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [paypalScriptLoaded, setPaypalScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Use default client ID directly
  const [paypalClientId] = useState<string>(DEFAULT_PAYPAL_CLIENT_ID);
  const [isProduction] = useState(false); // Always use sandbox mode for testing
  
  // Auto-select credit card option when international is chosen
  useEffect(() => {
    if (transferType === 'international') {
      // Pre-select credit card option for easier testing
      setSelectedMethod('credit-card');
    } else {
      // Pre-select MonCash for national transfers
      setSelectedMethod('moncash');
    }
  }, [transferType]);

  // Listen for PayPal script loaded event
  useEffect(() => {
    const handlePayPalScriptLoaded = () => {
      console.log("PayPal script loaded (from event listener)");
      setPaypalScriptLoaded(true);
    };
    
    document.addEventListener('paypal-script-loaded', handlePayPalScriptLoaded);
    
    return () => {
      document.removeEventListener('paypal-script-loaded', handlePayPalScriptLoaded);
    };
  }, []);
  
  const handlePaypalSuccess = (details: any) => {
    setPaypalSuccess(true);
    setPaypalLoading(false);
    setIsDrawerOpen(false);
    
    // Show success message with transaction details
    toast({
      title: "Payment Successful",
      description: `Your transfer of $${amount} was completed successfully with PayPal. Transaction ID: ${details.id || 'N/A'}`,
      variant: "success",
    });
    
    console.log("Payment completed successfully:", details);
  };

  const handlePaypalError = (err: any) => {
    setPaypalLoading(false);
    toast({
      title: "Payment Failed",
      description: "There was an issue processing your PayPal payment. Please try again.",
      variant: "destructive",
    });
    console.error("PayPal error:", err);
  };

  // Get the current payment methods based on selected transfer type
  const currentPaymentMethods = transferType === 'international' 
    ? internationalPaymentMethods 
    : nationalPaymentMethods;
  
  // Currency symbol based on transfer type
  const currencySymbol = transferType === 'international' ? '$' : 'HTG ';
  
  // Currency name for display
  const currencyName = transferType === 'international' ? 'USD' : 'Haitian Gourdes';
  // Currency code for PayPal
  const currencyCode = transferType === 'international' ? 'USD' : 'HTG';

  // Reset selected method when changing transfer type
  const handleTransferTypeChange = (value: 'international' | 'national') => {
    setTransferType(value);
    setSelectedMethod(value === 'international' ? 'credit-card' : 'moncash'); // Auto-select appropriate default
    setPaypalSuccess(false);
    setPaypalLoading(false);
  };
  
  // Show PayPal button when international and credit card are selected
  const showPaypalButton = transferType === 'international' && selectedMethod === 'credit-card';
  
  // Handle the continue button click to create a payment
  const handleContinuePayment = async () => {
    // Validate inputs
    if (!amount || parseFloat(amount) <= 0 || !selectedMethod) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid amount and select a payment method.",
        variant: "destructive",
      });
      return;
    }
    
    // Special handling for national transfers with MonCash
    // The actual MonCash API call is handled in the TransferConfirmationDrawer component
    if (transferType === 'national' && selectedMethod === 'moncash') {
      console.log("MonCash payment selected - will be handled by drawer component");
      return; // Let the drawer component handle it
    }
    
    setIsLoading(true);
    
    try {
      console.log(`Creating payment for ${currencySymbol}${amount} using ${selectedMethod}`);
      
      // For credit card payments, create PayPal order via our API
      if (selectedMethod === 'credit-card') {
        const response = await fetch(PAYMENT_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency: currencyCode,
            paymentMethod: selectedMethod,
            createOrder: true
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to create payment');
        }
        
        console.log("Payment created successfully:", data);
        
        // If we have an approval URL, redirect to PayPal
        if (data.approvalUrl) {
          window.location.href = data.approvalUrl;
          return;
        }
        
        // Otherwise show success and close drawer
        toast({
          title: "Payment Initiated",
          description: "Your payment has been initiated successfully.",
          variant: "success",
        });
        
        setIsDrawerOpen(false);
      } else {
        // Handle other payment methods
        const response = await fetch(PAYMENT_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency: currencyCode,
            paymentMethod: selectedMethod
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to create payment');
        }
        
        console.log("Payment created successfully:", data);
        
        toast({
          title: "Payment Initiated",
          description: "Your payment has been initiated successfully.",
          variant: "success",
        });
        
        setIsDrawerOpen(false);
        
        // If we have next steps to follow
        if (data.nextSteps?.redirectUrl) {
          window.location.href = data.nextSteps.redirectUrl;
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <TransferHeader />
      
      <div className="max-w-md mx-auto p-4">
        {/* Mode banners */}
        {isProduction && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Live Production Mode
                </h3>
                <p className="text-xs text-green-600 mt-1">
                  You are in production mode. All transactions will process real money.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Transfer Type Tabs */}
        <TransferTypeSelector 
          transferType={transferType} 
          onTransferTypeChange={handleTransferTypeChange}
        />
        
        {/* Credit Card Recommendation */}
        {transferType === 'international' && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
            <div className="flex items-start">
              <CreditCard className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">
                  Credit/Debit Card Recommended
                </h3>
                <p className="text-xs text-blue-600 mt-1">
                  For international transfers, credit cards offer the fastest and most secure way to send money to Haiti.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* MonCash Recommendation for national transfers */}
        {transferType === 'national' && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <div className="flex items-start">
              <CreditCard className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  MonCash Recommended
                </h3>
                <p className="text-xs text-red-600 mt-1">
                  For national transfers within Haiti, MonCash offers the fastest and most secure way to send money.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Amount Input */}
        <AmountInput
          amount={amount}
          onAmountChange={setAmount}
          currencySymbol={currencySymbol}
          currencyName={currencyName}
        />
        
        {/* Payment Method Selection */}
        <PaymentMethodList
          methods={currentPaymentMethods}
          selectedMethod={selectedMethod}
          onMethodChange={(value) => {
            setSelectedMethod(value);
            setPaypalSuccess(false);
            setPaypalLoading(false);
          }}
        />
        
        {/* PayPal Button for international credit card payments */}
        {showPaypalButton && (
          <div className="mt-4 mb-2">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Complete Payment with PayPal
            </h3>
            <PayPalButton 
              amount={amount} 
              isDisabled={!amount || parseFloat(amount) <= 0 || paypalSuccess}
              onSuccess={handlePaypalSuccess}
              onError={handlePaypalError}
              clientId={paypalClientId}
              currency={currencyCode}
              setLoading={setPaypalLoading}
              isProduction={isProduction}
            />
          </div>
        )}
        
        {/* Continue Button - Only show for non-PayPal methods */}
        {(!showPaypalButton || !amount || parseFloat(amount) <= 0) && (
          <Button 
            onClick={() => setIsDrawerOpen(true)}
            disabled={!selectedMethod || !amount || parseFloat(amount) <= 0}
            className="w-full mt-4"
            size="lg"
          >
            Continue to Send Money
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        )}
        
        {/* Information */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            All transfers are secure and encrypted. Recipient typically receives
            funds within 24-48 hours depending on the payment method and local conditions.
          </p>
        </div>
      </div>
      
      {/* Drawer for confirmation */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <TransferConfirmationDrawer
          isOpen={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          amount={amount}
          selectedMethod={currentPaymentMethods.find(m => m.id === selectedMethod)}
          transferType={transferType}
          currencySymbol={currencySymbol}
          onContinue={handleContinuePayment}
          isLoading={isLoading}
        />
      </Drawer>
    </div>
  );
};

export default TransferPage;
