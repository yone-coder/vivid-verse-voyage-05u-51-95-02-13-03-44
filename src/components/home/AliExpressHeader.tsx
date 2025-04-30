
import React, { useState } from 'react';
import { Search, ShoppingCart, User, AlignLeft } from 'lucide-react';

const AliExpressHeader = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const categories = [
    'All',
    'Women',
    'Men', 
    'Electronics',
    'Home',
    'Beauty',
    'Kids',
    'Sports'
  ];

  return (
    <div className="flex flex-col w-full bg-white shadow-sm">
      {/* Main Header - Single line */}
      <div className="flex items-center justify-between px-2 py-2 bg-white border-b border-gray-100">
        {/* Logo */}
        <div className="font-bold text-lg text-orange-500 flex-shrink-0">mima</div>
        
        {/* Search bar - centered and expanding */}
        <div className="flex-1 mx-4 max-w-xl">
          <div className={`flex items-center bg-gray-50 rounded-full ${
            isSearchFocused ? 'border-2 border-orange-500' : 'border border-gray-300'
          }`}>
            <Search className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
            <input 
              className="ml-1 py-1 pl-1 pr-3 text-sm outline-none bg-gray-50 placeholder-gray-400 w-full rounded-full"
              placeholder="Search"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>
        
        {/* Right side icons */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <AlignLeft className="h-5 w-5 text-gray-700" />
          <User className="h-5 w-5 text-gray-700" />
          <ShoppingCart className="h-5 w-5 text-gray-700" />
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar bg-white">
        {categories.map((category) => (
          <button 
            key={category} 
            className={`whitespace-nowrap px-3 py-2 text-xs font-medium transition-all border-b-2 ${
              activeTab === category 
                ? 'border-orange-500 text-orange-500' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AliExpressHeader;
