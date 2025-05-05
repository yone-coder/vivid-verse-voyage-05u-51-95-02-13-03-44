
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label: string;
}

const BackButton = ({ onClick, label }: BackButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className="text-sm text-[#ff4747] hover:text-[#ff2727] flex items-center"
    >
      <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
      {label}
    </button>
  );
};

export default BackButton;
