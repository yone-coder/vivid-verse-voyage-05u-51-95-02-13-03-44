
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthOverlayProvider } from "./context/AuthOverlayContext";
import SplashScreen from "./components/SplashScreen";
import "./App.css";

const queryClient = new QueryClient();

function App({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 8 seconds (extended to show physics)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      
      // Hide splash screen after exit animation completes
      const hideTimer = setTimeout(() => {
        setShowSplash(false);
      }, 2000); // 2 seconds for exit animation
      
      return () => clearTimeout(hideTimer);
    }, 8000);

    return () => clearTimeout(exitTimer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <TooltipProvider>
          <AuthOverlayProvider>
            <SplashScreen isVisible={showSplash} isExiting={isExiting} />
            <div className={`App min-h-screen bg-background text-foreground transition-opacity duration-500 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
              {children}
              <Toaster />
              <Sonner />
            </div>
          </AuthOverlayProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
