import React, { useState } from "react";
import { Palette, AlertCircle, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const ColorVariantItem = ({ 
  variant, 
  selectedColor, 
  onColorChange, 
  getColorHex
}) => {
  const isSelected = selectedColor === variant.name;
  
  return (
    <div 
      className={`border rounded-md p-2 cursor-pointer transition-all relative
        ${isSelected
          ? "border-blue-500 bg-blue-50 shadow-md" 
          : "border-gray-200 hover:border-blue-300 hover:shadow-lg hover:scale-105"}
        ${variant.stock === 0 ? "opacity-70" : ""}
        transform transition-transform duration-200 ease-in-out hover:bg-blue-50/30`}
      onClick={() => onColorChange(variant.name)}
    >
      {variant.bestseller && (
        <span className="absolute -top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5 rounded text-center flex-shrink-0">
          Best
        </span>
      )}
      <div className="flex items-center mb-1">
        <div 
          className="w-4 h-4 rounded-full border border-gray-300 mr-2 transition-all duration-200"
          style={{ backgroundColor: getColorHex(variant.name) }}
        />
        <span className="text-sm font-medium truncate flex-grow">{variant.name}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">${variant.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

const ProductColorVariants = () => {
  // State for selected color
  const [selectedColor, setSelectedColor] = useState("Black");

  // Mock stock data with various stock levels
  const colorVariants = [
    { name: "Black", price: 79.99, stock: 256, bestseller: true },
    { name: "White", price: 89.99, stock: 124, bestseller: false },
    { name: "Navy Blue", price: 84.99, stock: 55, bestseller: false },
    { name: "Forest Green", price: 89.99, stock: 180, bestseller: false },
    { name: "Jet Black", price: 89.99, stock: 18, bestseller: false },
    { name: "Red", price: 89.99, stock: 0, bestseller: false }
  ];

  const TOTAL_CAPACITY = 256; // Maximum stock
  
  // Get the currently selected variant
  const selectedVariant = colorVariants.find((v) => v.name === selectedColor) || colorVariants[0];

  // Calculate stock percentage for the selected variant
  const stockPercentage = Math.min(100, Math.max(0, (selectedVariant.stock / TOTAL_CAPACITY) * 100));
  
  // Determine stock level based on the provided thresholds
  const getStockLevelInfo = (stock) => {
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

  // Get color hex code based on name
  const getColorHex = (name) => {
    const colorMap = {
      "Black": "#000000",
      "White": "#ffffff",
      "Jet Black": "#111111",
      "Navy Blue": "#000080",
      "Red": "#FF0000",
      "Forest Green": "#228B22"
    };
    return colorMap[name] || "#CCCCCC";
  };

  // Handle color change
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  // Get stock level info for selected variant
  const selectedStockInfo = getStockLevelInfo(selectedVariant.stock);

  return (
    <div className="relative px-1 py-0.5 max-w-md mx-auto bg-white rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">Product Variants</span>
          <span className="text-xs text-blue-500 font-medium">
            ({colorVariants.length} Options)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {selectedVariant && (
            <span className="text-xs text-gray-500">
              Selected: <span className="font-medium">{selectedVariant.name}</span>
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {colorVariants.map((variant) => (
          <ColorVariantItem
            key={variant.name}
            variant={variant}
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            getColorHex={getColorHex}
          />
        ))}
      </div>
      
      {/* Stock level indicator for the selected color - with name removed */}
      <div className="mt-4 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${selectedStockInfo.progressColor}`}></div>
            <span className="text-sm font-medium">
              {selectedVariant.stock} units available
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${selectedStockInfo.badgeColor} ${selectedStockInfo.urgency === "high" ? 'animate-pulse' : ''}`}>
              {selectedStockInfo.label}
            </span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden relative">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ease-out ${selectedStockInfo.progressColor}`}
            style={{ width: `${stockPercentage}%` }}
          ></div>
        </div>
        
      </div>
      
      {/* Marketing message based on stock level */}
      <div className={`mt-3 p-2 rounded-md text-xs flex items-center gap-2 ${
        selectedStockInfo.urgency === "high" 
          ? "bg-red-50 border border-red-200 text-red-700" 
          : selectedStockInfo.urgency === "medium"
          ? "bg-orange-50 border border-orange-200 text-orange-700"
          : selectedStockInfo.urgency === "low"
          ? "bg-yellow-50 border border-yellow-200 text-yellow-700"
          : "bg-blue-50 border border-blue-200 text-blue-700"
      }`}>
        {selectedStockInfo.icon}
        <span>{selectedStockInfo.message}</span>
      </div>
    </div>
  );
};

export default ProductColorVariants;