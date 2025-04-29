
import React from "react";
import { AlertCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface StockLevelInfoProps {
  selectedVariant: {
    name: string;
    price: number;
    stock: number;
    bestseller?: boolean;
  };
  stockPercentage: number;
  getStockLevelInfo: (stock: number) => {
    label: string;
    badgeColor: string;
    progressColor: string;
    icon: React.ReactNode;
    urgency: string;
    message: string;
  };
}

const StockLevelInfo = ({ 
  selectedVariant, 
  stockPercentage, 
  getStockLevelInfo 
}: StockLevelInfoProps) => {
  const selectedStockInfo = getStockLevelInfo(selectedVariant.stock);
  
  return (
    <>
      <div className="mt-2 mb-1">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${selectedStockInfo.progressColor}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {selectedVariant.stock} units available
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
              ${selectedStockInfo.badgeColor} 
              ${selectedStockInfo.urgency === "high" ? 'animate-pulse' : ''}`}>
              {selectedStockInfo.label}
            </span>
          </div>
        </div>
        
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden relative">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ease-out ${selectedStockInfo.progressColor}`}
            style={{ width: `${stockPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className={`mt-2 p-1.5 rounded-md text-xs flex items-center gap-2 ${
        selectedStockInfo.urgency === "high" 
          ? "bg-red-50 border border-red-100 text-red-700" 
          : selectedStockInfo.urgency === "medium"
          ? "bg-orange-50 border border-orange-100 text-orange-700"
          : selectedStockInfo.urgency === "low"
          ? "bg-yellow-50 border border-yellow-100 text-yellow-700"
          : "bg-blue-50 border border-blue-100 text-blue-700"
      }`}>
        {selectedStockInfo.icon}
        <span>{selectedStockInfo.message}</span>
      </div>
    </>
  );
};

export default StockLevelInfo;
