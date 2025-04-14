
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
  
  // Define our specific color variants with only Black, White, and Jet Black
  const colorVariants = [
    { name: "Black", price: 199.99, stock: 48, image: "", bestseller: true },
    { name: "White", price: 199.99, stock: 124, image: "", bestseller: false },
    { name: "Jet Black", price: 209.99, stock: 78, image: "", bestseller: false }
  ];
  
  // Get the currently selected variant
  const selectedVariant = colorVariants.find((v) => v.name === selectedColor);
  
  // Determine which variants to show
  const visibleVariants = colorVariants; // No need for "show more" since there are only 3 variants
  const hasMoreVariants = false; // No longer need to expand since we only have 3 colors
  
  // Get color hex code based on name
  const getColorHex = (name: string) => {
    const colorMap = {
      "Black": "#000000e6",
      "White": "#fff",
      "Jet Black": "#0006"
    };
    return colorMap[name as keyof typeof colorMap] || "transparent";
  };
  
  // Activate the selected variant for decay simulation
  useEffect(() => {
    if (selectedColor && activateVariant) {
      activateVariant(selectedColor);
    }
  }, [selectedColor, activateVariant]);
  
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
    </div>
  );
};

export default ProductColorVariants;
