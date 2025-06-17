
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DesktopTransferProcess from "@/components/desktop/DesktopTransferProcess";
import DesktopSidebarSections from "@/components/desktop/DesktopSidebarSections";
import TrackTransferSection from "@/components/transfer/TrackTransferSection";

const DesktopMultiStepTransferPage: React.FC = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null; // This component is only for desktop
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Transfer Form and Track Transfer */}
          <div className="lg:col-span-2 space-y-8">
            <DesktopTransferProcess />
            <TrackTransferSection />
          </div>
          
          {/* Right Column - Sidebar Sections */}
          <div className="lg:col-span-1">
            <DesktopSidebarSections />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopMultiStepTransferPage;
