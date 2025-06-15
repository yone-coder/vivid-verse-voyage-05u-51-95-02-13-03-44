
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TransferTypeSelector from '@/components/transfer/TransferTypeSelector';
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepOneLocalTransfer from '@/components/transfer/StepOneLocalTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';

const DesktopTransferPage = () => {
  const navigate = useNavigate();
  const [transferType, setTransferType] = useState<'international' | 'national'>('international');
  const [currentStep, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [receiverDetails, setReceiverDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    department: '',
    commune: '',
    email: ''
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const handleComplete = () => {
    // Handle transfer completion logic here
    console.log('Transfer completed:', { transferType, amount, receiverDetails });
    navigate('/transfer-history');
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return parseFloat(amount) > 0;
    }
    if (currentStep === 2) {
      return receiverDetails.firstName && 
             receiverDetails.lastName && 
             receiverDetails.phoneNumber && 
             receiverDetails.department && 
             receiverDetails.commune;
    }
    if (currentStep === 3) {
      return true; // Payment method step
    }
    return true;
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Send Money';
      case 2:
        return 'Recipient Details';
      case 3:
        return 'Payment Method';
      case 4:
        return 'Transfer Complete';
      default:
        return 'Transfer Money';
    }
  };

  const handleDetailsChange = (details: any) => {
    setReceiverDetails(details);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Send Money</h1>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Step {currentStep} of 4
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{getStepTitle()}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <TransferTypeSelector 
                      transferType={transferType}
                      onTransferTypeChange={setTransferType}
                      disableNavigation={true}
                    />
                    
                    {transferType === 'international' ? (
                      <StepOneTransfer 
                        amount={amount}
                        onAmountChange={setAmount}
                      />
                    ) : (
                      <StepOneLocalTransfer 
                        amount={amount}
                        onAmountChange={setAmount}
                      />
                    )}
                  </div>
                )}

                {currentStep === 2 && (
                  <StepTwoTransfer 
                    receiverDetails={receiverDetails}
                    onDetailsChange={handleDetailsChange}
                  />
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transfer Type:</span>
                        <span className="font-medium capitalize">{transferType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Send Amount:</span>
                        <span className="font-medium">
                          {transferType === 'international' ? '$' : 'HTG '}{amount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recipient:</span>
                        <span className="font-medium">
                          {receiverDetails.firstName} {receiverDetails.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">+509 {receiverDetails.phoneNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">
                          {receiverDetails.commune}, {receiverDetails.department}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 text-sm">
                        Select your preferred payment method to complete the transfer.
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Transfer Complete</h3>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <p className="text-green-800 font-medium">Transfer Successful!</p>
                      </div>
                      <p className="text-green-700 text-sm mt-2">
                        Your transfer of {transferType === 'international' ? '$' : 'HTG '}{amount} to {receiverDetails.firstName} {receiverDetails.lastName} has been completed successfully.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction ID:</span>
                        <span className="font-medium">TX{Date.now()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transfer Type:</span>
                        <span className="font-medium capitalize">{transferType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount Sent:</span>
                        <span className="font-medium">
                          {transferType === 'international' ? '$' : 'HTG '}{amount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recipient:</span>
                        <span className="font-medium">
                          {receiverDetails.firstName} {receiverDetails.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">+509 {receiverDetails.phoneNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">
                          {receiverDetails.commune}, {receiverDetails.department}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Progress and Actions */}
          <div className="space-y-6">
            {/* Progress Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step < currentStep 
                          ? 'bg-green-600 text-white' 
                          : step === currentStep 
                          ? 'bg-red-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step < currentStep ? '✓' : step}
                      </div>
                      <span className={`text-sm ${
                        step <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}>
                        {step === 1 && 'Amount & Type'}
                        {step === 2 && 'Recipient Info'}
                        {step === 3 && 'Payment Method'}
                        {step === 4 && 'Complete'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={currentStep === 4 ? handleComplete : handleNext}
                disabled={!canProceed()}
              >
                {currentStep === 4 ? 'Done' : currentStep === 3 ? 'Confirm Payment' : 'Continue'}
              </Button>
              
              {currentStep > 1 && currentStep < 4 && (
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopTransferPage;
