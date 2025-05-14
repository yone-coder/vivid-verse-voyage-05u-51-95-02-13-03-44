import { LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const isVisible = progress > 0.3;
  
  // Handle tab selection
  const handleTabClick = (id: string, path: string) => {
    // Add a subtle scale animation on click
    const element = document.getElementById(`tab-${id}`);
    if (element) {
      element.animate([
        { transform: 'scale(0.95)' },
        { transform: 'scale(1)' }
      ], {
        duration: 200,
        easing: 'ease-out'
      });
    }
    
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
      if (tabsContainerRef.current) {
        setOverflowing(tabsContainerRef.current.scrollWidth > tabsContainerRef.current.clientWidth);
      }
    };
    
    // Check on initial render and when categories change
    checkForOverflow();
    
    const resizeObserver = new ResizeObserver(checkForOverflow);
    if (tabsContainerRef.current) {
      resizeObserver.observe(tabsContainerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [categories]);

  // Handle horizontal scrolling with mouse wheel
  useEffect(() => {
    const container = tabsContainerRef.current;
    
    const handleWheel = (e: WheelEvent) => {
      if (container && overflowing) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [overflowing]);

  return (
    <motion.div
      className="relative w-full overflow-hidden"
      initial={{ maxHeight: 0, opacity: 0 }}
      animate={{ 
        maxHeight: isVisible ? '40px' : '0px',
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        maxHeight: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.3, ease: "easeInOut" }
      }}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${progress * 0.98})`,
        backdropFilter: `blur(${Math.min(8, progress * 8)}px)`,
      }}
      aria-hidden={!isVisible}
    >
      {/* Tabs List */}
      <div className="pr-12">
        <div 
          id="category-tabs-container"
          ref={tabsContainerRef}
          className="flex overflow-x-auto no-scrollbar"
          role="tablist"
          aria-orientation="horizontal"
        >
          {categories.map(({ id, name, icon, path }) => (
            <motion.button
              key={id}
              onClick={() => handleTabClick(id, path)}
              onMouseEnter={() => setHoveredTab(id)}
              onMouseLeave={() => setHoveredTab(null)}
              role="tab"
              aria-selected={activeTab === id}
              aria-controls={`panel-${id}`}
              id={`tab-${id}`}
              className={`flex items-center gap-1 px-3 py-1 text-xs font-medium whitespace-nowrap border-b-2 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${
                activeTab === id
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-600 hover:border-gray-300'
              }`}
              whileHover={{ 
                y: -1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span 
                className="flex items-center"
                animate={{ 
                  rotate: activeTab === id ? [0, 15, 0] : 0,
                  scale: activeTab === id ? [1, 1.15, 1] : 1
                }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  type: "spring",
                  stiffness: 200
                }}
              >
                {icon}
              </motion.span>
              <motion.span
                animate={{ 
                  color: activeTab === id || hoveredTab === id 
                    ? "rgb(249, 115, 22)" // orange-500
                    : "rgb(75, 85, 99)" // gray-600
                }}
                transition={{ duration: 0.2 }}
              >
                {name}
              </motion.span>
              
              {/* Active tab underline animation */}
              {activeTab === id && (
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-orange-500"
                  layoutId="activeTabUnderline"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                  style={{ borderRadius: "1px" }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid Button */}
      <motion.div 
        className="absolute top-0 right-0 h-full flex items-center pl-2 pr-3 z-10"
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="h-5 w-px bg-gray-300" />
        <motion.button
          type="button"
          onClick={handleShowAllClick}
          className="p-1 rounded hover:bg-gray-100 active:bg-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors"
          aria-label="Show all categories"
          title="Show all categories"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <LayoutGrid className="h-4 w-4" />
        </motion.button>
        
        {/* Animated indicator showing more content is available */}
        <AnimatePresence>
          {overflowing && (
            <motion.span 
              className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-transparent" 
              aria-hidden="true"
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: "8px", 
                opacity: [0.3, 0.7, 0.3],
                transition: {
                  opacity: {
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                  }
                }
              }}
              exit={{ width: 0, opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Scroll indicators */}
      <AnimatePresence>
        {overflowing && (
          <>
            <motion.div 
              className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: tabsContainerRef.current?.scrollLeft > 10 ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div 
              className="absolute right-12 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: tabsContainerRef.current && 
                tabsContainerRef.current.scrollWidth > tabsContainerRef.current.clientWidth &&
                tabsContainerRef.current.scrollLeft < 
                tabsContainerRef.current.scrollWidth - tabsContainerRef.current.clientWidth - 10 ? 1 : 0
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CategoryTabs;