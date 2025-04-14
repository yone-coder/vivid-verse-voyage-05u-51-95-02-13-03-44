
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Variant {
  name: string;
  price: number;
  image: string;
  color: string;
  stock: number;
}

interface ProductVariantImageSelectorProps {
  variants: Variant[];
  selectedVariant: string;
  onVariantChange: (variant: string) => void;
}

const ProductVariantImageSelector: React.FC<ProductVariantImageSelectorProps> = ({
  variants,
  selectedVariant,
  onVariantChange
}) => {
  const [hoverVariant, setHoverVariant] = useState<string | null>(null);
  
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">Select Color</h3>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.name === selectedVariant;
          const isLowStock = variant.stock <= 10 && variant.stock > 0;
          
          return (
            <div 
              key={variant.name}
              className="relative"
              onMouseEnter={() => setHoverVariant(variant.name)}
              onMouseLeave={() => setHoverVariant(null)}
            >
              <button
                onClick={() => onVariantChange(variant.name)}
                className={cn(
                  "relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                  isSelected 
                    ? "border-blue-500 shadow-sm" 
                    : "border-gray-200 hover:border-gray-300"
                )}
                title={variant.name}
              >
                <img 
                  src={variant.image} 
                  alt={variant.name}
                  className="w-full h-full object-cover"
                />
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white p-0.5 rounded-bl-md">
                    <Check size={10} />
                  </div>
                )}
              </button>
              
              {/* Color dot */}
              <div 
                className={cn(
                  "absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border",
                  isSelected ? "border-blue-500" : "border-gray-300"
                )}
                style={{ backgroundColor: variant.color }}
              ></div>
              
              {/* Hover tooltip */}
              {(hoverVariant === variant.name || isSelected) && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap bg-black bg-opacity-75 text-white text-xs py-1 px-2 rounded pointer-events-none z-10">
                  <div className="flex flex-col">
                    <span>{variant.name}</span>
                    <span className="font-medium">${variant.price.toFixed(2)}</span>
                    {isLowStock && (
                      <span className="text-red-300">Only {variant.stock} left</span>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black bg-opacity-75"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductVariantImageSelector;
