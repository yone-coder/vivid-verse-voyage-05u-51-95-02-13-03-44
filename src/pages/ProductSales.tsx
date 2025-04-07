
import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useProductAnalytics } from "@/hooks/useProduct";

// Sample chart component for sales data
const SalesChart: React.FC<{ data: number[] }> = ({ data }) => {
  return (
    <div className="h-60 w-full bg-slate-50 rounded flex items-end p-2 space-x-[2px]">
      {data.map((value, i) => (
        <div 
          key={i} 
          className="flex-1 bg-blue-200 hover:bg-blue-300 transition-colors rounded-sm" 
          style={{ height: `${Math.min(100, value * 2)}%` }}
          title={`Day ${i+1}: ${value} units`}
        />
      ))}
    </div>
  );
};

// Sales metrics card component
const MetricCard: React.FC<{ title: string; value: string | number; trend?: string; color?: string }> = ({ 
  title, value, trend, color = "blue" 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <p className="text-sm text-muted-foreground">{title}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
          {trend && (
            <Badge variant={trend.startsWith('+') ? "success" : "destructive"} className="text-xs">
              {trend}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ProductSales: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { data: analytics, isLoading } = useProductAnalytics(id || "nebula-pro-2025");
  
  // Sample data for demonstration
  const dailySales = [12,18,15,22,24,19,17,20,22,27,29,24,20,25,28,30,32,26,24,22,28,33,38,42,45,41,39,35,32,30];
  const totalSales = 5000;
  const monthlySales = {
    current: 842,
    previous: 350,
    growth: '+140%',
  };
  const weeklyAverage = 196;
  const peakSalesDay = "Saturday";
  const conversionRate = "4.2%";
  
  // Regional sales data
  const topRegions = [
    { region: "North America", percentage: 42 },
    { region: "Europe", percentage: 28 },
    { region: "Asia", percentage: 18 },
    { region: "Australia", percentage: 7 },
    { region: "South America", percentage: 3 },
    { region: "Africa", percentage: 2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto p-4 flex items-center">
          <Link to={`/product/${id}`}>
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Product
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Sales Statistics</h1>
        </div>
      </div>
      
      <div className="container max-w-6xl mx-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <p>Loading sales data...</p>
          </div>
        ) : (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <MetricCard 
                title="Total Sales" 
                value={totalSales.toLocaleString()} 
                color="blue"
              />
              <MetricCard 
                title="Monthly Sales" 
                value={monthlySales.current} 
                trend={monthlySales.growth}
                color="green"
              />
              <MetricCard 
                title="Weekly Average" 
                value={weeklyAverage} 
                color="purple"
              />
              <MetricCard 
                title="Conversion Rate" 
                value={conversionRate} 
                color="orange"
              />
            </div>
            
            {/* Sales Chart */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Sales History (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <SalesChart data={dailySales} />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1 Apr</span>
                  <span>15 Apr</span>
                  <span>30 Apr</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Top Regions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Top Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRegions.map((region, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-32 text-sm">{region.region}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-400 rounded-full" 
                          style={{ width: `${region.percentage}%` }}
                        ></div>
                      </div>
                      <span className="w-12 text-right text-sm">{region.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Day of Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Peak Sales Day:</span>
                      <span className="font-bold">{peakSalesDay}</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 h-20">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                        <div key={day} className="flex flex-col items-center">
                          <div 
                            className={`w-full ${day === peakSalesDay ? 'bg-blue-500' : 'bg-blue-200'} rounded-sm`} 
                            style={{ height: `${50 + (i * 10)}%` }}
                          ></div>
                          <span className="text-xs mt-1">{day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Purchase Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Repeat Customers</span>
                      <span className="font-medium">24%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg. Order Value</span>
                      <span className="font-medium">$27.42</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Bundle Purchases</span>
                      <span className="font-medium">31%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Return Rate</span>
                      <span className="font-medium">3.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSales;
