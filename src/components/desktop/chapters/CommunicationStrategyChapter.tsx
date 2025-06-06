
import React from 'react';

export default function CommunicationStrategyChapter() {
  return (
    <div className="space-y-8">
      {/* Communication Strategy Image */}
      <div className="mb-6 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Digital communication strategy" 
          className="w-full h-64 object-cover"
        />
      </div>

      <p className="text-lg text-gray-700 mb-6">
        Estrateji kominikasyon nou an vize rive nan tout Ayisyen yo, kit yo nan diaspora a oswa nan peyi a, 
        ak yon mesaj ki klè ak aksesib.
      </p>

      <div className="space-y-6">
        <div className="flex items-start space-x-4 bg-blue-50 p-6 rounded-lg">
          <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">1</div>
          <img 
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Social media" 
            className="w-16 h-16 rounded object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-800 mb-3">Kominikasyon Dijital:</h3>
            <p className="text-gray-700 mb-3">
              Itilizasyon Facebook, WhatsApp, TikTok pou enfòme diaspora a ak fanmi yo an Ayiti.
            </p>
            <ul className="text-gray-600 list-disc ml-6 space-y-1">
              <li>Pòs regilye ak témwayaj kliyan yo</li>
              <li>Konversasyon ak dyaspora yo nan lengua yo konprann</li>
              <li>Kontan ak edikasyon sou sèvis yo</li>
              <li>Live streaming ak demonstrasyon</li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 bg-green-50 p-6 rounded-lg">
          <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">2</div>
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Local advertising" 
            className="w-16 h-16 rounded object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-800 mb-3">Afichaj Lokal:</h3>
            <p className="text-gray-700 mb-3">
              Piblisite nan mache, legliz, lekòl, radyo kominotè.
            </p>
            <ul className="text-gray-600 list-disc ml-6 space-y-1">
              <li>Baniye ak poster nan pwen estratejik yo</li>
              <li>Anons nan radyo ak televizyon lokal</li>
              <li>Prezantasyon nan reyinyon kominotè yo</li>
              <li>Kolaborasyon ak lidè kominotè yo</li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 bg-purple-50 p-6 rounded-lg">
          <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">3</div>
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Local partnerships" 
            className="w-16 h-16 rounded object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-purple-800 mb-3">Patnè Lokal:</h3>
            <p className="text-gray-700 mb-3">
              Kolaborasyon ak biznis, salon, stasyon telefòn pou sèvi kòm pickup station.
            </p>
            <ul className="text-gray-600 list-disc ml-6 space-y-1">
              <li>Rézo ajan nan kominote yo</li>
              <li>Komisyon pou patnè yo</li>
              <li>Fòmasyon ak sipò teknik</li>
              <li>Materyèl pwomosyon distribye</li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 bg-orange-50 p-6 rounded-lg">
          <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">4</div>
          <img 
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Education and training" 
            className="w-16 h-16 rounded object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-orange-800 mb-3">Edikasyon:</h3>
            <p className="text-gray-700 mb-3">
              Fòmasyon sou kijan pou itilize platfòm lan, espesyalman pou granmoun ak moun ki pa abitye ak teknoloji.
            </p>
            <ul className="text-gray-600 list-disc ml-6 space-y-1">
              <li>Atelye pratik nan kominote yo</li>
              <li>Gid vizyèl ak fidèl nan kreyòl</li>
              <li>Sipò yon sou yon</li>
              <li>Línea dirèk pou kesyon yo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
