
import React from "react";
import Header from "@/components/layout/Header";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/layout/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { Heart, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LivePurchaseBanner from "@/components/LivePurchaseBanner";

export default function MainLayout() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const isProductPage = location.pathname.includes('/product/');
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(3); // Demo count for wishlist items
  
  // Get current product name from URL for live purchase banner
  const productName = isProductPage ? 
    location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Product' : '';
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      setWishlistCount(prev => prev + 1);
    } else {
      setWishlistCount(prev => Math.max(0, prev - 1));
    }
    
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
  
  // Use the css variable approach for header height
  const headerHeightStyle = `
    :root {
      --header-height: ${isMobile ? '44px' : '90px'};
    }
  `;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <style dangerouslySetInnerHTML={{ __html: headerHeightStyle }} />
      {isProductPage ? (
        <>
          <Header 
            isProductHeader 
            isFavorite={isFavorite} 
            toggleFavorite={toggleFavorite} 
            handleShare={handleShare}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            notificationCount={wishlistCount}
          />
          <div className="pt-0">
            <LivePurchaseBanner productName={productName} />
          </div>
        </>
      ) : (
        <Header 
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          notificationCount={wishlistCount}
        />
      )}
      <main className={`flex-grow ${isProductPage ? 'pb-20' : ''}`}>
        <Outlet />
      </main>
      {!isMobile && <Footer />}
    </div>
  );
}
