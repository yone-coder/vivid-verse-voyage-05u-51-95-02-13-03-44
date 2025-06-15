
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Bell, 
  User, 
  Send, 
  TrendingUp, 
  Shield, 
  Clock, 
  Globe,
  ArrowRight,
  CreditCard,
  Smartphone,
  MapPin,
  History,
  Star,
  DollarSign
} from 'lucide-react';

export default function DesktopHomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const quickActions = [
    {
      icon: Send,
      title: 'Send Money',
      description: 'Transfer money to Haiti instantly',
      color: 'bg-blue-500',
      path: '/transfer'
    },
    {
      icon: History,
      title: 'Transfer History',
      description: 'View all your past transfers',
      color: 'bg-green-500',
      path: '/transfer-history'
    },
    {
      icon: MapPin,
      title: 'Find Locations',
      description: 'Locate pickup points in Haiti',
      color: 'bg-purple-500',
      path: '/locations'
    },
    {
      icon: User,
      title: 'Account Settings',
      description: 'Manage your profile and preferences',
      color: 'bg-orange-500',
      path: '/account'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure Transfers',
      description: 'Bank-level encryption and security protocols'
    },
    {
      icon: Clock,
      title: 'Fast Processing',
      description: 'Transfers completed within 24-48 hours'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Send money to any location in Haiti'
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment Options',
      description: 'Credit cards, debit cards, and bank transfers'
    }
  ];

  const stats = [
    { label: 'Countries Served', value: '1', icon: Globe },
    { label: 'Happy Customers', value: '10K+', icon: User },
    { label: 'Total Transfers', value: '$2M+', icon: DollarSign },
    { label: 'Average Rating', value: '4.9', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-blue-600">MoneyTransfer</div>
              <nav className="hidden lg:flex space-x-6">
                <button 
                  onClick={() => navigate('/transfer')}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Send Money
                </button>
                <button 
                  onClick={() => navigate('/locations')}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Locations
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
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  type="text" 
                  placeholder="Search transfers, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/account')}
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Send Money to Haiti
                <span className="block text-blue-200">Fast & Secure</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Transfer money to your loved ones in Haiti with our reliable, 
                secure, and fast money transfer service. Best exchange rates guaranteed.
              </p>
              <div className="flex space-x-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate('/transfer')}
                >
                  Send Money Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={() => navigate('/locations')}
                >
                  Find Locations
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-blue-100">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-gray-600 text-lg">Everything you need to manage your money transfers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 text-lg">Trusted by thousands for reliable money transfers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exchange Rate Card */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-gray-900 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
                Today's Exchange Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                1 USD = 127.50 HTG
              </div>
              <p className="text-gray-600 mb-6">
                Competitive rates updated every hour
              </p>
              <Button 
                size="lg"
                onClick={() => navigate('/transfer')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Start Transfer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold mb-4">MoneyTransfer</div>
              <p className="text-gray-400">
                Reliable money transfer service to Haiti with the best rates and fastest delivery.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/transfer')} className="hover:text-white">Send Money</button></li>
                <li><button onClick={() => navigate('/locations')} className="hover:text-white">Find Locations</button></li>
                <li><button onClick={() => navigate('/track-transfer')} className="hover:text-white">Track Transfer</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/profile')} className="hover:text-white">Profile</button></li>
                <li><button onClick={() => navigate('/transfer-history')} className="hover:text-white">Transfer History</button></li>
                <li><button onClick={() => navigate('/account')} className="hover:text-white">Settings</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MoneyTransfer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
