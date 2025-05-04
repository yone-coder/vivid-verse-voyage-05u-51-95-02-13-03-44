
import { useState, useRef, useEffect } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Home, ShoppingBag, Users, Image, MessageSquare, Store } from 'lucide-react';
import HeaderSearchBar from './header/HeaderSearchBar';
import CategoryTabs from './header/CategoryTabs';
import CategoryPanel from './header/CategoryPanel';
import VoiceSearchOverlay from './header/VoiceSearchOverlay';
import HeaderLocation from './header/HeaderLocation';
import NotificationBadge from './header/NotificationBadge';
import HeaderLogoToggle from './header/HeaderLogoToggle';

export default function AliExpressHeader() {
  const { progress } = useScrollProgress();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const searchRef = useRef(null);

  const categories = [
    { id: 'recommendations', name: 'For You', icon: <Home className="h-3 w-3" /> },
    { id: 'posts', name: 'Posts', icon: <MessageSquare className="h-3 w-3" /> },
    { id: 'shops', name: 'Shops', icon: <Store className="h-3 w-3" /> },
    { id: 'trending', name: 'Trending', icon: <Image className="h-3 w-3" /> },
    { id: 'videos', name: 'Videos', icon: <Image className="h-3 w-3" /> },
  ];
  const togglePanel = () => setIsOpen(!isOpen);
  const handleSearchFocus = () => setIsSearchFocused(true);
  const handleClearSearch = () => setSearchQuery('');
  const handleVoiceSearch = () => setVoiceSearchActive(!voiceSearchActive);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 w-full z-30">
      {/* Top Bar - Always using white background */}
      <div
        className="flex items-center justify-between px-2 bg-white shadow-sm transition-all duration-300"
        style={{
          height: '44px',
        }}
      >
        {/* Left: Always show Logo */}
        <HeaderLogoToggle 
          progress={1} // Always use the scrolled state
          togglePanel={togglePanel}
          isOpen={isOpen}
          activeTab={activeTab}
        />

        {/* Center: Search Bar */}
        <div className="flex flex-1 mx-2" ref={searchRef}>
          <HeaderSearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isSearchFocused={isSearchFocused}
            handleSearchFocus={handleSearchFocus}
            handleClearSearch={handleClearSearch}
            voiceSearchActive={voiceSearchActive}
            handleVoiceSearch={handleVoiceSearch}
          />
        </div>

        {/* Right: Location and Notifications */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <HeaderLocation />
          <NotificationBadge />
        </div>
      </div>

      {/* Category Tabs - Always with white background */}
      <CategoryTabs 
        progress={1} // Always use the scrolled state
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        categories={categories}
      />

      {/* Dropdown Panel */}
      <CategoryPanel 
        progress={1} // Always use the scrolled state
        isOpen={isOpen}
        activeTab={activeTab}
        categories={categories.map(cat => cat.id)}
        setActiveTab={setActiveTab}
        setIsOpen={setIsOpen}
      />

      {/* Voice Search Overlay */}
      <VoiceSearchOverlay
        active={voiceSearchActive}
        onCancel={handleVoiceSearch}
      />
    </header>
  );
}
