import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Interface for the ProductTabs component props
interface ProductTabsProps {
  product: any;
  activeTab: string;
  setActiveTab: (value: string) => void;
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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList 
        className={`w-full h-10 justify-between px-0 ${isScrolled ? 'top-[--header-height]' : ''}`}
        stickyOnScroll={true}
        hideOnScrollUp={hideOnScrollUp}
      >
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
        <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          About this item
        </h2>
        <div className="grid gap-6">
          <p>{product.description}</p>
          <ul className="list-disc pl-5">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </TabsContent>
      
      <TabsContent value="specifications" className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Technical Specifications
        </h2>
        <div className="grid gap-6">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:max-w-none">
            {product.specs.map((spec, index) => (
              <div key={index} className="flex flex-col">
                <dt className="order-none text-sm font-semibold leading-6 text-gray-900">
                  {spec.name}
                </dt>
                <dd className="order-first mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </TabsContent>
      
      <TabsContent value="reviews" className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Customer Reviews
        </h2>
        <div className="grid gap-6">
          <p>No reviews yet.</p>
        </div>
      </TabsContent>
      
      <TabsContent value="shipping" className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Shipping and Returns
        </h2>
        <div className="grid gap-6">
          <p>
            Get it by Tomorrow, June 15th when you order within the next 12 hours and 42 minutes.
          </p>
          <p>
            Enjoy free shipping on orders over $25. See details.
          </p>
          <p>
            Free 30 day returns. See details.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
