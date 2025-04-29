
import React from "react";
import { Palette } from "lucide-react";

interface ColorVariantsHeaderProps {
  colorVariants: Array<{
    name: string;
    price: number;
    stock: number;
    bestseller?: boolean;
  }>;
  selectedVariant: {
    name: string;
    price: number;
    stock: number;
    bestseller?: boolean;
  } | null;
}

const ColorVariantsHeader = ({ 
  colorVariants, 
  selectedVariant 
}: ColorVariantsHeaderProps) => {
  return (
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
  );
};

export default ColorVariantsHeader;
