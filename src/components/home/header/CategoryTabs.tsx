import { LayoutGrid } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, animate as fmAnimate } from 'framer-motion';

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
  const location = useLocation();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollX = useMotionValue(0); // Motion value for scrollLeft
  const [previousTab, setPreviousTab] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Ensure tabRefs array is the same size as categories
    tabRefs.current = tabRefs.current.slice(0, categories.length);
  }, [categories]);

  // Effect to animate scroll position when activeTab changes
  useEffect(() => {
    const activeTabIndex = categories.findIndex(cat => cat.id === activeTab);
    const activeTabElement = tabRefs.current[activeTabIndex];
    const containerElement = scrollContainerRef.current;

    if (activeTabElement && containerElement) {
      // Calculate position to center the tab
      const newScrollLeft = activeTabElement.offsetLeft - (containerElement.offsetWidth / 2) + (activeTabElement.offsetWidth / 2);

      // Animate the scrollX motion value
      fmAnimate(scrollX, newScrollLeft, {
        duration: 0.4,
        ease: "easeInOut",
      });
    }
  }, [activeTab, categories, scrollX]);

  // Effect to apply the scrollX motion value to the DOM element
  useEffect(() => {
    const unsubscribe = scrollX.on("change", (latestValue) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = latestValue;
      }
    });
    return () => unsubscribe();
  }, [scrollX]);

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

  // First state: Regular tabs with text and icons
  if (!iconsOnly) {
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
  }

  // Second state: AliExpress-themed TabsNavigation component (icons only)
  return (
    <div
      className="relative w-full transition-all duration-700 overflow-hidden"
      style={{
        maxHeight: progress > 0.3 ? '56px' : '0px',
        opacity: progress > 0.3 ? 1 : 0,
        backgroundColor: `rgba(255, 255, 255, ${progress * 0.98})`,
        backdropFilter: `blur(${progress * 8}px)`,
      }}
    >
      <div className="relative w-full py-1 px-2">
        <div className="flex items-center justify-between w-full">
          {categories.map(({ id, name, icon, path }) => {
            const isActive = activeTab === id;
            const wasActive = previousTab === id;
            
            return (
              <button 
                key={id}
                onClick={() => handleTabClick(id, path)}
                className={`relative flex items-center justify-center ${
                  isActive 
                    ? 'bg-orange-600 text-white shadow-md rounded-full py-1 px-3' 
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
                  <div 
                    className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
                  >
                    {icon}
                  </div>
                  {isActive && (
                    <span 
                      className="ml-2 text-xs font-medium origin-left transition-all duration-300"
                      style={{
                        opacity: 1,
                        maxWidth: '100px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {name}
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