import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Share, Heart, ShoppingCart, MessageCircle, Truck, Shield, Award, Percent, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductTabs from "@/components/ProductTabs";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [isScrolled, setIsScrolled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVariants, setShowVariants] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Blue Galaxy");
  const headerRef = useRef<HTMLDivElement>(null);
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
    ],
    variants: [
      { name: "Blue Galaxy", price: 24.99, stock: 256 },
      { name: "Aurora Borealis", price: 27.99, stock: 124 },
      { name: "Cosmic Universe", price: 29.99, stock: 78 },
      { name: "Starry Night", price: 24.99, stock: 216 },
    ],
    shipping: {
      free: true,
      express: 4.99,
      estimated: "7-14 days",
      returns: "30-day free returns"
    },
    coupons: [
      { code: "GALAXY10", discount: "10% off" },
      { code: "NEWUSER5", discount: "$5 off for new users" }
    ]
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom;
        setIsScrolled(headerBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };

  const buyNow = () => {
    toast({
      title: "Proceeding to checkout",
      description: `Processing order for ${quantity} x ${product.name}`,
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
      description: "A form would open to ask the seller a question",
    });
  };

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
          <div className="flex items-center mb-1">
            <Badge variant="outline" className="text-xs bg-red-50 text-red-500 border-red-200">Flash Deal</Badge>
            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-500 border-orange-200 ml-2">Top Seller</Badge>
          </div>
          
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-red-500">${product.discountPrice}</span>
            <span className="ml-2 text-sm line-through text-gray-500">${product.price}</span>
            <span className="ml-2 text-xs px-1.5 py-0.5 bg-red-100 text-red-500 rounded">
              {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
            </span>
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
          
          <div className="mt-3 bg-red-50 p-2.5 rounded-md">
            <div className="text-sm font-medium text-gray-700 mb-1.5">Available Coupons:</div>
            <div className="flex flex-wrap gap-2">
              {product.coupons.map((coupon, index) => (
                <div 
                  key={index} 
                  className="flex items-center overflow-hidden rounded border border-red-300"
                  onClick={() => applyCoupon(coupon.code)}
                >
                  <div className="bg-red-500 text-white px-2 py-1 text-xs font-medium">
                    {coupon.code}
                  </div>
                  <div className="px-2 py-1 text-xs text-red-600 bg-white">
                    {coupon.discount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center text-sm">
            <Truck className="h-4 w-4 text-gray-600 mr-2" />
            <div>
              <span className="text-gray-700">Shipping: </span>
              <span className="font-medium">{product.shipping.free ? "Free Shipping" : `$${product.shipping.express}`}</span>
              <span className="text-gray-500 ml-2">{product.shipping.estimated}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm mt-1.5">
            <Shield className="h-4 w-4 text-gray-600 mr-2" />
            <div>
              <span className="text-gray-700">Buyer Protection: </span>
              <span className="text-blue-500">{product.shipping.returns}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 mb-2">
          <div 
            className="flex justify-between items-center"
            onClick={toggleVariants}
          >
            <div className="text-sm text-gray-700">
              <span>Variant: </span>
              <span className="font-medium">{selectedColor}</span>
            </div>
            <div className="text-xs text-gray-500">
              {showVariants ? "Hide Options" : "View All Options"} ▼
            </div>
          </div>
          
          {showVariants && (
            <div className="mt-3">
              <div className="text-sm font-medium mb-2">Color:</div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <div 
                    key={variant.name}
                    className={`border rounded-md px-3 py-1.5 text-sm ${selectedColor === variant.name ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-700'}`}
                    onClick={() => setSelectedColor(variant.name)}
                  >
                    {variant.name}
                  </div>
                ))}
              </div>
              
              <div className="text-sm font-medium mt-3 mb-2">Quantity:</div>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-l-md rounded-r-none"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <span className="text-lg">-</span>
                </Button>
                <div className="h-8 px-4 flex items-center justify-center border-t border-b border-gray-300">
                  {quantity}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-r-md rounded-l-none"
                  onClick={incrementQuantity}
                  disabled={quantity >= 10}
                >
                  <span className="text-lg">+</span>
                </Button>
                <div className="ml-3 text-sm text-gray-500">
                  {product.variants.find(v => v.name === selectedColor)?.stock || 0} available
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white p-4 mb-2">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
            <div className="flex-1">
              <div className="font-medium">Cosmic Light Store</div>
              <div className="text-xs text-gray-500 mt-0.5">Official Store • 4+ Years</div>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs border-red-500 text-red-500 hover:bg-red-50">
              View Store
            </Button>
          </div>
          
          <div className="flex justify-between mt-3 text-center">
            <div className="flex-1">
              <div className="text-red-500 font-medium">97.8%</div>
              <div className="text-xs text-gray-500">Positive Feedback</div>
            </div>
            <Separator orientation="vertical" className="mx-2" />
            <div className="flex-1">
              <div className="font-medium">2.5h</div>
              <div className="text-xs text-gray-500">Response Time</div>
            </div>
            <Separator orientation="vertical" className="mx-2" />
            <div className="flex-1">
              <div className="font-medium">356</div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 mb-2">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium">Frequently Bought Together</div>
            <div className="text-xs text-red-500">Save 15%</div>
          </div>
          <div className="flex overflow-x-auto pb-2 gap-2">
            <div className="flex-shrink-0 w-20">
              <img src="/placeholder.svg" alt="Current product" className="w-full h-20 object-cover rounded-md" />
              <div className="text-xs text-center mt-1 truncate">{product.name}</div>
            </div>
            <div className="flex items-center text-gray-400">+</div>
            <div className="flex-shrink-0 w-20">
              <img src="/placeholder.svg" alt="Bluetooth speaker" className="w-full h-20 object-cover rounded-md" />
              <div className="text-xs text-center mt-1 truncate">Bluetooth Speaker</div>
            </div>
            <div className="flex items-center text-gray-400">+</div>
            <div className="flex-shrink-0 w-20">
              <img src="/placeholder.svg" alt="LED strip" className="w-full h-20 object-cover rounded-md" />
              <div className="text-xs text-center mt-1 truncate">LED Light Strip</div>
            </div>
          </div>
          <Button className="w-full mt-2 bg-red-50 text-red-500 hover:bg-red-100 border border-red-200">
            Add Bundle to Cart • $49.99
          </Button>
        </div>
        
        <div className="bg-white p-4 mb-2 flex justify-between text-xs text-gray-500">
          <div className="flex flex-col items-center">
            <Shield className="h-5 w-5 mb-1 text-gray-700" />
            <span>Authentic</span>
          </div>
          <div className="flex flex-col items-center">
            <Award className="h-5 w-5 mb-1 text-gray-700" />
            <span>Top Quality</span>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="h-5 w-5 mb-1 text-gray-700" />
            <span>Fast Shipping</span>
          </div>
          <div className="flex flex-col items-center">
            <Percent className="h-5 w-5 mb-1 text-gray-700" />
            <span>Best Price</span>
          </div>
        </div>
        
        <div className="bg-white p-4 mb-2 flex justify-between">
          <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-2 flex-1" onClick={askQuestion}>
            <MessageCircle className="h-5 w-5 mb-1" />
            <span className="text-xs">Ask Question</span>
          </Button>
          <Separator orientation="vertical" />
          <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-2 flex-1" onClick={toggleFavorite}>
            <Heart className={`h-5 w-5 mb-1 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            <span className="text-xs">Wishlist</span>
          </Button>
          <Separator orientation="vertical" />
          <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-2 flex-1" onClick={() => toast({ title: "Ratings breakdown" })}>
            <ThumbsUp className="h-5 w-5 mb-1" />
            <span className="text-xs">Ratings</span>
          </Button>
        </div>
        
        <ProductTabs 
          product={product} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isScrolled={isScrolled}
        />
          
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex items-center z-20">
          <Button variant="ghost" size="sm" className="flex flex-col items-center h-16 mr-2 px-3" onClick={() => window.open('/cart', '_blank')}>
            <ShoppingCart className="h-6 w-6 mb-1" />
            <span className="text-xs">Cart</span>
          </Button>
          <div className="flex-1 flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-1 bg-white text-red-500 border-red-500 hover:bg-red-50"
              onClick={addToCart}
            >
              Add to Cart
            </Button>
            <Button 
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              onClick={buyNow}
            >
              Buy Now
            </Button>
          </div>
        </div>
        
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default ProductDetail;
