
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Heart, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HeaderTabs from "@/components/product/HeaderTabs";

export default function MainLayout() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const isProductPage = location.pathname.includes('/product/');
  const isHomePage = location.pathname === "/";
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: !isFavorite ? "Added to Wishlist" : "Removed from Wishlist",
      description: !isFavorite ? "This item has been added to your wishlist" : "This item has been removed from your wishlist",
    });
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this product',
        text: 'I found this amazing product I thought you might like!',
        url: window.location.href,
      }).catch((error) => {
        toast({
          title: "Sharing Failed",
          description: "There was an error sharing this content.",
        });
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Product link copied to clipboard!",
      });
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search submitted",
      description: `Searching for: ${searchQuery}`,
    });
  };
  
  // Use the css variable approach for header height - using reduced height for AliExpress-like compact header
  const headerHeightStyle = `
    :root {
      --header-height: ${isMobile ? '44px' : '90px'};
    }
  `;
  
  // Handle tab changes that should be synchronized between header tabs and content tabs
  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <style dangerouslySetInnerHTML={{ __html: headerHeightStyle }} />
      
      {/* Show dynamic header on product pages */}
      {isProductPage && (
        <Header 
          isProductHeader={true}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          handleShare={handleShare}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      )}
      
      {/* Show standard header for non-product pages */}
      {!isProductPage && !isHomePage && (
        <Header 
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      )}
      
      {/* Header tabs for product pages */}
      {isProductPage && (
        <HeaderTabs activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      
      {isProductPage || isHomePage ? (
        <main className="flex-grow relative">
          <Outlet />
        </main>
      ) : (
        <main className="flex-grow pb-20">
          <Outlet />
        </main>
      )}
      {!isMobile && !isHomePage && <Footer />}
      {isMobile && !isProductPage && !isHomePage && <MobileBottomNav />}
    </div>
  );
}
