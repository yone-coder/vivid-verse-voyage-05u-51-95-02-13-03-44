
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, History, MapPin, Route } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DesktopHomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Send,
      title: 'Send Money',
      description: 'Send money worldwide with competitive rates',
      action: () => navigate('/transfer'),
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      icon: History,
      title: 'Transfer History',
      description: 'View your past transactions and receipts',
      action: () => navigate('/transfer-history'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: Route,
      title: 'Track Transfer',
      description: 'Track the status of your money transfers',
      action: () => navigate('/track-transfer'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: MapPin,
      title: 'Locations',
      description: 'Find pickup locations near you',
      action: () => navigate('/locations'),
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Transfer App</h1>
            </div>
            <nav className="flex space-x-6">
              <Button variant="ghost" onClick={() => navigate('/transfer-history')}>
                History
              </Button>
              <Button variant="ghost" onClick={() => navigate('/track-transfer')}>
                Track
              </Button>
              <Button variant="ghost" onClick={() => navigate('/locations')}>
                Locations
              </Button>
              <Button variant="ghost" onClick={() => navigate('/account')}>
                Account
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Send Money Worldwide</h2>
          <p className="text-xl mb-8 opacity-90">
            Fast, secure, and affordable money transfers to over 200 countries
          </p>
          <Button 
            size="lg" 
            className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg"
            onClick={() => navigate('/transfer')}
          >
            Start Transfer
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need for money transfers
            </h3>
            <p className="text-lg text-gray-600">
              Comprehensive tools to manage your international money transfers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={feature.action}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">200+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">$1B+</div>
              <div className="text-gray-600">Transferred Annually</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">5M+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesktopHomePage;
