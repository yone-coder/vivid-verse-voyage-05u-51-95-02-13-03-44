
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

// Default PayPal client ID - Using a sandbox client ID that works with PayPal's test environment
const DEFAULT_PAYPAL_CLIENT_ID = 'ASipB9r2XrYB0XD5cfzEItB8jtUq79EcN5uOYATHHJAEbWlQS3odGAH-RJb19wLH1QzHuk9zjUp1wUKc';

const TransferPage: React.FC = () => {
  const [transferType, setTransferType] = useState<'international' | 'national'>('international');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [paypalSuccess, setPaypalSuccess] = useState(false);
  const [paypalLoading, setPaypalLoading] = useState(false);
  
  // Use default client ID directly
  const [paypalClientId] = useState<string>(DEFAULT_PAYPAL_CLIENT_ID);
  const [isProduction] = useState(false); // Always use sandbox mode for testing
  
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
            {!paypalSuccess && !paypalLoading && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Secure payment processing via PayPal {isProduction ? "(Live Mode)" : "(Test Mode)"}
              </p>
            )}
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
        />
      </Drawer>
    </div>
  );
};

export default TransferPage;
