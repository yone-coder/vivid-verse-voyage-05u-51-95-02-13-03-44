
import React from 'react';

export default function ProblemsChapter() {
  return (
    <div className="space-y-8">
      {/* Problem Overview Image */}
      <div className="mb-6 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1594736797933-d0ea29d24ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Rural Haiti community challenges" 
          className="w-full h-64 object-cover"
        />
      </div>

      <p className="text-lg text-gray-700 mb-6">
        Kominote yo nan zòn tankou Désarmes ak anviwon yo ap fè fas ak plizyè defi ki anpeche yo resevwa 
        sèvis finansye yo bezwen yo. Men pwoblèm prensipal yo:
      </p>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400 flex items-start space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
            alt="Empty office building" 
            className="w-16 h-16 rounded object-cover flex-shrink-0"
          />
          <div>
            <h3 className="text-xl font-bold text-red-800 mb-3">Absans Biwo Transfè Lokal:</h3>
            <p className="text-gray-700 mb-2">
              Pa gen okenn biwo transfè ofisyèl nan zòn tankou Désarmes, sa ki rann li difisil pou moun resevwa lajan.
            </p>
            <p className="text-red-600 font-semibold">
              Moun yo oblije deplase nan zòn yo pa konnen yo, sa ki gen risk ak koûte lajan.
            </p>
          </div>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400 flex items-start space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
            alt="Limited capacity" 
            className="w-16 h-16 rounded object-cover flex-shrink-0"
          />
          <div>
            <h3 className="text-xl font-bold text-orange-800 mb-3">Kapacite Limit MonCash/NatCash:</h3>
            <p className="text-gray-700 mb-2">
              Ti biwo ki egziste yo limite e pa ka reponn ak tout demann lan.
            </p>
            <p className="text-orange-600 font-semibold">
              Chak jou gen kantite moun ki pa ka resevwa lajan yo paske pa gen espas oswa lajan nan kès yo.
            </p>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 flex items-start space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
            alt="Transportation costs" 
            className="w-16 h-16 rounded object-cover flex-shrink-0"
          />
          <div>
            <h3 className="text-xl font-bold text-yellow-800 mb-3">Deplasman Chè ak Fatik:</h3>
            <p className="text-gray-700 mb-2">
              Moun oblije al Vèrèt pou resevwa lajan, sa ki pran tan, koute lajan, epi mete yo an danje.
            </p>
            <p className="text-yellow-600 font-semibold">
              Frè transpò ka rive jiska 300-500 goud, san konte tan ak fatik la.
            </p>
          </div>
        </div>
        
        <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-400 flex items-start space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
            alt="Complex paperwork" 
            className="w-16 h-16 rounded object-cover flex-shrink-0"
          />
          <div>
            <h3 className="text-xl font-bold text-pink-800 mb-3">Pwosesis Konplike:</h3>
            <p className="text-gray-700 mb-2">
              Sèvis tradisyonèl yo mande anpil etap, pran tan, epi konplike pou itilize.
            </p>
            <p className="text-pink-600 font-semibold">
              Moun ki pa abitye ak teknoloji yo rete deyò nan sistèm lan.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Rezilta Pwoblèm yo:</h3>
        <ul className="list-disc ml-6 space-y-2 text-lg">
          <li>Fanmi yo pa ka resevwa lajan yo nan tan</li>
          <li>Frè transpò ak tan ki pèdi yo ogmante koû la</li>
          <li>Risk sekirite nan vwayaj yo</li>
          <li>Aksè limite nan sèvis finansye yo</li>
        </ul>
      </div>
    </div>
  );
}
