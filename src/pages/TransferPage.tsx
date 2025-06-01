
import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus, Send } from 'lucide-react';
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

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen flex flex-col">
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

      {/* Centered Content Panel */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xs space-y-6">
          {/* Money Transfer Panel - Centered and Minimal */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Quick Transfer</h3>
            
            {/* Essential transfer options only */}
            <div className="grid grid-cols-2 gap-4 mb-6">
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
                <span className="text-sm text-gray-700 text-center">To Bank</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700 text-center">History</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button className="w-full bg-blue-50 text-blue-600 py-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                Mobile Recharge
              </button>
              <button className="w-full bg-green-50 text-green-600 py-3 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                Bill Payments
              </button>
            </div>
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
