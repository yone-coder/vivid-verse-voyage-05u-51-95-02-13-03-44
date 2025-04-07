
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const [showVariants, setShowVariants] = useState(true);

  const toggleVariants = () => {
    setShowVariants(!showVariants);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Select Color:</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 px-2 text-xs text-blue-600"
          onClick={toggleVariants}
        >
          {showVariants ? "Hide Options" : "Show All Options"}
        </Button>
      </div>
      
      <div className={`grid grid-cols-3 gap-2 transition-all duration-300 ${showVariants ? 'max-h-[500px] opacity-100' : 'max-h-12 opacity-40 overflow-hidden'}`}>
        {variants.map((variant) => (
          <div 
            key={variant.name} 
            className={`border rounded-md p-2 cursor-pointer transition-colors hover:border-blue-500 ${selectedColor === variant.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            onClick={() => onColorChange(variant.name)}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="w-6 h-6 bg-gray-200 rounded overflow-hidden">
                <img src={variant.image} alt={variant.name} className="w-full h-full object-cover" />
              </div>
              {selectedColor === variant.name && <Check className="h-4 w-4 text-blue-500" />}
            </div>
            <div className="text-xs font-medium truncate">{variant.name}</div>
            <div className="text-xs text-gray-500">${variant.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
      
      {!showVariants && (
        <div className="absolute top-8 left-0 right-0 flex items-center justify-center">
          <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
            {selectedColor}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default ProductColorVariants;
