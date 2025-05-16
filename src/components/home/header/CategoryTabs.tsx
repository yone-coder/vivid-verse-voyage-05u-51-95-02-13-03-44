
import { LayoutGrid } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactNode, useRef, useEffect } from 'react';
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

  useEffect(() => {
    // Ensure tabRefs array is the same size as categories
    tabRefs.current = tabRefs.current.slice(0, categories.length);
  }, [categories]);

  const handleTabClick = (id: string, path: string) => {
    setActiveTab(id);
    navigate(path, { replace: true });
  };

  return (
    <div
      className="relative w-full transition-all duration-700 overflow-hidden"
      style={{
        maxHeight: progress > 0.3 ? (iconsOnly ? '56px' : '40px') : '0px', // Increased height for icon-only mode
        opacity: progress > 0.3 ? 1 : 0,
        backgroundColor: `rgba(255, 255, 255, ${progress * 0.98})`,
        backdropFilter: `blur(${progress * 8}px)`,
      }}
    >
      {/* Tabs List */}
      <div className="pr-[48px] h-full">
        <div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto no-scrollbar h-full"
        >
          {categories.map(({ id, name, icon, path }, index) => {
            const isActive = id === activeTab;

            return (
              <button
                key={id}
                ref={el => tabRefs.current[index] = el}
                onClick={() => handleTabClick(id, path)}
                aria-pressed={isActive}
                className={`relative flex items-center ${iconsOnly ? 'justify-center px-6 py-3' : 'gap-1 px-3 py-1'} text-xs font-medium whitespace-nowrap transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 focus-visible:ring-offset-1 ${
                  isActive
                    ? 'text-orange-500'
                    : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50/70 rounded-md'
                }`}
              >
                {iconsOnly ? (
                  <div className="transform scale-[2.0]">{icon}</div>
                ) : (
                  <>
                    <div className="transform scale-[1.75]">{icon}</div>
                    <span>{name}</span>
                  </>
                )}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-orange-50/70 -z-10 rounded-md"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  />
                )}
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
