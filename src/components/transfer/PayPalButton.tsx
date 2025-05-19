
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PayPalButtonProps {
  amount: string;
  isDisabled?: boolean;
  onSuccess?: (details: any) => void;
  onError?: (err: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ 
  amount, 
  isDisabled = false, 
  onSuccess, 
  onError 
}) => {
  const handleClick = () => {
    // This is where we would integrate with the PayPal SDK
    // For now, we'll just simulate a successful payment
    console.log(`Processing PayPal payment for $${amount}`);
    
    // Simulate success after 2 seconds
    setTimeout(() => {
      if (onSuccess) {
        onSuccess({ 
          status: 'COMPLETED',
          id: 'PAYPAL-' + Math.random().toString(36).substr(2, 9),
          amount: amount
        });
      }
    }, 2000);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isDisabled}
      className="w-full bg-[#0070BA] hover:bg-[#005ea6] mb-2 flex items-center justify-center gap-2"
    >
      <CreditCard className="h-4 w-4" />
      <span>Pay with PayPal</span>
    </Button>
  );
};

export default PayPalButton;
