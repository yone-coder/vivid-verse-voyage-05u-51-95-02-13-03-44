
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronRight, 
  ChevronLeft,
  DollarSign, 
  TrendingUp, 
  Users, 
  Globe, 
  Shield, 
  Zap,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  CheckCircle,
  ArrowUpRight,
  PlayCircle,
  FileText,
  Presentation,
  Download
} from 'lucide-react';
import GlobalTransferPitchChapters from './GlobalTransferPitchChapters';

export default function ProfessionalGlobalTransferPitch() {
  const [currentView, setCurrentView] = useState<'overview' | 'chapters'>('overview');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Key metrics and data
  const keyMetrics = [
    { label: "Market Size", value: "$2.5B", subtitle: "Haiti remittance market", icon: Globe, color: "blue" },
    { label: "Target Users", value: "2.5M+", subtitle: "Haitian diaspora", icon: Users, color: "green" },
    { label: "Revenue Goal", value: "$571K", subtitle: "Year 1 projection", icon: DollarSign, color: "purple" },
    { label: "Break-even", value: "8 months", subtitle: "Expected timeline", icon: Calendar, color: "orange" }
  ];

  const competitiveAdvantages = [
    { title: "Local Presence", description: "Physical locations in underserved areas", icon: Target },
    { title: "Digital Integration", description: "Modern app with traditional pickup", icon: Zap },
    { title: "Cultural Understanding", description: "Built by and for Haitian community", icon: Users },
    { title: "Cost Efficiency", description: "Lower fees than traditional competitors", icon: DollarSign }
  ];

  const financialProjections = [
    { year: "Year 1", revenue: "$571K", transactions: "3,800", users: "1,200" },
    { year: "Year 2", revenue: "$1.2M", transactions: "8,000", users: "2,500" },
    { year: "Year 3", revenue: "$2.1M", transactions: "14,000", users: "4,200" }
  ];

  const slides = [
    // Slide 1: Title Slide
    {
      title: "Global Transfer",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white flex items-center justify-center">
          <div className="text-center max-w-4xl px-8">
            <div className="flex items-center justify-center mb-12">
              <img 
                src="/lovable-uploads/45eddf56-11aa-4191-b09a-dc6ebfe3e7cc.png" 
                alt="Global Transfer Logo" 
                className="w-32 h-32 mr-8 rounded-3xl shadow-2xl ring-8 ring-white/30"
              />
              <div className="text-left">
                <h1 className="text-8xl font-black mb-4">Global Transfer</h1>
                <p className="text-3xl font-light opacity-90">Transfè Fasil, Rapid e Sekirize</p>
              </div>
            </div>
            
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Revolutionizing Money Transfer Services for the Haitian Community
            </h2>
            
            <p className="text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              A comprehensive digital platform bridging the gap between the Haitian diaspora and local communities through secure, fast, and accessible financial services.
            </p>
          </div>
        </div>
      )
    },
    
    // Slide 2: Market Opportunity
    {
      title: "Market Opportunity",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold text-gray-900 mb-6">Market Opportunity</h2>
              <p className="text-2xl text-gray-600">Key metrics driving our business case</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {keyMetrics.map((metric, index) => (
                <Card key={index} className="text-center shadow-2xl hover:shadow-3xl transition-shadow border-0 bg-white transform hover:scale-105">
                  <CardContent className="p-8">
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-${metric.color}-100 flex items-center justify-center`}>
                      <metric.icon className={`h-12 w-12 text-${metric.color}-600`} />
                    </div>
                    <div className="text-5xl font-bold text-gray-900 mb-4">{metric.value}</div>
                    <div className="text-2xl font-medium text-gray-700 mb-2">{metric.label}</div>
                    <div className="text-lg text-gray-500">{metric.subtitle}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // Slide 3: Executive Summary
    {
      title: "Executive Summary",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-6xl font-bold text-gray-900 mb-8">Executive Summary</h2>
                <div className="space-y-6 text-2xl text-gray-700 leading-relaxed">
                  <p>
                    <strong>Global Transfer</strong> addresses critical gaps in Haiti's money transfer ecosystem by providing a digital-first platform with local pickup locations in underserved areas like Désarmes.
                  </p>
                  <p>
                    Our solution combines modern technology with community presence, offering international transfers, mobile top-ups, and bill payments through a unified platform.
                  </p>
                  <p>
                    With projected Year 1 revenues of $571K and break-even in 8 months, we're positioned to capture significant market share in the $2.5B Haiti remittance market.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl shadow-2xl p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Investment Highlights</h3>
                <div className="space-y-6">
                  {[
                    "Underserved market with high demand",
                    "Experienced local team with diaspora connections", 
                    "Technology-enabled cost advantages",
                    "Multiple revenue streams beyond transfers",
                    "Clear path to profitability"
                  ].map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mr-4 flex-shrink-0" />
                      <span className="text-xl text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: Competitive Advantages
    {
      title: "Competitive Advantages",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold text-gray-900 mb-6">Competitive Advantages</h2>
              <p className="text-2xl text-gray-600">What sets us apart from existing solutions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {competitiveAdvantages.map((advantage, index) => (
                <Card key={index} className="shadow-2xl hover:shadow-3xl transition-shadow border-0 transform hover:scale-105">
                  <CardContent className="p-12">
                    <div className="flex items-start space-x-6">
                      <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <advantage.icon className="h-10 w-10 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-semibold text-gray-900 mb-4">{advantage.title}</h3>
                        <p className="text-xl text-gray-600 leading-relaxed">{advantage.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Financial Projections
    {
      title: "Financial Projections",
      component: () => (
        <div className="h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold mb-6">Financial Projections</h2>
              <p className="text-3xl opacity-90">3-Year Growth Trajectory</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {financialProjections.map((projection, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white transform hover:scale-105 transition-transform">
                  <CardHeader>
                    <CardTitle className="text-center text-4xl font-bold">{projection.year}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center p-8">
                    <div className="space-y-6">
                      <div>
                        <div className="text-5xl font-bold">{projection.revenue}</div>
                        <div className="text-xl opacity-80">Annual Revenue</div>
                      </div>
                      <Separator className="bg-white/20" />
                      <div className="grid grid-cols-2 gap-6 text-lg">
                        <div>
                          <div className="text-3xl font-semibold">{projection.transactions}</div>
                          <div className="opacity-80">Transactions</div>
                        </div>
                        <div>
                          <div className="text-3xl font-semibold">{projection.users}</div>
                          <div className="opacity-80">Active Users</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // Slide 6: Call to Action
    {
      title: "Call to Action",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center p-16">
          <div className="max-w-5xl text-center">
            <h2 className="text-7xl font-bold mb-8">Ready to Transform Haiti's Financial Services?</h2>
            <p className="text-3xl mb-16 opacity-90 leading-relaxed">
              Join us in building the future of money transfer services for the Haitian community.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-12 py-6 text-2xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
                onClick={() => setCurrentView('chapters')}
              >
                <PlayCircle className="mr-4 h-8 w-8" />
                View Detailed Presentation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-semibold px-12 py-6 text-2xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
              >
                Schedule a Meeting
                <ArrowUpRight className="ml-4 h-8 w-8" />
              </Button>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (currentView === 'chapters') {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 left-4 z-50">
          <Button
            onClick={() => setCurrentView('overview')}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm shadow-lg"
          >
            ← Back to Pitch Deck
          </Button>
        </div>
        <GlobalTransferPitchChapters />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Current Slide */}
      <div className="relative">
        {slides[currentSlide].component()}
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-4 bg-black/20 backdrop-blur-lg rounded-full px-6 py-4">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/20 disabled:opacity-30 rounded-full p-3"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/20 disabled:opacity-30 rounded-full p-3"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Slide Counter */}
      <div className="fixed top-8 right-8 z-50">
        <div className="bg-black/20 backdrop-blur-lg text-white px-4 py-2 rounded-full text-lg font-semibold">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-black/20 backdrop-blur-lg text-white px-4 py-2 rounded-lg text-sm opacity-60">
          Use ← → keys or click to navigate
        </div>
      </div>
    </div>
  );
}
