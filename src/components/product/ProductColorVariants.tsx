
import React, { useState } from "react";
import { Check, Palette, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
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
  
  // Define our specific color variants
  const colorVariants = [
    { name: "Black", price: 199.99, stock: 256, image: "", bestseller: true },
    { name: "White", price: 199.99, stock: 124, image: "", bestseller: false },
    { name: "Jet Black", price: 209.99, stock: 78, image: "", bestseller: false },
    { name: "Blue", price: 219.99, stock: 42, image: "", bestseller: false },
    { name: "Red", price: 229.99, stock: 16, image: "", bestseller: false, limited: true }
  ];
  
  // Get the currently selected variant
  const selectedVariant = colorVariants.find((v) => v.name === selectedColor);
  
  // Determine which variants to show
  const visibleVariants = expanded ? colorVariants : colorVariants.slice(0, 3);
  const hasMoreVariants = colorVariants.length > 3;
  
  // Get color hex code based on name
  const getColorHex = (name: string) => {
    const colorMap = {
      "Black": "#000000",
      "White": "#FFFFFF",
      "Jet Black": "#0A0A0A",
      "Blue": "#0066CC",
      "Red": "#CC0000"
    };
    return colorMap[name] || "transparent";
  };
  
  const getLowStockText = (stock: number) => {
    if (stock < 20) return `Only ${stock} left!`;
    if (stock < 50) return "Low stock";
    return null;
  };
  
  return (
    <div className="relative px-1 py-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Color Options</span>
          <span className="text-xs text-blue-500 font-medium">
            ({colorVariants.length} Colors)
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedVariant && (
            <span className="text-xs text-gray-500">
              Selected: <span className="font-medium">{selectedColor}</span>
            </span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-2">
        {visibleVariants.map((variant) => {
          const lowStock = getLowStockText(variant.stock);
          
          return (
            <TooltipProvider key={variant.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={cn(
                      "relative flex flex-col items-center p-1 rounded-md transition-all duration-200",
                      selectedColor === variant.name 
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
                    
                    {selectedColor === variant.name && (
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
        })}
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
              Show All {colorVariants.length} Colors
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ProductColorVariants;
