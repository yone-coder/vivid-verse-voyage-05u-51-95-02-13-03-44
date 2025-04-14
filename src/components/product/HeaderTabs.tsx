
import React, { useState, useRef, useEffect } from 'react';

interface HeaderTabsProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

const HeaderTabs = ({ activeTab, onTabChange }: HeaderTabsProps) => {
  const [tabUnderlineStyle, setTabUnderlineStyle] = useState({});
  const tabsRef = useRef<Array<HTMLDivElement | null>>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const tabs = [
    { id: 0, name: 'Description' },
    { id: 1, name: 'Specifications' },
    { id: 2, name: 'Reviews' },
    { id: 3, name: 'Q&As' },
    { id: 4, name: 'Shipping' },
    { id: 5, name: 'Return Policy' },
    { id: 6, name: 'Recommendations' },
  ];

  // Force a resize check when component mounts to initialize the underline correctly
  useEffect(() => {
    const handleResize = () => {
      if (tabsRef.current[activeTab]) {
        const currentTab = tabsRef.current[activeTab];
        if (currentTab) {
          setTabUnderlineStyle({
            left: currentTab.offsetLeft,
            width: currentTab.offsetWidth,
          });
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    // Initial calculation
    setTimeout(handleResize, 100);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  // Update underline position when active tab changes
  useEffect(() => {
    // Update the underline position and width after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (tabsRef.current[activeTab]) {
        const currentTab = tabsRef.current[activeTab];
        if (currentTab) {
          setTabUnderlineStyle({
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
    }, 50);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    onTabChange(index);
    
    // Also scroll to the corresponding section in the content area
    const section = document.getElementById(`tab-section-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[var(--header-height)] z-40 w-full bg-white shadow-sm">
      <div 
        className="w-full flex overflow-x-auto py-1.5 px-0 bg-white border-b border-gray-200 hide-scrollbar relative" 
        ref={scrollContainerRef}
        style={{ scrollbarWidth: 'none' }}
      >
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`flex-shrink-0 cursor-pointer px-4 whitespace-nowrap text-xs font-medium ${
              activeTab === index ? 'text-red-500' : 'text-gray-600'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.name}
          </div>
        ))}
        {/* Animated underline */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300"
          style={tabUnderlineStyle}
        />
      </div>
    </div>
  );
};

export default HeaderTabs;
