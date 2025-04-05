
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

interface ProductSpec {
  name: string;
  value: string;
}

interface ProductProps {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  rating: number;
  reviewCount: number;
  sold: number;
  description: string;
  images: string[];
  specs: ProductSpec[];
}

interface ProductTabsProps {
  product: ProductProps;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled: boolean;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  product,
  activeTab,
  setActiveTab,
  isScrolled
}) => {
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className={`bg-white sticky z-20 ${isScrolled ? 'top-14' : 'top-0'}`}>
        <TabsList className="w-full h-12 bg-white">
          <TabsTrigger 
            value="description" 
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none"
          >
            Description
          </TabsTrigger>
          <TabsTrigger 
            value="specs" 
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none"
          >
            Specs
          </TabsTrigger>
          <TabsTrigger 
            value="reviews" 
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none"
          >
            Reviews
          </TabsTrigger>
          <TabsTrigger 
            value="qa" 
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none"
          >
            Q&A
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="description" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            <div className="text-sm text-gray-700 whitespace-pre-line">
              <p>{product.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {product.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`Product detail ${index + 1}`} 
                    className="w-full h-auto rounded-md"
                  />
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Features:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>16.7 million vibrant colors</li>
                  <li>10 projection modes</li>
                  <li>Remote and app control</li>
                  <li>Bluetooth speaker functionality</li>
                  <li>Timer and sleep functions</li>
                  <li>Rechargeable battery</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="specs" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            <div className="divide-y">
              {product.specs.map((spec, index) => (
                <div key={index} className="py-3 flex">
                  <span className="w-1/3 text-gray-500">{spec.name}</span>
                  <span className="w-2/3 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <div className="text-2xl font-bold">{product.rating}</div>
                <div className="text-amber-400">
                  {'★'.repeat(Math.floor(product.rating))}
                  {product.rating % 1 !== 0 && '☆'}
                  {'☆'.repeat(5 - Math.ceil(product.rating))}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500">{product.reviewCount} reviews</div>
              </div>
            </div>
            
            <div className="divide-y">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                    <span className="font-medium">User {index + 1}</span>
                    <div className="ml-auto text-xs text-gray-500">
                      {new Date(Date.now() - index * 86400000).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-amber-400 text-sm mt-1">
                    {'★'.repeat(5 - index)}
                    {'☆'.repeat(index)}
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    This nebula projector is amazing! The colors are vibrant and it creates a beautiful atmosphere in my bedroom. Battery life is good too.
                  </p>
                  {index === 0 && (
                    <div className="mt-2 flex gap-2 overflow-x-auto">
                      {[...Array(2)].map((_, imgIndex) => (
                        <img key={imgIndex} src="/placeholder.svg" alt="Review" className="w-16 h-16 object-cover rounded" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button className="w-full py-2 border border-gray-300 rounded-lg text-center mt-4 text-gray-600">
              Load More Reviews
            </button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="qa" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            <div className="divide-y">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="py-4">
                  <div className="flex items-start">
                    <div className="bg-gray-100 rounded-lg p-3 flex-1">
                      <div className="flex items-center mb-1">
                        <span className="text-xs font-semibold bg-red-100 text-red-600 px-1 rounded mr-2">Q</span>
                        <span className="text-sm font-medium">Is this projector suitable for outdoor use?</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>User {index + 123}</span>
                        <span className="mx-1">•</span>
                        <span>2 weeks ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start mt-2 ml-6">
                    <div className="bg-gray-50 rounded-lg p-3 flex-1">
                      <div className="flex items-center mb-1">
                        <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-1 rounded mr-2">A</span>
                        <span className="text-sm">Yes, it's IP65 water-resistant and can be used outdoors, but I recommend using it under some shelter for best results.</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Seller</span>
                        <span className="mx-1">•</span>
                        <span>1 week ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-2 border border-gray-300 rounded-lg text-center mt-4 text-gray-600">
              Ask a Question
            </button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
