import React, { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/layout/Footer";
import DesktopFooter from "@/components/desktop/DesktopFooter";
import IndexBottomNav from "@/components/layout/IndexBottomNav";
import DesktopHeader from "@/components/desktop/DesktopHeader";
import MobileAppSection from "@/components/desktop/MobileAppSection";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthOverlay } from "@/context/AuthOverlayContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";

function MainLayoutContent() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const pathname = location.pathname;
  
  const { user, isLoading } = useAuth();
  const { openAuthOverlay } = useAuthOverlay();

  const isHomePage = pathname === "/";
  const isMultiStepTransfer = pathname.startsWith("/multi-step-transfer");
  const isAccountPage = pathname === "/account";

  useEffect(() => {
    if (pathname === "/auth") {
      openAuthOverlay();
      window.history.replaceState({}, "", "/");
    }
  }, [pathname, openAuthOverlay]);

  // Calculate bottom padding based on whether we're in multi-step transfer mode
  const getBottomPadding = () => {
    if (!isMobile) return '0px';
    if (isMultiStepTransfer) return '112px'; // 64px (continue button) + 48px (nav bar)
    return '48px'; // Just nav bar
  };

  const headerHeightStyle = `
    :root {
      --header-height: 0px;
      --bottom-nav-height: ${getBottomPadding()};
    }
  `;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <style dangerouslySetInnerHTML={{ __html: headerHeightStyle }} />

        {/* Desktop Header - only show when logged in and not on mobile */}
        {user && !isMobile && <DesktopHeader />}

        <main className={`flex-grow relative ${isMobile ? '' : 'min-h-screen'}`} style={{ paddingBottom: getBottomPadding() }}>
          <Outlet />
        </main>

        {/* Mobile App Section - only show on desktop and home page */}
        {!isMobile && isHomePage && <MobileAppSection />}

        {/* Desktop footer - show for all desktop pages */}
        {!isMobile && <DesktopFooter />}

        {/* Mobile bottom navigation */}
        {isMobile && <IndexBottomNav />}
      </div>
    </LanguageProvider>
  );
}

export default function MainLayout() {
  return (
    <AuthProvider>
      <MainLayoutContent />
    </AuthProvider>
  );
}
