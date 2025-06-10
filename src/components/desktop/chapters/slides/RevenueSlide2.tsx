
import React from 'react';

export default function RevenueSlide2() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-green-800 mb-6">Sous Revni Prensipal yo</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Money transfer fees" 
              className="w-12 h-12 rounded object-cover"
            />
            <h4 className="text-lg font-bold text-green-800">💸 Frè sou Chak Transfè Lajan</h4>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
            <p className="text-gray-700 mb-2 font-semibold">Estrikti Frè:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• $0-50: $5 frè (10%)</li>
              <li>• $51-100: $10 frè (10-20%)</li>
              <li>• $101-200: $15 frè (7.5-15%)</li>
              <li>• $200+: $20 frè (10% oswa mwens)</li>
            </ul>
          </div>
          <p className="text-sm text-green-600 font-semibold">
            Pi ba pase Western Union (18-20%) ak MoneyGram (15-18%)
          </p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Phone services commission" 
              className="w-12 h-12 rounded object-cover"
            />
            <h4 className="text-lg font-bold text-blue-800">📱 Komisyon sou Sèvis Telefòn</h4>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
            <p className="text-gray-700 mb-2 font-semibold">Sèvis yo:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Rechaj Digicel: 5-8% komisyon</li>
              <li>• Rechaj Natcom: 5-8% komisyon</li>
              <li>• Paket entènèt: 3-5% komisyon</li>
              <li>• Sèvis espesyal: 8-10% komisyon</li>
            </ul>
          </div>
          <p className="text-sm text-blue-600 font-semibold">
            Revni adisyonèl ak kontra direktrèman ak operatè yo
          </p>
        </div>
      </div>
    </div>
  );
}
