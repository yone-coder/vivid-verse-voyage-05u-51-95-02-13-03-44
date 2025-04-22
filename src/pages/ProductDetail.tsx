
import React, { useState, useEffect, useRef } from "react";
import ProductHeader from "@/components/product/ProductHeader";
import { useParams } from "react-router-dom";
import ProductImageGallery from "@/components/ProductImageGallery";
import StickyBuyButton from "@/components/StickyBuyButton";
import { useProduct, useProductAnalytics } from "@/hooks/useProduct";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Heart } from "lucide-react";
import { useVariantStockDecay } from "@/hooks/useVariantStockDecay";
import AliExpressTabs from "@/components/product/AliExpressTabs";
import CoreIdentity from "@/components/product/CoreIdentity";
import { Button } from "@/components/ui/button";
import ProductColorVariants from "@/components/product/ProductColorVariants";
import ProductQuantitySelector from "@/components/product/ProductQuantitySelector";
import ProductShipping from "@/components/product/ProductShipping";
import ProductWarranty from "@/components/product/ProductWarranty";
import ProductPaymentOptions from "@/components/product/ProductPaymentOptions";
import PricingSection from '@/components/product/PricingSection';
import StockIndicator from '@/components/product/StockIndicator';

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
  
  const warrantyOption = productForTabs.warranty.find(w => w.name.toLowerCase() === selectedWarranty);
  const warrantyPrice = warrantyOption ? warrantyOption.price : 0;
  
  const totalPrice = (currentPrice * quantity) + warrantyPrice + (isExpressSelected ? productForTabs.shipping.express : 0);
  
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
  
  const reviewsContent = (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-purple-700">{productForTabs.rating}</div>
            <div className="text-amber-400 flex mb-1">
              {'★'.repeat(Math.floor(productForTabs.rating))}
              {productForTabs.rating % 1 !== 0 && '☆'}
              {'☆'.repeat(5 - Math.ceil(productForTabs.rating))}
            </div>
            <div className="text-sm text-gray-500">{productForTabs.reviewCount} verified ratings</div>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <div className="space-y-4">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium mr-3">
                    {["JS", "AK"][index]}
                  </div>
                  <div>
                    <div className="font-medium">{["John S.", "Alyssa K."][index]}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(Date.now() - index * 5 * 86400000).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="flex items-center mb-1">
                    <div className="text-amber-400 text-sm">
                      {'★'.repeat(5 - Math.min(2, index))}
                      {'☆'.repeat(Math.min(2, index))}
                    </div>
                  </div>
                  
                  <p className="mt-1 text-sm text-gray-700">
                    {index === 0 && "This product exceeded my expectations! The colors are vibrant and realistic, truly creating an immersive experience. The remote makes it easy to change modes and the bluetooth speaker is an awesome bonus feature."}
                    {index === 1 && "The color is absolutely stunning. My only complaint is the battery life is about 4 hours instead of the advertised 6. Still a great purchase overall."}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="w-full py-2 mt-4 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">
            View All Reviews
          </Button>
        </div>
      </div>
    </div>
  );
  
  const shippingContent = (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Shipping Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Standard Shipping:</span>
            <span className="font-medium">{productForTabs.shipping.free ? 'Free' : '$4.99'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Delivery:</span>
            <span className="font-medium">{productForTabs.shipping.estimated}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Express Shipping:</span>
            <span className="font-medium">${productForTabs.shipping.express}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Express Delivery:</span>
            <span className="font-medium">{productForTabs.shipping.expressEstimated}</span>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium mb-2">Shipping Details</h3>
        <p className="text-sm text-gray-600 mb-4">
          We ship worldwide to over 200 countries and regions. Shipping methods, times, and costs vary based on your location and product selection.
        </p>
        <div className="text-sm space-y-1">
          <p><span className="font-medium">Processing Time:</span> 1-2 business days</p>
          <p><span className="font-medium">Tracking:</span> Available for all orders</p>
          <p><span className="font-medium">Customs:</span> May be subject to import duties</p>
        </div>
      </div>
    </div>
  );
  
  const returnPolicyContent = (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Return Policy</h3>
        <p className="text-sm text-gray-600">
          We offer {productForTabs.shipping.returns} on all eligible items.
        </p>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium mb-2">Return Process</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-2">1</div>
            <div className="text-sm">
              <p className="font-medium">Contact Customer Service</p>
              <p className="text-gray-600">Reach out to our customer service team to initiate a return.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-2">2</div>
            <div className="text-sm">
              <p className="font-medium">Package Your Item</p>
              <p className="text-gray-600">Securely pack the item in its original packaging if possible.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-2">3</div>
            <div className="text-sm">
              <p className="font-medium">Ship It Back</p>
              <p className="text-gray-600">Use the provided return label or follow the instructions.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-2">4</div>
            <div className="text-sm">
              <p className="font-medium">Receive Your Refund</p>
              <p className="text-gray-600">Refunds are processed within 7-14 days of receiving the return.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const qAndAContent = (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
        <p className="text-sm text-gray-600">Find answers to common questions about {product.name}.</p>
      </div>
      
      <div className="space-y-3">
        {[
          { question: "How long does the battery last?", answer: "The battery can last up to 6 hours on a single charge, depending on usage and settings." },
          { question: "Is this waterproof?", answer: "The product is IP65 rated, which means it's water-resistant but not fully waterproof. It can handle light splashes but should not be submerged." },
          { question: "Can I connect multiple devices?", answer: "Yes, you can connect up to 2 devices simultaneously via Bluetooth." },
          { question: "Is there a warranty?", answer: "Yes, we offer a standard 12-month warranty with options to extend." }
        ].map((qa, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-700 mb-1">{qa.question}</h4>
            <p className="text-sm text-gray-600">{qa.answer}</p>
          </div>
        ))}
      </div>
      
      <Button className="w-full py-2 mt-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">
        Ask a Question
      </Button>
    </div>
  );
  
  const recommendationsContent = (
    <div className="space-y-4">
      <h3 className="font-medium mb-2">Similar Products</h3>
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-2">
            <img 
              src={productImages[0] || "/placeholder.svg"} 
              alt={`Recommendation ${index + 1}`} 
              className="w-full h-32 object-cover rounded-md mb-2" 
            />
            <div className="text-sm font-medium line-clamp-2">Similar {product.name} Option {index + 1}</div>
            <div className="text-xs text-gray-500 mt-1">$49.99 - $89.99</div>
            <div className="text-xs text-amber-500 flex items-center mt-1">
              {'★'.repeat(5)}
              <span className="text-gray-500 ml-1">(124)</span>
            </div>
          </div>
        ))}
      </div>
      
      <Button className="w-full py-2 mt-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">
        View More
      </Button>
    </div>
  );
  
  const tabsConfig = [
    { id: 0, name: 'Description', content: descriptionContent },
    { id: 1, name: 'Specifications', content: specificationsContent },
    { id: 2, name: 'Reviews', content: reviewsContent },
    { id: 3, name: 'Q&As', content: qAndAContent },
    { id: 4, name: 'Shipping', content: shippingContent },
    { id: 5, name: 'Return Policy', content: returnPolicyContent },
    { id: 6, name: 'Recommendations', content: recommendationsContent },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-white" ref={contentRef}>
      <ProductHeader />
      {/* Remove the spacing div that was here */}
      <div className="relative w-full bg-transparent">
        <ProductImageGallery images={productImages.length > 0 ? productImages : ["/placeholder.svg"]} />
      </div>

      <div className="flex-1">
        <div className="bg-white">
          <CoreIdentity />
          <PricingSection />
          <ProductColorVariants />

          <div className="mt-1 mb-1 p-3 bg-white">
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

            <div className="mt-2">
              <ProductShipping
                shippingInfo={productForTabs.shipping}
                isExpressSelected={isExpressSelected}
                onExpressChange={setIsExpressSelected}
              />
            </div>

            <div className="mt-2">
              <ProductWarranty
                warrantyOptions={productForTabs.warranty}
                selectedWarranty={selectedWarranty}
                onWarrantyChange={setSelectedWarranty}
              />
            </div>

            <div className="mt-2">
              <ProductPaymentOptions paymentOptions={productForTabs.payments} />
            </div>

            <AliExpressTabs tabs={tabsConfig} initialTab={0} className="mt-4" />
          </div> {/* Close white box wrapper */}
        </div> {/* Close bg-white wrapper */}
      </div> {/* Close flex-1 */}

      <StickyBuyButton 
        selectedColor={selectedColor}
        colorPrices={colorPrices}
      />
    </div>
  );
};

export default ProductDetail;
