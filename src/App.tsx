
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ForYou from "./pages/ForYou";
import Posts from "./pages/Posts";
import Shops from "./pages/Shops";
import Trending from "./pages/Trending";
import Videos from "./pages/Videos";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import SearchPage from "./pages/SearchPage";
import AdminPanel from "./pages/AdminPanel";
import MainLayout from "./components/layout/MainLayout";
import { ThemeProvider } from "@/components/theme-provider";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate to="/for-you" replace />} />
                <Route path="/for-you" element={<ForYou />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/shops" element={<Shops />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/browse" element={<ForYou />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/categories" element={<NotFound />} />
                <Route path="/cart" element={<NotFound />} />
                <Route path="/wishlist" element={<NotFound />} />
                <Route path="/account" element={<NotFound />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
