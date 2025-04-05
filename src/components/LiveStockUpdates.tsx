
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Clock, Users, TrendingUp } from "lucide-react";

interface LiveStockUpdatesProps {
  initialStock: number;
  highDemand?: boolean;
}

const LiveStockUpdates: React.FC<LiveStockUpdatesProps> = ({ 
  initialStock, 
  highDemand = false 
}) => {
  const [currentStock, setCurrentStock] = useState(initialStock);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [recentPurchases, setRecentPurchases] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeViewers, setActiveViewers] = useState(Math.floor(Math.random() * 15) + 8);
  
  // Calculate stock percentage
  const stockPercentage = Math.min(100, Math.max(5, (currentStock / 300) * 100));
  const isLowStock = currentStock < 50;
  
  useEffect(() => {
    // Simulate random stock updates
    const stockInterval = setInterval(() => {
      // 30% chance of stock decrease by 1-3 units
      if (Math.random() < 0.3) {
        const decrease = Math.floor(Math.random() * 3) + 1;
        setCurrentStock(prev => Math.max(5, prev - decrease));
        setRecentPurchases(prev => prev + decrease);
        setLastUpdate(new Date());
        
        // Flash update animation
        setIsUpdating(true);
        setTimeout(() => setIsUpdating(false), 1000);
      }
    }, 15000); // Check every 15 seconds
    
    // Simulate viewers count fluctuation
    const viewersInterval = setInterval(() => {
      const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      setActiveViewers(prev => Math.max(5, Math.min(30, prev + change)));
    }, 8000);
    
    return () => {
      clearInterval(stockInterval);
      clearInterval(viewersInterval);
    }
  }, []);

  return (
    <div className={`mt-3 p-3 rounded-md border ${isLowStock ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'} ${isUpdating ? 'animate-pulse' : ''}`}>
      <div className="flex justify-between items-center mb-1.5">
        <div className="text-sm font-medium flex items-center">
          {isLowStock ? (
            <>
              <AlertTriangle className="h-4 w-4 mr-1.5 text-red-500" />
              <span className="text-red-700">Low Stock Alert!</span>
            </>
          ) : (
            <>
              <Clock className="h-4 w-4 mr-1.5 text-amber-500" />
              <span className="text-amber-700">Stock Selling Fast</span>
            </>
          )}
        </div>
        <span className="text-xs text-gray-600">
          {currentStock} units left
        </span>
      </div>
      
      <Progress value={stockPercentage} className="h-1.5" />
      
      <div className="flex justify-between mt-2">
        <div className="flex items-center text-xs text-gray-600">
          <Clock className="h-3.5 w-3.5 mr-1 text-gray-500" />
          <span>Updated {Math.floor((new Date().getTime() - lastUpdate.getTime()) / 60000)} mins ago</span>
        </div>
        {recentPurchases > 0 && (
          <div className="font-medium text-xs text-red-600 flex items-center">
            <TrendingUp className="h-3.5 w-3.5 mr-1" />
            {recentPurchases} sold recently
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <div className="text-xs flex items-center text-blue-600">
          <Users className="h-3.5 w-3.5 mr-1 text-blue-500" />
          <span>{activeViewers} people viewing now</span>
        </div>
        
        {highDemand && (
          <div className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
            High demand
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveStockUpdates;
