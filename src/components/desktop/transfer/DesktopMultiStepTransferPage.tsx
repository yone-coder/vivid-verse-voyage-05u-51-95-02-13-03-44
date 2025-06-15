
import React from 'react';
import MultiStepTransferSheet from '@/components/transfer/MultiStepTransferSheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Zap, Banknote, HelpCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const DesktopMultiStepTransferPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Send Money</h1>
            <p className="text-gray-600 dark:text-gray-400">Complete your transfer securely and efficiently.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          <main className="lg:col-span-3">
            <Card className="overflow-hidden shadow-lg">
                <CardContent className="p-0">
                    <MultiStepTransferSheet 
                        variant="page" 
                        onClose={() => {}} 
                    />
                </CardContent>
            </Card>
          </main>

          <aside className="lg:col-span-2 space-y-6">
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
