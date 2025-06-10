
import React from 'react';

export default function ProblemsSlide4() {
  return (
    <div className="space-y-8">
      <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 flex items-start space-x-4">
        <img 
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
          alt="Transportation costs" 
          className="w-16 h-16 rounded object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-yellow-800 mb-3">🚌 Deplasman Chè ak Fatik</h3>
          <p className="text-gray-700 mb-4 text-lg">
            Moun oblije al Vèrèt pou resevwa lajan, sa ki pran tan, koute lajan, epi mete yo an danje.
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h4 className="font-bold text-yellow-700 mb-3">💰 Analiz Koût yo:</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-gray-800">Transpò Ale-Tounen:</p>
                <p className="text-gray-700">300-500 goud</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Tan ki Pèdi:</p>
                <p className="text-gray-700">6-8 orè nan yon jou</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Manje ak Dépans:</p>
                <p className="text-gray-700">200-300 goud</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Risk Sekirite:</p>
                <p className="text-gray-700">Enprevisibl ak ewo</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-yellow-600 font-semibold text-lg">
              ⚠️ Pou resevwa $100, yon moun ka depanse jiska $8-10 ak yon jou antye nan tan ak efò.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
