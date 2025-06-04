
import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus, Send, CreditCard, Gift, Zap, MapPin, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PaytmDesktopHome() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  
  const bannerImages = [
    "/lovable-uploads/2102d3a1-ec6e-4c76-8ee0-549c3ae3d54e.png",
    "/lovable-uploads/4dbaee7c-2ac5-4a1b-9f9b-121275273e79.png",
    "/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const handleSendClick = () => {
    navigate('/multi-step-transfer-desktop');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="bg-blue-600 text-white py-2">
          <div className="container mx-auto px-6 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span>Welcome to Paytm - Your Digital Payment Partner</span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>India</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                <span>EN / INR</span>
              </div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-bold text-blue-600">Paytm</div>
              <span className="text-red-500 text-2xl">❤</span>
              <span className="text-2xl font-bold text-blue-700">UPI</span>
              <span className="text-yellow-500 text-2xl">⚡</span>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for services, offers, and more..."
                  className="w-full px-6 py-3 pl-14 border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <User className="h-6 w-6 mr-2" />
                <span>Sign In</span>
              </button>
              
              <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors relative">
                <Bell className="h-6 w-6 mr-2" />
                <span>Notifications</span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleSendClick}
                  className="w-full flex items-center p-4 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100"
                >
                  <div className="bg-blue-600 p-3 rounded-lg mr-4">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">Send Money</span>
                </button>
                <button className="w-full flex items-center p-4 rounded-xl hover:bg-green-50 transition-colors border border-gray-100">
                  <div className="bg-green-600 p-3 rounded-lg mr-4">
                    <QrCode className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">Scan & Pay</span>
                </button>
                <button className="w-full flex items-center p-4 rounded-xl hover:bg-purple-50 transition-colors border border-gray-100">
                  <div className="bg-purple-600 p-3 rounded-lg mr-4">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">Mobile Recharge</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Mobile Recharge</span>
                  <span className="text-green-600">₹299</span>
                </div>
                <div className="flex justify-between">
                  <span>Money Transfer</span>
                  <span className="text-red-600">₹5,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Bill Payment</span>
                  <span className="text-green-600">₹1,250</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            {/* Hero Banner */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-80">
                {bannerImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Banner ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 text-white">
                      <h2 className="text-3xl font-bold mb-2">Digital India</h2>
                      <p className="text-lg mb-4">Experience the future of payments</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                        Get Started
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Banner Controls */}
                <div className="absolute bottom-4 right-8 flex gap-2">
                  {bannerImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === activeSlide ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => setActiveSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Money Transfer Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Money Transfer</h3>
              <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-700 transition-colors shadow-lg">
                    <QrCode className="w-10 h-10 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">Scan & Pay</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-700 transition-colors shadow-lg">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">To Mobile</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-700 transition-colors shadow-lg">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">To Bank A/C</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-700 transition-colors shadow-lg">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">To Self A/c</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-200 transition-colors">
                    <FileText className="w-10 h-10 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Balance & History</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-200 transition-colors">
                    <QrCode className="w-10 h-10 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Receive Money</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-200 transition-colors">
                    <Users className="w-10 h-10 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Refer & Win</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-200 transition-colors">
                    <Zap className="w-10 h-10 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">All UPI Services</span>
                </div>
              </div>
            </div>

            {/* Recharge & Bill Payments */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Recharge & Bill Payments</h3>
              <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-200 transition-colors">
                    <Smartphone className="w-10 h-10 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Mobile Recharge</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-green-200 transition-colors">
                    <Truck className="w-10 h-10 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">FASTag Recharge</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-yellow-200 transition-colors">
                    <Lightbulb className="w-10 h-10 text-yellow-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Electricity Bill</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-red-200 transition-colors">
                    <span className="text-red-600 font-bold text-2xl">Lo</span>
                  </div>
                  <span className="text-gray-700 font-medium">Loan Payments</span>
                </div>
              </div>
              <button className="flex items-center gap-3 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                <Plus className="w-6 h-6" />
                Add New or View existing Bills
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Offers & Rewards</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Gift className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="font-medium text-orange-800">Cashback Offer</span>
                  </div>
                  <p className="text-sm text-orange-700">Get 10% cashback on first transaction</p>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <CreditCard className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Bill Payment</span>
                  </div>
                  <p className="text-sm text-green-700">Pay bills and earn rewards points</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Wallet Balance</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">₹2,547</div>
                <p className="text-gray-600 mb-4">Available Balance</p>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Add Money
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
