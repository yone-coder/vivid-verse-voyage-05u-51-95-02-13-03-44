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
  const isMin = quantity <= minQuantity;
  const isMax = quantity >= maxQuantity;

  return (
    <div className="relative w-[72px] h-6 rounded-full border border-gray-300 overflow-hidden flex items-center text-xs bg-white">
      <button
        onMouseDown={startDecrementing}
        onMouseUp={stopDecrementing}
        onMouseLeave={stopDecrementing}
        onTouchStart={startDecrementing}
        onTouchEnd={stopDecrementing}
        disabled={isMin}
        className={`w-5 h-full flex items-center justify-center ${isMin ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Minus size={10} />
      </button>

      <input
        type="number"
        min={minQuantity}
        max={maxQuantity}
        value={quantity}
        onChange={onInputChange}
        className="w-full h-full text-center text-xs focus:outline-none bg-transparent px-0.5"
      />

      <button
        onMouseDown={startIncrementing}
        onMouseUp={stopIncrementing}
        onMouseLeave={stopIncrementing}
        onTouchStart={startIncrementing}
        onTouchEnd={stopIncrementing}
        disabled={isMax}
        className={`w-5 h-full flex items-center justify-center ${isMax ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Plus size={10} />
      </button>
    </div>
  );
};

export default QuantityControls;