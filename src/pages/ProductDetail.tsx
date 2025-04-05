
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
      { name: "Cosmic Purple", price: 26.99, stock: 89, image: "/placeholder.svg" },
      { name: "Northern Lights", price: 29.99, stock: 42, image: "/placeholder.svg" },
    ]
  };

  // Update timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return prev;
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Sticky header logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle quantity changes
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setMaxQuantityReached(false);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
      if (quantity === 9) {
        setMaxQuantityReached(true);
        toast({
          title: "Maximum quantity reached",
          description: "You can only purchase up to 10 units per order.",
          variant: "destructive",
        });
      }
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    setShowCartAnimation(true);
    
    setTimeout(() => {
      setShowCartAnimation(false);
    }, 1000);
    
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
  };

  // Handle favorite
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: isFavorite ? "Item has been removed from your wishlist." : "Item has been added to your wishlist.",
    });
  };

  // Handle color change
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  // Handle warranty change
  const handleWarrantyChange = (value: string) => {
    setSelectedWarranty(value);
  };

  // Format Price
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Calculate discounted percentage
  const discountPercentage = Math.round(((product.price - product.discountPrice) / product.price) * 100);

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    
    // Find the variant price based on selected color
    const selectedVariant = product.variants.find(variant => variant.name === selectedColor);
    const basePrice = selectedVariant ? selectedVariant.price : product.discountPrice;
    
    // Add base price
    total = basePrice * quantity;
    
    // Add warranty cost if selected
    if (selectedWarranty === "extended") {
      total += 4.99;
    } else if (selectedWarranty === "premium") {
      total += 9.99;
    }
    
    // Add express shipping if selected
    if (isExpressSelected) {
      total += 5.99;
    }
    
    return formatPrice(total);
  };

  return (
    <div className="bg-white pb-20 min-h-screen relative">
      {/* Sticky Header */}
      <div 
        ref={headerRef}
        className={`sticky top-0 z-30 bg-white border-b transition-shadow ${isScrolled ? 'shadow-md' : ''}`}
      >
        <div className="container max-w-6xl mx-auto py-3 px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span className={`${isMobile ? 'hidden' : 'block'}`}>Back</span>
            </Link>
            
            {isScrolled && (
              <div className="flex-1 mx-4">
                <h1 className="text-sm font-medium truncate">{product.name}</h1>
                <div className="flex items-center">
                  <span className="text-xs text-red-600 font-bold">{formatPrice(product.discountPrice)}</span>
                  <span className="text-xs text-gray-400 line-through ml-1">{formatPrice(product.price)}</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-1">
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={handleToggleFavorite}
                className={`${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              
              <Button size="icon" variant="ghost">
                <Share className="h-5 w-5 text-gray-500" />
              </Button>
              
              {isScrolled && (
                <Button 
                  className="bg-red-500 hover:bg-red-600 text-white ml-1 flex items-center"
                  size={isMobile ? "sm" : "default"}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className={`h-4 w-4 ${isMobile ? '' : 'mr-2'}`} />
                  {!isMobile && <span>Add to Cart</span>}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container max-w-6xl mx-auto px-4">
        {/* Product Main Section */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="sticky top-20" style={{ height: 'fit-content' }}>
            <ProductImageGallery images={product.images} />
            
            {/* Variants */}
            {showVariants && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.variants.map((variant, index) => (
                  <button 
                    key={index}
                    className={`border rounded-md overflow-hidden ${
                      selectedColor === variant.name ? 'ring-2 ring-red-500' : ''
                    }`}
                    onClick={() => handleColorChange(variant.name)}
                  >
                    <div className="aspect-square w-full bg-gray-100">
                      <img src={variant.image} alt={variant.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-1 text-center">
                      <p className="text-xs truncate">{variant.name}</p>
                      <p className="text-xs font-semibold text-red-500">${variant.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Right Column - Details */}
          <div>
            {/* Product Info */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge className="bg-red-500">Best Seller</Badge>
                <Badge variant="outline" className="text-amber-500 border-amber-200">
                  <Star className="h-3 w-3 fill-amber-500 mr-1" />
                  {product.rating}
                </Badge>
                <Badge variant="outline" className="text-gray-600 border-gray-200">
                  {product.reviewCount} Reviews
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {product.sold}+ Sold
                </Badge>
              </div>
              
              <h1 className="text-2xl font-bold">{product.name}</h1>
              
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-red-600">{formatPrice(product.discountPrice)}</span>
                <span className="text-sm text-gray-500 line-through ml-2">{formatPrice(product.price)}</span>
                <Badge className="ml-2 bg-red-100 text-red-800 font-medium">
                  {discountPercentage}% OFF
                </Badge>
              </div>
              
              {/* Flash Sale Timer */}
              <div className="mt-3 flex items-center">
                <div className="bg-red-100 text-red-800 py-1 px-2 rounded-l-md flex items-center">
                  <Zap className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium uppercase">Flash Sale</span>
                </div>
                <div className="bg-red-600 text-white py-1 px-2 rounded-r-md flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-xs">
                    Ends in: <strong>{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</strong>
                  </span>
                </div>
              </div>
            </div>
            
            <LiveStockUpdates initialStock={125} highDemand />
            
            {/* Color Selection */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Color: <span className="text-red-600">{selectedColor}</span></label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorChange(variant.name)}
                    className={`px-3 py-1.5 text-sm border rounded-md ${
                      selectedColor === variant.name
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity Selection */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Quantity:</label>
              <div className="flex items-center">
                <button 
                  onClick={handleDecreaseQuantity}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                  {quantity}
                </div>
                <button 
                  onClick={handleIncreaseQuantity}
                  className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md ${
                    maxQuantityReached 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                  disabled={maxQuantityReached}
                >
                  +
                </button>
                <span className="ml-3 text-xs text-gray-500">
                  {selectedColor && (
                    <>{(product.variants.find(v => v.name === selectedColor)?.stock || 0)} units available</>
                  )}
                </span>
              </div>
            </div>
            
            {/* Protection Plan */}
            <div className="mt-6">
              <button 
                onClick={() => setShowWarrantyOptions(!showWarrantyOptions)}
                className="w-full flex items-center justify-between py-2 px-4 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">Add Protection Plan</span>
                </div>
                <ChevronRight className={`h-5 w-5 text-gray-400 transform transition-transform ${showWarrantyOptions ? 'rotate-90' : ''}`} />
              </button>
              
              {showWarrantyOptions && (
                <div className="mt-2 border border-gray-200 rounded-md p-3 bg-white">
                  <RadioGroup value={selectedWarranty} onValueChange={handleWarrantyChange}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <RadioGroupItem value="none" id="none" />
                        <label htmlFor="none" className="ml-2 text-sm">No protection</label>
                      </div>
                      <span className="text-sm">$0.00</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <RadioGroupItem value="extended" id="extended" />
                        <label htmlFor="extended" className="ml-2 text-sm">Extended Warranty (1 year)</label>
                      </div>
                      <span className="text-sm">+$4.99</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <RadioGroupItem value="premium" id="premium" />
                        <label htmlFor="premium" className="ml-2 text-sm">Premium Protection (2 years)</label>
                      </div>
                      <span className="text-sm">+$9.99</span>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>
            
            {/* Delivery Options */}
            <div className="mt-6">
              <button 
                onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
                className="w-full flex items-center justify-between py-2 px-4 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">Delivery Options</span>
                </div>
                <ChevronRight className={`h-5 w-5 text-gray-400 transform transition-transform ${showDeliveryOptions ? 'rotate-90' : ''}`} />
              </button>
              
              {showDeliveryOptions && (
                <div className="mt-2 border border-gray-200 rounded-md p-3 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <input 
                        type="radio"
                        id="standard"
                        name="delivery"
                        checked={!isExpressSelected}
                        onChange={() => setIsExpressSelected(false)}
                        className="h-4 w-4 text-red-600"
                      />
                      <label htmlFor="standard" className="ml-2 text-sm">
                        Standard Delivery (3-5 days)
                      </label>
                    </div>
                    <span className="text-sm font-medium text-green-600">FREE</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="radio"
                        id="express"
                        name="delivery"
                        checked={isExpressSelected}
                        onChange={() => setIsExpressSelected(true)}
                        className="h-4 w-4 text-red-600"
                      />
                      <label htmlFor="express" className="ml-2 text-sm">
                        Express Delivery (1-2 days)
                      </label>
                    </div>
                    <span className="text-sm">+$5.99</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Gift className="h-4 w-4 mr-2 text-pink-500" />
                      <span className="text-sm">Add Gift Wrapping</span>
                    </div>
                    <Switch
                      checked={giftWrap}
                      onCheckedChange={setGiftWrap}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Payment Options */}
            <div className="mt-6">
              <button 
                onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                className="w-full flex items-center justify-between py-2 px-4 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">Payment Options</span>
                </div>
                <ChevronRight className={`h-5 w-5 text-gray-400 transform transition-transform ${showPaymentOptions ? 'rotate-90' : ''}`} />
              </button>
              
              {showPaymentOptions && (
                <div className="mt-2 border border-gray-200 rounded-md p-3 bg-white">
                  <div className="flex items-center mb-2">
                    <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Pay in full: {calculateTotalPrice()}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Percent className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Pay in 4 interest-free installments of ${(parseFloat(calculateTotalPrice().substring(1)) / 4).toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="border-red-500 text-red-500 hover:bg-red-50"
                onClick={handleToggleFavorite}
              >
                <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'fill-red-500' : ''}`} />
                {isFavorite ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </Button>
              
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white relative overflow-hidden"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
                
                {showCartAnimation && (
                  <span className="absolute inset-0 bg-white/30 animate-pulse"></span>
                )}
              </Button>
            </div>
            
            {/* Shipping & Returns */}
            <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex items-center justify-center flex-1 py-2 px-4 border border-gray-200 rounded-md bg-gray-50">
                <Truck className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-xs">Free Shipping</span>
              </div>
              
              <div className="flex items-center justify-center flex-1 py-2 px-4 border border-gray-200 rounded-md bg-gray-50">
                <Shield className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-xs">Quality Guarantee</span>
              </div>
              
              <div className="flex items-center justify-center flex-1 py-2 px-4 border border-gray-200 rounded-md bg-gray-50">
                <ArrowLeft className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-xs">30-Day Returns</span>
              </div>
            </div>
            
            {/* Key Features */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Key Features:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  16.7 million vibrant colors
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  10 projection modes
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Remote and app control
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Bluetooth speaker functionality
                </li>
                
                {showMoreFeatures ? (
                  <>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Timer and sleep functions
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Rechargeable battery
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Music reactive modes
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      360° rotation stand
                    </li>
                  </>
                ) : (
                  <li className="col-span-2">
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-blue-600 text-sm"
                      onClick={() => setShowMoreFeatures(true)}
                    >
                      Show more features
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-8" ref={tabsRef}>
          <ProductTabs 
            product={product} 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isScrolled={isScrolled}
          />
        </div>
      </div>
      
      {/* Fixed Mobile Add to Cart */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20 p-3 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">Total:</span>
            <div className="text-xl font-bold text-red-600">{calculateTotalPrice()}</div>
          </div>
          <Button 
            className="bg-red-500 hover:bg-red-600 text-white w-2/3"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      )}
      
      {/* Floating Elements */}
      <LiveActivityNotifications />
      <LivePurchaseBanner productName={product.name} />
    </div>
  );
};

export default ProductDetail;
