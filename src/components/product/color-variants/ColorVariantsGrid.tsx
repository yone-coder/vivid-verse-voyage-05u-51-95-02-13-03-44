
import React from "react";
import ColorVariantItem from "./ColorVariantItem";

interface ColorVariantsGridProps {
  displayedColorVariants: Array<{
    name: string;
    price: number;
    stock: number;
    bestseller?: boolean;
  }>;
  selectedColor: string;
  handleColorChange: (color: string) => void;
  getColorHex: (name: string) => string;
}

const ColorVariantsGrid = ({ 
  displayedColorVariants,
  selectedColor,
  handleColorChange,
  getColorHex
}: ColorVariantsGridProps) => {
  return (
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
  );
};

export default ColorVariantsGrid;
