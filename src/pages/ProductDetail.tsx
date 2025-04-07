import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Share, Heart, MessageCircle, Truck, Shield, Award, Percent, ThumbsUp, Zap, Star, Sparkles, ArrowRight, Crown, Clock, Gift, Check, Info, CreditCard, AlertCircle, Bookmark, Box, Tag, Download, Users, Rocket, Copy, Scissors, BadgePercent, TicketPercent, BookmarkPlus, BellRing, ShieldCheck, CircleDollarSign, ChevronDown, Search, X, Fire, TrendingUp, Eye, BarChart2, Headphones, Camera, Video, UserPlus, Settings, AlertCircle as AlertCircleIcon } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
  const [showTrendingIndicator, setShowTrendingIndicator] = useState(true);
  const [activeViewers, setActiveViewers] = useState(32);
  const [quickViewMode, setQuickViewMode] = useState<'overview'|'specs'|'reviews'>('overview');
  const [showAugmentedView, setShowAugmentedView] = useState(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveViewers(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(15, Math.min(50, prev + change));
      });
    }, 5000);
    
    return () => clearInterval(interval);
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
          <div className="flex items-center mb-0.5 flex-wrap gap-1">
            <Badge variant="outline" className="text-xs bg-red-50 text-red-500 border-red-200 flex items-center gap-1">
              <Fire className="h-3 w-3" /> Flash Deal
            </Badge>
            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-500 border-orange-200 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Top Seller
            </Badge>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-500 border-green-200 flex items-center gap-1">
              <Truck className="h-3 w-3" /> Free Shipping
            </Badge>
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-500 border-blue-200 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Verified
            </Badge>
            
            <div className="ml-auto flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                    <Eye className="h-3.5 w-3.5 text-gray-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2 text-xs" side="top">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>{activeViewers} people viewing now</span>
                  </div>
                </PopoverContent>
              </Popover>
              
              <HoverCardWithDuration openDelay={300} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                    <BarChart2 className="h-3.5 w-3.5 text-gray-500" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto p-3">
                  <div className="space-y-1.5">
                    <div className="font-medium text-xs">Sales Performance</div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Daily</span>
                      <span className="font-semibold text-green-600">+24%</span>
                    </div>
                    <Progress value={76} className="h-1" />
                    <div className="flex items-center justify-between text-xs">
                      <span>Weekly</span>
                      <span className="font-semibold text-green-600">+47%</span>
                    </div>
                    <Progress value={92} className="h-1" />
                  </div>
                </HoverCardContent>
              </HoverCardWithDuration>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-red-500">${formatPrice(currentPrice)}</span>
                <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-red-100 text-red-500 rounded flex items-center gap-0.5">
                  <Percent className="h-3 w-3" />
                  {Math.round((1 - currentPrice / originalPrice) * 100)}% OFF
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 rounded-full hover:bg-gray-100" 
                onClick={handleShare}
              >
                <Share className="h-4 w-4 text-gray-700" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-7 w-7 p-0 rounded-full hover:bg-gray-100 ${isFavorite ? 'bg-red-50' : ''}`} 
                onClick={toggleFavorite}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full hover:bg-gray-100">
                    <Settings className="h-4 w-4 text-gray-700" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48" side="bottom" align="end">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">AR Preview</span>
                      <Switch 
                        checked={showAugmentedView} 
                        onCheckedChange={setShowAugmentedView} 
                        size="sm" 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Price Alerts</span>
                      <Switch 
                        checked={isNotifyActive} 
                        onCheckedChange={handlePriceAlert} 
                        size="sm" 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Trending Badge</span>
                      <Switch 
                        checked={showTrendingIndicator} 
                        onCheckedChange={setShowTrendingIndicator}
                        size="sm"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <h1 className="text-lg font-medium mt-1 flex items-center">
            {product.name}
            {showTrendingIndicator && (
              <Badge variant="outline" className="ml-2 text-[9px] py-0 px-1 h-4 bg-orange-50 text-orange-600 border-orange-200">
                <Fire className="h-2.5 w-2.5 mr-0.5" /> Trending
              </Badge>
            )}
          </h1>
          
          <div className="flex items-center mt-1 text-sm">
            <div className="flex text-amber-400">
              {'★'.repeat(Math.floor(product.rating))}
              {product.rating % 1 !== 0 && '☆'}
              {'☆'.repeat(5 - Math.ceil(product.rating))}
              <span className="ml-1 text-black">{product.rating}</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" className="p-0 h-auto text-gray-500 text-sm">
                  {product.reviewCount} Reviews
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-white p-2 shadow-lg rounded-md border text-xs" side="bottom">
                <div className="space-y-1 w-48">
                  <div className="flex items-center">
                    <span className="text-xs">5★</span>
                    <Progress value={85} className="h-1.5 mx-2 flex-1" />
                    <span className="text-xs">85%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs">4★</span>
                    <Progress value={12} className="h-1.5 mx-2 flex-1" />
                    <span className="text-xs">12%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs">3★</span>
                    <Progress value={2} className="h-1.5 mx-2 flex-1" />
                    <span className="text-xs">2%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs">2★</span>
                    <Progress value={1} className="h-1.5 mx-2 flex-1" />
                    <span className="text-xs">1%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs">1★</span>
                    <Progress value={0} className="h-1.5 mx-2 flex-1" />
                    <span className="text-xs">0%</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
            <span className="mx-2 text-gray-300">|</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" className="p-0 h-auto text-gray-500 text-sm">
                  {product.sold}+ Sold
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="p-2 w-48">
                <div className="space-y-1.5 text-xs">
                  <div className="font-medium">Sales History</div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="text-[9px] text-gray-500">{day}</div>
                    ))}
                    {[45, 67, 32, 89, 120, 103, 75].map((value, i) => (
                      <div 
                        key={i}
                        className="bg-blue-100 rounded-sm h-6 relative"
                        style={{ height: `${Math.max(10, (value / 120) * 24)}px` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
            
            <div className="ml-auto flex space-x-2">
              <div className="flex gap-1">
                <Button 
                  variant={quickViewMode === 'overview' ? 'secondary' : 'outline'} 
                  size="sm" 
                  className="h-5 text-xs px-2 py-0 rounded-sm" 
                  onClick={() => setQuickViewMode('overview')}
                >
                  Overview
                </Button>
                <Button 
                  variant={quickViewMode === 'specs' ? 'secondary' : 'outline'} 
                  size="sm" 
                  className="h-5 text-xs px-2 py-0 rounded-sm"
                  onClick={() => setQuickViewMode('specs')}
                >
                  Specs
                </Button>
                <Button 
                  variant={quickViewMode === 'reviews' ? 'secondary' : 'outline'} 
                  size="sm" 
                  className="h-5 text-xs px-2 py-0 rounded-sm"
                  onClick={() => setQuickViewMode('reviews')}
                >
                  Reviews
                </Button>
              </div>
            </div>
          </div>
          
          {quickViewMode === 'overview' && (
            <div className="mt-1.5 text-sm text-gray-600 border-t border-gray-100 pt-1.5">
              <p className="line-clamp-2">{product.description}</p>
            </div>
          )}
          
          {quickViewMode === 'specs' && (
            <div className="mt-1.5 text-xs text-gray-700 border-t border-gray-100 pt-1.5 grid grid-cols-2 gap-x-4 gap-y-1">
              {product.specs.slice(0, 6).map((spec, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-500">{spec.name}:</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
          
          {quickViewMode === 'reviews' && (
            <div className="mt-1.5 text-xs border-t border-gray-100 pt-1.5">
              <div className="flex items-start gap-1.5 pb-1 border-b border-gray-100">
                <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium text-gray-600">
                  JD
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-medium">John D.</div>
                    <div className="text-amber-400 text-[10px]">★★★★★</div>
                  </div>
                  <p className="text-[10px] text-gray-600 line-clamp-2">
                    Absolutely love this product! The projection quality is impressive and the app integration works flawlessly.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-1.5 pt-1">
                <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium text-gray-600">
                  SM
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-medium">Sarah M.</div>
                    <div className="text-amber-400 text-[10px]">★★★★☆</div>
                  </div>
                  <p className="text-[10px] text-gray-600 line-clamp-2">
                    Great for movie nights! Battery life could be better but overall very satisfied with the purchase.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Select Color:</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 text-xs text-blue-600"
                onClick={toggleVariants}
              >
                {showVariants ? "Hide Options" : "Show All Options"}
              </Button>
            </div>
            
            <div className={`grid grid-cols-3 gap-2 transition-all duration-300 ${showVariants ? 'max-h-[500px] opacity-100' : 'max-h-12 opacity-40 overflow-hidden'}`}>
              {product.variants.map((variant) => (
                <div 
                  key={variant.name} 
                  className={`border rounded-md p-2 cursor-pointer transition-colors hover:border-blue-500 ${selectedColor === variant.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => setSelectedColor(variant.name)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="w-6 h-6 bg-gray-200 rounded overflow-hidden">
                      <img src={variant.image} alt={variant.name} className="w-full h-full object-cover" />
                    </div>
                    {selectedColor === variant.name && <Check className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="text-xs font-medium truncate">{variant.name}</div>
                  <div className="text-xs text-gray-500">${formatPrice(variant.price)}</div>
                </div>
              ))}
            </div>
            
            {!showVariants && (
              <div className="absolute top-8 left-0 right-0 flex items-center justify-center">
                <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
                  {selectedColor}
                </Badge>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-2 mb-2 p-4 bg-white">
          <LiveStockUpdates 
            initialStock={currentVariant ? currentVariant.stock : 200}
            highDemand={product.stock.selling_fast}
          />
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <Button 
                onClick={decrementQuantity} 
                variant="ghost" 
                className="h-8 px-3 rounded-none border-r border-gray-300"
                disabled={quantity <= 1}
              >
                -
              </Button>
              <div className="w-10 text-center">{quantity}</div>
              <Button 
                onClick={incrementQuantity} 
                variant="ghost" 
                className="h-8 px-3 rounded-none border-l border-gray-300"
                disabled={quantity >= 10}
              >
                +
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Shipping:</span>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <Truck className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600 font-medium">
                  {product.shipping.free ? "Free Standard Shipping" : "Standard Shipping"}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                Estimated delivery: {product.shipping.estimated}
              </div>
            </div>
          </div>
          
          <div className="mt-2 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs text-blue-600"
              onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
            >
              {showDeliveryOptions ? "Hide Options" : "More Delivery Options"}
            </Button>
          </div>
          
          {showDeliveryOptions && (
            <div className="mt-1 p-3 bg-gray-50 rounded-md border border-gray-200">
              <RadioGroup 
                value={isExpressSelected ? "express" : "standard"}
                onValueChange={(value) => setIsExpressSelected(value === "express")}
              >
                <div className="flex items-start space-x-2 mb-2">
                  <RadioGroupItem value="standard" id="standard" className="mt-1" />
                  <label htmlFor="standard" className="text-sm cursor-pointer flex-1">
                    <div className="font-medium">Standard Shipping (Free)</div>
                    <div className="text-xs text-gray-500">Estimated delivery: {product.shipping.estimated}</div>
                  </label>
                </div>
                
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="express" id="express" className="mt-1" />
                  <label htmlFor="express" className="text-sm cursor-pointer flex-1">
                    <div className="font-medium">Express Shipping (${product.shipping.express})</div>
                    <div className="text-xs text-gray-500">Estimated delivery: {product.shipping.expressEstimated}</div>
                  </label>
                </div>
              </RadioGroup>
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Gift className="h-4 w-4 mr-1.5 text-purple-600" />
                    <span className="font-medium">Gift Wrapping</span>
                  </div>
                  <Switch 
                    checked={giftWrap} 
                    onCheckedChange={toggleGiftWrap}
                  />
                </div>
                {giftWrap && (
                  <div className="mt-2 text-xs text-gray-600">
                    Your item will be gift wrapped with a customized message card for $2.99
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Warranty:</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs text-blue-600"
              onClick={() => setShowWarrantyOptions(!showWarrantyOptions)}
            >
              {selectedWarranty === "none" ? "Add Warranty" : `${warrantyOption?.name} (${warrantyOption?.duration})`}
            </Button>
          </div>
          
          {showWarrantyOptions && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
              <RadioGroup 
                value={selectedWarranty}
                onValueChange={setSelectedWarranty}
              >
                <div className="flex items-start space-x-2 mb-2">
                  <RadioGroupItem value="none" id="none" className="mt-1" />
                  <label htmlFor="none" className="text-sm cursor-pointer flex-1">
                    <div className="font-medium">No additional warranty</div>
                    <div className="text-xs text-gray-500">Product includes manufacturer's warranty</div>
                  </label>
                </div>
                
                {product.warranty.map((option) => (
                  <div key={option.name.toLowerCase()} className="flex items-start space-x-2 mb-2">
                    <RadioGroupItem value={option.name.toLowerCase()} id={option.name.toLowerCase()} className="mt-1" />
                    <label htmlFor={option.name.toLowerCase()} className="text-sm cursor-pointer flex-1">
                      <div className="font-medium">
                        {option.name} ({option.duration}){option.price > 0 ? ` - $${formatPrice(option.price)}` : " - Included"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {option.name === "Standard" 
                          ? "Basic coverage for manufacturing defects" 
                          : option.name === "Extended" 
                            ? "Extended coverage including wear and tear" 
                            : "Premium coverage with accidental damage protection"}
                      </div>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          
          <div className="mt-4 flex items-center justify-between text-sm font-medium">
            <span className="text-gray-700">Payment Options:</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs text-blue-600"
              onClick={() => setShowPaymentOptions(!showPaymentOptions)}
            >
              {showPaymentOptions ? "Hide" : "View All"}
            </Button>
          </div>
      
          <div className="mt-1 flex flex-wrap gap-1">
            <div className="w-8 h-5 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
              <img 
                src="/lovable-uploads/f3efe2eb-c3db-48bd-abc7-c65456fdc028.png" 
                alt="Visa" 
                className="h-3.5 w-6 object-contain"
              />
            </div>
            
            <div className="w-8 h-5 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="12">
                <circle fill="#EA001B" cx="8" cy="12" r="5"/>
                <circle fill="#F79E1B" cx="16" cy="12" r="5"/>
                <path fill="#FF5F00" d="M12 7.5v9a5 5 0 0 0 0-9z"/>
              </svg>
            </div>
            
            <div className="w-8 h-5 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
              <img 
                src="/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png" 
                alt="Venmo" 
                className="h-3.5 w-6 object-contain"
              />
            </div>
            
            {showPaymentOptions && (
              <>
                <div className="w-8 h-5 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="12">
                    <path fill="#253B80" d="M7 7h2c1.4 0 1.9 1 1.9 1.5 0 1.8-2 1.8-2.5 1.8H7.3L7 7z"/>
                    <path fill="#179BD7" d="M19 7.8C18.7 5.8 16.9 5 14.7 5H9.2c-.3 0-.5.2-.6.5l-1.7 11c0 .2.1.4.4.4h2.9l.7-4.7v.3c.1-.3.3-.5.6-.5h1.3c2.5 0 4.4-1 5-3.9V8c-.1-.2-.1-.2-.1-.2H19z"/>
                    <path fill="#253B80" d="M8.3 11.5l-.3 2.1-.2 1h-3c-.2 0-.4-.2-.3-.4L6.1 5.9c.1-.3.3-.5.6-.5h5.5c1.5 0 2.6.3 3.2 1 .3.3.5.7.6 1.1.1.3.1.7.1 1.1-1-.6-2-.8-3.3-.8L8.3 11.5z"/>
                  </svg>
                </div>
                
                <div className="w-8 h-5 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="12">
                    <path d="M19.665 17.082c-.37.9-.54 1.3-1.01 2.09-.66 1.12-1.6 2.52-2.76 2.53-1.04.01-1.3-.68-2.72-.67-1.42 0-1.72.67-2.76.66-1.16-.01-2.05-1.27-2.71-2.39-1.86-3.05-2.05-6.64-.9-8.53.82-1.35 2.12-2.14 3.33-2.14 1.24 0 2.01.68 3.03.68.98 0 1.58-.68 3-.68 1.07 0 2.2.59 3 1.57-2.66 1.63-2.22 5.89.5 7.48zm-4.17-12.97c-1.2.1-2.61 1.21-3.08 2.72-.42 1.35.37 2.95 1.11 3.77.87.79 2.1 1.08 2.81.25-.69-1.24-1.2-2.54-1.07-4.21.12-1.46.8-2.22 1.74-2.81-.45-.23-.95-.37-1.51-.37-.11 0-.11 0 0 .65z" fill="#000"/>
                  </svg>
                </div>
                
                <div className="w-8 h-5 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="12">
                    <path d="M16.46 6.66V4.89H16v7.25h.46V8.81h2.71v3.33h.46V4.89h-.46v1.77h-2.71z" fill="#3C4043"/>
                    <path d="M13.51 9.2V8.88h2.39v-.48h-2.39V8.07h2.54v-.72h-3v3.3h3.08v-.72h-2.62V9.2z" fill="#3C4043"/>
                    <path d="M12.13 10.35c-.32.26-.75.4-1.19.4-.94 0-1.66-.77-1.66-1.72s.72-1.72 1.66-1.72c.45 0 .88.14 1.2.4l.29-.33c-.42-.32-.96-.5-1.5-.5-1.19 0-2.12.93-2.12 2.14S9.81 11.17 11 11.17c.54 0 1.08-.17 1.49-.5l-.36-.32z" fill="#3C4043"/>
                    <path d="M6.82 11.45c1.37 0 2.17-.69 2.17-1.96v-3.2h-.88v3.2c0 .82-.45 1.23-1.29 1.23s-1.29-.41-1.29-1.23v-3.2h-.88v3.2c0 1.27.8 1.96 2.17 1.96z" fill="#3C4043"/>
                  </svg>
                </div>
              </>
            )}
          </div>
          
          {showPaymentOptions && (
            <div className="mt-2 text-xs text-gray-600">
              Buy Now, Pay Later options available at checkout with Klarna and Afterpay.
            </div>
          )}
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
      
      <ModernBuyButton />
    </div>
  );
};

export default ProductDetail;
