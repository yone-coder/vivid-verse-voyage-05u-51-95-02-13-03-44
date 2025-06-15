import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  History, 
  Route,
  MapPin,
  ArrowRight,
  Loader2
} from 'lucide-react';
import TransferTypeSelector from '@/components/transfer/TransferTypeSelector';
import AmountInput from '@/components/transfer/AmountInput';
import MultiStepTransferSheet from '@/components/transfer/MultiStepTransferSheet';

export default function DesktopHomeWithTabs() {
  const navigate = useNavigate();
  const [transferType, setTransferType] = useState<'international' | 'national'>('international');
  const [amount, setAmount] = useState('100.00');
  const [showTransferSheet, setShowTransferSheet] = useState(false);

  // Calculate fees and totals
  const transferFee = amount ? (Math.ceil(parseFloat(amount) / 100) * 15).toFixed(2) : '0.00';
  const totalAmount = amount ? (parseFloat(amount) + parseFloat(transferFee)).toFixed(2) : '0.00';
  const receiverAmount = amount ? (parseFloat(amount) * 132.5).toFixed(2) : '0.00';

  const handleContinue = () => {
    // Validate amount before proceeding
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }
    
    // Show the multi-step transfer sheet - exactly like mobile version
    setShowTransferSheet(true);
  };

  const handleCloseTransferSheet = () => {
    setShowTransferSheet(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-blue-600">MoneyTransfer</div>
              <nav className="hidden lg:flex space-x-6">
                <button className="text-gray-700 hover:text-blue-600 font-medium">
                  Send Money
                </button>
                <button 
                  onClick={() => navigate('/transfer-history')}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  History
                </button>
                <button 
                  onClick={() => navigate('/track-transfer')}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Track Transfer
                </button>
                <button 
                  onClick={() => navigate('/locations')}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Locations
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700">
                Log in
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Send money to 
              <span className="text-blue-600 block">Haiti instantly</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Trusted by millions worldwide. Send money with the best exchange rates, 
              lowest fees, and fastest delivery times.
            </p>
          </div>

          {/* Transfer Form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            {/* Transfer Type Selector */}
            <div className="border-b border-gray-200">
              <TransferTypeSelector 
                transferType={transferType} 
                onTransferTypeChange={setTransferType}
                disableNavigation={true}
              />
            </div>
            
            {/* Transfer Form Content */}
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Money to Haiti</h2>
                <p className="text-gray-600">Enter the amount you want to send</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Amount Input */}
                <div className="space-y-6">
                  {/* Exchange Rate Display */}
                  {transferType === 'international' && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-blue-700">Exchange rate</span>
                        <span className="text-lg font-bold text-blue-800">
                          1 USD = 132.5 HTG
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Send Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Send Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-medium">$</span>
                      </div>
                      <Input
                        type="number"
                        className="pl-8 pr-16 h-14 text-lg font-medium"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-medium">USD</span>
                      </div>
                    </div>
                  </div>

                  {/* Receiver Gets */}
                  {transferType === 'international' && amount && parseFloat(amount) > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Receiver Gets
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 font-medium">HTG</span>
                        </div>
                        <Input
                          type="text"
                          className="pl-14 pr-16 h-14 text-lg font-medium bg-gray-50"
                          value={receiverAmount}
                          readOnly
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 font-medium">HTG</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Fee Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Send Amount</span>
                      <span className="font-medium">${amount || '0.00'}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Transfer fee</span>
                      <span className="font-medium">${transferFee}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total to pay</span>
                        <span className="text-lg font-bold text-blue-600">${totalAmount}</span>
                      </div>
                    </div>
                    
                    {transferType === 'international' && amount && parseFloat(amount) > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-700 font-medium">Recipient receives</span>
                          <span className="text-green-800 font-bold">{receiverAmount} HTG</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={handleContinue}
                    disabled={!amount || parseFloat(amount) <= 0}
                    className="w-full mt-6 h-12 text-lg font-medium"
                    size="lg"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardContent className="p-6 text-center">
                <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Transfer History</h3>
                <p className="text-gray-600 mb-4">View all your past money transfers</p>
                <Button 
                  onClick={() => navigate('/transfer-history')}
                  variant="outline"
                  className="w-full"
                >
                  View History
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Route className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Transfer</h3>
                <p className="text-gray-600 mb-4">Monitor your transfer status in real-time</p>
                <div className="mb-4">
                  <Input 
                    placeholder="Enter tracking number"
                    className="text-center"
                  />
                </div>
                <Button 
                  onClick={() => navigate('/track-transfer')}
                  variant="outline"
                  className="w-full"
                >
                  Track Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Locations</h3>
                <p className="text-gray-600 mb-4">Locate pickup points and agent locations in Haiti</p>
                <Button 
                  onClick={() => navigate('/locations')}
                  variant="outline"
                  className="w-full"
                >
                  Find Locations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Multi-Step Transfer Sheet - Exactly like mobile version */}
      {showTransferSheet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-hidden">
            <MultiStepTransferSheet onClose={handleCloseTransferSheet} />
          </div>
        </div>
      )}
    </div>
  );
}
