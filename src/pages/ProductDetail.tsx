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
      <div ref={headerRef} className="relative w-full bg-white shadow-sm">
        <div className="max-w-4xl mx-auto">
          <ProductImageGallery images={product.images} />
        </div>
        
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <Link to="/">
            <Button variant="outline" size="icon" className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md"
              onClick={toggleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md"
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
              className="text-xs text-white border-white/30 bg-black/70 backdrop-blur-sm"
            >
              {badge}
            </Badge>
          ))}
        </div>
      </div>

      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 bg-white z-30 shadow-md transition-all duration-300 ease-in-out">
          <div className="flex items-center h-16 px-6 max-w-4xl mx-auto">
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
      
      <div className={`flex-1 ${isScrolled ? 'pt-0' : ''}`}>
        <div className="max-w-4xl mx-auto bg-white p-6 mt-0 rounded-b-lg shadow-sm">
          <div className="flex items-center mb-2">
            <Badge variant="outline" className="text-xs bg-red-50 text-red-500 border-red-200 mr-2">Flash Deal</Badge>
            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-500 border-orange-200 mr-2">Top Seller</Badge>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-500 border-green-200">Free Shipping</Badge>
          </div>
          
          <h1 className="text-2xl font-semibold mt-2 mb-1">{product.name}</h1>
          
          <div className="flex items-baseline mb-2">
            <span className="text-2xl font-bold text-purple-600">${formatPrice(currentPrice)}</span>
            <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
            <span className="ml-2 text-xs px-2 py-0.5 bg-red-100 text-red-500 rounded-full font-medium">
              {Math.round((1 - currentPrice / originalPrice) * 100)}% OFF
            </span>
          </div>
          
          <div className="flex items-center mt-2 mb-3 text-sm">
            <div className="flex text-amber-400">
              {'★'.repeat(Math.floor(product.rating))}
              {product.rating % 1 !== 0 && '☆'}
              {'☆'.repeat(5 - Math.ceil(product.rating))}
              <span className="ml-1 text-black font-medium">{product.rating}</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-600">{product.reviewCount} Reviews</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-600">{product.sold}+ Sold</span>
          </div>

          <div className="mb-4">
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center text-sm">
                <Zap className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-medium text-purple-900">Limited Time Offer</span>
              </div>
              <div className="text-sm text-purple-800 mt-2 flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>Deal ends in:</span>
                <div className="ml-3 flex gap-1">
                  <span className="bg-purple-800 text-white px-2 py-1 rounded">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="text-purple-800 flex items-center">:</span>
                  <span className="bg-purple-800 text-white px-2 py-1 rounded">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="text-purple-800 flex items-center">:</span>
                  <span className="bg-purple-800 text-white px-2 py-1 rounded">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-800 mb-2 flex items-center">
                <Percent className="h-4 w-4 mr-2 text-red-500" />
                Available Coupons:
              </div>
              <div className="flex flex-wrap gap-2">
                {product.coupons.map((coupon, index) => (
                  <div 
                    key={index} 
                    className="flex items-center overflow-hidden rounded-lg border border-red-300 group hover:border-red-500 cursor-pointer transition-colors"
                    onClick={() => applyCoupon(coupon.code)}
                  >
                    <div className="bg-red-500 text-white px-3 py-1.5 text-xs font-medium group-hover:bg-red-600 transition-colors">
                      {coupon.code}
                    </div>
                    <div className="px-3 py-1.5 text-xs text-red-600 bg-white">
                      {coupon.discount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-8 mb-4">
            <div className="w-full md:w-1/2">
              <div className="text-sm font-medium mb-3 flex items-center">
                <Truck className="h-4 w-4 text-gray-600 mr-2" />
                <span className="text-gray-800">Shipping Options</span>
                <button 
                  className="ml-2 text-blue-500 underline text-xs"
                  onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
                >
                  {showDeliveryOptions ? "Hide" : "Show"}
                </button>
              </div>

              {showDeliveryOptions && (
                <div className="ml-6 bg-gray-50 p-4 rounded-lg text-sm mb-3">
                  <RadioGroup defaultValue={isExpressSelected ? "express" : "standard"} onValueChange={(value) => setIsExpressSelected(value === "express")}>
                    <div className="flex items-center space-x-2 mb-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <label htmlFor="standard" className="flex-1">
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-xs text-gray-500">Free • {product.shipping.estimated}</div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <label htmlFor="express" className="flex-1">
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-xs text-gray-500">${product.shipping.express} • {product.shipping.expressEstimated}</div>
                      </label>
                    </div>
                  </RadioGroup>

                  <div className="mt-4 text-xs flex items-start">
                    <Gift className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Gift Wrapping</span>
                        <span className="text-green-500">+$2.99</span>
                      </div>
                      <p className="text-gray-500 mt-0.5">Add beautiful packaging with a personalized message</p>
                      <Button 
                        variant={giftWrap ? "default" : "outline"} 
                        size="sm" 
                        className={`mt-2 text-xs px-2 py-0 h-7 ${giftWrap ? "bg-green-500 hover:bg-green-600" : ""}`}
                        onClick={toggleGiftWrap}
                      >
                        {giftWrap ? <Check className="h-3 w-3 mr-1" /> : null}
                        {giftWrap ? "Gift Wrap Added" : "Add Gift Wrap"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="text-sm font-medium mb-3 flex items-center">
                <Shield className="h-4 w-4 text-gray-600 mr-2" />
                <span className="text-gray-800">Buyer Protection</span>
                <button
                  className="ml-2 text-blue-500 underline text-xs"
                  onClick={() => setShowWarrantyOptions(!showWarrantyOptions)}
                >
                  {showWarrantyOptions ? "Hide" : "Show Warranty"}
                </button>
              </div>

              {showWarrantyOptions && (
                <div className="ml-6 bg-gray-50 p-4 rounded-lg text-sm mb-3">
                  <div className="mb-2 font-medium text-gray-700 flex items-center">
                    <Shield className="h-4 w-4 mr-1.5 text-blue-500" />
                    Extended Warranty Options:
                  </div>
                  <RadioGroup 
                    value={selectedWarranty} 
                    onValueChange={setSelectedWarranty}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="warranty-none" />
                      <label htmlFor="warranty-none" className="flex-1">
                        <div className="font-medium">No additional warranty</div>
                        <div className="text-xs text-gray-500">Includes standard {product.warranty[0].duration} manufacturer warranty</div>
                      </label>
                    </div>
                    
                    {product.warranty.slice(1).map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.name.toLowerCase()} id={`warranty-${option.name.toLowerCase()}`} />
                        <label htmlFor={`warranty-${option.name.toLowerCase()}`} className="flex-1">
                          <div className="font-medium">{option.name} Protection Plan</div>
                          <div className="text-xs text-gray-500">{option.duration} coverage • +${option.price}</div>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <div className="text-sm font-medium mb-3 flex justify-between items-center">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-gray-800">Payment Options</span>
                </div>
                <button
                  onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                  className="text-xs text-blue-500 underline"
                >
                  {showPaymentOptions ? "Hide" : "Show"}
                </button>
              </div>

              {showPaymentOptions && (
                <div className="bg-gray-50 p-4 rounded-lg mb-3">
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    {product.payments.map((method, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                        <span>{method}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 bg-purple-50 p-2.5 rounded-lg border border-purple-100">
                    <div className="text-xs font-medium text-purple-700 flex items-center">
                      <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                      Buy now, pay later options available at checkout
                    </div>
                  </div>
                </div>
              )}

              <div className="text-sm font-medium mb-3 flex justify-between items-center">
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-gray-800">Product Features</span>
                </div>
                <button
                  onClick={() => setShowMoreFeatures(!showMoreFeatures)}
                  className="text-xs text-blue-500 underline"
                >
                  {showMoreFeatures ? "Hide" : "Show"}
                </button>
              </div>

              {showMoreFeatures && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="h-4 w-4 text-amber-500 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-3 text-sm h-9" 
                    onClick={scrollToTabs}
                  >
                    View Full Specifications
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <div className="text-lg font-semibold mb-3">Select Variant</div>
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-3">
                {product.variants.map((variant) => (
                  <div 
                    key={variant.name}
                    className={`border rounded-lg p-3 text-sm text-center cursor-pointer transition-all ${selectedColor === variant.name ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'}`}
                    onClick={() => setSelectedColor(variant.name)}
                  >
                    <div className="w-full h-16 bg-gray-100 rounded-md mb-2 overflow-hidden">
                      <img src={variant.image} alt={variant.name} className="w-full h-full object-cover" />
                    </div>
                    <div className={selectedColor === variant.name ? 'text-purple-600 font-medium' : 'text-gray-800'}>
                      {variant.name}
                    </div>
                    <div className="text-sm mt-1 font-medium">
                      ${variant.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-md font-medium mb-2">Quantity:</div>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 rounded-l-md rounded-r-none border-r-0"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <span className="text-lg">-</span>
                </Button>
                <div className="h-10 w-14 flex items-center justify-center border border-gray-300 text-base font-medium">
                  {quantity}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 rounded-r-md rounded-l-none border-l-0"
                  onClick={incrementQuantity}
                  disabled={quantity >= 10}
                >
                  <span className="text-lg">+</span>
                </Button>
                <div className="ml-4 text-sm text-gray-500">
                  {currentVariant?.stock || 0} available
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-500 font-medium flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    Selling Fast!
                  </span>
                  <span className="text-gray-500">{currentVariant?.stock || 0} left</span>
                </div>
                <Progress value={stockPercentage} className="h-2" indicatorClassName="bg-gradient-to-r from-red-500 to-orange-400" />
              </div>

              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="text-sm flex items-start">
                  <Crown className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-yellow-800">PRO TIP:</span>
                    <span className="text-yellow-800"> This item is selling fast! {currentVariant?.stock} people purchased in the last 24 hours.</span>
                  </div>
                </div>
              </div>
            </div>
              
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-md font-medium mb-3">Order Summary:</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price ({quantity} x ${formatPrice(currentPrice)})</span>
                  <span className="font-medium">${formatPrice(currentPrice * quantity)}</span>
                </div>
                
                {warrantyPrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {warrantyOption?.name} Warranty ({warrantyOption?.duration})
                    </span>
                    <span>+${formatPrice(warrantyPrice)}</span>
                  </div>
                )}
                
                {giftWrap && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gift Wrapping</span>
                    <span>+$2.99</span>
                  </div>
                )}
                
                {isExpressSelected && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Express Shipping</span>
                    <span>+${formatPrice(product.shipping.express)}</span>
                  </div>
                )}
                
                <Separator className="my-3" />
                
                <div className="flex justify-between font-medium text-base pt-1">
                  <span>Total:</span>
                  <span className="text-purple-600">${formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={tabsRef} className="sticky top-0 z-20 bg-white shadow-sm">
          <div className="max-w-4xl mx-auto">
            <ProductTabs 
              product={product} 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isScrolled={isScrolled}
            />
          </div>
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-20">
          <div className="max-w-4xl mx-auto flex gap-3">
            <Button
              variant="outline"
              className="w-1/3 h-14"
              onClick={addToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button 
              className="w-2/3 h-14 bg-purple-600 hover:bg-purple-700 text-white font-bold relative overflow-hidden"
              onClick={buyNow}
            >
              <div className="flex items-center">
                <Rocket className="h-5 w-5 mr-2" />
                <span>Buy Now · ${formatPrice(totalPrice)}</span>
              </div>
            </Button>
          </div>
        </div>
        
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default ProductDetail;
