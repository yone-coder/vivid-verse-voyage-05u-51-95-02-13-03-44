
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductImageGallery from "@/components/ProductImageGallery";
import StickyBuyButton from "@/components/StickyBuyButton";
import { useProduct, useProductAnalytics } from "@/hooks/useProduct";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Heart, RotateCcw } from "lucide-react";
import { useVariantStockDecay } from "@/hooks/useVariantStockDecay";
import { Button } from "@/components/ui/button";

// Product Components
import DynamicPriceDisplay from "@/components/product/DynamicPriceDisplay";
import EnhancedRating from "@/components/product/EnhancedRating";
import LimitedOffersBand from "@/components/product/LimitedOffersBand";
import ProductColorVariants from "@/components/product/ProductColorVariants";
import ProductQuantitySelector from "@/components/product/ProductQuantitySelector";
import ProductShipping from "@/components/product/ProductShipping";
import ProductWarranty from "@/components/product/ProductWarranty";
import ProductPaymentOptions from "@/components/product/ProductPaymentOptions";
import ProductStockIndicator from "@/components/product/ProductStockIndicator";
import ProductReviews from "@/components/product/ProductReviews";
import FrequentlyBoughtTogether from "@/components/product/FrequentlyBoughtTogether";
import ProductVariantImageSelector from "@/components/product/ProductVariantImageSelector";
import ShareToSocial from "@/components/product/ShareToSocial";
import ModernBuyButton from "@/components/ModernBuyButton";

// Default product ID for the premium headphones product
const DEFAULT_PRODUCT_ID = "aae97882-a3a1-4db5-b4f5-156705cd10ee"; // Premium Headphones product ID

