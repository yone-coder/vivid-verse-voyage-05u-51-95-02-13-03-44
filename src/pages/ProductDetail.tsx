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
      
      <div className={`flex-1 ${isScrolled ? 'pt-14' : ''}`}>
        <div className="bg-white p-4 mb-2">
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-red-500">${formatPrice(currentPrice)}</span>
            <span className="ml-2 text-sm line-through text-gray-500">${formatPrice(originalPrice)}</span>
            <span className="ml-2 text-xs px-1.5 py-0.5 bg-red-100 text-red-500 rounded">
              {Math.round((1 - currentPrice / originalPrice) * 100)}% OFF
            </span>
            <div className="ml-auto flex items-center">
              <div className="text-xs px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full border border-amber-200 flex items-center">
                <Award className="h-3 w-3 mr-1" />
                <span>Best Value</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-lg font-medium mt-2">{product.name}</h1>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center text-sm">
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
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100"
                onClick={askQuestion}
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                Q&A
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                onClick={handleShare}
              >
                <Share className="h-3 w-3 mr-1" />
                Share
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-100 p-2.5 rounded-md border border-purple-200">
              <div className="flex items-center text-xs">
                <Zap className="h-3.5 w-3.5 text-purple-500 mr-1.5" />
                <span className="font-medium text-purple-800">Limited Time Offer</span>
              </div>
              <div className="text-xs text-purple-700 mt-1 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Ends in:</span>
                <div className="ml-1.5 flex gap-1">
                  <span className="bg-purple-800 text-white px-1 py-0.5 rounded text-[10px]">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="text-purple-800">:</span>
                  <span className="bg-purple-800 text-white px-1 py-0.5 rounded text-[10px]">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="text-purple-800">:</span>
                  <span className="bg-purple-800 text-white px-1 py-0.5 rounded text-[10px]">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-100 p-2.5 rounded-md border border-blue-200">
              <div className="flex items-center text-xs">
                <ThumbsUp className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                <span className="font-medium text-blue-800">Customer Favorite</span>
              </div>
              <div className="text-xs text-blue-700 mt-1 flex items-center">
                <Users className="h-3 w-3 mr-1" />
                <span>97% positive feedback</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex-1 bg-red-50 p-2 rounded-md mr-1 h-16">
              <div className="text-xs font-medium text-gray-700 mb-1 flex items-center">
                <Percent className="h-3.5 w-3.5 mr-1 text-red-500" />
                Available Coupons:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.coupons.map((coupon, index) => (
                  <div 
                    key={index} 
                    className="flex items-center overflow-hidden rounded border border-red-300 group hover:border-red-500 cursor-pointer transition-colors"
                    onClick={() => applyCoupon(coupon.code)}
                  >
                    <div className="bg-red-500 text-white px-1.5 py-0.5 text-[10px] font-medium group-hover:bg-red-600 transition-colors">
                      {coupon.code}
                    </div>
                    <div className="px-1.5 py-0.5 text-[10px] text-red-600 bg-white">
                      {coupon.discount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 bg-green-50 p-2 rounded-md ml-1 h-16">
              <div className="text-xs font-medium text-gray-700 mb-1 flex items-center">
                <Truck className="h-3.5 w-3.5 mr-1 text-green-500" />
                Shipping & Returns:
              </div>
              <div className="text-xs flex flex-col">
                <span className="text-green-700">• {product.shipping.free ? "Free Standard Shipping" : `$${product.shipping.express} shipping`}</span>
                <span className="text-green-700">• {product.shipping.returns}</span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-xs font-medium mb-1.5">Select Variant:</div>
            <div className="grid grid-cols-3 gap-1.5">
              {product.variants.slice(0, 3).map((variant) => (
                <div 
                  key={variant.name}
                  className={`border rounded-md p-1.5 text-xs text-center cursor-pointer transition-all ${selectedColor === variant.name ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
                  onClick={() => setSelectedColor(variant.name)}
                >
                  <div className="w-full h-10 bg-gray-200 rounded mb-1 overflow-hidden">
                    <img src={variant.image} alt={variant.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={selectedColor === variant.name ? 'text-purple-500 font-medium text-[11px]' : 'text-[11px]'}>
                    {variant.name}
                  </div>
                  <div className="text-[10px] mt-0.5">
                    ${variant.price}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-2.5">
              <div>
                <div className="text-xs font-medium mb-1">Quantity:</div>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0 rounded-l-md rounded-r-none text-xs"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <span>-</span>
                  </Button>
                  <div className="h-7 px-3 flex items-center justify-center border-t border-b border-gray-300 text-sm">
                    {quantity}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0 rounded-r-md rounded-l-none text-xs"
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                  >
                    <span>+</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 ml-3">
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-red-500 font-medium">Selling Fast!</span>
                  <span className="text-gray-500">{currentVariant?.stock || 0} left</span>
                </div>
                <Progress value={stockPercentage} className="h-1.5" indicatorClassName="bg-gradient-to-r from-red-500 to-orange-400" />
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button 
              variant="outline"
              className="h-10 border-purple-500 text-purple-600 hover:bg-purple-50"
              onClick={addToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
            
            <Button 
              className="h-10 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={buyNow}
            >
              <Zap className="h-4 w-4 mr-1" />
              Buy Now
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5 justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Shield className="h-3 w-3 mr-1 text-blue-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center">
              <Box className="h-3 w-3 mr-1 text-blue-500" />
              <span>Free Returns</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-3 w-3 mr-1 text-blue-500" />
              <span>Authentic Product</span>
            </div>
            <div className="flex items-center">
              <Download className="h-3 w-3 mr-1 text-blue-500" />
              <span>App Control</span>
            </div>
          </div>
        </div>
        
        <div ref={tabsRef} className="sticky top-0 z-20 bg-white shadow-sm">
          <ProductTabs 
            product={product} 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isScrolled={isScrolled}
          />
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-20">
          <Button 
            className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white relative overflow-hidden"
            onClick={buyNow}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-between w-full px-4 mb-1.5">
                  <div className="flex items-center">
                    <Rocket className="h-5 w-5 mr-2" />
                    <span className="font-bold text-base">Buy Now</span>
                  </div>
                  <div className="font-bold">${formatPrice(totalPrice)}</div>
                </div>
                <div className="w-full px-4">
                  <Progress 
                    value={Math.min(100, currentStock ? (100 - (currentStock / 300) * 100) : 95)} 
                    className="h-1 w-full"
                    indicatorClassName="bg-white/30"
                  />
                </div>
                <div className="flex justify-between w-full px-4 mt-1">
                  <div className="text-xs opacity-90">
                    {quantity}x {selectedColor}
                  </div>
                  <div className="text-xs opacity-90">
                    {currentStock > 50 ? `${currentStock} left` : `Only ${currentStock} left!`}
                  </div>
                </div>
              </div>
            </div>
          </Button>
        </div>
        
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default ProductDetail;
