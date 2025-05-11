
import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <div
      className="overflow-x-auto no-scrollbar relative"
      style={{
        backgroundColor: `rgba(255, 255, 255, ${0.85 + (progress * 0.15)})`,
        backdropFilter: `blur(${progress * 8}px)`,
        borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
      }}
    >
      <div className="flex">
        {categories.map((category) => (
          <Link
            to={category.path}
            key={category.id}
            className={`px-3 py-2 whitespace-nowrap text-xs flex flex-1 items-center justify-center relative ${
              activeTab === category.id
                ? "text-orange-500 font-medium"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(category.id)}
          >
            <div className="flex items-center gap-1.5">
              {category.icon}
              <span>{category.name}</span>
            </div>
            {activeTab === category.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
