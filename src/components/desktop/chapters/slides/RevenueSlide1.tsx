
import React from 'react';

export default function RevenueSlide1() {
  return (
    <div className="space-y-8">
      <div className="mb-6 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Financial growth and revenue" 
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-green-600">Plan Finansman ak Modèl Revni</h2>
        
        <p className="text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto">
          Plan finansman Global Transfer la baze sou divèsifikasyon sous revni yo pou asire yon biznis 
          ki dirab ak pwofitab nan yon mache ki nan devlopman.
        </p>

        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Estrateji Divèsifikasyon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="text-lg font-semibold mb-2">🎯 Objektif Prensipal:</h4>
              <ul className="space-y-1">
                <li>• Kreye plizyè sous revni</li>
                <li>• Minimize risk finansye</li>
                <li>• Maksimize pwofitabilite</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">📈 Estrateji Kwisans:</h4>
              <ul className="space-y-1">
                <li>• Ekspansyon progresif</li>
                <li>• Nouvo sèvis ak fonksyon</li>
                <li>• Patnèrya estratejik</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
