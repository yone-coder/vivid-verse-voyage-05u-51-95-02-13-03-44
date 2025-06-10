
import React from 'react';
import { Receipt } from 'lucide-react';

export default function ProjectOverviewSlide5() {
  return (
    <div className="space-y-8">
      {/* Step 4 */}
      <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
        <div className="flex items-start space-x-4 mb-4">
          <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-orange-800 mb-3">✅ Resevwa yon resi transfè</h3>
            <p className="text-gray-700 mb-4">Apre ou fin peye, ou resevwa yon resi ki gen tout detay yo:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
              <li>Nimewo transfè a</li>
              <li>Non moun k ap resevwa a</li>
              <li>Kantite lajan an</li>
              <li>Dat ak kòd referans</li>
            </ul>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">📤 Ou ka telechaje l oswa voye bay moun nan.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-orange-300">
          <div className="text-center py-8">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Screenshot resi ak nimewo transfè" 
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <p className="text-sm text-gray-600 italic">Screenshot resi a ak nimewo transfè sou li</p>
          </div>
        </div>
      </div>
    </div>
  );
}
