
import React, { useState } from "react";
import { Palette } from "lucide-react";
import ColorVariantGrid from "./variants/ColorVariantGrid";
import StockLevelInfo, { getStockLevelInfo } from "./variants/StockLevelInfo";

const ProductColorVariants = () => {
  const [selectedColor, setSelectedColor] = useState("Black");
  const [showAllColors, setShowAllColors] = useState(false);

  const colorVariants = [
    { name: "Black", price: 79.99, stock: 256, bestseller: true },
    { name: "White", price: 89.99, stock: 124, bestseller: false },
    { name: "Navy Blue", price: 84.99, stock: 55, bestseller: false },
    { name: "Forest Green", price: 89.99, stock: 180, bestseller: false },
    { name: "Jet Black", price: 89.99, stock: 18, bestseller: false },
    { name: "Red", price: 89.99, stock: 0, bestseller: false }
  ];

  const TOTAL_CAPACITY = 256;

  const displayedColorVariants = showAllColors 
    ? colorVariants 
    : colorVariants.slice(0, 3);

  const selectedVariant = colorVariants.find((v) => v.name === selectedColor) || colorVariants[0];

  const stockPercentage = Math.min(100, Math.max(0, (selectedVariant.stock / TOTAL_CAPACITY) * 100));

  const toggleShowAllColors = () => {
    setShowAllColors(!showAllColors);
  };

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

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

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

      <ColorVariantGrid
        displayedColorVariants={displayedColorVariants}
        selectedColor={selectedColor}
        handleColorChange={handleColorChange}
        getColorHex={getColorHex}
        showAllColors={showAllColors}
        toggleShowAllColors={toggleShowAllColors}
        colorVariantsLength={colorVariants.length}
      />
      
      <StockLevelInfo
        stockInfo={selectedStockInfo}
        stock={selectedVariant.stock}
        stockPercentage={stockPercentage}
      />
    </div>
  );
};

export default ProductColorVariants;
