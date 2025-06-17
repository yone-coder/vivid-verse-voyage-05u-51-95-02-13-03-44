
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History, MapPin, Smartphone, Download, Star } from 'lucide-react';
import TransferHistoryPage from '@/pages/TransferHistoryPage';
import LocationsPage from '@/pages/LocationsPage';

const DesktopSidebarSections: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Transfer History Section */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5" />
            Transfer History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <TransferHistoryPage />
        </CardContent>
      </Card>

      {/* Mobile App Section */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Smartphone className="h-5 w-5" />
            Mobile App
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">Send Money On The Go</h4>
            <p className="text-sm text-gray-600">
              Experience faster transfers with our mobile app. Available on iOS and Android.
            </p>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-medium">4.8/5</span>
            <span className="text-gray-500">from 50K+ reviews</span>
          </div>

          <div className="flex flex-col gap-2">
            <Button 
              size="sm"
              className="bg-black hover:bg-gray-800 text-white flex items-center justify-center space-x-2"
              onClick={() => window.open('#', '_blank')}
            >
              <span className="text-xs">📱</span>
              <span className="text-xs">App Store</span>
            </Button>
            
            <Button 
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2"
              onClick={() => window.open('#', '_blank')}
            >
              <Download className="w-3 h-3" />
              <span className="text-xs">Google Play</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Locations Section */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            Our Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <LocationsPage />
        </CardContent>
      </Card>
    </div>
  );
};

export default DesktopSidebarSections;
