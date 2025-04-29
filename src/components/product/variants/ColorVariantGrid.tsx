
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ColorVariantItem from "../ColorVariantItem";
import { VariantStockInfo } from "@/hooks/useVariantStockDecay";

interface ProductVariant {
  name: string;
  price: number;
  stock: number;
  image?: string;
  bestseller?: boolean;
  limited?: boolean;
}

interface ColorVariantGridProps {
  displayedColorVariants: ProductVariant[];
  selectedColor: string;
  handleColorChange: (color: string) => void;
  getColorHex: (name: string) => string;
  showAllColors: boolean;
  toggleShowAllColors: () => void;
  colorVariantsLength: number;
  variantStockInfo?: Record<string, VariantStockInfo>;
}

const ColorVariantGrid: React.FC<ColorVariantGridProps> = ({
  displayedColorVariants,
  selectedColor,
  handleColorChange,
  getColorHex,
  showAllColors,
  toggleShowAllColors,
  colorVariantsLength,
  variantStockInfo
}) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {displayedColorVariants.map((variant) => (
          <ColorVariantItem
            key={variant.name}
            variant={variant}
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            getColorHex={getColorHex}
            stockInfo={variantStockInfo ? variantStockInfo[variant.name] : undefined}
          />
        ))}
      </div>
      
      {colorVariantsLength > 3 && (
        <div className="text-center mt-0">
          <button 
            className="text-red-500 text-xs font-medium flex items-center justify-center mx-auto"
            onClick={toggleShowAllColors}
          >
            {showAllColors ? 'View less' : 'View more'}
            {showAllColors ? 
              <ChevronUp size={12} className="ml-1" /> : 
              <ChevronDown size={12} className="ml-1" />
            }
          </button>
        </div>
      )}
    </>
  );
};

export default ColorVariantGrid;
