
import React, { useState } from "react";
import { Palette } from "lucide-react";
import ColorVariantsHeader from "./color-variants/ColorVariantsHeader";
import ColorVariantsGrid from "./color-variants/ColorVariantsGrid";
import ShowMoreToggle from "./color-variants/ShowMoreToggle";
import StockLevelInfo from "./color-variants/StockLevelInfo";
import { getColorHex, getStockLevelInfo } from "./color-variants/utils/colorUtils";

// Main ProductColorVariants component
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

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
   <div className="w-full px-2 py-0.5">
      <ColorVariantsHeader 
        colorVariants={colorVariants}
        selectedVariant={selectedVariant}
      />

      <ColorVariantsGrid
        displayedColorVariants={displayedColorVariants}
        selectedColor={selectedColor}
        handleColorChange={handleColorChange}
        getColorHex={getColorHex}
      />
      
      {colorVariants.length > 3 && (
        <ShowMoreToggle 
          showAllColors={showAllColors}
          toggleShowAllColors={toggleShowAllColors}
        />
      )}
      
      <StockLevelInfo
        selectedVariant={selectedVariant}
        stockPercentage={stockPercentage}
        getStockLevelInfo={getStockLevelInfo}
      />
    </div>
  );
};

export default ProductColorVariants;
