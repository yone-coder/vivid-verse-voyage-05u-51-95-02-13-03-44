
import React from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus } from 'lucide-react';

interface NewQuantitySelectorProps {
  quantity: number;
  stockRemaining: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const NewQuantitySelector: React.FC<NewQuantitySelectorProps> = ({ 
  quantity, 
  stockRemaining, 
  onIncrement, 
  onDecrement 
}) => {
  return (
    <div className="w-full bg-white">
      <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden mx-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="flex-grow flex items-center justify-center" 
          onClick={onDecrement} 
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="flex-grow text-center font-medium text-sm">
          {quantity}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="flex-grow flex items-center justify-center" 
          onClick={onIncrement} 
          disabled={quantity >= stockRemaining || quantity >= 10}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NewQuantitySelector;
