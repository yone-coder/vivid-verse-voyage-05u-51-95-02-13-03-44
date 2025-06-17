
import React from 'react';
import { TransferData } from '@/pages/MobileMultiStepTransferSheetPage';
import PayPalCardPayment from './PayPalCardPayment';

interface PaymentMethodSelectorProps {
  transferData: TransferData;
  onPaymentSubmit: () => void;
  isPaymentLoading: boolean;
  isPaymentFormValid: boolean;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  transferData,
  onPaymentSubmit,
  isPaymentLoading,
  isPaymentFormValid
}) => {
  const receiverAmount = transferData.amount ? (parseFloat(transferData.amount) * 127.5).toFixed(2) : '0.00';

  // PayPal callback handlers
  const handleEmailCaptured = (email: string) => {
    window.dispatchEvent(new CustomEvent('emailCaptured', {
      detail: { email }
    }));
  };

  const handlePaymentSuccess = (orderDetails: any) => {
    window.dispatchEvent(new CustomEvent('paymentSuccess', { 
      detail: { orderDetails } 
    }));
  };

  const handlePaymentError = (message: string) => {
    const errorEvent = new CustomEvent('paymentError', {
      detail: { message }
    });
    window.dispatchEvent(errorEvent);
  };

  const handleFormValidation = (isValid: boolean) => {
    const validationEvent = new CustomEvent('paymentFormValidation', {
      detail: { isValid }
    });
    window.dispatchEvent(validationEvent);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Complete Your Payment</h2>
        <p className="text-gray-600 leading-relaxed">
          Sending <span className="font-semibold text-blue-600">
            {transferData.transferType === 'national'
              ? `HTG ${receiverAmount}`
              : `$${transferData.amount}`
            }
          </span> to{' '}
          <span className="font-semibold text-gray-900">
            {transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}
          </span>
        </p>
      </div>

      {/* Payment Method Based on Transfer Type */}
      {transferData.transferType === 'national' ? (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Recipient:</span>
              <span className="font-medium">
                {transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">HTG {receiverAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transfer Type:</span>
              <span className="font-medium capitalize">National</span>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">MonCash Payment</h4>
            <p className="text-sm text-red-700 mb-3">
              You will be redirected to MonCash to complete your payment securely.
            </p>
            <ul className="text-sm text-red-600 space-y-1">
              <li>• Make sure you have your MonCash account ready</li>
              <li>• Have sufficient funds in your MonCash wallet</li>
              <li>• Complete the payment on MonCash website</li>
              <li>• You will be redirected back after payment</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* PayPal Card Payment Component */}
          <PayPalCardPayment
            amount={transferData.amount}
            onEmailCaptured={handleEmailCaptured}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
            onFormValidation={handleFormValidation}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
