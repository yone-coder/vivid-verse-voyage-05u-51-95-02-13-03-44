
import React from 'react';

export default function GlobalTransferPitchDesktop() {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 text-blue-600">Global Transfer</h1>
          <p className="text-3xl font-semibold text-gray-700">Transfè Fasil, Rapid e Sekirize</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-12">
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-blue-600 mb-4 border-b-2 border-blue-100 pb-2">I. Kisa Pwojè a Ye?</h2>
              
              {/* Project Overview Image */}
              <div className="mb-6 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Global money transfer network" 
                  className="w-full h-48 object-cover"
                />
              </div>

              <p className="mb-6 text-lg leading-relaxed">Global Transfer se yon platfòm transfè lajan ki vize bay tout Ayisyen, kit yo an Ayiti oswa aletranje, yon fason fasil, rapid, ak aksesib pou voye lajan, resevwa lajan. Platfòm lan gen plizyè fonksyon:</p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="International transfer" 
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-blue-800 mb-2">Transfè Entènasyonal ak Lokal:</h3>
                    <p className="text-gray-700">Voye lajan soti nan lòt peyi atravè CashApp, Zelle, PayPal, kat kredi oswa transfè bankè. Resevwa lajan an fèt nan biwo lokal Global Transfer nan Lakou Giyas (Weezy Barber Shop), oswa atravè MonCash, NatCash, BNC, Sogebank, BUH.</p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc ml-4">
                      <li>Sipò pou tout gwo platfòm peyman yo</li>
                      <li>Konvèsyon otomatik goud/dola</li>
                      <li>Kominikasyon 24/7</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg flex items-start space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Mobile phone services" 
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-green-800 mb-2">Acha Minit ak Plan Entènèt:</h3>
                    <p className="text-gray-700">Diaspora a ka achte minit telefòn oswa plan entènèt Digicel/Natcom pou fanmi yo ann Ayiti.</p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc ml-4">
                      <li>Rechaj otomatik disponib</li>
                      <li>Plan entènèt ak bonus espesyal</li>
                      <li>Konfigurasyon selon preferans yo</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-red-600 mb-4 border-b-2 border-red-100 pb-2">II. Ki Pwoblèm Nou Vle Rezoud?</h2>
              
              {/* Problem Overview Image */}
              <div className="mb-6 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1594736797933-d0ea29d24ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Rural Haiti community challenges" 
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 flex items-start space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Empty office building" 
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-red-800 mb-2">Absans Biwo Transfè Lokal:</h3>
                    <p className="text-gray-700">Pa gen okenn biwo transfè ofisyèl nan zòn tankou Désarmes, sa ki rann li difisil pou moun resevwa lajan.</p>
                    <p className="text-sm text-red-600 mt-1">Moun yo oblije deplase nan zòn yo pa konnen yo, sa ki gen risk ak koûte lajan.</p>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400 flex items-start space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Limited capacity" 
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-orange-800 mb-2">Kapacite Limit MonCash/NatCash:</h3>
                    <p className="text-gray-700">Ti biwo ki egziste yo limite e pa ka reponn ak tout demann lan.</p>
                    <p className="text-sm text-orange-600 mt-1">Chak jou gen kantite moun ki pa ka resevwa lajan yo paske pa gen espas oswa lajan nan kès yo.</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 flex items-start space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Transportation costs" 
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-yellow-800 mb-2">Deplasman Chè ak Fatik:</h3>
                    <p className="text-gray-700">Moun oblije al Vèrèt pou resevwa lajan, sa ki pran tan, koute lajan, epi mete yo an danje.</p>
                    <p className="text-sm text-yellow-600 mt-1">Frè transpò ka rive jiska 300-500 goud, san konte tan ak fatik la.</p>
                  </div>
                </div>
                
                <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400 flex items-start space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Complex paperwork" 
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-pink-800 mb-2">Pwosesis Konplike nan Sèvis Transfè Tradisyonèl:</h3>
                    <p className="text-gray-700">Sèvis tradisyonèl yo mande anpil etap, pran tan, epi konplike pou itilize.</p>
                    <p className="text-sm text-pink-600 mt-1">Moun ki pa abitye ak teknoloji yo rete deyò nan sistèm lan.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-green-100 p-4 rounded-lg">
                <p className="text-green-800 font-semibold text-lg">Nou vle mete yon solisyon dijital, lokal, e fasil pou tout moun.</p>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-green-600 mb-4 border-b-2 border-green-100 pb-2">III. Plan Finansman (Revenue Model)</h2>
              
              {/* Revenue Model Image */}
              <div className="mb-6 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Financial growth and revenue" 
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Money transfer fees" 
                      className="w-8 h-8 rounded object-cover"
                    />
                    <h3 className="font-bold text-green-800">Frè sou Chak Transfè Lajan</h3>
                  </div>
                  <p className="text-gray-700 mb-2">Egzanp: $15 frè sou chak $100 voye.</p>
                  <p className="text-sm text-green-600">Yo pi ba pase Western Union (18-20%) ak MoneyGram (15-18%)</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Phone services commission" 
                      className="w-8 h-8 rounded object-cover"
                    />
                    <h3 className="font-bold text-blue-800">Frè sou Acha Minit ak Plan Telefòn</h3>
                  </div>
                  <p className="text-gray-700 mb-2">Nou touche komisyon sou achte sèvis Digicel/Natcom.</p>
                  <p className="text-sm text-blue-600">5-8% sou chak tranzaksyon rechaj</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Cash withdrawal services" 
                      className="w-8 h-8 rounded object-cover"
                    />
                    <h3 className="font-bold text-purple-800">Frè sou Retwè Kach</h3>
                  </div>
                  <p className="text-gray-700 mb-2">Posiblite frè sèvis oswa benefis nan chanj.</p>
                  <p className="text-sm text-purple-600">2-3% oswa 50-100 goud pa tranzaksyon</p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Advertising and promotions" 
                      className="w-8 h-8 rounded object-cover"
                    />
                    <h3 className="font-bold text-indigo-800">Anons ak Pwomosyon</h3>
                  </div>
                  <p className="text-gray-700 mb-2">Biznis ka mete anons sou platfòm lan.</p>
                  <p className="text-sm text-indigo-600">5,000-15,000 goud pa mwa pa anonsè</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Pwojeksyon Revni Detaye:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Sénario Konsèvatè (10 tranzaksyon/jou):</p>
                    <p>Revni pa jou: $150</p>
                    <p>Revni pa mwa: $4,500 (571,500 goud)</p>
                    <p>Revni pa ane: $54,000 (6,858,000 goud)</p>
                  </div>
                  <div>
                    <p className="font-semibold">Sénario Optimis (25 tranzaksyon/jou):</p>
                    <p>Revni pa jou: $375</p>
                    <p>Revni pa mwa: $11,250 (1,428,750 goud)</p>
                    <p>Revni pa ane: $135,000 (17,145,000 goud)</p>
                  </div>
                </div>
                <p className="text-xs opacity-90 mt-2">(1 USD = 127 HTG - Depo baz sou $15 frè pa $100)</p>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-purple-600 mb-4 border-b-2 border-purple-100 pb-2">IV. Pitch Deck (Rezime Estratejik)</h2>
              
              {/* Strategy Overview Image */}
              <div className="mb-6 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Business strategy presentation" 
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-4 rounded-lg flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Digital platform" 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <strong className="text-lg">Pwodui:</strong>
                    <p className="mt-1">Platfòm transfè lajan dijital ak sèvis konplèman.</p>
                    <p className="text-sm opacity-90">App mobil + sit entènèt + biwo fizik</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-4 rounded-lg flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Easy solution" 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <strong className="text-lg">Solisyon:</strong>
                    <p className="mt-1">Fasilite voye/resevwa lajan, achte minit, peye fakti.</p>
                    <p className="text-sm opacity-90">Yon platfòm, tout sèvis yo</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white p-4 rounded-lg flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Target market" 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <strong className="text-lg">Mache Sib:</strong>
                    <p className="mt-1">2.5M Ayisyen aletranje + 11M nan peyi a.</p>
                    <p className="text-sm opacity-90">Priyorite sou Désarmes ak anviwon yo</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white p-4 rounded-lg flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Competitive advantage" 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <strong className="text-lg">Konpetisyon:</strong>
                    <p className="mt-1">Pi vit, pi senp, pi fleksib pase Western Union, MoneyGram.</p>
                    <p className="text-sm opacity-90">Sèvis lokal ak konprann kiltirèl</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white p-4 rounded-lg flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Revenue model" 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <strong className="text-lg">Modèl Revni:</strong>
                    <p className="mt-1">Frè transfè (15%), komisyon (5-8%), anons.</p>
                    <p className="text-sm opacity-90">Divèsifikasyon sous revni yo</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-teal-400 to-blue-400 text-white p-4 rounded-lg flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Team leadership" 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <strong className="text-lg">Ekip:</strong>
                    <p className="mt-1">Lidè lokal ak dyaspora ki konekte ak kominote a.</p>
                    <p className="text-sm opacity-90">Ekspètiz teknoloji ak konèsans mache lokal</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-indigo-600 mb-4 border-b-2 border-indigo-100 pb-2">V. Estrateji Kominikasyon</h2>
              
              {/* Communication Strategy Image */}
              <div className="mb-6 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Digital communication strategy" 
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-blue-50 p-4 rounded-lg">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <img 
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Social media" 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-blue-800 mb-2">Kominikasyon dijital:</h3>
                    <p className="text-gray-700 mb-2">Itilizasyon Facebook, WhatsApp, TikTok pou enfòme diaspora a ak fanmi yo an Ayiti.</p>
                    <ul className="text-sm text-gray-600 list-disc ml-4">
                      <li>Pòs regilye ak témwayaj kliyan yo</li>
                      <li>Kowèl ak telefèl ak dyaspora yo</li>
                      <li>Kontan ak edikasyon sou sèvis yo</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 bg-green-50 p-4 rounded-lg">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <img 
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Local advertising" 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-green-800 mb-2">Afichaj lokal:</h3>
                    <p className="text-gray-700 mb-2">Piblisite nan mache, legliz, lekòl, radyo kominotè.</p>
                    <ul className="text-sm text-gray-600 list-disc ml-4">
                      <li>Baniye ak poster nan pwen estratejik yo</li>
                      <li>Anons nan radyo ak televizyon lokal</li>
                      <li>Prezantasyon nan reyinyon kominotè yo</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 bg-purple-50 p-4 rounded-lg">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Local partnerships" 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-purple-800 mb-2">Patnè lokal:</h3>
                    <p className="text-gray-700 mb-2">Kolaborasyon ak biznis, salon, stasyon telefòn pou sèvi kòm pickup station.</p>
                    <ul className="text-sm text-gray-600 list-disc ml-4">
                      <li>Rézo ajan nan kominote yo</li>
                      <li>Komisyon pou patnè yo</li>
                      <li>Fòmasyon ak sipò teknik</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 bg-orange-50 p-4 rounded-lg">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <img 
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Education and training" 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-orange-800 mb-2">Edikasyon:</h3>
                    <p className="text-gray-700 mb-2">Fòmasyon sou kijan pou itilize platfòm lan, espesyalman pou granmoun ak moun ki pa abitye ak teknoloji.</p>
                    <ul className="text-sm text-gray-600 list-disc ml-4">
                      <li>Atelye pratik nan kominote yo</li>
                      <li>Gid vizyèl ak fidèl nan kreyòl</li>
                      <li>Sipò yon sou yon</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-teal-600 mb-4 border-b-2 border-teal-100 pb-2">VI. Plan Operasyon</h2>
              
              {/* Operations Plan Image */}
              <div className="mb-6 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Business operations" 
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-teal-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Main office" 
                      className="w-8 h-8 rounded object-cover"
                    />
                    <h3 className="font-bold text-teal-800">Biwo prensipal:</h3>
                  </div>
                  <p className="text-gray-700 mb-2">Lakou Giyas, anndan Weezy Barber Shop.</p>
                  <p className="text-sm text-gray-600">Espas 200m² ak sekirite 24/7</p>
                </div>
                
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Staff team" 
                      className="w-8 h-8 rounded object-cover"
                    />
                    <h3 className="font-bold text-cyan-800">Staff:</h3>
                  </div>
                  <p className="text-gray-700 mb-2">2 ajan sèvis kliyan, 1 ajan livrezon, 1 teknisyen IT.</p>
                  <p className="text-sm text-gray-600">Plan ekspansyon 8-12 anplwaye nan 6 mwa</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Business hours" 
                      className="w-8 h-8 rounded object-cover"
                    />
                    <h3 className="font-bold text-blue-800">Orè:</h3>
                  </div>
                  <p className="text-gray-700 mb-2">7 jou pa semèn, 8am–5pm.</p>
                  <p className="text-sm text-gray-600">Sipò kliyan 24/7 nan telefòn ak WhatsApp</p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Technology infrastructure" 
                      className="w-8 h-8 rounded object-cover"
                    />
                    <h3 className="font-bold text-indigo-800">Teknoloji:</h3>
                  </div>
                  <p className="text-gray-700 mb-2">Sit entènèt, app mobil, sistèm messagerie pou notifikasyon tranzaksyon.</p>
                  <p className="text-sm text-gray-600">Entegrasyon ak banco yo ak mwayen peyman yo</p>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <img 
                    src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="Security measures" 
                    className="w-8 h-8 rounded object-cover"
                  />
                  <h3 className="font-bold text-purple-800">Sekirite:</h3>
                </div>
                <p className="text-gray-700 mb-2">Verifikasyon ID, kòd tranzaksyon, pwoteksyon done kliyan.</p>
                <ul className="text-sm text-gray-600 list-disc ml-4">
                  <li>Sistèm kamera ak monitoring</li>
                  <li>Asiran ak vault sekirize</li>
                  <li>Protokòl sekirite strict</li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        {/* Full Width Sections */}
        <div className="mt-12 space-y-12">
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-red-600 mb-6 text-center border-b-2 border-red-100 pb-4">VII. Risk ak Solisyon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
                <h3 className="font-bold text-red-800 mb-3 text-lg">Risk Teknolojik:</h3>
                <p className="text-gray-700 mb-3">Pan teknoloji oswa erè sistèm.</p>
                <div className="bg-green-100 p-3 rounded">
                  <strong className="text-green-800">Solisyon:</strong>
                  <span className="text-green-700 ml-2">Siveyans regilye, backup done, teknisyen IT disponib.</span>
                </div>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
                <h3 className="font-bold text-orange-800 mb-3 text-lg">Risk Legal:</h3>
                <p className="text-gray-700 mb-3">Regilasyon sou transfè lajan oswa lisans finansye.</p>
                <div className="bg-green-100 p-3 rounded">
                  <strong className="text-green-800">Solisyon:</strong>
                  <span className="text-green-700 ml-2">Travay ak avoka lokal, verifye tout dokiman legal.</span>
                </div>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <h3 className="font-bold text-yellow-800 mb-3 text-lg">Risk Ensekirite:</h3>
                <p className="text-gray-700 mb-3">Fatra, vòl oswa menas pou anplwaye.</p>
                <div className="bg-green-100 p-3 rounded">
                  <strong className="text-green-800">Solisyon:</strong>
                  <span className="text-green-700 ml-2">Biwo sekirize, kolaborasyon ak otorite lokal.</span>
                </div>
              </div>
              <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-400">
                <h3 className="font-bold text-pink-800 mb-3 text-lg">Risk Lajan pa Rive:</h3>
                <p className="text-gray-700 mb-3">Pwoblèm ak mwayen transfè.</p>
                <div className="bg-green-100 p-3 rounded">
                  <strong className="text-green-800">Solisyon:</strong>
                  <span className="text-green-700 ml-2">Notifikasyon otomatik, sèvis kliyan aktif.</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-600 mb-6 text-center border-b-2 border-green-100 pb-4">VIII. Evalyasyon ak Suivi</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-800 mb-4">Endikatè kle:</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li className="text-gray-700">Nimewo tranzaksyon/jou</li>
                  <li className="text-gray-700">Tan mwayen pou resevwa lajan</li>
                  <li className="text-gray-700">Nimewo kliyan aktif</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Metòd Suivi:</h3>
                <p className="text-gray-700">Rapo chak semèn ak chak mwa, Sondaj satisfaksyon kliyan, Feedback regilye sou sèvis yo</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-800 mb-4">Plan Ajisteman:</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li className="text-gray-700">Si sèvis pa mache byen nan zòn, mete nouvo ajan</li>
                  <li className="text-gray-700">Ajiste frè oswa ofri promo pou atire plis kliyan</li>
                  <li className="text-gray-700">Mete nouvo fonksyon selon bezwen kliyan yo (ex: achte tikè, peye lekòl)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">IX. Konklizyon</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              Global Transfer se plis pase yon sèvis voye lajan. Li se yon zouti devlopman ekonomik pou kominote a. 
              Avèk yon solisyon dijital, fleksib, sekirize ak lokal, nou mete kontwòl ekonomi an nan men Ayisyen yo. 
              Se pa sèlman yon biznis, se yon mouvman.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
