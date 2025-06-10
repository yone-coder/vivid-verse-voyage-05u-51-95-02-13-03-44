
import React from 'react';
import { CreditCard } from 'lucide-react';

export default function ProjectOverviewSlide4() {
  return (
    <div className="space-y-8">
      {/* Step 3 */}
      <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
        <div className="flex items-start space-x-4 mb-4">
          <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-purple-800 mb-3">✅ Peye ak kat kredi oswa kat dèbi ou</h3>
            <p className="text-gray-700 mb-4">Nou aksepte tout gwo kat entènasyonal:</p>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="font-semibold text-blue-600">Visa</span>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <CreditCard className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <span className="font-semibold text-red-600">MasterCard</span>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <CreditCard className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <span className="font-semibold text-gray-600">Lòt kat</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-purple-300">
          <div className="text-center py-8">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Screenshot paj peman an" 
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <p className="text-sm text-gray-600 italic">Screenshot paj peman an</p>
          </div>
        </div>
      </div>
    </div>
  );
}
