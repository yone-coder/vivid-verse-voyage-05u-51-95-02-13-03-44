
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductTabs from "@/components/ProductTabs";
import ModernBuyButton from "@/components/ModernBuyButton";
import LiveStockUpdates from "@/components/LiveStockUpdates";
import LivePurchaseBanner from "@/components/LivePurchaseBanner";
import LiveActivityNotifications from '@/components/LiveActivityNotifications';
import { useProduct } from "@/hooks/useProduct";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Share2, Heart } from "lucide-react";
import { useParams } from "react-router-dom";
import TabsNavigation from "@/components/product/TabsNavigation";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id || '');
  
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  
  const headerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const updateHeaderState = () => {
      if (headerRef.current) {
        const scrollY = window.scrollY;
        const headerHeight = headerRef.current.offsetHeight;
        
        setIsHeaderScrolled(scrollY > headerHeight * 0.5);
        setHeaderHeight(headerHeight);
      }
    };
    
    window.addEventListener('scroll', updateHeaderState);
    updateHeaderState();
    
    return () => {
      window.removeEventListener('scroll', updateHeaderState);
    };
  }, []);
  
  if (isLoading) {
    return <div className="p-8 flex justify-center">Loading product details...</div>;
  }
  
  if (error || !product) {
    return <div className="p-8 text-red-500">Error loading product details</div>;
  }
  
  return (
    <div className="pb-24">
      <LivePurchaseBanner productName={product.name} />
      <LiveActivityNotifications />
      
      <div ref={headerRef} className="relative bg-white">
        <motion.div 
          className={`sticky top-0 z-30 bg-white transition-all duration-300 ${isHeaderScrolled ? 'shadow-md' : ''}`}
          layout
        >
          <div className={`px-4 py-3 transition-all duration-300 ${isHeaderScrolled ? 'py-2' : ''}`}>
            <div className="flex items-center justify-between">
              <div className={`transition-all duration-300 ${isHeaderScrolled ? 'w-3/4' : 'w-full'}`}>
                <h1 className={`font-bold transition-all duration-300 ${isHeaderScrolled ? 'text-lg' : 'text-xl'} line-clamp-1`}>
                  {product.name}
                </h1>
                
                {!isHeaderScrolled && (
                  <>
                    <div className="flex items-center text-sm mt-0.5">
                      <div className="flex items-center">
                        <div className="text-amber-400 flex">
                          {'★'.repeat(Math.floor(product.rating))}
                          {product.rating % 1 !== 0 && '☆'}
                          {'☆'.repeat(5 - Math.ceil(product.rating))}
                        </div>
                        <span className="ml-1 text-gray-600">{product.rating}</span>
                      </div>
                      <div className="mx-2 text-gray-300">|</div>
                      <span className="text-blue-600">{product.reviewCount} Reviews</span>
                      <div className="mx-2 text-gray-300">|</div>
                      <span className="text-orange-600">{product.sold}+ Sold</span>
                    </div>
                    
                    <div className="flex items-center mt-1.5">
                      <span className="text-xl font-bold text-red-500">${product.discountPrice.toFixed(2)}</span>
                      <span className="ml-2 text-gray-500 line-through">${product.price.toFixed(2)}</span>
                      <Badge variant="outline" className="ml-2 bg-red-50 text-red-500 border-red-200">
                        {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                      </Badge>
                    </div>
                  </>
                )}
              </div>
              
              {isHeaderScrolled && (
                <div className="flex items-center">
                  <div className="mr-3 text-lg font-bold text-red-500">
                    ${product.discountPrice.toFixed(2)}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <TabsNavigation 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isScrolled={isHeaderScrolled} 
          />
        </motion.div>
        
        <ProductImageGallery images={product.images} />
        
        <div className="px-4 my-3">
          <LiveStockUpdates initialStock={82} highDemand={true} />
        </div>
      </div>
      
      <div className="bg-gray-50 min-h-screen">
        <ProductTabs 
          product={product} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isScrolled={isHeaderScrolled}
          headerHeight={headerHeight}
        />
      </div>
      
      <ModernBuyButton productId={id} />
    </div>
  );
};

export default ProductDetail;
