
import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus, Send, CreditCard, Gift, Zap, MapPin, Globe, DollarSign, History, Phone, Wallet, ArrowUpDown } from 'lucide-react';
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
              <span>Welcome to Haiti Transfer - Send Money Safely & Quickly</span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Haiti</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                <span>EN / USD</span>
              </div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">HT</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">Haiti Transfer</div>
                <span className="text-gray-600 text-sm">Safe • Fast • Reliable</span>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for recipients, rates, or locations..."
                  className="w-full px-6 py-3 pl-14 border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">1 USD</div>
                <div className="text-sm text-gray-600">= 133.45 HTG</div>
              </div>
              
              <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <User className="h-6 w-6 mr-2" />
                <span>Marie Joseph</span>
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
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Transfer</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleSendClick}
                  className="w-full flex items-center p-4 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100"
                >
                  <div className="bg-red-600 p-3 rounded-lg mr-4">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">Send to Haiti</span>
                </button>
                <button className="w-full flex items-center p-4 rounded-xl hover:bg-green-50 transition-colors border border-gray-100">
                  <div className="bg-green-600 p-3 rounded-lg mr-4">
                    <ArrowUpDown className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">Local Transfer</span>
                </button>
                <button className="w-full flex items-center p-4 rounded-xl hover:bg-purple-50 transition-colors border border-gray-100">
                  <div className="bg-purple-600 p-3 rounded-lg mr-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">Express Send</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Account Balance</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">$2,547.00</div>
                <p className="text-gray-600 mb-4">Available Balance</p>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Add Funds
                </button>
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
                      <h2 className="text-3xl font-bold mb-2">Send Money to Haiti</h2>
                      <p className="text-lg mb-4">Fast, secure, and affordable transfers</p>
                      <button 
                        onClick={handleSendClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Start Transfer
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

            {/* Transfer Methods Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Transfer Methods</h3>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-blue-700 text-lg">Instant Transfer</span>
                      <p className="text-blue-600 text-sm">Fee: $2.99</p>
                    </div>
                  </div>
                  <p className="text-gray-600">Arrives in minutes to mobile wallets</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-green-700 text-lg">Cash Pickup</span>
                      <p className="text-green-600 text-sm">Fee: $4.99</p>
                    </div>
                  </div>
                  <p className="text-gray-600">200+ pickup locations across Haiti</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-purple-700 text-lg">Bank Deposit</span>
                      <p className="text-purple-600 text-sm">Fee: $3.99</p>
                    </div>
                  </div>
                  <p className="text-gray-600">Direct to bank account in 1-2 days</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-orange-700 text-lg">Mobile Wallet</span>
                      <p className="text-orange-600 text-sm">Fee: $1.99</p>
                    </div>
                  </div>
                  <p className="text-gray-600">Instant to Moncash & other wallets</p>
                </div>
              </div>
            </div>

            {/* Financial Services */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Financial Services</h3>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-red-200 transition-colors">
                    <History className="w-10 h-10 text-red-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Transfer History</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-pink-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-pink-200 transition-colors">
                    <Users className="w-10 h-10 text-pink-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Recipients</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-indigo-200 transition-colors">
                    <FileText className="w-10 h-10 text-indigo-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Track Money</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-teal-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-teal-200 transition-colors">
                    <Phone className="w-10 h-10 text-teal-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Mobile Top-Up</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-yellow-200 transition-colors">
                    <Plus className="w-10 h-10 text-yellow-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Add Funds</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-cyan-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-cyan-200 transition-colors">
                    <Wallet className="w-10 h-10 text-cyan-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Bill Payment</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-gray-200 transition-colors">
                    <Globe className="w-10 h-10 text-gray-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Agent Locator</span>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-emerald-200 transition-colors">
                    <DollarSign className="w-10 h-10 text-emerald-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Rate Calculator</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Recipients</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold">JP</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Jean Pierre</p>
                      <p className="text-sm text-gray-500">Port-au-Prince</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleSendClick}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-pink-600 font-semibold">ML</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Marie Louise</p>
                      <p className="text-sm text-gray-500">Cap-Haïtien</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleSendClick}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-semibold">PD</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Pierre Duval</p>
                      <p className="text-sm text-gray-500">Jacmel</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleSendClick}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Special Offer</h3>
              <div className="bg-gradient-to-r from-red-400 to-blue-400 rounded-xl p-4 text-white">
                <div className="text-center">
                  <p className="font-bold text-lg mb-2">Zero Fees This Month!</p>
                  <p className="text-sm mb-3">Send up to $500 with no transfer fees</p>
                  <button 
                    onClick={handleSendClick}
                    className="bg-white text-red-500 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Use Offer
                  </button>
                  <p className="text-xs mt-2 opacity-80">Valid until June 30, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
