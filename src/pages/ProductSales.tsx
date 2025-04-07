
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  LineChart as LineChartIcon,
  ChevronDown, 
  Star,
  TrendingUp,
  TrendingDown,
  Clock,
  BarChart3,
  Activity,
  PieChart,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProductAnalytics } from "@/hooks/useProduct";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  ReferenceLine
} from "recharts";

// Sample market depth data
const marketDepthData = [
  { price: 124.50, quantity: 42, type: "buy" },
  { price: 124.70, quantity: 36, type: "buy" },
  { price: 124.90, quantity: 28, type: "buy" },
  { price: 125.10, quantity: 64, type: "buy" },
  { price: 125.30, quantity: 12, type: "buy" },
  { price: 125.50, quantity: 50, type: "sell" },
  { price: 125.70, quantity: 38, type: "sell" },
  { price: 125.90, quantity: 25, type: "sell" },
  { price: 126.10, quantity: 42, type: "sell" },
  { price: 126.30, quantity: 17, type: "sell" },
];

// Sample trade history
const tradeHistory = [
  { id: 1, price: 125.42, amount: 3, total: 376.26, time: "16:42:32", type: "buy" },
  { id: 2, price: 125.50, amount: 5, total: 627.50, time: "16:41:58", type: "sell" },
  { id: 3, price: 125.39, amount: 2, total: 250.78, time: "16:40:23", type: "buy" },
  { id: 4, price: 125.47, amount: 1, total: 125.47, time: "16:38:45", type: "sell" },
  { id: 5, price: 125.35, amount: 7, total: 877.45, time: "16:37:12", type: "buy" },
  { id: 6, price: 125.42, amount: 2, total: 250.84, time: "16:35:56", type: "sell" },
  { id: 7, price: 125.30, amount: 4, total: 501.20, time: "16:33:42", type: "buy" },
  { id: 8, price: 125.40, amount: 3, total: 376.20, time: "16:32:18", type: "sell" },
].sort((a, b) => b.id - a.id);

// Sample price chart data
const generateChartData = (days = 30) => {
  const data = [];
  const startPrice = 120;
  let currentPrice = startPrice;
  
  for (let i = 0; i < days; i++) {
    // Create some volatility
    const change = (Math.random() - 0.48) * 2;
    currentPrice = Math.max(currentPrice + change, 90);
    
    const volume = Math.floor(Math.random() * 500) + 100;
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(2)),
      open: parseFloat((currentPrice - Math.random()).toFixed(2)),
      close: parseFloat(currentPrice.toFixed(2)),
      high: parseFloat((currentPrice + Math.random()).toFixed(2)),
      low: parseFloat((currentPrice - Math.random() * 1.5).toFixed(2)),
      volume
    });
  }
  
  return data;
};

const chartData = generateChartData();

// Sample order book data
const generateOrderBook = () => {
  const asks = [];
  const bids = [];
  
  let askPrice = 125.50;
  let bidPrice = 125.40;
  
  for (let i = 0; i < 10; i++) {
    asks.push({
      price: parseFloat(askPrice.toFixed(2)),
      amount: parseFloat((Math.random() * 20 + 1).toFixed(2)),
      total: parseFloat((Math.random() * 2000 + 500).toFixed(2)),
    });
    askPrice += 0.10;
    
    bids.push({
      price: parseFloat(bidPrice.toFixed(2)),
      amount: parseFloat((Math.random() * 20 + 1).toFixed(2)),
      total: parseFloat((Math.random() * 2000 + 500).toFixed(2)),
    });
    bidPrice -= 0.10;
  }
  
  return { asks, bids };
};

const { asks, bids } = generateOrderBook();

