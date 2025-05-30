
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
      icon: <Send className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      action: () => navigate('/multi-step-transfer')
    },
    {
      id: 'track',
      title: 'Track',
      icon: <Search className="h-6 w-6" />,
      color: 'from-emerald-500 to-emerald-600',
      hoverColor: 'hover:from-emerald-600 hover:to-emerald-700',
      action: () => console.log('Track transfer')
    },
    {
      id: 'history',
      title: 'History',
      icon: <History className="h-6 w-6" />,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      action: () => console.log('Transfer history')
    },
    {
      id: 'cards',
      title: 'Cards',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700',
      action: () => console.log('Payment methods')
    },
    {
      id: 'locations',
      title: 'Locations',
      icon: <MapPin className="h-6 w-6" />,
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      action: () => console.log('Pickup locations')
    },
    {
      id: 'support',
      title: 'Support',
      icon: <Phone className="h-6 w-6" />,
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:from-indigo-600 hover:to-indigo-700',
      action: () => console.log('Customer support')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Transfer Header */}
      <TransferHomeHeader />
      
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Horizontal Quick Actions Section - No heading, 5.5 icons visible on mobile */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-2" style={{ width: 'calc(100% + 2rem)' }}>
              {quickActions.map((action, index) => (
                <button
                  key={action.id}
                  onClick={action.action}
                  className={`group flex flex-col items-center space-y-2 p-3 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex-shrink-0 ${
                    index >= 5 ? 'opacity-50' : ''
                  }`}
                  style={{ minWidth: '70px' }}
                >
                  <div className={`
                    relative w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} ${action.hoverColor}
                    flex items-center justify-center text-white shadow-lg
                    transition-all duration-300 group-hover:shadow-xl
                    before:absolute before:inset-0 before:rounded-2xl before:bg-white before:opacity-0 
                    before:transition-opacity before:duration-300 group-hover:before:opacity-10
                  `}>
                    {action.icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 text-center">
                    {action.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white py-8">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Send Money to Haiti
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Fast, secure, and reliable money transfers with competitive exchange rates
          </p>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-md mx-auto px-4 pb-20">
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl">
          <h3 className="text-xl font-bold mb-6">Why Choose Our Service?</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              <span className="text-gray-100">Competitive exchange rates</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
              <span className="text-gray-100">24-48 hour delivery</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              <span className="text-gray-100">Secure & encrypted transfers</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
              <span className="text-gray-100">Multiple pickup locations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferHomePage;
