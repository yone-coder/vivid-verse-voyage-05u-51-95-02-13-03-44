
import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  progress: number;
}

const SearchBar = ({ searchQuery, setSearchQuery, progress }: SearchBarProps) => {
  return (
    <div className="relative flex-1 max-w-xs">
      <div className="relative flex items-center h-7 rounded-full transition-all duration-700"
        style={{
          backgroundColor: `rgba(243, 244, 246, ${0.2 + (progress * 0.8)})`,
          boxShadow: `0 2px 4px rgba(0, 0, 0, ${0.02 + (progress * 0.03)})`
        }}>
        <div className="absolute left-2 flex items-center justify-center">
          <Search 
            size={14} 
            className="transition-all duration-700"
            style={{
              color: `rgba(75, 85, 99, ${0.5 + (progress * 0.3)})`
            }}
            strokeWidth={2}
          />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products"
          className="bg-transparent w-full h-full pl-7 pr-3 py-1 text-sm rounded-full outline-none transition-all duration-700"
          style={{
            color: `rgba(75, 85, 99, ${0.8 + (progress * 0.2)})`,
            caretColor: "#f97316"
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
