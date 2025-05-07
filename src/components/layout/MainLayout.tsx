
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import SignInBanner from "./SignInBanner";

interface MainLayoutProps {
  openAuthDialog: () => void;
}

export default function MainLayout({ openAuthDialog }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
      <SignInBanner openAuthDialog={openAuthDialog} />
    </div>
  );
}
