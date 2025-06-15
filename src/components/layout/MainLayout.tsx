
import React, { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/layout/Footer";
import IndexBottomNav from "@/components/layout/IndexBottomNav";
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
  const isTransferPage = pathname === "/transfer";
  const isMultiStepTransferPage = pathname === "/multi-step-transfer";
  const isMultiStepTransferSheetPage = pathname === "/multi-step-transfer-page";
  const isTransferOldPage = pathname === "/transfer-old";

  useEffect(() => {
    if (pathname === "/auth") {
      openAuthOverlay();
      window.history.replaceState({}, "", "/");
    }
  }, [pathname, openAuthOverlay]);

  // Desktop pages that shouldn't show mobile bottom nav
  const desktopOnlyPages = ["/transfer"];
  const shouldShowMobileNav = isMobile && 
    !isHomePage && 
    !isMultiStepTransferPage && 
    !isMultiStepTransferSheetPage && 
    !isTransferOldPage && 
    !desktopOnlyPages.includes(pathname);

  const headerHeightStyle = `
    :root {
      --header-height: 0px;
      --bottom-nav-height: ${shouldShowMobileNav ? '48px' : '0px'};
    }
  `;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Just render children if not logged in, don't use deleted AuthPage
  if (!user) {
    return (
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-white" />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <style dangerouslySetInnerHTML={{ __html: headerHeightStyle }} />

        <main className="flex-grow relative">
          <Outlet />
        </main>

        {/* Desktop footer - only show on non-home pages for desktop */}
        {!isMobile && !isHomePage && <Footer />}

        {/* Mobile bottom navigation */}
        {shouldShowMobileNav && <IndexBottomNav />}
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
