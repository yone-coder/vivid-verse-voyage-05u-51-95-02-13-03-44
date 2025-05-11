
import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/layout/Footer";
import IndexBottomNav from "@/components/layout/IndexBottomNav";
import { Outlet, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AliExpressHeader from "@/components/home/AliExpressHeader";
import { useAuthOverlay } from "@/context/AuthOverlayContext";

export default function MainLayout() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const isProductPage = location.pathname.includes('/product/');
  const isHomePage = location.pathname === "/" || location.pathname === "/for-you" || 
                     location.pathname === "/posts" || location.pathname === "/shops" ||
                     location.pathname === "/trending" || location.pathname === "/videos";
  const isReelsPage = location.pathname === "/reels";
  const isProfilePage = location.pathname === "/account";
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get auth overlay context
  const { openAuthOverlay } = useAuthOverlay();

  const getActiveTabFromRoute = () => {
    if (location.pathname === "/" || location.pathname === "/for-you") return "recommendations";
    if (location.pathname === "/posts") return "posts";
    if (location.pathname === "/shops") return "shops";
    if (location.pathname === "/trending") return "trending";
    if (location.pathname === "/videos") return "videos";
    return "recommendations";
  };

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
      }).catch(() => {
        toast({
          title: "Sharing Failed",
          description: "There was an error sharing this content.",
        });
      });
    } else {
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
      --bottom-nav-height: ${isMobile ? '48px' : '0px'};
    }
  `;

  // Redirect auth-related URLs to use the overlay instead
  React.useEffect(() => {
    if (location.pathname === "/auth") {
      openAuthOverlay();
      window.history.replaceState({}, "", "/for-you");
    }
  }, [location.pathname, openAuthOverlay]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style dangerouslySetInnerHTML={{ __html: headerHeightStyle }} />

      {/* AliExpress Header for home pages */}
      {isHomePage && (
        <AliExpressHeader activeTabId={getActiveTabFromRoute()} />
      )}

      <main className="flex-grow relative">
        <Outlet />
      </main>
      
      {!isMobile && !isHomePage && !isReelsPage && !isProfilePage && <Footer />}

      {/* Show bottom nav on mobile for home, reels, product pages, and profile pages */}
      {isMobile && (isHomePage || isProductPage || isReelsPage || isProfilePage) && <IndexBottomNav />}
    </div>
  );
}
