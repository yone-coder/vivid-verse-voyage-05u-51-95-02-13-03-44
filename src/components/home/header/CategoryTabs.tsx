
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

interface CategoryTabsProps {
  progress: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  categories: {
    id: string;
    name: string;
    icon: React.ReactNode;
    path: string;
  }[];
}

const CategoryTabs = ({ progress, activeTab, setActiveTab, categories }: CategoryTabsProps) => {
  const { t } = useLanguage();
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Update underline position when active tab changes
  useEffect(() => {
    const activeIndex = categories.findIndex(category => category.id === activeTab);
    if (activeIndex >= 0 && tabsRef.current[activeIndex]) {
      const currentTab = tabsRef.current[activeIndex];
      if (currentTab) {
        setUnderline({
          left: currentTab.offsetLeft,
          width: currentTab.offsetWidth,
        });
        
        // Scroll active tab into view
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const tabElement = currentTab;
          
          // Calculate position to center the tab
          const scrollLeft = tabElement.offsetLeft - (container.offsetWidth / 2) + (tabElement.offsetWidth / 2);
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    }
  }, [activeTab, categories]);
  
  // Style for the container with fixed width
  const containerStyle = {
    backgroundColor: `rgba(255, 255, 255, ${0.85 + (progress * 0.15)})`,
    backdropFilter: `blur(${progress * 8}px)`,
    width: '100%'
  };

  return (
    <div
      className="overflow-x-auto no-scrollbar relative w-full"
      style={containerStyle}
      ref={scrollContainerRef}
    >
      <div className="flex w-full">
        {categories.map((category, index) => (
          <Link
            to={category.path}
            key={category.id}
            className={`px-3 py-2 whitespace-nowrap text-xs flex flex-1 items-center justify-center relative ${
              activeTab === category.id
                ? "text-orange-500 font-medium"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(category.id)}
            ref={el => tabsRef.current[index] = el}
          >
            <div className="flex items-center gap-1.5">
              {category.icon}
              <span>{t(`home.${category.id}`)}</span>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-orange-500 rounded-full"
        animate={{
          left: underline.left,
          width: underline.width,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      />
    </div>
  );
};

export default CategoryTabs;
