
import React from 'react';
import { Globe, Smartphone } from 'lucide-react';

export default function ProjectOverviewSlide2() {
  return (
    <div className="space-y-8">
      {/* Step 1 */}
      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
        <div className="flex items-start space-x-4 mb-4">
          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-800 mb-3">✅ Ale sou sit entènèt la oswa telechaje aplikasyon an</h3>
            <p className="text-gray-700 mb-4">
              Ou ka voye lajan bay fanmi ak zanmi w ann Ayiti atravè:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <Globe className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">Sit entènèt:</span>
                </div>
                <p className="text-blue-600 font-medium">https://transfer.mimaht.com</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <Smartphone className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold">Aplikasyon:</span>
                </div>
                <p className="text-green-600 font-medium">Global Transfer sou Play Store</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-blue-300">
          <div className="text-center py-8">
            <img 
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Screenshot sit Global Transfer ak app sou Play Store" 
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <p className="text-sm text-gray-600 italic">Screenshot sit la ak app la sou Play Store (Global Transfer)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
