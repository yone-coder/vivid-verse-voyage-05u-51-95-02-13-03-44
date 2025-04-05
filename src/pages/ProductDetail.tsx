
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Share } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductTabs from "@/components/ProductTabs";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Mock product data
  const product = {
    id: "nebula-pro-2025",
    name: "Galaxy Nebula Projector Pro 2025",
    price: 39.99,
    discountPrice: 24.99,
    rating: 4.8,
    reviewCount: 2543,
    sold: 5000,
    description: "Transform your room into a mesmerizing galaxy with our advanced nebula projector. Features 16.7 million colors, remote control, and 10 projection modes.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    specs: [
      { name: "Projection Area", value: "15-30 sq meters" },
      { name: "Light Source", value: "LED" },
      { name: "Colors", value: "16.7 million" },
      { name: "Control", value: "Remote & App" },
      { name: "Connectivity", value: "Bluetooth, WiFi" },
      { name: "Power", value: "DC 5V, 2A" },
      { name: "Battery Life", value: "Up to 6 hours" },
    ],
  };

  // Handle scroll to detect when to show sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom;
        setIsScrolled(headerBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name}!`,
        url: window.location.href,
      }).catch((error) => {
        console.log('Error sharing:', error);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Product link copied to clipboard",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header section with gallery */}
      <div ref={headerRef} className="relative w-full">
        <ProductImageGallery images={product.images} />
        
        {/* Overlay buttons on gallery */}
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <Link to="/">
            <Button variant="outline" size="icon" className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90"
            onClick={handleShare}
          >
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Sticky header that appears when scrolled */}
      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 bg-white z-30 shadow-sm">
          <div className="flex items-center h-14 px-4">
            <Link to="/" className="mr-auto">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="mr-auto ml-2 font-medium truncate max-w-[200px]">
              {product.name}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={handleShare}
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Product info and tabs */}
      <div className={`flex-1 ${isScrolled ? 'pt-14' : ''}`}>
        {/* Basic product info */}
        <div className="bg-white p-4 mb-2">
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-red-500">${product.discountPrice}</span>
            <span className="ml-2 text-sm line-through text-gray-500">${product.price}</span>
            <span className="ml-2 text-xs px-1.5 py-0.5 bg-red-100 text-red-500 rounded">
              {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
            </span>
          </div>
          
          <h1 className="text-lg font-medium mt-2">{product.name}</h1>
          
          <div className="flex items-center mt-2 text-sm">
            <div className="flex text-amber-400">
              {'★'.repeat(Math.floor(product.rating))}
              {product.rating % 1 !== 0 && '☆'}
              {'☆'.repeat(5 - Math.ceil(product.rating))}
              <span className="ml-1 text-black">{product.rating}</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-500">{product.reviewCount} Reviews</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-500">{product.sold}+ Sold</span>
          </div>
        </div>
        
        {/* Tabs for product details */}
        <ProductTabs 
          product={product} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isScrolled={isScrolled}
        />
          
        {/* Add to cart sticky footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex items-center z-20">
          <div className="flex-1 flex space-x-2">
            <Button variant="outline" className="flex-1 bg-white text-red-500 border-red-500 hover:bg-red-50">
              Add to Cart
            </Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white">
              Buy Now
            </Button>
          </div>
        </div>
        
        {/* Extra padding at bottom to account for fixed footer */}
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default ProductDetail;
