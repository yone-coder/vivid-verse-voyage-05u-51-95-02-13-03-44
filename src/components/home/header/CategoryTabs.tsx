import { useState } from 'react'; import { LayoutGrid } from 'lucide-react'; import { useNavigate } from 'react-router-dom'; import { ReactNode } from 'react';

interface CategoryTab { id: string; name: string; icon: ReactNode; path: string; }

interface CategoryTabsProps { progress: number; activeTab: string; setActiveTab: (tab: string) => void; categories: CategoryTab[]; iconsOnly?: boolean; }

const CategoryTabs = ({ progress, activeTab, setActiveTab, categories, iconsOnly = false, }: CategoryTabsProps) => { const navigate = useNavigate(); const [animating, setAnimating] = useState(false);

const handleTabClick = (id: string, path: string) => { if (id !== activeTab && !animating) { setAnimating(true); setActiveTab(id); navigate(path, { replace: true });

// Reset animation state after animation completes
  setTimeout(() => setAnimating(false), 300);
}

};

const visible = progress > 0.3; const containerHeight = iconsOnly ? 14 : 12; // h-14 (56px) or h-12 (48px) const bgOpacity = Math.min(progress, 0.98); const blurAmount = Math.round(progress * 8);

return ( <div className={fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-500 ease-out overflow-hidden ${ visible ? h-${containerHeight} opacity-100 : 'h-0 opacity-0' }} style={{ backgroundColor: rgba(255,255,255,${bgOpacity}), backdropFilter: blur(${blurAmount}px), }} > <div className="relative flex items-center justify-between h-full px-4"> <div className="flex space-x-4"> {categories.map((category) => { const isActive = category.id === activeTab; return ( <button key={category.id} onClick={() => handleTabClick(category.id, category.path)} className={flex items-center transition-transform duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-full p-2 ${ isActive ? 'bg-white text-orange-500 scale-110 shadow-lg' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 scale-100' }} aria-label={category.name} > {React.cloneElement( category.icon as React.ReactElement, { size: isActive ? 24 : 20 } )} {!iconsOnly && isActive && ( <span className="ml-2 text-sm font-medium transition-opacity duration-300"> {category.name} </span> )} </button> ); })} </div>

<button
      type="button"
      className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
      aria-label="More options"
    >
      <LayoutGrid size={20} />
    </button>
  </div>
</div>

); };

export default CategoryTabs;

