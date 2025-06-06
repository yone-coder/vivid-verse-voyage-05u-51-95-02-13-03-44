import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus, Send, CreditCard, Gift, Zap, MapPin, Globe, DollarSign, History, Phone, Wallet, ArrowUpDown, ChevronRight, Building, TrendingUp, BarChart3, PieChart, Calculator, Shield, Clock, Star, Award, Target, Briefcase, HeadphonesIcon, Download, Share2, Eye, Lock, Settings, HelpCircle, MessageSquare, Camera, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Logo from '../../home/Logo';
import MobileTransferInput from '@/components/mobile/paytm/MobileTransferInput';

export default function PaytmDesktopHome() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [amount, setAmount] = useState('');
  
  // Sample banner data - now just for images
  const bannerImages = [
    "/lovable-uploads/2102d3a1-ec6e-4c76-8ee0-549c3ae3d54e.png",
    "/lovable-uploads/4dbaee7c-2ac5-4a1b-9f9b-121275273e79.png",
    "/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png"
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const handleSendClick = () => {
    navigate('/multi-step-transfer-desktop');
  };

  const handleLocalTransferClick = () => {
    navigate('/local-transfer');
  };

  const financialServices = [
    { icon: History, label: 'Transfer History', color: 'red', desc: 'View all transfers' },
    { icon: FileText, label: 'Track Money', color: 'indigo', desc: 'Real-time tracking' },
    { icon: Phone, label: 'Mobile Top-Up', color: 'teal', desc: 'Recharge phones' },
    { icon: Globe, label: 'Agent Locator', color: 'gray', desc: 'Find locations' },
    { icon: Calculator, label: 'Rate Calculator', color: 'emerald', desc: 'Exchange rates' },
    { icon: BarChart3, label: 'Analytics', color: 'purple', desc: 'Spending insights' }
  ];

  const bankingFeatures = [
    { icon: Building, label: 'Virtual Account', desc: 'Get your virtual bank account', isNew: true },
    { icon: CreditCard, label: 'Debit Card', desc: 'Order your Haiti Transfer card', isPopular: true },
    { icon: TrendingUp, label: 'Investments', desc: 'Grow your money with investments' },
    { icon: Shield, label: 'Savings Account', desc: 'High-yield savings account' },
    { icon: Calculator, label: 'Loans', desc: 'Quick personal loans' },
    { icon: PieChart, label: 'Budget Tracker', desc: 'Track your spending habits' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">HT</span>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Haiti Transfer</div>
                <span className="text-gray-600 text-sm flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  Secure • Fast • Reliable
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search recipients, rates, locations, or help..."
                  className="w-full px-6 py-3 pl-14 pr-20 border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Mic className="h-4 w-4 text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Camera className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors relative group">
                <Bell className="h-6 w-6 mr-2" />
                <span>Notifications</span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  5
                </span>
              </button>
              <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <HeadphonesIcon className="h-6 w-6 mr-2" />
                <span>Support</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Mobile Content with Separated Sections */}
          <div className="space-y-6">
            {/* User Profile Section */}
            <Card className="shadow-lg">
              <CardContent className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">MJ</span>
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-gray-800">Marie Joseph</p>
                        <p className="text-sm text-gray-600">Verified Account</p>
                        <p className="text-xs text-gray-500">Member since 2023</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs mb-1">
                        ✓ Verified
                      </div>
                      <p className="text-xs text-gray-500">ID Confirmed</p>
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
              </CardContent>
            </Card>

            {/* Exchange Rate Section */}
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                  Live Exchange Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Today's Rate</p>
                      <p className="text-xl font-bold text-gray-800">1 USD = 133.45 HTG</p>
                    </div>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Live
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Transfer Section */}
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <Send className="h-5 w-5 mr-2 text-purple-600" />
                  Quick Transfer Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  <button className="text-center" onClick={handleSendClick}>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Send className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Send to Haiti</p>
                  </button>
                  <button className="text-center" onClick={handleLocalTransferClick}>
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
              </CardContent>
            </Card>

            {/* Transfer Amount Section */}
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-orange-600" />
                  Send Money
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MobileTransferInput 
                  amount={amount}
                  onAmountChange={setAmount}
                />
              </CardContent>
            </Card>

            {/* Recent Recipients Section */}
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-indigo-600" />
                    Recent Recipients
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Desktop Features */}
          <div className="space-y-6">
            {/* Enhanced Financial Services */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Briefcase className="h-6 w-6 mr-2 text-purple-600" />
                  Financial Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {financialServices.map((service, index) => (
                    <div key={index} className="text-center group cursor-pointer">
                      <div className={`w-14 h-14 bg-${service.color}-100 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:bg-${service.color}-200 transition-colors group-hover:scale-110 transform duration-200`}>
                        <service.icon className={`w-7 h-7 text-${service.color}-600`} />
                      </div>
                      <span className="text-gray-700 font-medium block text-xs leading-tight">{service.label}</span>
                      <span className="text-xs text-gray-500 mt-1 block">{service.desc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Banking Features */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-green-600" />
                  Banking Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {bankingFeatures.map((feature, index) => (
                    <div key={index} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group h-36 flex flex-col justify-between">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                          <feature.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                        </div>
                        <div className="mb-2">
                          <div className="flex items-center justify-center mb-1">
                            <span className="font-medium text-gray-800 text-sm text-center leading-tight">{feature.label}</span>
                          </div>
                          {feature.isNew && <Badge className="mb-1 text-xs bg-green-500">New</Badge>}
                          {feature.isPopular && <Badge className="mb-1 text-xs bg-orange-500">Popular</Badge>}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 text-center mt-auto">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Stats */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                  Live Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-600">1,234</div>
                    <div className="text-sm text-gray-600">Online Users</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">89</div>
                    <div className="text-sm text-gray-600">Active Transfers</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-600">156</div>
                    <div className="text-sm text-gray-600">Pending Orders</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">$2.1M</div>
                    <div className="text-sm text-gray-600">Daily Volume</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Special Offers */}
            <Card className="shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 p-6 text-white">
                <div className="text-center">
                  <Gift className="h-8 w-8 mx-auto mb-3" />
                  <p className="font-bold text-xl mb-2">🎉 Zero Fees Special!</p>
                  <p className="text-sm mb-4 opacity-90">Send up to $500 with no transfer fees this month</p>
                  <button 
                    onClick={handleSendClick}
                    className="w-full bg-white text-red-500 py-3 px-4 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors mb-3 flex items-center justify-center"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Claim Offer Now
                  </button>
                  <p className="text-xs opacity-80">Valid until June 30, 2025 • Terms apply • Limited time</p>
                </div>
              </div>
            </Card>

            {/* Help & Support */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-green-600" />
                  Help & Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <MessageSquare className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">Live Chat</div>
                      <div className="text-sm text-gray-500">Get instant help</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Phone className="h-5 w-5 mr-3 text-green-600" />
                    <div>
                      <div className="font-medium">Call Support</div>
                      <div className="text-sm text-gray-500">24/7 phone support</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <FileText className="h-5 w-5 mr-3 text-purple-600" />
                    <div>
                      <div className="font-medium">Help Center</div>
                      <div className="text-sm text-gray-500">Browse FAQs</div>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
