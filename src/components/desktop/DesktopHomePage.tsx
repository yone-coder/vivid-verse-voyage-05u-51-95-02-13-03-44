
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, History, MapPin, Route, Search, Eye, User } from 'lucide-react';
import TransferTypeSelector from '@/components/transfer/TransferTypeSelector';
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepOneLocalTransfer from '@/components/transfer/StepOneLocalTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';

const DesktopHomePage = () => {
  // Transfer state
  const [transferType, setTransferType] = useState<'international' | 'national'>('international');
  const [amount, setAmount] = useState('');
  const [receiverDetails, setReceiverDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    department: '',
    commune: '',
    email: ''
  });

  // Track transfer state
  const [trackingNumber, setTrackingNumber] = useState('');
  
  // Mock data
  const recentTransfers = [
    { id: '1', recipient: 'John Doe', amount: '$500', status: 'Completed', date: '2024-06-14' },
    { id: '2', recipient: 'Jane Smith', amount: '$250', status: 'Pending', date: '2024-06-13' },
    { id: '3', recipient: 'Mike Johnson', amount: '$750', status: 'Completed', date: '2024-06-12' },
  ];

  const nearbyLocations = [
    { name: 'Downtown Branch', address: '123 Main St', distance: '0.5 miles' },
    { name: 'Mall Location', address: '456 Shopping Center', distance: '1.2 miles' },
    { name: 'Airport Terminal', address: '789 Airport Rd', distance: '3.4 miles' },
  ];

  const handleSendTransfer = () => {
    console.log('Transfer submitted:', { transferType, amount, receiverDetails });
    // Reset form
    setAmount('');
    setReceiverDetails({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      department: '',
      commune: '',
      email: ''
    });
  };

  const handleTrackTransfer = () => {
    console.log('Tracking transfer:', trackingNumber);
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column */}
          <div className="space-y-8">
            
            {/* Send Money Section */}
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-red-700">Send Money</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
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

                <StepTwoTransfer 
                  receiverDetails={receiverDetails}
                  onDetailsChange={setReceiverDetails}
                />

                <Button 
                  onClick={handleSendTransfer}
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  Send Transfer
                </Button>
              </CardContent>
            </Card>

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
                
                {trackingNumber && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-700 mb-2">Transfer Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-medium text-green-600">In Transit</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expected Delivery:</span>
                        <span>Tomorrow, 2:00 PM</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
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
                <div className="space-y-3">
                  {recentTransfers.map((transfer) => (
                    <div key={transfer.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                      <div>
                        <div className="font-medium text-gray-900">{transfer.recipient}</div>
                        <div className="text-sm text-gray-500">{transfer.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{transfer.amount}</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          transfer.status === 'Completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
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

            {/* Locations Section */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg text-purple-700">Nearby Locations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nearbyLocations.map((location, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                      <div className="font-medium text-gray-900 text-sm">{location.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{location.address}</div>
                      <div className="text-xs text-purple-600 font-medium mt-1">{location.distance}</div>
                      <Button size="sm" variant="outline" className="mt-2 w-full border-purple-300 text-purple-600 hover:bg-purple-50">
                        Get Directions
                      </Button>
                    </div>
                  ))}
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
