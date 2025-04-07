import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProductTabsProps {
  product: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled?: boolean;
  headerHeight?: number;
}

const ProductTabs = ({ 
  product, 
  activeTab, 
  setActiveTab, 
  isScrolled = false, 
  headerHeight = 0 
}) => {
  return (
    <div 
      className={`sticky bg-white z-10 border-y border-gray-200 ${
        isScrolled ? 'top-0' : 'top-0'
      }`}
      style={{ top: `${headerHeight}px` }}
    >
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={setActiveTab} 
        value={activeTab}
        className="w-full"
      >
        <div className="flex items-center justify-between px-4 py-2 overflow-x-auto">
          <TabsList>
            <TabsTrigger value="description" className="text-xs px-3">Description</TabsTrigger>
            <TabsTrigger value="specs" className="text-xs px-3">Specifications</TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs px-3">Reviews</TabsTrigger>
            <TabsTrigger value="sales" className="text-xs px-3">Sales</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="p-4">
          <TabsContent value="description" className="mt-0">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Key Features:</h4>
                <ul className="grid grid-cols-1 gap-y-1.5">
                  {product.features && product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-green-500 mt-0.5">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="specs" className="mt-0">
            <div className="space-y-2">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs && product.specs.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-1.5 px-2 font-medium">{spec.name}</td>
                      <td className="py-1.5 px-2 text-gray-600">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-0">
            <div className="text-center py-6 text-gray-500">
              <p>Customer reviews will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="mt-0">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Sales Analytics</h3>
                <p className="text-sm text-gray-600 mb-4">Track performance metrics for this product</p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <div className="text-sm text-gray-500">Total Units Sold</div>
                    <div className="text-xl font-bold">{product.sold.toLocaleString()}</div>
                    <div className="text-xs text-green-600">↑ 12% from last month</div>
                  </div>
                  
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <div className="text-sm text-gray-500">Revenue Generated</div>
                    <div className="text-xl font-bold">${(product.sold * product.discountPrice).toLocaleString()}</div>
                    <div className="text-xs text-green-600">↑ 8% from last month</div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">Monthly Sales Trend</div>
                    <div className="text-xs text-gray-500">Last 6 months</div>
                  </div>
                  <div className="h-40 w-full">
                    {/* Placeholder for chart */}
                    <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                      <p className="text-gray-400 text-sm">Sales chart visualization</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Geographic Distribution</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <div className="text-sm text-gray-500">Top Regions</div>
                    <ol className="mt-1 text-sm">
                      <li className="flex justify-between py-0.5">
                        <span>North America</span>
                        <span className="font-medium">42%</span>
                      </li>
                      <li className="flex justify-between py-0.5">
                        <span>Europe</span>
                        <span className="font-medium">28%</span>
                      </li>
                      <li className="flex justify-between py-0.5">
                        <span>Asia Pacific</span>
                        <span className="font-medium">20%</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <div className="text-sm text-gray-500">Growth Markets</div>
                    <ol className="mt-1 text-sm">
                      <li className="flex justify-between py-0.5">
                        <span>South America</span>
                        <span className="text-green-600">↑ 32%</span>
                      </li>
                      <li className="flex justify-between py-0.5">
                        <span>Middle East</span>
                        <span className="text-green-600">↑ 24%</span>
                      </li>
                      <li className="flex justify-between py-0.5">
                        <span>Africa</span>
                        <span className="text-green-600">↑ 18%</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
