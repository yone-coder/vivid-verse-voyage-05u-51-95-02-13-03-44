
import React, { useState } from "react";
import { Palette } from "lucide-react";
import ColorVariantItem from "./ColorVariantItem";

const ProductColorVariants = () => {
  const [selectedColor, setSelectedColor] = useState("Black");

  const colorVariants = [
    { name: "Black", price: 79.99, stock: 256, bestseller: true, image: "" },
    { name: "White", price: 89.99, stock: 124, bestseller: false, image: "" },
    { name: "Navy Blue", price: 84.99, stock: 55, bestseller: false, image: "" },
    { name: "Forest Green", price: 89.99, stock: 180, bestseller: false, image: "" },
    { name: "Jet Black", price: 89.99, stock: 18, bestseller: false, image: "" },
    { name: "Red", price: 89.99, stock: 0, bestseller: false, image: "" }
  ];

  const TOTAL_CAPACITY = 256;

  const selectedVariant = colorVariants.find((v) => v.name === selectedColor) || colorVariants[0];

  const getColorHex = (name: string) => {
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

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="px-2 py-0.5 relative max-w-md mx-auto bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#FF4D4F]" />
          <span className="text-sm font-medium text-gray-700">Color</span>
          <span className="text-xs text-[#FF4D4F]">
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
    </div>
  );
};

export default ProductColorVariants;
