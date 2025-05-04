
import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';

interface CategoryTabsProps {
  progress: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  categories: string[];
}

const CategoryTabs = ({ 
  progress, 
  activeTab, 
  setActiveTab,
  categories 
}: CategoryTabsProps) => {
  return (
    <div
      className="relative w-full transition-all duration-700 overflow-hidden"
      style={{
        maxHeight: progress > 0.3 ? '40px' : '0px',
        opacity: progress > 0.3 ? 1 : 0,
        backgroundColor: `rgba(255, 255, 255, ${progress * 0.98})`,
        backdropFilter: `blur(${progress * 8}px)`,
      }}
    >
      {/* Scrollable area wrapper with max-width */}
      <div className="pr-[48px]">
        <div className="flex overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              className={`whitespace-nowrap px-3 py-1 text-xs font-medium transition-all border-b-2 ${
                activeTab === category
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Separator + Icon */}
      <div className="absolute top-0 right-0 h-full flex items-center pl-2 pr-3 z-10 space-x-2">
        <div className="h-5 w-px bg-gray-300" />
        <div className="cursor-pointer p-1 rounded hover:bg-gray-100">
          <LayoutGrid className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
