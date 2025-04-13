
import React, { useState } from "react";
import { Check, Circle } from "lucide-react";

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
}

const ProductColorVariants: React.FC<ProductColorVariantsProps> = ({
  variants,
  selectedColor,
  onColorChange
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Color</span>
      </div>
      
      <div className="flex space-x-2">
        {variants.map((variant) => (
          <button 
            key={variant.name} 
            className={`
              relative p-1 rounded-full border-2 transition-all duration-200
              ${selectedColor === variant.name 
                ? 'border-blue-500 ring-2 ring-blue-200' 
                : 'border-transparent hover:border-gray-300'}
            `}
            onClick={() => onColorChange(variant.name)}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src={variant.image} 
                alt={variant.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {selectedColor === variant.name && (
              <Check 
                className="absolute top-0 right-0 w-4 h-4 text-blue-500 bg-white rounded-full" 
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductColorVariants;
