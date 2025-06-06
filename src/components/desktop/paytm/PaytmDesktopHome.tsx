
import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus, Send, CreditCard, Gift, Zap, MapPin, Globe, DollarSign, History, Phone, Wallet, ArrowUpDown, ChevronRight, Building, TrendingUp, BarChart3, PieChart, Calculator, Shield, Clock, Star, Award, Target, Briefcase, HeadphonesIcon, Download, Share2, Eye, Lock, Settings, HelpCircle, MessageSquare, Camera, Mic, Video, Play, BookOpen, CheckCircle, Package, Truck as TruckIcon, Timer, AlertCircle, Calendar, Bookmark, Heart, UserPlus, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
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

  // Video tutorials data
  const videoTutorials = [
    {
      id: 1,
      title: "How to Send Money to Haiti",
      description: "Step-by-step guide to sending money securely",
      thumbnail: "https://picsum.photos/seed/tutorial1/300/200",
      duration: "3:45",
      views: "12.5K",
      category: "Basics"
    },
    {
      id: 2,
      title: "Understanding Exchange Rates",
      description: "Learn how rates work and when to send",
      thumbnail: "https://picsum.photos/seed/tutorial2/300/200",
      duration: "2:30",
      views: "8.2K",
      category: "Tips"
    },
    {
      id: 3,
      title: "Tracking Your Transfer",
      description: "Monitor your transfer in real-time",
      thumbnail: "https://picsum.photos/seed/tutorial3/300/200",
      duration: "1:55",
      views: "15.1K",
      category: "Support"
    },
    {
      id: 4,
      title: "Mobile App Features",
      description: "Get the most out of our mobile app",
      thumbnail: "https://picsum.photos/seed/tutorial4/300/200",
      duration: "4:12",
      views: "6.8K",
      category: "Mobile"
    }
  ];

  // Transaction tracking data
  const activeTransfers = [
    {
      id: "TX001234",
      recipient: "Jean Pierre",
      amount: "$150.00",
      status: "processing",
      progress: 65,
      estimatedTime: "2-4 hours",
      destination: "Port-au-Prince",
      sentDate: "Today, 2:30 PM",
      steps: [
        { label: "Payment Confirmed", completed: true, time: "2:30 PM" },
        { label: "Transfer Processing", completed: true, time: "2:32 PM", active: true },
        { label: "Funds Available", completed: false, time: "Est. 6:30 PM" },
        { label: "Pickup Ready", completed: false, time: "Est. 6:45 PM" }
      ]
    },
    {
      id: "TX001235",
      recipient: "Marie Louise",
      amount: "$200.00",
      status: "available",
      progress: 100,
      estimatedTime: "Ready now",
      destination: "Cap-Haïtien",
      sentDate: "Yesterday, 10:15 AM",
      steps: [
        { label: "Payment Confirmed", completed: true, time: "10:15 AM" },
        { label: "Transfer Processing", completed: true, time: "10:17 AM" },
        { label: "Funds Available", completed: true, time: "2:45 PM" },
        { label: "Pickup Ready", completed: true, time: "2:50 PM", active: true }
      ]
    },
    {
      id: "TX001236",
      recipient: "Claude Joseph",
      amount: "$75.00",
      status: "sent",
      progress: 25,
      estimatedTime: "24-48 hours",
      destination: "Gonaïves",
      sentDate: "Today, 4:15 PM",
      steps: [
        { label: "Payment Confirmed", completed: true, time: "4:15 PM", active: true },
        { label: "Transfer Processing", completed: false, time: "Est. 4:20 PM" },
        { label: "Funds Available", completed: false, time: "Est. Tomorrow 2:00 PM" },
        { label: "Pickup Ready", completed: false, time: "Est. Tomorrow 2:15 PM" }
      ]
    }
  ];

  // Transfer templates data
  const transferTemplates = [
    {
      id: 1,
      name: "Monthly Family Support",
      recipient: "Jean Pierre",
      amount: "$200.00",
      frequency: "Monthly",
      destination: "Port-au-Prince",
      isShared: true,
      lastUsed: "5 days ago",
      category: "Family",
      isFavorite: true
    },
    {
      id: 2,
      name: "Emergency Fund",
      recipient: "Marie Louise",
      amount: "$500.00",
      frequency: "As needed",
      destination: "Cap-Haïtien",
      isShared: false,
      lastUsed: "2 weeks ago",
      category: "Emergency",
      isFavorite: false
    },
    {
      id: 3,
      name: "School Fees",
      recipient: "Claude Joseph",
      amount: "$150.00",
      frequency: "Quarterly",
      destination: "Gonaïves",
      isShared: true,
      lastUsed: "1 month ago",
      category: "Education",
      isFavorite: true
    }
  ];

  // Favorite recipient groups
  const recipientGroups = [
    {
      id: 1,
      name: "Immediate Family",
      members: ["Jean Pierre", "Marie Louise", "Rose Joseph"],
      totalSent: "$1,200",
      lastActive: "Today"
    },
    {
      id: 2,
      name: "Extended Family",
      members: ["Claude Joseph", "Anne Marie", "Paul Duval"],
      totalSent: "$850",
      lastActive: "3 days ago"
    }
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

  // Financial services
  const financialServices = [
    { icon: History, label: 'Transfer History', color: 'red', desc: 'View all transfers' },
    { icon: FileText, label: 'Track Money', color: 'indigo', desc: 'Real-time tracking' },
    { icon: Phone, label: 'Mobile Top-Up', color: 'teal', desc: 'Recharge phones' },
    { icon: Globe, label: 'Agent Locator', color: 'gray', desc: 'Find locations' },
    { icon: Calculator, label: 'Rate Calculator', color: 'emerald', desc: 'Exchange rates' },
    { icon: BarChart3, label: 'Analytics', color: 'purple', desc: 'Spending insights' }
  ];

  // Banking features
  const bankingFeatures = [
    { icon: Building, label: 'Virtual Account', desc: 'Get your virtual bank account', isNew: true },
    { icon: CreditCard, label: 'Debit Card', desc: 'Order your Haiti Transfer card', isPopular: true },
    { icon: TrendingUp, label: 'Investments', desc: 'Grow your money with investments' },
    { icon: Shield, label: 'Savings Account', desc: 'High-yield savings account' },
    { icon: Calculator, label: 'Loans', desc: 'Quick personal loans' },
    { icon: PieChart, label: 'Budget Tracker', desc: 'Track your spending habits' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Timer className="h-4 w-4 text-blue-600" />;
      case 'processing':
        return <Package className="h-4 w-4 text-orange-600" />;
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-orange-100 text-orange-800';
      case 'available':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-blue-600';
      case 'processing':
        return 'bg-orange-600';
      case 'available':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

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
            {/* Exchange Rate Section - MOVED TO TOP */}
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

            {/* Enhanced Financial Services - MOVED TO TOP */}
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

            {/* Quick Transfer Section - MOVED TO TOP */}
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

            {/* Transfer Amount Section - MOVED TO TOP */}
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

            {/* Transaction Status Tracker */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center justify-between">
                  <div className="flex items-center">
                    <TruckIcon className="h-6 w-6 mr-2 text-blue-600" />
                    Transaction Status Tracker
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {activeTransfers.length} Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeTransfers.map((transfer) => (
                    <div key={transfer.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      {/* Transfer Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(transfer.status)}
                            <span className="font-medium text-gray-900">{transfer.recipient}</span>
                          </div>
                          <Badge className={`text-xs ${getStatusColor(transfer.status)}`}>
                            {transfer.status === 'sent' ? 'Sent' : 
                             transfer.status === 'processing' ? 'Processing' : 'Available'}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-gray-900">{transfer.amount}</div>
                          <div className="text-xs text-gray-500">{transfer.id}</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-medium text-gray-900">{transfer.progress}%</span>
                        </div>
                        <Progress 
                          value={transfer.progress} 
                          className="h-2"
                          indicatorClassName={getProgressColor(transfer.status)}
                        />
                      </div>

                      {/* Status Steps */}
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {transfer.steps.map((step, index) => (
                          <div key={index} className="text-center">
                            <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center ${
                              step.completed 
                                ? 'bg-green-500 text-white' 
                                : step.active 
                                  ? 'bg-blue-500 text-white' 
                                  : 'bg-gray-200 text-gray-500'
                            }`}>
                              {step.completed ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : (
                                <span className="text-xs font-bold">{index + 1}</span>
                              )}
                            </div>
                            <div className={`text-xs ${step.active ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                              {step.label}
                            </div>
                            <div className="text-xs text-gray-400">{step.time}</div>
                          </div>
                        ))}
                      </div>

                      {/* Transfer Details */}
                      <div className="flex justify-between items-center text-sm border-t pt-3">
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600">To: {transfer.destination}</span>
                          <span className="text-gray-600">Sent: {transfer.sentDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{transfer.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <button className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center">
                    <History className="h-4 w-4 mr-2" />
                    View All Transactions
                  </button>
                </div>
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

            {/* Transfer Templates Section */}
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                  <div className="flex items-center">
                    <Bookmark className="h-5 w-5 mr-2 text-purple-600" />
                    Transfer Templates
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <Plus className="h-4 w-4 mr-1" />
                    New Template
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transferTemplates.map((template) => (
                    <div key={template.id} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900 text-sm">{template.name}</span>
                            {template.isFavorite && (
                              <Heart className="h-3 w-3 text-red-500 ml-1 fill-current" />
                            )}
                          </div>
                          {template.isShared && (
                            <Badge className="text-xs bg-green-100 text-green-800">Shared</Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-blue-600">{template.amount}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>To: {template.recipient}</span>
                        <span>{template.frequency}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                          <span className="text-xs text-gray-500">Used {template.lastUsed}</span>
                        </div>
                        <div className="flex space-x-1">
                          <button 
                            onClick={handleSendClick}
                            className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                          >
                            Use Template
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                {/* Recipient Groups */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800 text-sm flex items-center">
                    <UserPlus className="h-4 w-4 mr-2 text-indigo-600" />
                    Favorite Recipient Groups
                  </h4>
                  {recipientGroups.map((group) => (
                    <div key={group.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800 text-sm">{group.name}</span>
                        <span className="text-xs text-gray-500">Active {group.lastActive}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-600">
                          {group.members.length} members • Total sent: {group.totalSent}
                        </div>
                        <button 
                          onClick={handleSendClick}
                          className="bg-purple-600 text-white px-2 py-1 rounded text-xs hover:bg-purple-700"
                        >
                          Quick Send
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <button className="w-full bg-purple-50 text-purple-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors flex items-center justify-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Templates with Family
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Desktop Features */}
          <div className="space-y-6">
            {/* Haiti News & Updates Card */}
            <Card className="shadow-lg border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-blue-900 flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="h-6 w-6 mr-2" />
                    Haiti News & Updates
                  </div>
                  <Badge className="bg-blue-600 text-white">
                    Live Updates
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-blue-200">
                    <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">Economic updates affecting transfers</h4>
                      <p className="text-xs text-gray-600">USD/HTG exchange rate remains stable at 127.5. Transfer fees unchanged for December.</p>
                      <Badge variant="secondary" className="mt-2 text-xs">Economic</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-blue-200">
                    <Calendar className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">Holiday schedules for pickup locations</h4>
                      <p className="text-xs text-gray-600">Extended hours during New Year week. Most locations open until 8 PM Dec 28-30.</p>
                      <Badge variant="secondary" className="mt-2 text-xs bg-green-100 text-green-800">Holiday Schedule</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-orange-200">
                    <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">Service disruption notifications</h4>
                      <p className="text-xs text-gray-600">Temporary delays in Port-au-Prince area due to infrastructure maintenance. Allow extra 24-48 hours.</p>
                      <Badge variant="secondary" className="mt-2 text-xs bg-orange-100 text-orange-800">Service Alert</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-blue-200">
                  <p className="text-xs text-blue-700 text-center">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Last updated 2 hours ago
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Video Tutorials Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center justify-between">
                  <div className="flex items-center">
                    <Video className="h-6 w-6 mr-2 text-red-600" />
                    Video Tutorials
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    View All
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {videoTutorials.map((tutorial) => (
                    <div key={tutorial.id} className="group cursor-pointer">
                      <div className="relative rounded-lg overflow-hidden mb-3">
                        <img 
                          src={tutorial.thumbnail} 
                          alt={tutorial.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="h-6 w-6 text-white ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          {tutorial.duration}
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge className="text-xs bg-blue-600">{tutorial.category}</Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                          {tutorial.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-1">{tutorial.description}</p>
                        <p className="text-xs text-gray-400">{tutorial.views} views</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="w-full bg-red-50 text-red-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center">
                    <Video className="h-4 w-4 mr-2" />
                    Watch Getting Started Tutorial
                  </button>
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
