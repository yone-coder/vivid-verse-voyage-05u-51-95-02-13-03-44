
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ForYou from "./pages/ForYou";
import Posts from "./pages/Posts";
import Messages from "./pages/Messages";
import Trending from "./pages/Trending";
import Videos from "./pages/Videos";
import Reels from "./pages/Reels";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import SearchPage from "./pages/SearchPage";
import AdminPanel from "./pages/AdminPanel";
import MainLayout from "./components/layout/MainLayout";
import { ThemeProvider } from "@/components/theme-provider";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./context/AuthContext";
import { AuthOverlayProvider, useAuthOverlay } from "./context/AuthOverlayContext";
import AuthOverlay from "./components/auth/AuthOverlay";
import { setupStorageBuckets } from "./integrations/supabase/setupStorage";
import ProfilePage from "./pages/ProfilePage";
import MoreMenu from "./pages/MoreMenu";
import TransferPage from "./pages/TransferPage";
import TopUpPage from "./pages/TopUpPage";
import NetflixPage from "./pages/NetflixPage";
import ElectronicsPage from "./pages/ElectronicsPage";
import HomeLivingPage from "./pages/HomeLivingPage";
import FashionPage from "./pages/FashionPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import KidsHobbiesPage from "./pages/KidsHobbiesPage";
import SportsOutdoorsPage from "./pages/SportsOutdoorsPage";
import AutomotivePage from "./pages/AutomotivePage";
import CategoriesPage from "./pages/CategoriesPage";
import PayPalCheckout from "./pages/PayPalCheckout";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize storage buckets on app startup
    setupStorageBuckets().catch(console.error);
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <AuthOverlayProvider>
                  <Routes>
                    <Route element={<MainLayout />}>
                      <Route path="/" element={<Navigate to="/for-you" replace />} />
                      <Route path="/for-you" element={<ForYou />} />
                      <Route path="/posts" element={<Posts />} />
                      <Route path="/messages" element={<Messages />} />
                      <Route path="/trending" element={<Trending />} />
                      <Route path="/videos" element={<Videos />} />
                      <Route path="/reels" element={<Reels />} />
                      <Route path="/browse" element={<ForYou />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/admin" element={<AdminPanel />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/categories" element={<Navigate to="/reels" replace />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/cart" element={<NotFound />} />
                      <Route path="/wishlist" element={<NotFound />} />
                      <Route path="/more" element={<MoreMenu />} />
                      <Route path="/account" element={<ProfilePage />} />
                      <Route path="/transfer" element={<TransferPage />} />
                      <Route path="/topup" element={<TopUpPage />} />
                      <Route path="/netflix" element={<NetflixPage />} />
                      <Route path="/paypal-checkout" element={<PayPalCheckout />} />
                      
                      {/* New category pages */}
                      <Route path="/electronics" element={<ElectronicsPage />} />
                      <Route path="/home-living" element={<HomeLivingPage />} />
                      <Route path="/fashion" element={<FashionPage />} />
                      <Route path="/entertainment" element={<EntertainmentPage />} />
                      <Route path="/kids-hobbies" element={<KidsHobbiesPage />} />
                      <Route path="/sports-outdoors" element={<SportsOutdoorsPage />} />
                      <Route path="/automotive" element={<AutomotivePage />} />
                      <Route path="/all-categories" element={<CategoriesPage />} />
                      
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                  <AppAuthOverlay />
                </AuthOverlayProvider>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

// Component to handle the auth overlay
const AppAuthOverlay = () => {
  const { isAuthOverlayOpen, closeAuthOverlay } = useAuthOverlay();
  return (
    <AuthOverlay isOpen={isAuthOverlayOpen} onClose={closeAuthOverlay} />
  );
};

export default App;
