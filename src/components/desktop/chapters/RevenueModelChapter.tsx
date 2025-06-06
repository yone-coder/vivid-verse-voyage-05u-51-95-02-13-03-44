
import React from 'react';

export default function RevenueModelChapter() {
  return (
    <div className="space-y-8">
      {/* Revenue Model Image */}
      <div className="mb-6 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Financial growth and revenue" 
          className="w-full h-64 object-cover"
        />
      </div>

      <p className="text-lg text-gray-700 mb-6">
        Plan finansman Global Transfer la baze sou divèsifikasyon sous revni yo pou asire yon biznis 
        ki dirab ak pwofitab nan yon mache ki nan devlopman.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Money transfer fees" 
              className="w-10 h-10 rounded object-cover"
            />
            <h3 className="text-lg font-bold text-green-800">Frè sou Chak Transfè Lajan</h3>
          </div>
          <p className="text-gray-700 mb-3">Egzanp: $15 frè sou chak $100 voye.</p>
          <p className="text-sm text-green-600 font-semibold">
            Yo pi ba pase Western Union (18-20%) ak MoneyGram (15-18%)
          </p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Phone services commission" 
              className="w-10 h-10 rounded object-cover"
            />
            <h3 className="text-lg font-bold text-blue-800">Komisyon sou Sèvis Telefòn</h3>
          </div>
          <p className="text-gray-700 mb-3">Nou touche komisyon sou achte sèvis Digicel/Natcom.</p>
          <p className="text-sm text-blue-600 font-semibold">5-8% sou chak tranzaksyon rechaj</p>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Cash withdrawal services" 
              className="w-10 h-10 rounded object-cover"
            />
            <h3 className="text-lg font-bold text-purple-800">Frè sou Retwè Kach</h3>
          </div>
          <p className="text-gray-700 mb-3">Frè sèvis oswa benefis nan chanj.</p>
          <p className="text-sm text-purple-600 font-semibold">2-3% oswa 50-100 goud pa tranzaksyon</p>
        </div>
        
        <div className="bg-indigo-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Advertising and promotions" 
              className="w-10 h-10 rounded object-cover"
            />
            <h3 className="text-lg font-bold text-indigo-800">Anons ak Pwomosyon</h3>
          </div>
          <p className="text-gray-700 mb-3">Biznis ka mete anons sou platfòm lan.</p>
          <p className="text-sm text-indigo-600 font-semibold">5,000-15,000 goud pa mwa pa anonsè</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Pwojeksyon Revni Detaye:</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-semibold mb-2">Sénario Konsèvatè (10 tranzaksyon/jou):</p>
            <ul className="space-y-1">
              <li>Revni pa jou: $150</li>
              <li>Revni pa mwa: $4,500 (571,500 goud)</li>
              <li>Revni pa ane: $54,000 (6,858,000 goud)</li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-semibold mb-2">Sénario Optimis (25 tranzaksyon/jou):</p>
            <ul className="space-y-1">
              <li>Revni pa jou: $375</li>
              <li>Revni pa mwa: $11,250 (1,428,750 goud)</li>
              <li>Revni pa ane: $135,000 (17,145,000 goud)</li>
            </ul>
          </div>
        </div>
        <p className="text-sm opacity-90 mt-4">(1 USD = 127 HTG - Baze sou $15 frè pa $100)</p>
      </div>
    </div>
  );
}
