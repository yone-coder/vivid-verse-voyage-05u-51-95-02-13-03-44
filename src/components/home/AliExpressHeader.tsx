import { useState, useRef, useEffect } from 'react';
import { Search, X, Mic, Bell, QrCode } from 'lucide-react';
import Logo from './Logo';

export default function AliExpressHeader() {
  const [activeTab, setActiveTab] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const searchRef = useRef(null);

  const categories = [
    'All', 'Women', 'Men', 'Electronics', 'Home', 'Beauty', 'Kids', 'Sports',
  ];

  const handleSearchFocus = () => setIsSearchFocused(true);
  const handleClearSearch = () => setSearchQuery('');
  const handleVoiceSearch = () => setVoiceSearchActive(!voiceSearchActive);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-white shadow-sm">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-2" style={{ height: '40px' }}>
        {/* Logo */}
        <Logo width={24} height={24} className="text-orange-500" />

        {/* Search */}
        <div className="flex flex-1 mx-2" ref={searchRef}>
          <div
            className={`flex items-center w-full bg-gray-100 rounded-full ${
              isSearchFocused ? 'border border-orange-500' : 'border border-gray-200'
            }`}
            style={{ height: '28px' }}
          >
            <Search className="ml-2 h-4 w-4 text-orange-500" />
            <input
              className="py-1 px-2 text-xs bg-gray-100 outline-none placeholder-gray-400 w-full"
              placeholder="Search on AliExpress"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
            />
            <div
              className={`cursor-pointer mx-1 rounded-full ${
                voiceSearchActive ? 'bg-orange-100' : ''
              }`}
              onClick={handleVoiceSearch}
            >
              <Mic className="h-4 w-4 text-orange-500" />
            </div>
            {searchQuery && (
              <div
                className="cursor-pointer mr-2 rounded-full hover:bg-gray-200"
                onClick={handleClearSearch}
              >
                <X className="h-3.5 w-3.5 text-gray-500" />
              </div>
            )}
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className="cursor-pointer relative hover:bg-gray-100 p-1 rounded-full">
            <Bell className="h-4 w-4 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
              2
            </span>
          </div>
          <div className="cursor-pointer hover:bg-gray-100 p-1 rounded-full">
            <QrCode className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex overflow-x-auto no-scrollbar bg-white" style={{ height: '28px' }}>
        {categories.map((category) => (
          <button
            key={category}
            className={`whitespace-nowrap px-3 text-xs font-medium transition-all border-b-2 ${
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

      {/* Voice Search Overlay */}
      {voiceSearchActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-4 rounded-xl w-64 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-2 animate-pulse">
              <Mic className="h-6 w-6 text-orange-500" />
            </div>
            <p className="text-sm mb-1">Listening...</p>
            <p className="text-xs text-gray-500 mb-2">Speak now to search</p>
            <button
              className="text-xs px-4 py-1 bg-orange-500 text-white rounded-full"
              onClick={handleVoiceSearch}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </header>
  );
}