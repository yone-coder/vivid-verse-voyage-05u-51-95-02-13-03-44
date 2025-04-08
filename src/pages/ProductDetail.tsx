import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductTabs from "@/components/ProductTabs";
import LiveStockUpdates from "@/components/LiveStockUpdates";
import ModernBuyButton from "@/components/ModernBuyButton";
import { useProductAnalytics } from "@/hooks/useProduct";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Product Components
import ProductHeader from "@/components/product/ProductHeader";
import ProductBadges from "@/components/product/ProductBadges";
import ProductPriceDisplay from "@/components/product/ProductPriceDisplay";
import ProductLiveData from "@/components/product/ProductLiveData";
import ProductRatings from "@/components/product/ProductRatings";
import ProductLimitedTimeOffer from "@/components/product/ProductLimitedTimeOffer";
import ProductCoupons from "@/components/product/ProductCoupons";
import ProductColorVariants from "@/components/product/ProductColorVariants";
import ProductQuantitySelector from "@/components/product/ProductQuantitySelector";
import ProductShipping from "@/components/product/ProductShipping";
import ProductWarranty from "@/components/product/ProductWarranty";
import ProductPaymentOptions from "@/components/product/ProductPaymentOptions";
import ProductActionsRow from "@/components/product/ProductActionsRow";

const ProductDetail = () => {
  // State variables
  const [activeTab, setActiveTab] = useState("description");
  const [isScrolled, setIsScrolled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVariants, setShowVariants] = useState(true);
  const [selectedColor, setSelectedColor] = useState("Blue Galaxy");
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [isExpressSelected, setIsExpressSelected] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 35, seconds: 47 });
  const [giftWrap, setGiftWrap] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState("none");
  const [maxQuantityReached, setMaxQuantityReached] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [showLiveData, setShowLiveData] = useState(true);
  
  // Refs and hooks
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const { data: analytics, isLoading: analyticsLoading } = useProductAnalytics(id || "nebula-pro-2025");
  
  // Product data (could be fetched from an API in a real app)
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
      { name: "Projection Modes", value: "10 modes" },
      { name: "Timer Settings", value: "30min, 1h, 2h, 4h, 8h" },
      { name: "Warranty", value: "12 months" },
      { name: "Package Contents", value: "Projector, Remote, USB Cable, Manual" },
      { name: "Dimensions", value: "15 x 15 x 10 cm" },
      { name: "Weight", value: "450g" },
    ],
    variants: [
      { name: "Blue Galaxy", price: 24.99, stock: 256, image: "/placeholder.svg" },
      { name: "Aurora Borealis", price: 27.99, stock: 124, image: "/placeholder.svg" },
      { name: "Cosmic Universe", price: 29.99, stock: 78, image: "/placeholder.svg" },
      { name: "Starry Night", price: 24.99, stock: 216, image: "/placeholder.svg" },
      { name: "Deep Space", price: 26.99, stock: 113, image: "/placeholder.svg" },
      { name: "Nebula Cloud", price: 25.99, stock: 167, image: "/placeholder.svg" },
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
      description: `${quantity} x ${product.name} (${selectedColor}) added to your cart`,
    });
  };

  const buyNow = () => {
    toast({
      title: "Proceeding to checkout",
      description: `Processing order for ${quantity} x ${product.name} (${selectedColor})`,
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
  
  // Effects
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && tabsRef.current) {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom;
        const tabsTop = tabsRef.current.getBoundingClientRect().top;
        setIsScrolled(headerBottom < 0 || tabsTop <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newSeconds = prevTime.seconds - 1;
        
        if (newSeconds < 0) {
          const newMinutes = prevTime.minutes - 1;
          
          if (newMinutes < 0) {
            const newHours = prevTime.hours - 1;
            
            if (newHours < 0) {
              clearInterval(timer);
              return { hours: 0, minutes: 0, seconds: 0 };
            }
            
            return { hours: newHours, minutes: 59, seconds: 59 };
          }
          
          return { ...prevTime, minutes: newMinutes, seconds: 59 };
        }
        
        return { ...prevTime, seconds: newSeconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Derived data
  const currentVariant = product.variants.find(v => v.name === selectedColor);
  const currentPrice = currentVariant ? currentVariant.price : product.discountPrice;
  const originalPrice = currentVariant ? Math.round(currentVariant.price * 1.6 * 100) / 100 : product.price;
  
  const warrantyOption = product.warranty.find(w => w.name.toLowerCase() === selectedWarranty);
  const warrantyPrice = warrantyOption ? warrantyOption.price : 0;
  
  const totalPrice = (currentPrice * quantity) + warrantyPrice + (giftWrap ? 2.99 : 0) + (isExpressSelected ? product.shipping.express : 0);
  
  const currentStock = currentVariant ? currentVariant.stock : 0;
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div ref={headerRef} className="relative w-full bg-white">
        <ProductImageGallery images={product.images} />
        
        <ProductHeader 
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          handleShare={handleShare}
        />
      </div>

      {isScrolled && (
        <ProductHeader 
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          handleShare={handleShare}
          isScrolled={true}
        />
      )}
      
      <div className={`flex-1 ${isScrolled ? 'pt-10' : ''}`}>
        <div className="bg-white p-3 mb-0">
          <div className="flex items-center justify-between mb-0.5">
            <ProductBadges 
              hasFreeShipping={product.shipping.free}
              isTopSeller={true}
              isFlashDeal={true}
              isTrending={analytics?.trending}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <ProductPriceDisplay 
              currentPrice={currentPrice}
              originalPrice={originalPrice}
            />
            
            {showLiveData && analytics && (
              <ProductLiveData 
                analytics={analytics}
                onClose={() => setShowLiveData(false)}
              />
            )}
          </div>
          
          <h1 className="text-lg font-medium mt-1">{product.name}</h1>
          
          <ProductRatings 
            rating={product.rating}
            reviewCount={product.reviewCount}
            soldCount={product.sold}
          />

          <div className="mt-4">
            <ProductLimitedTimeOffer timeLeft={timeLeft} />
          </div>
          
          <div className="mt-3">
            <ProductCoupons coupons={product.coupons} />
          </div>
          
          <div className="mt-4">
            <ProductColorVariants 
              variants={product.variants}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />
          </div>
        </div>
        
        <div className="mt-2 mb-2 p-4 bg-white">
          <LiveStockUpdates 
            initialStock={currentStock}
            highDemand={product.stock.selling_fast}
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
              shippingInfo={product.shipping}
              isExpressSelected={isExpressSelected}
              onExpressChange={setIsExpressSelected}
              giftWrap={giftWrap}
              onGiftWrapChange={setGiftWrap}
            />
          </div>
          
          <div className="mt-4">
            <ProductWarranty
              warrantyOptions={product.warranty}
              selectedWarranty={selectedWarranty}
              onWarrantyChange={setSelectedWarranty}
            />
          </div>
          
          <div className="mt-4">
            <ProductPaymentOptions paymentOptions={product.payments} />
          </div>
          
          <ProductActionsRow 
            addToCart={addToCart}
            buyNow={buyNow}
          />
        </div>
      </div>
      
      <div ref={tabsRef} className="relative">
        <ProductTabs 
          product={product} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isScrolled={isScrolled} 
          headerHeight={isScrolled ? 40 : 0}
        />
      </div>
      
      <div className="pb-32"></div>
      
      <ModernBuyButton />
    </div>
  );
};

export default ProductDetail;
