
import React from 'react';
import { MapPin, Shield } from 'lucide-react';

export default function ProjectOverviewSlide6() {
  return (
    <div className="space-y-8">
      {/* Step 5 */}
      <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-400">
        <div className="flex items-start space-x-4 mb-4">
          <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-teal-800 mb-3">✅ Moun k ap resevwa a vin pran lajan li nan biwo nou</h3>
            <p className="text-gray-700 mb-4">Pou moun lan ka pran lajan an, li dwe:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
              <li>Prezante nimewo transfè a</li>
              <li>Mete yon kat idantite (CIN, paspò, elatriye)</li>
            </ul>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              <MapPin className="w-5 h-5 text-teal-600 mr-2" />
              <p className="text-gray-700 font-medium">📍 Lajan an ranmase sèlman nan biwo transfè MimaHT.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-teal-300">
          <div className="text-center py-8">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Foto moun nan ak kat idantite nan biwo a" 
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <p className="text-sm text-gray-600 italic">Foto oswa grafik moun nan ak kat idantite nan biwo a</p>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Shield className="w-8 h-8 text-green-400 mr-3" />
          <h3 className="text-xl font-bold">🔐 Sekirite ak Konfidansyalite</h3>
        </div>
        <ul className="space-y-2 text-lg">
          <li>• Tout done yo sekirize</li>
          <li>• Se sèlman moun ki gen nimewo transfè + ID ki ka ranmase lajan an</li>
          <li>• Pa gen transfè pa telefòn oswa livrezon lakay – biwo sèlman</li>
        </ul>
      </div>
    </div>
  );
}
