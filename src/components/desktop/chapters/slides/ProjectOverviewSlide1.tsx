
import React from 'react';
import { Globe } from 'lucide-react';

export default function ProjectOverviewSlide1() {
  return (
    <div className="space-y-8">
      {/* Full-width Global Transfer Image */}
      <div className="mb-8 rounded-lg overflow-hidden">
        <img 
          src="/lovable-uploads/5b975243-9b1f-4c96-9ed4-53fb345fed58.png" 
          alt="Global Transfer - Voye lajan fasil, resevwa rapidman – kote ou vle, lè ou vle" 
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Hero Section */}
      <div className="mb-8 rounded-lg overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="flex items-center mb-6">
          <Globe className="w-12 h-12 mr-4" />
          <div>
            <h1 className="text-3xl font-bold mb-2">🌍 Kijan pou voye lajan avèk Global Transfer</h1>
            <p className="text-xl opacity-90">Yon sèvis transfè lajan ki fè pati biznis MimaHT</p>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <p className="text-lg leading-relaxed">
            Global Transfer se yon platfòm transfè lajan ki vize bay tout Ayisyen, kit yo an Ayiti oswa aletranje, 
            yon fason fasil, rapid, ak aksesib pou voye lajan, resevwa lajan. Platfòm lan gen plizyè fonksyon ak 
            yon pwosesis senp ki gen 5 etap yo.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
        <h3 className="text-2xl font-bold mb-4">📦 Global Transfer – Yon Sèvis Transfè Lajan MimaHT</h3>
        <p className="text-xl mb-6">
          Ale sou 👉 <span className="font-bold underline">transfer.mimaht.com</span> oswa telechaje 
          <span className="font-bold"> Global Transfer</span> sou Play Store pou kòmanse.
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h4 className="text-lg font-bold mb-2">💡 Vle m prepare tout vizyèl yo?</h4>
          <p className="text-sm opacity-90">
            Si ou voye: Logo ou (MimaHT ak Global Transfer), Koulè w itilize, Screenshot app oswa sit, 
            Foto biwo transfè a (si disponib)
          </p>
        </div>
      </div>
    </div>
  );
}
