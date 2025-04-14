
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductDescription from "@/components/product/ProductDescription";
import ProductSpecs from "@/components/product/ProductSpecs";
import ProductReviews from "@/components/product/ProductReviews";

interface ProductTabsProps {
  product: {
    description: string;
    specs: Array<{ name: string; value: string }>;
    rating: number;
    reviewCount: number;
  };
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled?: boolean;
  headerHeight?: number;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ 
  product, 
  activeTab, 
  setActiveTab, 
  isScrolled = false, 
  headerHeight = 0 
}) => {
  return (
    <div 
      className={`bg-white sticky z-20 ${
        isScrolled ? `top-[${headerHeight}px]` : 'top-0'
      }`}
    >
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specs">Specs</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description">
          <ProductDescription description={product.description} />
        </TabsContent>
        
        <TabsContent value="specs">
          <ProductSpecs specs={product.specs} />
        </TabsContent>
        
        <TabsContent value="reviews">
          <ProductReviews 
            rating={product.rating} 
            reviewCount={product.reviewCount} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
