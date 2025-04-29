
import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantityControlsProps {
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startIncrementing: () => void;
  stopIncrementing: () => void;
  startDecrementing: () => void;
  stopDecrementing: () => void;
}

const QuantityControls: React.FC<QuantityControlsProps> = ({
  quantity,
  minQuantity,
  maxQuantity,
  onInputChange,
  startIncrementing,
  stopIncrementing,
  startDecrementing,
  stopDecrementing
}) => {
  return (
    <div className="flex border border-gray-300 rounded h-8">
      <button
        className="flex-shrink-0 bg-red-50 hover:bg-red-100 w-8 h-full flex items-center justify-center transition-colors border-r border-gray-300"
        onMouseDown={startDecrementing}
        onMouseUp={stopDecrementing}
        onMouseLeave={stopDecrementing}
        onTouchStart={startDecrementing}
        onTouchEnd={stopDecrementing}
        disabled={quantity <= minQuantity}
      >
        <Minus size={16} className={quantity <= minQuantity ? "text-gray-300" : "text-gray-700"} />
      </button>

      <input
        type="number"
        min={minQuantity}
        max={maxQuantity}
        value={quantity}
        onChange={onInputChange}
        className="w-12 h-full text-center focus:outline-none text-sm bg-white"
      />

      <button
        className="flex-shrink-0 bg-red-50 hover:bg-red-100 w-8 h-full flex items-center justify-center transition-colors border-l border-gray-300"
        onMouseDown={startIncrementing}
        onMouseUp={stopIncrementing}
        onMouseLeave={stopIncrementing}
        onTouchStart={startIncrementing}
        onTouchEnd={stopIncrementing}
        disabled={quantity >= maxQuantity}
      >
        <Plus size={16} className={quantity >= maxQuantity ? "text-gray-300" : "text-gray-700"} />
      </button>
    </div>
  );
};

export default QuantityControls;
