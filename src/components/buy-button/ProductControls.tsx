
import React from 'react';
import { ChevronDown, Truck, Plus, Minus } from 'lucide-react';

interface ProductControlsProps {
  variantColors: Record<string, string>;
  selectedVariant: string;
  variantOpen: boolean;
  setVariantOpen: React.Dispatch<React.SetStateAction<boolean>>;
  variantChangeAnimation: boolean;
  deliveryOptions: boolean;
  setDeliveryOptions: React.Dispatch<React.SetStateAction<boolean>>;
  rotateIcons: boolean;
  wiggleQuantity: boolean;
  quantity: number;
  decrementQuantity: () => void;
  incrementQuantity: () => void;
}

const ProductControls = ({
  variantColors,
  selectedVariant,
  variantOpen,
  setVariantOpen,
  variantChangeAnimation,
  deliveryOptions,
  setDeliveryOptions,
  rotateIcons,
  wiggleQuantity,
  quantity,
  decrementQuantity,
  incrementQuantity
}: ProductControlsProps) => {
  return (
    <div className="flex space-x-2">
      <div 
        className={`flex items-center space-x-1 cursor-pointer bg-gray-100 px-2 py-1 rounded-lg hover:bg-gray-200 transition-all duration-300 ${variantOpen ? 'animate-pulse' : ''}`} 
        onClick={(e) => {
          e.stopPropagation();
          setVariantOpen(!variantOpen);
          setDeliveryOptions(false);
        }}
      >
        <div className={`w-2 h-2 rounded-full ${variantColors[selectedVariant]} ${variantChangeAnimation ? 'animate-ping' : ''}`} />
        <span className="text-xs">{selectedVariant}</span>
        <ChevronDown 
          size={10} 
          className={`transform transition-transform duration-300 ${variantOpen ? 'rotate-180 animate-bounce' : ''}`} 
        />
      </div>
      
      <div 
        className={`flex items-center space-x-1 cursor-pointer bg-gray-100 px-2 py-1 rounded-lg hover:bg-gray-200 transition-all duration-300 ${deliveryOptions ? 'animate-pulse' : ''}`} 
        onClick={(e) => {
          e.stopPropagation();
          setDeliveryOptions(!deliveryOptions);
          setVariantOpen(false);
        }}
      >
        <Truck size={12} className={`text-gray-500 ${rotateIcons ? 'animate-spin' : ''}`} />
        <span className="text-xs">Delivery</span>
        <ChevronDown 
          size={10} 
          className={`transform transition-transform duration-300 ${deliveryOptions ? 'rotate-180 animate-bounce' : ''}`} 
        />
      </div>
      
      <div className={`flex items-center text-xs bg-gray-100 rounded overflow-hidden ${wiggleQuantity ? 'animate-wiggle' : ''}`}>
        <button 
          onClick={decrementQuantity} 
          className="px-1 py-0.5 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors duration-300"
          disabled={quantity <= 1}
        >
          <Minus size={10} className="hover:animate-spin" />
        </button>
        <span className="px-1 font-medium">{quantity}</span>
        <button 
          onClick={incrementQuantity} 
          className="px-1 py-0.5 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors duration-300"
          disabled={quantity >= 10}
        >
          <Plus size={10} className="hover:animate-spin" />
        </button>
      </div>
    </div>
  );
};

export default ProductControls;
