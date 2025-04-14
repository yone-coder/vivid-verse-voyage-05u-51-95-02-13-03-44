
import React, { useState, useEffect } from "react";
import { Palette, ChevronDown, ChevronUp } from "lucide-react";
import ColorVariantItem from "./ColorVariantItem";
import { VariantStockInfo } from "@/hooks/useVariantStockDecay";

interface ProductVariant {
  name: string;
  price: number;
  stock: number;
  image: string;
}

interface ProductColorVariantsProps {
  variants: ProductVariant[];
  selectedColor: string;
  onColorChange: (color: string) => void;
  variantStockInfo?: Record<string, VariantStockInfo>;
  getTimeRemaining?: (variantName: string) => { minutes: number, seconds: number } | null;
  activateVariant?: (variantName: string) => void;
}

const ProductColorVariants: React.FC<ProductColorVariantsProps> = ({
  variants,
  selectedColor,
  onColorChange,
  variantStockInfo = {},
  getTimeRemaining,
  activateVariant
}) => {
  const [expanded, setExpanded] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Define our specific color variants with additional properties
  const colorVariants = [
    { name: "Black", price: 199.99, stock: 256, image: "", bestseller: true },
    { name: "White", price: 199.99, stock: 256, image: "", bestseller: false },
    { name: "Jet Black", price: 209.99, stock: 256, image: "", bestseller: false },
    { name: "Blue", price: 219.99, stock: 256, image: "", bestseller: false },
    { name: "Red", price: 229.99, stock: 256, image: "", bestseller: false, limited: true }
  ];
  
  // Log current stock levels for debugging purposes
  useEffect(() => {
    if (initialLoad && Object.keys(variantStockInfo).length > 0) {
      console.log("Current variant stock levels:");
      Object.entries(variantStockInfo).forEach(([name, info]) => {
        console.log(`${name}: ${Math.floor(info.currentStock)} units, started at ${new Date(info.startTime).toLocaleTimeString()}`);
      });
      setInitialLoad(false);
    }
  }, [variantStockInfo, initialLoad]);
  
  // Get the currently selected variant
  const selectedVariant = colorVariants.find((v) => v.name === selectedColor);
  
  // Determine which variants to show
  const visibleVariants = expanded ? colorVariants : colorVariants.slice(0, 3);
  const hasMoreVariants = colorVariants.length > 3;
  
  // Get color hex code based on name
  const getColorHex = (name: string) => {
    const colorMap = {
      "Black": "#000000",
      "White": "#FFFFFF",
      "Jet Black": "#0A0A0A",
      "Blue": "#0066CC",
      "Red": "#CC0000"
    };
    return colorMap[name as keyof typeof colorMap] || "transparent";
  };
  
  // Custom color change handler to update both parent and activate variant
  const handleColorChange = (color: string) => {
    onColorChange(color);
  };
  
  return (
    <div className="relative px-3 py-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Color Options</span>
          <span className="text-xs text-blue-500 font-medium">
            ({colorVariants.length} Colors)
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedVariant && (
            <span className="text-xs text-gray-500">
              Selected: <span className="font-medium">{selectedColor}</span>
            </span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-2">
        {visibleVariants.map((variant) => (
          <ColorVariantItem
            key={variant.name}
            variant={variant}
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            getColorHex={getColorHex}
            stockInfo={variantStockInfo[variant.name]}
            getTimeRemaining={getTimeRemaining ? (name) => getTimeRemaining(name) : undefined}
          />
        ))}
      </div>
      
      {hasMoreVariants && (
        <button 
          className="flex items-center justify-center w-full text-xs text-blue-600 py-1 mt-1 hover:bg-blue-50 rounded-md transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3 h-3 mr-1" />
              Show Fewer Colors
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 mr-1" />
              Show All {colorVariants.length} Colors
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ProductColorVariants;
