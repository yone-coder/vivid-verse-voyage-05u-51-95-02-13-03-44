
import React from 'react';

export default function RevenueSlide3() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-purple-800 mb-6">Sous Revni Konplementè yo</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Cash withdrawal services" 
              className="w-12 h-12 rounded object-cover"
            />
            <h4 className="text-lg font-bold text-purple-800">💰 Frè sou Retwè Kach</h4>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
            <p className="text-gray-700 mb-2 font-semibold">Estrikti Frè:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Retwè rapid: 100 goud (mwens pase 1 orè)</li>
              <li>• Retwè nòmal: 50 goud (2-4 orè)</li>
              <li>• Gwo montan ($500+): 2-3% oswa 200 goud</li>
              <li>• Sèvis premyè klas: 150-250 goud</li>
            </ul>
          </div>
          <p className="text-sm text-purple-600 font-semibold">
            Benefis nan chanj ak gwoup purchasing power
          </p>
        </div>
        
        <div className="bg-indigo-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Advertising and promotions" 
              className="w-12 h-12 rounded object-cover"
            />
            <h4 className="text-lg font-bold text-indigo-800">📢 Anons ak Pwomosyon</h4>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
            <p className="text-gray-700 mb-2 font-semibold">Opòtinite Revni:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Anons nan app: 5,000-10,000 goud/mwa</li>
              <li>• Baniye nan biwo: 3,000-8,000 goud/mwa</li>
              <li>• Pwomosyon biznis lokal: 15,000+ goud/mwa</li>
              <li>• Patnèrya ak brand yo: 20,000+ goud/mwa</li>
            </ul>
          </div>
          <p className="text-sm text-indigo-600 font-semibold">
            Monetization ak biznis kominotè yo
          </p>
        </div>
      </div>
    </div>
  );
}
