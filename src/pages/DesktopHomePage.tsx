
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Bell, 
  User, 
  Send, 
  Shield, 
  Clock, 
  Globe,
  ArrowRight,
  Star,
  DollarSign,
  Smartphone,
  Play,
  CheckCircle,
  TrendingUp,
  Users,
  MapPin,
  CreditCard
} from 'lucide-react';
import MobileMultiStepTransferSheetPage from '@/components/mobile/transfer/MobileMultiStepTransferSheetPage';

export default function DesktopHomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'Your money is protected with bank-level security and encryption'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Money delivered within minutes to hours, not days'
    },
    {
      icon: DollarSign,
      title: 'Great Exchange Rates',
      description: 'Competitive rates with transparent, low fees'
    },
    {
      icon: Smartphone,
      title: 'Easy to Use',
      description: 'Simple, intuitive mobile and web experience'
    }
  ];

  const stats = [
    { value: '5M+', label: 'Customers worldwide', icon: Users },
    { value: '150+', label: 'Countries & territories', icon: Globe },
    { value: '4.8★', label: 'App store rating', icon: Star },
    { value: '$50B+', label: 'Money transferred', icon: TrendingUp }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Choose amount',
      description: 'Enter the amount you want to send'
    },
    {
      step: '2',
      title: 'Add recipient',
      description: 'Add your recipient\'s details'
    },
    {
      step: '3',
      title: 'Pay securely',
      description: 'Pay with your bank account, debit or credit card'
    }
  ];

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
                  onClick={() => navigate('/transfer')}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Send Money
                </button>
                <button 
                  onClick={() => navigate('/locations')}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Receive Money
                </button>
                <button 
                  onClick={() => navigate('/transfer-history')}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Track Transfer
                </button>
                <button className="text-gray-700 hover:text-blue-600 font-medium">
                  Help
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700">
                Log in
              </Button>
              <Button onClick={() => navigate('/transfer')} className="bg-blue-600 hover:bg-blue-700">
                Get started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Send money to 
                <span className="text-blue-600 block">Haiti instantly</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Trusted by millions worldwide. Send money with the best exchange rates, 
                lowest fees, and fastest delivery times.
              </p>
              
              {/* Exchange Rate Preview */}
              <div className="bg-white rounded-lg p-6 shadow-sm mb-8 border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">You send</span>
                  <span className="text-gray-600">Recipient gets</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">$100 USD</div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                  <div className="text-2xl font-bold text-blue-600">12,750 HTG</div>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Rate: 1 USD = 127.50 HTG • Fee: $2.99
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
                onClick={() => navigate('/transfer')}
              >
                Send money now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="text-sm text-gray-500 mt-4">
                ⚡ Ready in minutes • 🔒 Secure & regulated
              </p>
            </div>

            {/* Right Content - Mobile App Preview */}
            <div className="relative">
              <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl max-w-sm mx-auto">
                <div className="bg-white rounded-2xl overflow-hidden" style={{ height: '600px' }}>
                  {/* Mobile App Content */}
                  <div className="h-full relative overflow-hidden">
                    <div className="absolute inset-0 scale-90 origin-top">
                      <MobileMultiStepTransferSheetPage />
                    </div>
                  </div>
                </div>
                
                {/* Phone notch */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-full"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg">
                <Send className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600">Send money in 3 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why choose us?</h2>
            <p className="text-xl text-gray-600">The smart choice for money transfers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to send money?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join millions who trust us with their money transfers
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4"
            onClick={() => navigate('/transfer')}
          >
            Send your first transfer
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold mb-4">MoneyTransfer</div>
              <p className="text-gray-400">
                Fast, secure, and affordable money transfers to Haiti.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Send Money</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/transfer')} className="hover:text-white">Send to Haiti</button></li>
                <li><button onClick={() => navigate('/locations')} className="hover:text-white">Find locations</button></li>
                <li><button onClick={() => navigate('/track-transfer')} className="hover:text-white">Track transfer</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help center</a></li>
                <li><a href="#" className="hover:text-white">Contact us</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Legal</a></li>
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
