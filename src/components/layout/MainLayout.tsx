
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/layout/Footer";
import IndexBottomNav from "@/components/layout/IndexBottomNav";
import { Outlet, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AliExpressHeader from "@/components/home/AliExpressHeader";
import { useAuthOverlay } from "@/context/AuthOverlayContext";
import { LanguageProvider } from "@/context/LanguageContext";
import FloatingActionButton from "./FloatingActionButton";
import ProductUploadOverlay from "@/components/product/ProductUploadOverlay";

export default function MainLayout() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const pathname = location.pathname;
  const isProductPage = pathname.includes('/product/');
  const isRootHomePage = pathname === "/" || pathname === "/for-you";
  const isPaytmHomePage = pathname === "/";
  const isForYouPage = pathname === "/" || pathname === "/for-you";
  const isMultiStepTransferPage = pathname === "/multi-step-transfer";
  const isMultiStepTransferSheetPage = pathname === "/multi-step-transfer-page";
  const isTransferOldPage = pathname === "/transfer-old";
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductUpload, setShowProductUpload] = useState(false);

  const { openAuthOverlay } = useAuthOverlay();

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
      --header-height: ${isMobile ? '80px' : '120px'};
      --bottom-nav-height: ${isMobile && !isMultiStepTransferPage && !isMultiStepTransferSheetPage && !isTransferOldPage ? '48px' : '0px'};
    }
  `;

  useEffect(() => {
    if (pathname === "/auth") {
      openAuthOverlay();
      window.history.replaceState({}, "", "/");
    }
  }, [pathname, openAuthOverlay]);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <style dangerouslySetInnerHTML={{ __html: headerHeightStyle }} />

        {/* Show AliExpressHeader only on mobile For You page, but not on Paytm homepage */}
        {isForYouPage && isMobile && !isPaytmHomePage && (
          <AliExpressHeader activeTabId={isRootHomePage ? "recommendations" : ""} />
        )}

        <main className="flex-grow relative">
          <Outlet />
        </main>

        {/* Show Footer only on non-mobile and on specific pages, but not on Paytm homepage */}
        {!isMobile && !isRootHomePage && !isPaytmHomePage && <Footer />}

        {/* Floating action button - exclude from Paytm homepage and transfer pages */}
        {!isPaytmHomePage && !isMultiStepTransferPage && !isMultiStepTransferSheetPage && !isTransferOldPage && (
          <FloatingActionButton onClick={() => setShowProductUpload(true)} />
        )}

        {/* Show IndexBottomNav on mobile but not on Paytm homepage or transfer pages */}
        {isMobile && !isPaytmHomePage && !isMultiStepTransferPage && !isMultiStepTransferSheetPage && !isTransferOldPage && <IndexBottomNav />}

        {/* Product Upload Overlay */}
        <ProductUploadOverlay
          isOpen={showProductUpload}
          onClose={() => setShowProductUpload(false)}
        />
      </div>
    </LanguageProvider>
  );
}
