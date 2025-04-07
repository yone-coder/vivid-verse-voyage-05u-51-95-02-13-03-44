import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface ProductTabsProps {
  product: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled: boolean;
  headerHeight?: number;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  product,
  activeTab,
  setActiveTab,
  isScrolled,
  headerHeight = 0,
}) => {
  const containerStyle = isScrolled
    ? {
        position: "sticky" as const,
        top: `${headerHeight}px`,
        zIndex: 10,
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        paddingTop: "8px",
        paddingBottom: "8px",
      }
    : {};

  const COLORS = ['#8B5CF6', '#C084FC', '#E879F9', '#F472B6', '#FB7185', '#A3A3A3'];

  return (
    <Tabs
      className="w-full"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <div style={containerStyle} className="px-4 mb-1">
        <TabsList className="w-full bg-gray-100 p-1 h-10">
          <TabsTrigger
            value="description"
            className="flex-1 font-medium data-[state=active]:bg-white"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="flex-1 font-medium data-[state=active]:bg-white"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="flex-1 font-medium data-[state=active]:bg-white"
          >
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value="sales"
            className="flex-1 font-medium data-[state=active]:bg-white"
          >
            Sales
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="bg-white p-4 mb-4">
        <TabsContent value="description" className="mt-2 text-sm text-gray-500">
          <p className="mb-4">{product.description}</p>
          <div className="mt-4">
            <h3 className="font-semibold text-black mb-2">Key Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="mt-2">
          <div className="text-sm">
            <h3 className="font-semibold text-black mb-2">Technical Specifications</h3>
            <div className="bg-gray-50 rounded-md overflow-hidden">
              {product.specs.map((spec, index) => (
                <div 
                  key={index} 
                  className={`flex ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } px-4 py-2`}
                >
                  <span className="w-1/2 text-gray-600">{spec.name}</span>
                  <span className="w-1/2 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-2">
          <div className="text-sm">
            <h3 className="font-semibold text-black mb-3">Customer Reviews</h3>
            <p className="text-gray-500 mb-4">
              This product has received {product.reviewCount} reviews with an average rating of {product.rating} out of 5 stars.
            </p>
            
            {/* Placeholder for actual review content */}
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                      <span className="text-purple-700 font-medium">JD</span>
                    </div>
                    <span className="ml-2 font-medium">John D.</span>
                  </div>
                  <div className="text-amber-400">★★★★★</div>
                </div>
                <p className="text-gray-600">
                  Amazing product! The projection quality is outstanding and
                  the colors are vibrant. I use it every night in my bedroom.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
                      <span className="text-blue-700 font-medium">SM</span>
                    </div>
                    <span className="ml-2 font-medium">Sarah M.</span>
                  </div>
                  <div className="text-amber-400">★★★★☆</div>
                </div>
                <p className="text-gray-600">
                  Very good projector. Battery life could be a bit longer, but
                  otherwise it's perfect for creating a relaxing atmosphere.
                </p>
              </div>
              
              {/* View more reviews button */}
              <button className="w-full py-2 border border-gray-300 rounded-md text-center font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                View More Reviews
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="mt-2">
          <div className="text-sm">
            <h3 className="font-semibold text-black mb-3">Sales Performance</h3>
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Monthly Sales</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    width={500}
                    height={300}
                    data={product.sales.monthly}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 5,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#8B5CF6" fill="#C084FC" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Sales by Region</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={400}>
                    <Pie
                      data={product.sales.topCountries}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                      nameKey="country"
                    >
                      {product.sales.topCountries.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-purple-50 rounded-md">
              <div className="flex justify-between">
                <div>
                  <span className="block text-xs text-gray-500">Total Units Sold</span>
                  <span className="text-lg font-semibold text-purple-900">{product.sold.toLocaleString()}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">Countries Shipped</span>
                  <span className="text-lg font-semibold text-purple-900">42+</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">Satisfaction Rate</span>
                  <span className="text-lg font-semibold text-purple-900">98%</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProductTabs;
