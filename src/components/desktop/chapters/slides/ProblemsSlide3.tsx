
import React from 'react';

export default function ProblemsSlide3() {
  return (
    <div className="space-y-8">
      <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400 flex items-start space-x-4">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
          alt="Limited capacity" 
          className="w-16 h-16 rounded object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-orange-800 mb-3">⚡ Kapacite Limite MonCash/NatCash</h3>
          <p className="text-gray-700 mb-4 text-lg">
            Ti biwo ki egziste yo limite e pa ka reponn ak tout demann lan.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-orange-700 mb-2">Pwoblèm Kapacite:</h4>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                <li>Limite nan kantite lajan nan kès</li>
                <li>Pa gen asirans pou gwo montan</li>
                <li>Orè operasyon limite</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-orange-700 mb-2">Enpak sou Kliyan:</h4>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                <li>Dwe tounen plizyè fwa</li>
                <li>Pa sikerite pou resevwa lajan</li>
                <li>Frustrasyon ak pèt konfyans</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-100 p-4 rounded-lg">
            <p className="text-orange-600 font-semibold text-lg">
              📊 Chak jou gen kantite moun ki pa ka resevwa lajan yo paske pa gen espas oswa lajan nan kès yo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
