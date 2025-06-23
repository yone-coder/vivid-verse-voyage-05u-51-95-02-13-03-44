
import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/layout/Footer";
import DesktopFooter from "@/components/desktop/DesktopFooter";
import IndexBottomNav from "@/components/layout/IndexBottomNav";
import PremiumBankingHeader from "@/components/layout/PremiumBankingHeader";
import DesktopHeader from "@/components/desktop/DesktopHeader";
import AuthOverlay from "@/components/auth/AuthOverlay";
import SignInScreen from "@/components/auth/SignInScreen";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthOverlay } from "@/context/AuthOverlayContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";

function MainLayoutContent() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const pathname = location.pathname;
  const [showSplash, setShowSplash] = useState(true);
  
  const { user, isLoading } = useAuth();
  const { openAuthOverlay } = useAuthOverlay();

  const isHomePage = pathname === "/";
  const isMultiStepTransfer = pathname.startsWith("/multi-step-transfer");
  const isAccountPage = pathname === "/account";

  // Hide splash screen after 4 seconds
  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(hideTimer);
  }, []);

  useEffect(() => {
    if (pathname === "/auth") {
      openAuthOverlay();
      window.history.replaceState({}, "", "/");
    }
  }, [pathname, openAuthOverlay]);

  // Show SignInScreen if user is not authenticated and splash is not visible
  if (!showSplash && !user && !isLoading) {
    return (
      <LanguageProvider>
        <SignInScreen />
      </LanguageProvider>
    );
  }

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

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <style dangerouslySetInnerHTML={{ __html: headerHeightStyle }} />

        {/* Render appropriate header based on device */}
        {isMobile ? <PremiumBankingHeader /> : <DesktopHeader />}

        <main className={`flex-grow relative ${isMobile ? '' : 'min-h-screen'}`} style={{ paddingBottom: getBottomPadding() }}>
          <Outlet />
        </main>

        {/* Desktop footer - show for all desktop pages */}
        {!isMobile && <DesktopFooter />}

        {/* Mobile bottom navigation */}
        {isMobile && <IndexBottomNav />}

        {/* Auth Overlay - now inside AuthProvider context */}
        <AuthOverlay />
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
