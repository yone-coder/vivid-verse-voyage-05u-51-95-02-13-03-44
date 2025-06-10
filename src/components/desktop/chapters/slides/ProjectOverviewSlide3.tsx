
import React from 'react';

export default function ProjectOverviewSlide3() {
  return (
    <div className="space-y-8">
      {/* Step 2 */}
      <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
        <div className="flex items-start space-x-4 mb-4">
          <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-800 mb-3">✅ Ranpli enfòmasyon sou moun k ap resevwa a</h3>
            <p className="text-gray-700 mb-4">Mete:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
              <li>Non konplè moun k ap resevwa a</li>
              <li>Nimewo telefòn li</li>
              <li>Vil kote li ye</li>
              <li>Kantite lajan ou vle voye</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-green-300">
          <div className="text-center py-8">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Screenshot fòm transfè sou sit oswa app" 
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <p className="text-sm text-gray-600 italic">Screenshot fòm transfè a sou sit oswa app</p>
          </div>
        </div>
      </div>
    </div>
  );
}
