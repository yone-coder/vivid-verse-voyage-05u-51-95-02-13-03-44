
import React, { useState } from "react";
import { Check, Circle, Palette, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  const [expanded, setExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  // Get the currently selected variant
  const selectedVariant = variants.find((v) => v.name === selectedColor);
  
  // Determine which variants to show
  const visibleVariants = expanded ? variants : variants.slice(0, 4);
  const hasMoreVariants = variants.length > 4;
  
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Color Options</span>
          <span className="text-xs text-blue-500 font-medium">
            ({variants.length} available)
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedVariant && (
            <span className="text-xs text-gray-500">
              Selected: <span className="font-medium">{selectedColor}</span>
            </span>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 p-1"
            onClick={() => setShowInfo(!showInfo)}
          >
            <Circle className="w-3 h-3 mr-1" />
            Info
          </Button>
        </div>
      </div>
      
      {showInfo && (
        <div className="bg-blue-50 text-blue-700 text-xs p-2 rounded-md mb-3 animate-fade-in">
          <p>Color options may appear slightly different from actual product due to screen settings.</p>
        </div>
      )}
      
      <div className="grid grid-cols-5 gap-2 mb-2">
        {visibleVariants.map((variant) => (
          <button 
            key={variant.name} 
            className={cn(
              "relative flex flex-col items-center p-1 rounded-md transition-all duration-200",
              selectedColor === variant.name 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:bg-gray-100'
            )}
            onClick={() => onColorChange(variant.name)}
            aria-label={`Select color: ${variant.name}`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 mb-1">
              <img 
                src={variant.image} 
                alt={variant.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <span className="text-[10px] text-gray-600 truncate w-full text-center">
              {variant.name}
            </span>
            
            {selectedColor === variant.name && (
              <Check 
                className="absolute top-0 right-0 w-4 h-4 text-blue-500 bg-white rounded-full p-0.5 shadow-sm" 
              />
            )}
            
            {variant.stock < 20 && (
              <span className="absolute -top-1 -left-1 text-[8px] font-medium bg-red-500 text-white px-1 rounded-full">
                Low
              </span>
            )}
          </button>
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
              Show All {variants.length} Colors
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ProductColorVariants;
