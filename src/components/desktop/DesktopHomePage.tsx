import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, History, MapPin, Route, Search, Eye, User, Star, Phone, Clock, CheckCircle, XCircle, ArrowUpRight, ArrowDownLeft, ArrowRight, ArrowLeft, DollarSign, CreditCard, Receipt, Banknote, Landmark, CircleDollarSign, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import TransferTypeSelector from '@/components/transfer/TransferTypeSelector';
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepOneLocalTransfer from '@/components/transfer/StepOneLocalTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';

const DesktopHomePage = () => {
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
  
  // Payment and method selection state
  const [paymentMethod, setPaymentMethod] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isPaymentFormValid, setIsPaymentFormValid] = useState(true);
  
  // PayPal container ref
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  
  // Track transfer state
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  
  // Location search state
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const recentTransfers = [
    { id: 'TR001', recipient: 'John Doe', amount: '$500.00', fee: '$15.00', status: 'completed', date: '2024-06-14', country: 'Haiti', type: 'international' },
    { id: 'TR002', recipient: 'Marie Claire', amount: '$250.00', fee: '$8.00', status: 'pending', date: '2024-06-13', country: 'Haiti', type: 'national' },
    { id: 'TR003', recipient: 'Pierre Jean', amount: '$750.00', fee: '$22.50', status: 'completed', date: '2024-06-12', country: 'Haiti', type: 'international' },
  ];

  const nearbyLocations = [
    { id: 1, name: 'Downtown Transfer Center', address: '123 Main Street, Port-au-Prince', phone: '+509 1234-5678', hours: 'Mon-Fri 8AM-6PM', rating: 4.8, services: ['Cash Pickup', 'Money Transfer'], distance: '0.5 miles' },
    { id: 2, name: 'Airport Transfer Point', address: '456 Airport Road, Port-au-Prince', phone: '+509 2345-6789', hours: 'Daily 6AM-10PM', rating: 4.6, services: ['Cash Pickup', 'Money Transfer'], distance: '2.1 miles' },
    { id: 3, name: 'City Mall Location', address: '789 Commercial Ave, Port-au-Prince', phone: '+509 3456-7890', hours: 'Mon-Sun 10AM-8PM', rating: 4.9, services: ['Cash Pickup', 'Money Transfer', 'Bill Payment'], distance: '1.8 miles' },
  ];

  // International payment methods (USD)
  const internationalPaymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit or Debit Card',
      icon: CreditCard,
      description: 'Safe and secure card payment',
      fee: '3.5% + $0.30'
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer / ACH',
      icon: Banknote,
      description: 'Direct from your bank account',
      fee: '$0.25'
    },
    {
      id: 'zelle',
      name: 'Zelle',
      icon: Landmark,
      description: 'Fast transfers between US banks',
      fee: 'Free'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: CircleDollarSign,
      description: 'Send using your PayPal balance',
      fee: '2.9% + $0.30'
    },
    {
      id: 'cashapp',
      name: 'Cash App',
      icon: DollarSign,
      description: 'Send using Cash App',
      fee: '1.5%'
    }
  ];

  const handleSendTransfer = () => {
    console.log('Transfer submitted:', { transferType, amount, receiverDetails, paymentMethod });
    // Reset form
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
    setPaymentMethod('');
  };

  const handleTrackTransfer = () => {
    if (trackingNumber) {
      setTrackingResult({
        id: trackingNumber,
        status: 'In Transit',
        recipient: 'John Doe',
        amount: '$500.00',
        destination: 'Port-au-Prince, Haiti',
        estimatedDelivery: '2024-06-16',
        steps: [
          { step: 'Transfer Initiated', completed: true, date: '2024-06-14 10:00 AM' },
          { step: 'Payment Processed', completed: true, date: '2024-06-14 10:15 AM' },
          { step: 'In Transit', completed: true, date: '2024-06-14 11:00 AM' },
          { step: 'Ready for Pickup', completed: false, date: 'Pending' },
          { step: 'Completed', completed: false, date: 'Pending' }
        ]
      });
    }
  };

  const handleDetailsChange = (details: any) => {
    console.log('Details changed in DesktopHomePage:', details);
    setReceiverDetails(prevDetails => ({
      ...prevDetails,
      ...details
    }));
  };

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

  // Step validation
  const canProceedFromStep1 = Boolean(amount && parseFloat(amount) > 0);
  const canProceedFromStep2 = Boolean(
    receiverDetails.firstName &&
    receiverDetails.lastName &&
    receiverDetails.phoneNumber &&
    receiverDetails.commune
  );
  const canProceedFromStep3 = Boolean(paymentMethod);

  const canProceed = Boolean(
    (currentStep === 1 && canProceedFromStep1) ||
    (currentStep === 2 && canProceedFromStep2) ||
    (currentStep === 3 && canProceedFromStep3) ||
    (currentStep === 4)
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Send Money';
      case 2:
        return 'Recipient Details';
      case 3:
        return 'Payment';
      case 4:
        return 'Transfer Complete';
      default:
        return 'Send Money';
    }
  };

  const stepTitles = ['Send Money', 'Recipient Details', 'Payment', 'Transfer Complete'];

  // Calculate fees and amounts like mobile version
  const transferFee = amount ? (Math.ceil(parseFloat(amount) / 100) * 15).toFixed(2) : '0.00';
  const totalAmount = amount ? (parseFloat(amount) + parseFloat(transferFee)).toFixed(2) : '0.00';
  const receiverAmount = amount ? (parseFloat(amount) * 127.5).toFixed(2) : '0.00';
  const transactionId = `TX${Date.now()}`;

  // Create transferData object to match mobile structure
  const transferData = {
    transferType,
    amount,
    receiverDetails
  };

  const getButtonColor = () => {
    if (currentStep === 1) return "bg-red-600 hover:bg-red-700";
    if (currentStep === 2) return "bg-blue-600 hover:bg-blue-700";
    if (currentStep === 3) return "bg-green-600 hover:bg-green-700";
    return "bg-red-600 hover:bg-red-700";
  };

  const getButtonText = () => {
    if (currentStep === 1) return "Continue";
    if (currentStep === 2) return "Continue";
    if (currentStep === 3) {
      if (transferData.transferType === 'national') return `Pay HTG ${receiverAmount}`;
      return "Pay Now";
    }
    return "Continue";
  };

  const filteredLocations = nearbyLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Transfer Hub</h1>
            </div>
            <nav className="flex space-x-6">
              <Button variant="ghost">
                <User className="w-4 h-4 mr-2" />
                Account
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-8 h-full">
          
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            
            {/* Send Money Section - Updated with 4-step flow */}
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-red-700">{getStepTitle()}</CardTitle>
                  </div>
                  <div className="text-sm text-gray-600">
                    Step {currentStep} of 4
                  </div>
                </div>
                
                {/* Progress Steps */}
                <div className="flex items-center justify-between mt-4 px-2">
                  {[1, 2, 3, 4].map((step, index) => (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          step === currentStep
                            ? 'bg-red-600 text-white'
                            : step < currentStep
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {step < currentStep ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : step === currentStep ? (
                            <>
                              {step === 1 && <DollarSign className="h-4 w-4" />}
                              {step === 2 && <User className="h-4 w-4" />}
                              {step === 3 && <CreditCard className="h-4 w-4" />}
                              {step === 4 && <Receipt className="h-4 w-4" />}
                            </>
                          ) : (
                            step
                          )}
                        </div>
                        <span className={`text-xs mt-1 font-medium text-center ${
                          step <= currentStep ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {stepTitles[index]}
                        </span>
                      </div>
                      {index < 3 && (
                        <div className={`flex-1 h-0.5 mx-1 rounded-full transition-colors duration-300 ${
                          step < currentStep ? 'bg-green-600' : 'bg-gray-300'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
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
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <p className="text-gray-600">Who are you sending ${amount} to?</p>
                    </div>
                    <StepTwoTransfer 
                      receiverDetails={receiverDetails}
                      onDetailsChange={handleDetailsChange}
                    />
                  </div>
                )}

                {currentStep === 3 && (
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
                        {/* Pay with PayPal Button */}
                        <div className="w-full">
                          <Button 
                            onClick={onContinue}
                            disabled={
                              !canProceed || 
                              isPaymentLoading || 
                              (currentStep === 3 && transferData?.transferType === 'international' && !isPaymentFormValid)
                            }
                            className={cn(
                              "w-full transition-all duration-200 text-white font-semibold py-4 text-lg",
                              getButtonColor()
                            )}
                          >
                            {isPaymentLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {getButtonText()}
                              </>
                            ) : (
                              <>
                                {getButtonText()}
                                {currentStep < 3 && <ArrowRight className="ml-2 h-4 w-4" />}
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Separator */}
                        <div className="flex items-center justify-center space-x-4 my-6">
                          <div className="flex-1 border-t border-gray-300"></div>
                          <span className="text-gray-500 text-sm font-medium px-4">or continue with</span>
                          <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        {/* PayPal Checkout Container (Form) */}
                        <div ref={paypalContainerRef}></div>
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Transfer Complete!</h3>
                      <p className="text-gray-600 text-sm mt-2">Your money is on its way</p>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                      <div className="flex items-center justify-between border-b pb-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          <Receipt className="h-5 w-5 mr-2" />
                          Receipt
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Transaction ID</span>
                          <span className="font-mono text-gray-900">{transactionId}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Status</span>
                          <span className="text-green-600 font-medium">Completed</span>
                        </div>

                        <div className="border-t pt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Recipient</span>
                            <span className="font-medium">{receiverDetails.firstName} {receiverDetails.lastName}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Phone Number</span>
                            <span className="font-medium">+509 {receiverDetails.phoneNumber}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Location</span>
                            <span className="font-medium text-right max-w-xs">{receiverDetails.commune}, {receiverDetails.department}</span>
                          </div>
                        </div>

                        <div className="border-t pt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Amount Sent</span>
                            <span className="font-medium">${amount}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Transfer Fee</span>
                            <span className="font-medium">${transferFee}</span>
                          </div>
                          <div className="flex justify-between text-lg font-semibold border-t pt-2">
                            <span>Total Paid</span>
                            <span className="text-blue-600">${totalAmount}</span>
                          </div>
                        </div>

                        <div className="border-t pt-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Payment Method</span>
                            <span className="font-medium capitalize">
                              {paymentMethod?.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 mt-4">
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
                <div className="flex gap-3 pt-4">
                  {currentStep > 1 && currentStep < 4 && (
                    <Button 
                      variant="outline" 
                      onClick={handlePreviousStep}
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {currentStep === 3 ? 'Previous' : 'Back'}
                    </Button>
                  )}
                  
                  <Button 
                    onClick={currentStep === 4 ? handleSendTransfer : handleNextStep}
                    disabled={!canProceed}
                    className={`${currentStep === 1 ? 'w-full' : 'flex-1'} bg-red-600 hover:bg-red-700`}
                    size="lg"
                  >
                    {currentStep === 4 ? 'Send Another Transfer' : currentStep === 3 ? `Pay $${totalAmount}` : 'Continue'}
                    {currentStep < 4 && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transfer History Section */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <History className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg text-blue-700">Transfer History</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Total Sent</p>
                        <p className="text-lg font-bold text-gray-900">$1,500</p>
                      </div>
                      <ArrowUpRight className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Completed</p>
                        <p className="text-lg font-bold text-green-600">2</p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {recentTransfers.map((transfer) => (
                    <div key={transfer.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(transfer.status)}
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{transfer.recipient}</div>
                          <div className="text-xs text-gray-500">{transfer.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 text-sm">{transfer.amount}</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transfer.status)}`}>
                          {transfer.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 border-blue-300 text-blue-600 hover:bg-blue-50">
                  <Eye className="w-4 h-4 mr-2" />
                  View All History
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            
            {/* Track Transfer Section */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <Route className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg text-green-700">Track Transfer</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">Monitor your transfer status in real-time</p>
                <div className="space-y-3">
                  <Label htmlFor="tracking" className="text-sm font-medium">
                    Tracking Number
                  </Label>
                  <Input 
                    id="tracking"
                    type="text" 
                    placeholder="Enter tracking number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                  <Button 
                    onClick={handleTrackTransfer}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Track Now
                  </Button>
                </div>
                
                {trackingResult && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-700 mb-3">Transfer Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-medium text-green-600">{trackingResult.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Recipient:</span>
                        <span>{trackingResult.recipient}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span>{trackingResult.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expected Delivery:</span>
                        <span>{trackingResult.estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Locations Section */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg text-purple-700">Find Locations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search locations"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {filteredLocations.map((location) => (
                      <div key={location.id} className="bg-white p-3 rounded-lg shadow-sm border border-purple-100">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-gray-900 text-sm">{location.name}</div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">{location.rating}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-gray-500" />
                            <p className="text-xs text-gray-600">{location.address}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3 text-gray-500" />
                            <p className="text-xs text-gray-600">{location.phone}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <p className="text-xs text-gray-600">{location.hours}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {location.services.map((service, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                              {service}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" variant="outline" className="mt-2 w-full border-purple-300 text-purple-600 hover:bg-purple-50 text-xs">
                          Get Directions • {location.distance}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4 border-purple-300 text-purple-600 hover:bg-purple-50">
                  <MapPin className="w-4 h-4 mr-2" />
                  View All Locations
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHomePage;
