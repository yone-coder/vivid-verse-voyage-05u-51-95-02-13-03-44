
import React from 'react';
import { Share2, Heart } from 'lucide-react';

interface InteractionControlsProps {
  shareProduct: () => void;
  toggleHeart: () => void;
  rotateIcons: boolean;
  isHearted: boolean;
  heartCount: number;
}

const InteractionControls = ({
  shareProduct,
  toggleHeart,
  rotateIcons,
  isHearted,
  heartCount
}: InteractionControlsProps) => {
  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={shareProduct}
        className="flex flex-col items-center justify-center relative overflow-hidden"
        aria-label="Share product"
      >
        <Share2 className={`text-gray-400 hover:text-gray-600 ${rotateIcons ? 'animate-spin' : ''}`} size={14} />
      </button>
      
      <button 
        onClick={toggleHeart}
        className="flex flex-col items-center justify-center relative overflow-hidden"
      >
        <Heart 
          className={`transition-all duration-300 ${isHearted ? 'text-red-500 fill-red-500 scale-110 animate-heartbeat' : 'text-gray-400'}`}
          size={16}
        />
        <span className={`text-xs text-gray-500 mt-0.5 ${isHearted ? 'animate-pulse' : ''}`}>{heartCount}</span>
      </button>
    </div>
  );
};

export default InteractionControls;
