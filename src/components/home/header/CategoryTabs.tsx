
import { useState, useEffect } from 'react';
import { Home, MessageCircle, Video, LayoutGrid } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareRss } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface CategoryTab {
  id: string;
  name: string;
  icon: ReactNode;
  path: string;
}

interface CategoryTabsProps {
  progress: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  categories: CategoryTab[];
  iconsOnly?: boolean;
}

const CategoryTabs = ({
  progress,
  activeTab,
  setActiveTab,
  categories,
  iconsOnly = false,
}: CategoryTabsProps) => {
  const navigate = useNavigate();
  const [previousTab, setPreviousTab] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleTabClick = (id: string, path: string) => {
    if (id !== activeTab && !animating) {
      setAnimating(true);
      setPreviousTab(activeTab);
      setActiveTab(id);
      navigate(path, { replace: true });
      
      // Reset animation state after animation completes
      setTimeout(() => {
        setAnimating(false);
        setPreviousTab(null);
      }, 400);
    }
  };

  return (
    <div
      className="relative w-full transition-all duration-700 overflow-hidden"
      style={{
        maxHeight: progress > 0.3 ? (iconsOnly ? '56px' : '48px') : '0px',
        opacity: progress > 0.3 ? 1 : 0,
        backgroundColor: `rgba(255, 255, 255, ${progress * 0.98})`,
        backdropFilter: `blur(${progress * 8}px)`,
      }}
    >
      <div className="relative w-full py-1 px-2">
        <div className="flex items-center justify-between w-full">
          {categories.map((category) => {
            const isActive = category.id === activeTab;
            const wasActive = previousTab === category.id;
            
            return (
              <button 
                key={category.id}
                onClick={() => handleTabClick(category.id, category.path)}
                className={`relative flex items-center justify-center ${
                  isActive 
                    ? 'bg-white text-orange-500 shadow-md rounded-full py-1 px-3' 
                    : 'text-gray-500 py-1 px-3'
                } transition-all duration-300 ease-out transform ${
                  isActive ? 'scale-105' : wasActive ? 'scale-95' : 'scale-100'
                }`}
                style={{
                  zIndex: isActive ? 10 : 1,
                  transitionProperty: 'transform, background, box-shadow, border-radius, color, padding',
                }}
              >
                <div className="flex items-center justify-center">
                  {isActive ? (
                    <div className="transform scale-[2.2]">{category.icon}</div>
                  ) : (
                    <div className="transform scale-[1.8]">{category.icon}</div>
                  )}
                  
                  {isActive && !iconsOnly && (
                    <span 
                      className="ml-2 text-xs font-medium origin-left transition-all duration-300"
                      style={{
                        opacity: 1,
                        maxWidth: '100px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {category.name}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Icon Button on Right */}
      <div className="absolute top-0 right-0 h-full flex items-center pl-2 pr-3 z-10 space-x-2">
        <div className="h-5 w-px bg-gray-300" />
        <button
          type="button"
          className="p-1 rounded text-gray-500 hover:bg-gray-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
          aria-label="More options"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CategoryTabs;
