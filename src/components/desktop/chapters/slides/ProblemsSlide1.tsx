
import React from 'react';

export default function ProblemsSlide1() {
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

      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-red-600">Defi yo nan Kominote yo</h2>
        
        <p className="text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto">
          Kominote yo nan zòn tankou Désarmes ak anviwon yo ap fè fas ak plizyè defi ki anpeche yo resevwa 
          sèvis finansye yo bezwen yo. Men pwoblèm prensipal yo ki gen yon gwo enpak sou lavi chak jou:
        </p>

        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Sitiyasyon Aktyèl la</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="text-lg font-semibold mb-2">📍 Zòn ki Konsènen:</h4>
              <ul className="space-y-1">
                <li>• Désarmes ak anviwon yo</li>
                <li>• Kominote riral yo</li>
                <li>• Zòn ki gen aksè limite</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">👥 Moun ki Afekte:</h4>
              <ul className="space-y-1">
                <li>• Fanmi ki resevwa remitans</li>
                <li>• Moun ki pa gen aksè nan teknoloji</li>
                <li>• Kominote ki izole yo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
