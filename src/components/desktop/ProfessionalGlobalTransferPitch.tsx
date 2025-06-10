
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
  Download,
  MapPin,
  Phone,
  CreditCard,
  Smartphone,
  Building2,
  AlertTriangle,
  Lock,
  Star,
  TrendingDown,
  Clock,
  Award,
  Handshake,
  Eye,
  MessageCircle,
  Lightbulb,
  Heart
} from 'lucide-react';
import GlobalTransferPitchChapters from './GlobalTransferPitchChapters';

export default function ProfessionalGlobalTransferPitch() {
  const [currentView, setCurrentView] = useState<'overview' | 'chapters'>('overview');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title Slide
    {
      title: "Global Transfer",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white flex items-center justify-center">
          <div className="text-center max-w-6xl px-8">
            <div className="flex items-center justify-center mb-12">
              <img 
                src="/lovable-uploads/45eddf56-11aa-4191-b09a-dc6ebfe3e7cc.png" 
                alt="Global Transfer Logo" 
                className="w-40 h-40 mr-12 rounded-3xl shadow-2xl ring-8 ring-white/30"
              />
              <div className="text-left">
                <h1 className="text-9xl font-black mb-6">Global Transfer</h1>
                <p className="text-4xl font-light opacity-90">Transfè Fasil, Rapid e Sekirize</p>
              </div>
            </div>
            
            <h2 className="text-6xl font-bold mb-12 leading-tight">
              Revolutionizing Money Transfer Services for the Haitian Community
            </h2>
            
            <p className="text-3xl opacity-90 max-w-5xl mx-auto leading-relaxed">
              A comprehensive digital platform bridging the gap between the Haitian diaspora and local communities through secure, fast, and accessible financial services.
            </p>
          </div>
        </div>
      )
    },

    // Slide 2: Problem Overview
    {
      title: "Problem Overview",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">The Problem</h2>
              <p className="text-3xl text-gray-600">Critical gaps in Haiti's financial infrastructure</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-red-100 p-8 rounded-2xl border-l-8 border-red-500">
                  <h3 className="text-3xl font-bold text-red-800 mb-4">Absence of Local Transfer Offices</h3>
                  <p className="text-xl text-gray-700">
                    No official transfer offices in areas like Désarmes, forcing residents to travel to unknown and potentially dangerous areas.
                  </p>
                </div>
                
                <div className="bg-orange-100 p-8 rounded-2xl border-l-8 border-orange-500">
                  <h3 className="text-3xl font-bold text-orange-800 mb-4">Limited MonCash/NatCash Capacity</h3>
                  <p className="text-xl text-gray-700">
                    Existing small offices are overwhelmed and cannot meet daily demand for money transfers.
                  </p>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="bg-yellow-100 p-8 rounded-2xl border-l-8 border-yellow-500">
                  <h3 className="text-3xl font-bold text-yellow-800 mb-4">Expensive & Tiring Travel</h3>
                  <p className="text-xl text-gray-700">
                    People must travel to Vèrèt to receive money, costing 300-500 gourdes in transportation alone.
                  </p>
                </div>
                
                <div className="bg-pink-100 p-8 rounded-2xl border-l-8 border-pink-500">
                  <h3 className="text-3xl font-bold text-pink-800 mb-4">Complex Processes</h3>
                  <p className="text-xl text-gray-700">
                    Traditional services require multiple steps and exclude those unfamiliar with technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 3: Market Size
    {
      title: "Market Opportunity",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Market Opportunity</h2>
              <p className="text-3xl text-gray-600">Massive untapped potential in Haiti</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <Card className="text-center shadow-2xl border-0 bg-white transform hover:scale-105 transition-transform">
                <CardContent className="p-12">
                  <Globe className="w-24 h-24 mx-auto mb-8 text-blue-600" />
                  <div className="text-6xl font-bold text-gray-900 mb-6">$2.5B</div>
                  <div className="text-3xl font-medium text-gray-700 mb-4">Haiti Remittance Market</div>
                  <div className="text-xl text-gray-500">Annual market size</div>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-2xl border-0 bg-white transform hover:scale-105 transition-transform">
                <CardContent className="p-12">
                  <Users className="w-24 h-24 mx-auto mb-8 text-green-600" />
                  <div className="text-6xl font-bold text-gray-900 mb-6">2.5M+</div>
                  <div className="text-3xl font-medium text-gray-700 mb-4">Haitian Diaspora</div>
                  <div className="text-xl text-gray-500">Potential users worldwide</div>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-2xl border-0 bg-white transform hover:scale-105 transition-transform">
                <CardContent className="p-12">
                  <DollarSign className="w-24 h-24 mx-auto mb-8 text-purple-600" />
                  <div className="text-6xl font-bold text-gray-900 mb-6">15%</div>
                  <div className="text-3xl font-medium text-gray-700 mb-4">Market Share Goal</div>
                  <div className="text-xl text-gray-500">Within 3 years</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: Our Solution
    {
      title: "Our Solution",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Our Solution</h2>
              <p className="text-3xl text-gray-600">Digital platform with local presence</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center mb-6">
                    <Smartphone className="w-12 h-12 text-blue-600 mr-6" />
                    <h3 className="text-3xl font-bold text-gray-900">Mobile App</h3>
                  </div>
                  <p className="text-xl text-gray-700">User-friendly mobile application for sending money from anywhere in the world</p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center mb-6">
                    <Building2 className="w-12 h-12 text-green-600 mr-6" />
                    <h3 className="text-3xl font-bold text-gray-900">Local Offices</h3>
                  </div>
                  <p className="text-xl text-gray-700">Physical pickup locations in underserved areas like Désarmes</p>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center mb-6">
                    <Phone className="w-12 h-12 text-purple-600 mr-6" />
                    <h3 className="text-3xl font-bold text-gray-900">Mobile Top-ups</h3>
                  </div>
                  <p className="text-xl text-gray-700">Direct mobile credit transfers to Digicel and Natcom networks</p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center mb-6">
                    <CreditCard className="w-12 h-12 text-orange-600 mr-6" />
                    <h3 className="text-3xl font-bold text-gray-900">Bill Payments</h3>
                  </div>
                  <p className="text-xl text-gray-700">Utility bill payments and other essential services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Target Market
    {
      title: "Target Market",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Target Market</h2>
              <p className="text-3xl text-gray-600">Who we serve</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <Card className="shadow-2xl border-0 bg-white">
                <CardContent className="p-12 text-center">
                  <Users className="w-20 h-20 mx-auto mb-8 text-blue-600" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Haitian Diaspora</h3>
                  <ul className="text-xl text-gray-700 space-y-3 text-left">
                    <li>• United States (1.2M)</li>
                    <li>• Canada (165K)</li>
                    <li>• France (75K)</li>
                    <li>• Other countries</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0 bg-white">
                <CardContent className="p-12 text-center">
                  <MapPin className="w-20 h-20 mx-auto mb-8 text-green-600" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Local Recipients</h3>
                  <ul className="text-xl text-gray-700 space-y-3 text-left">
                    <li>• Désarmes residents</li>
                    <li>• Rural communities</li>
                    <li>• Urban underserved areas</li>
                    <li>• Family networks</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0 bg-white">
                <CardContent className="p-12 text-center">
                  <Building2 className="w-20 h-20 mx-auto mb-8 text-purple-600" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Local Businesses</h3>
                  <ul className="text-xl text-gray-700 space-y-3 text-left">
                    <li>• Small retailers</li>
                    <li>• Service providers</li>
                    <li>• Agriculture suppliers</li>
                    <li>• Community stores</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },

    // Slide 6: Revenue Model
    {
      title: "Revenue Model",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Revenue Model</h2>
              <p className="text-3xl text-gray-600">Multiple income streams</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-3xl text-center">Primary Revenue</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="text-xl font-semibold">Transfer Fees</span>
                      <span className="text-2xl font-bold text-blue-600">$3-8</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="text-xl font-semibold">Mobile Top-up Commission</span>
                      <span className="text-2xl font-bold text-green-600">5-10%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                      <span className="text-xl font-semibold">Bill Payment Fees</span>
                      <span className="text-2xl font-bold text-purple-600">$1-3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-3xl text-center">Secondary Revenue</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                      <span className="text-xl font-semibold">Currency Exchange</span>
                      <span className="text-2xl font-bold text-orange-600">0.5-1%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-pink-50 rounded-lg">
                      <span className="text-xl font-semibold">Premium Services</span>
                      <span className="text-2xl font-bold text-pink-600">$5-15</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                      <span className="text-xl font-semibold">Partnership Revenue</span>
                      <span className="text-2xl font-bold text-yellow-600">Variable</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },

    // Slide 7: Financial Projections Year 1
    {
      title: "Year 1 Financial Projections",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-green-600 to-emerald-600 text-white flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold mb-8">Year 1 Projections</h2>
              <p className="text-3xl opacity-90">Conservative growth estimates</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-8 text-center">
                  <DollarSign className="w-16 h-16 mx-auto mb-6" />
                  <div className="text-5xl font-bold mb-4">$571K</div>
                  <div className="text-2xl opacity-80">Total Revenue</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-8 text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-6" />
                  <div className="text-5xl font-bold mb-4">3,800</div>
                  <div className="text-2xl opacity-80">Transactions</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-8 text-center">
                  <Users className="w-16 h-16 mx-auto mb-6" />
                  <div className="text-5xl font-bold mb-4">1,200</div>
                  <div className="text-2xl opacity-80">Active Users</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-6" />
                  <div className="text-5xl font-bold mb-4">8</div>
                  <div className="text-2xl opacity-80">Months to Break-even</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },

    // Slide 8: 3-Year Growth Trajectory
    {
      title: "3-Year Growth Trajectory",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold mb-8">3-Year Growth Trajectory</h2>
              <p className="text-3xl opacity-90">Scaling to market leadership</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { year: "Year 1", revenue: "$571K", transactions: "3,800", users: "1,200", color: "bg-green-500" },
                { year: "Year 2", revenue: "$1.2M", transactions: "8,000", users: "2,500", color: "bg-blue-500" },
                { year: "Year 3", revenue: "$2.1M", transactions: "14,000", users: "4,200", color: "bg-purple-500" }
              ].map((projection, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white transform hover:scale-105 transition-transform">
                  <CardHeader>
                    <CardTitle className="text-center text-5xl font-bold">{projection.year}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center p-8">
                    <div className="space-y-6">
                      <div>
                        <div className="text-6xl font-bold">{projection.revenue}</div>
                        <div className="text-2xl opacity-80">Annual Revenue</div>
                      </div>
                      <Separator className="bg-white/20" />
                      <div className="grid grid-cols-2 gap-6 text-lg">
                        <div>
                          <div className="text-3xl font-semibold">{projection.transactions}</div>
                          <div className="opacity-80">Transactions</div>
                        </div>
                        <div>
                          <div className="text-3xl font-semibold">{projection.users}</div>
                          <div className="opacity-80">Users</div>
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

    // Slide 9: Competitive Advantages
    {
      title: "Competitive Advantages",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Competitive Advantages</h2>
              <p className="text-3xl text-gray-600">What sets us apart</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="shadow-2xl border-0 transform hover:scale-105 transition-transform">
                <CardContent className="p-12">
                  <div className="flex items-start space-x-6">
                    <Target className="w-16 h-16 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-3xl font-semibold text-gray-900 mb-4">Local Presence</h3>
                      <p className="text-xl text-gray-600">Physical locations in underserved areas where competitors don't operate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0 transform hover:scale-105 transition-transform">
                <CardContent className="p-12">
                  <div className="flex items-start space-x-6">
                    <Zap className="w-16 h-16 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-3xl font-semibold text-gray-900 mb-4">Digital Integration</h3>
                      <p className="text-xl text-gray-600">Modern app technology combined with traditional pickup methods</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0 transform hover:scale-105 transition-transform">
                <CardContent className="p-12">
                  <div className="flex items-start space-x-6">
                    <Heart className="w-16 h-16 text-red-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-3xl font-semibold text-gray-900 mb-4">Cultural Understanding</h3>
                      <p className="text-xl text-gray-600">Built by and for the Haitian community with deep cultural insights</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0 transform hover:scale-105 transition-transform">
                <CardContent className="p-12">
                  <div className="flex items-start space-x-6">
                    <DollarSign className="w-16 h-16 text-purple-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-3xl font-semibold text-gray-900 mb-4">Cost Efficiency</h3>
                      <p className="text-xl text-gray-600">Lower operational costs enable competitive fees for customers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },

    // Slide 10: Technology Stack
    {
      title: "Technology Stack",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold mb-8">Technology Stack</h2>
              <p className="text-3xl opacity-90">Modern, secure, and scalable</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-3xl text-center flex items-center justify-center">
                    <Smartphone className="w-10 h-10 mr-4" />
                    Mobile App
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="space-y-4 text-xl">
                    <li>• React Native for iOS/Android</li>
                    <li>• Real-time notifications</li>
                    <li>• Offline capability</li>
                    <li>• Biometric authentication</li>
                    <li>• Multi-language support</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-3xl text-center flex items-center justify-center">
                    <Shield className="w-10 h-10 mr-4" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="space-y-4 text-xl">
                    <li>• End-to-end encryption</li>
                    <li>• PCI DSS compliance</li>
                    <li>• Anti-fraud detection</li>
                    <li>• KYC/AML compliance</li>
                    <li>• Multi-factor authentication</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-3xl text-center flex items-center justify-center">
                    <Globe className="w-10 h-10 mr-4" />
                    Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="space-y-4 text-xl">
                    <li>• Cloud-based architecture</li>
                    <li>• 99.9% uptime guarantee</li>
                    <li>• Global CDN network</li>
                    <li>• Automated backups</li>
                    <li>• Scalable microservices</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },

    // Slide 11: Operations Plan
    {
      title: "Operations Plan",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Operations Plan</h2>
              <p className="text-3xl text-gray-600">Systematic deployment and management</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-blue-500 text-white">
                    <CardTitle className="text-3xl">Phase 1: Launch (Months 1-3)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-4 text-xl text-gray-700">
                      <li>• Establish Désarmes office</li>
                      <li>• Hire and train local staff</li>
                      <li>• Launch mobile app beta</li>
                      <li>• Partner with local businesses</li>
                      <li>• Begin marketing campaign</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-green-500 text-white">
                    <CardTitle className="text-3xl">Phase 2: Expansion (Months 4-8)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-4 text-xl text-gray-700">
                      <li>• Add 2 more pickup locations</li>
                      <li>• Implement bill payment services</li>
                      <li>• Launch web platform</li>
                      <li>• Expand marketing to diaspora</li>
                      <li>• Achieve break-even</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-8">
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-purple-500 text-white">
                    <CardTitle className="text-3xl">Phase 3: Scale (Months 9-12)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-4 text-xl text-gray-700">
                      <li>• Open 5 additional locations</li>
                      <li>• Add premium services</li>
                      <li>• Implement loyalty program</li>
                      <li>• Explore B2B partnerships</li>
                      <li>• Prepare for Series A funding</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-orange-500 text-white">
                    <CardTitle className="text-3xl">Ongoing Operations</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-4 text-xl text-gray-700">
                      <li>• 24/7 customer support</li>
                      <li>• Regular staff training</li>
                      <li>• Technology updates</li>
                      <li>• Community engagement</li>
                      <li>• Continuous improvement</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 12: Risk Management
    {
      title: "Risk Management",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Risk Management</h2>
              <p className="text-3xl text-gray-600">Proactive risk mitigation strategies</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="shadow-2xl border-0 border-l-8 border-red-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <AlertTriangle className="w-12 h-12 text-red-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-red-800 mb-4">Technology Risk</h3>
                      <p className="text-lg text-gray-700 mb-4">System failures or technical errors</p>
                      <div className="bg-green-100 p-4 rounded-lg">
                        <strong className="text-green-800">Solution:</strong>
                        <span className="text-green-700 ml-2">Redundant systems, regular monitoring, 24/7 IT support</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0 border-l-8 border-orange-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <Lock className="w-12 h-12 text-orange-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-orange-800 mb-4">Security Risk</h3>
                      <p className="text-lg text-gray-700 mb-4">Theft, fraud, or security breaches</p>
                      <div className="bg-green-100 p-4 rounded-lg">
                        <strong className="text-green-800">Solution:</strong>
                        <span className="text-green-700 ml-2">Secure offices, trained staff, insurance coverage</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0 border-l-8 border-yellow-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <FileText className="w-12 h-12 text-yellow-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-800 mb-4">Regulatory Risk</h3>
                      <p className="text-lg text-gray-700 mb-4">Changes in money transfer regulations</p>
                      <div className="bg-green-100 p-4 rounded-lg">
                        <strong className="text-green-800">Solution:</strong>
                        <span className="text-green-700 ml-2">Legal compliance team, regular audits, industry partnerships</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0 border-l-8 border-purple-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <TrendingDown className="w-12 h-12 text-purple-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-purple-800 mb-4">Market Risk</h3>
                      <p className="text-lg text-gray-700 mb-4">Economic downturns or reduced remittances</p>
                      <div className="bg-green-100 p-4 rounded-lg">
                        <strong className="text-green-800">Solution:</strong>
                        <span className="text-green-700 ml-2">Diversified services, flexible pricing, cost control</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },

    // Slide 13: Team
    {
      title: "Our Team",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Our Team</h2>
              <p className="text-3xl text-gray-600">Experienced professionals with local expertise</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <Card className="shadow-2xl border-0 transform hover:scale-105 transition-transform">
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Management</h3>
                  <p className="text-lg text-gray-700">
                    Experienced team with deep understanding of Haitian community needs and business practices
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0 transform hover:scale-105 transition-transform">
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Smartphone className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Technology Team</h3>
                  <p className="text-lg text-gray-700">
                    Skilled developers and engineers with expertise in fintech and mobile applications
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0 transform hover:scale-105 transition-transform">
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 bg-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Handshake className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Advisory Board</h3>
                  <p className="text-lg text-gray-700">
                    Industry experts in financial services, technology, and Haitian diaspora relations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },

    // Slide 14: Marketing Strategy
    {
      title: "Marketing Strategy",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Marketing Strategy</h2>
              <p className="text-3xl text-gray-600">Reaching the Haitian diaspora worldwide</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-blue-500 text-white">
                    <CardTitle className="text-3xl flex items-center">
                      <Globe className="w-8 h-8 mr-4" />
                      Digital Marketing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-4 text-xl text-gray-700">
                      <li>• Social media campaigns (Facebook, Instagram, TikTok)</li>
                      <li>• Google Ads targeting Haitian diaspora</li>
                      <li>• WhatsApp and Telegram community engagement</li>
                      <li>• Influencer partnerships</li>
                      <li>• Content marketing in Kreyol</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-green-500 text-white">
                    <CardTitle className="text-3xl flex items-center">
                      <Users className="w-8 h-8 mr-4" />
                      Community Outreach
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-4 text-xl text-gray-700">
                      <li>• Haitian community centers partnerships</li>
                      <li>• Cultural events sponsorship</li>
                      <li>• Radio show advertisements</li>
                      <li>• Church community engagement</li>
                      <li>• Word-of-mouth referral program</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-8">
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-purple-500 text-white">
                    <CardTitle className="text-3xl flex items-center">
                      <Star className="w-8 h-8 mr-4" />
                      Incentive Programs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-4 text-xl text-gray-700">
                      <li>• First transfer fee waiver</li>
                      <li>• Loyalty points system</li>
                      <li>• Family plan discounts</li>
                      <li>• Volume-based pricing tiers</li>
                      <li>• Seasonal promotions</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-orange-500 text-white">
                    <CardTitle className="text-3xl flex items-center">
                      <Award className="w-8 h-8 mr-4" />
                      Brand Positioning
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-4 text-xl text-gray-700">
                      <li>• "By Haitians, for Haitians"</li>
                      <li>• Emphasize cultural understanding</li>
                      <li>• Highlight local presence advantage</li>
                      <li>• Focus on family connections</li>
                      <li>• Community development impact</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 15: Evaluation Metrics
    {
      title: "Evaluation Metrics",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Success Metrics</h2>
              <p className="text-3xl text-gray-600">Key performance indicators</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <Card className="shadow-2xl border-0">
                <CardHeader className="bg-green-500 text-white">
                  <CardTitle className="text-3xl text-center">Financial KPIs</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="text-lg font-semibold">Monthly Revenue Growth</span>
                      <span className="text-2xl font-bold text-green-600">15%+</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="text-lg font-semibold">Customer Acquisition Cost</span>
                      <span className="text-2xl font-bold text-blue-600">$25</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                      <span className="text-lg font-semibold">Lifetime Value</span>
                      <span className="text-2xl font-bold text-purple-600">$500+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0">
                <CardHeader className="bg-blue-500 text-white">
                  <CardTitle className="text-3xl text-center">Operational KPIs</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="text-lg font-semibold">Transaction Success Rate</span>
                      <span className="text-2xl font-bold text-green-600">99.5%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="text-lg font-semibold">Average Processing Time</span>
                      <span className="text-2xl font-bold text-blue-600">15min</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                      <span className="text-lg font-semibold">System Uptime</span>
                      <span className="text-2xl font-bold text-purple-600">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0">
                <CardHeader className="bg-purple-500 text-white">
                  <CardTitle className="text-3xl text-center">Customer KPIs</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="text-lg font-semibold">Customer Satisfaction</span>
                      <span className="text-2xl font-bold text-green-600">95%+</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="text-lg font-semibold">Monthly Active Users</span>
                      <span className="text-2xl font-bold text-blue-600">500+</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                      <span className="text-lg font-semibold">Retention Rate</span>
                      <span className="text-2xl font-bold text-purple-600">85%+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },

    // Slide 16: Communication Strategy
    {
      title: "Communication Strategy",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Communication Strategy</h2>
              <p className="text-3xl text-gray-600">Building trust through transparency</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-blue-500 text-white">
                    <CardTitle className="text-3xl flex items-center">
                      <MessageCircle className="w-8 h-8 mr-4" />
                      Customer Communication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-4 text-xl text-gray-700">
                      <li>• Multi-language support (Kreyol, English, French)</li>
                      <li>• 24/7 customer service hotline</li>
                      <li>• SMS and email notifications</li>
                      <li>• In-app messaging system</li>
                      <li>• Regular service updates</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-green-500 text-white">
                    <CardTitle className="text-3xl flex items-center">
                      <Eye className="w-8 h-8 mr-4" />
                      Transparency Measures
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-4 text-xl text-gray-700">
                      <li>• Real-time exchange rates</li>
                      <li>• Clear fee structure</li>
                      <li>• Transaction tracking</li>
                      <li>• Regular financial reports</li>
                      <li>• Community feedback sessions</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-8">
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-purple-500 text-white">
                    <CardTitle className="text-3xl flex items-center">
                      <Users className="w-8 h-8 mr-4" />
                      Stakeholder Engagement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-4 text-xl text-gray-700">
                      <li>• Monthly investor updates</li>
                      <li>• Quarterly community meetings</li>
                      <li>• Partnership communications</li>
                      <li>• Regulatory body reporting</li>
                      <li>• Media relations</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-orange-500 text-white">
                    <CardTitle className="text-3xl flex items-center">
                      <Lightbulb className="w-8 h-8 mr-4" />
                      Educational Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-4 text-xl text-gray-700">
                      <li>• Financial literacy programs</li>
                      <li>• How-to video tutorials</li>
                      <li>• Security awareness campaigns</li>
                      <li>• Economic impact reports</li>
                      <li>• Community success stories</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 17: Investment Requirements
    {
      title: "Investment Requirements",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-yellow-50 to-amber-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Investment Requirements</h2>
              <p className="text-3xl text-gray-600">Funding needs for successful launch</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <Card className="shadow-2xl border-0">
                <CardHeader className="bg-blue-600 text-white">
                  <CardTitle className="text-4xl text-center">Total Funding Required</CardTitle>
                </CardHeader>
                <CardContent className="p-12 text-center">
                  <div className="text-8xl font-bold text-blue-600 mb-8">$250K</div>
                  <p className="text-2xl text-gray-600">Seed funding for 18-month runway</p>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card className="shadow-xl border-0">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">Technology Development</span>
                      <span className="text-2xl font-bold text-blue-600">$80K</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                      <div className="bg-blue-600 h-3 rounded-full" style={{width: '32%'}}></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">Operations Setup</span>
                      <span className="text-2xl font-bold text-green-600">$70K</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                      <div className="bg-green-600 h-3 rounded-full" style={{width: '28%'}}></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">Marketing & Customer Acquisition</span>
                      <span className="text-2xl font-bold text-purple-600">$50K</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                      <div className="bg-purple-600 h-3 rounded-full" style={{width: '20%'}}></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">Working Capital</span>
                      <span className="text-2xl font-bold text-orange-600">$50K</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                      <div className="bg-orange-600 h-3 rounded-full" style={{width: '20%'}}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 18: Use of Funds
    {
      title: "Use of Funds",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Use of Funds</h2>
              <p className="text-3xl text-gray-600">Strategic allocation for maximum impact</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-blue-500 text-white">
                    <CardTitle className="text-3xl">Technology Development ($80K)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-3 text-lg text-gray-700">
                      <li>• Mobile app development (iOS/Android)</li>
                      <li>• Web platform creation</li>
                      <li>• Backend infrastructure setup</li>
                      <li>• Security implementation</li>
                      <li>• Payment gateway integration</li>
                      <li>• Testing and quality assurance</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-green-500 text-white">
                    <CardTitle className="text-3xl">Operations Setup ($70K)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-3 text-lg text-gray-700">
                      <li>• Office lease and setup (3 locations)</li>
                      <li>• Equipment and furniture</li>
                      <li>• Staff hiring and training</li>
                      <li>• Legal and regulatory compliance</li>
                      <li>• Insurance and security</li>
                      <li>• Initial inventory and cash reserves</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-8">
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-purple-500 text-white">
                    <CardTitle className="text-3xl">Marketing ($50K)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-3 text-lg text-gray-700">
                      <li>• Digital advertising campaigns</li>
                      <li>• Community outreach programs</li>
                      <li>• Brand development and design</li>
                      <li>• Promotional materials</li>
                      <li>• Event sponsorships</li>
                      <li>• Influencer partnerships</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-orange-500 text-white">
                    <CardTitle className="text-3xl">Working Capital ($50K)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-3 text-lg text-gray-700">
                      <li>• Operating expenses (12 months)</li>
                      <li>• Emergency fund</li>
                      <li>• Transaction float capital</li>
                      <li>• Contingency reserves</li>
                      <li>• Growth opportunities fund</li>
                      <li>• Technology maintenance</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 19: Timeline
    {
      title: "Implementation Timeline",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Implementation Timeline</h2>
              <p className="text-3xl text-gray-600">18-month roadmap to profitability</p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-8">
                <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  Q1
                </div>
                <Card className="flex-1 shadow-xl border-0">
                  <CardContent className="p-8">
                    <h3 className="text-3xl font-bold text-blue-600 mb-4">Foundation Phase</h3>
                    <p className="text-xl text-gray-700">
                      Secure funding, develop MVP, establish first office in Désarmes, hire core team, begin beta testing
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  Q2
                </div>
                <Card className="flex-1 shadow-xl border-0">
                  <CardContent className="p-8">
                    <h3 className="text-3xl font-bold text-green-600 mb-4">Launch Phase</h3>
                    <p className="text-xl text-gray-700">
                      Public app launch, marketing campaign, onboard first 100 customers, establish partnerships
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="w-32 h-32 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  Q3-Q4
                </div>
                <Card className="flex-1 shadow-xl border-0">
                  <CardContent className="p-8">
                    <h3 className="text-3xl font-bold text-purple-600 mb-4">Growth Phase</h3>
                    <p className="text-xl text-gray-700">
                      Scale to 1,000+ users, open 2 additional locations, add bill payment services, achieve break-even
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  Q5-Q6
                </div>
                <Card className="flex-1 shadow-xl border-0">
                  <CardContent className="p-8">
                    <h3 className="text-3xl font-bold text-orange-600 mb-4">Expansion Phase</h3>
                    <p className="text-xl text-gray-700">
                      Expand to 5 total locations, reach 2,500 users, prepare for Series A funding, explore new markets
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 20: Exit Strategy
    {
      title: "Exit Strategy",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Exit Strategy</h2>
              <p className="text-3xl text-gray-600">Multiple paths to investor returns</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <Card className="shadow-2xl border-0 transform hover:scale-105 transition-transform">
                <CardHeader className="bg-blue-500 text-white">
                  <CardTitle className="text-3xl text-center">Strategic Acquisition</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Handshake className="w-20 h-20 mx-auto text-blue-500 mb-4" />
                    <div className="text-4xl font-bold text-blue-600">3-5 Years</div>
                  </div>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li>• Major remittance companies</li>
                    <li>• Regional banks</li>
                    <li>• Fintech platforms</li>
                    <li>• Telecom operators</li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <strong className="text-blue-800">Expected Multiple:</strong>
                    <span className="text-blue-700 ml-2">5-8x revenue</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0 transform hover:scale-105 transition-transform">
                <CardHeader className="bg-green-500 text-white">
                  <CardTitle className="text-3xl text-center">IPO</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <TrendingUp className="w-20 h-20 mx-auto text-green-500 mb-4" />
                    <div className="text-4xl font-bold text-green-600">5-7 Years</div>
                  </div>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li>• Regional expansion complete</li>
                    <li>• $50M+ annual revenue</li>
                    <li>• Strong market position</li>
                    <li>• Diversified services</li>
                  </ul>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <strong className="text-green-800">Market Cap Target:</strong>
                    <span className="text-green-700 ml-2">$200M+</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-2xl border-0 transform hover:scale-105 transition-transform">
                <CardHeader className="bg-purple-500 text-white">
                  <CardTitle className="text-3xl text-center">Management Buyout</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Award className="w-20 h-20 mx-auto text-purple-500 mb-4" />
                    <div className="text-4xl font-bold text-purple-600">4-6 Years</div>
                  </div>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li>• Management team acquisition</li>
                    <li>• Community ownership model</li>
                    <li>• Gradual equity transfer</li>
                    <li>• Cooperative structure</li>
                  </ul>
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <strong className="text-purple-800">Community Impact:</strong>
                    <span className="text-purple-700 ml-2">Maximum</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },

    // Slide 21: Social Impact
    {
      title: "Social Impact",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-16">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-7xl font-bold text-gray-900 mb-8">Social Impact</h2>
              <p className="text-3xl text-gray-600">Beyond profits: strengthening communities</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <Card className="shadow-xl border-0">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Heart className="w-12 h-12 text-red-500 mr-6" />
                      <h3 className="text-3xl font-bold text-gray-900">Family Connections</h3>
                    </div>
                    <p className="text-xl text-gray-700">
                      Enabling diaspora families to support their loved ones in Haiti more easily and affordably, 
                      strengthening family bonds across borders.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Building2 className="w-12 h-12 text-blue-500 mr-6" />
                      <h3 className="text-3xl font-bold text-gray-900">Local Employment</h3>
                    </div>
                    <p className="text-xl text-gray-700">
                      Creating sustainable jobs in underserved areas like Désarmes, providing economic opportunities 
                      for local residents.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Globe className="w-12 h-12 text-green-500 mr-6" />
                      <h3 className="text-3xl font-bold text-gray-900">Economic Development</h3>
                    </div>
                    <p className="text-xl text-gray-700">
                      Facilitating capital flow into rural communities, supporting local businesses and 
                      contributing to regional economic growth.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-12 rounded-3xl">
                <h3 className="text-4xl font-bold mb-8 text-center">Impact Metrics</h3>
                
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">25+</div>
                    <div className="text-2xl opacity-90">Local Jobs Created</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">$2M+</div>
                    <div className="text-2xl opacity-90">Annual Capital Flow to Community</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">5,000+</div>
                    <div className="text-2xl opacity-90">Families Served by Year 3</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">50%</div>
                    <div className="text-2xl opacity-90">Reduction in Transfer Costs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 22: Call to Action
    {
      title: "Call to Action",
      component: () => (
        <div className="h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center p-16">
          <div className="max-w-6xl text-center">
            <h2 className="text-8xl font-bold mb-12">Ready to Transform Haiti's Financial Future?</h2>
            <p className="text-4xl mb-16 opacity-90 leading-relaxed">
              Join us in building the bridge between the Haitian diaspora and their homeland.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                <DollarSign className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Invest</h3>
                <p className="text-lg opacity-80">Be part of our $250K seed round</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                <Handshake className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Partner</h3>
                <p className="text-lg opacity-80">Collaborate for mutual growth</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                <Users className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Join</h3>
                <p className="text-lg opacity-80">Become part of our mission</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-16 py-8 text-3xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
                onClick={() => setCurrentView('chapters')}
              >
                <PlayCircle className="mr-6 h-10 w-10" />
                View Detailed Business Plan
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-semibold px-16 py-8 text-3xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
              >
                Schedule Investment Meeting
                <ArrowUpRight className="ml-6 h-10 w-10" />
              </Button>
            </div>

            <div className="mt-16 p-8 bg-white/10 backdrop-blur-sm rounded-2xl">
              <h3 className="text-3xl font-bold mb-4">Contact Information</h3>
              <p className="text-xl">
                📧 invest@globaltransfer.ht | 📱 +1 (555) 123-4567 | 🌐 www.globaltransfer.ht
              </p>
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

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

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
          
          <div className="flex space-x-2 max-w-md overflow-x-auto">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 flex-shrink-0 ${
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
        <div className="bg-black/20 backdrop-blur-lg text-white px-6 py-3 rounded-full text-xl font-semibold">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Slide Title (for navigation reference) */}
      <div className="fixed top-8 left-8 z-50">
        <div className="bg-black/20 backdrop-blur-lg text-white px-6 py-3 rounded-full text-lg font-medium">
          {slides[currentSlide].title}
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
