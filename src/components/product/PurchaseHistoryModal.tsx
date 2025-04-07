
import React, { useState } from "react";
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, TrendingUp, History, ChevronDown, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PurchaseHistoryModalProps {
  soldCount: number;
}

export const PurchaseHistoryModal: React.FC<PurchaseHistoryModalProps> = ({ soldCount }) => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");
  
  // Mock data for price history
  const priceHistoryData = [
    { date: "Jan", price: 39.99 },
    { date: "Feb", price: 37.99 },
    { date: "Mar", price: 34.99 },
    { date: "Apr", price: 29.99 },
    { date: "May", price: 32.99 },
    { date: "Jun", price: 27.99 },
    { date: "Jul", price: 24.99 },
  ];
  
  // Mock data for purchase history
  const purchaseHistoryData = [
    { date: "Mon", sales: 42 },
    { date: "Tue", sales: 53 },
    { date: "Wed", sales: 86 },
    { date: "Thu", sales: 65 },
    { date: "Fri", sales: 93 },
    { date: "Sat", sales: 125 },
    { date: "Sun", sales: 71 },
  ];
  
  // Mock data for weekly purchases by country
  const purchasesByCountry = [
    { country: "United States", count: 423, flag: "🇺🇸" },
    { country: "United Kingdom", count: 187, flag: "🇬🇧" },
    { country: "Canada", count: 142, flag: "🇨🇦" },
    { country: "Australia", count: 97, flag: "🇦🇺" },
    { country: "Germany", count: 86, flag: "🇩🇪" },
  ];
  
  // Recent purchases data
  const recentPurchases = [
    { id: 1, user: "John S.", location: "New York", time: "2 mins ago", quantity: 1 },
    { id: 2, user: "Emma T.", location: "London", time: "7 mins ago", quantity: 2 },
    { id: 3, user: "Miguel R.", location: "Madrid", time: "12 mins ago", quantity: 1 },
    { id: 4, user: "Aisha K.", location: "Dubai", time: "18 mins ago", quantity: 3 },
    { id: 5, user: "Liu W.", location: "Beijing", time: "25 mins ago", quantity: 1 },
  ];

  return (
    <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl flex items-center gap-2">
          <History className="h-5 w-5 text-blue-600" />
          Product Performance Analytics
        </DialogTitle>
        <DialogDescription>
          View detailed purchase history and price trends for this product.
        </DialogDescription>
      </DialogHeader>
      
      <div className="py-2">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="price">Price History</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" /> Sales Trend
                    </p>
                    <h3 className="text-2xl font-bold">{soldCount.toLocaleString()}</h3>
                    <p className="text-green-600 text-sm font-medium">+12% vs last month</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Positive</Badge>
                </div>
                
                <div className="mt-4 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={purchaseHistoryData}>
                      <XAxis dataKey="date" axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#4ade80" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" /> Price Trend
                    </p>
                    <h3 className="text-2xl font-bold">$24.99</h3>
                    <p className="text-red-600 text-sm font-medium">-37% vs original</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">All Time Low</Badge>
                </div>
                
                <div className="mt-4 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistoryData}>
                      <XAxis dataKey="date" axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Users className="h-4 w-4" /> Recent Purchases
              </h3>
              <div className="space-y-2">
                {recentPurchases.map(purchase => (
                  <div key={purchase.id} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {purchase.user.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{purchase.user}</p>
                        <p className="text-xs text-gray-500">{purchase.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {purchase.quantity > 1 ? `${purchase.quantity}x` : ''}
                      </p>
                      <p className="text-xs text-gray-500">{purchase.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 text-blue-600 text-sm flex items-center justify-center gap-1 hover:underline">
                View all purchases <ArrowRight className="h-3 w-3" />
              </button>
            </Card>
          </TabsContent>
          
          {/* Price History Tab */}
          <TabsContent value="price">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Price History</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <button 
                    className={`px-2 py-1 rounded ${timeRange === '7d' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
                    onClick={() => setTimeRange("7d")}
                  >
                    7D
                  </button>
                  <button 
                    className={`px-2 py-1 rounded ${timeRange === '30d' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
                    onClick={() => setTimeRange("30d")}
                  >
                    30D
                  </button>
                  <button 
                    className={`px-2 py-1 rounded ${timeRange === '90d' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
                    onClick={() => setTimeRange("90d")}
                  >
                    90D
                  </button>
                  <button 
                    className={`px-2 py-1 rounded ${timeRange === '1y' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
                    onClick={() => setTimeRange("1y")}
                  >
                    1Y
                  </button>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      dot={{ r: 4, fill: '#3b82f6', stroke: '#ffffff', strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Current Price</p>
                  <p className="text-xl font-bold text-red-500">$24.99</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Highest Price</p>
                  <p className="text-xl font-bold">$39.99</p>
                  <p className="text-xs text-gray-500">Jan 15, 2025</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Lowest Price</p>
                  <p className="text-xl font-bold text-green-600">$24.99</p>
                  <p className="text-xs text-gray-500">Jul 7, 2025</p>
                </div>
              </div>
              
              <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-100">
                <h4 className="font-medium text-blue-800 flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Price Drop Prediction
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Based on historical data, there's a 76% chance this product will go on sale again in August 2025.
                </p>
              </div>
            </Card>
          </TabsContent>
          
          {/* Purchases Tab */}
          <TabsContent value="purchases">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Sales Performance</h3>
                <Badge variant="outline" className="gap-1 flex items-center">
                  <Clock className="h-3 w-3" /> Last updated: Just now
                </Badge>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={purchaseHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-sm text-purple-700">Total Sold</p>
                  <p className="text-xl font-bold text-purple-700">{soldCount.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm text-green-700">This Week</p>
                  <p className="text-xl font-bold text-green-700">437</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-700">Today</p>
                  <p className="text-xl font-bold text-blue-700">71</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Peak Purchase Hours</h4>
                <div className="flex h-8">
                  {[...Array(24)].map((_, i) => {
                    // Generate a random activity level between 0.1 and 1 for visualization
                    const activity = Math.max(0.1, Math.min(1, 0.2 + Math.sin(i/3) * 0.6 + Math.random() * 0.2));
                    const isPeak = activity > 0.8;
                    return (
                      <div 
                        key={i} 
                        className={`flex-1 mx-px rounded-t ${isPeak ? 'bg-purple-500' : 'bg-purple-200'}`}
                        style={{ height: `${activity * 100}%` }}
                        title={`${i}:00 - Activity: ${Math.round(activity * 100)}%`}
                      />
                    );
                  })}
                </div>
                <div className="flex text-xs text-gray-500 justify-between mt-1">
                  <span>12 AM</span>
                  <span>6 AM</span>
                  <span>12 PM</span>
                  <span>6 PM</span>
                  <span>12 AM</span>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Geography Tab */}
          <TabsContent value="geography" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-medium mb-3">Top Markets</h3>
              
              {purchasesByCountry.map((country, i) => (
                <div key={country.country} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{country.flag}</span>
                    <span>{country.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{country.count}</span>
                    <div className="w-32 bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${(country.count / purchasesByCountry[0].count) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="flex items-center justify-center gap-1 text-sm text-gray-500 mt-2 w-full">
                See more countries <ChevronDown className="h-4 w-4" />
              </button>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-2">Worldwide Interest</h3>
              <div className="h-48 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                [World Map Visualization]
              </div>
              <div className="mt-3 text-sm text-gray-600">
                Product sells in 47 countries, with 63% of sales coming from North America.
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DialogContent>
  );
};
