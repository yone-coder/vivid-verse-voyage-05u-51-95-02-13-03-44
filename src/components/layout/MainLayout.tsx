
import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/layout/Footer";
import DesktopFooter from "@/components/desktop/DesktopFooter";
import IndexBottomNav from "@/components/layout/IndexBottomNav";
import PremiumBankingHeader from "@/components/layout/PremiumBankingHeader";
import DesktopHeader from "@/components/desktop/DesktopHeader";
import SignInScreen from "@/components/auth/SignInScreen";
import { Outlet, useLocation } from "react-router-dom";
import { authService } from "@/services/authService";

function MainLayoutContent() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const pathname = location.pathname;
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const isHomePage = pathname === "/";
  const isMultiStepTransfer = pathname.startsWith("/multi-step-transfer");
  const isAccountPage = pathname === "/account";
  const isComponentsPage = pathname === "/components";

  // Check authentication status on mount and when auth state changes
  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log('MainLayout: Checking authentication status...');
      
      // First check local storage for immediate response
      const localAuthStatus = localStorage.getItem('isAuthenticated');
      const localAuthToken = localStorage.getItem('authToken');
      
      if (localAuthStatus === 'true' && localAuthToken) {
        console.log('Local authentication found, user is authenticated');
        setIsAuthenticated(true);
        setIsCheckingAuth(false);
        
        // Optionally verify with backend in the background
        try {
          const backendAuthStatus = await authService.checkAuthStatus();
          if (!backendAuthStatus.authenticated) {
            console.log('Backend auth check failed, but keeping local auth for now');
          }
        } catch (error) {
          console.log('Backend auth check failed, but keeping local auth');
        }
      } else {
        console.log('No local authentication found');
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();

    // Listen for authentication changes
    const handleAuthChange = () => {
      console.log('Auth state changed event received in MainLayout');
      // Small delay to ensure localStorage is updated
      setTimeout(() => {
        const localAuthStatus = localStorage.getItem('isAuthenticated');
        const localAuthToken = localStorage.getItem('authToken');
        
        if (localAuthStatus === 'true' && localAuthToken) {
          console.log('Auth state changed: User is now authenticated');
          setIsAuthenticated(true);
        } else {
          console.log('Auth state changed: User is not authenticated');
          setIsAuthenticated(false);
        }
        setIsCheckingAuth(false);
      }, 100);
    };

    window.addEventListener('authStateChanged', handleAuthChange);
    return () => window.removeEventListener('authStateChanged', handleAuthChange);
  }, []);

  // Hide splash screen after 4 seconds
  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(hideTimer);
  }, []);

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <SignInScreen />;
  }

  // Calculate bottom padding based on whether we're in multi-step transfer mode
  const getBottomPadding = () => {
    if (!isMobile || isComponentsPage) return '0px';
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
    <div className="min-h-screen flex flex-col bg-white">
      <style dangerouslySetInnerHTML={{ __html: headerHeightStyle }} />

      {/* Render appropriate header based on device - hide on components page */}
      {!isComponentsPage && (isMobile ? <PremiumBankingHeader /> : <DesktopHeader />)}

      <main className={`flex-grow relative ${isMobile ? '' : 'min-h-screen'}`} style={{ paddingBottom: getBottomPadding() }}>
        <Outlet />
      </main>

      {/* Desktop footer - show for all desktop pages except components */}
      {!isMobile && !isComponentsPage && <DesktopFooter />}

      {/* Mobile bottom navigation - hide on components page */}
      {isMobile && !isComponentsPage && <IndexBottomNav />}
    </div>
  );
}

export default function MainLayout() {
  return <MainLayoutContent />;
}
