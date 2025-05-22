
import React, { useState } from 'react';
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

const TransferPage: React.FC = () => {
  const { t } = useLanguage();
  const [transferType, setTransferType] = useState<'international' | 'national'>('international');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [paypalSuccess, setPaypalSuccess] = useState(false);
  const [paypalLoading, setPaypalLoading] = useState(false);
  
  // Handle the continue button click
  const handleContinue = () => {
    if (!selectedMethod || !amount || parseFloat(amount) <= 0) {
      toast({
        title: "Missing Information",
        description: "Please select a payment method and enter a valid amount.",
        variant: "destructive",
      });
      return;
    }
    
    // For methods other than credit card, open drawer for confirmation
    if (!(transferType === 'international' && selectedMethod === 'credit-card')) {
      setIsDrawerOpen(true);
    } else {
      // When using international credit card with PayPal, focus on the PayPal button
      const paypalButtonContainer = document.querySelector('.paypal-button-container');
      if (paypalButtonContainer) {
        // If PayPal container is rendered, scroll to it
        paypalButtonContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Check if the PayPal button is actually rendered inside
        const paypalButton = paypalButtonContainer.querySelector('iframe');
        if (paypalButton) {
          toast({
            title: "Payment Method",
            description: "Please use the PayPal button to complete your payment.",
            variant: "default",
          });
        } else {
          // Fallback if PayPal button isn't rendered yet
          toast({
            title: "PayPal Loading",
            description: "The PayPal payment option is being prepared. Please wait a moment.",
            variant: "default",
          });
        }
      }
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
    
    // Here you would typically redirect to a success page
    // window.location.href = '/transfer-success';
    
    // For now, we'll just display the success message
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
              clientId="AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R"
              currency={currencyCode}
              setLoading={setPaypalLoading}
            />
            {!paypalSuccess && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Secure payment processing via PayPal
              </p>
            )}
          </div>
        )}
        
        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          disabled={!selectedMethod || !amount || parseFloat(amount) <= 0 || paypalSuccess}
          className="w-full"
          size="lg"
        >
          {paypalSuccess ? "Payment Complete ✓" : "Continue to Send Money"}
          {!paypalSuccess && <ArrowRight className="ml-1 h-4 w-4" />}
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
