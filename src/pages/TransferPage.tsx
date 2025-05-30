import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus } from 'lucide-react';

export default function PaytmApp() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Sample banner data for the sliding functionality
  const bannerSlides = [
    {
      title: "Scan & Pay",
      subtitle: "wherever you go",
      buttonText: "Use UPI on Paytm →"
    },
    {
      title: "Quick Transfer",
      subtitle: "instant money transfer",
      buttonText: "Send Money Now →"
    },
    {
      title: "Bill Payments",
      subtitle: "pay all your bills",
      buttonText: "Pay Bills →"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  const handleSlideClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen px-1">
      {/* Header */}
      <div className="flex items-center justify-between px-1 py-3">
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

      {/* Functional Scan & Pay Banner */}
      <div className="mb-4 bg-white rounded-xl relative overflow-hidden mx-1">
        <div className="relative h-40">
          {bannerSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 p-4 transition-transform duration-500 ease-in-out ${
                index === activeSlide ? 'translate-x-0' : 
                index < activeSlide ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              <div className="flex items-center justify-between h-full">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900 mb-2">{slide.title}</h2>
                  <p className="text-blue-900 text-lg mb-4">{slide.subtitle}</p>
                  <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                    {slide.buttonText}
                  </button>
                </div>
                <div className="relative">
                  <div className="w-24 h-32 bg-blue-500 rounded-lg transform rotate-12 flex flex-col items-center justify-center text-white">
                    <span className="text-xs font-bold mb-2">Paytm</span>
                    <span className="text-xs mb-1">Accepted Here</span>
                    <div className="w-16 h-16 bg-white rounded border-2 border-gray-300 flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-black" />
                    </div>
                    <span className="text-xs mt-1">Bhim UPI</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slide indicators */}
        <div className="flex justify-center pb-4 gap-1">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideClick(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeSlide ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Money Transfer */}
      <div className="mb-4 bg-white rounded-xl p-4 mx-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Money Transfer</h3>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-gray-700 text-center">Scan & Pay</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-gray-700 text-center">To Mobile</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-gray-700 text-center">To Bank A/C</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
              <User className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-gray-700 text-center">To Self A/c</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-700 text-center">Balance & History</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                <QrCode className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-sm text-gray-700 text-center">Receive Money</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-700 text-center">Refer & Win</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
              <span className="text-blue-600 font-bold text-lg">⚡</span>
            </div>
            <span className="text-sm text-gray-700 text-center">All UPI Services</span>
          </div>
        </div>
      </div>

      {/* Recharge & Bill Payments */}
      <div className="mb-4 bg-white rounded-xl p-4 mx-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Recharge & Bill Payments</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
              <Smartphone className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-700 text-center">Mobile Recharge</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-2">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-gray-700 text-center">FASTag Recharge</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-2">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-700 text-center">Electricity Bill</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-2">
              <span className="text-red-600 font-bold">Lo</span>
            </div>
            <span className="text-sm text-gray-700 text-center">Loan Payments</span>
          </div>
        </div>
        <div className="mt-4">
          <button className="flex items-center gap-2 text-blue-600 font-medium">
            <Plus className="w-5 h-5" />
            Add New or View existing Bills
          </button>
        </div>
      </div>

      {/* Bottom Scan QR Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <button className="bg-blue-600 text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-lg">
          <QrCode className="w-6 h-6" />
          <span className="text-lg font-semibold">Scan QR</span>
        </button>
      </div>
    </div>
  );
}
