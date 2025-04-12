
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Define props interface
export interface ProductTabsProps {
  product: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled?: boolean;
  headerHeight?: number;
  hideOnScrollUp?: boolean;
}

// Placeholder components for tab content
const ProductDescription = ({ product }: { product: any }) => (
  <div>
    <h3 className="text-lg font-medium mb-2">Product Description</h3>
    <p className="text-gray-700">{product.description || "No description available"}</p>
    {product.features && product.features.length > 0 && (
      <div className="mt-4">
        <h4 className="font-medium mb-2">Features</h4>
        <ul className="list-disc pl-5 space-y-1">
          {product.features.map((feature: string, index: number) => (
            <li key={index} className="text-gray-700">{feature}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const ProductSpecifications = ({ specs }: { specs: any[] }) => (
  <div>
    <h3 className="text-lg font-medium mb-2">Specifications</h3>
    {specs && specs.length > 0 ? (
      <div className="grid grid-cols-1 gap-2">
        {specs.map((spec, index) => (
          <div key={index} className="grid grid-cols-2 border-b border-gray-200 py-2">
            <div className="text-gray-600 font-medium">{spec.name}</div>
            <div className="text-gray-800">{spec.value}</div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No specifications available</p>
    )}
  </div>
);

const ReviewsTab = ({ product }: { product: any }) => (
  <div>
    <h3 className="text-lg font-medium mb-2">Customer Reviews</h3>
    <div className="bg-gray-50 p-4 rounded-md text-center">
      <p className="text-gray-500">No reviews available for this product yet.</p>
      <button className="mt-2 text-blue-500 font-medium">Be the first to review</button>
    </div>
  </div>
);

const ShippingInfoTab = ({ shipping }: { shipping: any }) => (
  <div>
    <h3 className="text-lg font-medium mb-3">Shipping Information</h3>
    <div className="space-y-3">
      <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="text-gray-600">Standard Shipping:</span>
        <span className="font-medium">{shipping?.free ? "Free" : "$4.99"}</span>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="text-gray-600">Estimated Delivery:</span>
        <span className="font-medium">{shipping?.estimated || "7-14 days"}</span>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="text-gray-600">Express Shipping:</span>
        <span className="font-medium">${shipping?.express || "9.99"}</span>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="text-gray-600">Express Delivery:</span>
        <span className="font-medium">{shipping?.expressEstimated || "2-3 days"}</span>
      </div>
      <div className="flex justify-between py-2">
        <span className="text-gray-600">Return Policy:</span>
        <span className="font-medium">{shipping?.returns || "30-day free returns"}</span>
      </div>
    </div>
  </div>
);

const UGCTab = ({ product }: { product: any }) => (
  <div>
    <h3 className="text-lg font-medium mb-3">Customer Media</h3>
    <div className="bg-gray-50 p-4 rounded-md text-center">
      <p className="text-gray-500">No customer photos or videos yet.</p>
      <button className="mt-2 text-blue-500 font-medium">Share your experience</button>
    </div>
    <div className="mt-4">
      <h4 className="font-medium mb-2">Unboxing Videos</h4>
      <div className="grid grid-cols-1 gap-4">
        {/* Placeholder for videos */}
        <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center">
          <p className="text-gray-500">No videos available</p>
        </div>
      </div>
    </div>
  </div>
);

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
