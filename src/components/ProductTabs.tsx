
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductDescription from "@/components/product/ProductDescription";
import ProductSpecs from "@/components/product/ProductSpecs";
import ProductReviews from "@/components/product/ProductReviews";

interface ProductTabsProps {
  product: any;
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
  headerHeight = 0,
}) => {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "specs", label: "Specs" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className={`bg-white border-t border-gray-100 ${isScrolled ? "sticky top-0 z-10" : ""}`}
         style={{ top: `${headerHeight}px` }}>
      <div className="px-4 py-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex w-full justify-start space-x-1 bg-transparent p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={`flex-1 ${
                    activeTab === tab.id
                      ? "border-b-2 border-black rounded-none bg-transparent shadow-none text-black"
                      : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="description" className="mt-2">
            <ProductDescription description={product.description} />
          </TabsContent>
          
          <TabsContent value="specs" className="mt-2">
            <ProductSpecs specs={product.specs} />
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-2">
            <ProductReviews rating={product.rating} reviewCount={product.reviewCount} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductTabs;
