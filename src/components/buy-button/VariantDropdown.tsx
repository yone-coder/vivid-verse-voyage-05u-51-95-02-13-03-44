
import React from 'react';
import { Check } from 'lucide-react';

interface VariantDropdownProps {
  variantOpen: boolean;
  variants: string[];
  selectedVariant: string;
  handleVariantChange: (variant: string) => void;
  variantColors: Record<string, string>;
}

const VariantDropdown = ({
  variantOpen,
  variants,
  selectedVariant,
  handleVariantChange,
  variantColors
}: VariantDropdownProps) => {
  if (!variantOpen) return null;
  
  return (
    <div 
      className="absolute bottom-full mb-1 left-4 bg-white shadow-xl rounded-lg overflow-hidden w-32 z-10"
      style={{ animation: 'slideDown 0.2s ease-out' }}
    >
      {variants.map((variant) => (
        <div 
          key={variant}
          className="px-2 py-1.5 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 transition-all duration-200 hover:translate-x-1"
          onClick={() => handleVariantChange(variant)}
        >
          <div className={`w-3 h-3 rounded-full ${variantColors[variant]} ${selectedVariant === variant ? 'animate-ping' : ''}`}></div>
          <span className="text-xs">{variant}</span>
          {selectedVariant === variant && 
            <Check size={12} className="ml-auto text-green-500 animate-pulse" />
          }
        </div>
      ))}
    </div>
  );
};

export default VariantDropdown;
