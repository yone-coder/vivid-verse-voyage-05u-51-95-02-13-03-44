
import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus, Send, CreditCard, Gift, Zap, MapPin, Globe, DollarSign, History, Phone, Wallet, ArrowUpDown, ChevronRight, Building, TrendingUp, BarChart3, PieChart, Calculator, Shield, Clock, Star, Award, Target, Briefcase, HeadphonesIcon, Download, Share2, Eye, Lock, Settings, HelpCircle, MessageSquare, Camera, Mic, Video, Play, BookOpen, CheckCircle, Package, Truck as TruckIcon, Timer, AlertCircle, Calendar, Bookmark, Heart, UserPlus, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/context/LanguageContext';
import HeaderLanguage from '@/components/home/header/HeaderLanguage';
import Logo from '../../home/Logo';
import MobileTransferInput from '@/components/mobile/paytm/MobileTransferInput';

export default function PaytmDesktopHome() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [amount, setAmount] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
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
      title: t('transfer.howToSendMoney'),
      description: t('transfer.stepByStepGuide'),
      thumbnail: "https://picsum.photos/seed/tutorial1/300/200",
      duration: t('transfer.duration'),
      views: "12.5K",
      category: t('transfer.basics')
    },
    {
      id: 2,
      title: t('transfer.understandingRates'),
      description: t('transfer.learnRates'),
      thumbnail: "https://picsum.photos/seed/tutorial2/300/200",
      duration: "2:30",
      views: "8.2K",
      category: t('transfer.tips')
    },
    {
      id: 3,
      title: t('transfer.trackingTransfer'),
      description: t('transfer.monitorRealTime'),
      thumbnail: "https://picsum.photos/seed/tutorial3/300/200",
      duration: "1:55",
      views: "15.1K",
      category: t('header.helpSupport')
    },
    {
      id: 4,
      title: t('transfer.mobileAppFeatures'),
      description: t('transfer.getMostOut'),
      thumbnail: "https://picsum.photos/seed/tutorial4/300/200",
      duration: "4:12",
      views: "6.8K",
      category: t('transfer.mobile')
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
      estimatedTime: "2-4 " + t('transfer.hours'),
      destination: "Port-au-Prince",
      sentDate: t('transfer.today') + ", 2:30 PM",
      steps: [
        { label: t('transfer.paymentConfirmed'), completed: true, time: "2:30 PM" },
        { label: t('transfer.transferProcessing'), completed: true, time: "2:32 PM", active: true },
        { label: t('transfer.fundsAvailable'), completed: false, time: t('transfer.estimatedTime') + " 6:30 PM" },
        { label: t('transfer.pickupReady'), completed: false, time: t('transfer.estimatedTime') + " 6:45 PM" }
      ]
    },
    {
      id: "TX001235",
      recipient: "Marie Louise",
      amount: "$200.00",
      status: "available",
      progress: 100,
      estimatedTime: t('transfer.readyNow'),
      destination: "Cap-Haïtien",
      sentDate: t('transfer.yesterday') + ", 10:15 AM",
      steps: [
        { label: t('transfer.paymentConfirmed'), completed: true, time: "10:15 AM" },
        { label: t('transfer.transferProcessing'), completed: true, time: "10:17 AM" },
        { label: t('transfer.fundsAvailable'), completed: true, time: "2:45 PM" },
        { label: t('transfer.pickupReady'), completed: true, time: "2:50 PM", active: true }
      ]
    },
    {
      id: "TX001236",
      recipient: "Claude Joseph",
      amount: "$75.00",
      status: "sent",
      progress: 25,
      estimatedTime: "24-48 " + t('transfer.hours'),
      destination: "Gonaïves",
      sentDate: t('transfer.today') + ", 4:15 PM",
      steps: [
        { label: t('transfer.paymentConfirmed'), completed: true, time: "4:15 PM", active: true },
        { label: t('transfer.transferProcessing'), completed: false, time: t('transfer.estimatedTime') + " 4:20 PM" },
        { label: t('transfer.fundsAvailable'), completed: false, time: t('transfer.estimatedTime') + " " + t('transfer.yesterday') + " 2:00 PM" },
        { label: t('transfer.pickupReady'), completed: false, time: t('transfer.estimatedTime') + " " + t('transfer.yesterday') + " 2:15 PM" }
      ]
    }
  ];

  // Transfer templates data
  const transferTemplates = [
    {
      id: 1,
      name: t('transfer.monthlyFamilySupport'),
      recipient: "Jean Pierre",
      amount: "$200.00",
      frequency: t('transfer.monthly'),
      destination: "Port-au-Prince",
      isShared: true,
      lastUsed: "5 " + t('transfer.daysAgo'),
      category: t('transfer.family'),
      isFavorite: true
    },
    {
      id: 2,
      name: t('transfer.emergencyFund'),
      recipient: "Marie Louise",
      amount: "$500.00",
      frequency: t('transfer.asNeeded'),
      destination: "Cap-Haïtien",
      isShared: false,
      lastUsed: "2 " + t('transfer.weekAgo'),
      category: t('transfer.emergency'),
      isFavorite: false
    },
    {
      id: 3,
      name: t('transfer.schoolFees'),
      recipient: "Claude Joseph",
      amount: "$150.00",
      frequency: t('transfer.quarterly'),
      destination: "Gonaïves",
      isShared: true,
      lastUsed: "1 " + t('transfer.weekAgo'),
      category: t('transfer.education'),
      isFavorite: true
    }
  ];

  // Favorite recipient groups
  const recipientGroups = [
    {
      id: 1,
      name: t('transfer.immediateFamliy'),
      members: ["Jean Pierre", "Marie Louise", "Rose Joseph"],
      totalSent: "$1,200",
      lastActive: t('transfer.today')
    },
    {
      id: 2,
      name: t('transfer.extendedFamily'),
      members: ["Claude Joseph", "Anne Marie", "Paul Duval"],
      totalSent: "$850",
      lastActive: "3 " + t('transfer.daysAgo')
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
    { icon: History, label: t('transfer.transferHistory'), color: 'red', desc: t('transfer.viewAllTransfers') },
    { icon: FileText, label: t('transfer.trackMoney'), color: 'indigo', desc: t('transfer.realTimeTracking') },
    { icon: Phone, label: t('transfer.mobileTopUp'), color: 'teal', desc: t('transfer.rechargePhones') },
    { icon: Globe, label: t('transfer.agentLocator'), color: 'gray', desc: t('transfer.findLocations2') },
    { icon: Calculator, label: t('transfer.rateCalculator'), color: 'emerald', desc: t('transfer.exchangeRates') },
    { icon: BarChart3, label: t('transfer.analytics'), color: 'purple', desc: t('transfer.spendingInsights') }
  ];

  // Banking features
  const bankingFeatures = [
    { icon: Building, label: t('transfer.virtualAccount'), desc: t('transfer.getVirtualAccount'), isNew: true },
    { icon: CreditCard, label: t('transfer.debitCard'), desc: t('transfer.orderCard'), isPopular: true },
    { icon: TrendingUp, label: t('transfer.investments'), desc: t('transfer.growMoney') },
    { icon: Shield, label: t('transfer.savingsAccount'), desc: t('transfer.highYieldSavings') },
    { icon: Calculator, label: t('transfer.loans'), desc: t('transfer.quickLoans') },
    { icon: PieChart, label: t('transfer.budgetTracker'), desc: t('transfer.trackSpending') }
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent':
        return t('transfer.sent');
      case 'processing':
        return t('transfer.processing');
      case 'available':
        return t('transfer.available');
      default:
        return status;
    }
  };

  const handleTrackTransaction = () => {
    if (!trackingNumber.trim()) return;
    
    setIsSearching(true);
    
    setTimeout(() => {
      setIsSearching(false);
      console.log(`Tracking transaction: ${trackingNumber}`);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrackTransaction();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Professional Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 w-full z-50">
        <div className="w-full px-12 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo Section */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                  <img 
                    src="/lovable-uploads/45eddf56-11aa-4191-b09a-dc6ebfe3e7cc.png" 
                    alt="Global Transfer Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('transfer.globalTransfer')}</h1>
                  <p className="text-sm text-gray-600 flex items-center font-medium">
                    <Shield className="h-3 w-3 mr-1.5" />
                    {t('transfer.secureTagline')}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={handleSendClick}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm text-sm flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>{t('transfer.sendMoney')}</span>
              </button>
              
              <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-50">
                {t('transfer.trackTransfer')}
              </button>
              
              <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-50 flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{t('transfer.findLocations')}</span>
              </button>
              
              <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-50 flex items-center space-x-1">
                <HeadphonesIcon className="h-4 w-4" />
                <span>{t('transfer.support')}</span>
              </button>
            </nav>

            {/* User Actions with Language Toggle */}
            <div className="flex items-center space-x-4">
              <HeaderLanguage />
              
              <button className="relative p-3 text-gray-500 hover:text-gray-700 transition-colors hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  3
                </span>
              </button>
              
              <div className="h-8 w-px bg-gray-200"></div>
              
              <button className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <span className="font-semibold text-sm block">Marie Joseph</span>
                  <span className="text-xs text-gray-500">{t('transfer.premiumMember')}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Add top padding to account for sticky header */}
      <div className="w-full px-8 py-8 pt-32">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Priority Sections First */}
          <div className="space-y-6">
            {/* User Profile Section - TOP PRIORITY */}
            <Card className="shadow-lg">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">MJ</span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">Marie Joseph</p>
                      <p className="text-sm text-gray-600">{t('transfer.verifiedAccount')}</p>
                      <p className="text-xs text-gray-500">{t('transfer.memberSince')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs mb-1">
                      ✓ {t('transfer.verified')}
                    </div>
                    <p className="text-xs text-gray-500">{t('transfer.idConfirmed')}</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={handleSendClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex-1"
                  >
                    {t('transfer.sendMoney')}
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm flex-1">
                    {t('transfer.viewProfile')}
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Transfer Section - TOP PRIORITY */}
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <Send className="h-5 w-5 mr-2 text-purple-600" />
                  {t('transfer.quickTransferOptions')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  <button className="text-center" onClick={handleSendClick}>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Send className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">{t('transfer.sendToHaiti')}</p>
                  </button>
                  <button className="text-center" onClick={handleLocalTransferClick}>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ArrowUpDown className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">{t('transfer.localTransfer')}</p>
                  </button>
                  <button className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">{t('transfer.expressS:end')}</p>
                  </button>
                  <button className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CreditCard className="w-6 h-6 text-orange-600" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">{t('transfer.billPayment')}</p>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Transfer Amount Section - TOP PRIORITY */}
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-orange-600" />
                  {t('transfer.sendMoney')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MobileTransferInput 
                  amount={amount}
                  onAmountChange={setAmount}
                />
              </CardContent>
            </Card>

            {/* Recent Recipients Section - TOP PRIORITY */}
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-indigo-600" />
                    {t('transfer.recentRecipients')}
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
                        {t('transfer.send')}
                      </button>
                      <p className="text-xs text-gray-500">3 {t('transfer.daysAgo')}</p>
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
                        {t('transfer.send')}
                      </button>
                      <p className="text-xs text-gray-500">1 {t('transfer.weekAgo')}</p>
                    </div>
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
                    {t('transfer.transactionStatusTracker')}
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {activeTransfers.length} {t('transfer.active')}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Transaction Number Search */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                    <Search className="h-4 w-4 mr-2 text-blue-600" />
                    {t('transfer.trackTransaction')}
                  </h4>
                  <div className="flex space-x-3">
                    <Input
                      type="text"
                      placeholder={t('transfer.enterTransactionNumber')}
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <button
                      onClick={handleTrackTransaction}
                      disabled={!trackingNumber.trim() || isSearching}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isSearching ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {t('transfer.searching')}
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          {t('transfer.track')}
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {t('transfer.trackingDescription')}
                  </p>
                </div>

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
                            {getStatusText(transfer.status)}
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
                          <span className="text-sm text-gray-600">{t('transfer.progress')}</span>
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
                    {t('transfer.viewAllTransfers')}
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Transfer Templates Section */}
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                  <div className="flex items-center">
                    <Bookmark className="h-5 w-5 mr-2 text-purple-600" />
                    {t('transfer.transferTemplates')}
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <Plus className="h-4 w-4 mr-1" />
                    {t('transfer.newTemplate')}
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
                            <Badge className="text-xs bg-green-100 text-green-800">{t('transfer.shared')}</Badge>
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
                          <span className="text-xs text-gray-500">{t('transfer.used')} {template.lastUsed}</span>
                        </div>
                        <div className="flex space-x-1">
                          <button 
                            onClick={handleSendClick}
                            className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                          >
                            {t('transfer.useTemplate')}
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
                    {t('transfer.favoriteRecipientGroups')}
                  </h4>
                  {recipientGroups.map((group) => (
                    <div key={group.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800 text-sm">{group.name}</span>
                        <span className="text-xs text-gray-500">{t('transfer.activeTime')} {group.lastActive}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-600">
                          {group.members.length} {t('transfer.members')} • {t('transfer.totalSent')}: {group.totalSent}
                        </div>
                        <button 
                          onClick={handleSendClick}
                          className="bg-purple-600 text-white px-2 py-1 rounded text-xs hover:bg-purple-700"
                        >
                          {t('transfer.quickSend')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <button className="w-full bg-purple-50 text-purple-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors flex items-center justify-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    {t('transfer.shareTemplates')}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Desktop Features with Priority Sections First */}
          <div className="space-y-6">
            {/* Live Exchange Rate Section - MOVED TO TOP RIGHT */}
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                  {t('transfer.liveExchangeRate')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{t('transfer.todaysRate')}</p>
                      <p className="text-xl font-bold text-gray-800">1 USD = 133.45 HTG</p>
                    </div>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      {t('transfer.live')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Financial Services - MOVED TO TOP RIGHT */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Briefcase className="h-6 w-6 mr-2 text-purple-600" />
                  {t('transfer.financialServices')}
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

            {/* Enhanced Special Offers */}
            <Card className="shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 p-6 text-white">
                <div className="text-center">
                  <Gift className="h-8 w-8 mx-auto mb-3" />
                  <p className="font-bold text-xl mb-2">{t('transfer.zeroFeesSpecial')}</p>
                  <p className="text-sm mb-4 opacity-90">{t('transfer.zeroFeesDescription')}</p>
                  <button 
                    onClick={handleSendClick}
                    className="w-full bg-white text-red-500 py-3 px-4 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors mb-3 flex items-center justify-center"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    {t('transfer.claimOfferNow')}
                  </button>
                  <p className="text-xs opacity-80">{t('transfer.validUntil')}</p>
                </div>
              </div>
            </Card>

            {/* Haiti News & Updates Card */}
            <Card className="shadow-lg border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-blue-900 flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="h-6 w-6 mr-2" />
                    {t('transfer.haitiNewsUpdates')}
                  </div>
                  <Badge className="bg-blue-600 text-white">
                    {t('transfer.liveUpdates')}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-blue-200">
                    <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{t('transfer.economicUpdates')}</h4>
                      <p className="text-xs text-gray-600">{t('transfer.economicDescription')}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">{t('transfer.economic')}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-blue-200">
                    <Calendar className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{t('transfer.holidaySchedules')}</h4>
                      <p className="text-xs text-gray-600">{t('transfer.holidayDescription')}</p>
                      <Badge variant="secondary" className="mt-2 text-xs bg-green-100 text-green-800">{t('transfer.holidaySchedule')}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-orange-200">
                    <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{t('transfer.serviceDisruption')}</h4>
                      <p className="text-xs text-gray-600">{t('transfer.serviceDescription')}</p>
                      <Badge variant="secondary" className="mt-2 text-xs bg-orange-100 text-orange-800">{t('transfer.serviceAlert')}</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-blue-200">
                  <p className="text-xs text-blue-700 text-center">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {t('transfer.lastUpdated')}
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
                    {t('transfer.videoTutorials')}
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {t('transfer.viewAll')}
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
                        <p className="text-xs text-gray-400">{tutorial.views} {t('transfer.views')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="w-full bg-red-50 text-red-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center">
                    <Video className="h-4 w-4 mr-2" />
                    {t('transfer.watchGettingStarted')}
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Banking Features */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-green-600" />
                  {t('transfer.bankingFeatures')}
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
                          {feature.isNew && <Badge className="mb-1 text-xs bg-green-500">{t('transfer.new')}</Badge>}
                          {feature.isPopular && <Badge className="mb-1 text-xs bg-orange-500">{t('transfer.popular')}</Badge>}
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
                  {t('transfer.liveStatistics')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-600">1,234</div>
                    <div className="text-sm text-gray-600">{t('transfer.onlineUsers')}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">89</div>
                    <div className="text-sm text-gray-600">{t('transfer.activeTransfers')}</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-600">156</div>
                    <div className="text-sm text-gray-600">{t('transfer.pendingOrders')}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">$2.1M</div>
                    <div className="text-sm text-gray-600">{t('transfer.dailyVolume')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-green-600" />
                  {t('transfer.helpSupport')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <MessageSquare className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">{t('transfer.liveChat')}</div>
                      <div className="text-sm text-gray-500">{t('transfer.getInstantHelp')}</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Phone className="h-5 w-5 mr-3 text-green-600" />
                    <div>
                      <div className="font-medium">{t('transfer.callSupport')}</div>
                      <div className="text-sm text-gray-500">{t('transfer.phoneSupport')}</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <FileText className="h-5 w-5 mr-3 text-purple-600" />
                    <div>
                      <div className="font-medium">{t('transfer.helpCenter')}</div>
                      <div className="text-sm text-gray-500">{t('transfer.browseFAQs')}</div>
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
