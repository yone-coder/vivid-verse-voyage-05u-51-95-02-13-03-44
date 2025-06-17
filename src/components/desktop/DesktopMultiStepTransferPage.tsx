import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import DesktopHeader from './DesktopHeader';
import DesktopTransferProcess from './DesktopTransferProcess';
import DesktopSidebarSections from './DesktopSidebarSections';

export interface TransferData {
  transferType: 'national' | 'international';
  amount: string;
  receiverDetails: {
    name: string;
    accountNumber: string;
    bankName: string;
    swiftCode: string;
  };
  paymentMethod: 'creditCard' | 'paypal' | 'bankTransfer';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  paypalEmail: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  sortCode: string;
}

const DesktopMultiStepTransferPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [transferData, setTransferData] = useState<TransferData>({
    transferType: 'international',
    amount: '',
    receiverDetails: {
      name: '',
      accountNumber: '',
      bankName: '',
      swiftCode: '',
    },
    paymentMethod: 'creditCard',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    sortCode: '',
  });
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isPaymentFormValid, setIsPaymentFormValid] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const userEmail = user?.email || 'default@example.com';
  const receiptRef = useRef<HTMLDivElement>(null);

  const updateTransferData = (data: Partial<TransferData>) => {
    setTransferData((prevData) => ({ ...prevData, ...data }));
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return transferData.amount !== '';
      case 2:
        return (
          transferData.receiverDetails.name !== '' &&
          transferData.receiverDetails.accountNumber !== '' &&
          transferData.receiverDetails.bankName !== ''
        );
      case 3:
        return isPaymentFormValid;
      default:
        return false;
    }
  };

  const onPaymentSubmit = async () => {
    setIsPaymentLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsPaymentLoading(false);
    setTransactionId(`TXN-${Math.floor(Math.random() * 10000)}`);
    setCurrentStep(4);

    toast({
      title: "Payment Successful!",
      description: "Your payment has been processed successfully.",
    });
  };

  const generateReceiptImage = async () => {
    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current, {
          scale: 2, // Increase scale for better resolution
          useCORS: true, // Enable cross-origin image loading
        });

        const dataURL = canvas.toDataURL('image/png');

        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'transfer_receipt.png'; // Set the filename
        document.body.appendChild(link); // Append to the document
        link.click(); // Simulate a click
        document.body.removeChild(link); // Remove the element after download

        toast({
          title: "Receipt Downloaded",
          description: "Your receipt has been downloaded as a PNG image.",
        });
      } catch (error) {
        console.error('Error generating image:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to generate receipt image.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopHeader />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Transfer Process */}
          <div className="order-2 md:order-1">
            <DesktopTransferProcess
              currentStep={currentStep}
              transferData={transferData}
              updateTransferData={updateTransferData}
              onPaymentSubmit={onPaymentSubmit}
              isPaymentLoading={isPaymentLoading}
              isPaymentFormValid={isPaymentFormValid}
              transactionId={transactionId}
              userEmail={userEmail}
              receiptRef={receiptRef}
              generateReceiptImage={generateReceiptImage}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
              canProceed={canProceed}
            />
          </div>

          {/* Right Column - Sidebar Sections */}
          <div className="order-1 md:order-2">
            <DesktopSidebarSections />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopMultiStepTransferPage;
