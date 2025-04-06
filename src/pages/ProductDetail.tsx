import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Share, Heart, MessageCircle, Truck, Shield, Award, Percent, ThumbsUp, Zap, Star, Sparkles, ArrowRight, Crown, Clock, Gift, Check, Info, CreditCard, AlertCircle, Bookmark, Box, Tag, Download, Users, Rocket, Copy, Scissors, BadgePercent, TicketPercent, BookmarkPlus, BellRing, ShieldCheck, CircleDollarSign, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductTabs from "@/components/ProductTabs";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import LiveActivityNotifications from "@/components/LiveActivityNotifications";
import LiveStockUpdates from "@/components/LiveStockUpdates";
import { Switch } from "@/components/ui/switch";
import ModernBuyButton from "@/components/ModernBuyButton";
import { HoverCard, HoverCardContent, HoverCardTrigger, HoverCardWithDuration } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [isScrolled, setIsScrolled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVariants, setShowVariants] = useState(true);
  const [selectedColor, setSelectedColor] = useState("Blue Galaxy");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [isExpressSelected, setIsExpressSelected] = useState(false);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 35, seconds: 47 });
  const [giftWrap, setGiftWrap] = useState(false);
  const [showWarrantyOptions, setShowWarrantyOptions] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState("none");
  const [maxQuantityReached, setMaxQuantityReached] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const [showPerkInfo, setShowPerkInfo] = useState(false);
  const [isNotifyActive, setIsNotifyActive] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [earlyAccessActivated, setEarlyAccessActivated] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 1000);
    
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

  const toggleVariants = () => {
    setShowVariants(!showVariants);
  };

  const applyCoupon = (code: string) => {
    toast({
      title: "Coupon applied!",
      description: `${code} discount has been applied to your order`,
    });
  };

  const askQuestion = () => {
    toast({
      title: "Question form",
      description: "A form would open to ask a question about this product",
    });
  };

  const scrollToTabs = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: 'smooth' });
      setActiveTab("description");
    }
  };

  const toggleGiftWrap = () => {
    setGiftWrap(!giftWrap);
    toast({
      title: !giftWrap ? "Gift wrapping added" : "Gift wrapping removed",
      description: !giftWrap 
        ? "Your item will be gift wrapped with a personalized message" 
        : "Gift wrapping has been removed from your order"
    });
  };

  const copyCouponToClipboard = (coupon: string) => {
    navigator.clipboard.writeText(coupon);
    toast({
      title: "Coupon copied!",
      description: `${coupon} has been copied to your clipboard`,
    });
  };

  const handlePriceAlert = () => {
    setIsNotifyActive(!isNotifyActive);
    toast({
      title: isNotifyActive ? "Price alert removed" : "Price alert set",
      description: isNotifyActive 
        ? "You will no longer receive notifications for price drops" 
        : "We'll notify you when this product's price drops",
    });
  };

  const handleEarlyAccess = () => {
    setEarlyAccessActivated(!earlyAccessActivated);
    toast({
      title: earlyAccessActivated ? "Early access deactivated" : "Early access activated!",
      description: earlyAccessActivated
        ? "You'll no longer get early access to new products"
        : "You'll now get early access to new products in this category",
    });
  };

  const currentVariant = product.variants.find(v => v.name === selectedColor);
  const currentPrice = currentVariant ? currentVariant.price : product.discountPrice;
  const originalPrice = currentVariant ? Math.round(currentVariant.price * 1.6 * 100) / 100 : product.price;
  
  const warrantyOption = product.warranty.find(w => w.name.toLowerCase() === selectedWarranty);
  const warrantyPrice = warrantyOption ? warrantyOption.price : 0;
  
  const totalPrice = (currentPrice * quantity) + warrantyPrice + (giftWrap ? 2.99 : 0) + (isExpressSelected ? product.shipping.express : 0);
  
  const formatPrice = (price: number) => price.toFixed(2);

  const currentStock = currentVariant ? currentVariant.stock : 0;
  const stockPercentage = Math.min(100, Math.max(5, (currentStock / 300) * 100));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div ref={headerRef} className="relative w-full bg-white">
        <ProductImageGallery images={product.images} />
        
        <div className="absolute top-2 left-2 right-2 flex justify-between z-10">
          <Link to="/">
            <Button variant="outline" size="sm" className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90"
              onClick={toggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 bg-white z-30 shadow-sm">
          <div className="flex items-center h-10 px-3">
            <Link to="/" className="mr-auto">
              <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="mr-auto ml-1 font-medium truncate max-w-[200px] text-sm">
              {product.name}
            </div>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full h-8 w-8 p-0"
                onClick={toggleFavorite}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full h-8 w-8 p-0"
                onClick={handleShare}
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className={`flex-1 ${isScrolled ? 'pt-10' : ''}`}>
        <div className="bg-white p-3 mb-0">
          <div className="flex items-center mb-0.5">
            <Badge variant="outline" className="text-xs bg-red-50 text-red-500 border-red-200">Flash Deal</Badge>
            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-500 border-orange-200 ml-1">Top Seller</Badge>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-500 border-green-200 ml-1">Free Shipping</Badge>
          </div>
          
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-red-500">${formatPrice(currentPrice)}</span>
            <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
            <span className="ml-2 text-xs px-1.5 py-0.5 bg-red-100 text-red-500 rounded">
              {Math.round((1 - currentPrice / originalPrice) * 100)}% OFF
            </span>
          </div>
          
          <h1 className="text-lg font-medium mt-1">{product.name}</h1>
          
          <div className="flex items-center mt-1 text-sm">
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

          <div className="mt-4">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-100 p-2.5 rounded-md border border-purple-200 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/30 to-violet-300/10 rounded-full -translate-x-4 -translate-y-10 blur-md"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-300/20 to-purple-400/10 rounded-full translate-x-2 translate-y-6 blur-md"></div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative mr-2">
                    <div className="absolute inset-0 bg-purple-600 rounded-full animate-ping opacity-30"></div>
                    <Zap className="h-4 w-4 text-purple-600 relative z-10" />
                  </div>
                  <span className="font-medium text-purple-900">Limited Time Offer</span>
                </div>
                
                <div className="flex space-x-1">
                  <HoverCardWithDuration openDelay={300} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-6 w-6 p-0 rounded-full ${earlyAccessActivated ? "bg-purple-200" : "bg-white/60"}`}
                        onClick={handleEarlyAccess}
                      >
                        <BookmarkPlus className={`h-3.5 w-3.5 ${earlyAccessActivated ? "text-purple-700" : "text-gray-500"}`} />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-60 p-3">
                      <div className="font-medium mb-1 text-sm">Early Access</div>
                      <p className="text-xs text-muted-foreground">
                        {earlyAccessActivated
                          ? "You have early access to new releases in this category"
                          : "Get early access to new releases in this category"}
                      </p>
                    </HoverCardContent>
                  </HoverCardWithDuration>
                  
                  <HoverCardWithDuration openDelay={300} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-6 w-6 p-0 rounded-full ${isNotifyActive ? "bg-purple-200" : "bg-white/60"}`}
                        onClick={handlePriceAlert}
                      >
                        <BellRing className={`h-3.5 w-3.5 ${isNotifyActive ? "text-purple-700" : "text-gray-500"}`} />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-60 p-3">
                      <div className="font-medium mb-1 text-sm">Price Drop Alert</div>
                      <p className="text-xs text-muted-foreground">
                        {isNotifyActive 
                          ? "You will be notified when this product's price drops"
                          : "Get notified when this product's price drops"}
                      </p>
                    </HoverCardContent>
                  </HoverCardWithDuration>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-1.5 mb-0.5">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5 text-purple-700" />
                  <span className="text-xs text-purple-800 font-medium">Deal ends in:</span>
                </div>
                
                <HoverCardWithDuration openDelay={300} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 px-1 py-0 text-[10px] text-purple-800 hover:bg-purple-200 hover:text-purple-900"
                      onClick={() => setShowPriceHistory(!showPriceHistory)}
                    >
                      {showPriceHistory ? "Hide history" : "Price history"}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64 p-3">
                    <div className="font-medium mb-1 text-sm">Price History</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                    <div className="h-24 w-full bg-slate-50 rounded-md flex items-end p-1 space-x-[2px]">
                      {[7,5,6,8,9,8,7,5,6,4,5,7,8,9,10,9,8,7,6,5,6,7,5,4,3,5,7,8,6,5].map((value, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-purple-200 rounded-sm" 
                          style={{ height: `${value * 10}%` }} 
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-green-700">Lowest: $19.99</div>
                      <div className="text-xs text-red-700">Highest: $39.99</div>
                    </div>
                  </HoverCardContent>
                </HoverCardWithDuration>
              </div>
              
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center">
                  <div className="bg-purple-700 text-white font-mono rounded px-1.5 py-0.5 min-w-[32px] text-center">
                    <span className="text-sm">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-purple-900 mx-0.5">:</span>
                  <div className="bg-purple-700 text-white font-mono rounded px-1.5 py-0.5 min-w-[32px] text-center">
                    <span className="text-sm">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-purple-900 mx-0.5">:</span>
                  <div className="bg-purple-700 text-white font-mono rounded px-1.5 py-0.5 min-w-[32px] text-center">
                    <span className="text-sm">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                  </div>
                </div>
                
                <div className="flex-1 pl-2">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="bg-white/60 text-[10px] py-0 h-4 flex items-center border-purple-200 text-purple-800">
                      <CircleDollarSign className="h-2.5 w-2.5 mr-0.5" />
                      30-DAY LOW
                    </Badge>
                    <Badge variant="outline" className="bg-white/60 text-[10px] py-0 h-4 flex items-center border-purple-200 text-purple-800">
                      <ShieldCheck className="h-2.5 w-2.5 mr-0.5" />
                      GUARANTEED
                    </Badge>
                  </div>
                </div>
              </div>
              
              {showPerkInfo && (
                <div className="mt-1.5 grid grid-cols-2 gap-1 text-[10px] bg-white/40 rounded p-1 animate-fade-in">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-purple-100 flex items-center justify-center mr-1">
                      <Check className="h-2 w-2 text-purple-700" />
                    </div>
                    <span className="text-purple-900">Free fast shipping</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-purple-100 flex items-center justify-center mr-1">
                      <Check className="h-2 w-2 text-purple-700" />
                    </div>
                    <span className="text-purple-900">30-day returns</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-purple-100 flex items-center justify-center mr-1">
                      <Check className="h-2 w-2 text-purple-700" />
                    </div>
                    <span className="text-purple-900">2-year warranty</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-purple-100 flex items-center justify-center mr-1">
                      <Check className="h-2 w-2 text-purple-700" />
                    </div>
                    <span className="text-purple-900">Price match</span>
                  </div>
                </div>
              )}
              
              <Button 
                variant="link"
                size="sm"
                className="text-[10px] p-0 h-5 text-purple-700 hover:text-purple-900 w-full text-center mt-0.5"
                onClick={() => setShowPerkInfo(!showPerkInfo)}
              >
                {showPerkInfo ? "Show less" : "Show offer details"}
                <ChevronDown className={`h-3 w-3 ml-0.5 transition-transform ${showPerkInfo ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>
          
          <div className="mt-3 bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-md border border-red-100 shadow-sm">
            <div className="text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <BadgePercent className="h-4 w-4 mr-1.5 text-red-500" />
                <span>Available Coupons:</span>
              </div>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                    <Info className="h-3.5 w-3.5 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs max-w-[200px]">
                  Apply coupons at checkout or copy the code
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {product.coupons.map((coupon, index) => (
                <div key={index} className="group relative">
                  <div className="flex overflow-hidden rounded-md border border-dashed border-red-300 hover:border-red-500 transition-colors bg-white">
                    <div className="relative flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 text-white px-3 py-2.5">
                      <div className="absolute right-0 top-0 bottom-0 w-2">
                        <div className="absolute top-0 bottom-0 -right-1 w-2">
                          <div className="absolute top-0 h-2 w-2 rounded-full bg-white translate-x-1/2 -translate-y-1/2"></div>
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="absolute w-2 h-2 rounded-full bg-white translate-x-1/2" style={{ top: `${(i+1) * 16.66}%` }}></div>
                          ))}
                          <div className="absolute bottom-0 h-2 w-2 rounded-full bg-white translate-x-1/2 translate-y-1/2"></div>
                        </div>
                      </div>
                      <div className="text-xs font-bold tracking-wider">
                        {coupon.code}
                      </div>
                    </div>
                    
                    <div className="flex flex-1 items-center justify-between px-3">
                      <div>
                        <div className="text-xs font-medium text-red-600">
                          {coupon.discount}
                        </div>
                        {index === 2 && (
                          <div className="text-[10px] text-gray-500 mt-0.5 flex items-center">
                            <Clock className="h-2.5 w-2.5 mr-0.5" />
                            Expires in 4h 23m
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-1 items-center">
                        <HoverCard openDelay={300} closeDelay={100}>
                          <HoverCardTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-7 w-7 p-0 rounded-full hover:bg-gray-100"
                              onClick={() => copyCouponToClipboard(coupon.code)}
                            >
                              <Copy className="h-3.5 w-3.5 text-gray-500" />
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-auto p-2 text-xs">
                            Copy code
                          </HoverCardContent>
                        </HoverCard>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 bg-red-50 hover:bg-red-100 text-red-600 text-xs px-2"
                          onClick={() => applyCoupon(coupon.code)}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>

                  {index === 0 && (
                    <Badge 
                      variant="outline" 
                      className="absolute -top-2 -right-2 text-[10px] py-0 px-1.5 bg-yellow-100 text-yellow-800 border-yellow-200"
                    >
                      POPULAR
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-2 flex gap-1 items-center justify-center pt-1">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                View more coupons
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
