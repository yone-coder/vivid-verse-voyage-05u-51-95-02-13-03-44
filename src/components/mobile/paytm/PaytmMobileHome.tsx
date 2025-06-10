
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
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../home/Logo';
import MobileTransferInput from './MobileTransferInput';
import MobileLanguageBottomSheet from './MobileLanguageBottomSheet';
import { useLanguage } from '@/context/LanguageContext';

export default function PaytmMobileHome() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const { t, currentLanguage, currentLocation } = useLanguage();

  const handleSendClick = () => {
    navigate('/multi-step-transfer-page');
  };

  const handleLocalTransferClick = () => {
    navigate('/local-transfer');
  };

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      {/* Sticky Header with Extended Background */}
      <div className="sticky top-0 z-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white pb-8">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/lovable-uploads/45eddf56-11aa-4191-b09a-dc6ebfe3e7cc.png"
                alt="Global Transfer Logo"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-lg">Global Transfè</p>
              </div>
            </div>
            
            {/* Language Toggle */}
            <MobileLanguageBottomSheet 
              isOpen={isLanguageSheetOpen}
              onOpenChange={setIsLanguageSheetOpen}
            >
              <button className="flex items-center bg-black bg-opacity-40 px-3 py-2 rounded-full space-x-2 hover:bg-opacity-50 transition-colors">
                {currentLocation.flag ? (
                  <img
                    src={`https://flagcdn.com/${currentLocation.flag.toLowerCase()}.svg`}
                    alt={currentLocation.name}
                    className="h-4 w-4 rounded-full object-cover"
                  />
                ) : (
                  <Globe className="h-4 w-4 text-white" />
                )}
                <span className="text-white text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
                <ChevronDown className="h-4 w-4 text-white" />
              </button>
            </MobileLanguageBottomSheet>
          </div>
        </div>
      </div>

      {/* White Profile Card - Overlapping the header */}
      <div className="mx-4 -mt-10 mb-4 relative z-10">
        <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">MJ</span>
              </div>
              <div>
                <p className="font-semibold text-lg text-gray-800">Marie Joseph</p>
                <p className="text-sm text-gray-600">{t('mobile.verifiedAccount')}</p>
                <p className="text-xs text-gray-500">{t('mobile.memberSince')} 2023</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs mb-1">
                ✓ {t('mobile.verified')}
              </div>
              <p className="text-xs text-gray-500">{t('mobile.idConfirmed')}</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button 
              onClick={handleSendClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex-1"
            >
              {t('mobile.sendMoney')}
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm flex-1">
              {t('mobile.viewProfile')}
            </button>
          </div>
        </div>
      </div>

      {/* Exchange Rate Banner */}
      <div className="mx-4 mb-4">
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-3">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
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

        {/* Financial Services Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
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
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
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

      {/* Video Tutorials Section */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">{t('mobile.videoTutorials')}</h3>
            <span className="text-xs text-blue-600 font-medium">{t('mobile.viewAll')}</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div className="w-16 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3 relative">
                <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded">3:45</div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{t('mobile.howToSendMoney')}</p>
                <p className="text-xs text-gray-500">{t('mobile.stepByStepGuide')}</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400 text-xs mr-2">★★★★★</div>
                  <span className="text-xs text-gray-500">2.1K {t('mobile.views')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <div className="w-16 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3 relative">
                <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded">2:12</div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{t('mobile.cashPickupLocations')}</p>
                <p className="text-xs text-gray-500">{t('mobile.findNearestPickup')}</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400 text-xs mr-2">★★★★☆</div>
                  <span className="text-xs text-gray-500">1.8K {t('mobile.views')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-100">
              <div className="w-16 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-3 relative">
                <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded">4:30</div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{t('mobile.mobileMoney')}</p>
                <p className="text-xs text-gray-500">{t('mobile.payBillsAndTopUp')}</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400 text-xs mr-2">★★★★★</div>
                  <span className="text-xs text-gray-500">950 {t('mobile.views')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotion Banner */}
      <div className="mx-4 mb-6">
        <div className="bg-gradient-to-r from-red-400 to-blue-400 rounded-lg p-4 text-white">
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
