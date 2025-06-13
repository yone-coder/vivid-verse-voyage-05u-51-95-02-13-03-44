
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import ResponsiveMultiStepTransferPage from "./pages/ResponsiveMultiStepTransferPage";
import LocalTransferPage from "./pages/LocalTransferPage";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import { AuthOverlayProvider } from "./context/AuthOverlayContext";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <TooltipProvider>
          <Router>
            <AuthProvider>
              <AuthOverlayProvider>
                <div className="App min-h-screen bg-background text-foreground">
                  <Routes>
                    <Route path="/" element={<MainLayout />}>
                      <Route index element={<Index />} />
                      <Route path="multi-step-transfer-page" element={<ResponsiveMultiStepTransferPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                    {/* Local transfer page without MainLayout to hide bottom nav */}
                    <Route path="local-transfer" element={<LocalTransferPage />} />
                  </Routes>
                  <Toaster />
                  <Sonner />
                </div>
              </AuthOverlayContext>
            </AuthProvider>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
