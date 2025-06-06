import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus, Send, CreditCard, Gift, Zap, MapPin, Globe, DollarSign, History, Phone, Wallet, ArrowUpDown, ChevronRight, Building, TrendingUp, BarChart3, PieChart, Calculator, Shield, Clock, Star, Award, Target, Briefcase, HeadphonesIcon, Download, Share2, Eye, Lock, Settings, HelpCircle, MessageSquare, Camera, Mic, Gamepad2, Coffee, Plane, Car, Home, ShoppingBag, Tv, Music, BookOpen, Heart, Filter, Calendar, Map, Coins, Bitcoin, TrendingDown, RefreshCw, Sparkles, Bot, Crown, Flame, Rocket, Diamond, CheckCircle, AlertTriangle, Info, X, ChevronDown, ChevronUp, Play, Pause, Volume2, VolumeX, Maximize2, ThumbsUp, ThumbsDown, MessageCircle, Bookmark, ShoppingCart, Percent, Timer, Fingerprint, FaceIcon as Face, Wifi, Bluetooth, Battery, Signal, ScanLine, Banknote, Receipt, Palette, Megaphone, PartyPopper, Newspaper, Trophy, Medal, Handshake, Users2, UserCheck, UserPlus, Repeat, RotateCcw, Upload as UploadIcon, Download as DownloadIcon, Archive, Trash2, Edit3, Copy, ExternalLink, Link, QrCodeIcon, Scan, CameraIcon, MicIcon, Activity, Pulse, Brain, Zap as ZapIcon, Database, Server, Cloud, HardDrive, Cpu, Monitor, Keyboard, Mouse, Printer, Speaker, Radio, Tv2, Smartphone as SmartphoneIcon, Tablet, Watch, Headphones as HeadphonesIcon2, Joystick, GamepadIcon, GiftIcon, PartyPopper as PartyPopperIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

