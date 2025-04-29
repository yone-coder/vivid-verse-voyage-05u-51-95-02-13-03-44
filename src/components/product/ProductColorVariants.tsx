import React, { useState } from "react";
import { Palette, AlertCircle, CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ColorVariantItem = ({ 
  variant, 
  selectedColor, 
  onColorChange, 
  getColorHex
}) => {
  const isSelected = selectedColor === variant.name;
  
  return (
    <div 
      className={`border rounded-lg p-2 cursor-pointer transition-all relative
        ${isSelected
          ? "border-[#FF4747] bg-red-50/30 shadow-sm" 
          : "border-gray-200 hover:border-red-200 hover:shadow hover:scale-[1.02]"}
        ${variant.stock === 0 ? "opacity-70" : ""}
        transform transition-transform duration-150 ease-in-out hover:bg-red-50/10`}
      onClick={() => onColorChange(variant.name)}
    >
      {variant.bestseller && (
        <span className="absolute -top-2 right-2 bg-[#FF4747] text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">
          Best
        </span>
      )}
      <div className="flex items-center mb-1">
        <div 
          className="w-4 h-4 rounded-full border shadow-sm mr-2 transition-all duration-200"
          style={{ backgroundColor: getColorHex(variant.name) }}
        />
        <span className="text-sm font-medium truncate flex-grow text-gray-700">{variant.name}</span>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1 flex-nowrap">
          <span className="text-sm font-bold text-[#FF4747]">${variant.price.toFixed(2)}</span>
          <span className="text-[10px] line-through text-[#aaadb0] opacity-70">${(variant.price * 1.25).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

const ProductColorVariants = () => {
  // State for selected color
  const [selectedColor, setSelectedColor] = useState("Black");
  // State to track whether to show all colors or just the first three
  const [showAllColors, setShowAllColors] = useState(false);

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
  
  // Display only the first three colors initially, or all if showAllColors is true
  const displayedColorVariants = showAllColors 
    ? colorVariants 
    : colorVariants.slice(0, 3);
  
  // Get the currently selected variant
  const selectedVariant = colorVariants.find((v) => v.name === selectedColor) || colorVariants[0];

  // Calculate stock percentage for the selected variant
  const stockPercentage = Math.min(100, Math.max(0, (selectedVariant.stock / TOTAL_CAPACITY) * 100));
  
  // Toggle between showing all colors or just the first three
  const toggleShowAllColors = () => {
    setShowAllColors(!showAllColors);
  };
  
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
   <div className="w-full px-2 py-0.5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#FF4747]" />
          <span className="text-sm font-medium text-gray-800">Product Variants</span>
          <span className="text-xs text-[#FF4747] font-medium">
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

      <div className="grid grid-cols-3 gap-2 mb-3">
        {displayedColorVariants.map((variant) => (
          <ColorVariantItem
            key={variant.name}
            variant={variant}
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            getColorHex={getColorHex}
          />
        ))}
      </div>
      
      {/* View More/Less Button - only shown when there are more than 3 color variants */}
      {colorVariants.length > 3 && (
        <div className="flex justify-center mb-3">
          <Button 
            variant="ghost"
            size="sm"
            className="h-7 px-3 text-xs text-blue-600 hover:bg-blue-50"
            onClick={toggleShowAllColors}
          >
            {showAllColors ? (
              <>
                View Less <ChevronDown className="ml-1 h-3 w-3" />
              </>
            ) : (
              <>
                View More Colors <ChevronRight className="ml-1 h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      )}
      
      {/* Stock level indicator for the selected color - with name removed */}
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
      
      {/* Marketing message based on stock level */}
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
    </div>
  );
};

export default ProductColorVariants;
