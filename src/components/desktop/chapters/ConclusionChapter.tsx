
import React from 'react';

export default function ConclusionChapter() {
  return (
    <div className="space-y-8">
      <div className="mb-6 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Haiti community empowerment" 
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="text-center space-y-6">
        <h3 className="text-3xl font-bold text-blue-600">Global Transfer: Plis Pase Yon Sèvis</h3>
        
        <p className="text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto">
          Global Transfer se plis pase yon sèvis voye lajan. Li se yon zouti devlopman ekonomik pou kominote a. 
          Avèk yon solisyon dijital, fleksib, sekirize ak lokal, nou mete kontwòl ekonomi an nan men Ayisyen yo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="text-blue-600 text-4xl font-bold mb-2">💡</div>
            <h4 className="text-lg font-bold text-blue-800 mb-2">Inovasyon</h4>
            <p className="text-gray-700">Teknoloji ki adapte ak bezwen kominote lokal yo</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="text-green-600 text-4xl font-bold mb-2">🤝</div>
            <h4 className="text-lg font-bold text-green-800 mb-2">Kominote</h4>
            <p className="text-gray-700">Konekte diaspora a ak fanmi yo nan peyi a</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="text-purple-600 text-4xl font-bold mb-2">🚀</div>
            <h4 className="text-lg font-bold text-purple-800 mb-2">Devlopman</h4>
            <p className="text-gray-700">Ouvè nouvo opòtinite ekonomik yo</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mt-8">
          <h4 className="text-2xl font-bold mb-4">Se Pa Sèlman Yon Biznis, Se Yon Mouvman</h4>
          <p className="text-lg mb-4">
            Nou ap bati yon avni kote chak Ayisyen gen aksè nan sèvis finansye yo merite yo, 
            kote teknoloji sèvi pou ranfòse kominote yo, ak kote dyaspora ak peyi a rete konekte.
          </p>
          <div className="flex justify-center">
            <div className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold">
              Ansamn Nou Pi Fò! 🇭🇹
            </div>
          </div>
        </div>

        <div className="text-center pt-6">
          <p className="text-gray-600 italic">
            "Kominote ki solid se kominote ki gen opòtinite pou tout moun nan yo pwogrese."
          </p>
        </div>
      </div>
    </div>
  );
}
