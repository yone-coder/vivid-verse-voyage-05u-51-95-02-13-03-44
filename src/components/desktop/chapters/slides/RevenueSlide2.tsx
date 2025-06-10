
import React from 'react';

export default function RevenueSlide2() {
  return (
    <div className="space-y-8">
      <div className="mb-6 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Primary revenue sources" 
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-green-600">Sous Revni Prensipal yo</h2>
        
        <p className="text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto">
          Sous revni prensipal yo nan Global Transfer baze sou frè transfè ak komisyon sou sèvis yo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-2xl font-bold mb-4">Frè Transfè Lajan</h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span>$0-100:</span>
                <span className="font-bold">$5 (5%)</span>
              </div>
              <div className="flex justify-between">
                <span>$101-500:</span>
                <span className="font-bold">$8 (3-4%)</span>
              </div>
              <div className="flex justify-between">
                <span>$501+:</span>
                <span className="font-bold">$12 (2-3%)</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-2xl font-bold mb-4">Komisyon sou Sèvis</h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span>Recharge Telefòn:</span>
                <span className="font-bold">5-8%</span>
              </div>
              <div className="flex justify-between">
                <span>Peye Fakti:</span>
                <span className="font-bold">3-5%</span>
              </div>
              <div className="flex justify-between">
                <span>Achte Minit:</span>
                <span className="font-bold">10-15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
