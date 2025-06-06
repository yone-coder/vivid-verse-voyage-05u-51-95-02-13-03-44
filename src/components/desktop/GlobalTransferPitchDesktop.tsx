
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
              <p className="mb-6 text-lg leading-relaxed">Global Transfer se yon platfòm transfè lajan ki vize bay tout Ayisyen, kit yo an Ayiti oswa aletranje, yon fason fasil, rapid, ak aksesib pou voye lajan, resevwa lajan. Platfòm lan gen plizyè fonksyon:</p>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">Transfè Entènasyonal ak Lokal:</h3>
                  <p className="text-gray-700">Voye lajan soti nan lòt peyi atravè CashApp, Zelle, PayPal, kat kredi oswa transfè bankè. Resevwa lajan an fèt nan biwo lokal Global Transfer nan Lakou Giyas (Weezy Barber Shop), oswa atravè MonCash, NatCash, BNC, Sogebank, BUH.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">Acha Minit ak Plan Entènèt:</h3>
                  <p className="text-gray-700">Diaspora a ka achte minit telefòn oswa plan entènèt Digicel/Natcom pou fanmi yo ann Ayiti.</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-red-600 mb-4 border-b-2 border-red-100 pb-2">II. Ki Pwoblèm Nou Vle Rezoud?</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                  <h3 className="font-bold text-red-800 mb-2">Absans Biwo Transfè Lokal:</h3>
                  <p className="text-gray-700">Pa gen okenn biwo transfè ofisyèl nan zòn tankou Désarmes, sa ki rann li difisil pou moun resevwa lajan.</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                  <h3 className="font-bold text-orange-800 mb-2">Kapacite Limit MonCash/NatCash:</h3>
                  <p className="text-gray-700">Ti biwo ki egziste yo limite e pa ka reponn ak tout demann lan.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h3 className="font-bold text-yellow-800 mb-2">Deplasman Chè ak Fatik:</h3>
                  <p className="text-gray-700">Moun oblije al Vèrèt pou resevwa lajan, sa ki pran tan, koute lajan, epi mete yo an danje.</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400">
                  <h3 className="font-bold text-pink-800 mb-2">Pwosesis Konplike nan Sèvis Transfè Tradisyonèl:</h3>
                  <p className="text-gray-700">Sèvis tradisyonèl yo mande anpil etap, pran tan, epi konplike pou itilize.</p>
                </div>
              </div>
              <div className="mt-6 bg-green-100 p-4 rounded-lg">
                <p className="text-green-800 font-semibold text-lg">Nou vle mete yon solisyon dijital, lokal, e fasil pou tout moun.</p>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-green-600 mb-4 border-b-2 border-green-100 pb-2">III. Plan Finansman (Revenue Model)</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">Frè sou Chak Transfè Lajan</h3>
                  <p className="text-gray-700">Egzanp: $15 frè sou chak $100 voye.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">Frè sou Acha Minit ak Plan Telefòn</h3>
                  <p className="text-gray-700">Nou touche komisyon sou achte sèvis Digicel/Natcom.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-purple-800 mb-2">Frè sou Retwè Kach</h3>
                  <p className="text-gray-700">Posiblite frè sèvis oswa benefis nan chanj.</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-bold text-indigo-800 mb-2">Anons ak Pwomosyon</h3>
                  <p className="text-gray-700">Biznis ka mete anons sou platfòm lan.</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Egzanp pwofi:</h3>
                <p className="text-lg">Si 10 moun voye $100 chak jou, ak $15 frè chak:</p>
                <p className="text-2xl font-bold">150 × 30 = $4,500 pa mwa = 571,500 goud</p>
                <p className="text-sm opacity-90">(1 USD = 127 HTG)</p>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-purple-600 mb-4 border-b-2 border-purple-100 pb-2">IV. Pitch Deck (Rezime Estratejik)</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-4 rounded-lg">
                  <strong className="text-lg">Pwodui:</strong>
                  <p className="mt-1">Platfòm transfè lajan.</p>
                </div>
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-4 rounded-lg">
                  <strong className="text-lg">Solisyon:</strong>
                  <p className="mt-1">Fasilite voye/recevwa lajan, achte minit.</p>
                </div>
                <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white p-4 rounded-lg">
                  <strong className="text-lg">Mache Sib:</strong>
                  <p className="mt-1">Diaspora Ayisyèn + moun an Ayiti.</p>
                </div>
                <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white p-4 rounded-lg">
                  <strong className="text-lg">Konpetisyon:</strong>
                  <p className="mt-1">Pi vit, pi senp, pi fleksib pase Western Union, MoneyGram.</p>
                </div>
                <div className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white p-4 rounded-lg">
                  <strong className="text-lg">Modèl Revni:</strong>
                  <p className="mt-1">Frè sou transfè, komisyon sou sèvis, anons.</p>
                </div>
                <div className="bg-gradient-to-r from-teal-400 to-blue-400 text-white p-4 rounded-lg">
                  <strong className="text-lg">Ekip:</strong>
                  <p className="mt-1">Lidè lokal ak dyaspora ki konekte ak kominote a.</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-indigo-600 mb-4 border-b-2 border-indigo-100 pb-2">V. Estrateji Kominikasyon</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-blue-50 p-4 rounded-lg">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-blue-800 mb-2">Kominikasyon dijital:</h3>
                    <p className="text-gray-700">Itilizasyon Facebook, WhatsApp, TikTok pou enfòme diaspora a ak fanmi yo an Ayiti.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-green-50 p-4 rounded-lg">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-green-800 mb-2">Afichaj lokal:</h3>
                    <p className="text-gray-700">Piblisite nan mache, legliz, lekòl, radyo kominotè.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-purple-50 p-4 rounded-lg">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-purple-800 mb-2">Patnè lokal:</h3>
                    <p className="text-gray-700">Kolaborasyon ak biznis, salon, stasyon telefòn pou sèvi kòm pickup station.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-orange-50 p-4 rounded-lg">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-bold text-orange-800 mb-2">Edikasyon:</h3>
                    <p className="text-gray-700">Fòmasyon sou kijan pou itilize platfòm lan, espesyalman pou granmoun ak moun ki pa abitye ak teknoloji.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-teal-600 mb-4 border-b-2 border-teal-100 pb-2">VI. Plan Operasyon</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h3 className="font-bold text-teal-800 mb-2">Biwo prensipal:</h3>
                  <p className="text-gray-700">Lakou Giyas, anndan Weezy Barber Shop.</p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h3 className="font-bold text-cyan-800 mb-2">Staff:</h3>
                  <p className="text-gray-700">2 ajan sèvis kliyan, 1 ajan livrezon, 1 teknisyen IT.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">Orè:</h3>
                  <p className="text-gray-700">7 jou pa semèn, 8am–5pm.</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-bold text-indigo-800 mb-2">Teknoloji:</h3>
                  <p className="text-gray-700">Sit entènèt, app mobil, sistèm messagerie pou notifikasyon tranzaksyon.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg col-span-2">
                  <h3 className="font-bold text-purple-800 mb-2">Sekirite:</h3>
                  <p className="text-gray-700">Verifikasyon ID, kòd tranzaksyon, pwoteksyon done kliyan.</p>
                </div>
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