export default function PaytmDesktopHome() {
  const navigate = useNavigate();
  const [activeBalance, setActiveBalance] = useState('2,547.00');
  const [cryptoBalance, setCryptoBalance] = useState('0.0234');
  const [investmentBalance, setInvestmentBalance] = useState('12,450.00');
  const [todayStats, setTodayStats] = useState({
    sent: '450.00',
    received: '750.00',
    transactions: 12
  });
  const [liveRates, setLiveRates] = useState({
    usd_htg: 133.45,
    btc_usd: 43250.00,
    eth_usd: 2580.00
  });
  const [notifications, setNotifications] = useState(25);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [aiChatMessages, setAiChatMessages] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(15678);
  const [membershipTier, setMembershipTier] = useState('Platinum');
  const [dailyStreak, setDailyStreak] = useState(47);
  const [weatherInfo, setWeatherInfo] = useState({ temp: '28°C', condition: 'Sunny' });
  const [newsUpdates, setNewsUpdates] = useState(3);
  const [activePromos, setActivePromos] = useState(8);
  const [gamificationLevel, setGamificationLevel] = useState(23);
  const [smartInsights, setSmartInsights] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [voiceAssistant, setVoiceAssistant] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setLiveRates(prev => ({
        ...prev,
        usd_htg: prev.usd_htg + (Math.random() - 0.5) * 0.5,
        btc_usd: prev.btc_usd + (Math.random() - 0.5) * 100,
        eth_usd: prev.eth_usd + (Math.random() - 0.5) * 20
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSendClick = () => {
    navigate('/multi-step-transfer-desktop');
  };

  const advancedFinancialServices = [
    { icon: History, label: 'Transfer History', color: 'red', desc: 'View all transfers', isNew: false },
    { icon: Users, label: 'Recipients', color: 'pink', desc: 'Manage contacts', isNew: false },
    { icon: FileText, label: 'Track Money', color: 'indigo', desc: 'Real-time tracking', isNew: false },
    { icon: Phone, label: 'Mobile Top-Up', color: 'teal', desc: 'Recharge phones', isNew: false },
    { icon: Plus, label: 'Add Funds', color: 'yellow', desc: 'Deposit money', isNew: false },
    { icon: Wallet, label: 'Bill Payment', color: 'cyan', desc: 'Pay utilities', isNew: false },
    { icon: Globe, label: 'Agent Locator', color: 'gray', desc: 'Find locations', isNew: false },
    { icon: Calculator, label: 'Rate Calculator', color: 'emerald', desc: 'Exchange rates', isNew: false },
    { icon: Shield, label: 'Insurance', color: 'blue', desc: 'Protect transfers', isNew: false },
    { icon: BarChart3, label: 'Analytics', color: 'purple', desc: 'Spending insights', isNew: false },
    { icon: Award, label: 'Rewards', color: 'orange', desc: 'Earn points', isNew: false },
    { icon: Target, label: 'Goals', color: 'green', desc: 'Save for goals', isNew: false },
    { icon: Bitcoin, label: 'Crypto Wallet', color: 'orange', desc: 'Buy/Sell crypto', isNew: true },
    { icon: TrendingUp, label: 'Investments', color: 'green', desc: 'Stock trading', isNew: true },
    { icon: Bot, label: 'AI Assistant', color: 'blue', desc: 'Smart help', isNew: true },
    { icon: Crown, label: 'VIP Services', color: 'yellow', desc: 'Premium support', isNew: true },
    { icon: Gamepad2, label: 'GameFi Hub', color: 'purple', desc: 'Play & earn', isNew: true },
    { icon: Rocket, label: 'Quick Loans', color: 'red', desc: 'Instant credit', isNew: true },
    { icon: Diamond, label: 'NFT Marketplace', color: 'pink', desc: 'Digital assets', isNew: true },
    { icon: Sparkles, label: 'AI Budgeting', color: 'cyan', desc: 'Smart planning', isNew: true },
    { icon: Coffee, label: 'Lifestyle', color: 'brown', desc: 'Food & dining', isNew: false },
    { icon: Plane, label: 'Travel Booking', color: 'sky', desc: 'Flights & hotels', isNew: false },
    { icon: Car, label: 'Auto Services', color: 'slate', desc: 'Car payments', isNew: false },
    { icon: Home, label: 'Real Estate', color: 'stone', desc: 'Property deals', isNew: false },
    { icon: ShoppingBag, label: 'E-commerce', color: 'violet', desc: 'Online shopping', isNew: false },
    { icon: Tv, label: 'Entertainment', color: 'rose', desc: 'Streaming & media', isNew: false },
    { icon: Music, label: 'Music & Audio', color: 'fuchsia', desc: 'Subscriptions', isNew: false },
    { icon: BookOpen, label: 'Education', color: 'amber', desc: 'Course payments', isNew: false },
    { icon: Heart, label: 'Healthcare', color: 'red', desc: 'Medical bills', isNew: false },
    { icon: Trophy, label: 'Competitions', color: 'gold', desc: 'Tournaments', isNew: true }
  ];

  const quickActions = [
    { icon: Send, label: 'Send to Haiti', color: 'red', isPopular: true },
    { icon: ArrowUpDown, label: 'Local Transfer', color: 'green', isPopular: true },
    { icon: Zap, label: 'Express Send', color: 'purple', isPopular: true },
    { icon: CreditCard, label: 'Bill Payment', color: 'orange', isPopular: false },
    { icon: QrCode, label: 'QR Payment', color: 'blue', isPopular: false },
    { icon: Smartphone, label: 'Mobile Money', color: 'pink', isPopular: false },
    { icon: Bitcoin, label: 'Buy Crypto', color: 'orange', isPopular: true },
    { icon: TrendingUp, label: 'Invest Now', color: 'green', isPopular: true },
    { icon: Gift, label: 'Gift Cards', color: 'red', isPopular: false },
    { icon: Percent, label: 'Discounts', color: 'blue', isPopular: true },
    { icon: Timer, label: 'Schedule', color: 'purple', isPopular: false },
    { icon: Scan, label: 'Scan & Pay', color: 'cyan', isPopular: true }
  ];

  const premiumFeatures = [
    { icon: Crown, label: 'VIP Status', desc: 'Premium member benefits', tier: 'Platinum', isActive: true },
    { icon: Flame, label: 'Hot Deals', desc: 'Exclusive offers for you', count: 12, isActive: true },
    { icon: Diamond, label: 'Cashback Plus', desc: '5% on all transactions', rate: '5%', isActive: true },
    { icon: Rocket, label: 'Priority Support', desc: '24/7 dedicated helpline', isActive: true },
    { icon: Shield, label: 'Advanced Security', desc: 'Multi-layer protection', isActive: biometricEnabled },
    { icon: Brain, label: 'AI Predictions', desc: 'Smart financial insights', isActive: smartInsights }
  ];

  const liveActivityFeed = [
    { type: 'transfer', amount: '$125', country: 'Haiti', time: '2 mins ago', status: 'completed' },
    { type: 'crypto', coin: 'BTC', change: '+2.4%', time: '5 mins ago', status: 'up' },
    { type: 'reward', points: '+50', action: 'Daily login', time: '1 hour ago', status: 'earned' },
    { type: 'investment', stock: 'AAPL', change: '+1.2%', time: '2 hours ago', status: 'up' },
    { type: 'bill', service: 'Netflix', amount: '$15.99', time: '3 hours ago', status: 'paid' }
  ];

  const smartNotifications = [
    { type: 'alert', title: 'Rate Alert', message: 'USD/HTG reached your target rate!', time: '5m', priority: 'high' },
    { type: 'promo', title: 'Flash Sale', message: '50% off international transfers', time: '15m', priority: 'medium' },
    { type: 'security', title: 'Login Detected', message: 'New device login from Miami', time: '1h', priority: 'high' },
    { type: 'achievement', title: 'Milestone Reached', message: 'You completed 100 transfers!', time: '2h', priority: 'low' },
    { type: 'system', title: 'System Update', message: 'New features available', time: '1d', priority: 'low' }
  ];

  const gamificationElements = [
    { achievement: 'Transfer Master', progress: 85, maxProgress: 100, reward: '500 points' },
    { achievement: 'Crypto Explorer', progress: 45, maxProgress: 50, reward: 'Free trading' },
    { achievement: 'Bill Payer Pro', progress: 23, maxProgress: 30, reward: 'Cashback boost' },
    { achievement: 'Referral Champion', progress: 12, maxProgress: 25, reward: '$50 bonus' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Ultra Enhanced Header */}
      <header className="bg-white shadow-xl border-b border-gray-200 sticky top-0 z-50">
        {/* Top Banner with Live Info */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-2">
          <div className="container mx-auto px-6 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-8">
              <span className="font-medium flex items-center">
                <PartyPopper className="h-4 w-4 mr-2" />
                🎉 Ultra Features Unlocked - {membershipTier} Member!
              </span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Haiti • {weatherInfo.temp} {weatherInfo.condition}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Crown className="h-4 w-4 mr-1 text-yellow-300" />
                <span>{loyaltyPoints.toLocaleString()} Points</span>
              </div>
              <div className="flex items-center">
                <Flame className="h-4 w-4 mr-1 text-orange-300" />
                <span>{dailyStreak} Day Streak</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                <span>EN / USD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <span className="text-white font-bold text-xl">HT</span>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Haiti Transfer Ultra
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-600 flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    Level {gamificationLevel} • AI Powered
                  </span>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    {membershipTier}
                  </Badge>
                  <div className="flex items-center text-green-600">
                    <Activity className="h-4 w-4 mr-1" />
                    <span>Live</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-3xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask AI, search rates, find locations, or get help with anything..."
                  className="w-full px-6 py-4 pl-16 pr-32 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-lg text-lg"
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center">
                  <Bot className="h-6 w-6 text-purple-500 mr-2" />
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
                    className={`p-2 rounded-full ${voiceAssistant ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100 text-gray-400'}`}
                  >
                    {voiceAssistant ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button 
                className="flex items-center text-gray-700 hover:text-purple-600 transition-colors relative group"
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
                className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
                onClick={() => setIsLiveChatOpen(!isLiveChatOpen)}
              >
                <Bot className="h-6 w-6 mr-2" />
                <span>AI Chat</span>
              </button>
              <Switch 
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Live Exchange Rate Ticker */}
        <div className="container mx-auto px-6 pb-4">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-green-200 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div>
                  <p className="text-sm font-medium text-gray-700">Live Rate USD → HTG</p>
                  <p className="text-3xl font-bold text-gray-800 flex items-center">
                    1 USD = {liveRates.usd_htg.toFixed(2)} HTG
                    <TrendingUp className="h-5 w-5 text-green-500 ml-2" />
                  </p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-green-600">↗ +0.75 HTG</p>
                  <p className="text-gray-500">vs yesterday</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">BTC/USD</p>
                  <p className="text-xl font-bold text-orange-600">${liveRates.btc_usd.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">ETH/USD</p>
                  <p className="text-xl font-bold text-blue-600">${liveRates.eth_usd.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm flex items-center animate-pulse">
                  <Activity className="w-3 h-3 mr-2" />
                  Live Data
                </div>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                  Rate Alerts
                </button>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                  History
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Ultra Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Ultra Enhanced User Profile */}
            <Card className="shadow-xl overflow-hidden border-2 border-purple-100">
              <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl relative">
                        <span className="text-purple-600 font-bold text-4xl">MJ</span>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-3xl mb-1">Marie Joseph</p>
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex items-center">
                            <Crown className="h-5 w-5 mr-1 text-yellow-300" />
                            <span className="text-xl">{membershipTier} Member</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-300" />
                            <span>Level {gamificationLevel}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm opacity-90">
                          <span>Member since 2023</span>
                          <span>127 transfers</span>
                          <span>{loyaltyPoints.toLocaleString()} points</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex space-x-2 mb-3">
                        <Badge className="bg-green-500">✓ Verified</Badge>
                        <Badge className="bg-yellow-500">VIP</Badge>
                        <Badge className="bg-blue-500">AI Enabled</Badge>
                      </div>
                      <p className="text-sm opacity-80">ID • Address • Biometric</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <Flame className="h-6 w-6 mx-auto mb-1 text-orange-300" />
                      <p className="text-sm font-medium">{dailyStreak} Days</p>
                      <p className="text-xs opacity-80">Streak</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <Trophy className="h-6 w-6 mx-auto mb-1 text-yellow-300" />
                      <p className="text-sm font-medium">15</p>
                      <p className="text-xs opacity-80">Achievements</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <Users className="h-6 w-6 mx-auto mb-1 text-blue-300" />
                      <p className="text-sm font-medium">89</p>
                      <p className="text-xs opacity-80">Referrals</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <Shield className="h-6 w-6 mx-auto mb-1 text-green-300" />
                      <p className="text-sm font-medium">100%</p>
                      <p className="text-xs opacity-80">Security</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleSendClick}
                      className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex-1 flex items-center justify-center shadow-lg"
                    >
                      <Rocket className="h-5 w-5 mr-2" />
                      Ultra Send
                    </button>
                    <button className="border border-white/50 text-white px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors flex-1">
                      <Bot className="h-5 w-5 mr-2 inline" />
                      AI Assistant
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Enhanced Quick Actions */}
            <Card className="shadow-xl border-2 border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <Zap className="h-6 w-6 mr-2 text-purple-600" />
                  Quick Actions
                  <Badge className="ml-2 bg-red-500">Live</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {quickActions.map((action, index) => (
                    <button 
                      key={index}
                      onClick={action.label === 'Send to Haiti' ? handleSendClick : undefined}
                      className="flex flex-col items-center p-4 rounded-xl hover:bg-gradient-to-br from-purple-50 to-blue-50 transition-all border border-gray-100 group min-h-[120px] relative"
                    >
                      {action.isPopular && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Hot
                        </div>
                      )}
                      <div className={`bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="font-semibold text-gray-700 text-sm text-center leading-tight">{action.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Multi-Wallet Balance Display */}
            <Card className="shadow-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-3">
                    <Wallet className="h-8 w-8 mr-3" />
                    <span className="text-2xl font-bold">Multi-Wallet Dashboard</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/20 rounded-xl p-4">
                      <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-300" />
                      <p className="text-sm opacity-80">USD Wallet</p>
                      <p className="text-2xl font-bold">${activeBalance}</p>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4">
                      <Bitcoin className="h-8 w-8 mx-auto mb-2 text-orange-300" />
                      <p className="text-sm opacity-80">Crypto Wallet</p>
                      <p className="text-2xl font-bold">{cryptoBalance} BTC</p>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                      <p className="text-sm opacity-80">Investments</p>
                      <p className="text-2xl font-bold">${investmentBalance}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-6 text-sm">
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-xs opacity-80">Today Sent</p>
                      <p className="font-bold text-lg">${todayStats.sent}</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-xs opacity-80">Received</p>
                      <p className="font-bold text-lg">${todayStats.received}</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-xs opacity-80">Transactions</p>
                      <p className="font-bold text-lg">{todayStats.transactions}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-white text-purple-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                      <Plus className="h-5 w-5 inline mr-2" />
                      Add Funds
                    </button>
                    <button className="flex-1 border border-white/50 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">
                      <ArrowUpDown className="h-5 w-5 inline mr-2" />
                      Exchange
                    </button>
                    <button className="flex-1 border border-white/50 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">
                      <Download className="h-5 w-5 inline mr-2" />
                      Withdraw
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Transfer Methods */}
            <Card className="shadow-xl border-2 border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Send className="h-6 w-6 mr-2 text-purple-600" />
                  Ultra Transfer Methods
                  <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white">AI Powered</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {/* AI Instant Transfer */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200 hover:shadow-xl transition-all cursor-pointer group relative">
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-red-500">Instant</Badge>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform shadow-lg">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-blue-700">AI Instant Transfer</span>
                        <p className="text-blue-600 text-sm">Fee: $1.99 • Under 30 seconds</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">AI-optimized routing for fastest delivery</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-blue-600">
                        <Brain className="h-4 w-4 mr-1" />
                        <span>AI Enhanced</span>
                      </div>
                      <div className="text-sm text-green-600">
                        <Activity className="h-4 w-4 inline mr-1" />
                        99.9% Success Rate
                      </div>
                    </div>
                  </div>
                  
                  {/* Cash Pickup */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200 hover:shadow-xl transition-all cursor-pointer group">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform shadow-lg">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-green-700">Cash Pickup</span>
                        <p className="text-green-600 text-sm">Fee: $4.99 • Same day</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">200+ pickup locations across Haiti</p>
                    <div className="flex items-center text-sm text-green-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Find nearest location</span>
                    </div>
                  </div>
                  
                  {/* Bank Deposit */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200 hover:shadow-xl transition-all cursor-pointer group">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform shadow-lg">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-purple-700">Bank Deposit</span>
                        <p className="text-purple-600 text-sm">Fee: $3.99 • 1-2 days</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">Direct to bank account</p>
                    <div className="flex items-center text-sm text-purple-600">
                      <Building className="h-4 w-4 mr-1" />
                      <span>All major banks supported</span>
                    </div>
                  </div>
                  
                  {/* Mobile Wallet */}
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-200 hover:shadow-xl transition-all cursor-pointer group">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform shadow-lg">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-orange-700">Mobile Wallet</span>
                        <p className="text-orange-600 text-sm">Fee: $1.99 • Instant</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">Instant to Moncash & other wallets</p>
                    <div className="flex items-center text-sm text-orange-600">
                      <Smartphone className="h-4 w-4 mr-1" />
                      <span>Moncash, Natcash & more</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Ultra Financial Services Grid */}
            <Card className="shadow-xl border-2 border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Briefcase className="h-6 w-6 mr-2 text-purple-600" />
                  Ultra Financial Hub
                  <Badge className="ml-2 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    {advancedFinancialServices.filter(s => s.isNew).length} New
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-3 max-h-80 overflow-y-auto">
                  {advancedFinancialServices.map((service, index) => (
                    <div key={index} className="text-center group cursor-pointer relative">
                      {service.isNew && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full z-10">
                          New
                        </div>
                      )}
                      <div className={`w-14 h-14 bg-${service.color}-100 rounded-xl flex items-center justify-center mb-2 mx-auto group-hover:bg-${service.color}-200 transition-colors group-hover:scale-110 transform duration-200 shadow-lg`}>
                        <service.icon className={`w-6 h-6 text-${service.color}-600`} />
                      </div>
                      <span className="text-gray-700 font-medium block text-xs leading-tight">{service.label}</span>
                      <span className="text-xs text-gray-500 mt-1 block">{service.desc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Premium Features Dashboard */}
            <Card className="shadow-xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <Crown className="h-6 w-6 mr-2 text-yellow-600" />
                  Premium Features
                  <Badge className="ml-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    {membershipTier}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      feature.isActive 
                        ? 'bg-white border-yellow-200 shadow-lg' 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}>
                      <div className="flex items-center mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                          feature.isActive ? 'bg-yellow-100' : 'bg-gray-100'
                        }`}>
                          <feature.icon className={`h-5 w-5 ${
                            feature.isActive ? 'text-yellow-600' : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-sm">{feature.label}</span>
                          {feature.isActive && (
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                              <span className="text-xs text-green-600">Active</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{feature.desc}</p>
                      {feature.count && (
                        <div className="mt-2">
                          <Badge className="bg-red-500 text-xs">{feature.count} Available</Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Activity Feed */}
            <Card className="shadow-xl border-2 border-green-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-600" />
                  Live Activity Feed
                  <div className="ml-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {liveActivityFeed.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          activity.type === 'transfer' ? 'bg-blue-100' :
                          activity.type === 'crypto' ? 'bg-orange-100' :
                          activity.type === 'reward' ? 'bg-green-100' :
                          activity.type === 'investment' ? 'bg-purple-100' :
                          'bg-gray-100'
                        }`}>
                          {activity.type === 'transfer' && <Send className="h-4 w-4 text-blue-600" />}
                          {activity.type === 'crypto' && <Bitcoin className="h-4 w-4 text-orange-600" />}
                          {activity.type === 'reward' && <Gift className="h-4 w-4 text-green-600" />}
                          {activity.type === 'investment' && <TrendingUp className="h-4 w-4 text-purple-600" />}
                          {activity.type === 'bill' && <CreditCard className="h-4 w-4 text-gray-600" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {activity.type === 'transfer' && `Transfer ${activity.amount} to ${activity.country}`}
                            {activity.type === 'crypto' && `${activity.coin} ${activity.change}`}
                            {activity.type === 'reward' && `Earned ${activity.points} from ${activity.action}`}
                            {activity.type === 'investment' && `${activity.stock} ${activity.change}`}
                            {activity.type === 'bill' && `Paid ${activity.service} ${activity.amount}`}
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                      <Badge className={
                        activity.status === 'completed' || activity.status === 'paid' ? 'bg-green-500' :
                        activity.status === 'up' ? 'bg-green-500' :
                        activity.status === 'earned' ? 'bg-blue-500' :
                        'bg-gray-500'
                      }>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gamification Progress */}
            <Card className="shadow-xl border-2 border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-purple-600" />
                  Achievement Progress
                  <Badge className="ml-2 bg-purple-500">Level {gamificationLevel}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gamificationElements.map((element, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{element.achievement}</span>
                        <span className="text-xs text-gray-500">{element.progress}/{element.maxProgress}</span>
                      </div>
                      <Progress 
                        value={(element.progress / element.maxProgress) * 100} 
                        className="h-2"
                      />
                      <div className="text-xs text-purple-600 font-medium">
                        Reward: {element.reward}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Smart Notifications Center */}
            <Card className="shadow-xl border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-blue-600" />
                  Smart Notifications
                  <Badge className="ml-2 bg-red-500">{notifications}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {smartNotifications.map((notification, index) => (
                    <div key={index} className={`p-3 rounded-lg border-l-4 ${
                      notification.priority === 'high' ? 'border-red-500 bg-red-50' :
                      notification.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-blue-500 bg-blue-50'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            {notification.type === 'alert' && <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />}
                            {notification.type === 'promo' && <Percent className="h-4 w-4 text-green-500 mr-2" />}
                            {notification.type === 'security' && <Shield className="h-4 w-4 text-blue-500 mr-2" />}
                            {notification.type === 'achievement' && <Trophy className="h-4 w-4 text-yellow-500 mr-2" />}
                            {notification.type === 'system' && <Info className="h-4 w-4 text-gray-500 mr-2" />}
                            <span className="font-medium text-sm">{notification.title}</span>
                          </div>
                          <p className="text-xs text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                        <button className="ml-2 text-gray-400 hover:text-gray-600">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Special Offers */}
            <Card className="shadow-xl overflow-hidden border-2 border-red-200">
              <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 p-6 text-white relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative text-center">
                  <div className="flex items-center justify-center mb-3">
                    <PartyPopper className="h-10 w-10 mr-3" />
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <p className="font-bold text-2xl mb-2">🎉 Ultra Premium Offer!</p>
                  <p className="text-lg mb-3">Zero fees + 5% cashback on all transfers</p>
                  <div className="bg-white/20 rounded-lg p-3 mb-4">
                    <p className="text-sm">Limited Time: Next 48 hours only</p>
                    <div className="flex justify-center items-center mt-2">
                      <Timer className="h-4 w-4 mr-2" />
                      <span className="font-mono text-lg">23:45:12</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleSendClick}
                    className="w-full bg-white text-red-500 py-4 px-6 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors mb-3 flex items-center justify-center shadow-lg"
                  >
                    <Rocket className="h-5 w-5 mr-2" />
                    Claim Ultra Offer Now
                  </button>
                  <p className="text-sm opacity-90">
                    Valid for {membershipTier} members • Terms apply • AI-powered optimization
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Chat Overlay */}
      {isLiveChatOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-96 bg-white rounded-xl shadow-2xl border-2 border-purple-200 z-50">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-6 w-6 mr-2" />
                <span className="font-bold">AI Assistant</span>
                <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <button 
                onClick={() => setIsLiveChatOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <p className="text-sm">Hi Marie! I'm your AI assistant. How can I help you today?</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg ml-8">
                <p className="text-sm">Show me the best transfer rates to Haiti</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <p className="text-sm">Based on current market conditions, I recommend using our AI Instant Transfer for the best rate of 133.45 HTG per USD with minimal fees.</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
