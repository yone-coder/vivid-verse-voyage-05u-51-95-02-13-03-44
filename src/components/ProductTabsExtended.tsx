
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart3, Info, MessageCircle, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProductTabsProps {
  product: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled: boolean;
  headerHeight?: number;
}

const ProductTabsExtended: React.FC<ProductTabsProps> = ({
  product,
  activeTab,
  setActiveTab,
  isScrolled,
  headerHeight = 0,
}) => {
  const tabStyle = isScrolled
    ? {
        position: "sticky",
        top: `${headerHeight}px`,
        zIndex: 10,
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        paddingTop: "8px",
        paddingBottom: "8px",
      }
    : {};

  const handleTabClick = (value: string) => {
    setActiveTab(value);
  };

  return (
    <>
      <div
        style={tabStyle}
        className="w-full px-4 py-1 bg-white flex items-center overflow-x-auto scrollbar-hide"
      >
        <Tabs
          value={activeTab}
          onValueChange={handleTabClick}
          className="w-full"
        >
          <TabsList className="w-full h-10 bg-muted/30 grid grid-flow-col auto-cols-fr text-muted-foreground">
            <TabsTrigger
              value="description"
              className="flex items-center justify-center text-xs"
            >
              <Info className="mr-1 h-3.5 w-3.5" />
              <span className="hidden sm:inline">Details</span>
              <span className="sm:hidden">Info</span>
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="flex items-center justify-center text-xs"
            >
              <Star className="mr-1 h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reviews</span>
              <span className="sm:hidden">Reviews</span>
              <Badge className="ml-1 h-4 text-[10px] px-1" variant="secondary">
                {product.reviewCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="questions"
              className="flex items-center justify-center text-xs"
            >
              <MessageCircle className="mr-1 h-3.5 w-3.5" />
              <span className="hidden sm:inline">Questions</span>
              <span className="sm:hidden">Q&A</span>
              <Badge className="ml-1 h-4 text-[10px] px-1" variant="secondary">
                43
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="sales"
              className="flex items-center justify-center text-xs"
            >
              <BarChart3 className="mr-1 h-3.5 w-3.5" />
              <span>Sales</span>
              <Badge className="ml-1 h-4 text-[10px] px-1" variant="secondary">
                {product.sold > 1000 ? `${Math.round(product.sold/1000)}k+` : product.sold}
              </Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-4 pb-8">
            <div className="space-y-4 text-sm">
              {/* Description tab content */}
              <p>{product.description}</p>
              <h3 className="font-medium text-base mt-4">Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              
              <h3 className="font-medium text-base mt-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.specs.map((spec: any, index: number) => (
                  <div key={index} className={`py-2 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                    <span className="font-medium">{spec.name}:</span>{" "}
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="pt-4 pb-8">
            {/* Reviews tab content */}
            <div className="text-center text-gray-500 py-8">
              <Star className="mx-auto h-12 w-12 text-gray-300 mb-2" />
              <p className="text-xl font-medium">Reviews coming soon</p>
              <p>Product reviews will be available after more customers provide feedback.</p>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="pt-4 pb-8">
            {/* Questions tab content */}
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-300 mb-2" />
              <p className="text-xl font-medium">Questions & Answers</p>
              <p>Have a question? Ask and the community will answer.</p>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="pt-4 pb-8">
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-3">Monthly Sales</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={product.sales.monthly}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-3">Sales by Country</h3>
                <div className="space-y-2">
                  {product.sales.topCountries.map((country: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{country.country}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${country.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{country.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-medium text-blue-800">Sales insights</h3>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-blue-800">
                  <li>Sales have increased by 28% in the last month</li>
                  <li>Most popular during holiday seasons (October-December)</li>
                  <li>Average customer rating is higher than 90% of similar products</li>
                  <li>Re-order rate is 23% higher than category average</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProductTabsExtended;
