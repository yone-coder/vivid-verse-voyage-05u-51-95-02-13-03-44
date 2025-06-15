
import React from 'react';
import MobileMultiStepTransferSheetPage from '@/components/mobile/transfer/MobileMultiStepTransferSheetPage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShieldCheck, Zap, Banknote, HelpCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const DesktopMultiStepTransferPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-0 py-0 lg:px-4 lg:py-8">
        <header className="mb-0 px-4 pt-6 lg:pt-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Send Money</h1>
          <p className="text-gray-600 dark:text-gray-400">Complete your transfer securely and efficiently.</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-8 items-start">
          {/* LEFT: Render the mobile transfer page as the main flow */}
          <main className="lg:col-span-3 flex flex-col items-center bg-white min-h-[calc(100vh-64px)] py-0 px-0">
            <div className="w-full max-w-md lg:max-w-none lg:w-full">
              <MobileMultiStepTransferSheetPage />
            </div>
          </main>
          {/* RIGHT: Desktop sidebar, visible on large screens */}
          <aside className="hidden lg:flex flex-col gap-6 col-span-2 py-8 pr-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <ShieldCheck className="mr-3 h-6 w-6 text-green-500" />
                  <span>Your Secure Transfer</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                <p>We use industry-standard encryption to protect your financial information. Your security is our top priority.</p>
                <div className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-blue-500"/>
                  <span>Fast and reliable delivery</span>
                </div>
                <div className="flex items-center">
                  <Banknote className="mr-2 h-4 w-4 text-blue-500"/>
                  <span>Competitive exchange rates</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <HelpCircle className="mr-3 h-6 w-6 text-blue-500" />
                  <span>Need Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <a href="#" className="flex items-center text-blue-600 hover:underline">How long do transfers take?</a>
                <Separator />
                <a href="#" className="flex items-center text-blue-600 hover:underline">What are the fees?</a>
                <Separator />
                <a href="#" className="flex items-center text-blue-600 hover:underline">Contact Support</a>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DesktopMultiStepTransferPage;

