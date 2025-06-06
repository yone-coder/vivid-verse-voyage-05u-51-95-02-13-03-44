
import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus, Send, CreditCard, Gift, Zap, MapPin, Globe, DollarSign, History, Phone, Wallet, ArrowUpDown, ChevronRight, Building, TrendingUp, BarChart3, PieChart, Calculator, Shield, Clock, Star, Award, Target, Briefcase, HeadphonesIcon, Download, Share2, Eye, Lock, Settings, HelpCircle, MessageSquare, Camera, Mic, Activity, Bot, Crown, Flame, Rocket, Diamond, CheckCircle, AlertTriangle, Info, X, ChevronDown, ChevronUp, Play, Pause, Volume2, VolumeX, Maximize2, ThumbsUp, ThumbsDown, Bookmark, Percent, Timer, Fingerprint, Wifi, Bluetooth, Battery, Signal, ScanLine, Banknote, Receipt, Palette, Megaphone, PartyPopper, Newspaper, Trophy, Medal, Handshake, Users2, UserCheck, UserPlus, Repeat, RotateCcw, Archive, Trash2, Edit3, Copy, ExternalLink, Link, Scan, Brain, Database, Server, Cloud, HardDrive, Cpu, Monitor, Keyboard, Mouse, Printer, Speaker, Radio, Tv, Tablet, Watch, Headphones, Joystick, Coffee, Plane, Car, Home, ShoppingBag, Music, BookOpen, Heart, Filter, Calendar, Map, Coins, Bitcoin, TrendingDown, RefreshCw, Sparkles, Package, ShipIcon, MailIcon, CreditCardIcon, BanknotesIcon, PhoneCallIcon, MessageSquareIcon, NavigationIcon, CompassIcon, RadarIcon, SatelliteIcon, GpsIcon, AlertCircleIcon, ShieldCheckIcon, LockIcon, KeyIcon, FingerprintIcon, EyeIcon, ScanEyeIcon, UserShieldIcon, ShieldAlertIcon, CircleDollarSignIcon, WalletIcon, CurrencyIcon, ExchangeIcon, TrendingUpIcon, ChartBarIcon, GraphIcon, AnalyticsIcon, InsightIcon, ReportIcon, DocumentIcon, PrinterIcon, DownloadIcon, ShareIcon, SaveIcon, CloudDownloadIcon, ImportIcon, ExportIcon, BackupIcon, RestoreIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function PaytmDesktopHome() {
  const navigate = useNavigate();
  const [activeBalance, setActiveBalance] = useState('12,847.50');
  const [notifications, setNotifications] = useState(8);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [voiceAssistant, setVoiceAssistant] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedWallet, setSelectedWallet] = useState('USD');
  const [trackingId, setTrackingId] = useState('');
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  // Ultra-specific Haiti transfer data
  const [transferStats, setTransferStats] = useState({
    totalSent: '125,430.00',
    monthlyVolume: '15,200.00',
    averageAmount: '350.00',
    successRate: '99.8%',
    recipients: 23,
    locations: 8
  });

  const [haitiMarketData, setHaitiMarketData] = useState({
    usdToHtg: 133.45,
    trend: '+0.75',
    volatility: 'Low',
    prediction: '↗ Favorable',
    bestRate: 134.20,
    bankRate: 132.80,
    mobileRate: 133.45,
    cashRate: 133.10
  });

  const [deliveryMethods, setDeliveryMethods] = useState([
    { id: 'mobile', name: 'Mobile Money', time: '2-5 mins', fee: '$1.99', availability: '24/7', locations: 'All Haiti', icon: Smartphone, color: 'green' },
    { id: 'cash', name: 'Cash Pickup', time: '15-30 mins', fee: '$4.99', availability: '6AM-8PM', locations: '200+ locations', icon: MapPin, color: 'blue' },
    { id: 'bank', name: 'Bank Deposit', time: '1-2 hours', fee: '$3.99', availability: 'Banking hours', locations: 'All major banks', icon: Building, color: 'purple' },
    { id: 'door', name: 'Door Delivery', time: '2-4 hours', fee: '$12.99', availability: 'Port-au-Prince only', locations: 'Metro area', icon: Truck, color: 'orange' },
    { id: 'airtime', name: 'Mobile Credit', time: 'Instant', fee: '$0.99', availability: '24/7', locations: 'All networks', icon: Phone, color: 'pink' },
    { id: 'card', name: 'Prepaid Card', time: '5-10 mins', fee: '$2.99', availability: '24/7', locations: 'ATMs nationwide', icon: CreditCard, color: 'indigo' }
  ]);

  const [recentTransfers, setRecentTransfers] = useState([
    { id: 'TX001', recipient: 'Jean Pierre', amount: '250.00', status: 'Delivered', time: '2 hours ago', location: 'Port-au-Prince', method: 'Mobile Money', tracking: 'HT-MP-001234' },
    { id: 'TX002', recipient: 'Marie Louise', amount: '180.00', status: 'In Transit', time: '1 day ago', location: 'Cap-Haïtien', method: 'Cash Pickup', tracking: 'HT-CP-005678' },
    { id: 'TX003', recipient: 'Pierre Duval', amount: '320.00', status: 'Processing', time: '2 days ago', location: 'Jacmel', method: 'Bank Deposit', tracking: 'HT-BD-009876' },
    { id: 'TX004', recipient: 'Rose Michel', amount: '150.00', status: 'Delivered', time: '3 days ago', location: 'Gonaïves', method: 'Mobile Money', tracking: 'HT-MM-112233' }
  ]);

  const [haitiLocations, setHaitiLocations] = useState([
    { name: 'Port-au-Prince', agents: 45, banks: 12, mobile: true, popular: true },
    { name: 'Cap-Haïtien', agents: 18, banks: 5, mobile: true, popular: true },
    { name: 'Jacmel', agents: 8, banks: 3, mobile: true, popular: false },
    { name: 'Gonaïves', agents: 12, banks: 4, mobile: true, popular: false },
    { name: 'Saint-Marc', agents: 6, banks: 2, mobile: true, popular: false },
    { name: 'Fort-de-France', agents: 4, banks: 1, mobile: true, popular: false },
    { name: 'Les Cayes', agents: 9, banks: 3, mobile: true, popular: false },
    { name: 'Hinche', agents: 5, banks: 2, mobile: true, popular: false }
  ]);

  const [aiInsights, setAiInsights] = useState([
    { type: 'rate', message: 'HTG rate is 2.3% higher than last week - good time to send!', priority: 'high' },
    { type: 'recipient', message: 'Jean Pierre usually receives transfers on Fridays', priority: 'medium' },
    { type: 'method', message: 'Mobile Money is 40% faster in Port-au-Prince today', priority: 'medium' },
    { type: 'saving', message: 'You could save $3.50 by using bank deposit for amounts over $300', priority: 'low' }
  ]);

  const [compliance, setCompliance] = useState({
    kycStatus: 'Verified',
    amlScore: 'Low Risk',
    sanctionsCheck: 'Clear',
    documentsValid: true,
    lastUpdate: '2024-01-15',
    nextReview: '2024-07-15'
  });

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSendClick = () => {
    navigate('/multi-step-transfer-desktop');
  };

  const handleTrackTransfer = () => {
    if (trackingId) {
      setIsTrackingOpen(true);
    }
  };

  const ultraFinancialServices = [
    { icon: Send, label: 'Quick Send', color: 'red', desc: 'Send in seconds', isNew: false },
    { icon: History, label: 'Transfer History', color: 'blue', desc: 'All transactions', isNew: false },
    { icon: MapPin, label: 'Track Transfer', color: 'green', desc: 'Real-time tracking', isNew: false },
    { icon: Calculator, label: 'Rate Calculator', color: 'purple', desc: 'Best rates finder', isNew: false },
    { icon: Users, label: 'Recipients', color: 'pink', desc: 'Manage contacts', isNew: false },
    { icon: Bell, label: 'Rate Alerts', color: 'orange', desc: 'Get notified', isNew: true },
    { icon: Bot, label: 'AI Assistant', color: 'indigo', desc: 'Smart help', isNew: true },
    { icon: Shield, label: 'Transfer Insurance', color: 'teal', desc: 'Protect transfers', isNew: true },
    { icon: Smartphone, label: 'Mobile Top-up', color: 'cyan', desc: 'Digicel, Natcom', isNew: false },
    { icon: Receipt, label: 'Bill Pay Haiti', color: 'yellow', desc: 'EDH, utilities', isNew: false },
    { icon: Gift, label: 'Gift Cards', color: 'rose', desc: 'Send gift cards', isNew: true },
    { icon: CreditCard, label: 'Prepaid Cards', color: 'violet', desc: 'Visa prepaid', isNew: true },
    { icon: Building, label: 'Business Transfers', color: 'slate', desc: 'Bulk payments', isNew: true },
    { icon: Coins, label: 'Micro Loans', color: 'amber', desc: 'Quick credit', isNew: true },
    { icon: TrendingUp, label: 'Investment Hub', color: 'emerald', desc: 'Grow money', isNew: true },
    { icon: Globe, label: 'Multi-Country', color: 'sky', desc: 'DR, Jamaica', isNew: true },
    { icon: Zap, label: 'Express Send', color: 'red', desc: 'Under 1 minute', isNew: true },
    { icon: Eye, label: 'Live Tracking', color: 'blue', desc: 'GPS tracking', isNew: true },
    { icon: Award, label: 'Loyalty Program', color: 'gold', desc: 'Earn rewards', isNew: false },
    { icon: Settings, label: 'Auto-Send', color: 'gray', desc: 'Scheduled transfers', isNew: true },
    { icon: Lock, label: 'Secure Vault', color: 'red', desc: 'Store money', isNew: true },
    { icon: Fingerprint, label: 'Biometric Auth', color: 'green', desc: 'Face/finger', isNew: true },
    { icon: Brain, label: 'Smart Budgeting', color: 'purple', desc: 'AI insights', isNew: true },
    { icon: Rocket, label: 'Priority Service', color: 'orange', desc: 'VIP treatment', isNew: true }
  ];

  const quickActions = [
    { icon: Send, label: 'Send to Haiti', color: 'red', amount: null },
    { icon: Zap, label: 'Express Send', color: 'orange', amount: null },
    { icon: ArrowUpDown, label: 'Repeat Last', color: 'green', amount: '$250' },
    { icon: Phone, label: 'Mobile Top-up', color: 'blue', amount: null },
    { icon: MapPin, label: 'Track Transfer', color: 'purple', amount: null },
    { icon: Calculator, label: 'Rate Check', color: 'teal', amount: null }
  ];

  const multiWalletBalances = [
    { currency: 'USD', balance: '12,847.50', symbol: '$', flag: '🇺🇸', change: '+2.3%' },
    { currency: 'HTG', balance: '1,705,234.75', symbol: 'G', flag: '🇭🇹', change: '+0.8%' },
    { currency: 'EUR', balance: '8,420.30', symbol: '€', flag: '🇪🇺', change: '-1.2%' },
    { currency: 'CAD', balance: '15,630.80', symbol: 'C$', flag: '🇨🇦', change: '+1.5%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Ultra Enhanced Header for Haiti Transfers */}
      <header className="bg-white shadow-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="bg-gradient-to-r from-red-600 via-blue-600 to-red-600 text-white py-3">
          <div className="container mx-auto px-6 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-8">
              <span className="font-bold flex items-center">
                🇭🇹 <PartyPopper className="h-4 w-4 mx-2" />
                Haiti Transfer Ultra - Send Money Home with Zero Fees This Month!
              </span>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                <span>24/7 Service • All Haiti Locations</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Port-au-Prince: {currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-green-300" />
                <span>Best Rate: 1 USD = {haitiMarketData.bestRate} HTG</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1 text-blue-300" />
                <span>100% Secure • Licensed MSB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 via-blue-600 to-red-600 rounded-full flex items-center justify-center shadow-xl relative">
                <span className="text-white font-bold text-2xl">HT</span>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-red-600 via-blue-600 to-red-600 bg-clip-text text-transparent">
                  Haiti Transfer Ultra
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-600 flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    Licensed • Regulated • AI-Powered
                  </span>
                  <Badge className="bg-red-500 text-white">🇭🇹 Haiti Specialist</Badge>
                  <Badge className="bg-blue-500 text-white">Ultra Fast</Badge>
                  <Badge className="bg-green-500 text-white">24/7 Service</Badge>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-3xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Send money to Haiti, track transfers, check rates, find locations..."
                  className="w-full px-6 py-4 pl-16 pr-32 border-2 border-red-200 rounded-full focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-200 shadow-lg text-lg"
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center">
                  <span className="text-2xl mr-2">🇭🇹</span>
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Mic className="h-5 w-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Camera className="h-5 w-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <QrCode className="h-5 w-5 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setVoiceAssistant(!voiceAssistant)}
                    className={`p-2 rounded-full ${voiceAssistant ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-400'}`}
                  >
                    <Bot className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button 
                className="flex items-center text-gray-700 hover:text-red-600 transition-colors relative group"
                onClick={() => setNotifications(0)}
              >
                <Bell className="h-6 w-6 mr-2" />
                <span>Alerts</span>
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
                    {notifications}
                  </span>
                )}
              </button>
              <button 
                className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsLiveChatOpen(!isLiveChatOpen)}
              >
                <MessageSquare className="h-6 w-6 mr-2" />
                <span>Support</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Haiti Exchange Rate Dashboard */}
        <div className="container mx-auto px-6 pb-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-lg">
            <div className="grid grid-cols-5 gap-6">
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-700">Live USD → HTG Rate</p>
                <p className="text-4xl font-bold text-gray-900 flex items-center mb-2">
                  1 USD = {haitiMarketData.usdToHtg} HTG
                  <TrendingUp className="h-6 w-6 text-green-500 ml-3" />
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-green-600 font-medium">↗ {haitiMarketData.trend} HTG</span>
                  <span className="text-gray-500">vs yesterday</span>
                  <Badge className="bg-green-100 text-green-700">{haitiMarketData.volatility} Volatility</Badge>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Best Rate Today</p>
                <p className="text-2xl font-bold text-blue-600">{haitiMarketData.bestRate} HTG</p>
                <p className="text-xs text-blue-500">Mobile Money</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Rate Prediction</p>
                <p className="text-xl font-bold text-purple-600">{haitiMarketData.prediction}</p>
                <p className="text-xs text-purple-500">Next 24 hours</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm flex items-center animate-pulse">
                  <Activity className="w-3 h-3 mr-2" />
                  Live Data
                </div>
                <button className="text-red-600 hover:text-red-700 font-medium text-sm bg-white px-4 py-2 rounded-full border border-red-200">
                  Set Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Ultra Enhanced User Profile */}
            <Card className="shadow-xl overflow-hidden border-2 border-red-100">
              <div className="bg-gradient-to-r from-red-600 via-blue-600 to-red-600 text-white p-8 relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl relative">
                        <span className="text-red-600 font-bold text-3xl">MJ</span>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-2xl mb-1">Marie Joseph</p>
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge className="bg-yellow-500">🇭🇹 Haiti Expert</Badge>
                          <Badge className="bg-green-500">Verified Sender</Badge>
                        </div>
                        <div className="text-sm opacity-90">
                          <p>Member since 2023 • {transferStats.recipients} recipients in Haiti</p>
                          <p>Total sent: ${transferStats.totalSent} • Success rate: {transferStats.successRate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm mb-2">Compliance Status</p>
                      <div className="flex flex-col space-y-1">
                        <Badge className="bg-green-500">KYC Verified</Badge>
                        <Badge className="bg-blue-500">AML Clear</Badge>
                        <Badge className="bg-purple-500">Sanctions Clear</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <Send className="h-6 w-6 mx-auto mb-1" />
                      <p className="text-sm font-bold">${transferStats.monthlyVolume}</p>
                      <p className="text-xs opacity-80">This Month</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <Users className="h-6 w-6 mx-auto mb-1" />
                      <p className="text-sm font-bold">{transferStats.recipients}</p>
                      <p className="text-xs opacity-80">Recipients</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <MapPin className="h-6 w-6 mx-auto mb-1" />
                      <p className="text-sm font-bold">{transferStats.locations}</p>
                      <p className="text-xs opacity-80">Haiti Cities</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <Shield className="h-6 w-6 mx-auto mb-1" />
                      <p className="text-sm font-bold">{transferStats.successRate}</p>
                      <p className="text-xs opacity-80">Success Rate</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleSendClick}
                      className="bg-white text-red-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex-1 flex items-center justify-center shadow-lg"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Send to Haiti
                    </button>
                    <button className="border border-white/50 text-white px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors flex-1">
                      <MapPin className="h-5 w-5 mr-2 inline" />
                      Track Transfer
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Multi-Wallet System */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Wallet className="h-6 w-6 mr-2 text-blue-600" />
                  Multi-Currency Wallets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {multiWalletBalances.map((wallet, index) => (
                    <div 
                      key={wallet.currency}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedWallet === wallet.currency 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedWallet(wallet.currency)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{wallet.flag}</span>
                          <span className="font-bold text-gray-800">{wallet.currency}</span>
                        </div>
                        <span className={`text-sm font-medium ${
                          wallet.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {wallet.change}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {wallet.symbol}{wallet.balance}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Available Balance</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-red-600" />
                  Quick Actions for Haiti
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <button 
                      key={index}
                      onClick={action.label === 'Send to Haiti' || action.label === 'Express Send' || action.label === 'Repeat Last' ? handleSendClick : undefined}
                      className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 group min-h-[120px] relative"
                    >
                      <div className={`bg-${action.color}-600 p-3 rounded-lg mb-3 group-hover:scale-110 transition-transform`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="font-medium text-gray-700 text-sm text-center leading-tight">{action.label}</span>
                      {action.amount && (
                        <span className="text-xs text-gray-500 mt-1">{action.amount}</span>
                      )}
                      {action.label === 'Express Send' && (
                        <Badge className="absolute top-2 right-2 bg-orange-500 text-white text-xs">Fast</Badge>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transfer Tracking */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                  Live Transfer Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter tracking ID (e.g., HT-MP-001234)"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Button 
                      onClick={handleTrackTransfer}
                      disabled={!trackingId}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Track
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800">Recent Transfers</h4>
                    {recentTransfers.slice(0, 3).map((transfer) => (
                      <div key={transfer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            transfer.status === 'Delivered' ? 'bg-green-500' : 
                            transfer.status === 'In Transit' ? 'bg-yellow-500 animate-pulse' : 
                            'bg-blue-500'
                          }`}></div>
                          <div>
                            <p className="font-medium text-gray-800">{transfer.recipient}</p>
                            <p className="text-sm text-gray-500">${transfer.amount} • {transfer.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${
                            transfer.status === 'Delivered' ? 'text-green-600' : 
                            transfer.status === 'In Transit' ? 'text-yellow-600' : 
                            'text-blue-600'
                          }`}>
                            {transfer.status}
                          </p>
                          <p className="text-xs text-gray-500">{transfer.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Haiti Delivery Methods */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Truck className="h-6 w-6 mr-2 text-orange-600" />
                  Haiti Delivery Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {deliveryMethods.map((method, index) => (
                    <div key={method.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex items-center mb-3">
                        <div className={`w-12 h-12 bg-${method.color}-100 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
                          <method.icon className={`w-6 h-6 text-${method.color}-600`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm">{method.name}</h4>
                          <p className="text-xs text-gray-500">{method.time}</p>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fee:</span>
                          <span className="font-medium">{method.fee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hours:</span>
                          <span className="font-medium">{method.availability}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Coverage:</span>
                          <span className="font-medium text-right">{method.locations}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ultra Financial Services */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Briefcase className="h-6 w-6 mr-2 text-purple-600" />
                  Haiti Transfer Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                  {ultraFinancialServices.map((service, index) => (
                    <div key={index} className="text-center group cursor-pointer">
                      <div className={`w-12 h-12 bg-${service.color}-100 rounded-xl flex items-center justify-center mb-2 mx-auto group-hover:bg-${service.color}-200 transition-colors group-hover:scale-110 transform duration-200 relative`}>
                        <service.icon className={`w-5 h-5 text-${service.color}-600`} />
                        {service.isNew && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-700 font-medium block text-xs leading-tight">{service.label}</span>
                      <span className="text-xs text-gray-500 mt-1 block">{service.desc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Haiti Locations Coverage */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-green-600" />
                  Haiti Coverage Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {haitiLocations.map((location, index) => (
                    <div key={index} className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      location.popular ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-800 text-sm">{location.name}</h4>
                        {location.popular && <Badge className="bg-green-500 text-white text-xs">Popular</Badge>}
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Agents:</span>
                          <span className="font-medium">{location.agents}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Banks:</span>
                          <span className="font-medium">{location.banks}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Mobile:</span>
                          <span className={`text-xs ${location.mobile ? 'text-green-600' : 'text-red-600'}`}>
                            {location.mobile ? '✓ Available' : '✗ Not Available'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights for Haiti Transfers */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-indigo-600" />
                  AI Transfer Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className={`p-3 rounded-lg border-l-4 ${
                      insight.priority === 'high' ? 'border-red-500 bg-red-50' :
                      insight.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-blue-500 bg-blue-50'
                    }`}>
                      <div className="flex items-start">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          insight.priority === 'high' ? 'bg-red-500' :
                          insight.priority === 'medium' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}>
                          {insight.type === 'rate' ? <TrendingUp className="h-3 w-3 text-white" /> :
                           insight.type === 'recipient' ? <Users className="h-3 w-3 text-white" /> :
                           insight.type === 'method' ? <Zap className="h-3 w-3 text-white" /> :
                           <DollarSign className="h-3 w-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{insight.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Special Offers for Haiti */}
            <Card className="shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-400 via-blue-500 to-red-400 p-6 text-white">
                <div className="text-center">
                  <Gift className="h-8 w-8 mx-auto mb-3" />
                  <p className="font-bold text-xl mb-2">🇭🇹 Haiti Special - Zero Fees!</p>
                  <p className="text-sm mb-4 opacity-90">Send up to $500 to Haiti with no transfer fees this month</p>
                  <p className="text-sm mb-4 opacity-90">Perfect for family support, emergencies, or business payments</p>
                  <button 
                    onClick={handleSendClick}
                    className="w-full bg-white text-red-500 py-3 px-4 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors mb-3 flex items-center justify-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send to Haiti Now
                  </button>
                  <p className="text-xs opacity-80">Valid until June 30, 2025 • T&C apply • All Haiti locations</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Chat Assistant Overlay */}
      {isLiveChatOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
          <div className="bg-gradient-to-r from-red-600 to-blue-600 text-white p-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <span className="font-medium">Haiti Transfer AI</span>
              </div>
              <button onClick={() => setIsLiveChatOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-4 flex-1">
            <div className="space-y-3">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm">👋 Hi! I'm your Haiti transfer assistant. I can help you with:</p>
                <ul className="text-xs mt-2 space-y-1">
                  <li>• Best rates to Haiti</li>
                  <li>• Transfer tracking</li>
                  <li>• Delivery methods</li>
                  <li>• Recipient locations</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask about Haiti transfers..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
