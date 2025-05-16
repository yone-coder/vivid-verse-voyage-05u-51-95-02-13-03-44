
import { useState, useRef, useEffect } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Home, ShoppingBag, Users, Image, MessageSquare, Store } from 'lucide-react';
import HeaderSearchBar from './header/HeaderSearchBar';
import CategoryTabs from './header/CategoryTabs';
import CategoryPanel from './header/CategoryPanel';
import VoiceSearchOverlay from './header/VoiceSearchOverlay';
import HeaderLanguage from './header/HeaderLanguage';
import NotificationBadge from './header/NotificationBadge';
import HeaderLogoToggle from './header/HeaderLogoToggle';
import { useAuthOverlay } from '@/context/AuthOverlayContext';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'react-router-dom';

interface AliExpressHeaderProps {
  activeTabId?: string;
}

export default function AliExpressHeader({ activeTabId = 'recommendations' }: AliExpressHeaderProps) {
  const { progress } = useScrollProgress();
  const { t } = useLanguage();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(activeTabId);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const [isSearchGlowing, setIsSearchGlowing] = useState(false);
  const searchRef = useRef(null);

  // Determine if we should show the top bar based on current route
  const isForYouPage = location.pathname === '/for-you' || location.pathname === '/';

  // Update active tab when prop changes
  useEffect(() => {
    setActiveTab(activeTabId);
  }, [activeTabId]);

  // Enable glowing effect on search focus
  useEffect(() => {
    setIsSearchGlowing(isSearchFocused);
  }, [isSearchFocused]);

  const categories = [
    { id: 'recommendations', name: t('home.forYou'), icon: <Home className="h-3 w-3" />, path: '/for-you' },
    { id: 'posts', name: t('home.posts'), icon: <MessageSquare className="h-3 w-3" />, path: '/posts' },
    { id: 'messages', name: t('home.messages'), icon: <MessageSquare className="h-3 w-3" />, path: '/messages' },
    { id: 'trending', name: t('home.trending'), icon: <Image className="h-3 w-3" />, path: '/trending' },
    { id: 'videos', name: t('home.videos'), icon: <Image className="h-3 w-3" />, path: '/videos' },
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
    <header id="ali-header" className="fixed top-0 w-full z-30">
      {/* Top Bar - Only show on "for-you" page */}
      {isForYouPage && (
        <div
          className="flex items-center justify-between px-2 bg-white shadow-sm transition-all duration-300"
          style={{
            height: '36px', // Reduced from 44px
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
              isGlowing={isSearchGlowing}
            />
          </div>

          {/* Right: Language, Location, and Notifications */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <HeaderLanguage />
            <NotificationBadge />
          </div>
        </div>
      )}

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
