
import React from 'react';
import { Globe, Smartphone, CreditCard, Receipt, MapPin, Shield } from 'lucide-react';

export default function ProjectOverviewChapter() {
  return (
    <div className="space-y-8">
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

      {/* Step-by-step Process */}
      <div className="space-y-8">
        {/* Step 1 */}
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
          <div className="flex items-start space-x-4 mb-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-800 mb-3">✅ Ale sou sit entènèt la oswa telechaje aplikasyon an</h3>
              <p className="text-gray-700 mb-4">
                Ou ka voye lajan bay fanmi ak zanmi w ann Ayiti atravè:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Globe className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-semibold">Sit entènèt:</span>
                  </div>
                  <p className="text-blue-600 font-medium">https://transfer.mimaht.com</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Smartphone className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-semibold">Aplikasyon:</span>
                  </div>
                  <p className="text-green-600 font-medium">Global Transfer sou Play Store</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-2 border-dashed border-blue-300">
            <div className="text-center py-8">
              <img 
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Screenshot sit Global Transfer ak app sou Play Store" 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600 italic">Screenshot sit la ak app la sou Play Store (Global Transfer)</p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
          <div className="flex items-start space-x-4 mb-4">
            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-green-800 mb-3">✅ Ranpli enfòmasyon sou moun k ap resevwa a</h3>
              <p className="text-gray-700 mb-4">Mete:</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                <li>Non konplè moun k ap resevwa a</li>
                <li>Nimewo telefòn li</li>
                <li>Vil kote li ye</li>
                <li>Kantite lajan ou vle voye</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-2 border-dashed border-green-300">
            <div className="text-center py-8">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Screenshot fòm transfè sou sit oswa app" 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600 italic">Screenshot fòm transfè a sou sit oswa app</p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
          <div className="flex items-start space-x-4 mb-4">
            <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-purple-800 mb-3">✅ Peye ak kat kredi oswa kat dèbi ou</h3>
              <p className="text-gray-700 mb-4">Nou aksepte tout gwo kat entènasyonal:</p>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <span className="font-semibold text-blue-600">Visa</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <CreditCard className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <span className="font-semibold text-red-600">MasterCard</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <CreditCard className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <span className="font-semibold text-gray-600">Lòt kat</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-2 border-dashed border-purple-300">
            <div className="text-center py-8">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Screenshot paj peman an" 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600 italic">Screenshot paj peman an</p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
          <div className="flex items-start space-x-4 mb-4">
            <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-orange-800 mb-3">✅ Resevwa yon resi transfè</h3>
              <p className="text-gray-700 mb-4">Apre ou fin peye, ou resevwa yon resi ki gen tout detay yo:</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                <li>Nimewo transfè a</li>
                <li>Non moun k ap resevwa a</li>
                <li>Kantite lajan an</li>
                <li>Dat ak kòd referans</li>
              </ul>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700">📤 Ou ka telechaje l oswa voye bay moun nan.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-2 border-dashed border-orange-300">
            <div className="text-center py-8">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Screenshot resi ak nimewo transfè" 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600 italic">Screenshot resi a ak nimewo transfè sou li</p>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-400">
          <div className="flex items-start space-x-4 mb-4">
            <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-teal-800 mb-3">✅ Moun k ap resevwa a vin pran lajan li nan biwo nou</h3>
              <p className="text-gray-700 mb-4">Pou moun lan ka pran lajan an, li dwe:</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                <li>Prezante nimewo transfè a</li>
                <li>Mete yon kat idantite (CIN, paspò, elatriye)</li>
              </ul>
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                <MapPin className="w-5 h-5 text-teal-600 mr-2" />
                <p className="text-gray-700 font-medium">📍 Lajan an ranmase sèlman nan biwo transfè MimaHT.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-2 border-dashed border-teal-300">
            <div className="text-center py-8">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Foto moun nan ak kat idantite nan biwo a" 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600 italic">Foto oswa grafik moun nan ak kat idantite nan biwo a</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Shield className="w-8 h-8 text-green-400 mr-3" />
          <h3 className="text-xl font-bold">🔐 Sekirite ak Konfidansyalite</h3>
        </div>
        <ul className="space-y-2 text-lg">
          <li>• Tout done yo sekirize</li>
          <li>• Se sèlman moun ki gen nimewo transfè + ID ki ka ranmase lajan an</li>
          <li>• Pa gen transfè pa telefòn oswa livrezon lakay – biwo sèlman</li>
        </ul>
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
