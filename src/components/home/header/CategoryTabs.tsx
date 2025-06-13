
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
}

const CategoryTabs = ({
  progress,
  activeTab,
  setActiveTab,
  categories,
}: CategoryTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollX = useMotionValue(0);

  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, categories.length);
  }, [categories]);

  useEffect(() => {
    const activeTabIndex = categories.findIndex(cat => cat.id === activeTab);
    const activeTabElement = tabRefs.current[activeTabIndex];
    const containerElement = scrollContainerRef.current;

    if (activeTabElement && containerElement) {
      const newScrollLeft =
        activeTabElement.offsetLeft - (containerElement.offsetWidth / 2) + (activeTabElement.offsetWidth / 2);

      fmAnimate(scrollX, newScrollLeft, {
        duration: 0.4,
        ease: 'easeInOut',
      });
    }
  }, [activeTab, categories, scrollX]);

  useEffect(() => {
    const unsubscribe = scrollX.on('change', latestValue => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = latestValue;
      }
    });
    return () => unsubscribe();
  }, [scrollX]);

  const handleTabClick = (id: string, path: string) => {
    if (id !== activeTab) {
      setActiveTab(id);
      navigate(path, { replace: true });
    }
  };

  // Always render the default tabs state
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
      {/* Tabs List - Full Width No Padding */}
      <div className="h-full">
        <motion.div
          ref={scrollContainerRef}
          className="flex items-center h-full w-full"
        >
          {categories.map(({ id, name, icon, path }, index) => (
            <button
              key={id}
              ref={el => (tabRefs.current[index] = el)}
              onClick={() => handleTabClick(id, path)}
              aria-pressed={activeTab === id}
              className={`relative flex items-center justify-center gap-1 flex-1 py-1 text-xs font-medium transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 focus-visible:ring-offset-1 ${
                activeTab === id
                  ? 'text-orange-500'
                  : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50/70'
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
    </div>
  );
};

export default CategoryTabs;
