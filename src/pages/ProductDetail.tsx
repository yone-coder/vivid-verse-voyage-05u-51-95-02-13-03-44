import React, { useState, useEffect, useRef } from "react";
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useParams } from "react-router-dom";
import { useProduct, useProductAnalytics } from "@/hooks/useProduct";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductHeader from "@/components/product/ProductHeader";
import ProductImageGallery from "@/components/ProductImageGallery";
import StickyBuyButton from "@/components/StickyBuyButton";
import { useVariantStockDecay } from "@/hooks/useVariantStockDecay";
import AliExpressTabs from "@/components/product/AliExpressTabs";
import CoreIdentity from "@/components/product/CoreIdentity";
import PricingSection from '@/components/product/PricingSection';
import ProductColorVariants from "@/components/product/ProductColorVariants";
import ProductQuantitySelector from "@/components/product/ProductQuantitySelector";
import ShippingOptionsComponent from '@/components/product/ShippingOptionsComponent';

const DEFAULT_PRODUCT_ID = "aae97882-a3a1-4db5-b4f5-156705cd10ee";

const ProductDetail = () => {
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
  const [expanded, setExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [headerHeight, setHeaderHeight] = useState(44);

  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { id: paramId } = useParams<{ id: string }>();
  const contentRef = useRef<HTMLDivElement>(null);

  const productId = paramId || DEFAULT_PRODUCT_ID;

  const { data: product, isLoading } = useProduct(productId);
  const { data: analytics, isLoading: analyticsLoading } = useProductAnalytics(productId);

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
  
  const { variantStockInfo, activateVariant, getTimeRemaining, resetVariant, resetAllVariants } = useVariantStockDecay({
    variants: colorVariants,
    decayPeriod: 12 * 60 * 60 * 1000
  });

  useEffect(() => {
    if (selectedColor && activateVariant) {
      activateVariant(selectedColor);
    }
  }, [selectedColor, activateVariant]);

  const triggerHaptic = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      console.log('Haptics not available');
    }
  };

  const incrementQuantity = async () => {
    if (quantity < 10) {
      await triggerHaptic();
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

  const decrementQuantity = async () => {
    if (quantity > 1) {
      await triggerHaptic();
      setQuantity(prev => prev - 1);
      if (maxQuantityReached) {
        setMaxQuantityReached(false);
      }
    }
  };

  const handleShare = async () => {
    await triggerHaptic();
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

  const toggleFavorite = async () => {
    await triggerHaptic();
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Item removed from your wishlist" : "Item added to your wishlist",
    });
  };

  const addToCart = async () => {
    await triggerHaptic();
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product?.name || "Product"} (${selectedColor}) added to your cart`,
    });
  };

  const buyNow = async () => {
    await triggerHaptic();
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

  const handleResetStock = () => {
    resetAllVariants();
    toast({
      title: "Stock Reset",
      description: "All product variants stock has been reset to initial values",
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    if (contentRef.current) {
      const section = document.getElementById(tab);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }
  
  const productImages = product?.product_images?.map(img => img.src) || [];
  const currentPrice = product?.discount_price || product?.price || 0;
  const originalPrice = product?.price || 0;
  
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
  
  const selectedVariant = colorVariants.find((v) => v.name === selectedColor);
  const selectedVariantStockInfo = selectedColor ? variantStockInfo[selectedColor] : undefined;
  
  const currentVariant = productForTabs.variants.find(v => v.name === selectedColor);
  const currentStock = selectedVariantStockInfo?.currentStock !== undefined 
    ? Math.floor(selectedVariantStockInfo.currentStock)
    : (currentVariant ? currentVariant.stock : 0);
  
  const descriptionContent = (
    <div className="text-sm text-gray-600">
      <p className="mb-4">{product.description}</p>
      
      {productForTabs.features.map((feature, index) => (
        <div key={index} className="flex items-start mb-2">
          <div className="h-2 w-2 rounded-full bg-purple-500 mt-1.5 mr-2"></div>
          <span>{feature}</span>
        </div>
      ))}
      
      {productImages.slice(0, 2).map((image, idx) => (
        <img 
          key={idx} 
          src={image || "/placeholder.svg"} 
          alt={`Product detail ${idx + 1}`} 
          className="w-full h-auto rounded-lg my-4" 
        />
      ))}
    </div>
  );
  
  const specificationsContent = (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="text-base font-medium text-blue-800 mb-1">Technical Specifications</h3>
        <p className="text-sm text-blue-700">Detailed specifications of {product.name}</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="divide-y">
          {productForTabs.specs.map((spec, index) => (
            <div key={index} className="py-2 px-4 flex hover:bg-gray-100 transition-colors">
              <span className="w-1/3 text-gray-500 text-sm">{spec.name}</span>
              <span className="w-2/3 font-medium text-sm">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const tabsConfig = [
    { id: 0, name: 'Description', content: descriptionContent },
    { id: 1, name: 'Specifications', content: specificationsContent },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-white overscroll-none" ref={contentRef}>
      <ProductHeader />
      <div className="relative w-full bg-transparent">
        <ProductImageGallery images={productImages.length > 0 ? productImages : ["/placeholder.svg"]} />
      </div>

      <div className="flex-1 overscroll-none">
        <div className="bg-white space-y-0">
          <CoreIdentity />
          
          <PricingSection />
          
          <ProductColorVariants />
          
          <ProductQuantitySelector 
            quantity={quantity}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
            price={currentPrice}
            maxQuantity={10}
            minQuantity={1}
            inStock={selectedColor ? variantStockInfo[selectedColor]?.currentStock : 0}
            productName={product?.name}
            stockInfo={selectedColor ? variantStockInfo[selectedColor] : undefined}
          />
          
          <div className="w-full px-2 py-0.5 border-b border-gray-100">
            <ShippingOptionsComponent />
          </div>
          
          <div className="px-2 py-0.5">
            <AliExpressTabs tabs={tabsConfig} initialTab={0} />
          </div>
        </div>
      </div>

      <StickyBuyButton 
        selectedColor={selectedColor}
        colorPrices={colorPrices}
      />
    </div>
  );
};

export default ProductDetail;
