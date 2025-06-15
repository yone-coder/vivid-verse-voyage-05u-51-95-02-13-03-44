
```tsx
import React from 'react';
import MultiStepTransferSheet from '@/components/transfer/MultiStepTransferSheet';
import { Zap, BadgePercent } from 'lucide-react';

const DesktopMultiStepTransferPage: React.FC = () => {
  const [formKey, setFormKey] = React.useState(0);

  const handleReset = () => {
    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Interactive Transfer Form */}
          <div>
            <div className="flex flex-col bg-white rounded-2xl shadow-2xl shadow-gray-200/50 overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
              <MultiStepTransferSheet key={formKey} onClose={handleReset} variant="page" />
            </div>
          </div>

          {/* Right Column: Informational Content */}
          <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Money with Confidence</h2>
            <p className="text-lg text-gray-600 mb-8">
              Welcome to our new desktop experience. Complete your transfer in a few simple steps.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">Fast & Secure Transfers</h3>
                  <p className="mt-1 text-gray-500">Your money is transferred securely and arrives quickly to your recipient.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                   <BadgePercent className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">Competitive Rates</h3>
                  <p className="mt-1 text-gray-500">We offer competitive exchange rates to maximize the value of your transfer.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">How it works</h3>
              <ol className="relative border-l border-gray-200 dark:border-gray-700 space-y-6">
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                    <span className="font-bold text-blue-600">1</span>
                  </span>
                  <h4 className="font-medium text-gray-900">Enter Amount</h4>
                  <p className="text-sm text-gray-500">Specify how much you want to send.</p>
                </li>
                 <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                    <span className="font-bold text-blue-600">2</span>
                  </span>
                  <h4 className="font-medium text-gray-900">Recipient Details</h4>
                  <p className="text-sm text-gray-500">Provide your recipient's information.</p>
                </li>
                 <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                    <span className="font-bold text-blue-600">3</span>
                  </span>
                  <h4 className="font-medium text-gray-900">Pay & Send</h4>
                  <p className="text-sm text-gray-500">Choose your payment method and confirm.</p>
                </li>
              </ol>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DesktopMultiStepTransferPage;
```
