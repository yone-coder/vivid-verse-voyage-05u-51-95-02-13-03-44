
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface CategoryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  categories: {
    id: string;
    name: string;
    icon: React.ReactNode;
    path: string;
  }[];
  progress: number;
  iconsOnly?: boolean;
}

const CategoryTabs = ({
  activeTab,
  setActiveTab,
  categories,
  progress,
  iconsOnly = false
}: CategoryTabsProps) => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className={`w-full bg-white border-b border-gray-200 transition-all duration-200`}>
      <div className="flex items-center overflow-x-auto no-scrollbar">
        {categories.map((category) => {
          const isActive = activeTab === category.id;
          return (
            <button
              key={category.id}
              className={`flex items-center px-3 py-2 whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-600'
              }`}
              onClick={() => handleTabClick(category.id, category.path)}
            >
              <span className="mr-1">{category.icon}</span>
              {!iconsOnly && <span className="text-xs">{category.name}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
