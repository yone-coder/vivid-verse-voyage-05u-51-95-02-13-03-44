
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  History, 
  Route,
  MapPin,
  ArrowRight
} from 'lucide-react';
import MultiStepTransferSheetDesktopPage from '@/pages/MultiStepTransferSheetDesktopPage';
import TransferTypeSelector from '@/components/transfer/TransferTypeSelector';

export default function DesktopHomeWithTabs() {
  const navigate = useNavigate();
  const [transferType, setTransferType] = useState<'international' | 'national'>('international');

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

          {/* Transfer Form with Type Selector */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            {/* Transfer Type Selector */}
            <div className="border-b border-gray-200">
              <TransferTypeSelector 
                transferType={transferType} 
                onTransferTypeChange={setTransferType}
                disableNavigation={true}
              />
            </div>
            
            {/* Transfer Form */}
            <MultiStepTransferSheetDesktopPage />
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
    </div>
  );
}
