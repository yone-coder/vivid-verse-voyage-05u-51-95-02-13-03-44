
interface CategoryPanelProps {
  progress: number;
  isOpen: boolean;
  activeTab: string;
  categories: string[];
  setActiveTab: (category: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const CategoryPanel = ({ 
  progress, 
  isOpen, 
  activeTab, 
  categories,
  setActiveTab,
  setIsOpen
}: CategoryPanelProps) => {
  if (progress >= 0.5 || !isOpen) return null;
  
  return (
    <div className="bg-white text-gray-800 p-4 shadow-md rounded-b-lg">
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`py-2 px-4 text-sm font-medium rounded ${
              activeTab === category
                ? 'bg-orange-100 text-orange-500'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => {
              setActiveTab(category);
              setIsOpen(false);
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPanel;
