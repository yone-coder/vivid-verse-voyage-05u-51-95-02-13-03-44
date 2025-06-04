
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/products";
import PageSkeleton from "@/components/skeletons/PageSkeleton";
import DesktopHeader from "./pc/DesktopHeader";
import DesktopHeroBanner from "./pc/DesktopHeroBanner";
import DesktopSidebar from "./pc/DesktopSidebar";
import DesktopMainContent from "./pc/DesktopMainContent";
import DesktopRightSidebar from "./pc/DesktopRightSidebar";

export default function ForYouDesktop() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header */}
      <DesktopHeader />
      
      <div className="container mx-auto px-6 py-6">
        {/* Hero Banner - Reduced height */}
        <div className="mb-6">
          <DesktopHeroBanner />
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - 3 columns */}
          <div className="col-span-3">
            <DesktopSidebar />
          </div>

          {/* Main Content Area - 6 columns */}
          <div className="col-span-6">
            <DesktopMainContent products={products || []} />
          </div>

          {/* Right Sidebar - 3 columns */}
          <div className="col-span-3">
            <DesktopRightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
