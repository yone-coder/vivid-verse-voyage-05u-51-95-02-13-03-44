
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
  { id: 'all', name: 'All', icon: <Home className="h-3 w-3" /> },
  { id: 'trending', name: 'Trending', icon: <Flame className="h-3 w-3" /> },
  { id: 'posts', name: 'Posts', icon: <MessageSquare className="h-3 w-3" /> },
  { id: 'shops', name: 'Shops', icon: <Store className="h-3 w-3" /> },
  { id: 'collections', name: 'Collections', icon: <Layers className="h-3 w-3" /> },
  { id: 'deals', name: 'Deals', icon: <Tag className="h-3 w-3" /> },
  { id: 'new', name: 'New Arrivals', icon: <Clock className="h-3 w-3" /> },
  { id: 'saved', name: 'Saved', icon: <Heart className="h-3 w-3" /> },
  { id: 'followed', name: 'Following', icon: <Users className="h-3 w-3" /> },
  { id: 'activity', name: 'Activity', icon: <Bell className="h-3 w-3" /> },
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
      {/* Top Bar */}
      <div
        className="flex items-center justify-between px-2 transition-all duration-700"
        style={{
          height: '44px',
          backgroundColor: `rgba(255, 255, 255, ${Math.max(progress, 0.05)})`,
          backdropFilter: `blur(${progress * 8}px)`,
          backgroundImage:
            progress < 0.5
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0))'
              : 'none',
        }}
      >
        {/* Left: Logo or Tab */}
        <HeaderLogoToggle 
          progress={progress}
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

      {/* Category Tabs */}
      <CategoryTabs 
        progress={progress}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        categories={categories}
      />

      {/* Dropdown Panel */}
      <CategoryPanel 
        progress={progress}
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
