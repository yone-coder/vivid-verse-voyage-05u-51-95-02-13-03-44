
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { useProduct } from "@/hooks/useProduct";
import ProductTabs from "@/components/ProductTabs";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductImageGallery from "@/components/ProductImageGallery";
import LiveStockUpdates from "@/components/LiveStockUpdates";
import ModernBuyButton from "@/components/ModernBuyButton";
import LivePurchaseBanner from "@/components/LivePurchaseBanner";
import LiveActivityNotifications from "@/components/LiveActivityNotifications";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id);
  const { toast: uiToast } = useToast();
  
  const [activeTab, setActiveTab] = useState("description");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef<number>(0);
  
  // Product image gallery
  const images = [
    "/lovable-uploads/4dbaee7c-2ac5-4a1b-9f9b-121275273e79.png",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000",
  ];
  
  // Product data for tabs
  const productForTabs = product || {
    id: "123",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, comfortable ear cushions, and 30+ hour battery life. Perfect for music lovers, gamers, and professionals alike.",
    features: [
      "Active noise cancellation",
      "30+ hour battery life",
      "Premium sound quality",
      "Comfortable fit for all-day wear",
      "Fast charging - 5 minutes for 2 hours of playback",
      "Bluetooth 5.0 connectivity"
    ],
    specifications: [
      { name: "Battery Life", value: "30+ hours" },
      { name: "Bluetooth", value: "5.0" },
      { name: "Weight", value: "250g" },
      { name: "Driver Size", value: "40mm" },
      { name: "Frequency Response", value: "20Hz - 20kHz" },
      { name: "Impedance", value: "32 Ohm" },
      { name: "Noise Cancellation", value: "Yes, Active" }
    ],
    reviews: [
      { id: "1", rating: 5, author: "Alex J.", title: "Amazing sound quality!", content: "These headphones have incredible sound quality and the noise cancellation is top-notch. Battery life is as advertised - I've gone a week of daily use without charging!" },
      { id: "2", rating: 4, author: "Sam T.", title: "Comfortable for long sessions", content: "Very comfortable even after wearing them for 8+ hours. Sound is great, though bass could be a bit stronger. Connectivity has been flawless." },
      { id: "3", rating: 5, author: "Jamie L.", title: "Perfect for travel", content: "The noise cancellation makes these perfect for flights and busy commutes. The carrying case is also very sturdy and compact." }
    ]
  };

  useEffect(() => {
    if (error) {
      uiToast({
        title: "Error",
        description: "Failed to load product details.",
        variant: "destructive",
      });
    }
  }, [error, uiToast]);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && tabsRef.current) {
        const scrollY = window.scrollY;
        const headerHeight = headerRef.current.getBoundingClientRect().height;
        const tabsPosition = tabsRef.current.getBoundingClientRect().top + scrollY;
        
        // Detect scroll direction
        const isScrollUp = scrollY < lastScrollTop.current;
        setIsScrollingUp(isScrollUp);
        
        // Determine if we've scrolled past the header
        if (scrollY > headerHeight) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
        
        // Handle header visibility based on scroll direction
        if (scrollY > headerHeight * 1.5) {
          setShowHeader(!isScrollUp); // Hide header when scrolling up, show when scrolling down
        } else {
          setShowHeader(true); // Always show header near top of page
        }
        
        lastScrollTop.current = scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse p-4">
        <div className="h-72 bg-gray-200 rounded-md mb-4"></div>
        <div className="h-10 bg-gray-200 rounded-md mb-4"></div>
        <div className="h-20 bg-gray-200 rounded-md mb-4"></div>
        <div className="h-40 bg-gray-200 rounded-md"></div>
      </div>
    );
  }

  if (!product && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Product header */}
      <div 
        ref={headerRef} 
        className={`sticky top-0 z-30 bg-white transition-transform duration-300 ${!showHeader && isScrolled ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h1 className="font-bold text-lg line-clamp-1">
            {product?.name || "Premium Wireless Headphones"}
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Share2 size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Heart size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product content */}
      <div className="px-0 pt-0">
        {/* Image gallery */}
        <ProductImageGallery images={images} />
        
        <div className="px-4 mt-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {product?.name || "Premium Wireless Headphones"}
          </h1>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">$149.99</span>
              <span className="text-lg text-gray-500 line-through ml-2">$199.99</span>
            </div>
            
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
              25% OFF
            </span>
          </div>
          
          <LiveStockUpdates initialStock={37} highDemand={true} />
        </div>
        
        {/* Product tabs */}
        <div ref={tabsContainerRef} className="mt-6">
          <div ref={tabsRef}>
            <ProductTabs 
              product={productForTabs}
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              isScrolled={isScrolled} 
              headerHeight={isScrolled && showHeader ? 40 : 0}
              hideOnScrollUp={true}
              isScrollingUp={isScrollingUp}
            />
          </div>
        </div>
      </div>
      
      {/* Purchase banner & notifications */}
      <LivePurchaseBanner productName="Wireless Headphones" />
      <LiveActivityNotifications />
      <ModernBuyButton productId={id} />
    </div>
  );
};

export default ProductDetail;
