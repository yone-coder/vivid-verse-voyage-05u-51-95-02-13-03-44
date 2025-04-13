
import React from "react";
import { Check, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface ProductVariant {
  name: string;
  price: number;
  stock: number;
  image: string;
  bestseller?: boolean;
  limited?: boolean;
}

interface ColorVariantItemProps {
  variant: ProductVariant;
  selectedColor: string;
  onColorChange: (color: string) => void;
  getColorHex: (name: string) => string;
}

const ColorVariantItem: React.FC<ColorVariantItemProps> = ({
  variant,
  selectedColor,
  onColorChange,
  getColorHex
}) => {
  const isSelected = selectedColor === variant.name;
  const lowStock = variant.stock < 20 ? `Only ${variant.stock} left!` : 
                  variant.stock < 50 ? "Low stock" : null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            className={cn(
              "relative flex flex-col items-center p-1 rounded-md transition-all duration-200",
              isSelected 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:bg-gray-100',
              variant.stock === 0 && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => variant.stock > 0 && onColorChange(variant.name)}
            aria-label={`Select color: ${variant.name}`}
            disabled={variant.stock === 0}
          >
            <div 
              className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 mb-1"
              style={{
                backgroundColor: getColorHex(variant.name),
                border: variant.name === 'White' ? '1px solid #E0E0E0' : 'none'
              }}
            >
              {variant.image ? (
                <img 
                  src={variant.image} 
                  alt={variant.name} 
                  className="w-full h-full object-cover" 
                />
              ) : null}
              
              {variant.stock === 0 && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                  <span className="text-[9px] font-medium text-red-500">Sold out</span>
                </div>
              )}
            </div>
            
            <span className="text-[10px] text-gray-600 truncate w-full text-center">
              {variant.name}
            </span>
            
            <span className="text-[10px] text-blue-600 font-medium truncate w-full text-center">
              ${variant.price.toFixed(2)}
            </span>
            
            {lowStock && (
              <div className="mt-0.5 flex items-center justify-center">
                <span className="text-[8px] text-red-500 flex items-center">
                  <AlertTriangle className="w-2 h-2 mr-0.5" />
                  {lowStock}
                </span>
              </div>
            )}
            
            {variant.bestseller && (
              <Badge 
                className="absolute -top-1 -right-1 text-[7px] py-0 px-1 bg-amber-400 hover:bg-amber-400"
              >
                BEST
              </Badge>
            )}
            
            {variant.limited && (
              <Badge 
                className="absolute -top-1 -right-1 text-[7px] py-0 px-1 bg-red-500 hover:bg-red-500"
              >
                LIMITED
              </Badge>
            )}
            
            {isSelected && (
              <Check 
                className="absolute top-0 right-0 w-4 h-4 text-blue-500 bg-white rounded-full p-0.5 shadow-sm" 
              />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs p-2">
          <p className="font-medium">{variant.name}</p>
          <p className="text-blue-600">${variant.price.toFixed(2)}</p>
          <p className={variant.stock < 20 ? "text-red-500" : "text-gray-500"}>
            {variant.stock > 0 ? `${variant.stock} in stock` : "Out of stock"}
          </p>
          {variant.bestseller && <p className="text-amber-600">Bestseller</p>}
          {variant.limited && <p className="text-red-600">Limited Edition</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ColorVariantItem;
