
import React from 'react';

export default function RevenueSlide3() {
  return (
    <div className="space-y-8">
      <div className="mb-6 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Complementary revenue streams" 
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-green-600">Sous Revni Konplèman yo</h2>
        
        <p className="text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto">
          Sous revni adisyonèl yo ki ap ede nou diversifye ak maksimize pwofitabilite platfòm lan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-3">📢</div>
            <h3 className="text-lg font-bold mb-3">Piblisite ak Anons</h3>
            <p className="text-sm opacity-90">Biznis lokal yo peye pou montre pwodui yo nan app lan</p>
            <div className="mt-4 text-yellow-200">
              <span className="font-bold">$200-500/mwa</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-lg font-bold mb-3">Patnèrya Estratejik</h3>
            <p className="text-sm opacity-90">Kolaborasyon ak konpayi yo ak komisyon sou vant</p>
            <div className="mt-4 text-purple-200">
              <span className="font-bold">10-20%</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-3">💳</div>
            <h3 className="text-lg font-bold mb-3">Sèvis Premium</h3>
            <p className="text-sm opacity-90">Fonksyon avanse ak sipò priyorite</p>
            <div className="mt-4 text-teal-200">
              <span className="font-bold">$5-15/mwa</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Pwojeksyon Revni 12 Mwa</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold">$25K</p>
              <p className="text-sm opacity-90">Mwa 1-3</p>
            </div>
            <div>
              <p className="text-3xl font-bold">$75K</p>
              <p className="text-sm opacity-90">Mwa 4-8</p>
            </div>
            <div>
              <p className="text-3xl font-bold">$150K</p>
              <p className="text-sm opacity-90">Mwa 9-12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
