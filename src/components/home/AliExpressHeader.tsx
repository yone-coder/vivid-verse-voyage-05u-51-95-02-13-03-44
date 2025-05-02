import { useState, useRef, useEffect } from 'react';
import { Search, X, Mic, Bell, QrCode, ChevronDown } from 'lucide-react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import Logo from './Logo';

export default function AliExpressHeaderWithStates() {
  const { progress } = useScrollProgress();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const searchRef = useRef(null);

  const categories = [
    'All', 'Women', 'Men', 'Electronics', 'Home', 'Beauty', 'Kids', 'Sports',
  ];

  const togglePanel = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Do nothing for now
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => setIsSearchFocused(true);
  const handleClearSearch = () => setSearchQuery('');
  const handleVoiceSearch = () => setVoiceSearchActive(!voiceSearchActive);

  return (
 <header className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-700">
  <div
    className="flex items-center justify-between px-2 transition-all duration-700"
    style={{
      height: '44px',
      backgroundColor: `rgba(255, 255, 255, ${progress * 0.95})`,
      backdropFilter: `blur(${progress * 8}px)`,
      backgroundImage:
        progress < 0.5
          ? 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0))'
          : 'none',
    }}
  >
    {/* Left */}
    <div className="flex items-center">
      {progress < 0.5 ? (
        <button
          onClick={togglePanel}
          className="flex items-center space-x-1 h-8 px-3 text-sm font-medium bg-black bg-opacity-30 text-white rounded-full"
        >
          <span>{activeTab}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <Logo width={28} height={28} className="text-orange-500" />
      )}
    </div>

    {/* Middle (Search Bar) */}
    <div className="flex items-center flex-1 mx-2">
      {progress >= 0.5 && (
        <div className="flex flex-grow transition-all duration-500" ref={searchRef}>
          <div
            className={`flex items-center w-full bg-gray-100 rounded-full ${
              isSearchFocused ? 'border border-orange-500' : 'border border-gray-200'
            }`}
          >
            <Search className="ml-2 h-3.5 w-3.5 text-orange-500" />
            <input
              className="py-1 px-2 text-xs outline-none bg-gray-100 placeholder-gray-400 w-full"
              placeholder="Search on AliExpress"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
            />
            <div
              className={`cursor-pointer mx-1 rounded-full ${voiceSearchActive ? 'bg-orange-100' : ''}`}
              onClick={handleVoiceSearch}
            >
              <Mic className="h-3.5 w-3.5 text-orange-500" />
            </div>
            {searchQuery && (
              <div
                className="cursor-pointer mr-2 rounded-full hover:bg-gray-200"
                onClick={handleClearSearch}
              >
                <X className="h-3 w-3 text-gray-500" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>

    {/* Right Icons */}
    <div className="flex items-center space-x-2 flex-shrink-0">
      {progress < 0.5 && (
        <div className="cursor-pointer bg-black bg-opacity-40 p-1 rounded-full">
          <Search className="h-4 w-4 text-white" />
        </div>
      )}

      <div className="cursor-pointer relative hover:bg-black hover:bg-opacity-30 p-1 rounded-full">
        <Bell className={`h-4 w-4 ${progress < 0.5 ? 'text-white' : 'text-gray-600'}`} />
        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
          2
        </span>
      </div>
      <div className="cursor-pointer hover:bg-black hover:bg-opacity-30 p-1 rounded-full">
        <QrCode className={`h-4 w-4 ${progress < 0.5 ? 'text-white' : 'text-gray-600'}`} />
      </div>
    </div>
  </div>
</header>
  );
}