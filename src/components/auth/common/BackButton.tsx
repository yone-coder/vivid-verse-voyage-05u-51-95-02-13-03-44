import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label?: string; // Make label optional
}

const BackButton = ({ onClick, label = "Back" }: BackButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className="text-sm text-[#ff4747] hover:text-[#ff2727] flex items-center"
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      {label}
    </button>
  );
};

export default BackButton;
