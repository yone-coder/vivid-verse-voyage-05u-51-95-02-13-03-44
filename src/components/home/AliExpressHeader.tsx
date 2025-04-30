import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Mic, Bell, QrCode } from 'lucide-react';

export default function TransparentHeader() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const searchRef = useRef(null);

  const categories = ['All', 'Women', 'Men', 'Electronics', 'Home', 'Beauty', 'Kids', 'Sports'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // You can collapse search bar here if needed
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-transparent text-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">YourLogo</div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4" ref={searchRef}>
          <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-md rounded-full px-3 py-1">
            <Search className="w-4 h-4 text-white" />
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-white px-2 py-1 outline-none text-sm"
            />
            {searchQuery && (
              <X
                className="w-4 h-4 text-white cursor-pointer"
                onClick={() => setSearchQuery('')}
              />
            )}
            <Mic
              className={`w-4 h-4 ml-2 cursor-pointer ${
                voiceSearchActive ? 'text-orange-500' : 'text-white'
              }`}
              onClick={() => setVoiceSearchActive(!voiceSearchActive)}
            />
          </div>
        </div>

        {/* Icons */}
        <div className="flex space-x-4">
          <Bell className="w-5 h-5 cursor-pointer" />
          <QrCode className="w-5 h-5 cursor-pointer" />
        </div>
      </div>

      {/* Tab Navigation */}
      <nav className="flex overflow-x-auto no-scrollbar px-6 bg-transparent mt-1 space-x-4 text-sm font-medium">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`pb-1 border-b-2 ${
              activeTab === cat
                ? 'text-orange-500 border-orange-500'
                : 'text-white border-transparent'
            }`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>
    </header>
  );
}