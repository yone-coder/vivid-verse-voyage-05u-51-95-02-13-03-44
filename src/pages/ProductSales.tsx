
import React from "react";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  LineChart, 
  Calendar, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  MapPin, 
  Clock, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useProductAnalytics } from "@/hooks/useProduct";
import { useToast } from "@/hooks/use-toast";

const MetricBadge: React.FC<{ value: string | number; trend?: string; color?: string; icon?: React.ReactNode }> = ({ 
  value, trend, color = "blue", icon
}) => {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-${color}-50 border border-${color}-100`}>
      {icon}
      <span className={`font-medium text-${color}-600`}>{value}</span>
      {trend && (
        <Badge variant={trend.startsWith('+') ? "outline" : "destructive"} className="text-xs ml-1">
          {trend}
        </Badge>
      )}
    </div>
  );
};

const SalesChart: React.FC<{ data: number[] }> = ({ data }) => {
  const max = Math.max(...data);
  
  return (
    <div className="h-32 w-full flex items-end justify-between gap-0.5 p-2">
      {data.map((value, i) => (
        <div 
          key={i} 
          className="relative group flex-1"
        >
          <div
            className="bg-blue-400 hover:bg-blue-500 transition-colors rounded-sm"
            style={{ height: `${Math.max(4, (value / max) * 100)}%` }}
          />
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-black text-white rounded px-1.5 py-0.5 whitespace-nowrap">
            {value} units
          </span>
        </div>
      ))}
    </div>
  );
};

const WeeklyChart: React.FC<{ data: {day: string; value: number}[] }> = ({ data }) => {
  const max = Math.max(...data.map(d => d.value));
  
  return (
    <div className="mt-2 flex items-end justify-between gap-2">
      {data.map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div 
            className={`w-8 rounded-t-sm transition-colors ${item.value === max ? 'bg-blue-500' : 'bg-blue-200'}`} 
            style={{ height: `${Math.max(15, (item.value / max) * 70)}px` }}
          />
          <span className="text-xs mt-1 text-gray-500">{item.day}</span>
        </div>
      ))}
    </div>
  );
};

const FunnelChart: React.FC<{ data: {label: string; value: number; color: string}[] }> = ({ data }) => {
  const max = Math.max(...data.map(d => d.value));
  
  return (
    <div className="space-y-3 mt-4">
      {data.map((item, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{item.label}</span>
            <span className="font-medium">{item.value.toLocaleString()}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-${item.color}-400 rounded-full`} 
              style={{ width: `${(item.value / max) * 100}%` }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const HourlyHeatmap: React.FC<{ data: number[][] }> = ({ data }) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const max = Math.max(...data.flat());
  
  return (
    <div className="mt-4">
      <div className="mb-1 flex">
        <div className="w-8" />
        {[0, 6, 12, 18, 23].map(hour => (
          <div key={hour} className="flex-1 text-center text-xs text-gray-500">
            {hour}:00
          </div>
        ))}
      </div>
      {data.map((hours, dayIndex) => (
        <div key={dayIndex} className="flex items-center h-6 mb-1">
          <div className="w-8 text-xs text-gray-500">{daysOfWeek[dayIndex]}</div>
          <div className="flex-1 flex">
            {hours.map((value, hourIndex) => (
              <div 
                key={hourIndex}
                className="flex-1 h-full"
                style={{
                  backgroundColor: `rgba(59, 130, 246, ${Math.max(0.1, value / max)})`,
                  border: '0.5px solid white'
                }}
                title={`${daysOfWeek[dayIndex]} ${hourIndex}:00 - ${value} sales`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ProductSales: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { data: analytics, isLoading } = useProductAnalytics(id || "nebula-pro-2025");
  
  // Sample data for demonstration
  const dailySales = [12,18,15,22,24,19,17,20,22,27,29,24,20,25,28,30,32,26,24,22,28,33,38,42,45,41,39,35,32,30];
  const totalSales = 5243;
  
  const monthData = {
    current: 842,
    previous: 350,
    growth: '+140%',
  };
  
  const weeklyAverage = 196;
  const conversionRate = "4.2%";
  
  // Weekly data
  const weeklyData = [
    {day: "Mon", value: 156},
    {day: "Tue", value: 142},
    {day: "Wed", value: 164},
    {day: "Thu", value: 178},
    {day: "Fri", value: 196},
    {day: "Sat", value: 232},
    {day: "Sun", value: 189}
  ];
  
  // Sales funnel data
  const funnelData = [
    {label: "Product Views", value: 24680, color: "blue"},
    {label: "Add to Cart", value: 8245, color: "green"},
    {label: "Checkout Started", value: 6120, color: "amber"},
    {label: "Purchases", value: 5243, color: "red"}
  ];
  
  // Regional sales data
  const topRegions = [
    { region: "North America", percentage: 42, count: 2202 },
    { region: "Europe", percentage: 28, count: 1468 },
    { region: "Asia", percentage: 18, count: 944 },
    { region: "Australia", percentage: 7, count: 367 },
    { region: "South America", percentage: 3, count: 157 },
    { region: "Africa", percentage: 2, count: 105 },
  ];
  
  // Sample hourly sales heatmap
  const hourlyData = Array(7).fill(0).map(() => 
    Array(24).fill(0).map(() => Math.floor(Math.random() * 12))
  );
  
  // Monthly data
  const monthlyComparison = [
    { month: "Jan", thisYear: 642, lastYear: 520 },
    { month: "Feb", thisYear: 756, lastYear: 610 },
    { month: "Mar", thisYear: 824, lastYear: 590 },
    { month: "Apr", thisYear: 842, lastYear: 640 },
    { month: "May", thisYear: 0, lastYear: 720 },
    { month: "Jun", thisYear: 0, lastYear: 680 },
  ];
  
  // Customer demographics
  const customerAge = [
    { range: "18-24", percentage: 18 },
    { range: "25-34", percentage: 42 },
    { range: "35-44", percentage: 25 },
    { range: "45-54", percentage: 10 },
    { range: "55+", percentage: 5 },
  ];
  
  // Generate date labels for the last 30 days
  const getDateLabels = () => {
    const today = new Date();
    const labels = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      labels.push(date.getDate());
    }
    return labels;
  };
  
  const dateLabels = getDateLabels();

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to={`/product/${id}`}>
              <Button variant="ghost" size="sm" className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-lg font-medium">Sales Statistics</h1>
          </div>
          <div className="flex items-center gap-2">
            <MetricBadge 
              value={totalSales.toLocaleString()} 
              icon={<ShoppingBag className="h-4 w-4 text-blue-500" />}
              color="blue"
            />
            <MetricBadge 
              value={monthData.growth} 
              icon={<TrendingUp className="h-4 w-4 text-green-500" />}
              color="green"
            />
          </div>
        </div>
      </div>
      
      <div className="container max-w-6xl mx-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <p>Loading sales data...</p>
          </div>
        ) : (
          <>
            {/* Main summary card */}
            <Card className="mb-4 border-none shadow-sm overflow-hidden">
              <CardHeader className="pb-0 pt-4 px-4 flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-medium">Sales Overview</CardTitle>
                  <p className="text-sm text-gray-500">Last 30 days statistics</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="flex gap-1 items-center">
                    <LineChart className="h-3 w-3" />
                    +12.5% from last month
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 px-4 pb-2">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{totalSales.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Total Units</div>
                  </div>
                  <SalesChart data={dailySales} />
                  <div className="flex justify-between text-xs text-gray-500 px-2 pt-1">
                    {[1, 10, 20, 30].map(day => (
                      <span key={day}>Apr {day}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Navigation */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="bg-white border p-0.5 mb-4 h-9">
                <TabsTrigger value="overview" className="text-sm h-8">Overview</TabsTrigger>
                <TabsTrigger value="demographics" className="text-sm h-8">Demographics</TabsTrigger>
                <TabsTrigger value="regions" className="text-sm h-8">Regions</TabsTrigger>
                <TabsTrigger value="timing" className="text-sm h-8">Timing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                {/* Statistical Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card className="border-none shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Monthly Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-2xl font-bold">{monthData.current}</p>
                            <p className="text-xs text-gray-500">Current Month</p>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-gray-600">{monthData.previous}</p>
                            <p className="text-xs text-gray-500">Previous Month</p>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-green-600">{monthData.growth}</p>
                            <p className="text-xs text-gray-500">Growth</p>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <p className="text-xs mb-1 text-gray-500">Year-over-Year Comparison</p>
                          <div className="flex items-end h-32 gap-1 mt-2">
                            {monthlyComparison.map((item, i) => (
                              <div key={i} className="flex-1 flex flex-col items-center">
                                <div className="w-full flex flex-col items-center gap-0.5">
                                  {item.thisYear > 0 && (
                                    <div 
                                      className="w-full bg-blue-500 rounded-t-sm"
                                      style={{ height: `${item.thisYear / 10}px` }}
                                      title={`${item.month} ${new Date().getFullYear()}: ${item.thisYear}`}
                                    />
                                  )}
                                  <div 
                                    className="w-full bg-gray-300"
                                    style={{ height: `${item.lastYear / 10}px` }}
                                    title={`${item.month} ${new Date().getFullYear() - 1}: ${item.lastYear}`}
                                  />
                                </div>
                                <span className="text-xs mt-1 text-gray-500">{item.month}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center justify-end gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-blue-500"></div>
                              <span className="text-xs text-gray-500">{new Date().getFullYear()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-gray-300"></div>
                              <span className="text-xs text-gray-500">{new Date().getFullYear() - 1}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Sales Funnel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-baseline mb-4">
                        <div>
                          <p className="text-2xl font-bold">{conversionRate}</p>
                          <p className="text-xs text-gray-500">Conversion Rate</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100">
                            +0.8% vs last month
                          </Badge>
                        </div>
                      </div>
                      
                      <FunnelChart data={funnelData} />
                    </CardContent>
                  </Card>
                </div>
                
                {/* Weekly Performance */}
                <Card className="border-none shadow-sm mb-6">
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium text-gray-500">Weekly Performance</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex gap-1 items-center">
                          <Calendar className="h-3 w-3" />
                          This Week
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <div>
                        <p className="text-2xl font-bold">{weeklyAverage}</p>
                        <p className="text-xs text-gray-500">Daily Average</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold">{weeklyData[5].value}</p>
                        <p className="text-xs text-gray-500">Peak (Saturday)</p>
                      </div>
                    </div>
                    
                    <WeeklyChart data={weeklyData} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="demographics">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card className="border-none shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Customer Age Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mt-2">
                        {customerAge.map((item, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{item.range} years</span>
                              <span className="font-medium">{item.percentage}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-400 rounded-full" 
                                style={{ width: `${item.percentage}%` }} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-baseline">
                          <div>
                            <p className="text-sm font-medium">Average Customer Age</p>
                            <p className="text-2xl font-bold">34</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">Repeat Customers</p>
                            <p className="text-2xl font-bold">24%</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Purchase Behavior</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 border-r pr-4">
                          <div>
                            <p className="text-xs text-gray-500">Avg. Order Value</p>
                            <p className="text-2xl font-bold">$27.42</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Bundle Purchases</p>
                            <p className="text-2xl font-bold">31%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Return Rate</p>
                            <p className="text-2xl font-bold">3.7%</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs text-gray-500 mb-2">Device Used</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Mobile</span>
                            <span className="text-xs font-medium">76%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-400 rounded-full" style={{ width: "76%" }} />
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs">Desktop</span>
                            <span className="text-xs font-medium">18%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-400 rounded-full" style={{ width: "18%" }} />
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs">Tablet</span>
                            <span className="text-xs font-medium">6%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-400 rounded-full" style={{ width: "6%" }} />
                          </div>
                          
                          <div className="mt-4 pt-2 border-t">
                            <p className="text-xs text-gray-500 mb-1">Payment Methods</p>
                            <div className="flex gap-2 flex-wrap">
                              <Badge variant="outline" className="bg-gray-50">Credit Card (64%)</Badge>
                              <Badge variant="outline" className="bg-gray-50">PayPal (21%)</Badge>
                              <Badge variant="outline" className="bg-gray-50">Others (15%)</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="border-none shadow-sm mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Product Rating Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">4.8</span>
                            <div className="flex text-amber-400 text-sm">
                              {'★'.repeat(5)}
                            </div>
                          </div>
                          <Badge className="bg-blue-100 hover:bg-blue-100 text-blue-600 border-blue-200">
                            3,256 Reviews
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs w-12">5 stars</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: '82%' }}></div>
                            </div>
                            <span className="text-xs text-gray-500">82%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs w-12">4 stars</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: '12%' }}></div>
                            </div>
                            <span className="text-xs text-gray-500">12%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs w-12">3 stars</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: '4%' }}></div>
                            </div>
                            <span className="text-xs text-gray-500">4%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs w-12">2 stars</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: '1%' }}></div>
                            </div>
                            <span className="text-xs text-gray-500">1%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs w-12">1 star</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: '1%' }}></div>
                            </div>
                            <span className="text-xs text-gray-500">1%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 border-l pl-6">
                        <p className="text-sm font-medium mb-2">Most Mentioned Features</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Quality</span>
                            <span className="text-xs font-medium">92% positive</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 rounded-full" style={{ width: "92%" }} />
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs">Battery Life</span>
                            <span className="text-xs font-medium">88% positive</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 rounded-full" style={{ width: "88%" }} />
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs">Design</span>
                            <span className="text-xs font-medium">94% positive</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 rounded-full" style={{ width: "94%" }} />
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs">Value</span>
                            <span className="text-xs font-medium">78% positive</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 rounded-full" style={{ width: "78%" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="regions">
                <Card className="border-none shadow-sm mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Regional Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Region</TableHead>
                                <TableHead className="text-right">Sales</TableHead>
                                <TableHead className="text-right">%</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {topRegions.map((region) => (
                                <TableRow key={region.region}>
                                  <TableCell>{region.region}</TableCell>
                                  <TableCell className="text-right">{region.count.toLocaleString()}</TableCell>
                                  <TableCell className="text-right">{region.percentage}%</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        
                        <div>
                          <p className="font-medium mb-2 text-sm">Top Regions</p>
                          <div className="space-y-3">
                            {topRegions.slice(0, 5).map((region, index) => (
                              <div key={index} className="flex items-center">
                                <span className="w-32 text-sm">{region.region}</span>
                                <div className="flex-1">
                                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${index === 0 ? 'bg-blue-500' : 'bg-blue-400'} rounded-full`} 
                                      style={{ width: `${region.percentage}%` }}
                                    />
                                  </div>
                                </div>
                                <span className="w-12 text-right text-sm">{region.percentage}%</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-6">
                            <p className="font-medium mb-2 text-sm">Top Cities</p>
                            <div className="space-y-1">
                              <div className="flex justify-between items-center text-sm">
                                <span>New York, USA</span>
                                <span className="font-medium">342 units</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span>London, UK</span>
                                <span className="font-medium">286 units</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span>Tokyo, Japan</span>
                                <span className="font-medium">254 units</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span>Berlin, Germany</span>
                                <span className="font-medium">198 units</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span>Sydney, Australia</span>
                                <span className="font-medium">175 units</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-4 text-sm">Growth by Region (Last 3 Months)</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="rounded-lg border p-3">
                            <div className="text-xs text-gray-500 mb-1">North America</div>
                            <div className="text-lg font-bold">+24%</div>
                            <div className="mt-2 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-500">Growing</span>
                            </div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <div className="text-xs text-gray-500 mb-1">Europe</div>
                            <div className="text-lg font-bold">+18%</div>
                            <div className="mt-2 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-500">Growing</span>
                            </div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <div className="text-xs text-gray-500 mb-1">Asia</div>
                            <div className="text-lg font-bold">+36%</div>
                            <div className="mt-2 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-500">Fast Growth</span>
                            </div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <div className="text-xs text-gray-500 mb-1">Australia</div>
                            <div className="text-lg font-bold">+9%</div>
                            <div className="mt-2 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-500">Steady</span>
                            </div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <div className="text-xs text-gray-500 mb-1">South America</div>
                            <div className="text-lg font-bold">+42%</div>
                            <div className="mt-2 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-500">Fast Growth</span>
                            </div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <div className="text-xs text-gray-500 mb-1">Africa</div>
                            <div className="text-lg font-bold">+61%</div>
                            <div className="mt-2 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-500">Fast Growth</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="timing">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card className="border-none shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Sales by Day of Week</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Peak Sales Day</p>
                          <p className="text-lg font-bold">Saturday</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Lowest Sales Day</p>
                          <p className="text-lg font-bold">Tuesday</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Day Variance</p>
                          <p className="text-lg font-bold">±24%</p>
                        </div>
                      </div>
                      
                      <WeeklyChart data={weeklyData} />
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Sales by Time of Day</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Peak Sales Hours</p>
                          <p className="text-lg font-bold">19:00 - 22:00</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Average Purchase Time</p>
                          <p className="text-lg font-bold">20:14</p>
                        </div>
                      </div>
                      
                      <div className="h-32 w-full bg-gray-50 rounded flex items-end p-2 space-x-[2px]">
                        {Array(24).fill(0).map((_, hour) => {
                          const height = 20 + Math.sin((hour / 24) * Math.PI * 2) * 50 + Math.random() * 20;
                          return (
                            <div 
                              key={hour} 
                              className="flex-1 bg-blue-200 hover:bg-blue-300 transition-colors rounded-sm" 
                              style={{ height: `${height}%` }}
                              title={`${hour}:00: ${Math.round(height / 2)} sales`}
                            />
                          )
                        })}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>00:00</span>
                        <span>06:00</span>
                        <span>12:00</span>
                        <span>18:00</span>
                        <span>23:59</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="border-none shadow-sm mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Hourly Sales Heatmap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <HourlyHeatmap data={hourlyData} />
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Peak Sales Time</p>
                        <p className="font-medium">Saturday, 20:00</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-blue-100"></div>
                          <span className="text-xs text-gray-500">Low</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-blue-300"></div>
                          <span className="text-xs text-gray-500">Medium</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-blue-500"></div>
                          <span className="text-xs text-gray-500">High</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-sm mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Seasonal Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-md bg-amber-100 flex items-center justify-center">
                          <Calendar className="h-8 w-8 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">Upcoming Peak Season</p>
                          <p className="text-sm text-gray-500">Sales typically increase by 45-60% during November-December</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Monthly Distribution (Last Year)</p>
                        <div className="h-20 w-full bg-gray-50 rounded flex items-end p-2 space-x-[1px]">
                          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, i) => {
                            const height = 20 + Math.sin((i / 12) * Math.PI * 2) * 30 + Math.random() * 20;
                            const isHighSeason = i >= 9;  // Oct-Dec
                            
                            return (
                              <div 
                                key={month} 
                                className={`flex-1 ${isHighSeason ? 'bg-amber-300' : 'bg-blue-200'} hover:opacity-80 transition-opacity rounded-sm`}
                                style={{ height: `${Math.max(5, height)}%` }}
                                title={`${month}: ${Math.round(height * 3)} sales`}
                              />
                            )
                          })}
                        </div>
                        <div className="grid grid-cols-12 text-[10px] text-gray-500 mt-1">
                          {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((month) => (
                            <span key={month} className="text-center">{month}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 mt-2 justify-end">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-200"></div>
                            <span className="text-xs text-gray-500">Regular season</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-amber-300"></div>
                            <span className="text-xs text-gray-500">Peak season</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Back Button */}
            <div className="flex justify-center mt-8">
              <Link to={`/product/${id}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Product Details
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSales;
