
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
  
  // Set initial underline position when component mounts
  useEffect(() => {
    updateUnderlinePosition();
  }, []); // Empty dependency array ensures it only runs once on mount
  
  // Update underline position when active tab changes
  useEffect(() => {
    updateUnderlinePosition();
  }, [activeTab, categories]);
  
  const updateUnderlinePosition = () => {
    const activeIndex = categories.findIndex(category => category.id === activeTab);
    if (activeIndex >= 0 && tabsRef.current[activeIndex]) {
      const currentTab = tabsRef.current[activeIndex];
      if (currentTab) {
        setUnderline({
          left: currentTab.offsetLeft,
          width: currentTab.offsetWidth,
        });
        
        // Scroll active tab into view with smoother behavior
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const tabElement = currentTab;
          
          // Calculate position to center the tab
          const scrollLeft = tabElement.offsetLeft - (container.offsetWidth / 2) + (tabElement.offsetWidth / 2);
          
          // Use smooth scrolling with a custom behavior
          container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    }
  };
  
  // Style for the container - removed the bottom border
  const containerStyle = {
    backgroundColor: `rgba(255, 255, 255, ${0.85 + (progress * 0.15)})`,
    backdropFilter: `blur(${progress * 8}px)`,
  };

  return (
    <div
      className="overflow-x-auto no-scrollbar relative overscroll-x-none"
      style={containerStyle}
      ref={scrollContainerRef}
    >
      <div className="flex">
        {categories.map((category, index) => (
          <Link
            to={category.path}
            key={category.id}
            className={`px-3 py-2 whitespace-nowrap text-xs flex flex-1 items-center justify-center relative ${
              activeTab === category.id
                ? "text-orange-500 font-medium"
                : "text-gray-600"
            }`}
            onClick={(e) => {
              e.preventDefault(); // Prevent full page reload
              setActiveTab(category.id);
              window.history.pushState(null, '', category.path);
            }}
            ref={el => tabsRef.current[index] = el}
          >
            <div className="flex items-center gap-1.5">
              {category.icon}
              <span>{t(`home.${category.id}`)}</span>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Animated underline with improved transition */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-orange-500 rounded-full"
        initial={false}
        animate={{
          left: underline.left,
          width: underline.width,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.8
        }}
      />
    </div>
  );
};

export default CategoryTabs;
