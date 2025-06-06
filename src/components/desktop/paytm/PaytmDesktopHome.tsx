
import React, { useState } from 'react';
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
  Zap,
  Shield,
  Clock,
  TrendingUp,
  AlertCircle,
  Star,
  MessageCircle,
  BookOpen,
  Camera,
  Heart,
  Gift,
  Settings,
  Search,
  Filter,
  Calendar,
  Target,
  Award,
  Briefcase,
  Home,
  Car,
  GraduationCap,
  ShoppingCart,
  Plane,
  Activity,
  BarChart3,
  LineChart,
  PieChart,
  Eye,
  Lock,
  UserCheck,
  Headphones,
  Mail,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Thermometer,
  Wifi,
  Signal,
  Battery,
  Volume2,
  Monitor,
  Truck,
  Package,
  MapPinned,
  Navigation,
  Compass,
  Route,
  Timer,
  Stopwatch,
  Hourglass,
  Calendar as CalendarIcon,
  Clock4,
  Sunrise,
  Sunset,
  Moon,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Umbrella,
  Wind,
  Thermometer as Temperature,
  Gauge,
  Speedometer,
  Fuel,
  Battery as BatteryIcon,
  Zap as Lightning,
  Power,
  PlugZap,
  Cpu,
  HardDrive,
  MemoryStick,
  Router,
  Server,
  Database,
  Code,
  Terminal,
  FileCode,
  Folder,
  File,
  Image,
  Video,
  Music,
  Mic,
  Camera as CameraIcon,
  Video as VideoIcon,
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Volume,
  VolumeX,
  Volume1,
  Repeat,
  Shuffle,
  Radio,
  Tv,
  Monitor as MonitorIcon,
  Laptop,
  Tablet,
  Mouse,
  Keyboard,
  Printer,
  Scanner,
  Webcam,
  Gamepad2,
  Joystick,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Spade,
  Club,
  Diamond,
  Heart as HeartIcon,
  Crown,
  Trophy,
  Medal,
  Ribbon,
  Flag,
  Bookmark,
  Tag,
  Hash,
  AtSign,
  Percent,
  Currency
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PaytmDesktopHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendClick = () => {
    navigate('/multi-step-transfer-page');
  };

  const handleLocalTransferClick = () => {
    navigate('/local-transfer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header - Simplified without exchange rate */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo and Nav */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">GT</span>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">Global Transfer</div>
                  <div className="text-xs text-gray-500">Haiti Money Transfer</div>
                </div>
              </div>
              
              <nav className="hidden lg:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Send Money</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Track Transfer</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Locations</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Help</a>
              </nav>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transfers, recipients, locations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Right: User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                English
              </Button>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <Button onClick={handleSendClick} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Send Money
              </Button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Profile Card (Expanded) */}
          <div className="col-span-5">
            <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-bold text-xl">MJ</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Marie Joseph</h2>
                      <p className="text-blue-100">Premium Member</p>
                      <div className="flex items-center mt-1">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-sm text-blue-100">Verified Account</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-500 bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
                      <span className="text-green-200 text-sm font-medium">✓ KYC Verified</span>
                    </div>
                    <p className="text-xs text-blue-200">Member since 2023</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-200 text-sm">Total Sent</span>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold">$12,450</div>
                    <div className="text-xs text-blue-200">This year</div>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-200 text-sm">Transfers</span>
                      <Send className="w-4 h-4 text-blue-300" />
                    </div>
                    <div className="text-2xl font-bold">47</div>
                    <div className="text-xs text-blue-200">Completed</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 text-sm">Transfer Limit</span>
                    <span className="text-white font-medium">$2,500/day</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="text-xs text-blue-200">$1,500 remaining today</div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    onClick={handleSendClick}
                    className="flex-1 bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send to Haiti
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Today's Exchange Rate */}
          <div className="col-span-4">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-green-800">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Today's Exchange Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-800 mb-1">133.45 HTG</div>
                  <div className="text-lg text-green-600">per 1 USD</div>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+0.25% today</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Best rate this week:</span>
                    <span className="font-medium text-green-700">133.89 HTG</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Average this month:</span>
                    <span className="font-medium text-gray-700">132.15 HTG</span>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-green-800 font-medium">Rate Alert</div>
                      <div className="text-xs text-green-600">Great time to send!</div>
                    </div>
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      Live
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleSendClick}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send at This Rate
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handleSendClick}
                    className="flex flex-col items-center p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-2">
                      <Send className="w-5 h-5 text-red-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">Send Money</span>
                  </button>
                  
                  <button 
                    onClick={handleLocalTransferClick}
                    className="flex flex-col items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <ArrowUpDown className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">Local Transfer</span>
                  </button>
                  
                  <button className="flex flex-col items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <History className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">History</span>
                  </button>
                  
                  <button className="flex flex-col items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">Recipients</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Live Transfer Tracker */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Live Transfer Tracker
                <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-800 font-medium">In Progress</span>
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-900 mb-1">3</div>
                  <div className="text-sm text-blue-700">Active transfers</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-green-800 font-medium">Delivered Today</span>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-900 mb-1">127</div>
                  <div className="text-sm text-green-700">Successful deliveries</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-yellow-800 font-medium">Avg. Time</span>
                    <Timer className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-900 mb-1">18 min</div>
                  <div className="text-sm text-yellow-700">To cash pickup</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Haiti Economic Dashboard */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                Haiti Economic Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">$2.1B</div>
                  <div className="text-sm text-gray-600">Annual Remittances</div>
                  <div className="text-xs text-green-600 mt-1">+12% YoY</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">11.2M</div>
                  <div className="text-sm text-gray-600">Population</div>
                  <div className="text-xs text-blue-600 mt-1">2024 Est.</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">2.8M</div>
                  <div className="text-sm text-gray-600">Diaspora</div>
                  <div className="text-xs text-purple-600 mt-1">Worldwide</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">32%</div>
                  <div className="text-sm text-gray-600">GDP from Remittances</div>
                  <div className="text-xs text-orange-600 mt-1">Critical support</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transfer Analytics & Insights */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="w-5 h-5 mr-2 text-indigo-600" />
                Your Transfer Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                  <div>
                    <div className="font-medium text-indigo-900">Most Frequent Recipient</div>
                    <div className="text-sm text-indigo-700">Jean Pierre - Port-au-Prince</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-indigo-900">$150</div>
                    <div className="text-xs text-indigo-600">Avg. amount</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-green-900">Peak Transfer Day</div>
                    <div className="text-sm text-green-700">Friday afternoons</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-900">3.2x</div>
                    <div className="text-xs text-green-600">Higher activity</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium text-blue-900">Preferred Pickup</div>
                    <div className="text-sm text-blue-700">CAM Transfer - Delmas</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-900">65%</div>
                    <div className="text-xs text-blue-600">Of your transfers</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-red-600" />
                Smart Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-yellow-800">Rate Alert</div>
                      <div className="text-xs text-yellow-700">HTG strengthened 2.1% this week. Good time to send larger amounts.</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-blue-800">New Location</div>
                      <div className="text-xs text-blue-700">CAM Transfer opened a new branch near Jean Pierre. Faster pickup!</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-start">
                    <Gift className="w-4 h-4 text-green-600 mt-0.5 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-green-800">Loyalty Bonus</div>
                      <div className="text-xs text-green-700">Send $200+ this month for 50% off your next transfer fee.</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Haiti Local Services */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                Haiti Local Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <button className="p-4 text-center bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium text-blue-900">Mobile Top-up</div>
                  <div className="text-xs text-blue-700">Digicel, Natcom</div>
                </button>
                <button className="p-4 text-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-medium text-purple-900">Utility Bills</div>
                  <div className="text-xs text-purple-700">EDH, DINEPA</div>
                </button>
                <button className="p-4 text-center bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-green-900">School Fees</div>
                  <div className="text-xs text-green-700">Direct payments</div>
                </button>
                <button className="p-4 text-center bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                  <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="font-medium text-red-900">Healthcare</div>
                  <div className="text-xs text-red-700">Hospital bills</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Transfer */}
        <div className="mt-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Emergency Transfer Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="font-medium text-red-900 mb-1">Express Transfer</div>
                  <div className="text-sm text-red-700 mb-2">15-minute delivery</div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                    Send Now
                  </Button>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="font-medium text-orange-900 mb-1">24/7 Support</div>
                  <div className="text-sm text-orange-700 mb-2">Emergency hotline</div>
                  <Button size="sm" variant="outline" className="border-orange-600 text-orange-600">
                    Call Now
                  </Button>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="font-medium text-yellow-900 mb-1">Disaster Relief</div>
                  <div className="text-sm text-yellow-700 mb-2">Special rates</div>
                  <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-600">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transfer Education Hub */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                Transfer Education Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-indigo-50 rounded-lg cursor-pointer hover:bg-indigo-100">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <Play className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-indigo-900">How to Send Money to Haiti</div>
                    <div className="text-sm text-indigo-700">Step-by-step video guide • 5 min</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-green-900">Pickup Locations Guide</div>
                    <div className="text-sm text-green-700">Find the nearest agent • 3 min read</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-blue-900">Security Best Practices</div>
                    <div className="text-sm text-blue-700">Protect your transfers • 4 min read</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                Haiti Community Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-600 font-bold text-sm">MJ</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-green-900">Marie Joseph</div>
                      <div className="text-xs text-green-700 mb-1">Just sent $200 to Port-au-Prince</div>
                      <div className="text-xs text-green-600">2 hours ago</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-blue-600 font-bold text-sm">PL</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-blue-900">Pierre Louis</div>
                      <div className="text-xs text-blue-700 mb-1">New CAM Transfer location in Carrefour!</div>
                      <div className="text-xs text-blue-600">4 hours ago</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-purple-600 font-bold text-sm">RC</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-purple-900">Rose Charles</div>
                      <div className="text-xs text-purple-700 mb-1">Great rates today! Perfect for school fees</div>
                      <div className="text-xs text-purple-600">6 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transfer Security Center */}
        <div className="mt-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2 text-gray-700" />
                Transfer Security Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Identity Verified</div>
                  <div className="text-xs text-green-600 mt-1">✓ Completed</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">2FA Enabled</div>
                  <div className="text-xs text-blue-600 mt-1">✓ Active</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Lock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">SSL Encrypted</div>
                  <div className="text-xs text-purple-600 mt-1">✓ Protected</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Eye className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Fraud Monitoring</div>
                  <div className="text-xs text-orange-600 mt-1">✓ 24/7 Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
