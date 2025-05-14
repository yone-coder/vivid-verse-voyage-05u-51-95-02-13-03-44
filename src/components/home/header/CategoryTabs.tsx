import { useNavigate } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface CategoryTab {
  id: string;
  name: string;
  icon: React.ReactNode;
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

  const handleTabClick = (categoryId: string, path: string) => {
    setActiveTab(categoryId);
    navigate(path, { replace: true });
  };

  return (
    <AnimatePresence>
      {progress > 0.3 && (
        <motion.div
          key="category-tabs"
          className="relative w-full overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 40, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            backgroundColor: `rgba(255, 255, 255, ${progress * 0.98})`,
            backdropFilter: `blur(${progress * 8}px)`,
          }}
        >
          {/* Scrollable area wrapper */}
          <div className="pr-[48px]">
            <div className="flex overflow-x-auto no-scrollbar">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`whitespace-nowrap px-3 py-1 text-xs font-medium transition-all border-b-2 flex items-center gap-1 transform ${
                    activeTab === category.id
                      ? 'border-orange-500 text-orange-500 scale-105'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => handleTabClick(category.id, category.path)}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Separator + Grid Icon */}
          <div className="absolute top-0 right-0 h-full flex items-center pl-2 pr-3 z-10 space-x-2">
            <div className="h-5 w-px bg-gray-300" />
            <motion.div
              whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
              className="cursor-pointer p-1 rounded"
            >
              <LayoutGrid className="h-4 w-4 text-gray-500" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryTabs;