import { LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

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

  const handleTabClick = (id: string, path: string) => {
    setActiveTab(id);
    navigate(path, { replace: true });
  };

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
      <div className="pr-[48px]">
        <div className="flex overflow-x-auto no-scrollbar space-x-4">
          {categories.map(({ id, name, icon, path }) => (
            <button
              key={id}
              onClick={() => handleTabClick(id, path)}
              aria-pressed={activeTab === id}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md 
                ${
                  activeTab === id
                    ? 'border-b-2 border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              <span className="text-xl">{icon}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Icon Button on Right */}
      <div className="absolute top-0 right-0 h-full flex items-center pl-2 pr-3 z-10 space-x-2">
        <div className="h-5 w-px bg-gray-300" />
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-gray-200 text-gray-600 transition-all duration-200 ease-in-out transform hover:scale-110"
          aria-label="More options"
        >
          <LayoutGrid className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CategoryTabs;