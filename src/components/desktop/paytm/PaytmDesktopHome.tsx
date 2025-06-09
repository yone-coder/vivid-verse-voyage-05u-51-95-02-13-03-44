
import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import DesktopHeader from '@/components/desktop/pc/DesktopHeader';

export default function PaytmDesktopHome() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Sample banner data - now just for images
  const bannerImages = [
    "/lovable-uploads/2102d3a1-ec6e-4c76-8ee0-549c3ae3d54e.png",
    "/lovable-uploads/4dbaee7c-2ac5-4a1b-9f9b-121275273e79.png",
    "/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png"
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const handleSendClick = () => {
    // Navigate to the responsive route that handles device detection
    navigate('/multi-step-transfer-desktop');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
      {/* Desktop Header */}
      <DesktopHeader />
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl font-bold text-blue-900">{t('paytm.title')}</span>
            <span className="text-red-500 text-3xl">❤</span>
            <span className="text-4xl font-bold text-blue-600">{t('paytm.subtitle')}</span>
            <span className="text-yellow-500 text-3xl">⚡</span>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="mb-8 bg-white rounded-xl relative overflow-hidden shadow-lg">
          <div className="relative h-80">
            {bannerImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  index === activeSlide ? 'translate-x-0' : 
                  index < activeSlide ? '-translate-x-full' : 'translate-x-full'
                }`}
              >
                <img
                  src={image}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Money Transfer */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">{t('paytm.moneyTransfer')}</h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-3">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm text-gray-700 text-center">{t('paytm.scanPay')}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-3">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm text-gray-700 text-center">{t('paytm.toMobile')}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-3">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm text-gray-700 text-center">{t('paytm.toBankAccount')}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm text-gray-700 text-center">{t('paytm.toSelfAccount')}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700 text-center">{t('paytm.balanceHistory')}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <QrCode className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-sm text-gray-700 text-center">{t('paytm.receiveMoney')}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700 text-center">{t('paytm.referWin')}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-blue-600 font-bold text-2xl">⚡</span>
                </div>
                <span className="text-sm text-gray-700 text-center">{t('paytm.allUpiServices')}</span>
              </div>
            </div>
          </div>

          {/* Recharge & Bill Payments */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">{t('paytm.rechargePayments')}</h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700 text-center">{t('paytm.mobileRecharge')}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <span className="text-sm text-gray-700 text-center">{t('paytm.fastagRecharge')}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mb-3">
                  <Lightbulb className="w-8 h-8 text-yellow-600" />
                </div>
                <span className="text-sm text-gray-700 text-center">{t('paytm.electricityBill')}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-red-600 font-bold text-lg">Lo</span>
                </div>
                <span className="text-sm text-gray-700 text-center">{t('paytm.loanPayments')}</span>
              </div>
            </div>
            <div className="mt-6">
              <button className="flex items-center gap-3 text-blue-600 font-medium text-lg">
                <Plus className="w-6 h-6" />
                {t('paytm.addNewBills')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Send Button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={handleSendClick}
            className="bg-blue-600 text-white px-12 py-4 rounded-full flex items-center gap-4 shadow-lg hover:bg-blue-700 transition-colors text-xl font-semibold"
          >
            <Send className="w-8 h-8" />
            <span>{t('paytm.send')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
