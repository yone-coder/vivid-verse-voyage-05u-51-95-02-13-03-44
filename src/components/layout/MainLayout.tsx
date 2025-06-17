
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import DesktopHeader from '@/components/desktop/DesktopHeader';
import DesktopFooter from '@/components/desktop/DesktopFooter';
import DesktopSidebarSections from '@/components/desktop/DesktopSidebarSections';
import IndexBottomNav from '@/components/layout/IndexBottomNav';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/layout/AppSidebar';

const MainLayout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <main className="pb-20">
          <Outlet />
        </main>
        <IndexBottomNav />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 to-indigo-50">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <DesktopHeader />
          <div className="flex-1 flex">
            <main className="flex-1 p-6">
              <div className="mb-4">
                <SidebarTrigger />
              </div>
              <Outlet />
            </main>
            <aside className="w-80 p-6 overflow-y-auto">
              <DesktopSidebarSections />
            </aside>
          </div>
          <DesktopFooter />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
