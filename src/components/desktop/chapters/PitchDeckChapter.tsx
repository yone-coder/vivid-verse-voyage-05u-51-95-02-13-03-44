
import React from 'react';

export default function PitchDeckChapter() {
  return (
    <div className="space-y-8">
      {/* Strategy Overview Image */}
      <div className="mb-6 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Business strategy presentation" 
          className="w-full h-64 object-cover"
        />
      </div>

      <p className="text-lg text-gray-700 mb-6">
        Rezime estratejik la montre kijan Global Transfer pozisyone l kòm yon solisyon revolisyonè 
        nan mache transfè lajan Ayiti a.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-6 rounded-lg flex items-center space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Digital platform" 
            className="w-16 h-16 rounded object-cover"
          />
          <div>
            <strong className="text-xl">Pwodui:</strong>
            <p className="mt-1 text-lg">Platfòm transfè lajan dijital ak sèvis konplèman.</p>
            <p className="text-sm opacity-90">App mobil + sit entènèt + biwo fizik</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-6 rounded-lg flex items-center space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Easy solution" 
            className="w-16 h-16 rounded object-cover"
          />
          <div>
            <strong className="text-xl">Solisyon:</strong>
            <p className="mt-1 text-lg">Fasilite voye/resevwa lajan, achte minit, peye fakti.</p>
            <p className="text-sm opacity-90">Yon platfòm, tout sèvis yo</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white p-6 rounded-lg flex items-center space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Target market" 
            className="w-16 h-16 rounded object-cover"
          />
          <div>
            <strong className="text-xl">Mache Sib:</strong>
            <p className="mt-1 text-lg">2.5M Ayisyen aletranje + 11M nan peyi a.</p>
            <p className="text-sm opacity-90">Priyorite sou Désarmes ak anviwon yo</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white p-6 rounded-lg flex items-center space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Competitive advantage" 
            className="w-16 h-16 rounded object-cover"
          />
          <div>
            <strong className="text-xl">Konpetisyon:</strong>
            <p className="mt-1 text-lg">Pi vit, pi senp, pi fleksib pase Western Union, MoneyGram.</p>
            <p className="text-sm opacity-90">Sèvis lokal ak konprann kiltirèl</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white p-6 rounded-lg flex items-center space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Revenue model" 
            className="w-16 h-16 rounded object-cover"
          />
          <div>
            <strong className="text-xl">Modèl Revni:</strong>
            <p className="mt-1 text-lg">Frè transfè (15%), komisyon (5-8%), anons.</p>
            <p className="text-sm opacity-90">Divèsifikasyon sous revni yo</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-teal-400 to-blue-400 text-white p-6 rounded-lg flex items-center space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Team leadership" 
            className="w-16 h-16 rounded object-cover"
          />
          <div>
            <strong className="text-xl">Ekip:</strong>
            <p className="mt-1 text-lg">Lidè lokal ak dyaspora ki konekte ak kominote a.</p>
            <p className="text-sm opacity-90">Ekspètiz teknoloji ak konèsans mache lokal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
