import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductTabs from "@/components/ProductTabs";
import LiveStockUpdates from "@/components/LiveStockUpdates";
import ModernBuyButton from "@/components/ModernBuyButton";
import { useProduct, useProductAnalytics } from "@/hooks/useProduct";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Product Components
import ProductHeader from "@/components/product/ProductHeader";
import DynamicPriceDisplay from "@/components/product/DynamicPriceDisplay";
import EnhancedRating from "@/components/product/EnhancedRating";
import LimitedOffersBand from "@/components/product/LimitedOffersBand";
import ProductColorVariants from "@/components/product/ProductColorVariants";
import ProductQuantitySelector from "@/components/product/ProductQuantitySelector";
import ProductShipping from "@/components/product/ProductShipping";
import ProductWarranty from "@/components/product/ProductWarranty";
import ProductPaymentOptions from "@/components/product/ProductPaymentOptions";
import ProductActionsRow from "@/components/product/ProductActionsRow";
import ProductCoupons from "@/components/product/ProductCoupons";

const ProductDetail = () => {
  // State variables
  const [activeTab, setActiveTab] = useState("description");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVariants, setShowVariants] = useState(true);
  const [selectedColor, setSelectedColor] = useState("Blue Galaxy");
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [isExpressSelected, setIsExpressSelected] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState("none");
  const [maxQuantityReached, setMaxQuantityReached] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [showLiveData, setShowLiveData] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLimitedOffersBand, setShowLimitedOffersBand] = useState(true);
  
  // Refs and hooks
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const limitedOffersBandRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  
  // Use real product data from Supabase
  const { data: product, isLoading } = useProduct(id || "");
  const { data: analytics, isLoading: analyticsLoading } = useProductAnalytics(id || "");
  
  // Event handlers
  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(prev => prev + 1);
      if (quantity === 9) {
        setMaxQuantityReached(true);
        toast({
          title: "Maximum quantity reached",
          description: "You've reached the maximum allowed quantity for this item.",
          variant: "destructive"
        });
      }
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      if (maxQuantityReached) {
        setMaxQuantityReached(false);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || "Product",
        text: `Check out this ${product?.name || "product"}!`,
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

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Item removed from your wishlist" : "Item added to your wishlist",
    });
  };

  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product?.name || "Product"} (${selectedColor}) added to your cart`,
    });
  };

  const buyNow = () => {
    toast({
      title: "Proceeding to checkout",
      description: `Processing order for ${quantity} x ${product?.name || "Product"} (${selectedColor})`,
    });
  };

  const scrollToTabs = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: 'smooth' });
      setActiveTab("description");
    }
  };

  const toggleComparisonMode = () => {
    setComparisonMode(!comparisonMode);
    toast({
      title: !comparisonMode ? "Comparison mode activated" : "Comparison mode deactivated",
      description: !comparisonMode 
        ? "You can now add products to compare" 
        : "Comparison mode has been turned off"
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search submitted",
      description: `Searching for: ${searchQuery}`,
    });
  };

  const handleCartClick = () => {
    toast({
      title: "Cart",
      description: "Opening your shopping cart",
    });
  };

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && tabsRef.current) {
        const scrollY = window.scrollY;
        const headerHeight = headerRef.current.getBoundingClientRect().height;
        const tabsPosition = tabsRef.current.getBoundingClientRect().top + scrollY;
        
        // Show fixed header as soon as we start scrolling past the overlay header
        const isPastOverlay = scrollY > 0;
        setIsScrolled(isPastOverlay);
        
        // Show the header with animation when scrolled past the overlay
        if (isPastOverlay) {
          setIsHeaderVisible(true);
        } else {
          setIsHeaderVisible(false);
        }
        
        // Show/hide limited offers band based on scroll position relative to tabs
        if (scrollY > tabsPosition - 100) {
          setShowLimitedOffersBand(false);
        } else {
          setShowLimitedOffersBand(true);
        }
        
        lastScrollTop.current = scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show loading state while product data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }
  
  // Format product data for display
  const productImages = product.product_images.map(img => img.src);
  const currentPrice = product.discount_price || product.price;
  const originalPrice = product.price;
  
  // Mock data for tabs
  const productForTabs = {
    id: product.id,
    name: product.name,
    price: product.price,
    discountPrice: product.discount_price,
    rating: 4.8,
    reviewCount: 2543,
    sold: 5000,
    description: product.description,
    images: productImages,
    specs: [
      { name: "Projection Area", value: "15-30 sq meters" },
      { name: "Light Source", value: "LED" },
      { name: "Colors", value: "16.7 million" },
      { name: "Control", value: "Remote & App" },
      { name: "Connectivity", value: "Bluetooth, WiFi" },
      { name: "Power", value: "DC 5V, 2A" },
      { name: "Battery Life", value: "Up to 6 hours" },
      { name: "Projection Modes", value: "10 modes" },
      { name: "Timer Settings", value: "30min, 1h, 2h, 4h, 8h" },
      { name: "Warranty", value: "12 months" },
      { name: "Package Contents", value: "Projector, Remote, USB Cable, Manual" },
      { name: "Dimensions", value: "15 x 15 x 10 cm" },
      { name: "Weight", value: "450g" },
    ],
    variants: [
      { name: "Blue Galaxy", price: currentPrice, stock: 256, image: productImages[0] || "/placeholder.svg" },
      { name: "Aurora Borealis", price: currentPrice, stock: 124, image: productImages[1] || "/placeholder.svg" },
      { name: "Cosmic Universe", price: currentPrice, stock: 78, image: productImages[2] || "/placeholder.svg" },
      { name: "Starry Night", price: currentPrice, stock: 216, image: productImages[0] || "/placeholder.svg" },
    ],
    shipping: {
      free: true,
      express: 4.99,
      estimated: "7-14 days",
      expressEstimated: "3-5 days",
      returns: "30-day free returns"
    },
    coupons: [
      { code: "GALAXY10", discount: "10% off" },
      { code: "NEWUSER5", discount: "$5 off for new users" },
      { code: "FLASH25", discount: "25% off today only" }
    ],
    features: [
      "16.7 million vibrant colors",
      "Remote and mobile app control",
      "10 projection modes",
      "Built-in Bluetooth speaker",
      "USB rechargeable",
      "Auto timer function",
      "360° rotation stand",
      "Music reactive modes",
      "IP65 water resistant",
      "Child-safe certified"
    ],
    payments: [
      "Credit/Debit Cards",
      "PayPal",
      "Apple Pay",
      "Google Pay",
      "Afterpay - Buy Now Pay Later",
      "Klarna - 4 interest-free payments"
    ],
    warranty: [
      { name: "Standard", duration: "1 year", price: 0 },
      { name: "Extended", duration: "2 years", price: 4.99 },
      { name: "Premium", duration: "3 years", price: 9.99 }
    ],
    stock: {
      total: 1204,
      reserved: 56,
      selling_fast: true
    },
    badges: []
  };
  
  const currentVariant = productForTabs.variants.find(v => v.name === selectedColor);
  const currentStock = currentVariant ? currentVariant.stock : 0;
  
  const warrantyOption = productForTabs.warranty.find(w => w.name.toLowerCase() === selectedWarranty);
  const warrantyPrice = warrantyOption ? warrantyOption.price : 0;
  
  const totalPrice = (currentPrice * quantity) + warrantyPrice + (giftWrap ? 2.99 : 0) + (isExpressSelected ? productForTabs.shipping.express : 0);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Gallery Section with Header Overlay */}
      <div ref={headerRef} className="relative w-full bg-gray-50">
        {/* Header overlay - positioned absolutely on top of the image */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <ProductHeader 
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            handleShare={handleShare}
            handleCartClick={handleCartClick}
            isScrolled={false}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
        </div>
        
        <ProductImageGallery images={productImages.length > 0 ? productImages : ["/placeholder.svg"]} />
      </div>

      {/* Fixed header when scrolled - visible as soon as we scroll past the overlay */}
      <div 
        className={`fixed top-0 left-0 right-0 z-30 transition-transform duration-300 ${
          isHeaderVisible && isScrolled ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <ProductHeader 
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          handleShare={handleShare}
          handleCartClick={handleCartClick}
          isScrolled={true}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />

        {/* Limited Offers Band below fixed header - only visible when scrolled */}
        {showLimitedOffersBand && <LimitedOffersBand />}
      </div>
      
      {/* Removed the Limited Offers Band from this position */}
      
      <div className={`flex-1 ${isScrolled ? 'pt-0' : ''}`}>
        <div className="bg-white p-1">
          <div className="flex items-center justify-between mb-0.5">
            {/* Badges section removed */}
          </div>
          
          {/* Product title now appears before price */}
          <h1 className="text-lg font-medium">{product.name}</h1>
          
          <div className="flex items-center justify-between mt-1">
            {/* Replace static price display with dynamic component */}
            <DynamicPriceDisplay />
          </div>
          
          {/* Replace original ProductRatings with new EnhancedRating component */}
          <EnhancedRating />
          
          <div className="mt-3">
            {/* Adding ProductCoupons component back */}
            <ProductCoupons coupons={productForTabs.coupons} />
          </div>
          
          <div className="mt-4">
            <ProductColorVariants 
              variants={productForTabs.variants}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />
          </div>
        </div>
        
        <div className="mt-2 mb-2 p-3 bg-white">
          <LiveStockUpdates 
            initialStock={currentStock}
            highDemand={productForTabs.stock.selling_fast}
          />
          
          <div className="mt-4">
            <ProductQuantitySelector 
              quantity={quantity}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
            />
          </div>
          
          <div className="mt-4">
            <ProductShipping
              shippingInfo={productForTabs.shipping}
              isExpressSelected={isExpressSelected}
              onExpressChange={setIsExpressSelected}
              giftWrap={giftWrap}
              onGiftWrapChange={setGiftWrap}
            />
          </div>
          
          <div className="mt-4">
            <ProductWarranty
              warrantyOptions={productForTabs.warranty}
              selectedWarranty={selectedWarranty}
              onWarrantyChange={setSelectedWarranty}
            />
          </div>
          
          <div className="mt-4">
            <ProductPaymentOptions paymentOptions={productForTabs.payments} />
          </div>
          
          <ProductActionsRow 
            addToCart={addToCart}
            buyNow={buyNow}
          />
        </div>
      </div>
      
      <div ref={tabsRef} className="relative">
        <ProductTabs 
          product={productForTabs}
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isScrolled={isScrolled} 
          headerHeight={isScrolled ? 40 : 0}
        />
      </div>
      
      <div className="pb-44"></div>
      
      <ModernBuyButton />
    </div>
  );
};

export default ProductDetail;
