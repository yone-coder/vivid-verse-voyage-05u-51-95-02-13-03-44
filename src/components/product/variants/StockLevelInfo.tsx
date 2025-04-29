
import React from "react";
import { AlertCircle, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export interface StockInfo {
  label: string;
  badgeColor: string;
  progressColor: string;
  icon: React.ReactNode;
  urgency: "high" | "medium" | "low" | "none";
  message: string;
}

interface StockLevelInfoProps {
  stockInfo: StockInfo;
  stock: number;
  stockPercentage: number;
}

export const getStockLevelInfo = (stock: number): StockInfo => {
  if (stock === 0) {
    return {
      label: "Out of Stock",
      badgeColor: "bg-red-100 text-red-800",
      progressColor: "bg-gray-400",
      icon: <XCircle className="w-4 h-4 text-red-500" />,
      urgency: "high",
      message: "Sold out! But we'll restock soon – stay tuned!"
    };
  } else if (stock >= 1 && stock <= 25) {
    return {
      label: "Critical",
      badgeColor: "bg-red-100 text-red-800",
      progressColor: "bg-red-500",
      icon: <AlertCircle className="w-4 h-4 text-red-500" />,
      urgency: "high",
      message: "Almost sold out – just a few left!"
    };
  } else if (stock >= 26 && stock <= 64) {
    return {
      label: "Low Stock",
      badgeColor: "bg-orange-100 text-orange-800",
      progressColor: "bg-orange-500",
      icon: <AlertTriangle className="w-4 h-4 text-orange-500" />,
      urgency: "medium",
      message: "Stock is running low! Don't miss your chance."
    };
  } else if (stock >= 65 && stock <= 128) {
    return {
      label: "Medium Stock",
      badgeColor: "bg-yellow-100 text-yellow-800",
      progressColor: "bg-yellow-500",
      icon: <CheckCircle className="w-4 h-4 text-yellow-500" />,
      urgency: "low",
      message: "Going quick – 50% of our stock is already gone!"
    };
  } else if (stock >= 129 && stock <= 200) {
    return {
      label: "High Stock",
      badgeColor: "bg-green-100 text-green-800",
      progressColor: "bg-green-500",
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      urgency: "none",
      message: "Still available, but demand is picking up. Secure yours today!"
    };
  } else {
    return {
      label: "Overstocked",
      badgeColor: "bg-blue-100 text-blue-800",
      progressColor: "bg-blue-500",
      icon: <CheckCircle className="w-4 h-4 text-blue-500" />,
      urgency: "none",
      message: "Plenty available – get the best pick while stock is high!"
    };
  }
};

const StockLevelInfo: React.FC<StockLevelInfoProps> = ({ stockInfo, stock, stockPercentage }) => {
  return (
    <>
      <div className="mt-2 mb-1">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${stockInfo.progressColor}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {stock} units available
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
              ${stockInfo.badgeColor} 
              ${stockInfo.urgency === "high" ? 'animate-pulse' : ''}`}>
              {stockInfo.label}
            </span>
          </div>
        </div>
        
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden relative">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ease-out ${stockInfo.progressColor}`}
            style={{ width: `${stockPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className={`mt-2 p-1.5 rounded-md text-xs flex items-center gap-2 ${
        stockInfo.urgency === "high" 
          ? "bg-red-50 border border-red-100 text-red-700" 
          : stockInfo.urgency === "medium"
          ? "bg-orange-50 border border-orange-100 text-orange-700"
          : stockInfo.urgency === "low"
          ? "bg-yellow-50 border border-yellow-100 text-yellow-700"
          : "bg-blue-50 border border-blue-100 text-blue-700"
      }`}>
        {stockInfo.icon}
        <span>{stockInfo.message}</span>
      </div>
    </>
  );
};

export default StockLevelInfo;
