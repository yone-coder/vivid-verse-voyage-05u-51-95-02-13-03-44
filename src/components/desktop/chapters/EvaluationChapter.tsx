
import React from 'react';

export default function EvaluationChapter() {
  return (
    <div className="space-y-8">
      <div className="mb-6 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Analytics and evaluation" 
          className="w-full h-64 object-cover"
        />
      </div>

      <p className="text-lg text-gray-700 mb-6">
        Sistèm evalyasyon ak suivi nou an vize mezire siksè yo ak identifye zòn ki bezwen amelyorasyon.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-green-800 mb-4">Endikatè Kle:</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li className="text-gray-700">Nimewo tranzaksyon/jou</li>
            <li className="text-gray-700">Tan mwayen pou resevwa lajan</li>
            <li className="text-gray-700">Nimewo kliyan aktif</li>
            <li className="text-gray-700">Satisfaksyon kliyan (%)</li>
            <li className="text-gray-700">Revni pa sèvis</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Metòd Suivi:</h3>
          <p className="text-gray-700 mb-3">
            Rapo chak semèn ak chak mwa, Sondaj satisfaksyon kliyan, Feedback regilye sou sèvis yo
          </p>
          <ul className="list-disc ml-6 space-y-1 text-sm text-gray-600">
            <li>Dashboard dijital ak estatistik yo</li>
            <li>Entèvyou ak kliyan yo</li>
            <li>Analiz done tranzaksyon yo</li>
          </ul>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-purple-800 mb-4">Plan Ajisteman:</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li className="text-gray-700">Si sèvis pa mache byen nan zòn, mete nouvo ajan</li>
            <li className="text-gray-700">Ajiste frè oswa ofri promo pou atire plis kliyan</li>
            <li className="text-gray-700">Mete nouvo fonksyon selon bezwen kliyan yo</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-3">Objektif Performance:</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">95%</p>
            <p className="text-sm">Satisfaksyon Kliyan</p>
          </div>
          <div>
            <p className="text-2xl font-bold">15min</p>
            <p className="text-sm">Tan Maks Transfè</p>
          </div>
          <div>
            <p className="text-2xl font-bold">500+</p>
            <p className="text-sm">Kliyan pa Mwa</p>
          </div>
        </div>
      </div>
    </div>
  );
}
