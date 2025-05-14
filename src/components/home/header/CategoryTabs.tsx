import { LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';

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
  onShowAllCategories?: () => void;
}

const CategoryTabs = ({
  progress,
  activeTab,
  setActiveTab,
  categories,
  onShowAllCategories
}: CategoryTabsProps) => {
  const navigate = useNavigate();
  const [overflowing, setOverflowing] = useState(false);
  const isVisible = progress > 0.3;
  
  // Handle tab selection
  const handleTabClick = (id: string, path: string) => {
    setActiveTab(id);
    navigate(path, { replace: true });
  };
  
  // Handle grid icon button click
  const handleShowAllClick = () => {
    if (onShowAllCategories) {
      onShowAllCategories();
    }
  };
  
  // Check for overflow in the tabs container
  useEffect(() => {
    const checkForOverflow = () => {
      const tabsContainer = document.getElementById('category-tabs-container');
      if (tabsContainer) {
        setOverflowing(tabsContainer.scrollWidth > tabsContainer.clientWidth);
      }
    };
    
    // Check on initial render and when categories change
    checkForOverflow();
    window.addEventListener('resize', checkForOverflow);
    
    return () => {
      window.removeEventListener('resize', checkForOverflow);
    };
  }, [categories]);

  return (
    <div
      className="relative w-full transition-all duration-500 overflow-hidden"
      style={{
        maxHeight: isVisible ? '40px' : '0px',
        opacity: isVisible ? 1 : 0,
        backgroundColor: `rgba(255, 255, 255, ${progress * 0.98})`,
        backdropFilter: `blur(${Math.min(8, progress * 8)}px)`,
      }}
      aria-hidden={!isVisible}
    >
      {/* Tabs List */}
      <div className="pr-12">
        <div 
          id="category-tabs-container"
          className="flex overflow-x-auto no-scrollbar"
          role="tablist"
          aria-orientation="horizontal"
        >
          {categories.map(({ id, name, icon, path }) => (
            <button
              key={id}
              onClick={() => handleTabClick(id, path)}
              role="tab"
              aria-selected={activeTab === id}
              aria-controls={`panel-${id}`}
              id={`tab-${id}`}
              className={`flex items-center gap-1 px-3 py-1 text-xs font-medium whitespace-nowrap border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${
                activeTab === id
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {icon}
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid Button */}
      <div className="absolute top-0 right-0 h-full flex items-center pl-2 pr-3 z-10">
        <div className="h-5 w-px bg-gray-300" />
        <button
          type="button"
          onClick={handleShowAllClick}
          className="p-1 rounded hover:bg-gray-100 active:bg-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors"
          aria-label="Show all categories"
          title="Show all categories"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
        
        {/* Subtle indicator showing more content is available */}
        {overflowing && (
          <span className="absolute left-0 bottom-0 w-8 h-1 bg-gradient-to-r from-orange-500 to-transparent opacity-50" 
                aria-hidden="true" />
        )}
      </div>
    </div>
  );
};

export default CategoryTabs;