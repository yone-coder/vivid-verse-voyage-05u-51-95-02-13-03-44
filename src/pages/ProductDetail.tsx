
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Share, Heart, MessageCircle, Truck, Shield, Award, Percent, ThumbsUp, Zap, Star, Sparkles, ArrowRight, Crown, Clock, Gift, Check, Info, CreditCard, AlertCircle, Bookmark, Box, Tag, Download, Users, Rocket, LifeBuoy, Store, TrendingUp, User, History, Map, BarChart4, Headphones, ShoppingCart, HelpCircle, ArrowDownCircle, EyeOff, Flame } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
  const [recentViewers, setRecentViewers] = useState(18);
  const [peopleWithInCart, setPeopleWithInCart] = useState(7);
  const [showPriceAlert, setShowPriceAlert] = useState(false);
  const [emailForAlert, setEmailForAlert] = useState("");
  const [showReviews, setShowReviews] = useState(false);
  const [showQnA, setShowQnA] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState("one-time");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [hasBundle, setHasBundle] = useState(false);
  const [showRelatedItems, setShowRelatedItems] = useState(true);
  const [showFrequentlyBought, setShowFrequentlyBought] = useState(true);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [isWatchingPrice, setIsWatchingPrice] = useState(false);
  const [isWatchingStock, setIsWatchingStock] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isComparingProducts, setIsComparingProducts] = useState(false);
  const [customerPhotos, setCustomerPhotos] = useState(["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]);
  const [wishlistCount, setWishlistCount] = useState(156);
  const [question, setQuestion] = useState("");
  const [showFinancing, setShowFinancing] = useState(false);
  
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

  // Simulate increasing viewers
  useEffect(() => {
    const interval = setInterval(() => {
      setRecentViewers(prev => {
        const change = Math.random() > 0.7 ? 1 : 0;
        return prev + change;
      });
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate fluctuating cart count
  useEffect(() => {
    const interval = setInterval(() => {
      setPeopleWithInCart(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(3, Math.min(12, prev + change));
      });
    }, 45000);
    
    return () => clearInterval(interval);
  }, []);

  // Get location for delivery estimation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          
          // Simulate delivery estimation based on location
          const randomDays = Math.floor(Math.random() * 5) + 3;
          const deliveryDate = new Date();
          deliveryDate.setDate(deliveryDate.getDate() + randomDays);
          
          setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }));
        },
        () => {
          // Fallback if location access is denied
          setEstimatedDelivery("7-10 business days");
        }
      );
    }
  }, []);

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
    setWishlistCount(prev => isFavorite ? prev - 1 : prev + 1);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Item removed from your wishlist" : "Item added to your wishlist",
    });
  };

  const addToCart = () => {
    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 1000);
    setPeopleWithInCart(prev => prev + 1);
    
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
      title: "Coupon applied",
      description: `Coupon code ${code} has been applied!`,
    });
  };

  const askQuestion = () => {
    if (!question.trim()) {
      toast({
        title: "Question required",
        description: "Please enter your question before submitting",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Question submitted",
      description: "Your question has been sent to the seller. You'll be notified when they respond.",
    });
    setQuestion("");
    setShowQnA(false);
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

  const togglePriceAlert = () => {
    setIsWatchingPrice(prev => !prev);
    if (!isWatchingPrice) {
      setShowPriceAlert(true);
    } else {
      toast({
        title: "Price alert removed",
        description: "You will no longer receive price drop notifications for this item",
      });
    }
  };
  
  const setPriceAlert = () => {
    if (!emailForAlert && !isWatchingPrice) {
      toast({
        title: "Email required",
        description: "Please enter your email to receive price drop alerts",
        variant: "destructive"
      });
      return;
    }
    
    setIsWatchingPrice(true);
    setShowPriceAlert(false);
    toast({
      title: "Price alert set",
      description: "We'll notify you when this product's price drops",
    });
  };

  const toggleStockAlert = () => {
    setIsWatchingStock(prev => !prev);
    toast({
      title: isWatchingStock ? "Stock alert removed" : "Stock alert set",
      description: isWatchingStock 
        ? "You will no longer receive stock notifications" 
        : "We'll notify you when stock runs low",
    });
  };

  const currentVariant = product.variants.find(v => v.name === selectedColor);
  const currentPrice = currentVariant ? currentVariant.price : product.discountPrice;
  const originalPrice = currentVariant ? Math.round(currentVariant.price * 1.6 * 100) / 100 : product.price;
  
  const warrantyOption = product.warranty.find(w => w.name.toLowerCase() === selectedWarranty);
  const warrantyPrice = warrantyOption ? warrantyOption.price : 0;
  
  // Calculate subscription discount
  const subscriptionDiscount = selectedFrequency === "one-time" ? 0 : 0.15;
  const subscriptionPrice = currentPrice * (1 - subscriptionDiscount);
  
  // Calculate total based on all options
  const totalPrice = ((selectedFrequency === "subscription" ? subscriptionPrice : currentPrice) * quantity) + 
    warrantyPrice + (giftWrap ? 2.99 : 0) + (isExpressSelected ? product.shipping.express : 0) +
    (hasBundle ? 15.99 : 0);
  
  const formatPrice = (price: number) => price.toFixed(2);

  const currentStock = currentVariant ? currentVariant.stock : 0;
  const stockPercentage = Math.min(100, Math.max(5, (currentStock / 300) * 100));
  
  // Calculate estimated savings
  const estimatedSavings = (originalPrice - currentPrice) * quantity;
  const subscriptionSavings = selectedFrequency === "subscription" ? currentPrice * quantity * subscriptionDiscount : 0;
  const totalSavings = estimatedSavings + subscriptionSavings;

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
        
        <div className="absolute bottom-2 left-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90">
                <Users className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-xs">{recentViewers}</span>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-60">
              <div className="text-sm font-medium">
                {recentViewers} people viewing this right now
              </div>
              <div className="text-xs text-gray-500 mt-1">
                This item is in high demand
              </div>
            </HoverCardContent>
          </HoverCard>
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
          <div className="flex items-center mb-0.5 gap-1 flex-wrap">
            <Badge variant="outline" className="text-xs bg-red-50 text-red-500 border-red-200">Flash Deal</Badge>
            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-500 border-orange-200">Top Seller</Badge>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-500 border-green-200">Free Shipping</Badge>
            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-500 border-purple-200">Best Rated</Badge>
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-500 border-blue-200">Trending</Badge>
          </div>
          
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-red-500">${formatPrice(currentPrice)}</span>
            <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
            <span className="ml-2 text-xs px-1.5 py-0.5 bg-red-100 text-red-500 rounded">
              {Math.round((1 - currentPrice / originalPrice) * 100)}% OFF
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 h-6 w-6 p-0 rounded-full"
                    onClick={togglePriceAlert}
                  >
                    <Bell className={`h-3.5 w-3.5 ${isWatchingPrice ? "fill-blue-100 text-blue-500" : ""}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isWatchingPrice ? "Remove price alert" : "Set price drop alert"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <h1 className="text-lg font-medium mt-1">{product.name}</h1>
          
          <div className="flex items-center mt-1 text-sm">
            <button className="flex text-amber-400" onClick={() => {
              setActiveTab("reviews");
              tabsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}>
              {'★'.repeat(Math.floor(product.rating))}
              {product.rating % 1 !== 0 && '☆'}
              {'☆'.repeat(5 - Math.ceil(product.rating))}
              <span className="ml-1 text-black">{product.rating}</span>
            </button>
            <span className="mx-2 text-gray-300">|</span>
            <button className="text-gray-500 hover:text-gray-700 transition-colors" onClick={() => {
              setActiveTab("reviews");
              tabsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}>
              {product.reviewCount} Reviews
            </button>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-500">{product.sold}+ Sold</span>
            <span className="ml-auto text-xs text-green-600 flex items-center">
              <ShoppingCart className="h-3.5 w-3.5 mr-1 stroke-2" />
              {peopleWithInCart} in carts
            </span>
          </div>

          <div className="mt-4">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-100 p-3 rounded-md border border-purple-200">
              <div className="flex items-center text-sm">
                <Zap className="h-4 w-4 text-purple-500 mr-2" />
                <span className="font-medium text-purple-800">Limited Time Offer</span>
              </div>
              <div className="text-xs text-purple-700 mt-1 flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5" />
                <span>Deal ends in:</span>
                <div className="ml-2 flex gap-1">
                  <span className="bg-purple-800 text-white px-1.5 py-0.5 rounded">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="text-purple-800">:</span>
                  <span className="bg-purple-800 text-white px-1.5 py-0.5 rounded">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="text-purple-800">:</span>
                  <span className="bg-purple-800 text-white px-1.5 py-0.5 rounded">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap">
            <div className="bg-red-50 p-2.5 rounded-md w-full mb-2">
              <div className="text-sm font-medium text-gray-700 mb-1.5 flex items-center">
                <Percent className="h-4 w-4 mr-1 text-red-500" />
                Available Coupons:
              </div>
              <div className="flex flex-wrap gap-2">
                {product.coupons.map((coupon, index) => (
                  <div 
                    key={index} 
                    className="flex items-center overflow-hidden rounded border border-red-300 group hover:border-red-500 cursor-pointer transition-colors"
                    onClick={() => applyCoupon(coupon.code)}
                  >
                    <div className="bg-red-500 text-white px-2 py-1 text-xs font-medium group-hover:bg-red-600 transition-colors">
                      {coupon.code}
                    </div>
                    <div className="px-2 py-1 text-xs text-red-600 bg-white">
                      {coupon.discount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Purchase Options:</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div
                  className={`border rounded-md p-2.5 cursor-pointer transition ${
                    selectedFrequency === "one-time" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedFrequency("one-time")}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">One-time purchase</span>
                    {selectedFrequency === "one-time" && <Check className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="text-sm font-semibold text-gray-800">${formatPrice(currentPrice)}</div>
                </div>
                
                <div
                  className={`border rounded-md p-2.5 cursor-pointer transition ${
                    selectedFrequency === "subscription" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedFrequency("subscription")}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">Subscribe & Save</span>
                      <Badge className="ml-1 bg-green-100 text-green-700 border-0 h-5 text-xs">15% OFF</Badge>
                    </div>
                    {selectedFrequency === "subscription" && <Check className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="text-sm font-semibold text-green-700">${formatPrice(subscriptionPrice)}</div>
                </div>
              </div>
              
              {selectedFrequency === "subscription" && (
                <div className="mt-2 p-2 bg-blue-50 rounded-md border border-blue-200 text-xs text-blue-700">
                  <div className="font-medium mb-1">Subscription Benefits:</div>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>Save 15% on every order</li>
                    <li>Free shipping on all deliveries</li>
                    <li>Modify or cancel anytime</li>
                    <li>Get priority customer support</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-2 relative">
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
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-1.5" />
                <span className="text-sm font-medium text-gray-700">Limited Stock</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 rounded-full"
                      onClick={toggleStockAlert}
                    >
                      <Bell className={`h-3.5 w-3.5 ${isWatchingStock ? "fill-amber-100 text-amber-500" : ""}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isWatchingStock ? "Remove stock alert" : "Notify me when stock is low"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <LiveStockUpdates 
              initialStock={currentVariant ? currentVariant.stock : 200}
              highDemand={product.stock.selling_fast}
            />
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between">
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
            
            {maxQuantityReached && (
              <div className="mt-1 text-xs text-red-500 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Maximum quantity per order is 10 items
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-1.5 mb-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="shipping" className="border-none">
                <AccordionTrigger className="py-1.5 text-sm">
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 text-green-600 mr-2" />
                    <span className="font-medium">Shipping</span>
                    {estimatedDelivery && (
                      <Badge variant="outline" className="ml-2 text-xs bg-green-50 text-green-600 border-green-200">
                        Est: {estimatedDelivery}
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
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
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="warranty" className="border-t border-dashed">
                <AccordionTrigger className="py-1.5 text-sm">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="font-medium">Warranty</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
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
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="bundle" className="border-t border-dashed">
                <AccordionTrigger className="py-1.5 text-sm">
                  <div className="flex items-center">
                    <Box className="h-4 w-4 text-orange-500 mr-2" />
                    <span className="font-medium">Bundle & Save</span>
                    <Badge className="ml-2 bg-orange-100 text-orange-600 border-0">Save 20%</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-14 h-14 bg-gray-100 rounded flex-shrink-0">
                      <img src="/placeholder.svg" alt="Bundle item" className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Complete Projection Bundle</div>
                      <div className="text-xs text-gray-500 mt-0.5">Includes projector, bluetooth speaker, and projection screen</div>
                      <div className="mt-1">
                        <span className="text-sm font-semibold text-red-500">$15.99</span>
                        <span className="text-xs line-through text-gray-500 ml-1">$19.99</span>
                      </div>
                    </div>
                    <Switch 
                      checked={hasBundle} 
                      onCheckedChange={setHasBundle}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="payment" className="border-t border-dashed">
                <AccordionTrigger className="py-1.5 text-sm">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-gray-700 mr-2" />
                    <span className="font-medium">Payment Options</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div 
                      className={`flex items-center p-2 border rounded-md cursor-pointer ${selectedPaymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                      onClick={() => setSelectedPaymentMethod("card")}
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <CreditCard className="h-4 w-4" />
                        <span className="text-sm">Credit/Debit Card</span>
                      </div>
                      {selectedPaymentMethod === "card" && <Check className="h-4 w-4 text-blue-500" />}
                    </div>
                    
                    <div 
                      className={`flex items-center p-2 border rounded-md cursor-pointer ${selectedPaymentMethod === "paypal" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                      onClick={() => setSelectedPaymentMethod("paypal")}
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                          <path fill="#253B80" d="M7 7h2c1.4 0 1.9 1 1.9 1.5 0 1.8-2 1.8-2.5 1.8H7.3L7 7z"/>
                          <path fill="#179BD7" d="M19 7.8C18.7 5.8 16.9 5 14.7 5H9.2c-.3 0-.5.2-.6.5l-1.7 11c0 .2.1.4.4.4h2.9l.7-4.7v.3c.1-.3.3-.5.6-.5h1.3c2.5 0 4.4-1 5-3.9V8c-.1-.2-.1-.2-.1-.2H19z"/>
                          <path fill="#253B80" d="M8.3 11.5l-.3 2.1-.2 1h-3c-.2 0-.4-.2-.3-.4L6.1 5.9c.1-.3.3-.5.6-.5h5.5c1.5 0 2.6.3 3.2 1 .3.3.5.7.6 1.1.1.3.1.7.1 1.1-1-.6-2-.8-3.3-.8L8.3 11.5z"/>
                        </svg>
                        <span className="text-sm">PayPal</span>
                      </div>
                      {selectedPaymentMethod === "paypal" && <Check className="h-4 w-4 text-blue-500" />}
                    </div>

                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-blue-600 flex items-center w-full justify-center"
                      onClick={() => setShowFinancing(true)}
                    >
                      <Tag className="h-3.5 w-3.5 mr-1.5" />
                      View financing options
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="mt-2 border-t border-dashed pt-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-medium">${formatPrice((selectedFrequency === "subscription" ? subscriptionPrice : currentPrice) * quantity)}</span>
            </div>
            
            {hasBundle && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700">Bundle:</span>
                <span className="font-medium">$15.99</span>
              </div>
            )}
            
            {isExpressSelected && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700">Express Shipping:</span>
                <span className="font-medium">${formatPrice(product.shipping.express)}</span>
              </div>
            )}
            
            {giftWrap && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700">Gift Wrapping:</span>
                <span className="font-medium">$2.99</span>
              </div>
            )}
            
            {selectedWarranty !== "none" && warrantyOption && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700">{warrantyOption.name} Warranty:</span>
                <span className="font-medium">${formatPrice(warrantyOption.price)}</span>
              </div>
            )}
            
            <div className="flex justify-between font-medium text-base mt-2 border-t border-gray-100 pt-2">
              <span className="text-gray-800">Total:</span>
              <span className="text-blue-700">${formatPrice(totalPrice)}</span>
            </div>
            
            <div className="flex justify-end text-xs text-green-600 mt-1">
              You save: ${formatPrice(totalSavings)} ({Math.round((totalSavings / (originalPrice * quantity)) * 100)}% off)
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            <Button 
              variant="outline" 
              className="flex-1 border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              onClick={addToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <ModernBuyButton className="flex-1" onClick={buyNow}>
              Buy Now
            </ModernBuyButton>
          </div>
          
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-center text-xs text-gray-500">
              <Shield className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
              <span>Secure Transaction</span>
              <span className="mx-1.5">•</span>
              <LifeBuoy className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
              <span>24/7 Support</span>
              <span className="mx-1.5">•</span>
              <ArrowDownCircle className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
              <span>Easy Returns</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-blue-600"
              onClick={() => setShowQnA(true)}
            >
              <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
              Ask a question about this product
            </Button>
          </div>
        </div>
        
        <div className="mt-0 mb-2 p-3 bg-white">
          <div className="text-sm font-medium mb-2">Customer Photos</div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {customerPhotos.map((photo, i) => (
              <div key={i} className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                <img src={photo} alt={`Customer photo ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-20 h-20 rounded-md flex-shrink-0 border border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400">
              <div className="flex flex-col items-center">
                <ArrowUpRightFromCircle className="h-5 w-5" />
                <span className="text-xs mt-1">View all</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-3 text-xs">
            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200 flex items-center">
              <ThumbsUp className="h-3 w-3 mr-1.5" />
              <span>{wishlistCount} wishlisted</span>
            </Badge>
            
            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1.5" />
              <span>Top 5% in category</span>
            </Badge>
            
            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200 flex items-center">
              <Flame className="h-3 w-3 mr-1.5 text-red-500" />
              <span>Hot item</span>
            </Badge>
          </div>
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
      
      <Dialog open={showPriceAlert} onOpenChange={setShowPriceAlert}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Price Alert</DialogTitle>
            <DialogDescription>
              We'll notify you when the price of this item drops below the current price.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-sm">
                Email
              </label>
              <input
                id="email"
                value={emailForAlert}
                onChange={(e) => setEmailForAlert(e.target.value)}
                className="col-span-3 h-9 rounded-md border border-gray-300 px-3"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPriceAlert(false)}>Cancel</Button>
            <Button onClick={setPriceAlert}>Set Alert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showQnA} onOpenChange={setShowQnA}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ask a Question</DialogTitle>
            <DialogDescription>
              Our support team or the seller will respond to your question shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px] w-full rounded-md border border-gray-300 p-3"
              placeholder="Type your question about this product here..."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQnA(false)}>Cancel</Button>
            <Button onClick={askQuestion}>Submit Question</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showSizeGuide} onOpenChange={setShowSizeGuide}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Size Guide</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Dimension</th>
                    <th className="p-2 text-left">Specification</th>
                  </tr>
                </thead>
                <tbody>
                  {product.specs.map((spec, index) => (
                    <tr key={index} className={index !== product.specs.length - 1 ? "border-b" : ""}>
                      <td className="p-2 text-gray-700">{spec.name}</td>
                      <td className="p-2">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showFinancing} onOpenChange={setShowFinancing}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Financing Options</DialogTitle>
            <DialogDescription>
              Pay over time with these flexible payment options.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M4 5h16v14H4V5z" stroke="#0077FF" strokeWidth="2" />
                      <path d="M8 10h8M8 14h4" stroke="#0077FF" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium">Afterpay</div>
                    <div className="text-xs text-gray-500">4 interest-free payments</div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">${formatPrice(totalPrice / 4)}</div>
                  <div className="text-xs text-gray-500">every 2 weeks</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="#5D3FD3" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium">Klarna</div>
                    <div className="text-xs text-gray-500">3 interest-free payments</div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">${formatPrice(totalPrice / 3)}</div>
                  <div className="text-xs text-gray-500">every month</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="#FF9900" strokeWidth="2" />
                      <path d="M12 8v8" stroke="#FF9900" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium">Shop Pay</div>
                    <div className="text-xs text-gray-500">6 weekly payments</div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">${formatPrice(totalPrice / 6)}</div>
                  <div className="text-xs text-gray-500">every week</div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
