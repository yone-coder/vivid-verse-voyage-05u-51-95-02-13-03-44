
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Route, MapPin } from 'lucide-react';
import TransferHistoryPage from '@/pages/TransferHistoryPage';
import TrackTransferPage from '@/pages/TrackTransferPage';
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

      {/* Track Transfer Section */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Route className="h-5 w-5" />
            Track Transfer
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <TrackTransferPage />
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
