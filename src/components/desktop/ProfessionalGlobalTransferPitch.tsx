
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Presentation, Target, DollarSign, Users, TrendingUp, Shield, Award, CheckCircle } from 'lucide-react';

const slides = [
  {
    id: 1,
    type: 'title',
    title: 'Global Transfer',
    subtitle: 'Revolisyonè Transfè Lajan nan Ayiti',
    tagline: 'Fasil • Rapid • Sekirize',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-blue-900 via-blue-800 to-purple-900'
  },
  {
    id: 2,
    type: 'problem',
    title: 'Pwoblèm yo nan Mache a',
    subtitle: 'Defi yo nan Sistèm Transfè Lajan Ayiti a',
    points: [
      { icon: Target, text: 'Pa gen okenn biwo transfè nan Désarmes ak anviwon yo', impact: '2M+ moun afekte' },
      { icon: Shield, text: 'MonCash/NatCash gen limite ak aksè', impact: '60% nan popilasyon an' },
      { icon: TrendingUp, text: 'Frè Western Union ak MoneyGram twò chè', impact: '8-15% nan montant lan' },
      { icon: Users, text: 'Deplasman ki danje ak koute chè', impact: '3-4 èdtan chak fwa' }
    ],
    stats: {
      title: 'Estatistik Enpòtan',
      data: [
        { label: 'Dyaspora Ayisyèn', value: '2.5M', unit: 'moun' },
        { label: 'Remittances 2023', value: '$3.8B', unit: 'USD' },
        { label: 'Frè Mwayen', value: '12%', unit: 'nan total' }
      ]
    }
  },
  {
    id: 3,
    type: 'solution',
    title: 'Solisyon Global Transfer',
    subtitle: 'Yon Platfòm Konplè ak Entegre',
    features: [
      {
        icon: DollarSign,
        title: 'Transfè Rapid',
        description: 'Voye lajan nan mwens pase 30 minit',
        details: ['CashApp, Zelle, PayPal', 'Kat kredi ak bank transfer', 'Kominikasyon otomatik']
      },
      {
        icon: Users,
        title: 'Pickup Lokal',
        description: 'Resevwa lajan nan biwo nou an nan Lakou Giyas',
        details: ['MonCash ak NatCash', 'Bank direktèman', 'Kach fizik']
      },
      {
        icon: TrendingUp,
        title: 'Sèvis Konplèman',
        description: 'Acha minit ak plan entènèt',
        details: ['Digicel ak Natcom', 'Plan entènèt', 'Peye fakti']
      }
    ]
  },
  {
    id: 4,
    type: 'market',
    title: 'Opòtinite Mache a',
    subtitle: 'Yon Mache ki gen Potansyèl Enòm',
    marketData: {
      total: {
        title: 'Mache Total',
        value: '$3.8B',
        description: 'Remittances Ayiti 2023'
      },
      target: {
        title: 'Mache Sib',
        value: '500K',
        description: 'Diaspora nan Òganizasyon nou yo'
      },
      projected: {
        title: 'Pwojeksyon 5 Ane',
        value: '$50M',
        description: 'Volim tranzaksyon nou yo'
      }
    },
    demographics: [
      { region: 'USA/Canada', population: '1.5M', percentage: 60 },
      { region: 'Ayiti (Artibonite)', population: '800K', percentage: 32 },
      { region: 'Lòt Peyi', population: '200K', percentage: 8 }
    ]
  },
  {
    id: 5,
    type: 'business-model',
    title: 'Modèl Biznis ak Revni',
    subtitle: 'Estrateji Finansman Dirab',
    revenueStreams: [
      {
        title: 'Frè Transfè',
        percentage: 70,
        amount: '$15',
        description: 'Sou chak $100 ki voye',
        projection: '$2.1M/ane'
      },
      {
        title: 'Komisyon Minit',
        percentage: 20,
        amount: '8%',
        description: 'Sou acha minit ak plan',
        projection: '$600K/ane'
      },
      {
        title: 'Sèvis Konplèman',
        percentage: 10,
        amount: 'Variable',
        description: 'Anons ak patnèrya',
        projection: '$300K/ane'
      }
    ],
    projections: {
      year1: { transactions: 12000, revenue: '$1.2M' },
      year3: { transactions: 50000, revenue: '$3.5M' },
      year5: { transactions: 120000, revenue: '$8.2M' }
    }
  },
  {
    id: 6,
    type: 'competitive-advantage',
    title: 'Avantaj Konpetitif',
    subtitle: 'Kisa ki fè nou diferan ak pi bon',
    advantages: [
      {
        title: 'Koneksyon Lokal',
        description: 'Nou gen prèsans fizik nan kominote a',
        icon: Users,
        benefit: '3x pi rapid pase konpetisyon'
      },
      {
        title: 'Teknoloji Modèn',
        description: 'App ak platfòm dijital entegre',
        icon: TrendingUp,
        benefit: '50% pi bon eksperyans itilizatè'
      },
      {
        title: 'Frè Konpetitif',
        description: 'Pi ba pase Western Union ak MoneyGram',
        icon: DollarSign,
        benefit: '30% pi bon pri'
      },
      {
        title: 'Sèvis 24/7',
        description: 'Sipò ak aksè nan tout moman',
        icon: Shield,
        benefit: 'Aksè san limit'
      }
    ]
  },
  {
    id: 7,
    type: 'team',
    title: 'Ekip ak Lidèrship',
    subtitle: 'Yon Ekip ki gen Ekspètiz ak Vizyon',
    team: [
      {
        name: 'Fondatè/CEO',
        role: 'Estrateji ak Operasyon',
        experience: '10+ ane nan fintech',
        expertise: 'Konèsans pwofon mache Ayiti a'
      },
      {
        name: 'CTO',
        role: 'Teknoloji ak Devlopman',
        experience: '8+ ane nan platfòm peman',
        expertise: 'Sistèm sekirite ak skalabilite'
      },
      {
        name: 'Head of Operations',
        role: 'Operasyon ak Kominotè',
        experience: '5+ ane nan Ayiti',
        expertise: 'Rezo lokal ak patnèrya'
      }
    ]
  },
  {
    id: 8,
    type: 'financial-projections',
    title: 'Pwojeksyon Finansye',
    subtitle: 'Kwoissance ak Pwofi Pwojete',
    metrics: [
      {
        year: 'Ane 1',
        users: '2,500',
        transactions: '12K',
        revenue: '$1.2M',
        profit: '$200K'
      },
      {
        year: 'Ane 2',
        users: '8,000',
        transactions: '25K',
        revenue: '$2.1M',
        profit: '$400K'
      },
      {
        year: 'Ane 3',
        users: '15,000',
        transactions: '50K',
        revenue: '$3.5M',
        profit: '$800K'
      },
      {
        year: 'Ane 5',
        users: '35,000',
        transactions: '120K',
        revenue: '$8.2M',
        profit: '$2.1M'
      }
    ]
  },
  {
    id: 9,
    type: 'call-to-action',
    title: 'Kòmanse Jounen an',
    subtitle: 'Yon Opòtinite pou Revolisyonè Transfè Lajan nan Ayiti',
    goals: [
      'Etabli prèsans nan Artibonite ak Désarmes',
      'Kreye 50+ opòtinite travay lokal',
      'Fasilite $10M+ nan transfè premye ane a',
      'Ekspanse nan lòt depatman yo'
    ],
    nextSteps: [
      { step: 1, action: 'Finalise lisans ak otorizasyon', timeline: '30 jou' },
      { step: 2, action: 'Etabli patnèrya ak MonCash/NatCash', timeline: '45 jou' },
      { step: 3, action: 'Konstwi biwo ak rekrite ekip', timeline: '60 jou' },
      { step: 4, action: 'Lanse beta ak 100 kliyan', timeline: '90 jou' }
    ]
  }
];

