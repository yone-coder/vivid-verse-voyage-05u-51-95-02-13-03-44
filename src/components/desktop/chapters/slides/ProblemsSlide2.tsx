
import React from 'react';

export default function ProblemsSlide2() {
  return (
    <div className="space-y-8">
      <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400 flex items-start space-x-4">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
          alt="Empty office building" 
          className="w-16 h-16 rounded object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-red-800 mb-3">🏢 Absans Biwo Transfè Lokal</h3>
          <p className="text-gray-700 mb-4 text-lg">
            Pa gen okenn biwo transfè ofisyèl nan zòn tankou Désarmes, sa ki rann li difisil pou moun resevwa lajan.
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h4 className="font-bold text-red-700 mb-2">Konsèkans yo:</h4>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Moun yo oblije deplase nan zòn yo pa konnen yo</li>
              <li>Risk sekirite nan vwayaj yo</li>
              <li>Koût transpò ki cher</li>
              <li>Tan ki pèdi nan deplasè yo</li>
            </ul>
          </div>

          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-red-600 font-semibold text-lg">
              💡 Egzanp: Yon moun nan Désarmes dwe ale Vèrèt pou resevwa $100, 
              sa ki ka koute l 500 goud transpò ak yon jounen antye nan deplasè.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
