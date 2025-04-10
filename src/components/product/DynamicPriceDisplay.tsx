import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Bell, 
  Heart, 
  TrendingUp, 
  AlertTriangle, 
  Star,
  ArrowUp,
  ArrowDown,
  Calendar,
  ChartLineIcon,
  ChartBarIcon,
  Cog,
  ArrowUpRight,
  ArrowDownRight,
  Maximize2,
  Share2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
  Brush
} from 'recharts';
import { 
  Tabs, 
  TabsContent, 
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface PriceHistoryPoint {
  day: string;
  price: number;
  volume?: number;
  date?: string;
  average?: number;
}

const timeRanges = [
  { label: '7D', value: '7d' },
  { label: '1M', value: '1m' },
  { label: '3M', value: '3m' },
  { label: '6M', value: '6m' },
  { label: '1Y', value: '1y' },
  { label: 'All', value: 'all' }
];

const DynamicPriceDisplay = () => {
  const [currentPrice, setCurrentPrice] = useState(149.99);
  const [originalPrice, setOriginalPrice] = useState(199.99);
  const [previousPrice, setPreviousPrice] = useState(145.99);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryPoint[]>([
    { day: '7d', price: 147.99, volume: 125, date: '2025-04-03' },
    { day: '6d', price: 151.20, volume: 198, date: '2025-04-04' },
    { day: '5d', price: 148.50, volume: 156, date: '2025-04-05' },
    { day: '4d', price: 146.75, volume: 210, date: '2025-04-06' },
    { day: '3d', price: 149.30, volume: 173, date: '2025-04-07' },
    { day: '2d', price: 150.25, volume: 189, date: '2025-04-08' },
    { day: '1d', price: 149.99, volume: 230, date: '2025-04-09' }
  ]);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [timeRange, setTimeRange] = useState('7d');
  const [chartType, setChartType] = useState('line');
  const [showVolume, setShowVolume] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [priceChangePercentage, setPriceChangePercentage] = useState<number>(0);
  const [isPositiveChange, setIsPositiveChange] = useState<boolean>(true);
  
  const discountPercentage = useMemo(() => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }, [originalPrice, currentPrice]);
  
  const lowestPrice = Math.min(...priceHistory.map(item => item.price), currentPrice);
  const highestPrice = Math.max(...priceHistory.map(item => item.price), currentPrice);
  
  const chartConfig = {
    price: {
      label: "Price",
      theme: {
        light: "#3b82f6",
        dark: "#60a5fa"
      }
    },
    volume: {
      label: "Volume",
      theme: {
        light: "#9ca3af",
        dark: "#d1d5db"
      }
    },
    average: {
      label: "Average",
      theme: {
        light: "#f97316",
        dark: "#fb923c"
      }
    },
    refLine: {
      label: "Current",
      theme: {
        light: "#ef4444",
        dark: "#f87171"
      }
    }
  };
  
  const getCurrencySymbol = (curr: string) => {
    switch(curr) {
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'JPY': return '¥';
      default: return '$';
    }
  };
  
  useEffect(() => {
    const generateExtendedPriceHistory = () => {
      const now = new Date();
      let days = 7;
      
      switch(timeRange) {
        case '1m': days = 30; break;
        case '3m': days = 90; break;
        case '6m': days = 180; break;
        case '1y': days = 365; break;
        case 'all': days = 730; break;
        default: days = 7;
      }
      
      const basePrice = 145 + Math.random() * 10;
      const volatility = timeRange === '7d' ? 3 : timeRange === '1m' ? 5 : 10;
      const data: PriceHistoryPoint[] = [];
      
      for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        const trendFactor = Math.sin(i / (days / 3)) * (volatility / 2);
        const randomFactor = (Math.random() - 0.5) * volatility;
        const datePrice = basePrice + trendFactor + randomFactor;
        
        const volume = Math.round(100 + Math.random() * 200);
        
        data.push({
          day: i === 0 ? 'Now' : `${i}d`,
          price: parseFloat(datePrice.toFixed(2)),
          volume,
          date: date.toISOString().split('T')[0]
        });
      }
      
      return data;
    };
    
    const newData = generateExtendedPriceHistory();
    setPriceHistory(newData);
    
    if (newData.length >= 2) {
      const latestPrice = newData[newData.length - 1].price;
      const previousPrice = newData[newData.length - 2].price;
      const change = latestPrice - previousPrice;
      const changePercentage = (change / previousPrice) * 100;
      
      setPriceChange(parseFloat(change.toFixed(2)));
      setPriceChangePercentage(parseFloat(changePercentage.toFixed(2)));
      setIsPositiveChange(change >= 0);
    }
  }, [timeRange]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() - 0.5) * 4;
      const newPrice = Math.max(parseFloat((currentPrice + fluctuation).toFixed(2)), 120);
      
      setPreviousPrice(currentPrice);
      setCurrentPrice(newPrice);
      
      const change = newPrice - currentPrice;
      const changePercentage = (change / currentPrice) * 100;
      setPriceChange(parseFloat(change.toFixed(2)));
      setPriceChangePercentage(parseFloat(changePercentage.toFixed(2)));
      setIsPositiveChange(change >= 0);
      
      setPriceHistory(prev => {
        const now = new Date();
        const updatedHistory = [...prev.slice(1), { 
          day: 'Now', 
          price: currentPrice,
          volume: Math.round(100 + Math.random() * 200),
          date: now.toISOString().split('T')[0]
        }];
        
        for (let i = 0; i < updatedHistory.length - 1; i++) {
          updatedHistory[i].day = `${updatedHistory.length - i - 1}d`;
        }
        return updatedHistory;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentPrice]);
  
  const movingAverage = useMemo(() => {
    const period = 3;
    const result = [...priceHistory];
    
    for (let i = period - 1; i < result.length; i++) {
      const sum = priceHistory
        .slice(i - period + 1, i + 1)
        .reduce((total, item) => total + item.price, 0);
      result[i] = { 
        ...result[i], 
        average: parseFloat((sum / period).toFixed(2)) 
      };
    }
    
    return result;
  }, [priceHistory]);
  
  const isGoodDeal = currentPrice <= (lowestPrice * 1.03);
  
  const priceStats = useMemo(() => {
    const prices = priceHistory.map(item => item.price);
    
    const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - avg, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);
    
    const volatility = (stdDev / avg) * 100;
    
    return {
      avg: parseFloat(avg.toFixed(2)),
      stdDev: parseFloat(stdDev.toFixed(2)),
      volatility: parseFloat(volatility.toFixed(2))
    };
  }, [priceHistory]);
  
  const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded">
          <p className="font-medium text-sm">{data.date || data.day}</p>
          <div className="text-xs space-y-1 mt-1">
            <p className="flex items-center justify-between">
              <span className="text-gray-500">Price:</span>
              <span className="text-blue-600 font-mono font-medium">
                {getCurrencySymbol(currency)}{data.price.toFixed(2)}
              </span>
            </p>
            
            {data.average && (
              <p className="flex items-center justify-between">
                <span className="text-gray-500">Avg:</span>
                <span className="text-orange-500 font-mono font-medium">
                  {getCurrencySymbol(currency)}{data.average.toFixed(2)}
                </span>
              </p>
            )}
            
            {data.volume && (
              <p className="flex items-center justify-between">
                <span className="text-gray-500">Volume:</span>
                <span className="text-gray-600 font-mono font-medium">{data.volume}</span>
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };
  
  const priceTableData = useMemo(() => {
    return [...priceHistory].reverse().map((item, index) => ({
      ...item,
      change: index < priceHistory.length - 1 
        ? item.price - priceHistory[priceHistory.length - index - 2].price 
        : 0,
      changePercent: index < priceHistory.length - 1
        ? ((item.price - priceHistory[priceHistory.length - index - 2].price) / 
           priceHistory[priceHistory.length - index - 2].price) * 100
        : 0
    }));
  }, [priceHistory]);
  
  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart data={movingAverage}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={false}
          />
          <YAxis 
            domain={['auto', 'auto']}
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={false}
            tickFormatter={(value) => `${getCurrencySymbol(currency)}${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine 
            y={currentPrice} 
            stroke="#ef4444" 
            strokeDasharray="3 3" 
            label={{ 
              value: 'Current', 
              position: 'insideBottomRight',
              fontSize: 10,
              fill: '#ef4444'
            }} 
          />
          <Line 
            name="Price"
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3, fill: "#3b82f6", stroke: "#3b82f6" }}
            activeDot={{ r: 5, fill: "#1d4ed8", stroke: "#3b82f6" }}
            isAnimationActive={false}
          />
          <Line 
            name="3-Day Avg"
            type="monotone"
            dataKey="average"
            stroke="#f97316"
            strokeWidth={1.5}
            dot={false}
            activeDot={false}
            strokeDasharray="5 5"
            isAnimationActive={false}
          />
          <Brush 
            dataKey="day" 
            height={20} 
            stroke="#3b82f6"
            fill="#f8fafc"
          />
        </LineChart>
      );
    } else if (chartType === 'bar') {
      return (
        <BarChart data={movingAverage}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={false}
          />
          <YAxis 
            domain={['auto', 'auto']}
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={false}
            tickFormatter={(value) => `${getCurrencySymbol(currency)}${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            name="Price"
            dataKey="price" 
            fill="#3b82f6" 
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
          />
          {showVolume && (
            <Bar 
              name="Volume"
              dataKey="volume" 
              fill="#9ca3af" 
              radius={[2, 2, 0, 0]} 
              isAnimationActive={false}
            />
          )}
        </BarChart>
      );
    } else {
      return (
        <AreaChart data={movingAverage}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={false}
          />
          <YAxis 
            domain={['auto', 'auto']}
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={false}
            tickFormatter={(value) => `${getCurrencySymbol(currency)}${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            name="Price"
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            fill="#93c5fd"
            fillOpacity={0.3}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
          <ReferenceLine 
            y={currentPrice} 
            stroke="#ef4444" 
            strokeDasharray="3 3" 
          />
          {showVolume && (
            <Area
              name="Volume"
              type="monotone"
              dataKey="volume"
              stroke="#9ca3af"
              fill="#e5e7eb"
              fillOpacity={0.3}
              isAnimationActive={false}
            />
          )}
        </AreaChart>
      );
    }
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-6">
          <div className="text-2xl font-bold text-red-500 animate-pulse">
            {getCurrencySymbol(currency)}{currentPrice.toFixed(2)}
          </div>
          <div className="text-gray-500 line-through text-sm">
            {getCurrencySymbol(currency)}{originalPrice.toFixed(2)}
          </div>
          <div className={`flex items-center text-xs font-medium ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
            {isPositiveChange ? (
              <ArrowUpRight size={14} className="mr-1" />
            ) : (
              <ArrowDownRight size={14} className="mr-1" />
            )}
            <span className="animate-pulse">{isPositiveChange ? '+' : ''}{priceChange} ({isPositiveChange ? '+' : ''}{priceChangePercentage}%)</span>
          </div>
          {discountPercentage !== 0 && (
            <div className="text-xs text-red-500">
              {discountPercentage > 0 ? `-${discountPercentage}%` : `+${Math.abs(discountPercentage)}%`}
            </div>
          )}
        </div>
        <button 
          onClick={() => setShowPriceHistory(!showPriceHistory)}
          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors text-blue-600"
          aria-label={showPriceHistory ? "Hide price history" : "Show price history"}
        >
          {showPriceHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      
      {showPriceHistory && (
        <div className="pt-3 border-t border-gray-100 mt-2 animate-accordion-down">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-800">Price History</h3>
            <div className="flex items-center space-x-2">
              <Select 
                value={timeRange} 
                onValueChange={(value) => setTimeRange(value)}
              >
                <SelectTrigger className="h-7 text-xs w-16">
                  <SelectValue placeholder="7D" />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex bg-gray-100 rounded-md p-0.5">
                <button 
                  onClick={() => setChartType('line')} 
                  className={`p-1 rounded-sm text-xs ${chartType === 'line' ? 'bg-white shadow-sm' : ''}`}
                >
                  <ChartLineIcon size={14} />
                </button>
                <button 
                  onClick={() => setChartType('bar')} 
                  className={`p-1 rounded-sm text-xs ${chartType === 'bar' ? 'bg-white shadow-sm' : ''}`}
                >
                  <ChartBarIcon size={14} />
                </button>
                <button 
                  onClick={() => setChartType('area')} 
                  className={`p-1 rounded-sm text-xs ${chartType === 'area' ? 'bg-white shadow-sm' : ''}`}
                >
                  <TrendingUp size={14} />
                </button>
                <button 
                  onClick={() => setChartType('table')} 
                  className={`p-1 rounded-sm text-xs ${chartType === 'table' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Calendar size={14} />
                </button>
              </div>
              <div className="flex space-x-1">
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <Cog size={14} className="text-gray-500" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <Share2 size={14} className="text-gray-500" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <Maximize2 size={14} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-gray-500">Low</div>
              <div className="font-medium">{getCurrencySymbol(currency)}{lowestPrice.toFixed(2)}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-gray-500">High</div>
              <div className="font-medium">{getCurrencySymbol(currency)}{highestPrice.toFixed(2)}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-gray-500">Avg</div>
              <div className="font-medium">{getCurrencySymbol(currency)}{priceStats.avg}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="text-xs text-gray-500">Volatility</div>
              <div className="font-medium">{priceStats.volatility}%</div>
            </div>
          </div>
          
          {chartType !== 'table' ? (
            <div className="mb-3">
              <div className="h-64 w-full">
                <ChartContainer
                  config={chartConfig}
                  className="h-full [&_.recharts-cartesian-grid-horizontal_line]:stroke-gray-200 [&_.recharts-cartesian-grid-vertical_line]:stroke-gray-200"
                >
                  {renderChart()}
                </ChartContainer>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-1">
                    <input 
                      type="checkbox" 
                      checked={showGrid} 
                      onChange={() => setShowGrid(!showGrid)} 
                      className="w-3 h-3"
                    />
                    <span>Grid</span>
                  </label>
                  
                  <label className="flex items-center space-x-1">
                    <input 
                      type="checkbox" 
                      checked={showVolume} 
                      onChange={() => setShowVolume(!showVolume)} 
                      className="w-3 h-3"
                    />
                    <span>Volume</span>
                  </label>
                </div>
                
                <div>
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    Export Data
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto mb-3">
              <Table className="text-xs">
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>% Change</TableHead>
                    <TableHead>Volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {priceTableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date || row.day}</TableCell>
                      <TableCell className="font-mono">{getCurrencySymbol(currency)}{row.price.toFixed(2)}</TableCell>
                      <TableCell className={`font-mono ${row.change > 0 ? 'text-green-600' : row.change < 0 ? 'text-red-600' : ''}`}>
                        {row.change > 0 ? '+' : ''}{row.change.toFixed(2)}
                      </TableCell>
                      <TableCell className={`font-mono ${row.changePercent > 0 ? 'text-green-600' : row.changePercent < 0 ? 'text-red-600' : ''}`}>
                        {row.changePercent > 0 ? '+' : ''}{row.changePercent.toFixed(2)}%
                      </TableCell>
                      <TableCell className="font-mono">{row.volume}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {isGoodDeal && (
            <div className="flex items-center space-x-1 bg-green-50 p-2 rounded-md mb-2 text-sm text-green-700">
              <Star size={16} className="text-yellow-500 mr-1" fill="#EAB308" />
              <span>Good deal! Near 30-day low price.</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2 text-xs text-gray-600 mb-3">
            <span>Currency:</span>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="border border-gray-200 rounded p-1 text-xs"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicPriceDisplay;
