
import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PaytmMobileHome() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  
  const bannerImages = [
    "/lovable-uploads/2102d3a1-ec6e-4c76-8ee0-549c3ae3d54e.png",
    "/lovable-uploads/4dbaee7c-2ac5-4a1b-9f9b-121275273e79.png",
    "/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const handleSendClick = () => {
    navigate('/multi-step-transfer-page');
  };

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-b from-blue-100 to-blue-50 px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-900">Paytm</span>
              <span className="text-red-500 text-xl ml-1">❤</span>
              <span className="text-2xl font-bold text-blue-600 ml-1">UPI</span>
              <span className="text-yellow-500 text-xl">⚡</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 text-blue-600" />
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-6">
        {/* Image Carousel */}
        <div className="mt-6 bg-white rounded-xl relative overflow-hidden shadow-lg">
          <div className="relative h-48">
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
          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {bannerImages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === activeSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Money Transfer */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Money Transfer</h3>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-3 shadow-md">
                <QrCode className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm text-gray-700 text-center font-medium">Scan & Pay</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-3 shadow-md">
                <Upload className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm text-gray-700 text-center font-medium">To Mobile</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-3 shadow-md">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm text-gray-700 text-center font-medium">To Bank A/C</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-3 shadow-md">
                <User className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm text-gray-700 text-center font-medium">To Self A/c</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
              <span className="text-sm text-gray-700 text-center font-medium">Balance & History</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <div className="w-7 h-7 bg-blue-500 rounded flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-sm text-gray-700 text-center font-medium">Receive Money</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <span className="text-sm text-gray-700 text-center font-medium">Refer & Win</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <span className="text-blue-600 font-bold text-2xl">⚡</span>
              </div>
              <span className="text-sm text-gray-700 text-center font-medium">All UPI Services</span>
            </div>
          </div>
        </div>

        {/* Recharge & Bill Payments */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recharge & Bill Payments</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <Smartphone className="w-7 h-7 text-blue-600" />
              </div>
              <span className="text-sm text-gray-700 text-center font-medium">Mobile Recharge</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <Truck className="w-7 h-7 text-green-600" />
              </div>
              <span className="text-sm text-gray-700 text-center font-medium">FASTag Recharge</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-3">
                <Lightbulb className="w-7 h-7 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-700 text-center font-medium">Electricity Bill</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                <span className="text-red-600 font-bold text-lg">Lo</span>
              </div>
              <span className="text-sm text-gray-700 text-center font-medium">Loan Payments</span>
            </div>
          </div>
          <div className="mt-6">
            <button className="flex items-center gap-3 text-blue-600 font-medium">
              <Plus className="w-5 h-5" />
              Add New or View existing Bills
            </button>
          </div>
        </div>

        {/* Extra padding for bottom button */}
        <div className="h-24"></div>
      </div>

      {/* Bottom Send Button */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={handleSendClick}
          className="bg-blue-600 text-white px-10 py-5 rounded-full flex items-center gap-4 shadow-2xl hover:bg-blue-700 transition-colors"
        >
          <Send className="w-7 h-7" />
          <span className="text-xl font-semibold">Send</span>
        </button>
      </div>
    </div>
  );
}
