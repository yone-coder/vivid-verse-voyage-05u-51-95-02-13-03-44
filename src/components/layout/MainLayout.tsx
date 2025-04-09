
import React from "react";
import Header from "@/components/layout/Header";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isMobile && <Footer />}
    </div>
  );
}
