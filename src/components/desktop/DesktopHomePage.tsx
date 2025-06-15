
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, History, MapPin, Route, Plus, Eye, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DesktopHomePage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('transfer');

  // Mock data for demonstration
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
              <Button variant="ghost" onClick={() => navigate('/account')}>
                Account
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content - Puzzle Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          
          {/* Send Money Section - Large Left Panel */}
          <div className="lg:col-span-6 flex flex-col">
            <Card className="flex-1 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-red-700">Send Money</CardTitle>
                  </div>
                  <Button 
                    size="lg"
                    onClick={() => navigate('/transfer')}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Transfer
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center">
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-700">Quick Transfer</h3>
                    <p className="text-gray-600">Send money worldwide with competitive rates</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-red-600">200+</div>
                      <div className="text-sm text-gray-600">Countries</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-red-600">$1B+</div>
                      <div className="text-sm text-gray-600">Transferred</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Split into sections */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            
            {/* Transfer History - Top Right */}
            <Card className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <History className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg text-blue-700">Recent Transfers</CardTitle>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/transfer-history')}
                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransfers.slice(0, 3).map((transfer) => (
                    <div key={transfer.id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
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
              </CardContent>
            </Card>

            {/* Bottom Row - Track and Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              
              {/* Track Transfer */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-4">
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
                    <input 
                      type="text" 
                      placeholder="Enter tracking number"
                      className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                    <Button 
                      size="sm" 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => navigate('/track-transfer')}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Track Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Locations */}
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg text-purple-700">Nearby Locations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {nearbyLocations.slice(0, 2).map((location, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="font-medium text-gray-900 text-sm">{location.name}</div>
                        <div className="text-xs text-gray-500">{location.address}</div>
                        <div className="text-xs text-purple-600 font-medium">{location.distance}</div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
                      onClick={() => navigate('/locations')}
                    >
                      View All Locations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHomePage;
