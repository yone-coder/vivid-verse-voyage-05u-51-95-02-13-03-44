
import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus, Send, Eye, DollarSign, Calculator, History, UserPlus, Shield, CreditCard, HelpCircle, Globe } from 'lucide-react';
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

  // Action button categories
  const transferMoneyActions = [
    { id: 'send', icon: Send, label: 'Send', description: 'Start a new money transfer' },
    { id: 'track', icon: Eye, label: 'Track', description: 'Track transfer status' },
    { id: 'rates', icon: DollarSign, label: 'Rates', description: 'View live exchange rates' },
    { id: 'fees', icon: Calculator, label: 'Fees', description: 'Access the fee calculator' },
    { id: 'history', icon: History, label: 'History', description: 'View past transactions' },
  ];

  const recipientsAccountActions = [
    { id: 'add', icon: Plus, label: 'Add', description: 'Add a new recipient' },
    { id: 'manage', icon: Users, label: 'Manage', description: 'Manage recipients or settings' },
    { id: 'profile', icon: User, label: 'Profile', description: 'Go to user account settings' },
    { id: 'verify', icon: Shield, label: 'Verify', description: 'Start identity verification' },
    { id: 'secure', icon: Shield, label: 'Secure', description: 'Access security settings' },
  ];

  const walletBalanceActions = [
    { id: 'topup', icon: Plus, label: 'Topup', description: 'Add funds to your wallet' },
    { id: 'balance', icon: DollarSign, label: 'Balance', description: 'Check wallet balance' },
    { id: 'withdraw', icon: Upload, label: 'Withdraw', description: 'Withdraw money from wallet' },
  ];

  const appDeviceActions = [
    { id: 'app', icon: Smartphone, label: 'App', description: 'Download mobile app' },
    { id: 'notify', icon: Bell, label: 'Notify', description: 'Manage notifications' },
  ];

  const helpExtrasActions = [
    { id: 'help', icon: HelpCircle, label: 'Help', description: 'Get support or open chat' },
    { id: 'refer', icon: Users, label: 'Refer', description: 'Invite a friend / referral system' },
    { id: 'login', icon: User, label: 'Login', description: 'Sign in' },
    { id: 'signup', icon: UserPlus, label: 'Signup', description: 'Create account' },
    { id: 'lang', icon: Globe, label: 'Lang', description: 'Toggle language' },
  ];

  const handleActionClick = (actionId: string) => {
    if (actionId === 'send') {
      setIsSheetOpen(true);
    } else {
      console.log(`Action clicked: ${actionId}`);
    }
  };

  const ActionButton = ({ action }: { action: any }) => (
    <div 
      className="flex flex-col items-center cursor-pointer"
      onClick={() => handleActionClick(action.id)}
    >
      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
        <action.icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-sm text-gray-700 text-center">{action.label}</span>
    </div>
  );

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen">
      {/* Header - Sticky with proper spacing */}
      <div className="sticky top-0 z-50 bg-gradient-to-b from-blue-100 to-blue-50 px-2 py-3 shadow-sm">
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

        {/* Transfer & Money */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🔄 Transfer & Money</h3>
          <div className="grid grid-cols-3 gap-4">
            {transferMoneyActions.map((action) => (
              <ActionButton key={action.id} action={action} />
            ))}
          </div>
        </div>

        {/* Recipients & Account */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🧾 Recipients & Account</h3>
          <div className="grid grid-cols-3 gap-4">
            {recipientsAccountActions.map((action) => (
              <ActionButton key={action.id} action={action} />
            ))}
          </div>
        </div>

        {/* Wallet & Balance */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">💰 Wallet & Balance</h3>
          <div className="grid grid-cols-3 gap-4">
            {walletBalanceActions.map((action) => (
              <ActionButton key={action.id} action={action} />
            ))}
          </div>
        </div>

        {/* App & Device */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">📱 App & Device</h3>
          <div className="grid grid-cols-3 gap-4">
            {appDeviceActions.map((action) => (
              <ActionButton key={action.id} action={action} />
            ))}
          </div>
        </div>

        {/* Help & Extras */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🔒 Help & Extras</h3>
          <div className="grid grid-cols-3 gap-4">
            {helpExtrasActions.map((action) => (
              <ActionButton key={action.id} action={action} />
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
