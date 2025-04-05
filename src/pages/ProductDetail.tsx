import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Share, Heart, ShoppingCart, MessageCircle, Truck, Shield, Award, Percent, ThumbsUp, Zap, Star, Sparkles, ArrowRight, Crown, Clock, Gift, Check, Info, CreditCard, AlertCircle, Bookmark, Box, Tag, Download, Users, Rocket } from "lucide-react";
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
import LivePurchaseBanner from "@/components/LivePurchaseBanner";
import { Switch } from "@/components/ui/switch";

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
    badges: ["Best Seller", "New Model", "Top Rated", "Official Store"]
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
      title: "Coupon applied",
      description: `Coupon code ${code} has been applied!`,
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
      <LivePurchaseBanner productName={product.name} />
      
      <div ref={headerRef} className="relative w-full">
        <ProductImageGallery images={product.images} />
        
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <Link to="/">
            <Button variant="outline" size="icon" className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90"
              onClick={toggleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
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

        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {product.badges.map((badge, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs text-white border-white/30 bg-black/50 backdrop-blur-sm"
            >
              {badge}
            </Badge>
          ))}
        </div>
      </div>

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
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={toggleFavorite}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
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
        </div>
      )}
      
      <div className={`flex-1 ${isScrolled ? 'pt-14' : ''} pb-[152px]`}>
        <div className="bg-white p-4 mb-2">
          <div className="flex items-center mb-1">
            <Badge variant="outline" className="text-xs bg-red-50 text-red-500 border-red-200">Flash Deal</Badge>
            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-500 border-orange-200 ml-2">Top Seller</Badge>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-500 border-green-200 ml-2">Free Shipping</Badge>
          </div>
          
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-red-500">${formatPrice(currentPrice)}</span>
            <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
            <Badge variant="outline" className="ml-2 text-xs border-red-200 bg-red-50 text-red-500 py-0 h-4">
              {Math.round((1 - currentPrice / originalPrice) * 100)}% OFF
            </Badge>
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
          
          <div className="mt-3 bg-red-50 p-2.5 rounded-md">
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
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
            {showPaymentOptions && (
              <>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
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
      
      <div className="mb-[152px]" ref={tabsRef}>
        <ProductTabs 
          product={product} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isScrolled={isScrolled} 
        />
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-purple-600">${formatPrice(totalPrice)}</span>
                <span className="ml-1.5 text-xs line-through text-gray-500">${formatPrice(originalPrice)}</span>
                <Badge variant="outline" className="ml-1.5 text-xs border-red-200 bg-red-50 text-red-500 py-0 h-4">
                  {Math.round((1 - currentPrice / originalPrice) * 100)}% OFF
                </Badge>
              </div>
              <div className="flex items-center text-xs mt-0.5 text-gray-600">
                <Truck className="h-3 w-3 mr-1" />
                <span>{product.shipping.free ? "Free Shipping" : "Standard Shipping"}</span>
                {currentStock < 50 && (
                  <>
                    <span className="mx-1">•</span>
                    <span className="text-amber-600 font-medium">Only {currentStock} left</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex gap-1.5">
              <div className="flex gap-1">
                <Button 
                  variant="chip" 
                  size="xs"
                  className="animate-pulse" 
                  onClick={() => {
                    toast({
                      title: "Coupon applied!",
                      description: "FLASH25 - 25% off today only",
                    });
                  }}
                >
                  <Tag className="h-3 w-3" />
                  FLASH25
                </Button>
                
                <Button 
                  variant="minimal" 
                  size="icon" 
                  className="h-7 w-7 rounded-full"
                  onClick={toggleFavorite}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
              
              <Button 
                variant="outline"
                size="xs" 
                className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 hover:border-purple-300"
                onClick={addToCart}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Add to Cart
              </Button>
              <Button 
                variant="purple"
                size="xs" 
                className="rounded-full"
                onClick={buyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
