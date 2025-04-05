
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
      { name: "Cosmic Nebula", price: 29.99, stock: 87, image: "/placeholder.svg" },
      { name: "Starry Night", price: 24.99, stock: 42, image: "/placeholder.svg" },
    ],
  };

  useEffect(() => {
    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    // Scroll listener
    const handleScroll = () => {
      if (headerRef.current && tabsRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        const tabsOffsetTop = tabsRef.current.offsetTop;
        
        if (window.scrollY > tabsOffsetTop - headerHeight) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 5) {
      setQuantity(newQuantity);
      setMaxQuantityReached(newQuantity === 5);
    }
    
    if (newQuantity === 5 && !maxQuantityReached) {
      toast({
        title: "Maximum Quantity Reached",
        description: "You can only purchase up to 5 units per order.",
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = () => {
    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 1500);
    
    toast({
      title: `${product.name} (${selectedColor})`,
      description: `${quantity} item${quantity > 1 ? 's' : ''} added to your cart!`,
      action: (
        <Link to="/cart" className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">
          View Cart
        </Link>
      ),
    });
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  const handleBuyNow = () => {
    toast({
      title: "Proceeding to Checkout",
      description: `${quantity} × ${product.name} (${selectedColor})`,
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from Wishlist" : "Added to Wishlist",
      description: product.name,
    });
  };

  const handleWarrantyChange = (value: string) => {
    setSelectedWarranty(value);
  };

  // Find the selected variant
  const selectedVariant = product.variants.find(variant => variant.name === selectedColor);
  
  // Calculate the actual price based on selected options
  let finalPrice = selectedVariant ? selectedVariant.price : product.discountPrice;
  
  if (selectedWarranty === "extended") {
    finalPrice += 4.99;
  } else if (selectedWarranty === "premium") {
    finalPrice += 9.99;
  }
  
  // Add express shipping if selected
  if (isExpressSelected) {
    finalPrice += 4.99;
  }
  
  // Add gift wrapping if selected
  if (giftWrap) {
    finalPrice += 1.99;
  }
  
  // Apply quantity
  const total = finalPrice * quantity;

  return (
    <div className="bg-gray-50 min-h-screen pb-20 relative">
      {/* Header with back button and actions */}
      <div 
        ref={headerRef}
        className="sticky top-0 z-30 bg-white shadow-sm"
      >
        <div className="container max-w-6xl px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center text-gray-700 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Share className="h-5 w-5" />
            </button>
            <button 
              className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={handleToggleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-gray-900">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </Link>
          </div>
        </div>
      </div>
      
      <LivePurchaseBanner productName="Galaxy Nebula Projector" />

      <div className="container max-w-6xl px-4 pt-4 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="relative">
            <ProductImageGallery images={product.images} />
            
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <Badge className="bg-red-500 text-white px-2 py-1 text-xs font-bold">
                SALE
              </Badge>
              <Badge className="bg-purple-600 text-white px-2 py-1 text-xs font-bold">
                NEW
              </Badge>
            </div>
            
            <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center">
              <Star className="h-3 w-3 text-yellow-400 mr-1 fill-yellow-400" />
              {product.rating} ({product.reviewCount})
            </div>
            
            <div className="absolute bottom-3 left-3 right-3 flex justify-between">
              <Badge className="bg-green-500 text-white px-2 py-1 text-xs font-bold flex items-center">
                <Check className="h-3 w-3 mr-1" />
                In Stock
              </Badge>
              <Badge className="bg-blue-500 text-white px-2 py-1 text-xs font-bold flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {product.sold}+ sold
              </Badge>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-end mb-4">
              <div className="text-3xl font-bold text-red-600">${formatPrice(product.discountPrice)}</div>
              <div className="text-lg line-through text-gray-500 ml-2">${formatPrice(product.price)}</div>
              <div className="ml-2 bg-red-100 text-red-800 rounded-md px-2 py-0.5 text-sm font-medium">
                {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Countdown Timer */}
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">Flash Sale Ends In:</span>
                </div>
                <div className="flex justify-center gap-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="text-xs uppercase">Hours</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="text-xs uppercase">Mins</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="text-xs uppercase">Secs</div>
                  </div>
                </div>
              </div>
              
              {/* Product Description */}
              <p className="text-gray-700">{product.description}</p>
              
              {/* Variants */}
              {showVariants && (
                <div>
                  <h3 className="font-medium mb-2 flex items-center">
                    <span>Color Options</span>
                    <span className="ml-2 text-sm text-gray-500">({product.variants.length})</span>
                  </h3>
                  <RadioGroup 
                    value={selectedColor} 
                    onValueChange={setSelectedColor}
                    className="grid grid-cols-2 gap-2 md:grid-cols-4"
                  >
                    {product.variants.map((variant) => (
                      <div key={variant.name} className="relative">
                        <RadioGroupItem
                          value={variant.name}
                          id={variant.name}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={variant.name}
                          className="flex flex-col items-center border p-2 cursor-pointer rounded-lg hover:bg-gray-50 peer-focus:ring-2 peer-focus:ring-purple-500 transition-colors peer-data-[state=checked]:bg-purple-50 peer-data-[state=checked]:border-purple-500"
                        >
                          <div className="w-full aspect-square bg-gray-100 rounded mb-2">
                            <img src={variant.image} alt={variant.name} className="w-full h-full object-cover rounded" />
                          </div>
                          <div className="text-sm text-center">
                            <div className="font-medium truncate w-full">{variant.name}</div>
                            <div className="text-gray-500 flex items-center justify-center">
                              <span className="font-medium text-red-600">${formatPrice(variant.price)}</span>
                              {variant.stock < 50 && (
                                <span className="ml-2 text-xs text-orange-600">
                                  {variant.stock} left
                                </span>
                              )}
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              <LiveStockUpdates initialStock={selectedVariant?.stock || 0} highDemand={true} />
              
              {/* Warranty Options */}
              <div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowWarrantyOptions(!showWarrantyOptions)}>
                  <h3 className="font-medium flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-purple-600" />
                    <span>Warranty Options</span>
                  </h3>
                  <button className="text-purple-600 text-sm font-medium">
                    {showWarrantyOptions ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {showWarrantyOptions && (
                  <div className="mt-3 space-y-2">
                    <div className="bg-white border p-3 rounded-lg grid grid-cols-[1fr,auto] items-center transition-colors hover:bg-gray-50">
                      <label htmlFor="warranty-none" className="cursor-pointer flex-1">
                        <div className="flex items-center">
                          <div className="mr-2">
                            <Shield className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium">Standard Warranty</div>
                            <div className="text-sm text-gray-500">12 months manufacturer warranty</div>
                          </div>
                        </div>
                      </label>
                      <div>
                        <input 
                          type="radio" 
                          id="warranty-none" 
                          name="warranty" 
                          className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                          checked={selectedWarranty === "none"}
                          onChange={() => handleWarrantyChange("none")}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-white border p-3 rounded-lg grid grid-cols-[1fr,auto] items-center transition-colors hover:bg-gray-50">
                      <label htmlFor="warranty-extended" className="cursor-pointer flex-1">
                        <div className="flex items-center">
                          <div className="mr-2">
                            <Shield className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <div className="font-medium">Extended Warranty</div>
                            <div className="text-sm text-gray-500">24 months coverage + accidental damage</div>
                          </div>
                        </div>
                      </label>
                      <div className="flex items-center">
                        <div className="text-sm font-medium mr-2">+$4.99</div>
                        <input 
                          type="radio" 
                          id="warranty-extended" 
                          name="warranty" 
                          className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                          checked={selectedWarranty === "extended"}
                          onChange={() => handleWarrantyChange("extended")}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-white border p-3 rounded-lg grid grid-cols-[1fr,auto] items-center transition-colors hover:bg-gray-50">
                      <label htmlFor="warranty-premium" className="cursor-pointer flex-1">
                        <div className="flex items-center">
                          <div className="mr-2">
                            <Shield className="h-5 w-5 text-gold-500 text-yellow-500" />
                          </div>
                          <div>
                            <div className="font-medium">Premium Warranty</div>
                            <div className="text-sm text-gray-500">36 months coverage + accidental + priority service</div>
                          </div>
                        </div>
                      </label>
                      <div className="flex items-center">
                        <div className="text-sm font-medium mr-2">+$9.99</div>
                        <input 
                          type="radio" 
                          id="warranty-premium" 
                          name="warranty" 
                          className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                          checked={selectedWarranty === "premium"}
                          onChange={() => handleWarrantyChange("premium")}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Quick Shipping */}
              <div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}>
                  <h3 className="font-medium flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-purple-600" />
                    <span>Delivery Options</span>
                  </h3>
                  <button className="text-purple-600 text-sm font-medium">
                    {showDeliveryOptions ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {showDeliveryOptions && (
                  <div className="mt-3 space-y-2">
                    <div className="bg-white border p-3 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Truck className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <div className="font-medium">Standard Shipping</div>
                          <div className="text-sm text-gray-500">Free • 7-10 business days</div>
                        </div>
                      </div>
                      <input 
                        type="radio" 
                        name="shipping" 
                        className="w-4 h-4 text-purple-600"
                        checked={!isExpressSelected}
                        onChange={() => setIsExpressSelected(false)}
                      />
                    </div>
                    
                    <div className="bg-white border p-3 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Zap className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <div className="font-medium">Express Shipping</div>
                          <div className="text-sm text-gray-500">$4.99 • 2-3 business days</div>
                        </div>
                      </div>
                      <input 
                        type="radio" 
                        name="shipping" 
                        className="w-4 h-4 text-purple-600"
                        checked={isExpressSelected}
                        onChange={() => setIsExpressSelected(true)}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Gift Options */}
              <div className="flex items-center justify-between bg-white border p-3 rounded-lg">
                <div className="flex items-center">
                  <Gift className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium">Add Gift Wrapping</div>
                    <div className="text-sm text-gray-500">Includes a gift box and personalized note</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm font-medium mr-2">+$1.99</div>
                  <Switch 
                    checked={giftWrap}
                    onCheckedChange={setGiftWrap}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div ref={tabsRef} className="mt-8">
          <ProductTabs 
            product={product} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            isScrolled={isScrolled}
          />
        </div>
      </div>
      
      {/* Live Activity Notifications */}
      <LiveActivityNotifications />
      
      {/* Fixed Purchase section */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div className="container max-w-6xl px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Price section - Always visible */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="text-red-600 font-bold text-xl sm:mr-3">${formatPrice(total)}</div>
              <div className="flex items-center">
                {product.price !== product.discountPrice && (
                  <div className="text-sm line-through text-gray-500 mr-2">${formatPrice(product.price * quantity)}</div>
                )}
                <div className="bg-red-100 text-red-800 text-xs px-1.5 py-0.5 rounded">
                  SALE
                </div>
              </div>
            </div>
            
            {/* Quantity controls and buttons - Rearranged for mobile */}
            <div className="flex items-center space-x-2">
              {/* Quantity controls */}
              <div className="hidden sm:flex items-center border rounded-lg overflow-hidden">
                <button 
                  className="px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="w-8 text-center py-2">{quantity}</div>
                <button 
                  className="px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 5}
                >
                  +
                </button>
              </div>
              
              {/* Action buttons - On mobile stacked */}
              <div className="flex flex-col sm:flex-row gap-2">
                {/* For mobile devices - quantity controls in a row */}
                <div className="flex sm:hidden items-center border rounded-lg overflow-hidden mb-2 self-center">
                  <button 
                    className="px-4 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <div className="w-10 text-center py-1.5">{quantity}</div>
                  <button 
                    className="px-4 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 5}
                  >
                    +
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    className="px-4 py-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    <span>Add to Cart</span>
                  </Button>
                  
                  <Button 
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700"
                    onClick={handleBuyNow}
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    <span>Buy Now</span>
                  </Button>
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