const ProductDetail = () => {
  // State variables
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVariants, setShowVariants] = useState(true);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [isExpressSelected, setIsExpressSelected] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState("none");
  const [maxQuantityReached, setMaxQuantityReached] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [showLiveData, setShowLiveData] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLimitedOffersBand, setShowLimitedOffersBand] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showModernUI, setShowModernUI] = useState(false);

  // Refs and hooks
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { id: paramId } = useParams<{ id: string }>();

  // Use either the ID from URL params or the default product ID
  const productId = paramId || DEFAULT_PRODUCT_ID;

  // Use real product data from Supabase
  const { data: product, isLoading } = useProduct(productId);
  const { data: analytics, isLoading: analyticsLoading } = useProductAnalytics(productId);

  // Define our specific color variants with additional properties
  const colorPrices = {
    "Black": 79.99,
    "White": 89.99,
    "Jet Black": 89.99,
    "Blue": 219.99,
    "Red": 229.99
  };
  
  const colorVariants = [
    { name: "Black", price: colorPrices.Black, stock: 48, image: "", bestseller: true },
    { name: "White", price: colorPrices.White, stock: 124, image: "", bestseller: false },
    { name: "Jet Black", price: colorPrices["Jet Black"], stock: 78, image: "", bestseller: false },
    { name: "Blue", price: colorPrices.Blue, stock: 42, image: "", bestseller: false },
    { name: "Red", price: colorPrices.Red, stock: 16, image: "", bestseller: false, limited: true }
  ];

  // Enhanced variant images for the image selector
  const variantImages = [
    { name: "Black", price: colorPrices.Black, stock: 48, image: "/placeholder.svg", color: "#222222" },
    { name: "White", price: colorPrices.White, stock: 124, image: "/placeholder.svg", color: "#FFFFFF" },
    { name: "Jet Black", price: colorPrices["Jet Black"], stock: 78, image: "/placeholder.svg", color: "#111111" },
    { name: "Blue", price: colorPrices.Blue, stock: 42, image: "/placeholder.svg", color: "#1a73e8" },
    { name: "Red", price: colorPrices.Red, stock: 16, image: "/placeholder.svg", color: "#ea4335" }
  ];
  
  // Use our stock decay hook with 12-hour decay period and localStorage persistence
  const { variantStockInfo, activateVariant, getTimeRemaining, resetVariant, resetAllVariants } = useVariantStockDecay({
    variants: colorVariants,
    decayPeriod: 12 * 60 * 60 * 1000 // 12 hours in milliseconds
  });

  // Effect to activate the selected variant for real-time stock decay
  useEffect(() => {
    if (selectedColor && activateVariant) {
      activateVariant(selectedColor);
    }
  }, [selectedColor, activateVariant]);

  // Event handlers
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || "Product",
        text: `Check out this ${product?.name || "product"}!`,
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
      description: `${quantity} x ${product?.name || "Product"} (${selectedColor}) added to your cart`,
    });
  };

  const buyNow = () => {
    toast({
      title: "Proceeding to checkout",
      description: `Processing order for ${quantity} x ${product?.name || "Product"} (${selectedColor})`,
    });
  };

  const handleCartClick = () => {
    toast({
      title: "Cart",
      description: "Opening your shopping cart",
    });
  };

  // Handler to manually reset stock levels (for demo purposes)
  const handleResetStock = () => {
    resetAllVariants();
    toast({
      title: "Stock Reset",
      description: "All product variants stock has been reset to initial values",
    });
  };

  // Toggle between modern and classic UI
  const toggleUI = () => {
    setShowModernUI(!showModernUI);
    toast({
      title: `Switched to ${!showModernUI ? 'Modern' : 'Classic'} UI`,
      description: `Now showing the ${!showModernUI ? 'modern' : 'classic'} buy button experience`,
    });
  };

  // Show loading state while product data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }
  
  // Format product data for display
  const productImages = product?.product_images?.map(img => img.src) || [];
  const currentPrice = product?.discount_price || product?.price || 0;
  const originalPrice = product?.price || 0;
  
  // Mock data for tabs with updated variants for color
  const productForTabs = {
    id: product.id,
    name: product.name,
    price: product.price,
    discountPrice: product.discount_price,
    rating: 4.8,
    reviewCount: 2543,
    sold: 5000,
    description: product.description,
    images: productImages,
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
      { name: "Black", price: currentPrice, stock: 48, image: productImages[0] || "/placeholder.svg" },
      { name: "White", price: currentPrice, stock: 124, image: productImages[1] || "/placeholder.svg" },
      { name: "Jet Black", price: currentPrice + 10, stock: 78, image: productImages[2] || "/placeholder.svg" },
      { name: "Blue", price: currentPrice + 20, stock: 42, image: productImages[0] || "/placeholder.svg" },
      { name: "Red", price: currentPrice + 30, stock: 16, image: productImages[1] || "/placeholder.svg" }
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
  
  // Get the currently selected variant
  const selectedVariant = colorVariants.find((v) => v.name === selectedColor);
  const selectedVariantStockInfo = selectedColor ? variantStockInfo[selectedColor] : undefined;
  
  const currentVariant = productForTabs.variants.find(v => v.name === selectedColor);
  const currentStock = selectedVariantStockInfo?.currentStock !== undefined 
    ? Math.floor(selectedVariantStockInfo.currentStock)
    : (currentVariant ? currentVariant.stock : 0);
  
  const warrantyOption = productForTabs.warranty.find(w => w.name.toLowerCase() === selectedWarranty);
  const warrantyPrice = warrantyOption ? warrantyOption.price : 0;
  
  const totalPrice = (currentPrice * quantity) + warrantyPrice + (isExpressSelected ? productForTabs.shipping.express : 0);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Mode switcher button */}
      <div className="fixed top-4 right-4 z-50">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleUI}
          className="bg-white shadow-md"
        >
          {showModernUI ? 'Classic UI' : 'Modern UI'}
        </Button>
      </div>
      
      {/* Limited Offers Band */}
      {showLimitedOffersBand && <LimitedOffersBand />}
      
      {/* Gallery Section */}
      <div className="relative w-full bg-transparent">
        <ProductImageGallery images={productImages.length > 0 ? productImages : ["/placeholder.svg"]} />
      </div>
      
      <div className="flex-1">
        <div className="bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between mb-0.5">
            {/* Badges section removed */}
          </div>
          
          {/* Product title now appears before price with like count */}
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium">{product?.name}</h1>
            <div className="flex items-center">
              <ShareToSocial 
                productName={product.name}
                productImage={productImages[0] || "/placeholder.svg"}
              />
            </div>
          </div>
          
          {/* Stock indicator */}
          <ProductStockIndicator stock={currentStock} />
          
          <div className="flex items-center justify-between mt-3">
            <DynamicPriceDisplay selectedColor={selectedColor} />
          </div>
          
          <EnhancedRating />
          
          <div className="mt-4">
            <ProductVariantImageSelector 
              variants={variantImages}
              selectedVariant={selectedColor}
              onVariantChange={setSelectedColor}
            />
          </div>
        </div>
        
        <div className="mt-2 p-3 bg-white shadow-sm">
          <div className="mt-2">
            <ProductQuantitySelector 
              quantity={quantity}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
              price={currentPrice}
              maxQuantity={10}
              minQuantity={1}
              inStock={currentStock}
              productName={product.name}
              stockInfo={selectedVariantStockInfo}
            />
          </div>
          
          <div className="mt-3">
            <ProductShipping
              shippingInfo={productForTabs.shipping}
              isExpressSelected={isExpressSelected}
              onExpressChange={setIsExpressSelected}
            />
          </div>
          
          <div className="mt-3">
            <ProductWarranty
              warrantyOptions={productForTabs.warranty}
              selectedWarranty={selectedWarranty}
              onWarrantyChange={setSelectedWarranty}
            />
          </div>
          
          <div className="mt-3">
            <ProductPaymentOptions paymentOptions={productForTabs.payments} />
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={addToCart}
            >
              Add to Cart
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500"
              onClick={buyNow}
            >
              Buy Now
            </Button>
          </div>
        </div>
        
        {/* Frequently Bought Together Section */}
        <FrequentlyBoughtTogether
          mainProductId={product.id}
          mainProductName={product.name}
          mainProductImage={productImages[0] || "/placeholder.svg"}
          mainProductPrice={colorPrices[selectedColor] || colorPrices.Black}
        />
        
        {/* Reviews Section */}
        <ProductReviews productId={product.id} />
      </div>
      
      {/* Conditional rendering of buy button based on selected UI */}
      {showModernUI ? (
        <ModernBuyButton productId={product.id} />
      ) : (
        <StickyBuyButton 
          selectedColor={selectedColor}
          colorPrices={colorPrices}
        />
      )}
    </div>
  );
};

export default ProductDetail;
