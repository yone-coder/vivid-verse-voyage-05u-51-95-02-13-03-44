
import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus, Send, CreditCard, Gift, Zap, MapPin, Globe, DollarSign, History, Phone, Wallet, ArrowUpDown, ChevronRight, Building, TrendingUp, BarChart3, PieChart, Calculator, Shield, Clock, Star, Award, Target, Briefcase, HeadphonesIcon, Download, Share2, Eye, Lock, Settings, HelpCircle, MessageSquare, Camera, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PaytmDesktopHome() {
  const navigate = useNavigate();
  const [activeBalance, setActiveBalance] = useState('2,547.00');
  const [todayStats, setTodayStats] = useState({
    sent: '450.00',
    received: '750.00',
    transactions: 12
  });

  const handleSendClick = () => {
    navigate('/multi-step-transfer-desktop');
  };

  const financialServices = [
    { icon: History, label: 'Transfer History', color: 'red', desc: 'View all transfers' },
    { icon: Users, label: 'Recipients', color: 'pink', desc: 'Manage contacts' },
    { icon: FileText, label: 'Track Money', color: 'indigo', desc: 'Real-time tracking' },
    { icon: Phone, label: 'Mobile Top-Up', color: 'teal', desc: 'Recharge phones' },
    { icon: Plus, label: 'Add Funds', color: 'yellow', desc: 'Deposit money' },
    { icon: Wallet, label: 'Bill Payment', color: 'cyan', desc: 'Pay utilities' },
    { icon: Globe, label: 'Agent Locator', color: 'gray', desc: 'Find locations' },
    { icon: Calculator, label: 'Rate Calculator', color: 'emerald', desc: 'Exchange rates' },
    { icon: Shield, label: 'Insurance', color: 'blue', desc: 'Protect transfers' },
    { icon: BarChart3, label: 'Analytics', color: 'purple', desc: 'Spending insights' },
    { icon: Award, label: 'Rewards', color: 'orange', desc: 'Earn points' },
    { icon: Target, label: 'Goals', color: 'green', desc: 'Save for goals' }
  ];

  const quickActions = [
    { icon: Send, label: 'Send to Haiti', color: 'red' },
    { icon: ArrowUpDown, label: 'Local Transfer', color: 'green' },
    { icon: Zap, label: 'Express Send', color: 'purple' },
    { icon: CreditCard, label: 'Bill Payment', color: 'orange' },
    { icon: QrCode, label: 'QR Payment', color: 'blue' },
    { icon: Smartphone, label: 'Mobile Money', color: 'pink' }
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2">
          <div className="container mx-auto px-6 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="font-medium">🎉 Welcome to Haiti Transfer - Zero Fees This Month!</span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Haiti • 24/7 Support</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                <span>EN / USD</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Live Support</span>
              </div>
            </div>
          </div>
        </div>

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

        {/* Enhanced Exchange Rate Banner */}
        <div className="container mx-auto px-6 pb-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div>
                  <p className="text-sm font-medium text-gray-700">Today's Rate</p>
                  <p className="text-2xl font-bold text-gray-800">1 USD = 133.45 HTG</p>
                </div>
                <div className="text-sm text-green-600">
                  <p className="font-medium">↗ +0.75 HTG</p>
                  <p>vs yesterday</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                  Live
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Rate History
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Enhanced Left Sidebar */}
          <div className="col-span-3">
            <div className="grid grid-cols-1 gap-6">
              {/* Quick Actions */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action, index) => (
                      <button 
                        key={index}
                        onClick={action.label === 'Send to Haiti' ? handleSendClick : undefined}
                        className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 group min-h-[100px]"
                      >
                        <div className={`bg-${action.color}-600 p-2 rounded-lg mb-2 group-hover:scale-110 transition-transform`}>
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium text-gray-700 text-sm text-center">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Account Balance */}
              <Card className="shadow-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Wallet className="h-6 w-6 mr-2" />
                      <span className="text-lg font-medium">Account Balance</span>
                    </div>
                    <div className="text-4xl font-bold mb-2">${activeBalance}</div>
                    <p className="text-blue-100 mb-4">Available Balance</p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                      <div className="bg-white/20 rounded-lg p-2">
                        <p className="text-xs text-blue-100">Today Sent</p>
                        <p className="font-bold">${todayStats.sent}</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-2">
                        <p className="text-xs text-blue-100">Received</p>
                        <p className="font-bold">${todayStats.received}</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-2">
                        <p className="text-xs text-blue-100">Transactions</p>
                        <p className="font-bold">{todayStats.transactions}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-white text-blue-600 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                        Add Funds
                      </button>
                      <button className="flex-1 border border-white/50 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">
                        Withdraw
                      </button>
                    </div>
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
                      <div key={index} className="p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group relative min-h-[120px] flex flex-col">
                        <div className="flex flex-col items-center text-center flex-1">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-blue-100 transition-colors">
                            <feature.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-center mb-1">
                              <span className="font-medium text-gray-800 text-sm">{feature.label}</span>
                            </div>
                            {feature.isNew && <Badge className="mb-2 text-xs bg-green-500">New</Badge>}
                            {feature.isPopular && <Badge className="mb-2 text-xs bg-orange-500">Popular</Badge>}
                            <p className="text-xs text-gray-500">{feature.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="col-span-6 space-y-8">
            {/* Enhanced User Profile Card Banner */}
            <Card className="shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-blue-600 font-bold text-3xl">MJ</span>
                    </div>
                    <div>
                      <p className="font-semibold text-2xl">Marie Joseph</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-1" />
                          <span className="text-lg">Verified Account</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-300" />
                          <span className="text-sm">Premium Member</span>
                        </div>
                      </div>
                      <p className="text-sm opacity-80 mt-1">Member since 2023 • 127 transfers completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      ✓ Verified
                    </div>
                    <p className="text-sm opacity-80">ID • Address • Phone</p>
                  </div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button 
                    onClick={handleSendClick}
                    className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors flex-1 flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Money
                  </button>
                  <button className="border border-white/50 text-white px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors flex-1">
                    View Profile
                  </button>
                </div>
              </div>
            </Card>

            {/* Enhanced Transfer Methods Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900 flex items-center">
                  <Send className="h-8 w-8 mr-3 text-blue-600" />
                  Transfer Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Zap className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-blue-700 text-xl">Instant Transfer</span>
                        <p className="text-blue-600 text-sm">Fee: $2.99 • Under 5 mins</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">Arrives in minutes to mobile wallets</p>
                    <div className="flex items-center text-sm text-blue-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Average: 2 minutes</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-green-700 text-xl">Cash Pickup</span>
                        <p className="text-green-600 text-sm">Fee: $4.99 • Same day</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">200+ pickup locations across Haiti</p>
                    <div className="flex items-center text-sm text-green-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Find nearest location</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Building className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-purple-700 text-xl">Bank Deposit</span>
                        <p className="text-purple-600 text-sm">Fee: $3.99 • 1-2 days</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">Direct to bank account</p>
                    <div className="flex items-center text-sm text-purple-600">
                      <Building className="h-4 w-4 mr-1" />
                      <span>All major banks supported</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Smartphone className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-orange-700 text-xl">Mobile Wallet</span>
                        <p className="text-orange-600 text-sm">Fee: $1.99 • Instant</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">Instant to Moncash & other wallets</p>
                    <div className="flex items-center text-sm text-orange-600">
                      <Smartphone className="h-4 w-4 mr-1" />
                      <span>Moncash, Natcash & more</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Financial Services */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900 flex items-center">
                  <Briefcase className="h-8 w-8 mr-3 text-purple-600" />
                  Financial Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-6">
                  {financialServices.map((service, index) => (
                    <div key={index} className="text-center group cursor-pointer">
                      <div className={`w-20 h-20 bg-${service.color}-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-${service.color}-200 transition-colors group-hover:scale-110 transform duration-200`}>
                        <service.icon className={`w-10 h-10 text-${service.color}-600`} />
                      </div>
                      <span className="text-gray-700 font-medium block">{service.label}</span>
                      <span className="text-xs text-gray-500 mt-1 block">{service.desc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Video Tutorials Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-3xl font-bold text-gray-900 flex items-center">
                    <Eye className="h-8 w-8 mr-3 text-indigo-600" />
                    Video Tutorials
                  </CardTitle>
                  <button className="text-blue-600 font-medium hover:underline flex items-center">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "How to Send Money to Haiti",
                    desc: "Complete step-by-step guide for beginners",
                    duration: "3:45",
                    views: "2.1K",
                    rating: 5,
                    bgColor: "from-blue-50 to-indigo-50",
                    borderColor: "border-blue-100",
                    playColor: "bg-blue-500"
                  },
                  {
                    title: "Cash Pickup Locations Guide",
                    desc: "Find and use pickup points effectively",
                    duration: "2:12",
                    views: "1.8K",
                    rating: 4,
                    bgColor: "from-green-50 to-emerald-50",
                    borderColor: "border-green-100",
                    playColor: "bg-green-500"
                  },
                  {
                    title: "Mobile Money & Bill Payments",
                    desc: "Pay bills and top-up phones in Haiti",
                    duration: "4:30",
                    views: "950",
                    rating: 5,
                    bgColor: "from-purple-50 to-violet-50",
                    borderColor: "border-purple-100",
                    playColor: "bg-purple-500"
                  }
                ].map((video, index) => (
                  <div key={index} className={`flex items-center p-4 bg-gradient-to-r ${video.bgColor} rounded-xl border ${video.borderColor} hover:shadow-md transition-all cursor-pointer group`}>
                    <div className={`w-28 h-20 ${video.playColor} rounded-lg flex items-center justify-center mr-4 relative group-hover:scale-105 transition-transform`}>
                      <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                      <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded">{video.duration}</div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-lg mb-1">{video.title}</p>
                      <p className="text-gray-600 mb-2">{video.desc}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex text-yellow-400 mr-3">
                            {Array.from({length: 5}, (_, i) => (
                              <span key={i}>{i < video.rating ? '★' : '☆'}</span>
                            ))}
                          </div>
                          <span className="text-gray-500 text-sm">{video.views} views</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 hover:bg-white rounded transition-colors">
                            <Share2 className="h-4 w-4 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-white rounded transition-colors">
                            <Download className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Right Sidebar */}
          <div className="col-span-3">
            <div className="grid grid-cols-1 gap-6">
              {/* Recent Recipients */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      Recent Recipients
                    </CardTitle>
                    <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { name: "Jean Pierre", location: "Port-au-Prince", amount: "$150", time: "3 days ago", initials: "JP", color: "bg-blue-100 text-blue-600" },
                      { name: "Marie Louise", location: "Cap-Haïtien", amount: "$200", time: "1 week ago", initials: "ML", color: "bg-pink-100 text-pink-600" },
                      { name: "Pierre Duval", location: "Jacmel", amount: "$75", time: "2 weeks ago", initials: "PD", color: "bg-green-100 text-green-600" }
                    ].map((recipient, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 ${recipient.color} rounded-full flex items-center justify-center mr-3`}>
                            <span className="font-semibold">{recipient.initials}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{recipient.name}</p>
                            <p className="text-sm text-gray-500">{recipient.location} • Last: {recipient.amount}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <button 
                            onClick={handleSendClick}
                            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-colors mb-1"
                          >
                            Send
                          </button>
                          <p className="text-xs text-gray-500">{recipient.time}</p>
                        </div>
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
    </div>
  );
}
