
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
  Home
} from 'lucide-react';
import GlobalTransferPitchChapters from './GlobalTransferPitchChapters';

export default function ProfessionalGlobalTransferPitch() {
  const [currentView, setCurrentView] = useState<'overview' | 'chapters' | 'slides'>('overview');
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

  // Slides data
  const slides = [
    {
      id: 'title',
      title: 'Global Transfer',
      subtitle: 'Transfè Fasil, Rapid e Sekirize',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="flex items-center justify-center mb-12">
            <img 
              src="/lovable-uploads/45eddf56-11aa-4191-b09a-dc6ebfe3e7cc.png" 
              alt="Global Transfer Logo" 
              className="w-32 h-32 mr-8 rounded-3xl shadow-2xl ring-4 ring-white/30"
            />
            <div className="text-left">
              <h1 className="text-8xl font-black mb-4 text-white">Global Transfer</h1>
              <p className="text-4xl font-light opacity-90 text-white">Transfè Fasil, Rapid e Sekirize</p>
            </div>
          </div>
          <h2 className="text-5xl font-bold mb-8 max-w-6xl mx-auto leading-tight text-white">
            Revolutionizing Money Transfer Services for the Haitian Community
          </h2>
          <p className="text-2xl opacity-90 max-w-4xl mx-auto text-white">
            A comprehensive digital platform bridging the gap between the Haitian diaspora and local communities through secure, fast, and accessible financial services.
          </p>
        </div>
      ),
      background: 'from-blue-600 via-purple-600 to-indigo-700'
    },
    {
      id: 'market-overview',
      title: 'Market Opportunity',
      subtitle: 'Key metrics driving our business case',
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="text-center shadow-2xl hover:shadow-3xl transition-shadow border-0 bg-white/95">
                <CardContent className="p-8">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${metric.color}-100 flex items-center justify-center`}>
                    <metric.icon className={`h-10 w-10 text-${metric.color}-600`} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-3">{metric.value}</div>
                  <div className="text-xl font-medium text-gray-700 mb-2">{metric.label}</div>
                  <div className="text-base text-gray-500">{metric.subtitle}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <p className="text-2xl text-gray-700 mb-6">
              Haiti receives over $2.5 billion in remittances annually, making it one of the most remittance-dependent economies in the world.
            </p>
            <p className="text-xl text-gray-600">
              Our target market represents 2.5+ million Haitian diaspora members worldwide seeking reliable, affordable transfer solutions.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'problem-statement',
      title: 'Ki Pwoblèm Nou Vle Rezoud?',
      subtitle: 'The Problems We Are Solving',
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Pwoblèm yo nan sistèm aktyèl la</h3>
              <div className="space-y-6">
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                  <h4 className="text-xl font-semibold text-red-800 mb-2">High Transfer Fees</h4>
                  <p className="text-gray-700">Traditional services charge 8-12% in fees, making small transfers uneconomical for families.</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                  <h4 className="text-xl font-semibold text-orange-800 mb-2">Limited Access</h4>
                  <p className="text-gray-700">Rural areas like Désarmes lack proper financial infrastructure and pickup locations.</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                  <h4 className="text-xl font-semibold text-yellow-800 mb-2">Slow Processing</h4>
                  <p className="text-gray-700">Transfers can take 24-72 hours, causing delays for urgent family needs.</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Impact on Families</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold text-blue-800 mb-2">Educational Barriers</h4>
                  <p className="text-gray-700">Delayed tuition payments affect children's education continuity.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold text-green-800 mb-2">Healthcare Access</h4>
                  <p className="text-gray-700">Emergency medical expenses require immediate fund availability.</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold text-purple-800 mb-2">Business Development</h4>
                  <p className="text-gray-700">Small business funding is hindered by unreliable transfer systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'solution-overview',
      title: 'Solisyon Nou An',
      subtitle: 'Our Comprehensive Solution',
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Global Transfer Platform</h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              A digital-first platform combining modern technology with local presence to serve the Haitian community's financial needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Digital Platform</h4>
                <p className="text-gray-700">Modern mobile app with intuitive interface for easy transfers, bill payments, and mobile top-ups.</p>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Local Presence</h4>
                <p className="text-gray-700">Physical pickup locations in underserved areas, starting with Désarmes community.</p>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Security First</h4>
                <p className="text-gray-700">Bank-level security with compliance to international money transfer regulations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'competitive-advantages',
      title: 'Avantaj Konpetitif yo',
      subtitle: 'What sets us apart from existing solutions',
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {competitiveAdvantages.map((advantage, index) => (
              <Card key={index} className="shadow-xl hover:shadow-2xl transition-shadow border-0 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <advantage.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{advantage.title}</h3>
                      <p className="text-lg text-gray-600">{advantage.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Kisa ki fè nou diferan?</h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Unlike traditional money transfer services, we combine the convenience of digital technology with the trust and accessibility of local community presence.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'services-overview',
      title: 'Sèvis yo nou ofri',
      subtitle: 'Our Service Offerings',
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Core Services</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-xl">
                  <DollarSign className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">International Money Transfers</h4>
                    <p className="text-gray-700">Send money from anywhere in the world to Haiti with competitive rates and fast processing.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-xl">
                  <Smartphone className="h-8 w-8 text-green-600 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Mobile Top-ups</h4>
                    <p className="text-gray-700">Instantly add credit to mobile phones in Haiti for Digicel, Natcom, and other providers.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-purple-50 rounded-xl">
                  <FileText className="h-8 w-8 text-purple-600 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Bill Payment Services</h4>
                    <p className="text-gray-700">Pay utility bills, school fees, and other services directly from the diaspora.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Additional Features</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-orange-50 rounded-xl">
                  <Target className="h-8 w-8 text-orange-600 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Cash Pickup Locations</h4>
                    <p className="text-gray-700">Network of trusted agents in rural and urban areas for convenient cash collection.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-teal-50 rounded-xl">
                  <Shield className="h-8 w-8 text-teal-600 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">MonCash Integration</h4>
                    <p className="text-gray-700">Direct transfers to MonCash digital wallets for instant accessibility.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-indigo-50 rounded-xl">
                  <BarChart3 className="h-8 w-8 text-indigo-600 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Transaction Tracking</h4>
                    <p className="text-gray-700">Real-time status updates and delivery confirmations for peace of mind.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'target-market',
      title: 'Mache Sible a',
      subtitle: 'Our Target Market Analysis',
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Primary Markets</h3>
              <div className="space-y-6">
                <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                  <h4 className="text-xl font-semibold text-blue-800 mb-3">United States (70%)</h4>
                  <p className="text-gray-700 mb-3">1.2M+ Haitian Americans, primarily in Florida, New York, and Massachusetts.</p>
                  <div className="text-sm text-blue-600">
                    • Average transfer: $200-400/month<br/>
                    • Frequency: 2-3 times per month<br/>
                    • Main recipients: Family members
                  </div>
                </div>
                
                <div className="p-6 bg-green-50 rounded-xl border-l-4 border-green-500">
                  <h4 className="text-xl font-semibold text-green-800 mb-3">Canada (15%)</h4>
                  <p className="text-gray-700 mb-3">165K+ Haitian Canadians, concentrated in Quebec and Ontario.</p>
                  <div className="text-sm text-green-600">
                    • Average transfer: $150-300/month<br/>
                    • Frequency: 2-4 times per month<br/>
                    • Growing community
                  </div>
                </div>
                
                <div className="p-6 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                  <h4 className="text-xl font-semibold text-purple-800 mb-3">Other Markets (15%)</h4>
                  <p className="text-gray-700 mb-3">France, Dominican Republic, Bahamas, and other Caribbean nations.</p>
                  <div className="text-sm text-purple-600">
                    • Emerging opportunities<br/>
                    • Different regulatory requirements<br/>
                    • Cultural connections
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Market Insights</h3>
              <div className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Demographics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age 25-45:</span>
                        <span className="font-semibold">65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Working professionals:</span>
                        <span className="font-semibold">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Regular senders:</span>
                        <span className="font-semibold">82%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mobile users:</span>
                        <span className="font-semibold">95%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Pain Points</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• High fees (8-12% typical)</li>
                      <li>• Limited pickup locations</li>
                      <li>• Language barriers</li>
                      <li>• Slow processing times</li>
                      <li>• Lack of transparency</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'financial-projections',
      title: 'Pwojeksyon Finansye',
      subtitle: '3-Year Growth Trajectory',
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Revenue Projections</h3>
            <p className="text-xl text-gray-600">Conservative estimates based on market analysis and competitor benchmarks</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {financialProjections.map((projection, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-center text-3xl font-bold">{projection.year}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-6">
                    <div>
                      <div className="text-4xl font-bold">{projection.revenue}</div>
                      <div className="text-lg opacity-80">Annual Revenue</div>
                    </div>
                    <Separator className="bg-white/20" />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-semibold">{projection.transactions}</div>
                        <div className="text-sm opacity-80">Transactions</div>
                      </div>
                      <div>
                        <div className="text-2xl font-semibold">{projection.users}</div>
                        <div className="text-sm opacity-80">Active Users</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Revenue Streams</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Transfer fees (2.5%)</span>
                    <span className="font-semibold text-blue-600">65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Currency exchange margin</span>
                    <span className="font-semibold text-green-600">20%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Bill payment commissions</span>
                    <span className="font-semibold text-purple-600">10%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Mobile top-up margins</span>
                    <span className="font-semibold text-orange-600">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Break-even Analysis</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Monthly operating costs</span>
                    <span className="font-semibold">$28K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Break-even transactions/month</span>
                    <span className="font-semibold">280</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Expected break-even</span>
                    <span className="font-semibold text-green-600">Month 8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">ROI by Year 3</span>
                    <span className="font-semibold text-blue-600">340%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'technology-stack',
      title: 'Enfrèstrikti Teknolojik',
      subtitle: 'Technology Infrastructure',
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Mobile Application</h3>
              <div className="space-y-6">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Cross-Platform Development</h4>
                    <p className="text-gray-700 mb-4">React Native for iOS and Android, ensuring consistent user experience across all devices.</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-800">React Native</Badge>
                      <Badge className="bg-green-100 text-green-800">TypeScript</Badge>
                      <Badge className="bg-purple-100 text-purple-800">Redux</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Biometric authentication</li>
                      <li>• Offline transaction queuing</li>
                      <li>• Multi-language support (Kreyol, English, French)</li>
                      <li>• Push notifications</li>
                      <li>• QR code scanning</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Backend Infrastructure</h3>
              <div className="space-y-6">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Cloud Architecture</h4>
                    <p className="text-gray-700 mb-4">Scalable microservices architecture on AWS with automatic scaling and redundancy.</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-orange-100 text-orange-800">AWS</Badge>
                      <Badge className="bg-blue-100 text-blue-800">Node.js</Badge>
                      <Badge className="bg-green-100 text-green-800">PostgreSQL</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Security & Compliance</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• End-to-end encryption</li>
                      <li>• PCI DSS compliance</li>
                      <li>• Anti-money laundering (AML)</li>
                      <li>• Know Your Customer (KYC)</li>
                      <li>• SOC 2 Type II certification</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <Card className="shadow-xl border-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold mb-6 text-center">Integration Partners</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <h5 className="font-semibold mb-2">Payment Processing</h5>
                    <p className="text-sm opacity-80">Stripe, PayPal, Wise</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Banking Partners</h5>
                    <p className="text-sm opacity-80">Local Haitian banks</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Mobile Money</h5>
                    <p className="text-sm opacity-80">MonCash, Natcash</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Compliance</h5>
                    <p className="text-sm opacity-80">FinCEN, OFAC</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'team-overview',
      title: 'Ekip nou an',
      subtitle: 'Our Team & Advisors',
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Leadership Team</h3>
            <p className="text-xl text-gray-600">Experienced professionals with deep understanding of both technology and Haitian market</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="shadow-xl border-0 text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">CEO & Founder</h4>
                <p className="text-gray-600 mb-4">15+ years in fintech, Harvard MBA, Haitian-American with deep community connections</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">Fintech</Badge>
                  <Badge className="bg-green-100 text-green-800">Strategy</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-xl border-0 text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Zap className="h-12 w-12 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">CTO</h4>
                <p className="text-gray-600 mb-4">Former senior engineer at PayPal, expert in payment systems and mobile development</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className="bg-purple-100 text-purple-800">Engineering</Badge>
                  <Badge className="bg-orange-100 text-orange-800">Mobile</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-xl border-0 text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Globe className="h-12 w-12 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">COO</h4>
                <p className="text-gray-600 mb-4">Operations expert with experience in emerging markets and agent network management</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className="bg-red-100 text-red-800">Operations</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">Networks</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Advisory Board</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Compliance Expert</h5>
                      <p className="text-sm text-gray-600">Former FinCEN official, AML/KYC specialist</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Market Strategist</h5>
                      <p className="text-sm text-gray-600">Haiti economic development consultant</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Fintech Investor</h5>
                      <p className="text-sm text-gray-600">Managing partner at Caribbean VC fund</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Community Partners</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Haitian-American Association</h5>
                    <p className="text-sm text-gray-600">Partnership for community outreach and education</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Local Désarmes Leaders</h5>
                    <p className="text-sm text-gray-600">Community champions and pickup point operators</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Diaspora Organizations</h5>
                    <p className="text-sm text-gray-600">Churches, cultural centers, and professional groups</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'go-to-market',
      title: 'Estrateji Kominikasyon',
      subtitle: 'Go-to-Market Strategy',
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Launch Strategy</h3>
              <div className="space-y-6">
                <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                  <h4 className="text-xl font-semibold text-blue-800 mb-3">Phase 1: Beta Launch (Months 1-3)</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Pilot in South Florida Haitian community</li>
                    <li>• 50 beta users, limited to $500 transfers</li>
                    <li>• Désarmes pickup location establishment</li>
                    <li>• Feedback collection and iteration</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-green-50 rounded-xl border-l-4 border-green-500">
                  <h4 className="text-xl font-semibold text-green-800 mb-3">Phase 2: Regional Expansion (Months 4-8)</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Expand to New York and Boston markets</li>
                    <li>• Add 5 additional pickup locations in Haiti</li>
                    <li>• Launch referral program</li>
                    <li>• Partnership with diaspora organizations</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                  <h4 className="text-xl font-semibold text-purple-800 mb-3">Phase 3: Scale (Months 9-12)</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Canada market entry</li>
                    <li>• 25+ pickup locations across Haiti</li>
                    <li>• Bill payment and mobile top-up services</li>
                    <li>• 1,200+ active users target</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Marketing Channels</h3>
              <div className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Community Engagement</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Church partnerships:</span>
                        <span className="font-semibold">40%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cultural events:</span>
                        <span className="font-semibold">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Word of mouth:</span>
                        <span className="font-semibold">35%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Digital Marketing</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Facebook and Instagram targeted ads</li>
                      <li>• WhatsApp community groups</li>
                      <li>• Haitian radio station partnerships</li>
                      <li>• YouTube educational content</li>
                      <li>• Google Ads for remittance keywords</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Incentive Programs</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• First transfer fee waiver</li>
                      <li>• Referral bonuses ($10 per referral)</li>
                      <li>• Loyalty rewards program</li>
                      <li>• Volume-based discounts</li>
                      <li>• Community ambassador program</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'risk-analysis',
      title: 'Risk ak Solisyon',
      subtitle: 'Risk Management Strategy',
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Identified Risks</h3>
              <div className="space-y-6">
                <div className="p-6 bg-red-50 rounded-xl border-l-4 border-red-500">
                  <h4 className="text-xl font-semibold text-red-800 mb-3">Regulatory Risk</h4>
                  <p className="text-gray-700 mb-3">Changes in money transfer regulations or compliance requirements.</p>
                  <div className="text-sm text-red-600">
                    <strong>Mitigation:</strong> Legal counsel, compliance officer, regulatory monitoring
                  </div>
                </div>
                
                <div className="p-6 bg-orange-50 rounded-xl border-l-4 border-orange-500">
                  <h4 className="text-xl font-semibold text-orange-800 mb-3">Competition Risk</h4>
                  <p className="text-gray-700 mb-3">Established players like Western Union reducing fees or improving services.</p>
                  <div className="text-sm text-orange-600">
                    <strong>Mitigation:</strong> Focus on underserved markets, superior customer experience
                  </div>
                </div>
                
                <div className="p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
                  <h4 className="text-xl font-semibold text-yellow-800 mb-3">Technology Risk</h4>
                  <p className="text-gray-700 mb-3">Platform downtime, security breaches, or system failures.</p>
                  <div className="text-sm text-yellow-600">
                    <strong>Mitigation:</strong> Redundant systems, cybersecurity insurance, disaster recovery
                  </div>
                </div>
                
                <div className="p-6 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                  <h4 className="text-xl font-semibold text-purple-800 mb-3">Market Risk</h4>
                  <p className="text-gray-700 mb-3">Economic downturn affecting remittance volumes or Haiti instability.</p>
                  <div className="text-sm text-purple-600">
                    <strong>Mitigation:</strong> Diversified services, multiple markets, flexible cost structure
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Risk Mitigation Framework</h3>
              <div className="space-y-6">
                <Card className="shadow-lg border-0 bg-green-50">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-green-800 mb-4">Operational Safeguards</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 24/7 system monitoring</li>
                      <li>• Automated fraud detection</li>
                      <li>• Multi-factor authentication</li>
                      <li>• Regular security audits</li>
                      <li>• Backup payment processors</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg border-0 bg-blue-50">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-blue-800 mb-4">Financial Controls</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Conservative cash flow projections</li>
                      <li>• 6-month operating expense reserve</li>
                      <li>• Transaction limits and velocity checks</li>
                      <li>• Insurance coverage (E&O, cyber, general)</li>
                      <li>• Regular financial audits</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg border-0 bg-purple-50">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-purple-800 mb-4">Strategic Flexibility</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Modular technology architecture</li>
                      <li>• Multiple revenue streams</li>
                      <li>• Scalable cost structure</li>
                      <li>• Partnership-based expansion</li>
                      <li>• Continuous market monitoring</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'funding-requirements',
      title: 'Bezwen Finansman',
      subtitle: 'Investment Requirements & Use of Funds',
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Funding Requirements</h3>
            <p className="text-xl text-gray-600">Seeking $2M Series A to accelerate growth and market expansion</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white h-full">
                <CardContent className="p-8">
                  <h4 className="text-3xl font-bold mb-8 text-center">Use of Funds</h4>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span>Technology Development</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold">$600K</div>
                        <div className="text-sm opacity-80">30%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Regulatory & Compliance</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold">$400K</div>
                        <div className="text-sm opacity-80">20%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Market Expansion</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold">$500K</div>
                        <div className="text-sm opacity-80">25%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Team & Operations</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold">$300K</div>
                        <div className="text-sm opacity-80">15%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Working Capital</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold">$200K</div>
                        <div className="text-sm opacity-80">10%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Technology Development ($600K)</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Mobile app development and testing</li>
                    <li>• Backend infrastructure scaling</li>
                    <li>• Security and compliance systems</li>
                    <li>• Integration with partners</li>
                    <li>• Analytics and reporting tools</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Regulatory & Compliance ($400K)</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Money transmitter licenses (multiple states)</li>
                    <li>• Legal and regulatory consulting</li>
                    <li>• Compliance officer salary (2 years)</li>
                    <li>• AML/KYC system implementation</li>
                    <li>• Audit and certification costs</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Market Expansion ($500K)</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Agent network establishment</li>
                    <li>• Marketing and customer acquisition</li>
                    <li>• Partnership development</li>
                    <li>• Customer support infrastructure</li>
                    <li>• Brand building and awareness</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Card className="shadow-lg border-0 bg-gray-50">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Expected Milestones</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">12 Months</h5>
                    <p className="text-gray-600">1,200 active users, $571K revenue</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">24 Months</h5>
                    <p className="text-gray-600">2,500 active users, $1.2M revenue</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">36 Months</h5>
                    <p className="text-gray-600">Series B readiness, $2.1M revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'call-to-action',
      title: 'Etap Suivan yo',
      subtitle: 'Next Steps & Call to Action',
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="text-center mb-12">
            <h3 className="text-5xl font-bold text-gray-900 mb-8">Ready to Transform Haiti's Financial Services?</h3>
            <p className="text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Join us in building the future of money transfer services for the Haitian community. Together, we can bridge the gap between the diaspora and their families back home.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold mb-6">Investment Opportunity</h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Funding Round:</span>
                    <span className="font-semibold">Series A</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount Seeking:</span>
                    <span className="font-semibold">$2M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valuation:</span>
                    <span className="font-semibold">$8M pre-money</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Use of Funds:</span>
                    <span className="font-semibold">18 months runway</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected ROI:</span>
                    <span className="font-semibold">10x in 5 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Partnership Opportunities</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-gray-700">Strategic investors in fintech</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-gray-700">Caribbean development funds</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-gray-700">Impact investment funds</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-gray-700">Diaspora-focused VCs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-gray-700">Financial services partnerships</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6">
              <Button 
                size="xl" 
                className="bg-blue-600 hover:bg-blue-700 font-semibold px-12 py-6 text-xl"
              >
                <FileText className="mr-3 h-6 w-6" />
                Request Full Business Plan
              </Button>
              <Button 
                size="xl" 
                variant="outline" 
                className="font-semibold px-12 py-6 text-xl border-2"
              >
                Schedule a Meeting
                <ArrowUpRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-xl text-gray-600 mb-4">Contact Information</p>
              <div className="space-y-2 text-lg text-gray-700">
                <p>Email: investors@globaltransfer.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Website: www.globaltransfer.com</p>
              </div>
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
            ← Back to Overview
          </Button>
        </div>
        <GlobalTransferPitchChapters />
      </div>
    );
  }

  if (currentView === 'slides') {
    const currentSlideData = slides[currentSlide];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
        {/* Slide Content */}
        <div className={`min-h-screen flex flex-col ${currentSlideData.background ? `bg-gradient-to-r ${currentSlideData.background}` : 'bg-white'}`}>
          {/* Header */}
          <div className="flex justify-between items-center p-6 bg-black/10 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/45eddf56-11aa-4191-b09a-dc6ebfe3e7cc.png" 
                alt="Global Transfer Logo" 
                className="w-12 h-12 rounded-xl"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">Global Transfer</h1>
                <p className="text-sm text-white/80">Transfè Fasil, Rapid e Sekirize</p>
              </div>
            </div>
            
            <div className="text-white text-lg font-semibold bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
          
          {/* Slide Title */}
          <div className="text-center py-8 bg-black/10 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-white mb-2">{currentSlideData.title}</h2>
            <p className="text-xl text-white/90">{currentSlideData.subtitle}</p>
          </div>
          
          {/* Slide Content */}
          <div className="flex-1 p-8">
            {currentSlideData.content}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between items-center p-6 bg-black/10 backdrop-blur-sm">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : index < currentSlide 
                        ? 'bg-green-400' 
                        : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              size="lg"
              className="bg-white text-blue-600 hover:bg-white/90 disabled:opacity-30"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
        
        {/* Back to Overview */}
        <div className="fixed top-4 left-4 z-50">
          <Button
            onClick={() => setCurrentView('overview')}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm shadow-lg"
          >
            <Home className="w-4 h-4 mr-2" />
            Overview
          </Button>
        </div>
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
                onClick={() => setCurrentView('slides')}
              >
                <Presentation className="mr-2 h-5 w-5" />
                Start Slide Presentation
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                onClick={() => setCurrentView('chapters')}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                View Chapter Presentation
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
              onClick={() => setCurrentView('slides')}
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
