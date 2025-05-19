
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
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
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from "@/integrations/supabase/client";

// Default PayPal client ID - Using a sandbox client ID that works with PayPal's test environment
const DEFAULT_PAYPAL_CLIENT_ID = 'ASipB9r2XrYB0XD5cfzEItB8jtUq79EcN5uOYATHHJAEbWlQS3odGAH-RJb19wLH1QzHuk9zjUp1wUKc';

const TransferPage: React.FC = () => {
  const { t } = useLanguage();
  const [transferType, setTransferType] = useState<'international' | 'national'>('international');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [paypalSuccess, setPaypalSuccess] = useState(false);
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Modified to use default client ID if not available in localStorage
  const [paypalClientId, setPaypalClientId] = useState<string | null>(null);
  const [isProduction, setIsProduction] = useState(false);
  
  // Check for stored PayPal client ID on component mount
  useEffect(() => {
    const storedClientId = localStorage.getItem('paypal_client_id');
    const storedEnvironment = localStorage.getItem('paypal_environment');
    
    if (storedClientId) {
      setPaypalClientId(storedClientId);
    } else {
      // Set default client ID if none exists
      setPaypalClientId(DEFAULT_PAYPAL_CLIENT_ID);
      localStorage.setItem('paypal_client_id', DEFAULT_PAYPAL_CLIENT_ID);
    }
    
    if (storedEnvironment) {
      setIsProduction(storedEnvironment === 'production');
    } else {
      // Default to sandbox environment
      localStorage.setItem('paypal_environment', 'sandbox');
    }
  }, []);
  
  // Handle the continue button click
  const handleContinue = async () => {
    if (!selectedMethod || !amount || parseFloat(amount) <= 0) {
      toast({
        title: "Missing Information",
        description: "Please select a payment method and enter a valid amount.",
        variant: "destructive",
      });
      return;
    }
    
    // For credit card payments using PayPal
    if (transferType === 'international' && selectedMethod === 'credit-card') {
      try {
        setIsProcessing(true);
        
        const response = await fetch('https://wkfzhcszhgewkvwukzes.supabase.co/functions/v1/paypal-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token || ''}`
          },
          body: JSON.stringify({
            amount,
            currency: transferType === 'international' ? 'USD' : 'HTG',
            paymentMethod: 'credit-card',
            createOrder: true
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to process payment');
        }
        
        const data = await response.json();
        
        if (data.success && data.approvalUrl) {
          // Redirect to PayPal for payment approval
          window.location.href = data.approvalUrl;
        } else {
          throw new Error('No PayPal approval URL received');
        }
      } catch (error) {
        console.error('Payment error:', error);
        toast({
          title: "Payment Error",
          description: error instanceof Error ? error.message : "An unexpected error occurred",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    } else {
      // For other payment methods, open drawer for confirmation
      setIsDrawerOpen(true);
    }
  };

  const handlePaypalSuccess = (details: any) => {
    setPaypalSuccess(true);
    setPaypalLoading(false);
    setIsDrawerOpen(false);
    
    // Show success message with transaction details
    toast({
      title: "Payment Successful",
      description: `Your transfer of $${amount} was completed successfully with PayPal. Transaction ID: ${details.id}`,
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
    setSelectedMethod(null);
    setPaypalSuccess(false);
    setPaypalLoading(false);
  };
  
  // Show PayPal button when international and credit card are selected
  const showPaypalButton = transferType === 'international' && selectedMethod === 'credit-card';
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <TransferHeader />
      
      <div className="max-w-md mx-auto p-4">
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
            <PayPalButton 
              amount={amount} 
              isDisabled={!amount || parseFloat(amount) <= 0 || paypalSuccess || paypalLoading}
              onSuccess={handlePaypalSuccess}
              onError={handlePaypalError}
              clientId={paypalClientId || DEFAULT_PAYPAL_CLIENT_ID}
              currency={currencyCode}
              setLoading={setPaypalLoading}
              isProduction={isProduction}
            />
            {!paypalSuccess && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Secure payment processing via PayPal {isProduction ? "(Live Mode)" : "(Test Mode)"}
              </p>
            )}
          </div>
        )}
        
        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          disabled={!selectedMethod || !amount || parseFloat(amount) <= 0 || paypalSuccess || isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <>
              <span className="mr-2">Processing...</span>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </>
          ) : (
            <>
              {paypalSuccess ? "Payment Complete ✓" : "Continue to Send Money"}
              {!paypalSuccess && <ArrowRight className="ml-1 h-4 w-4" />}
            </>
          )}
        </Button>
        
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
        />
      </Drawer>
    </div>
  );
};

export default TransferPage;
