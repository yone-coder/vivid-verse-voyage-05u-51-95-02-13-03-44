
import React from 'react';
import { CreditCard, Smartphone } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface StepThreeTransferProps {
  amount: string;
  transferType?: 'international' | 'national';
}

const StepThreeTransfer: React.FC<StepThreeTransferProps> = ({ amount, transferType = 'international' }) => {
  const currencySymbol = transferType === 'international' ? '$' : 'HTG ';
  const paymentMethod = transferType === 'international' ? 'Credit/Debit Card' : 'MonCash';
  const PaymentIcon = transferType === 'international' ? CreditCard : Smartphone;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Payment Confirmation</h2>
        <p className="text-gray-600 text-sm">
          Review your transfer details and complete the payment.
        </p>
      </div>

      {/* Transfer Summary */}
      <div className="bg-white rounded-lg p-4 shadow-sm border space-y-4">
        <h3 className="font-medium text-gray-800 border-b pb-2">Transfer Summary</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Transfer Type:</span>
            <span className="font-medium capitalize">{transferType}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">{currencySymbol}{amount}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <div className="flex items-center">
              <PaymentIcon className="h-4 w-4 mr-1" />
              <span className="font-medium">{paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <Button className="w-full" size="lg">
        Complete Payment ({currencySymbol}{amount})
      </Button>

      {/* Security Notice */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <h4 className="font-medium text-gray-800 mb-2">Security Information:</h4>
        <ul className="space-y-1">
          <li>• Your payment is secured with end-to-end encryption</li>
          <li>• Transaction will be processed within 24-48 hours</li>
          <li>• You will receive a confirmation email</li>
        </ul>
      </div>
    </div>
  );
};

export default StepThreeTransfer;
