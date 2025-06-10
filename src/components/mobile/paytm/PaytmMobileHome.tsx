
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
  ChevronDown,
  Search,
  Shield,
  ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../home/Logo';
import MobileTransferInput from './MobileTransferInput';
import MobileLanguageBottomSheet from './MobileLanguageBottomSheet';
import { useLanguage } from '@/context/LanguageContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PaytmMobileHome() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t, currentLanguage, currentLocation } = useLanguage();

  const handleSendClick = () => {
    navigate('/multi-step-transfer-page');
  };

  const handleLocalTransferClick = () => {
    navigate('/local-transfer');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const videoTutorials = [
    {
      id: 1,
      title: t('mobile.howToSendMoney'),
      description: t('mobile.stepByStepGuide'),
      duration: '3:45',
      rating: '★★★★★',
      views: '2.1K',
      bgColor: 'from-blue-100 to-indigo-100',
      borderColor: 'border-blue-100',
      iconBg: 'bg-blue-500'
    },
    {
      id: 2,
      title: t('mobile.cashPickupLocations'),
      description: t('mobile.findNearestPickup'),
      duration: '2:12',
      rating: '★★★★☆',
      views: '1.8K',
      bgColor: 'from-green-100 to-emerald-100',
      borderColor: 'border-green-100',
      iconBg: 'bg-green-500'
    },
    {
      id: 3,
      title: t('mobile.mobileMoney'),
      description: t('mobile.payBillsAndTopUp'),
      duration: '4:30',
      rating: '★★★★★',
      views: '950',
      bgColor: 'from-purple-100 to-violet-100',
      borderColor: 'border-purple-100',
      iconBg: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Account Security Tips',
      description: 'Keep your transfers safe',
      duration: '2:45',
      rating: '★★★★★',
      views: '1.2K',
      bgColor: 'from-orange-100 to-red-100',
      borderColor: 'border-orange-100',
      iconBg: 'bg-orange-500'
    }
  ];

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen">
      {/* Clean Sticky Header */}
      <div className="sticky top-0 z-50 bg-gray-50 px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/lovable-uploads/45eddf56-11aa-4191-b09a-dc6ebfe3e7cc.png"
              alt="Global Transfer Logo"
              className="w-10 h-10 rounded-full object-cover shadow-sm"
            />
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('header.search')}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
          </form>
          
          {/* Language Selector */}
          <MobileLanguageBottomSheet 
            isOpen={isLanguageSheetOpen}
            onOpenChange={setIsLanguageSheetOpen}
          >
            <button className="flex items-center bg-white px-3 py-2.5 rounded-xl space-x-2 hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm">
              {currentLocation.flag ? (
                <img
                  src={`https://flagcdn.com/${currentLocation.flag.toLowerCase()}.svg`}
                  alt={currentLocation.name}
                  className="h-4 w-4 rounded-full object-cover"
                />
              ) : (
                <Globe className="h-4 w-4 text-gray-600" />
              )}
              <span className="text-gray-700 text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
              <ChevronDown className="h-3 w-3 text-gray-500" />
            </button>
          </MobileLanguageBottomSheet>
        </div>
      </div>

      {/* Exchange Rate Banner */}
      <div className="mx-4 mt-4 mb-4">
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-3 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">{t('mobile.todaysRate')}</p>
              <p className="text-lg font-bold text-gray-800">1 USD = 133.45 HTG</p>
            </div>
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
              {t('mobile.live')}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 space-y-4">
        {/* Quick Transfer Options Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-3">{t('mobile.quickTransfer')}</h3>
          <div className="grid grid-cols-4 gap-3">
            <button className="text-center" onClick={handleSendClick}>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Send className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">{t('mobile.sendToHaiti')}</p>
            </button>
            <button className="text-center" onClick={handleLocalTransferClick}>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <ArrowUpDown className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">{t('mobile.localTransfer')}</p>
            </button>
            <button className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">{t('mobile.expressSend')}</p>
            </button>
            <button className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CreditCard className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">{t('mobile.billPayment')}</p>
            </button>
          </div>
        </div>

        {/* Transfer Amount Input - No Card Wrapper */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">{t('mobile.sendMoney')}</h3>
          <MobileTransferInput 
            amount={amount}
            onAmountChange={setAmount}
          />
        </div>

        {/* Video Tutorials Carousel */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">{t('mobile.videoTutorials')}</h3>
            <span className="text-xs text-blue-600 font-medium">{t('mobile.viewAll')}</span>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {videoTutorials.map((video) => (
                <CarouselItem key={video.id} className="pl-2 md:pl-4 basis-4/5">
                  <div className={`flex items-center p-3 bg-gradient-to-r ${video.bgColor} rounded-lg border ${video.borderColor}`}>
                    <div className={`w-16 h-12 ${video.iconBg} rounded-lg flex items-center justify-center mr-3 relative flex-shrink-0`}>
                      <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                      <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded">{video.duration}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{video.title}</p>
                      <p className="text-xs text-gray-500 truncate">{video.description}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400 text-xs mr-2">{video.rating}</div>
                        <span className="text-xs text-gray-500">{video.views} {t('mobile.views')}</span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Financial Services Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-3">{t('mobile.financialServices')}</h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <History className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">{t('mobile.transferHistory')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">{t('mobile.recipients')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">{t('mobile.trackMoney')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Phone className="w-6 h-6 text-teal-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">{t('mobile.mobileTopUp')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Plus className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">{t('mobile.addFunds')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Wallet className="w-6 h-6 text-cyan-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">{t('mobile.billPayment')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Globe className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">{t('mobile.agentLocator')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">{t('mobile.rateCalculator')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Recipients */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">{t('mobile.recentRecipients')}</h3>
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
                  <p className="text-sm text-gray-500">Port-au-Prince • {t('mobile.last')}: $150</p>
                </div>
              </div>
              <div className="text-right">
                <button 
                  onClick={handleSendClick}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mb-1"
                >
                  {t('mobile.send')}
                </button>
                <p className="text-xs text-gray-500">{t('mobile.daysAgo', { days: '3' })}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-pink-600 font-semibold text-sm">ML</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Marie Louise</p>
                  <p className="text-sm text-gray-500">Cap-Haïtien • {t('mobile.last')}: $200</p>
                </div>
              </div>
              <div className="text-right">
                <button 
                  onClick={handleSendClick}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mb-1"
                >
                  {t('mobile.send')}
                </button>
                <p className="text-xs text-gray-500">{t('mobile.weekAgo')}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-semibold text-sm">PD</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Pierre Duval</p>
                  <p className="text-sm text-gray-500">Jacmel • {t('mobile.last')}: $75</p>
                </div>
              </div>
              <div className="text-right">
                <button 
                  onClick={handleSendClick}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mb-1"
                >
                  {t('mobile.send')}
                </button>
                <p className="text-xs text-gray-500">{t('mobile.weeksAgo', { weeks: '2' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotion Banner */}
      <div className="mx-4 mb-6">
        <div className="bg-gradient-to-r from-red-400 to-blue-400 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg">{t('mobile.zeroFeesOffer')}</p>
              <p className="text-sm opacity-90">{t('mobile.zeroFeesDescription')}</p>
              <p className="text-xs opacity-80 mt-1">{t('mobile.validUntil')}</p>
            </div>
            <div className="text-center">
              <button 
                onClick={handleSendClick}
                className="bg-white text-red-500 px-4 py-2 rounded-full text-sm font-medium mb-2"
              >
                {t('mobile.useOffer')}
              </button>
              <p className="text-xs opacity-80">{t('mobile.termsApply')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
