
import React from 'react';
import { 
  Send, 
  DollarSign, 
  MapPin, 
  Bell, 
  User, 
  Smartphone, 
  ChevronRight,
  Plus,
  History,
  Users,
  FileText,
  Phone,
  Wallet,
  Globe,
  Building,
  ArrowUpDown,
  CreditCard,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../home/Logo';

export default function PaytmMobileHome() {
  const navigate = useNavigate();

  const handleSendClick = () => {
    navigate('/multi-step-transfer-page');
  };

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      {/* Minimal Header with overlap */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white pb-2">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Logo width={20} height={20} />
              </div>
              <div>
                <p className="text-sm opacity-90">Welcome to</p>
                <p className="font-semibold">Global Transfer</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Bell className="w-6 h-6" />
              <User className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* White Profile Card - Overlapping the header */}
      <div className="mx-4 -mt-6 mb-4 relative z-10">
        <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Logo width={28} height={28} />
              </div>
              <div>
                <p className="font-semibold text-lg text-gray-800">Global Transfer</p>
                <p className="text-sm text-gray-600">Secure Money Transfer</p>
                <p className="text-xs text-gray-500">Trusted since 2023</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs mb-1">
                ✓ Secure
              </div>
              <p className="text-xs text-gray-500">Fast & Reliable</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button 
              onClick={handleSendClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex-1"
            >
              Send Money
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm flex-1">
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* Exchange Rate Banner */}
      <div className="mx-4 mb-4">
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Today's Rate</p>
              <p className="text-lg font-bold text-gray-800">1 USD = 133.45 HTG</p>
            </div>
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
              Live
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 space-y-4">
        {/* Quick Transfer Options Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Quick Transfer</h3>
          <div className="grid grid-cols-4 gap-3">
            <button className="text-center" onClick={handleSendClick}>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Send className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Send to Haiti</p>
            </button>
            <button className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <ArrowUpDown className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Local Transfer</p>
            </button>
            <button className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Express Send</p>
            </button>
            <button className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CreditCard className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Bill Payment</p>
            </button>
          </div>
        </div>

        {/* Transfer Methods Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Transfer Methods</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-blue-700">Instant Transfer</span>
              </div>
              <p className="text-xs text-blue-600 mb-1">Fee: $2.99</p>
              <p className="text-xs text-gray-600">Arrives in minutes</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-green-700">Cash Pickup</span>
              </div>
              <p className="text-xs text-green-600 mb-1">Fee: $4.99</p>
              <p className="text-xs text-gray-600">200+ locations</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-2">
                  <Building className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-purple-700">Bank Deposit</span>
              </div>
              <p className="text-xs text-purple-600 mb-1">Fee: $3.99</p>
              <p className="text-xs text-gray-600">1-2 business days</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-orange-700">Mobile Wallet</span>
              </div>
              <p className="text-xs text-orange-600 mb-1">Fee: $1.99</p>
              <p className="text-xs text-gray-600">Instant to wallet</p>
            </div>
          </div>
        </div>

        {/* Financial Services Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Financial Services</h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <History className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Transfer History</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Recipients</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Track Money</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Phone className="w-6 h-6 text-teal-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Mobile Top-Up</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Plus className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Add Funds</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Wallet className="w-6 h-6 text-cyan-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Bill Payment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Globe className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Agent Locator</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Rate Calculator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Recipients */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Recent Recipients</h3>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold text-sm">JP</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Jean Pierre</p>
                  <p className="text-sm text-gray-500">Port-au-Prince • Last: $150</p>
                </div>
              </div>
              <div className="text-right">
                <button 
                  onClick={handleSendClick}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mb-1"
                >
                  Send
                </button>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-pink-600 font-semibold text-sm">ML</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Marie Louise</p>
                  <p className="text-sm text-gray-500">Cap-Haïtien • Last: $200</p>
                </div>
              </div>
              <div className="text-right">
                <button 
                  onClick={handleSendClick}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mb-1"
                >
                  Send
                </button>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-semibold text-sm">PD</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Pierre Duval</p>
                  <p className="text-sm text-gray-500">Jacmel • Last: $75</p>
                </div>
              </div>
              <div className="text-right">
                <button 
                  onClick={handleSendClick}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mb-1"
                >
                  Send
                </button>
                <p className="text-xs text-gray-500">2 weeks ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tutorials Section */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Video Tutorials</h3>
            <span className="text-xs text-blue-600 font-medium">View All</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div className="w-16 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3 relative">
                <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded">3:45</div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">How to Send Money to Haiti</p>
                <p className="text-xs text-gray-500">Step-by-step guide for first-time users</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400 text-xs mr-2">★★★★★</div>
                  <span className="text-xs text-gray-500">2.1K views</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <div className="w-16 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3 relative">
                <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded">2:12</div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">Cash Pickup Locations</p>
                <p className="text-xs text-gray-500">Find the nearest pickup point</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400 text-xs mr-2">★★★★☆</div>
                  <span className="text-xs text-gray-500">1.8K views</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-100">
              <div className="w-16 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-3 relative">
                <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded">4:30</div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">Mobile Money & Bill Payments</p>
                <p className="text-xs text-gray-500">Pay bills and top-up phones in Haiti</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400 text-xs mr-2">★★★★★</div>
                  <span className="text-xs text-gray-500">950 views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotion Banner */}
      <div className="mx-4 mb-6">
        <div className="bg-gradient-to-r from-red-400 to-blue-400 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg">Zero Fees This Month!</p>
              <p className="text-sm opacity-90">Send up to $500 with no transfer fees</p>
              <p className="text-xs opacity-80 mt-1">Valid until June 30, 2025</p>
            </div>
            <div className="text-center">
              <button 
                onClick={handleSendClick}
                className="bg-white text-red-500 px-4 py-2 rounded-full text-sm font-medium mb-2"
              >
                Use Offer
              </button>
              <p className="text-xs opacity-80">Terms apply</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
