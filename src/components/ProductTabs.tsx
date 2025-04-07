
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BarChart3, MessageSquare, Info, ShoppingCart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ProductTabsProps {
  product: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled: boolean;
  headerHeight: number;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  product,
  activeTab,
  setActiveTab,
  isScrolled,
  headerHeight
}) => {
  const getTabStyle = () => {
    if (isScrolled) {
      return {
        position: "sticky",
        top: `${headerHeight}px`,
        zIndex: 10,
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        paddingTop: "10px",
        paddingBottom: "10px"
      };
    }
    return {};
  };

  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#33C3F0', '#0FA0CE', '#aaadb0'];

  return (
    <div className="bg-white">
      <div style={getTabStyle()}>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex justify-between w-full bg-white px-4">
            <TabsTrigger value="description" className="flex items-center gap-1 text-xs">
              <Info className="h-3 w-3" />
              <span>Description</span>
            </TabsTrigger>
            <TabsTrigger value="specifications" className="flex items-center gap-1 text-xs">
              <Info className="h-3 w-3" />
              <span>Specifications</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-1 text-xs">
              <MessageSquare className="h-3 w-3" />
              <span>Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-1 text-xs">
              <BarChart3 className="h-3 w-3" />
              <span>Sales</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="px-4 py-4">
        <TabsContent value="description" className="space-y-4">
          <p className="text-sm text-gray-700">{product.description}</p>
          <div className="pt-2">
            <h3 className="text-sm font-medium mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              {product.features.map((feature: string, index: number) => (
                <li key={index} className="text-sm text-gray-700">{feature}</li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="space-y-2">
          {product.specs.map((spec: any, index: number) => (
            <React.Fragment key={index}>
              <div className="flex justify-between py-1.5">
                <span className="text-sm text-gray-600">{spec.name}</span>
                <span className="text-sm font-medium">{spec.value}</span>
              </div>
              {index < product.specs.length - 1 && (
                <Separator />
              )}
            </React.Fragment>
          ))}
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Customer Reviews</h3>
            <button className="text-sm text-blue-600">Write a Review</button>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500 text-center">Reviews will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Sales Data</h3>
            <span className="text-sm text-gray-500">{product.sold}+ units sold</span>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Monthly Sales Trend</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={product.sales.monthly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#9b87f5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Sales By Region</h4>
              <div className="h-64 w-full flex">
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
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
                      {product.sales.topCountries.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-1/2 pl-2">
                  <ul className="space-y-1">
                    {product.sales.topCountries.map((country: any, index: number) => (
                      <li key={index} className="flex items-center text-sm">
                        <div 
                          className="w-3 h-3 mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span>{country.country}: </span>
                        <span className="font-medium ml-1">{country.percentage}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </div>
    </div>
  );
};

export default ProductTabs;
