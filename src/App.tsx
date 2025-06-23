
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
    // Performance optimization: use requestAnimationFrame for better timing
    const exitTimer = setTimeout(() => {
      requestAnimationFrame(() => {
        setIsExiting(true);
        
        // Hide splash screen after ultra fast exit animation completes
        const hideTimer = setTimeout(() => {
          requestAnimationFrame(() => {
            setShowSplash(false);
          });
        }, 1200); // 1.2 seconds for ultra fast exit animation
        
        return () => clearTimeout(hideTimer);
      });
    }, 4000);

    return () => clearTimeout(exitTimer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <TooltipProvider>
          <AuthOverlayProvider>
            <SplashScreen isVisible={showSplash} isExiting={isExiting} />
            <div 
              className={`App min-h-screen bg-background text-foreground transition-opacity duration-500 ${showSplash ? 'opacity-0' : 'opacity-100'}`}
              style={{
                willChange: showSplash ? 'opacity' : 'auto'
              }}
            >
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
