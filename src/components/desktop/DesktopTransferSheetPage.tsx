
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, ArrowRight, ArrowLeft, DollarSign, User, CreditCard, Receipt, CheckCircle, Loader2, Phone, MapPin, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TransferTypeSelector from '@/components/transfer/TransferTypeSelector';
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepOneLocalTransfer from '@/components/transfer/StepOneLocalTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const DesktopTransferSheetPage = () => {
  const navigate = useNavigate();
  
  // Transfer state
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
  
  // Payment state
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paypalOrderId, setPaypalOrderId] = useState<string | null>(null);

  // Step navigation functions
  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDetailsChange = (details: any) => {
    console.log('Details changed in DesktopTransferSheetPage:', details);
    setReceiverDetails(prevDetails => ({
      ...prevDetails,
      ...details
    }));
  };

  // Step validation
  const canProceedFromStep1 = Boolean(amount && parseFloat(amount) > 0);
  const canProceedFromStep2 = Boolean(
    receiverDetails.firstName &&
    receiverDetails.lastName &&
    receiverDetails.phoneNumber &&
    receiverDetails.commune
  );

  const canProceed = Boolean(
    (currentStep === 1 && canProceedFromStep1) ||
    (currentStep === 2 && canProceedFromStep2) ||
    (currentStep === 3) ||
    (currentStep === 4)
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Transfer Amount & Type';
      case 2:
        return 'Recipient Information';
      case 3:
        return 'Payment Method';
      case 4:
        return 'Transfer Summary';
      default:
        return 'Send Money';
    }
  };

  const stepTitles = ['Amount & Type', 'Recipient Info', 'Payment', 'Complete'];

  // Calculate fees and amounts
  const transferFee = amount ? (Math.ceil(parseFloat(amount) / 100) * 15).toFixed(2) : '0.00';
  const totalAmount = amount ? (parseFloat(amount) + parseFloat(transferFee)).toFixed(2) : '0.00';
  const receiverAmount = amount ? (parseFloat(amount) * 127.5).toFixed(2) : '0.00';
  const transactionId = `TX${Date.now()}`;

  // Create transferData object
  const transferData = {
    transferType,
    amount,
    receiverDetails
  };

  // PayPal payment handling
  const handlePayPalPayment = async (details: any, data: any) => {
    setIsPaymentLoading(true);
    try {
      console.log('PayPal payment approved:', { details, data });
      setPaypalOrderId(data.orderID);
      setCurrentStep(4);
    } catch (error) {
      console.error('PayPal payment error:', error);
    } finally {
      setIsPaymentLoading(false);
    }
  };

  // MonCash payment handling
  const handleMonCashPayment = () => {
    setIsPaymentLoading(true);
    // Simulate MonCash payment process
    setTimeout(() => {
      setCurrentStep(4);
      setIsPaymentLoading(false);
    }, 2000);
  };

  const handleSendTransfer = () => {
    console.log('Transfer submitted:', { transferType, amount, receiverDetails });
    // Reset form and navigate
    setAmount('');
    setCurrentStep(1);
    setReceiverDetails({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      department: '',
      commune: '',
      email: ''
    });
    navigate('/transfer-history');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Transfer Hub</h1>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Step {currentStep} of 4
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Transfer Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((step, index) => (
                    <div key={step} className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        step === currentStep
                          ? 'bg-red-600 text-white'
                          : step < currentStep
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step < currentStep ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : step === currentStep ? (
                          <>
                            {step === 1 && <DollarSign className="h-5 w-5" />}
                            {step === 2 && <User className="h-5 w-5" />}
                            {step === 3 && <CreditCard className="h-5 w-5" />}
                            {step === 4 && <Receipt className="h-5 w-5" />}
                          </>
                        ) : (
                          step
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-medium ${
                          step <= currentStep ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {stepTitles[index]}
                        </h4>
                        <p className={`text-xs mt-1 ${
                          step <= currentStep ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {step === 1 && 'Choose amount and transfer type'}
                          {step === 2 && 'Enter recipient details'}
                          {step === 3 && 'Select payment method'}
                          {step === 4 && 'Review and confirm transfer'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Transfer Summary */}
                {amount && currentStep > 1 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Transfer Summary</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium capitalize">{transferType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">
                          {transferType === 'international' ? '$' : 'HTG '}{amount}
                        </span>
                      </div>
                      {transferType === 'international' && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Fee:</span>
                            <span className="font-medium">${transferFee}</span>
                          </div>
                          <div className="flex justify-between font-semibold border-t pt-2">
                            <span>Total:</span>
                            <span className="text-blue-600">${totalAmount}</span>
                          </div>
                        </>
                      )}
                      {receiverDetails.firstName && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">To:</span>
                          <span className="font-medium">
                            {receiverDetails.firstName} {receiverDetails.lastName}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                      {currentStep === 1 && <DollarSign className="w-6 h-6 text-white" />}
                      {currentStep === 2 && <User className="w-6 h-6 text-white" />}
                      {currentStep === 3 && <CreditCard className="w-6 h-6 text-white" />}
                      {currentStep === 4 && <Receipt className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">{getStepTitle()}</CardTitle>
                      <p className="text-gray-600 mt-1">
                        {currentStep === 1 && 'Enter the amount you want to send and select transfer type'}
                        {currentStep === 2 && 'Provide recipient information for the money transfer'}
                        {currentStep === 3 && 'Choose how you want to pay for this transfer'}
                        {currentStep === 4 && 'Review your transfer details and complete the transaction'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-8">
                {currentStep === 1 && (
                  <div className="space-y-8">
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
                  <div className="space-y-8">
                    <div className="text-center pb-4">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Who are you sending {transferType === 'international' ? '$' : 'HTG '}{amount} to?
                      </h2>
                      <p className="text-gray-600">
                        Enter the recipient's information below
                      </p>
                    </div>
                    <StepTwoTransfer 
                      receiverDetails={receiverDetails}
                      onDetailsChange={handleDetailsChange}
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
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
                      <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 space-y-4">
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

                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <h4 className="font-semibold text-red-800 mb-3">MonCash Payment</h4>
                          <p className="text-sm text-red-700 mb-4">
                            You will be redirected to MonCash to complete your payment securely.
                          </p>
                          <ul className="text-sm text-red-600 space-y-2">
                            <li>• Make sure you have your MonCash account ready</li>
                            <li>• Have sufficient funds in your MonCash wallet</li>
                            <li>• Complete the payment on MonCash website</li>
                            <li>• You will be redirected back after payment</li>
                          </ul>
                        </div>

                        <Button 
                          onClick={handleMonCashPayment}
                          disabled={isPaymentLoading}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 text-lg"
                          size="lg"
                        >
                          {isPaymentLoading ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            `Pay HTG ${receiverAmount} with MonCash`
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* PayPal Integration for International Transfers */}
                        <PayPalScriptProvider
                          options={{
                            clientId: "AcQKXQzBGOCFtE8xZF9_1YEj2YM7xOcGPQgfJ7nHpGe4QFJVjmgZGNT7KYL6wqZ6a84UjMU9vD9PqVQF",
                            currency: "USD",
                            intent: "capture"
                          }}
                        >
                          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                            <h4 className="font-semibold text-gray-800 mb-4">Pay with PayPal</h4>
                            <div className="space-y-3 mb-6">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Amount to send:</span>
                                <span className="font-medium">${amount}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Transfer fee:</span>
                                <span className="font-medium">${transferFee}</span>
                              </div>
                              <div className="flex justify-between text-lg font-semibold border-t pt-3">
                                <span>Total to pay:</span>
                                <span className="text-blue-600">${totalAmount}</span>
                              </div>
                            </div>
                            
                            <PayPalButtons
                              style={{ layout: "vertical" }}
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  intent: "CAPTURE",
                                  purchase_units: [
                                    {
                                      amount: {
                                        currency_code: "USD",
                                        value: totalAmount,
                                      },
                                    },
                                  ],
                                });
                              }}
                              onApprove={async (data, actions) => {
                                const details = await actions.order?.capture();
                                await handlePayPalPayment(details, data);
                              }}
                              onError={(err) => {
                                console.error('PayPal error:', err);
                              }}
                            />
                          </div>
                        </PayPalScriptProvider>
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Transfer Complete!</h3>
                      <p className="text-gray-600">Your money is on its way</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 space-y-6">
                      <div className="flex items-center justify-between border-b pb-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          <Receipt className="h-5 w-5 mr-2" />
                          Transfer Receipt
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Transaction Details</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Transaction ID</span>
                              <span className="font-mono text-gray-900">{transactionId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status</span>
                              <span className="text-green-600 font-medium">Completed</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Transfer Type</span>
                              <span className="font-medium capitalize">{transferType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Payment Method</span>
                              <span className="font-medium">
                                {transferData.transferType === 'national' ? 'MonCash' : 'PayPal'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Recipient Information</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">{receiverDetails.firstName} {receiverDetails.lastName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span>+509 {receiverDetails.phoneNumber}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span>{receiverDetails.commune}, {receiverDetails.department}</span>
                            </div>
                            {receiverDetails.email && (
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <span>{receiverDetails.email}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 mb-3">Financial Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount Sent</span>
                            <span className="font-medium">${amount}</span>
                          </div>
                          {transferType === 'international' && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Transfer Fee</span>
                                <span className="font-medium">${transferFee}</span>
                              </div>
                              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                                <span>Total Paid</span>
                                <span className="text-blue-600">${totalAmount}</span>
                              </div>
                            </>
                          )}
                          {paypalOrderId && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">PayPal Order ID</span>
                              <span className="font-mono text-xs">{paypalOrderId}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-900">Delivery Information</h4>
                            <p className="text-sm text-green-700 mt-1">
                              The recipient will receive the funds within 24-48 hours. They will be notified via SMS when the money is ready for pickup.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  {currentStep > 1 && currentStep < 4 && (
                    <Button 
                      variant="outline" 
                      onClick={handlePreviousStep}
                      className="flex-1"
                      size="lg"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  
                  {currentStep < 3 && (
                    <Button 
                      onClick={handleNextStep}
                      disabled={!canProceed}
                      className={`${currentStep === 1 ? 'w-full' : 'flex-1'} bg-red-600 hover:bg-red-700`}
                      size="lg"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}

                  {currentStep === 4 && (
                    <div className="flex gap-4 w-full">
                      <Button 
                        onClick={handleSendTransfer}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        size="lg"
                      >
                        View Transfer History
                      </Button>
                      <Button 
                        onClick={() => {
                          setAmount('');
                          setCurrentStep(1);
                          setReceiverDetails({
                            firstName: '',
                            lastName: '',
                            phoneNumber: '',
                            department: '',
                            commune: '',
                            email: ''
                          });
                        }}
                        variant="outline"
                        className="flex-1"
                        size="lg"
                      >
                        Send Another Transfer
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopTransferSheetPage;
