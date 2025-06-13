
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
import PaytmBottomNav from './PaytmBottomNav';
import PaytmMobileHeader from './PaytmMobileHeader';
import PaytmHeroBanner from './PaytmHeroBanner';
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

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Use PaytmMobileHeader */}
      <PaytmMobileHeader activeTabId="quick-send" />

      {/* Hero Banner positioned directly after header + category tabs */}
      <div className="mt-[76px]">
        <PaytmHeroBanner />
      </div>

      {/* Main content - Only Send Money Section */}
      <div className="p-4 space-y-6">
        {/* Send Money Section - Made more interactive */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">{t('mobile.sendMoney')}</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">Live rates</span>
            </div>
          </div>
          
          {/* Enhanced Transfer Input with better interactivity */}
          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <MobileTransferInput 
              amount={amount}
              onAmountChange={setAmount}
            />
          </div>

          {/* Interactive Send Button */}
          <div className="mt-6">
            <button
              onClick={handleSendClick}
              disabled={!amount || parseFloat(amount) <= 0}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                amount && parseFloat(amount) > 0
                  ? 'bg-gradient-to-r from-[#ff4747] to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                {amount && parseFloat(amount) > 0 
                  ? `Send $${amount} to Haiti`
                  : 'Enter amount to send'
                }
              </div>
            </button>
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[50, 100, 200, 500].map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className="py-3 px-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#ff4747] hover:text-white hover:border-[#ff4747] transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                ${quickAmount}
              </button>
            ))}
          </div>

          {/* Interactive Info Cards */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">Secure</span>
              </div>
              <p className="text-sm text-blue-700">Bank-level security for all transfers</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-xs font-bold text-green-800 uppercase tracking-wide">Fast</span>
              </div>
              <p className="text-sm text-green-700">Money ready in minutes</p>
            </div>
          </div>

          {/* Rate Update Notification */}
          {amount && parseFloat(amount) > 0 && (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-3 animate-fade-in">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-orange-800">
                  Rate locked for 30 minutes
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <PaytmBottomNav />
    </div>
  );
}
