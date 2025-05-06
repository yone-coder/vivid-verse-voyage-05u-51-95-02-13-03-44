
import React from "react";
import { Outlet } from "react-router-dom";
import MobileNavbar from "@/components/navigation/MobileNavbar";
import Header from "@/components/navigation/Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <MobileNavbar />
    </div>
  );
};

export default MainLayout;
