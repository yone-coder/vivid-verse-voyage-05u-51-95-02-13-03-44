
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Share, Heart, MessageCircle, Truck, Shield, Award, Percent, ThumbsUp, Zap, Star, Sparkles, ArrowRight, Crown, Clock, Gift, Check, Info, CreditCard, AlertCircle, Bookmark, Box, Tag, Download, Users, Rocket, Copy, Scissors, BadgePercent, TicketPercent, BookmarkPlus, BellRing, ShieldCheck, CircleDollarSign, ChevronDown, Search, X, Flame, TrendingUp, Eye, BarChart, LineChart, History, ChevronRight, Gauge } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useProductAnalytics } from "@/hooks/useProduct";

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
  
  const [viewMode, setViewMode] = useState<"modern" | "detailed" | "compact">("modern");
  const [comparisonMode, setComparisonMode] = useState(false);
  const [showLiveData, setShowLiveData] = useState(true);
  const [isDealHot, setIsDealHot] = useState(true);
  
  const { data: analytics, isLoading: analyticsLoading } = useProductAnalytics("nebula-pro-2025");

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

  const toggleComparisonMode = () => {
    setComparisonMode(!comparisonMode);
    toast({
      title: !comparisonMode ? "Comparison mode activated" : "Comparison mode deactivated",
      description: !comparisonMode 
        ? "You can now add products to compare" 
        : "Comparison mode has been turned off"
    });
  };
  
  const toggleLiveData = () => {
    setShowLiveData(!showLiveData);
  };
  
  const handleViewModeChange = (mode: "modern" | "detailed" | "compact") => {
    setViewMode(mode);
    toast({
      title: "View mode changed",
      description: `Switched to ${mode} view`
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
  
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

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
          <div className="flex-1 mx-3 relative">
            <div className="relative w-full max-w-[200px] md:max-w-[300px] mx-auto">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="h-8 pl-8 pr-3 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-xs rounded-full border-gray-200 focus-visible:ring-1"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            </div>
          </div>
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
            <Link to="/" className="mr-2">
              <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex-1 relative">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="h-7 pl-8 pr-3 text-xs"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            </div>
            <div className="flex gap-1 ml-2">
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
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center flex-wrap gap-1">
              <Badge variant="outline" className="text-xs bg-red-50 text-red-500 border-red-200">Flash Deal</Badge>
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-500 border-orange-200">Top Seller</Badge>
              <Badge variant="outline" className="text-xs bg-green-50 text-green-500 border-green-200">Free Shipping</Badge>
              
              {analytics?.trending && (
                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-600 border-purple-200 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  <span className="whitespace-nowrap">Trending</span>
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <HoverCardWithDuration openDelay={300} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <div className="flex items-center border border-gray-200 rounded-md px-1 py-0.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-5 w-5 p-0 rounded-sm ${viewMode === "compact" ? "bg-blue-100 text-blue-600" : ""}`}
                      onClick={() => handleViewModeChange("compact")}
                    >
                      <LineChart className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-5 w-5 p-0 rounded-sm ${viewMode === "modern" ? "bg-blue-100 text-blue-600" : ""}`}
                      onClick={() => handleViewModeChange("modern")}
                    >
                      <BarChart className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-5 w-5 p-0 rounded-sm ${viewMode === "detailed" ? "bg-blue-100 text-blue-600" : ""}`}
                      onClick={() => handleViewModeChange("detailed")}
                    >
                      <Gauge className="h-3 w-3" />
                    </Button>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-48 p-2">
                  <div className="text-xs font-medium mb-1">View Modes</div>
                  <ul className="text-xs space-y-1">
                    <li className="flex items-center justify-between">
                      <span>Compact</span>
                      <LineChart className="h-3 w-3" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Modern</span>
                      <BarChart className="h-3 w-3" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Detailed</span>
                      <Gauge className="h-3 w-3" />
                    </li>
                  </ul>
                </HoverCardContent>
              </HoverCardWithDuration>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-red-500">${formatPrice(currentPrice)}</span>
              <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
              <span className="ml-2 text-xs px-1.5 py-0.5 bg-red-100 text-red-500 rounded">
                {Math.round((1 - currentPrice / originalPrice) * 100)}% OFF
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-5 w-5 p-0"
                onClick={() => setShowPriceHistory(!showPriceHistory)}
              >
                <History className="h-3 w-3 text-gray-500" />
              </Button>
            </div>
            
            {showLiveData && analytics && (
              <div className="flex items-center space-x-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center text-xs text-purple-700">
                      <Eye className="h-3 w-3 mr-0.5" />
                      <span>{formatNumber(analytics.viewCount)}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="p-2 text-xs">
                    <div className="font-medium">Live Views</div>
                    <div className="text-gray-600">{analytics.viewCount} people viewed this today</div>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center text-xs text-green-600">
                      <Users className="h-3 w-3 mr-0.5" />
                      <span>{analytics.recentViewers}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="p-2 text-xs">
                    <div className="font-medium">Active Viewers</div>
                    <div className="text-gray-600">{analytics.recentViewers} people looking right now</div>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center text-xs text-amber-500">
                      <Flame className="h-3 w-3 mr-0.5" />
                      <span>{analytics.salesLastHour}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="p-2 text-xs">
                    <div className="font-medium">Hot Deal</div>
                    <div className="text-gray-600">{analytics.salesLastHour} sold in the last hour</div>
                  </TooltipContent>
                </Tooltip>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0"
                  onClick={toggleLiveData}
                >
                  <X className="h-3 w-3 text-gray-500" />
                </Button>
              </div>
            )}
          </div>
          
          <h1 className="text-lg font-medium mt-1">{product.name}</h1>
          
          <div className="flex items-center mt-1 text-sm justify-between">
            <div className="flex items-center">
              <div className="flex text-amber-400">
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 && '☆'}
                {'☆'.repeat(5 - Math.ceil(product.rating))}
                <span className="ml-1 text-black">{product.rating}</span>
              </div>
              <span className="mx-2 text-gray-300">|</span>
              
              <HoverCardWithDuration openDelay={300} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="h-5 p-0 text-sm text-gray-500">
                    {product.reviewCount} Reviews
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-56 p-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className="text-amber-400 mr-1">★★★★★</div>
                        <span>5 star</span>
                      </div>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      <span className="text-gray-500">72%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className="text-amber-400 mr-1">★★★★☆</div>
                        <span>4 star</span>
                      </div>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                      <span className="text-gray-500">18%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className="text-amber-400 mr-1">★★★☆☆</div>
                        <span>3 star</span>
                      </div>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '6%' }}></div>
                      </div>
                      <span className="text-gray-500">6%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className="text-amber-400 mr-1">★★☆☆☆</div>
                        <span>2 star</span>
                      </div>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '3%' }}></div>
                      </div>
                      <span className="text-gray-500">3%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className="text-amber-400 mr-1">★☆☆☆☆</div>
                        <span>1 star</span>
                      </div>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '1%' }}></div>
                      </div>
                      <span className="text-gray-500">1%</span>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCardWithDuration>
              
              <span className="mx-2 text-gray-300">|</span>
              
              <HoverCardWithDuration openDelay={300} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="h-5 p-0 text-sm text-gray-500">
                    {formatNumber(product.sold)}+ Sold
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-56 p-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Sales History</span>
                      <Badge variant="outline" className="text-[10px] py-0 font-normal">Last 30 days</Badge>
                    </div>
                    <div className="h-20 w-full bg-slate-50 rounded flex items-end p-1 space-x-[2px]">
                      {[12,18,15,22,24,19,17,20,22,27,29,24,20,25,28,30,32,26,24,22,28,33,38,42,45,41,39,35,32,30].map((value, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-blue-200 rounded-sm" 
                          style={{ height: `${Math.min(100, value * 2)}%` }} 
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div>
                        <span className="font-medium text-green-600">+140%</span> vs last month
                      </div>
                      <div className="text-xs">
                        <span className="font-medium">{product.sold}</span> total sales
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCardWithDuration>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleComparisonMode}
              className="h-6 text-xs border-gray-200"
            >
              <ChevronRight className={`h-3.5 w-3.5 mr-1 transition-transform ${comparisonMode ? "rotate-90" : ""}`} />
              Compare
            </Button>
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
                  <div className="bg-purple-900/90 text-white text-xs px-1.5 py-1 rounded">
                    <span className="font-medium">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-purple-900 font-medium">:</span>
                  <div className="bg-purple-900/90 text-white text-xs px-1.5 py-1 rounded">
                    <span className="font-medium">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-purple-900 font-medium">:</span>
                  <div className="bg-purple-900/90 text-white text-xs px-1.5 py-1 rounded">
                    <span className="font-medium">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
