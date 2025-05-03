import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import IndexBottomNav from "@/components/layout/IndexBottomNav";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function MainLayout() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const isProductPage = location.pathname.includes('/product/');
  const isHomePage = location.pathname === "/";
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
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
  
  const headerHeightStyle = `
    :root {
      --header-height: ${isMobile ? '44px' : '90px'};
    }
  `;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <style dangerouslySetInnerHTML={{ __html: headerHeightStyle }} />
      
      {/* No header for home page (handled by AliExpressHeader) or product pages */}
      {!isProductPage && !isHomePage && (
        <Header 
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
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
      
      {/* Show our custom bottom nav only on mobile and appropriate pages */}
      {isMobile && isHomePage && <IndexBottomNav />}
    </div>
  );
}