export default function ProfessionalGlobalTransferPitch() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const currentSlideData = slides[currentSlide];
  
  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const goToPreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const renderSlideContent = () => {
    const slide = currentSlideData;

    switch (slide.type) {
      case 'title':
        return (
          <div className={`min-h-screen bg-gradient-to-br ${slide.gradient} flex items-center justify-center text-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0">
              <img src={slide.image} alt="" className="w-full h-full object-cover opacity-20" />
            </div>
            <div className="relative z-10 text-center max-w-4xl px-8">
              <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-3xl font-light mb-8 text-blue-100">{slide.subtitle}</p>
              <div className="flex items-center justify-center space-x-4 text-xl font-medium">
                {slide.tagline.split(' • ').map((tag, index) => (
                  <React.Fragment key={tag}>
                    <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">{tag}</span>
                    {index < 2 && <span className="text-blue-200">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        );

      case 'problem':
        return (
          <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">{slide.title}</h1>
                <p className="text-2xl text-gray-600">{slide.subtitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-16">
                {slide.points.map((point, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-3 rounded-xl">
                        <point.icon className="w-8 h-8 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{point.text}</h3>
                        <div className="bg-red-50 px-4 py-2 rounded-lg">
                          <span className="text-red-700 font-medium">{point.impact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h3 className="text-2xl font-bold text-center mb-8">{slide.stats.title}</h3>
                <div className="grid grid-cols-3 gap-8">
                  {slide.stats.data.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
                      <div className="text-sm text-gray-500 uppercase tracking-wide">{stat.unit}</div>
                      <div className="text-lg text-gray-700 mt-2">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'solution':
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">{slide.title}</h1>
                <p className="text-2xl text-gray-600">{slide.subtitle}</p>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {slide.features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
                    <div className="bg-green-100 p-4 rounded-xl w-fit mb-6">
                      <feature.icon className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'market':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">{slide.title}</h1>
                <p className="text-2xl text-gray-600">{slide.subtitle}</p>
              </div>

              <div className="grid grid-cols-3 gap-8 mb-16">
                {Object.values(slide.marketData).map((data, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-600 mb-4">{data.title}</h3>
                    <div className="text-5xl font-bold text-blue-600 mb-4">{data.value}</div>
                    <p className="text-gray-700">{data.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h3 className="text-2xl font-bold text-center mb-8">Distribisyon Jeyografik</h3>
                <div className="space-y-6">
                  {slide.demographics.map((demo, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-900">{demo.region}</span>
                          <span className="text-lg font-bold text-blue-600">{demo.population}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${demo.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="ml-4 text-lg font-semibold text-gray-600">
                        {demo.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'business-model':
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">{slide.title}</h1>
                <p className="text-2xl text-gray-600">{slide.subtitle}</p>
              </div>

              <div className="grid grid-cols-3 gap-8 mb-16">
                {slide.revenueStreams.map((stream, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{stream.title}</h3>
                      <div className="text-3xl font-bold text-purple-600">{stream.percentage}%</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-700 mb-2">{stream.amount}</div>
                    <p className="text-gray-600 mb-4">{stream.description}</p>
                    <div className="bg-purple-50 px-4 py-2 rounded-lg">
                      <span className="text-purple-700 font-semibold">{stream.projection}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h3 className="text-2xl font-bold text-center mb-8">Pwojeksyon Kwoissance</h3>
                <div className="grid grid-cols-3 gap-8">
                  {Object.values(slide.projections).map((proj, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-semibold text-gray-600 mb-4">
                        Ane {index + 1 === 2 ? 3 : index + 1 === 3 ? 5 : index + 1}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{proj.transactions}</div>
                          <div className="text-sm text-gray-500">Tranzaksyon</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-green-600">{proj.revenue}</div>
                          <div className="text-sm text-gray-500">Revni</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'competitive-advantage':
        return (
          <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">{slide.title}</h1>
                <p className="text-2xl text-gray-600">{slide.subtitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {slide.advantages.map((advantage, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-start space-x-6">
                      <div className="bg-indigo-100 p-4 rounded-xl">
                        <advantage.icon className="w-10 h-10 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                        <p className="text-lg text-gray-600 mb-4">{advantage.description}</p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="text-green-700 font-semibold flex items-center">
                            <Award className="w-5 h-5 mr-2" />
                            {advantage.benefit}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50 p-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">{slide.title}</h1>
                <p className="text-2xl text-gray-600">{slide.subtitle}</p>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {slide.team.map((member, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-shadow">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{member.name}</h3>
                    <div className="text-lg text-blue-600 font-semibold text-center mb-4">{member.role}</div>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm font-semibold text-gray-700 mb-1">Eksperyans</div>
                        <div className="text-gray-600">{member.experience}</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm font-semibold text-blue-700 mb-1">Ekspètiz</div>
                        <div className="text-blue-600">{member.expertise}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'financial-projections':
        return (
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">{slide.title}</h1>
                <p className="text-2xl text-gray-600">{slide.subtitle}</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <div className="grid grid-cols-4 gap-8">
                  {slide.metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">{metric.year}</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{metric.users}</div>
                          <div className="text-sm text-gray-600">Itilizatè</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{metric.transactions}</div>
                          <div className="text-sm text-gray-600">Tranzaksyon</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{metric.revenue}</div>
                          <div className="text-sm text-gray-600">Revni</div>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-emerald-600">{metric.profit}</div>
                          <div className="text-sm text-gray-600">Pwofi</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'call-to-action':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white p-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-2xl text-blue-100">{slide.subtitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-16">
                <div>
                  <h3 className="text-3xl font-bold mb-8">Objektif yo</h3>
                  <div className="space-y-4">
                    {slide.goals.map((goal, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="bg-green-500 rounded-full p-1 mt-1">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <span className="text-lg">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-bold mb-8">Pwochen Etap yo</h3>
                  <div className="space-y-6">
                    {slide.nextSteps.map((step, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <div className="text-lg font-semibold mb-2">{step.action}</div>
                            <div className="text-blue-200">{step.timeline}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-16">
                <div className="text-4xl font-bold mb-4">Ann Travay Ansanm!</div>
                <div className="text-xl text-blue-100">Pou yon Sistèm Transfè Lajan ki pi Bon nan Ayiti</div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown slide type</div>;
    }
  };

  return (
    <div className="relative">
      {/* Slide Content */}
      <div className="animate-fade-in">
        {renderSlideContent()}
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-4">
          <Button
            onClick={goToPreviousSlide}
            disabled={currentSlide === 0}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={goToNextSlide}
            disabled={currentSlide === slides.length - 1}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Slide Counter */}
      <div className="fixed top-8 right-8 z-50">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
          <span className="font-semibold">{currentSlide + 1}</span>
          <span className="text-white/70"> / {slides.length}</span>
        </div>
      </div>

      {/* Presentation Icon */}
      <div className="fixed top-8 left-8 z-50">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white">
          <Presentation className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
