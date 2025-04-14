
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '@/hooks/useProduct';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductTabs from '@/components/ProductTabs';
import ModernBuyButton from '@/components/ModernBuyButton';
import LivePurchaseBanner from '@/components/LivePurchaseBanner';
import LiveActivityNotifications from '@/components/LiveActivityNotifications';
import LiveStockUpdates from '@/components/LiveStockUpdates';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import { useToast } from '@/hooks/use-toast';
import { Heart, Share2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { useVariantStockDecay } from '@/hooks/useVariantStockDecay';
import ProductColorVariants from '@/components/product/ProductColorVariants';
import EnhancedRating from '@/components/product/EnhancedRating';
import ProductActionsRow from '@/components/product/ProductActionsRow';
import AliExpressCoupons from '@/components/product/AliExpressCoupons';
import StickyBuyButton from '@/components/StickyBuyButton';
import DynamicPriceDisplay from '@/components/product/DynamicPriceDisplay';
import LimitedOffersBand from '@/components/product/LimitedOffersBand';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product } = useProduct(id || '');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeTab, setActiveTab] = useState('description');
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Define the color variants
  const colorVariants = [
    { name: "Black", stock: 48 },
    { name: "White", stock: 124 },
    { name: "Jet Black", stock: 78 }
  ];
  
  // Stock decay simulation - now properly passing variants parameter
  const { 
    variantStockInfo, 
    activateVariant, 
    getTimeRemaining 
  } = useVariantStockDecay({ 
    variants: colorVariants,
    demoMode: true
  });

  // Console log for debugging
  useEffect(() => {
    if (selectedColor) {
      console.info(`ProductDetail: Activating color variant: ${selectedColor}`);
    }
  }, [selectedColor]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.clientHeight);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: !isFavorite ? "Added to Wishlist" : "Removed from Wishlist",
      description: !isFavorite ? "This item has been added to your wishlist" : "This item has been removed from your wishlist",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'Check out this product',
        text: 'I found this amazing product I thought you might like!',
        url: window.location.href,
      }).catch((error) => {
        toast({
          title: "Sharing Failed",
          description: "There was an error sharing this content.",
        });
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Product link copied to clipboard!",
      });
    }
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product?.name} (${selectedColor}, Size ${selectedSize}) added to your cart`,
    });
  };

  if (!product) return null;

  // Extract image URLs from product.product_images
  const productImages = product.product_images 
    ? product.product_images.map(image => image.src)
    : [];
    
  // Define product specifications for the tabs component
  const productSpecs = [
    { name: "Dimensions", value: "12 x 8 x 4 inches" },
    { name: "Weight", value: "2.5 lbs" },
    { name: "Material", value: "High-grade plastic and aluminum" },
    { name: "Light Sources", value: "28 LED lights" },
    { name: "Color Spectrum", value: "16.7 million colors" },
    { name: "Power", value: "5W" },
    { name: "Battery Life", value: "Up to 6 hours" },
    { name: "Connectivity", value: "Bluetooth 5.0, WiFi" },
    { name: "Input", value: "USB-C, 5V/2A" },
    { name: "Package Contents", value: "Projector, Remote, USB Cable, Manual" },
    { name: "Warranty", value: "12 months" }
  ];

  return (
    <div className="pb-20">
      <Header 
        isProductHeader 
        isFavorite={isFavorite} 
        toggleFavorite={toggleFavorite} 
        handleShare={handleShare} 
      />
      
      <LimitedOffersBand />
      
      <div className="container mx-auto px-0 md:px-4 py-0 md:py-6 relative">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <ProductImageGallery images={productImages} />
          
          <div className="px-3 md:px-0">
            <h1 className="text-xl md:text-2xl font-bold mb-2">{product.name}</h1>
            
            <EnhancedRating />
            
            <DynamicPriceDisplay />
            
            <ProductColorVariants 
              variants={[
                { name: "Black", price: 199.99, stock: 48, image: "" },
                { name: "White", price: 199.99, stock: 124, image: "" },
                { name: "Jet Black", price: 209.99, stock: 78, image: "" },
                { name: "Blue", price: 219.99, stock: 42, image: "" },
                { name: "Red", price: 229.99, stock: 16, image: "" }
              ]}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              variantStockInfo={variantStockInfo}
              getTimeRemaining={getTimeRemaining}
              activateVariant={activateVariant}
            />
            
            <div className="px-3 py-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Size</span>
                <span className="text-xs text-blue-600">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-3 py-1 border rounded-md text-sm transition-all",
                      selectedSize === size 
                        ? "border-blue-500 bg-blue-50 text-blue-700" 
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="px-3 py-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Quantity</span>
              </div>
              <div className="flex items-center">
                <button 
                  className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <div className="w-12 h-8 border-t border-b border-gray-300 flex items-center justify-center">
                  {quantity}
                </div>
                <button 
                  className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <LiveStockUpdates initialStock={204} highDemand={true} />
            
            <div className="px-3 py-3 flex flex-col gap-2">
              <Button 
                className="w-full bg-red-500 hover:bg-red-600 text-white py-6"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={toggleFavorite}
                >
                  <Heart className={`mr-2 h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  Save
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>
            </div>
            
            <AliExpressCoupons />
          </div>
        </div>
        
        <ProductTabs 
          product={{
            name: product.name,
            description: product.description,
            price: product.price,
            discountPrice: product.discount_price || undefined,
            rating: 4.5,
            reviewCount: 128,
            sold: 1024,
            id: product.id,
            images: productImages,
            specs: productSpecs
          }} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isScrolled={isScrolled} 
          headerHeight={headerHeight} 
        />
      </div>
      
      <LivePurchaseBanner productName={product.name} />
      <LiveActivityNotifications />
      <ModernBuyButton productId={id} />
    </div>
  );
};

export default ProductDetail;
