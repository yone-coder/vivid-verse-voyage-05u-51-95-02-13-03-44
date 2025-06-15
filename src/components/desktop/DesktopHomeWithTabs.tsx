
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Send, 
  History, 
  Route,
  MapPin,
  ArrowRight
} from 'lucide-react';
import MultiStepTransferSheetDesktopPage from '@/pages/MultiStepTransferSheetDesktopPage';

export default function DesktopHomeWithTabs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('send');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-blue-600">MoneyTransfer</div>
              <nav className="hidden lg:flex space-x-6">
                <button 
                  onClick={() => setActiveTab('send')}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Send Money
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  History
                </button>
                <button 
                  onClick={() => setActiveTab('track')}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Track Transfer
                </button>
                <button 
                  onClick={() => setActiveTab('locations')}
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
              <Button onClick={() => setActiveTab('send')} className="bg-blue-600 hover:bg-blue-700">
                Get started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Switcher Section */}
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

          {/* Desktop Tab Switcher */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8 bg-white shadow-lg border border-gray-200">
              <TabsTrigger value="send" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Send className="h-4 w-4" />
                <span>Send</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <History className="h-4 w-4" />
                <span>History</span>
              </TabsTrigger>
              <TabsTrigger value="track" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Route className="h-4 w-4" />
                <span>Track</span>
              </TabsTrigger>
              <TabsTrigger value="locations" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <MapPin className="h-4 w-4" />
                <span>Locations</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="send" className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <MultiStepTransferSheetDesktopPage />
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-8">
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="text-center">
                    <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Transfer History</h3>
                    <p className="text-gray-600 mb-6">View all your past money transfers</p>
                    <Button 
                      onClick={() => navigate('/transfer-history')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      View History
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="track" className="space-y-8">
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Route className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Track Transfer</h3>
                    <p className="text-gray-600 mb-6">Monitor your transfer status in real-time</p>
                    <div className="max-w-md mx-auto mb-6">
                      <Input 
                        placeholder="Enter tracking number"
                        className="text-center"
                      />
                    </div>
                    <Button 
                      onClick={() => navigate('/track-transfer')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Track Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="locations" className="space-y-8">
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Locations</h3>
                    <p className="text-gray-600 mb-6">Locate pickup points and agent locations in Haiti</p>
                    <Button 
                      onClick={() => navigate('/locations')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Find Locations
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
