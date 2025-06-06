
import React from 'react';

export default function RisksChapter() {
  return (
    <div className="space-y-8">
      <div className="mb-6 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Risk management" 
          className="w-full h-64 object-cover"
        />
      </div>

      <p className="text-lg text-gray-700 mb-6">
        Nou rekonèt risk yo ak nou prepare ak solisyon yo pou chak defi ki ka parèt nan operasyon yo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
          <h3 className="text-xl font-bold text-red-800 mb-3">Risk Teknolojik:</h3>
          <p className="text-gray-700 mb-3">Pan teknoloji oswa erè sistèm.</p>
          <div className="bg-green-100 p-3 rounded">
            <strong className="text-green-800">Solisyon:</strong>
            <span className="text-green-700 ml-2">Siveyans regilye, backup done, teknisyen IT disponib.</span>
          </div>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
          <h3 className="text-xl font-bold text-orange-800 mb-3">Risk Legal:</h3>
          <p className="text-gray-700 mb-3">Regilasyon sou transfè lajan oswa lisans finansye.</p>
          <div className="bg-green-100 p-3 rounded">
            <strong className="text-green-800">Solisyon:</strong>
            <span className="text-green-700 ml-2">Travay ak avoka lokal, verifye tout dokiman legal.</span>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
          <h3 className="text-xl font-bold text-yellow-800 mb-3">Risk Ensekirite:</h3>
          <p className="text-gray-700 mb-3">Fatra, vòl oswa menas pou anplwaye.</p>
          <div className="bg-green-100 p-3 rounded">
            <strong className="text-green-800">Solisyon:</strong>
            <span className="text-green-700 ml-2">Biwo sekirize, kolaborasyon ak otorite lokal.</span>
          </div>
        </div>
        
        <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-400">
          <h3 className="text-xl font-bold text-pink-800 mb-3">Risk Lajan pa Rive:</h3>
          <p className="text-gray-700 mb-3">Pwoblèm ak mwayen transfè.</p>
          <div className="bg-green-100 p-3 rounded">
            <strong className="text-green-800">Solisyon:</strong>
            <span className="text-green-700 ml-2">Notifikasyon otomatik, sèvis kliyan aktif.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
