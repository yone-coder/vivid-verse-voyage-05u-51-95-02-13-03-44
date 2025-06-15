
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, History, MapPin, Route, Search, Eye, User, Star, Phone, Clock, CheckCircle, XCircle, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
    setReceiverDetails({
      firstName: details.firstName || '',
      lastName: details.lastName || '',
      phoneNumber: details.phoneNumber || '',
      department: details.department || '',
      commune: details.commune || '',
      email: details.email || ''
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
                  onDetailsChange={handleDetailsChange}
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

          {/* Right Column */}
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
