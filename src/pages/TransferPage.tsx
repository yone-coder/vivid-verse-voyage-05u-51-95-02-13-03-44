
import React, { useState, useEffect } from 'react';
import { Search, Bell, Send, Eye, DollarSign, CreditCard, History, Plus, User, Shield, Smartphone, Upload, Users, LogIn, UserPlus, Globe, Phone, Lightbulb } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MultiStepTransferSheet from '@/components/transfer/MultiStepTransferSheet';

export default function PaytmApp() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
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

  const quickActions = [
    {
      id: 'send',
      title: 'Send',
      icon: <Send className="w-6 h-6" />,
      color: 'bg-blue-600',
      action: () => setIsSheetOpen(true)
    },
    {
      id: 'track',
      title: 'Track',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-emerald-600',
      action: () => console.log('Track transfer')
    },
    {
      id: 'rates',
      title: 'Rates',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-600',
      action: () => console.log('View exchange rates')
    },
    {
      id: 'fees',
      title: 'Fees',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-orange-600',
      action: () => console.log('Fee calculator')
    },
    {
      id: 'history',
      title: 'History',
      icon: <History className="w-6 h-6" />,
      color: 'bg-purple-600',
      action: () => console.log('Transfer history')
    },
    {
      id: 'add',
      title: 'Add',
      icon: <Plus className="w-6 h-6" />,
      color: 'bg-cyan-600',
      action: () => console.log('Add recipient')
    },
    {
      id: 'manage',
      title: 'Manage',
      icon: <User className="w-6 h-6" />,
      color: 'bg-indigo-600',
      action: () => console.log('Manage recipients')
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: <User className="w-6 h-6" />,
      color: 'bg-slate-600',
      action: () => console.log('User profile')
    },
    {
      id: 'verify',
      title: 'Verify',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-yellow-600',
      action: () => console.log('Identity verification')
    },
    {
      id: 'secure',
      title: 'Secure',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-red-600',
      action: () => console.log('Security settings')
    },
    {
      id: 'topup',
      title: 'Topup',
      icon: <Upload className="w-6 h-6" />,
      color: 'bg-teal-600',
      action: () => console.log('Add funds')
    },
    {
      id: 'balance',
      title: 'Balance',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-lime-600',
      action: () => console.log('Check balance')
    },
    {
      id: 'withdraw',
      title: 'Withdraw',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-amber-600',
      action: () => console.log('Withdraw funds')
    },
    {
      id: 'app',
      title: 'App',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'bg-violet-600',
      action: () => console.log('Download app')
    },
    {
      id: 'notify',
      title: 'Notify',
      icon: <Bell className="w-6 h-6" />,
      color: 'bg-pink-600',
      action: () => console.log('Manage notifications')
    },
    {
      id: 'help',
      title: 'Help',
      icon: <Phone className="w-6 h-6" />,
      color: 'bg-rose-600',
      action: () => console.log('Customer support')
    },
    {
      id: 'refer',
      title: 'Refer',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-fuchsia-600',
      action: () => console.log('Refer friends')
    },
    {
      id: 'login',
      title: 'Login',
      icon: <LogIn className="w-6 h-6" />,
      color: 'bg-sky-600',
      action: () => console.log('Sign in')
    },
    {
      id: 'signup',
      title: 'Signup',
      icon: <UserPlus className="w-6 h-6" />,
      color: 'bg-emerald-600',
      action: () => console.log('Create account')
    },
    {
      id: 'lang',
      title: 'Lang',
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-blue-600',
      action: () => console.log('Toggle language')
    }
  ];

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen">
      {/* Header - Sticky with proper spacing */}
      <div className="sticky top-0 z-50 bg-gradient-to-b from-blue-100 to-blue-50 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-900">Paytm</span>
              <span className="text-red-500 text-lg ml-1">❤</span>
              <span className="text-xl font-bold text-blue-600 ml-1">UPI</span>
              <span className="text-yellow-500 text-lg">⚡</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-blue-600" />
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Content Container with reduced padding */}
      <div className="px-2 space-y-4">
        {/* Image Carousel - Proper spacing from header */}
        <div className="mt-4 bg-white rounded-xl relative overflow-hidden">
          <div className="relative h-40">
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

        {/* Quick Actions Grid */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={action.action}
                className="flex flex-col items-center group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform`}>
                  <div className="text-white">
                    {action.icon}
                  </div>
                </div>
                <span className="text-sm text-gray-700 text-center font-medium">
                  {action.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Send Button with Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-lg">
              <Send className="w-6 h-6" />
              <span className="text-lg font-semibold">Send</span>
            </button>
          </div>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] p-0">
          <MultiStepTransferSheet onClose={() => setIsSheetOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
