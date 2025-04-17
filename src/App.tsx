
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import SearchPage from "./pages/SearchPage";
import AdminPanel from "./pages/AdminPanel";
import Checkout from "./pages/Checkout";
import MainLayout from "./components/layout/MainLayout";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

// Using Nebula Lamp product ID as the default route
const NEBULA_LAMP_ID = "f47ac10b-58cc-4372-a567-0e02b2c3d479";

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
                <Route path="/" element={<ProductDetail />} />
                <Route path="/browse" element={<Index />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/categories" element={<NotFound />} />
                <Route path="/cart" element={<NotFound />} />
                <Route path="/wishlist" element={<NotFound />} />
                <Route path="/account" element={<NotFound />} />
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
