
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ShowMoreToggleProps {
  showAllColors: boolean;
  toggleShowAllColors: () => void;
}

const ShowMoreToggle = ({ 
  showAllColors, 
  toggleShowAllColors 
}: ShowMoreToggleProps) => {
  return (
    <div className="text-center mt-0">
      <button 
        className="text-red-500 text-xs font-medium flex items-center justify-center mx-auto"
        onClick={toggleShowAllColors}
      >
        {showAllColors ? 'View less' : 'View more'}
        {showAllColors ? 
          <ChevronUp size={12} className="ml-1" /> : 
          <ChevronDown size={12} className="ml-1" />
        }
      </button>
    </div>
  );
};

export default ShowMoreToggle;