const ProductSales: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { data: analytics, isLoading } = useProductAnalytics(id || "nebula-pro-2025");
  const [timeframe, setTimeframe] = useState<string>("1D");
  const [chartType, setChartType] = useState<string>("candles");

  // Current price and 24h change
  const currentPrice = 125.42;
  const priceChange = 1.47;
  const percentChange = 1.18;
  const isPositiveChange = percentChange > 0;

  return (
    <div className="min-h-screen bg-[#0B0E11] text-gray-300">
      {/* Top navigation */}
      <div className="border-b border-gray-800 bg-[#0B0E11] sticky top-0 z-10">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to={`/product/${id}`}>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </Link>
            <div className="ml-4">
              <h1 className="text-lg font-medium text-white flex items-center">
                NebulaPro/USD
                <Badge className="ml-2 bg-[#1E2329] hover:bg-[#1E2329] text-yellow-500 hover:text-yellow-500">
                  <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                  4.8
                </Badge>
              </h1>
              <div className="flex items-center text-sm">
                <span className="text-gray-400">24h Volume:</span>
                <span className="ml-1 text-gray-200">5,243 units</span>
                <span className="mx-2 text-gray-600">|</span>
                <span className="text-gray-400">All-time high:</span>
                <span className="ml-1 text-gray-200">$142.38</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" className="bg-transparent border-gray-700 hover:bg-gray-800 text-gray-200">
              Market Analysis
            </Button>
            <Button className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black">
              Purchase Now
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left sidebar */}
          <div className="lg:col-span-1 space-y-4 order-3 lg:order-1">
            {/* Market overview */}
            <Card className="bg-[#1E2329] border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-200">Market Overview</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="font-medium text-gray-100">${currentPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Change</span>
                    <span className={isPositiveChange ? "text-green-500" : "text-red-500"}>
                      ${priceChange} ({isPositiveChange ? "+" : ""}{percentChange}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h High</span>
                    <span className="text-gray-100">$127.36</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Low</span>
                    <span className="text-gray-100">$121.85</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume (24h)</span>
                    <span className="text-gray-100">5,243 Units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Cap</span>
                    <span className="text-gray-100">$657,298</span>
                  </div>
                </div>
                <Separator className="my-4 bg-gray-700" />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Available Supply</span>
                    <span className="text-gray-100">5,240 / 10,000</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F0B90B]" style={{ width: "52.4%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Market Depth Card */}
            <Card className="bg-[#1E2329] border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-200">Market Depth</h3>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={marketDepthData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <XAxis dataKey="price" tick={{ fontSize: 10, fill: "#666" }} />
                      <YAxis tick={{ fontSize: 10, fill: "#666" }} />
                      <Area 
                        type="monotone" 
                        dataKey="quantity" 
                        stroke="#78B943" 
                        fill="#364316" 
                        fillOpacity={0.5} 
                      />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-gray-900 p-2 border border-gray-700 text-xs">
                                <p>Price: ${payload[0].payload.price}</p>
                                <p>Quantity: {payload[0].payload.quantity}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Trades */}
            <Card className="bg-[#1E2329] border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-200">Recent Trades</h3>
                </div>
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-xs text-gray-500">
                        <th className="text-left pb-2">Price (USD)</th>
                        <th className="text-right pb-2">Amount</th>
                        <th className="text-right pb-2">Time</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {tradeHistory.slice(0, 6).map(trade => (
                        <tr key={trade.id}>
                          <td className={trade.type === "buy" ? "text-green-500 pb-2" : "text-red-500 pb-2"}>
                            ${trade.price}
                          </td>
                          <td className="text-right text-gray-300 pb-2">{trade.amount}</td>
                          <td className="text-right text-gray-500 pb-2">{trade.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-3 space-y-4 order-1 lg:order-2">
            {/* Price chart */}
            <Card className="bg-[#1E2329] border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-white">${currentPrice}</span>
                      <span className={`ml-2 text-sm ${isPositiveChange ? "text-green-500" : "text-red-500"}`}>
                        {isPositiveChange ? "+" : ""}{percentChange}%
                      </span>
                    </div>
                    <div className="hidden md:flex gap-1">
                      <Button variant="outline" size="sm" className="h-6 px-2 text-xs bg-transparent border-gray-700">
                        <LineChartIcon className="h-3 w-3 mr-1" />
                        Line
                      </Button>
                      <Button variant="outline" size="sm" className="h-6 px-2 text-xs bg-transparent border-gray-700">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Candles
                      </Button>
                      <Button variant="outline" size="sm" className="h-6 px-2 text-xs bg-transparent border-gray-700">
                        <Activity className="h-3 w-3 mr-1" />
                        Depth
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {["15m", "1h", "4h", "1D", "1W", "1M"].map(frame => (
                      <Button
                        key={frame}
                        variant={timeframe === frame ? "default" : "outline"}
                        size="sm"
                        className={`h-6 px-2 text-xs ${
                          timeframe === frame 
                            ? "bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black" 
                            : "bg-transparent border-gray-700 hover:bg-gray-800 text-gray-300"
                        }`}
                        onClick={() => setTimeframe(frame)}
                      >
                        {frame}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="h-96">
                  <ChartContainer 
                    config={{ 
                      price: { color: "#76B0F1" },
                      volume: { color: "#71B271" }
                    }}
                  >
                    <LineChart
                      data={chartData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2A2E37" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: "#666", fontSize: 10 }}
                        tickLine={{ stroke: "#666" }}
                        axisLine={{ stroke: "#666" }}
                      />
                      <YAxis 
                        domain={[
                          (dataMin: number) => Math.floor(dataMin * 0.98), 
                          (dataMax: number) => Math.ceil(dataMax * 1.02)
                        ]}
                        tick={{ fill: "#666", fontSize: 10 }}
                        tickLine={{ stroke: "#666" }}
                        axisLine={{ stroke: "#666" }}
                        orientation="right"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#76B0F1" 
                        strokeWidth={2}
                        dot={false}
                      />
                      <Tooltip 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-[#2A2E37] p-2 border border-gray-700">
                                <p className="text-xs text-gray-300">{label}</p>
                                <p className="text-xs font-medium text-white">
                                  Price: ${payload[0].value}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceLine
                        y={currentPrice}
                        stroke="#F0B90B"
                        strokeDasharray="3 3"
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
                <div className="flex justify-center mt-2">
                  <div className="flex gap-4 text-xs text-gray-400">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#76B0F1] rounded-full mr-1"></div>
                      <span>Price</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#F0B90B] rounded-full mr-1"></div>
                      <span>Current Price</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Order Book & Trade History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Order Book */}
              <Card className="bg-[#1E2329] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-200">Order Book</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-xs text-gray-500 mb-1">
                    <div>Price (USD)</div>
                    <div className="text-right">Amount</div>
                    <div className="text-right">Total</div>
                  </div>
                  <div className="space-y-2">
                    {/* Asks (Sell orders) */}
                    <div className="space-y-0.5">
                      {asks.slice(0, 5).reverse().map((ask, i) => (
                        <div key={i} className="grid grid-cols-3 gap-1 text-xs">
                          <div className="text-red-500">${ask.price}</div>
                          <div className="text-right text-gray-300">{ask.amount}</div>
                          <div className="text-right text-gray-400">{ask.total}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Current price */}
                    <div className="py-1 grid grid-cols-3 text-xs">
                      <div className={`font-medium ${isPositiveChange ? "text-green-500" : "text-red-500"}`}>
                        ${currentPrice}
                      </div>
                      <div className="text-right text-gray-400">Last Price</div>
                      <div className="text-right text-gray-400">
                        {isPositiveChange ? "+" : ""}{percentChange}%
                      </div>
                    </div>
                    
                    {/* Bids (Buy orders) */}
                    <div className="space-y-0.5">
                      {bids.slice(0, 5).map((bid, i) => (
                        <div key={i} className="grid grid-cols-3 gap-1 text-xs">
                          <div className="text-green-500">${bid.price}</div>
                          <div className="text-right text-gray-300">{bid.amount}</div>
                          <div className="text-right text-gray-400">{bid.total}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Trade History */}
              <Card className="bg-[#1E2329] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-200">Trade History</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-xs text-gray-500 mb-1">
                    <div>Price (USD)</div>
                    <div className="text-right">Amount</div>
                    <div className="text-right">Total</div>
                    <div className="text-right">Time</div>
                  </div>
                  <div className="space-y-1.5">
                    {tradeHistory.map(trade => (
                      <div key={trade.id} className="grid grid-cols-4 gap-1 text-xs">
                        <div className={trade.type === "buy" ? "text-green-500" : "text-red-500"}>
                          ${trade.price}
                        </div>
                        <div className="text-right text-gray-300">{trade.amount}</div>
                        <div className="text-right text-gray-400">${trade.total}</div>
                        <div className="text-right text-gray-500">{trade.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sales Data Tabs */}
            <Card className="bg-[#1E2329] border-0">
              <CardContent className="p-4">
                <Tabs defaultValue="analytics">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList className="bg-[#12171E] p-0.5 h-9">
                      <TabsTrigger 
                        value="analytics" 
                        className="text-sm h-8 data-[state=active]:bg-[#F0B90B] data-[state=active]:text-black"
                      >
                        Analytics
                      </TabsTrigger>
                      <TabsTrigger 
                        value="regions" 
                        className="text-sm h-8 data-[state=active]:bg-[#F0B90B] data-[state=active]:text-black"
                      >
                        Regions
                      </TabsTrigger>
                      <TabsTrigger 
                        value="buyers" 
                        className="text-sm h-8 data-[state=active]:bg-[#F0B90B] data-[state=active]:text-black"
                      >
                        Buyers
                      </TabsTrigger>
                    </TabsList>
                    <Button variant="outline" size="sm" className="bg-transparent border-gray-700 hover:bg-gray-800 text-gray-200">
                      <BookOpen className="h-4 w-4 mr-1" />
                      Export Report
                    </Button>
                  </div>
                  
                  <TabsContent value="analytics">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#12171E] rounded-md p-3">
                        <div className="text-xs text-gray-500 mb-1">Total Sales</div>
                        <div className="text-2xl font-bold text-white">5,243</div>
                        <div className="text-xs text-green-500">+3.2% vs. last month</div>
                        <div className="h-16 mt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData.slice(-7)}>
                              <Bar dataKey="volume" fill="#F0B90B" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="bg-[#12171E] rounded-md p-3">
                        <div className="text-xs text-gray-500 mb-1">Conversion Rate</div>
                        <div className="text-2xl font-bold text-white">4.3%</div>
                        <div className="text-xs text-green-500">+0.5% vs. last month</div>
                        <div className="h-16 mt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData.slice(-7)}>
                              <Line 
                                type="monotone" 
                                dataKey="price" 
                                stroke="#F0B90B" 
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="bg-[#12171E] rounded-md p-3">
                        <div className="text-xs text-gray-500 mb-1">Revenue Generated</div>
                        <div className="text-2xl font-bold text-white">$657,298</div>
                        <div className="text-xs text-green-500">+12.7% vs. last month</div>
                        <div className="h-16 mt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData.slice(-7)}>
                              <Area 
                                type="monotone" 
                                dataKey="price" 
                                stroke="#F0B90B" 
                                fill="#F0B90B" 
                                fillOpacity={0.2} 
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="regions">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-3">Top Regions</h4>
                        <Table>
                          <TableHeader>
                            <TableRow className="border-gray-700">
                              <TableHead className="text-gray-400">Region</TableHead>
                              <TableHead className="text-right text-gray-400">Units</TableHead>
                              <TableHead className="text-right text-gray-400">%</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow className="border-gray-700">
                              <TableCell>North America</TableCell>
                              <TableCell className="text-right">2,202</TableCell>
                              <TableCell className="text-right">42%</TableCell>
                            </TableRow>
                            <TableRow className="border-gray-700">
                              <TableCell>Europe</TableCell>
                              <TableCell className="text-right">1,468</TableCell>
                              <TableCell className="text-right">28%</TableCell>
                            </TableRow>
                            <TableRow className="border-gray-700">
                              <TableCell>Asia</TableCell>
                              <TableCell className="text-right">944</TableCell>
                              <TableCell className="text-right">18%</TableCell>
                            </TableRow>
                            <TableRow className="border-gray-700">
                              <TableCell>Australia</TableCell>
                              <TableCell className="text-right">367</TableCell>
                              <TableCell className="text-right">7%</TableCell>
                            </TableRow>
                            <TableRow className="border-gray-700">
                              <TableCell>Other</TableCell>
                              <TableCell className="text-right">262</TableCell>
                              <TableCell className="text-right">5%</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-3">Regional Growth</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>North America</span>
                              <span className="text-green-500">+24%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-[#F0B90B]" style={{ width: "24%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Europe</span>
                              <span className="text-green-500">+18%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-[#F0B90B]" style={{ width: "18%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Asia</span>
                              <span className="text-green-500">+36%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-[#F0B90B]" style={{ width: "36%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Australia</span>
                              <span className="text-green-500">+9%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-[#F0B90B]" style={{ width: "9%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="buyers">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#12171E] rounded-md p-3">
                          <div className="text-xs text-gray-500 mb-1">Repeat Buyers</div>
                          <div className="text-2xl font-bold text-white">24%</div>
                          <div className="text-xs text-green-500">+2.1% vs. last month</div>
                        </div>
                        <div className="bg-[#12171E] rounded-md p-3">
                          <div className="text-xs text-gray-500 mb-1">Avg. Order Value</div>
                          <div className="text-2xl font-bold text-white">$125.35</div>
                          <div className="text-xs text-red-500">-0.4% vs. last month</div>
                        </div>
                        <div className="bg-[#12171E] rounded-md p-3">
                          <div className="text-xs text-gray-500 mb-1">Return Rate</div>
                          <div className="text-2xl font-bold text-white">3.7%</div>
                          <div className="text-xs text-green-500">-0.8% vs. last month</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-3">Customer Age Distribution</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>18-24 years</span>
                              <span>18%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-[#F0B90B]" style={{ width: "18%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>25-34 years</span>
                              <span>42%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-[#F0B90B]" style={{ width: "42%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>35-44 years</span>
                              <span>25%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-[#F0B90B]" style={{ width: "25%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>45+ years</span>
                              <span>15%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-[#F0B90B]" style={{ width: "15%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Back button for mobile */}
            <div className="flex justify-center mt-6 md:hidden">
              <Link to={`/product/${id}`}>
                <Button variant="outline" className="bg-transparent border-gray-700 hover:bg-gray-800 text-gray-200">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Product Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSales;
