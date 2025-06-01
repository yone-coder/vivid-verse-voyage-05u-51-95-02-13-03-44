
import React, { useState, useEffect } from 'react';
import { Search, Bell, QrCode, Smartphone, Upload, Building2, User, FileText, Users, Lightbulb, Truck, Plus, Send } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MultiStepTransferSheet from '@/components/transfer/MultiStepTransferSheet';

export default function PaytmApp() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-b from-blue-100 to-blue-50 h-screen flex flex-col">
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

      {/* Centered Content - No scrolling */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Money Transfer</h1>
          <p className="text-gray-600 mb-8">Send money quickly and securely</p>
          
          {/* Single Send Button */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-lg mx-auto">
                <Send className="w-6 h-6" />
                <span className="text-lg font-semibold">Send Money</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] p-0">
              <MultiStepTransferSheet onClose={() => setIsSheetOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
