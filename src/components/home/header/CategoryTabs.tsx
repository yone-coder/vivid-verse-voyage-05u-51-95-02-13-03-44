
import { LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ReactNode, useRef, useEffect, useState } from 'react'; // Added useState
import { motion } from 'framer-motion';

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
}

const CategoryTabs = ({
  progress,
  activeTab,
  setActiveTab,
  categories,
}: CategoryTabsProps) => {
  const navigate = useNavigate();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [targetScrollLeft, setTargetScrollLeft] = useState(0); // New state for target scroll position

  useEffect(() => {
    // Ensure tabRefs array is the same size as categories
    tabRefs.current = tabRefs.current.slice(0, categories.length);
  }, [categories]);

  useEffect(() => {
    const activeTabIndex = categories.findIndex(cat => cat.id === activeTab);
    const activeTabElement = tabRefs.current[activeTabIndex];
    const containerElement = scrollContainerRef.current;

    if (activeTabElement && containerElement) {
      // Calculate position to center the tab
      const newScrollLeft = activeTabElement.offsetLeft - (containerElement.offsetWidth / 2) + (activeTabElement.offsetWidth / 2);
      setTargetScrollLeft(newScrollLeft); // Set target for framer-motion
    }
  }, [activeTab, categories]); // scrollContainerRef.current.offsetWidth can change on resize, consider adding it or a resize listener if jittery on resize. For now, this should be fine for tab clicks.

  const handleTabClick = (id: string, path: string) => {
    setActiveTab(id);
    navigate(path, { replace: true });
  };

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
      {/* Tabs List */}
      <div className="pr-[48px] h-full">
        <motion.div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto no-scrollbar h-full"
          animate={{ scrollLeft: targetScrollLeft }} // Animate scrollLeft
          transition={{ duration: 0.4, ease: "easeInOut" }} // Adjust timing & easing as needed
        >
          {categories.map(({ id, name, icon, path }, index) => (
            <button
              key={id}
              ref={el => tabRefs.current[index] = el}
              onClick={() => handleTabClick(id, path)}
              aria-pressed={activeTab === id}
              className={`relative flex items-center gap-1 px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 focus-visible:ring-offset-1 ${
                activeTab === id
                  ? 'text-orange-500'
                  : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50/70 rounded-md'
              }`}
            >
              {icon}
              <span>{name}</span>
              {activeTab === id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                  layoutId="activeCategoryUnderline"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>
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

