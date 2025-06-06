
import React from 'react';

export default function OperationsPlanChapter() {
  return (
    <div className="space-y-8">
      {/* Operations Plan Image */}
      <div className="mb-6 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Business operations" 
          className="w-full h-64 object-cover"
        />
      </div>

      <p className="text-lg text-gray-700 mb-6">
        Plan operasyon nou an konsantre sou etabli yon sistèm ki efikas ak sekirize pou jere operasyon yo chak jou.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-teal-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Main office" 
              className="w-10 h-10 rounded object-cover"
            />
            <h3 className="text-lg font-bold text-teal-800">Biwo Prensipal:</h3>
          </div>
          <p className="text-gray-700 mb-2">Lakou Giyas, anndan Weezy Barber Shop.</p>
          <p className="text-sm text-gray-600">Espas 200m² ak sekirite 24/7</p>
          <p className="text-sm text-gray-600">Sistèm kamera ak monitoring</p>
        </div>
        
        <div className="bg-cyan-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Staff team" 
              className="w-10 h-10 rounded object-cover"
            />
            <h3 className="text-lg font-bold text-cyan-800">Staff:</h3>
          </div>
          <p className="text-gray-700 mb-2">2 ajan sèvis kliyan, 1 ajan livrezon, 1 teknisyen IT.</p>
          <p className="text-sm text-gray-600">Plan ekspansyon 8-12 anplwaye nan 6 mwa</p>
          <p className="text-sm text-gray-600">Fòmasyon kontinyè ak sètifikasyon</p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Business hours" 
              className="w-10 h-10 rounded object-cover"
            />
            <h3 className="text-lg font-bold text-blue-800">Orè Operasyon:</h3>
          </div>
          <p className="text-gray-700 mb-2">7 jou pa semèn, 8am–5pm.</p>
          <p className="text-sm text-gray-600">Sipò kliyan 24/7 nan telefòn ak WhatsApp</p>
          <p className="text-sm text-gray-600">Sèvis ijans nan kat sou-venn (24/7)</p>
        </div>
        
        <div className="bg-indigo-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Technology infrastructure" 
              className="w-10 h-10 rounded object-cover"
            />
            <h3 className="text-lg font-bold text-indigo-800">Teknoloji:</h3>
          </div>
          <p className="text-gray-700 mb-2">Sit entènèt, app mobil, sistèm messagerie.</p>
          <p className="text-sm text-gray-600">Entegrasyon ak banco yo ak mwayen peyman yo</p>
          <p className="text-sm text-gray-600">API ak platfòm dijital yo</p>
        </div>
      </div>
      
      <div className="bg-purple-50 p-6 rounded-lg">
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Security measures" 
            className="w-12 h-12 rounded object-cover"
          />
          <h3 className="text-xl font-bold text-purple-800">Sekirite ak Konpliyan:</h3>
        </div>
        <p className="text-gray-700 mb-4">Verifikasyon ID, kòd tranzaksyon, pwoteksyon done kliyan.</p>
        <div className="grid grid-cols-2 gap-4">
          <ul className="text-gray-600 list-disc ml-6 space-y-1">
            <li>Sistèm kamera ak monitoring</li>
            <li>Asiran ak vault sekirize</li>
            <li>Protokòl sekirite strict</li>
          </ul>
          <ul className="text-gray-600 list-disc ml-6 space-y-1">
            <li>Konpliyan ak règleman BRH</li>
            <li>Odi ak rapò regilye</li>
            <li>Fòmasyon sekirite pou staff</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
