
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Search, Clock, CreditCard, MapPin, Phone, History } from 'lucide-react';
import { Button } from "@/components/ui/button";
import HeroBanner from '@/components/home/HeroBanner';
import TransferHomeHeader from '@/components/transfer/TransferHomeHeader';

const TransferHomePage: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'send',
      title: 'Send',
      icon: <Send className="h-5 w-5" />,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => navigate('/multi-step-transfer')
    },
    {
      id: 'track',
      title: 'Track',
      icon: <Search className="h-5 w-5" />,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => console.log('Track transfer')
    },
    {
      id: 'history',
      title: 'History',
      icon: <History className="h-5 w-5" />,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => console.log('Transfer history')
    },
    {
      id: 'cards',
      title: 'Cards',
      icon: <CreditCard className="h-5 w-5" />,
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => console.log('Payment methods')
    },
    {
      id: 'locations',
      title: 'Locations',
      icon: <MapPin className="h-5 w-5" />,
      color: 'bg-red-500 hover:bg-red-600',
      action: () => console.log('Pickup locations')
    },
    {
      id: 'support',
      title: 'Support',
      icon: <Phone className="h-5 w-5" />,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      action: () => console.log('Customer support')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Transfer Header */}
      <TransferHomeHeader />
      
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Welcome Section */}
      <div className="bg-white py-6">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Send Money to Haiti
          </h1>
          <p className="text-gray-600 text-sm">
            Fast, secure, and reliable money transfers with competitive exchange rates
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-4 pb-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        
        {/* Circular Quick Action Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="flex flex-col items-center space-y-2"
            >
              <div className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95`}>
                {action.icon}
              </div>
              <span className="text-xs font-medium text-gray-700">{action.title}</span>
            </button>
          ))}
        </div>

        {/* Featured Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Why Choose Our Service?</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              Competitive exchange rates
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              24-48 hour delivery
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              Secure & encrypted transfers
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              Multiple pickup locations
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransferHomePage;
