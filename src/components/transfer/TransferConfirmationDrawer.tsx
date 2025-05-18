
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PaymentMethod } from './PaymentMethodItem';

interface TransferConfirmationDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  selectedMethod: PaymentMethod | undefined;
  transferType: 'international' | 'national';
  currencySymbol: string;
}

const TransferConfirmationDrawer: React.FC<TransferConfirmationDrawerProps> = ({
  isOpen,
  onOpenChange,
  amount,
  selectedMethod,
  transferType,
  currencySymbol
}) => {
  if (!selectedMethod) return null;

  // Calculate fees based on method and transfer type
  const calculateFee = () => {
    if (transferType === 'international') {
      switch (selectedMethod.id) {
        case 'zelle': return `${currencySymbol}0.00`;
        case 'bank-transfer': return `${currencySymbol}0.25`;
        case 'cashapp': return `${currencySymbol}${(parseFloat(amount) * 0.015).toFixed(2)}`;
        case 'paypal': return `${currencySymbol}${((parseFloat(amount) * 0.029) + 0.3).toFixed(2)}`;
        default: return `${currencySymbol}${((parseFloat(amount) * 0.035) + 0.3).toFixed(2)}`;
      }
    } else {
      switch (selectedMethod.id) {
        case 'moncash': return `${Math.max(5, parseFloat(amount) * 0.01).toFixed(2)} HTG`;
        case 'natcash': return `${Math.max(3, parseFloat(amount) * 0.005).toFixed(2)} HTG`;
        default: return `10 HTG`;
      }
    }
  };

  // Calculate total
  const calculateTotal = () => {
    if (transferType === 'international') {
      switch (selectedMethod.id) {
        case 'zelle': return `${currencySymbol}${amount}`;
        case 'bank-transfer': return `${currencySymbol}${(parseFloat(amount) + 0.25).toFixed(2)}`;
        case 'cashapp': return `${currencySymbol}${(parseFloat(amount) * 1.015).toFixed(2)}`;
        case 'paypal': return `${currencySymbol}${(parseFloat(amount) + ((parseFloat(amount) * 0.029) + 0.3)).toFixed(2)}`;
        default: return `${currencySymbol}${(parseFloat(amount) + ((parseFloat(amount) * 0.035) + 0.3)).toFixed(2)}`;
      }
    } else {
      switch (selectedMethod.id) {
        case 'moncash': return `${(parseFloat(amount) + Math.max(5, parseFloat(amount) * 0.01)).toFixed(2)} HTG`;
        case 'natcash': return `${(parseFloat(amount) + Math.max(3, parseFloat(amount) * 0.005)).toFixed(2)} HTG`;
        default: return `${(parseFloat(amount) + 10).toFixed(2)} HTG`;
      }
    }
  };

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Confirm Money Transfer</DrawerTitle>
        <DrawerDescription>
          You're about to send {currencySymbol}{amount} to Haiti using {selectedMethod.name}
        </DrawerDescription>
      </DrawerHeader>
      <div className="px-4">
        <div className="rounded-lg border p-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Amount:</span>
            <span className="font-medium">{currencySymbol}{amount}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Fee:</span>
            <span className="font-medium">{calculateFee()}</span>
          </div>
          <div className="border-t my-2"></div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{calculateTotal()}</span>
          </div>
        </div>
      </div>
      <DrawerFooter>
        <Button>Continue to Payment</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default TransferConfirmationDrawer;
