
import React from "react";

interface ColorVariantProps {
  variant: {
    name: string;
    price: number;
    stock: number;
    bestseller?: boolean;
  };
  selectedColor: string;
  onColorChange: (color: string) => void;
  getColorHex: (name: string) => string;
}

const ColorVariantItem = ({ 
  variant, 
  selectedColor, 
  onColorChange, 
  getColorHex 
}: ColorVariantProps) => {
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

export default ColorVariantItem;
