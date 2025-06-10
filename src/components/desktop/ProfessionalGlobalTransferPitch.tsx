
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronRight, 
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

  if (currentView === 'chapters') {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 left-4 z-50">
          <Button
            onClick={() => setCurrentView('overview')}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm shadow-lg"
          >
            ← Back to Overview
          </Button>
        </div>
        <GlobalTransferPitchChapters />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <img 
                src="/lovable-uploads/45eddf56-11aa-4191-b09a-dc6ebfe3e7cc.png" 
                alt="Global Transfer Logo" 
                className="w-20 h-20 mr-6 rounded-3xl shadow-2xl ring-4 ring-white/30"
              />
              <div className="text-left">
                <h1 className="text-6xl font-black mb-2">Global Transfer</h1>
                <p className="text-2xl font-light opacity-90">Transfè Fasil, Rapid e Sekirize</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              Revolutionizing Money Transfer Services for the Haitian Community
            </h2>
            
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              A comprehensive digital platform bridging the gap between the Haitian diaspora and local communities through secure, fast, and accessible financial services.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                onClick={() => setCurrentView('chapters')}
              >
                <Presentation className="mr-2 h-5 w-5" />
                View Full Presentation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Executive Summary
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Opportunity</h2>
          <p className="text-lg text-gray-600">Key metrics driving our business case</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow border-0 bg-white">
              <CardContent className="p-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${metric.color}-100 flex items-center justify-center`}>
                  <metric.icon className={`h-8 w-8 text-${metric.color}-600`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <div className="text-lg font-medium text-gray-700 mb-1">{metric.label}</div>
                <div className="text-sm text-gray-500">{metric.subtitle}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Executive Summary</h2>
              <div className="space-y-4 text-lg text-gray-700">
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
              <Button className="mt-6" size="lg">
                <FileText className="mr-2 h-4 w-4" />
                Read Full Business Plan
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Highlights</h3>
              <div className="space-y-4">
                {[
                  "Underserved market with high demand",
                  "Experienced local team with diaspora connections", 
                  "Technology-enabled cost advantages",
                  "Multiple revenue streams beyond transfers",
                  "Clear path to profitability"
                ].map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Advantages */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Competitive Advantages</h2>
            <p className="text-lg text-gray-600">What sets us apart from existing solutions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {competitiveAdvantages.map((advantage, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow border-0">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <advantage.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{advantage.title}</h3>
                      <p className="text-gray-600">{advantage.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Projections */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Financial Projections</h2>
            <p className="text-xl opacity-90">3-Year Growth Trajectory</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {financialProjections.map((projection, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-center text-2xl font-bold">{projection.year}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold">{projection.revenue}</div>
                      <div className="text-sm opacity-80">Annual Revenue</div>
                    </div>
                    <Separator className="bg-white/20" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-lg font-semibold">{projection.transactions}</div>
                        <div className="opacity-80">Transactions</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{projection.users}</div>
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

      {/* Call to Action */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Haiti's Financial Services?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join us in building the future of money transfer services for the Haitian community.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 font-semibold px-8 py-4 text-lg"
              onClick={() => setCurrentView('chapters')}
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Start Presentation
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="font-semibold px-8 py-4 text-lg"
            >
              Schedule a Meeting
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
