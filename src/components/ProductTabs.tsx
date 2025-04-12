
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductDescription from "./product/ProductDescription";
import ProductSpecifications from "./product/ProductSpecifications";
import ReviewsTab from "./product/ReviewsTab";
import ShippingInfoTab from "./product/ShippingInfoTab";
import UGCTab from "./product/UGCTab";

// Define props interface
export interface ProductTabsProps {
  product: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled?: boolean;
  headerHeight?: number;
  hideOnScrollUp?: boolean;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ 
  product, 
  activeTab, 
  setActiveTab,
  isScrolled = false,
  headerHeight = 0,
  hideOnScrollUp = false
}) => {
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList 
        className={`w-full h-10 justify-between px-0 ${isScrolled ? 'top-[--header-height]' : ''}`}
        stickyOnScroll={true}
        hideOnScrollUp={hideOnScrollUp}
      >
        <TabsTrigger 
          value="description" 
          className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none data-[state=active]:shadow-none text-xs"
        >
          Description
        </TabsTrigger>
        <TabsTrigger 
          value="specs" 
          className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none data-[state=active]:shadow-none text-xs"
        >
          Specifications
        </TabsTrigger>
        <TabsTrigger 
          value="reviews" 
          className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none data-[state=active]:shadow-none text-xs"
        >
          Reviews
        </TabsTrigger>
        <TabsTrigger 
          value="shipping" 
          className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none data-[state=active]:shadow-none text-xs"
        >
          Shipping
        </TabsTrigger>
        <TabsTrigger 
          value="ugc" 
          className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none data-[state=active]:shadow-none text-xs"
        >
          Media
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="p-4 pt-3">
        <ProductDescription product={product} />
      </TabsContent>
      
      <TabsContent value="specs" className="p-4 pt-3">
        <ProductSpecifications specs={product.specs} />
      </TabsContent>
      
      <TabsContent value="reviews" className="p-4 pt-3">
        <ReviewsTab product={product} />
      </TabsContent>
      
      <TabsContent value="shipping" className="p-4 pt-3">
        <ShippingInfoTab shipping={product.shipping} />
      </TabsContent>
      
      <TabsContent value="ugc" className="p-4 pt-3">
        <UGCTab product={product} />
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
