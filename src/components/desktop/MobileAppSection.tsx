
import React from 'react';
import { Smartphone, Download, Star, Shield, Zap, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MobileAppSection: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Send money in seconds with our optimized mobile experience"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your transactions are protected with advanced encryption"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Send money to over 200 countries and territories worldwide"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-blue-600">
                <Smartphone className="w-6 h-6" />
                <span className="text-sm font-semibold uppercase tracking-wide">Mobile App</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Transfer Money
                <br />
                <span className="text-blue-600">On The Go</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Experience the fastest and most secure way to send money worldwide. 
                Our mobile app brings all the power of Global Transfè right to your fingertips.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Download Now</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-3 transition-transform hover:scale-105"
                  onClick={() => window.open('#', '_blank')}
                >
                  <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                    <span className="text-black text-xs font-bold">📱</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </Button>
                
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-3 transition-transform hover:scale-105"
                  onClick={() => window.open('#', '_blank')}
                >
                  <div className="w-6 h-6">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-green-200">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">4.8/5</span> from 50K+ reviews
              </div>
            </div>
          </div>

          {/* Right side - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-64 h-[520px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="h-6 bg-gray-50 flex items-center justify-between px-6 text-xs font-medium text-gray-800">
                    <span>9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-6 space-y-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900">Global Transfè</h3>
                      <p className="text-xs text-gray-500">Worldwide Money Transfer</p>
                    </div>
                    
                    <Card className="shadow-sm">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">You send</span>
                            <span className="font-semibold">$1,000.00</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Recipient gets</span>
                            <span className="font-semibold">€920.50</span>
                          </div>
                          <div className="pt-2 border-t">
                            <Button size="sm" className="w-full">
                              Send Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
