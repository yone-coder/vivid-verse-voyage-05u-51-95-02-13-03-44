
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, Info, Truck, Shield, Award } from "lucide-react";

type ProductTabsProps = {
  product: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled: boolean;
};

const ProductTabs = ({ product, activeTab, setActiveTab, isScrolled }: ProductTabsProps) => {
  const tabs = [
    {
      id: "description",
      label: "Details",
      icon: <Info className="h-4 w-4 mr-1" />,
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: <MessageCircle className="h-4 w-4 mr-1" />,
      count: product.reviewCount,
    },
    {
      id: "shipping",
      label: "Shipping",
      icon: <Truck className="h-4 w-4 mr-1" />,
    },
    {
      id: "warranty",
      label: "Warranty",
      icon: <Shield className="h-4 w-4 mr-1" />,
    },
    {
      id: "features",
      label: "Features",
      icon: <Award className="h-4 w-4 mr-1" />,
    },
  ];

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className={`bg-white sticky z-20 ${isScrolled ? 'top-10' : 'top-10'}`}>
        <ScrollArea className="w-full" orientation="horizontal">
          <TabsList className="w-full h-12 bg-white px-0 justify-start">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center px-4 py-2 data-[state=active]:bg-gray-100"
              >
                {tab.icon}
                {tab.label}
                {tab.count && (
                  <Badge variant="secondary" className="ml-1 bg-gray-200">
                    {tab.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>
      </div>

      <TabsContent value="description" className="p-4 bg-white">
        <h3 className="text-lg font-medium mb-2">Product Description</h3>
        <p className="text-gray-700 mb-4">{product.description}</p>

        <h3 className="text-lg font-medium mb-2">Specifications</h3>
        <div className="space-y-2">
          {product.specs.map((spec: any, index: number) => (
            <div
              key={index}
              className={`flex justify-between py-2 ${
                index !== product.specs.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <span className="text-gray-500 text-sm">{spec.name}</span>
              <span className="text-sm font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="p-4 bg-white">
        <div className="flex items-center mb-4">
          <div className="flex text-amber-400 text-3xl mr-3">
            <Star className="fill-amber-400 stroke-amber-400 h-7 w-7" />
            <span className="ml-1 text-black font-bold">{product.rating}</span>
          </div>
          <div className="text-sm text-gray-500">
            Based on {product.reviewCount} reviews
          </div>
        </div>

        <div className="space-y-1 mb-4">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center">
              <div className="w-12 text-sm text-gray-500">{star} stars</div>
              <div className="w-full max-w-xs mx-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400"
                    style={{
                      width: `${
                        star === 5
                          ? "75%"
                          : star === 4
                          ? "20%"
                          : star === 3
                          ? "3%"
                          : star === 2
                          ? "1%"
                          : "1%"
                      }`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {star === 5
                  ? "75%"
                  : star === 4
                  ? "20%"
                  : star === 3
                  ? "3%"
                  : star === 2
                  ? "1%"
                  : "1%"}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="text-center text-gray-500 py-8">
            Reviews content would be displayed here
          </div>
        </div>
      </TabsContent>

      <TabsContent value="shipping" className="p-4 bg-white">
        <h3 className="text-lg font-medium mb-3">Shipping Information</h3>
        <div className="space-y-4">
          <div>
            <div className="font-medium mb-1">Delivery Options</div>
            <div className="flex items-center mb-2">
              <Truck className="h-4 w-4 text-green-600 mr-2" />
              <div className="text-sm">
                Standard Shipping: {product.shipping.estimated} (
                {product.shipping.free ? "Free" : "$4.99"})
              </div>
            </div>
            <div className="flex items-center">
              <Truck className="h-4 w-4 text-blue-600 mr-2" />
              <div className="text-sm">
                Express Shipping: {product.shipping.expressEstimated} ($
                {product.shipping.express})
              </div>
            </div>
          </div>

          <div>
            <div className="font-medium mb-1">Returns</div>
            <div className="text-sm">
              {product.shipping.returns}. See our return policy for more details.
            </div>
          </div>

          <div>
            <div className="font-medium mb-1">International Shipping</div>
            <div className="text-sm">
              We ship to over 100 countries worldwide. Additional customs fees may
              apply for international orders.
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="warranty" className="p-4 bg-white">
        <h3 className="text-lg font-medium mb-3">Warranty Information</h3>
        <div className="space-y-4">
          {product.warranty.map((option: any) => (
            <div key={option.name} className="border rounded-md p-3">
              <div className="font-medium mb-1">
                {option.name} Warranty - {option.duration}
                {option.price > 0
                  ? ` ($${option.price.toFixed(2)})`
                  : " (Included)"}
              </div>
              <div className="text-sm text-gray-600">
                {option.name === "Standard"
                  ? "Basic coverage for manufacturing defects"
                  : option.name === "Extended"
                  ? "Extended coverage including wear and tear"
                  : "Premium coverage with accidental damage protection"}
              </div>
            </div>
          ))}

          <div className="text-sm text-gray-500 mt-2">
            All warranties begin on the date of purchase. For warranty claims,
            please contact our customer support with your order number and
            description of the issue.
          </div>
        </div>
      </TabsContent>

      <TabsContent value="features" className="p-4 bg-white">
        <h3 className="text-lg font-medium mb-3">Product Features</h3>
        <ul className="space-y-2">
          {product.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start">
              <div className="mt-1 mr-2 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-xs">✓</span>
              </div>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
