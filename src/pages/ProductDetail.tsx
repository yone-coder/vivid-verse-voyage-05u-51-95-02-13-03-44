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
  
  const selectedVariant = colorVariants.find((v) => v.name === selectedColor);
  const selectedVariantStockInfo = selectedColor ? variantStockInfo[selectedColor] : undefined;
  
  const currentVariant = colorVariants.find(v => v.name === selectedColor);
  const currentStock = selectedVariantStockInfo?.currentStock !== undefined 
    ? Math.floor(selectedVariantStockInfo.currentStock)
    : (currentVariant ? currentVariant.stock : 0);
  
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
            onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
            price={currentPrice}
            maxQuantity={10}
            minQuantity={1}
            inStock={selectedColor ? variantStockInfo[selectedColor]?.currentStock : 0}
            productName={product?.name}
            stockInfo={selectedColor ? variantStockInfo[selectedColor] : undefined}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
          />
          
          <div className="w-full px-2 py-0.5 border-b border-gray-100">
            <ShippingOptionsComponent />
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
