
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
  ChevronLeft,
  Play
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
  const [activeTab, setActiveTab] = useState('international');
  const [selectedLanguage, setSelectedLanguage] = useState('ht');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { t, currentLanguage, currentLocation } = useLanguage();

  const handleSendClick = () => {
    navigate('/multi-step-transfer-page');
  };

  const handleLocalTransferClick = () => {
    navigate('/local-transfer');
  };

  const handleInternationalTransfer = () => {
    navigate('/multi-step-transfer-page');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const languages = [
    { code: 'ht', name: 'Kreyòl', flag: '🇭🇹' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === selectedLanguage);
  };

  const videoTutorials = [
    {
      id: 1,
      title: t('mobile.howToSendMoney'),
      description: t('mobile.stepByStepGuide'),
      duration: '3:45',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: t('mobile.cashPickupLocations'),
      description: t('mobile.findNearestPickup'),
      duration: '2:12',
      thumbnail: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: t('mobile.mobileMoney'),
      description: t('mobile.payBillsAndTopUp'),
      duration: '4:30',
      thumbnail: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Account Security Tips',
      description: 'Keep your transfers safe',
      duration: '2:45',
      thumbnail: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'How to Track Transfers',
      description: 'Monitor your money transfers',
      duration: '3:15',
      thumbnail: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=300&h=200&fit=crop'
    },
    {
      id: 6,
      title: 'Exchange Rate Guide',
      description: 'Understanding rates',
      duration: '4:02',
      thumbnail: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen">
      {/* New Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        {/* Top Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <img
                src="/lovable-uploads/45eddf56-11aa-4191-b09a-dc6ebfe3e7cc.png"
                alt="Global Transfer Logo"
                className="w-8 h-8 rounded-full object-cover shadow-sm"
              />
              <h1 className="text-lg font-semibold text-gray-900">Global Transfè</h1>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center transition-colors"
              >
                <span className="text-sm">{getCurrentLanguage()?.flag}</span>
              </button>

              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setSelectedLanguage(language.code);
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center ${
                        selectedLanguage === language.code 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700'
                      }`}
                    >
                      <span className="mr-3">{language.flag}</span>
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <nav className="grid grid-cols-2" aria-label="Tabs">
              <button
                onClick={() => {
                  setActiveTab('international');
                  handleInternationalTransfer();
                }}
                className={`py-2 px-4 border-b-2 font-medium text-sm text-center transition-colors duration-200 ${
                  activeTab === 'international'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Transfè Entenasyonal
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('national');
                  handleLocalTransferClick();
                }}
                className={`py-2 px-4 border-b-2 font-medium text-sm text-center transition-colors duration-200 ${
                  activeTab === 'national'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Transfer Nasyonal
              </button>
            </nav>
          </div>
        </div>

        {/* Click outside to close language dropdown */}
        {showLanguageDropdown && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowLanguageDropdown(false)}
          />
        )}
      </header>

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
      </div>

      {/* YouTube-style Video Thumbnails Section - Edge to Edge */}
      <div className="mb-4">
        <div className="px-4 mb-3">
          <h3 className="font-semibold text-gray-800">{t('mobile.videoTutorials')}</h3>
        </div>
        
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 px-4 pb-2">
            {videoTutorials.map((video) => (
              <div key={video.id} className="flex-shrink-0 w-40">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  {/* Duration indicator */}
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Services Card */}
      <div className="mx-4 mb-4">
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
