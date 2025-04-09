
import React from "react";
import Header from "@/components/layout/Header";
import ProductHeader from "@/components/layout/ProductHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/layout/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const isProductPage = location.pathname.includes('/product/');
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {isProductPage ? <ProductHeader /> : <Header />}
      <main className={`flex-grow ${isProductPage ? 'pt-0' : ''}`}>
        <Outlet />
      </main>
      {!isMobile && <Footer />}
    </div>
  );
}
