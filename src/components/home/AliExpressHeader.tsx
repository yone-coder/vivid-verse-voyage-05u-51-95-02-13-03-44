
import { useState, useRef, useEffect } from 'react';
import { Search, X, Mic, Bell, QrCode, ChevronDown } from 'lucide-react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import Logo from './Logo';

export default function AliExpressHeaderWithStates() {
  // Use the scroll progress hook to match product header behavior
  const { progress } = useScrollProgress();
  
  // State for the header toggle
  const [isOpen, setIsOpen] = useState(false);
  
  // States from the original component
  const [activeTab, setActiveTab] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const searchRef = useRef(null);
  
  // To simulate different backgrounds for demo purposes
  const [bgColor, setBgColor] = useState('#333');

  const categories = [
    'All',
    'Women',
    'Men',
    'Electronics',
    'Home',
    'Beauty',
    'Kids',
    'Sports',
  ];

  // Toggle panel state
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // No changes here
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleVoiceSearch = () => {
    setVoiceSearchActive(!voiceSearchActive);
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-700"
      style={{
        boxShadow: `0 ${progress * 4}px ${progress * 8}px rgba(0, 0, 0, ${progress * 0.08})`
      }}
    >
      {/* Main Header - Using scroll progress for dynamic transparency */}
      <div 
        className="flex items-center justify-between px-1 py-2 transition-all duration-700"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${progress * 0.95})`,
          backdropFilter: `blur(${progress * 8}px)`,
          backgroundImage: progress < 0.5 ? 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0))' : 'none'
        }}
      >
        {/* Left section with dropdown in transparent mode, logo in regular mode */}
        <div className="flex items-center">
          {progress < 0.5 ? (
            <button 
              onClick={togglePanel}
              className="tab-button flex items-center justify-center space-x-1 py-2 px-4 font-medium text-sm bg-black bg-opacity-30 text-white rounded-full transition-all duration-200 focus:outline-none"
            >
              <span>{activeTab}</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              />
            </button>
          ) : (
            <div className="mr-0">
              <Logo width={28} height={28} className="text-orange-500" />
            </div>
          )}
        </div>

        {/* Middle section - different for each state */}
        {progress < 0.5 ? (
          <div className="flex-1 flex justify-center">
            {/* Empty space in transparent mode to maintain spacing */}
          </div>
        ) : (
          <div className="flex-1 max-w-xs mx-2 relative" ref={searchRef}>
            <div
              className={`flex items-center bg-gray-100 rounded-full ${
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
                className={`cursor-pointer mx-1 rounded-full ${
                  voiceSearchActive ? 'bg-orange-100' : ''
                }`}
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

        {/* Icons on the right - Updated sizes to match product header (h-4 w-4) with appropriate background transparency */}
        <div className="flex items-center space-x-3">
          {progress < 0.5 ? (
            <>
              <div className="cursor-pointer bg-black bg-opacity-40 p-1.5 rounded-full">
                <Search className="h-4 w-4 text-white" />
              </div>
              <div className="cursor-pointer relative bg-black bg-opacity-40 p-1.5 rounded-full">
                <Bell className="h-4 w-4 text-white" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-3.5 w-3.5 flex items-center justify-center">
                  2
                </span>
              </div>
              <div className="cursor-pointer bg-black bg-opacity-40 p-1.5 rounded-full">
                <QrCode className="h-4 w-4 text-white" />
              </div>
            </>
          ) : (
            <>
              <div className="cursor-pointer relative">
                <Bell className="h-4 w-4 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-3.5 w-3.5 flex items-center justify-center">
                  2
                </span>
              </div>
              <div className="cursor-pointer">
                <QrCode className="h-4 w-4 text-gray-600" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Only show tabs in non-transparent mode (scrolled down) */}
      <div
        className="w-full transition-all duration-700 overflow-hidden"
        style={{
          maxHeight: progress > 0.3 ? "40px" : "0px",
          opacity: progress,
          backgroundColor: `rgba(255, 255, 255, ${progress * 0.98})`,
          backdropFilter: `blur(${progress * 8}px)`,
        }}
      >
        <div className="flex overflow-x-auto no-scrollbar bg-white">
          {categories.map((category) => (
            <button
              key={category}
              className={`whitespace-nowrap px-3 py-1 text-xs font-medium transition-all border-b-2 ${
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

      {/* Panel that opens when the transparent header button is clicked */}
      {progress < 0.5 && isOpen && (
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
      )}

      {/* Voice search overlay */}
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
      
      {/* Add necessary padding to push content below the header based on scroll position */}
      <div 
        aria-hidden="true"
        className="w-full transition-all duration-300" 
        style={{ 
          height: progress > 0.3 ? "84px" : "44px" // Adjusts based on whether tabs are showing
        }}
      />
    </header>
  );
}
