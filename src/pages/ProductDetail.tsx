
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Share, Heart, ShoppingCart, MessageCircle, Shield, Award, Percent, ThumbsUp, Zap, Star, Sparkles, ArrowRight, Crown, Clock, Gift, Check, Info, CreditCard, AlertCircle, Bookmark, Box, Tag, Download, Users, Rocket, TrendingUp, Truck, ShieldCheck, ChevronDown, ChevronUp, Repeat, Calendar, Headphones, Bell, Image } from "lucide-react";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  const [installments, setInstallments] = useState("1");
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const [compareProducts, setCompareProducts] = useState(false);
  const [notifyWhenStock, setNotifyWhenStock] = useState(false);
  const [showBundle, setShowBundle] = useState(false);
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
      description: !giftWrap ? "Gift wrapping has been added to your order" : "Gift wrapping has been removed from your order",
    });
  };

  const toggleInsurance = () => {
    setInsuranceSelected(!insuranceSelected);
    toast({
      title: !insuranceSelected ? "Insurance added" : "Insurance removed",
      description: !insuranceSelected ? "Product insurance has been added to your order" : "Product insurance has been removed from your order",
    });
  };

  const toggleCompare = () => {
    setCompareProducts(!compareProducts);
    if (!compareProducts) {
      toast({
        title: "Added to compare",
        description: "You can now compare this product with others",
      });
    }
  };

  const toggleNotify = () => {
    setNotifyWhenStock(!notifyWhenStock);
    if (!notifyWhenStock) {
      toast({
        title: "Notification set",
        description: "We'll notify you when this product is back in stock",
      });
    } else {
      toast({
        title: "Notification removed",
        description: "You will no longer be notified about this product",
      });
    }
  };

  const toggleBundle = () => {
    setShowBundle(!showBundle);
  };

  const selectedVariant = product.variants.find(variant => variant.name === selectedColor);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16" ref={headerRef}>
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="text-sm hidden sm:inline">Back to products</span>
              </Link>
            </div>
            <div>
              <h1 className="text-sm font-medium text-gray-700 truncate max-w-xs sm:max-w-md">
                {product.name}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="text-gray-500 hover:text-gray-700"
              >
                <Share className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFavorite}
                className={`${
                  isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row">
          {/* Left column - Product Image Gallery */}
          <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
            <ProductImageGallery images={product.images} />
          </div>

          {/* Right column - Product Details */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {/* Product title and badges */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(product.rating))}
                      {product.rating % 1 !== 0 && '☆'}
                      {'☆'.repeat(5 - Math.ceil(product.rating))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{product.rating}/5 ({product.reviewCount} reviews)</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm text-gray-600">{product.sold}+ sold</span>
                </div>
              </div>

              {/* Price section */}
              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-purple-700">${selectedVariant?.price || product.discountPrice}</span>
                  {product.price !== product.discountPrice && (
                    <>
                      <span className="ml-2 text-lg text-gray-500 line-through">${product.price}</span>
                      <Badge className="ml-2 bg-purple-100 text-purple-800 border-purple-200">
                        {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                      </Badge>
                    </>
                  )}
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-green-700 bg-green-50 border-green-200">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    In demand - {product.stock.reserved} people bought this recently
                  </Badge>
                </div>
              </div>

              {/* Color variants */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Color</span>
                  <Button variant="ghost" size="sm" className="text-xs text-purple-600 h-auto p-0" onClick={toggleVariants}>
                    {showVariants ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                    {showVariants ? "Hide options" : "Show all options"}
                  </Button>
                </div>
                {showVariants ? (
                  <div className="grid grid-cols-3 gap-2">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.name}
                        className={`border rounded-md p-2 cursor-pointer transition-all ${
                          selectedColor === variant.name
                            ? "border-purple-500 ring-1 ring-purple-500"
                            : "border-gray-200 hover:border-purple-200"
                        }`}
                        onClick={() => setSelectedColor(variant.name)}
                      >
                        <div className="flex items-center mb-1">
                          <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                          <span className="text-sm font-medium truncate">{variant.name}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          ${variant.price} • {variant.stock < 100 ? `${variant.stock} left` : "In stock"}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center border rounded-md p-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm font-medium">{selectedColor}</span>
                  </div>
                )}
              </div>

              {/* Quantity selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">Quantity</span>
                  <span className="text-sm text-gray-500">{selectedVariant?.stock || 0} available</span>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-l-md"
                  >
                    -
                  </Button>
                  <div className="h-10 w-16 flex items-center justify-center border-t border-b border-gray-300">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                    className="h-10 w-10 rounded-r-md"
                  >
                    +
                  </Button>
                  <div className="ml-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={toggleBundle}
                            className="text-xs flex items-center"
                          >
                            <Box className="w-3.5 h-3.5 mr-1" />
                            Bundle
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Save with product bundles</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                
                {/* Bundle options (conditionally shown) */}
                {showBundle && (
                  <div className="mt-3 border rounded-md p-3 bg-purple-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">Popular Bundles</span>
                      <Button variant="ghost" size="sm" className="h-6 p-0 text-purple-600" onClick={toggleBundle}>
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mr-2">
                            <Image className="w-4 h-4" />
                          </div>
                          <div className="text-xs">
                            <div className="font-medium">Projector + Remote</div>
                            <div className="text-green-600">Save $7.99</div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="h-7 text-xs">Add</Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mr-2">
                            <Image className="w-4 h-4" />
                          </div>
                          <div className="text-xs">
                            <div className="font-medium">Complete Kit (3 items)</div>
                            <div className="text-green-600">Save $12.99</div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="h-7 text-xs">Add</Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Total price calculation */}
                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-gray-500">Total:</span>
                  <span className="font-medium">${(selectedVariant?.price || product.discountPrice) * quantity}{giftWrap && ' + $2.99'}{insuranceSelected && ' + $3.99'}</span>
                </div>
              </div>
            </div>

            {/* Floating purchase box (enhanced) */}
            <div className="bg-white rounded-lg shadow-lg p-5 border border-purple-100 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Left column of features */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <ShieldCheck className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Authentic Product Guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm">30-Day Return Window</span>
                  </div>
                  <div className="flex items-center">
                    <Headphones className="h-4 w-4 text-purple-600 mr-2" />
                    <span className="text-sm">24/7 Customer Support</span>
                  </div>
                </div>
                
                {/* Right column of features */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Repeat className="h-4 w-4 text-amber-600 mr-2" />
                    <span className="text-sm">Free Exchanges</span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-indigo-600 mr-2" />
                    <span className="text-sm">Secure Payment</span>
                  </div>
                  <div className="flex items-center">
                    <Rocket className="h-4 w-4 text-cyan-600 mr-2" />
                    <span className="text-sm">Fast Delivery Options</span>
                  </div>
                </div>
              </div>

              {/* Additional Services */}
              <div className="space-y-3 mb-4">
                {/* Warranty options */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full justify-between text-sm">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-purple-600" />
                        Add Protection Plan
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0">
                    <div className="p-3">
                      <h4 className="font-medium mb-2">Choose Protection Plan</h4>
                      <RadioGroup defaultValue="none" onValueChange={setSelectedWarranty}>
                        <div className="flex items-center justify-between space-x-2 mb-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="none" id="none" />
                            <label htmlFor="none" className="text-sm">No Protection</label>
                          </div>
                          <span className="text-sm font-medium">$0.00</span>
                        </div>
                        {product.warranty.slice(1).map((option) => (
                          <div key={option.name} className="flex items-center justify-between space-x-2 mb-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={option.name} id={option.name} />
                              <label htmlFor={option.name} className="text-sm">{option.name} ({option.duration})</label>
                            </div>
                            <span className="text-sm font-medium">${option.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Payment options */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full justify-between text-sm">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2 text-green-600" />
                        Payment Options
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0">
                    <div className="p-3">
                      <h4 className="font-medium mb-2">Choose Payment Plan</h4>
                      <RadioGroup defaultValue="1" onValueChange={setInstallments}>
                        <div className="flex items-center justify-between space-x-2 mb-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1" id="pay-full" />
                            <label htmlFor="pay-full" className="text-sm">Pay in full</label>
                          </div>
                          <span className="text-sm font-medium">${(selectedVariant?.price || product.discountPrice).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between space-x-2 mb-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="4" id="pay-4" />
                            <label htmlFor="pay-4" className="text-sm">4 interest-free payments</label>
                          </div>
                          <span className="text-sm font-medium">${((selectedVariant?.price || product.discountPrice) / 4).toFixed(2)}</span>
                        </div>
                      </RadioGroup>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Delivery options */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full justify-between text-sm">
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr-2 text-blue-600" />
                        Delivery Options
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0">
                    <div className="p-3">
                      <h4 className="font-medium mb-2">Choose Delivery Method</h4>
                      <RadioGroup defaultValue="standard">
                        <div className="flex items-center justify-between space-x-2 mb-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" onClick={() => setIsExpressSelected(false)} />
                            <label htmlFor="standard" className="text-sm">Standard ({product.shipping.estimated})</label>
                          </div>
                          <span className="text-sm font-medium">Free</span>
                        </div>
                        <div className="flex items-center justify-between space-x-2 mb-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" onClick={() => setIsExpressSelected(true)} />
                            <label htmlFor="express" className="text-sm">Express ({product.shipping.expressEstimated})</label>
                          </div>
                          <span className="text-sm font-medium">${product.shipping.express.toFixed(2)}</span>
                        </div>
                      </RadioGroup>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Gift wrap option */}
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="gift-wrap"
                  checked={giftWrap}
                  onChange={toggleGiftWrap}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="gift-wrap" className="text-sm text-gray-700 flex items-center">
                  <Gift className="h-4 w-4 text-pink-500 mr-1" />
                  Add gift wrapping (+$2.99)
                </label>
              </div>
              
              {/* Product insurance */}
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="insurance"
                  checked={insuranceSelected}
                  onChange={toggleInsurance}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="insurance" className="text-sm text-gray-700 flex items-center">
                  <Shield className="h-4 w-4 text-blue-500 mr-1" />
                  Add 2-year accidental damage coverage (+$3.99)
                </label>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col space-y-3">
                <Button onClick={buyNow} className="bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center py-6">
                  <Zap className="h-5 w-5 mr-2" />
                  Buy Now
                </Button>
                
                <Button onClick={addToCart} variant="outline" className="bg-white border-purple-600 text-purple-600 hover:bg-purple-50 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button onClick={toggleFavorite} variant="outline" size="sm" className="flex items-center justify-center">
                    <Heart className={`h-4 w-4 mr-1 ${isFavorite ? "fill-current text-red-500" : ""}`} />
                    <span className="text-xs">Save</span>
                  </Button>
                  
                  <Button onClick={toggleCompare} variant="outline" size="sm" className="flex items-center justify-center">
                    <Repeat className="h-4 w-4 mr-1" />
                    <span className="text-xs">Compare</span>
                  </Button>
                  
                  <Button onClick={toggleNotify} variant="outline" size="sm" className="flex items-center justify-center">
                    <Bell className="h-4 w-4 mr-1" />
                    <span className="text-xs">Notify</span>
                  </Button>
                </div>
              </div>
              
              {/* Promo section */}
              <div className="mt-4 bg-purple-50 rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-800 flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Apply Coupon
                  </span>
                </div>
                <div className="space-y-2">
                  {product.coupons.map((coupon, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded border p-2">
                      <div className="text-xs">
                        <div className="font-bold">{coupon.code}</div>
                        <div className="text-gray-500">{coupon.discount}</div>
                      </div>
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-purple-600" onClick={() => applyCoupon(coupon.code)}>
                        Apply
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Product Overview</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {product.features.slice(0, showMoreFeatures ? product.features.length : 6).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              {product.features.length > 6 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm text-purple-600"
                  onClick={() => setShowMoreFeatures(!showMoreFeatures)}
                >
                  {showMoreFeatures ? "Show less" : "Show more features"}
                  {showMoreFeatures ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                </Button>
              )}
              <Button variant="outline" size="sm" className="mt-4 text-sm w-full" onClick={scrollToTabs}>
                View Full Details
              </Button>
            </div>

            {/* Customer Q&A */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Customer Questions</h2>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={askQuestion}>
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Ask a Question
                </Button>
              </div>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start mb-2">
                    <div className="bg-purple-100 p-2 rounded-full mr-2">
                      <MessageCircle className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Does this projector connect to smartphones?</div>
                      <div className="text-xs text-gray-500">Asked by John • 2 days ago</div>
                    </div>
                  </div>
                  <div className="ml-8 mt-2">
                    <div className="text-sm text-gray-700">
                      Yes, it connects via Bluetooth and has a dedicated app for Android and iOS. You can control all functions and change color modes from your phone.
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Official response • 1 day ago</div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start mb-2">
                    <div className="bg-purple-100 p-2 rounded-full mr-2">
                      <MessageCircle className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">How long does the battery last?</div>
                      <div className="text-xs text-gray-500">Asked by Sarah • 5 days ago</div>
                    </div>
                  </div>
                  <div className="ml-8 mt-2">
                    <div className="text-sm text-gray-700">
                      The battery lasts approximately 6 hours on standard brightness settings and about 4 hours on the highest brightness setting.
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Answered by Michael (Verified Purchase) • 4 days ago</div>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 text-sm w-full" onClick={() => { setActiveTab("qa"); scrollToTabs(); }}>
                View All Questions
              </Button>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div ref={tabsRef}>
          <ProductTabs
            product={product}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isScrolled={isScrolled}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
