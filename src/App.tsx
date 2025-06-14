
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import ProfilePage from "./pages/ProfilePage";
import AccountPage from "./pages/AccountPage";
import LocationsPage from "./pages/LocationsPage";
import TrackTransferPage from "./pages/TrackTransferPage";
import TransferHistoryPage from "./pages/TransferHistoryPage";
import MoreMenu from "./pages/MoreMenu";
import AuthPage from "./pages/AuthPage";
import AdminPanel from "./pages/AdminPanel";
import TransferPage from "./pages/TransferPage";
import TransferHomePage from "./pages/TransferHomePage";
import MultiStepTransferPage from "./pages/MultiStepTransferPage";
import MultiStepTransferSheetPage from "./pages/MultiStepTransferSheetPage";
import ResponsiveMultiStepTransferPage from "./pages/ResponsiveMultiStepTransferPage";
import LocalTransferPage from "./pages/LocalTransferPage";
import SignupPage from "./pages/SignupPage";
import MultiStepTransferSheetDesktopPage from "./pages/MultiStepTransferSheetDesktopPage";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import { AuthOverlayProvider } from "./context/AuthOverlayContext";
import "./App.css";
import GlobalTransferPitch from "./pages/GlobalTransferPitch";

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
                      <Route index element={<ResponsiveMultiStepTransferPage />} />
                      <Route path="paytm-home" element={<Index />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="account" element={<AccountPage />} />
                      <Route path="locations" element={<LocationsPage />} />
                      <Route path="track-transfer" element={<TrackTransferPage />} />
                      <Route path="transfer-history" element={<TransferHistoryPage />} />
                      <Route path="more" element={<MoreMenu />} />
                      <Route path="auth" element={<AuthPage />} />
                      <Route path="/multi-step-transfer-desktop" element={<MultiStepTransferSheetDesktopPage />} />
                      <Route path="admin" element={<AdminPanel />} />
                      <Route path="transfer-old" element={<TransferPage />} />
                      <Route path="transfer" element={<TransferHomePage />} />
                      <Route path="multi-step-transfer" element={<MultiStepTransferPage />} />
                      <Route path="multi-step-transfer-page" element={<ResponsiveMultiStepTransferPage />} />
                      <Route path="signup" element={<SignupPage />} />
                      <Route path="global-transfer-pitch" element={<GlobalTransferPitch />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                    {/* Local transfer page without MainLayout to hide bottom nav */}
                    <Route path="local-transfer" element={<LocalTransferPage />} />
                  </Routes>
                  <Toaster />
                  <Sonner />
                </div>
              </AuthOverlayProvider>
            </AuthProvider>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
