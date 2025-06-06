
import React from 'react';

export default function ProjectOverviewChapter() {
  return (
    <div className="space-y-8">
      {/* Project Overview Image */}
      <div className="mb-6 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Global money transfer network" 
          className="w-full h-64 object-cover"
        />
      </div>

      <p className="text-lg leading-relaxed text-gray-700">
        Global Transfer se yon platfòm transfè lajan ki vize bay tout Ayisyen, kit yo an Ayiti oswa aletranje, 
        yon fason fasil, rapid, ak aksesib pou voye lajan, resevwa lajan. Platfòm lan gen plizyè fonksyon:
      </p>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg flex items-start space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
            alt="International transfer" 
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
          <div>
            <h3 className="text-xl font-bold text-blue-800 mb-3">Transfè Entènasyonal ak Lokal:</h3>
            <p className="text-gray-700 mb-3">
              Voye lajan soti nan lòt peyi atravè CashApp, Zelle, PayPal, kat kredi oswa transfè bankè. 
              Resevwa lajan an fèt nan biwo lokal Global Transfer nan Lakou Giyas (Weezy Barber Shop), 
              oswa atravè MonCash, NatCash, BNC, Sogebank, BUH.
            </p>
            <ul className="text-gray-600 list-disc ml-6 space-y-1">
              <li>Sipò pou tout gwo platfòm peyman yo</li>
              <li>Konvèsyon otomatik goud/dola</li>
              <li>Kominikasyon 24/7</li>
              <li>Transfè rapid nan mwens pase 15 minit</li>
              <li>Sekirite ak verifikasyon ID</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg flex items-start space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
            alt="Mobile phone services" 
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
          <div>
            <h3 className="text-xl font-bold text-green-800 mb-3">Acha Minit ak Plan Entènèt:</h3>
            <p className="text-gray-700 mb-3">
              Diaspora a ka achte minit telefòn oswa plan entènèt Digicel/Natcom pou fanmi yo ann Ayiti.
            </p>
            <ul className="text-gray-600 list-disc ml-6 space-y-1">
              <li>Rechaj otomatik disponib</li>
              <li>Plan entènèt ak bonus espesyal</li>
              <li>Konfigurasyon selon preferans yo</li>
              <li>Konfirmasyon tranzaksyon nan SMS</li>
              <li>Istorik achte ak jesyon kont</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Objektif Pwojè a:</h3>
        <p className="text-lg">
          Kreye yon ekosistèm finansye konplè ki konekte diaspora Ayisyen an ak fanmi yo nan peyi a, 
          nan yon fason ki pi aksesib, pi rapid, ak pi sekirize pase sistèm yo ki egziste kounye a.
        </p>
      </div>
    </div>
  );
}
