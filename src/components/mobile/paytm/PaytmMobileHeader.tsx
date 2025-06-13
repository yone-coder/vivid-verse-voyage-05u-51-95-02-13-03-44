
import { useState, useRef, useEffect } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Home, ShoppingBag, Tv, Sofa, ShoppingCart, Car, Gamepad2 } from 'lucide-react';
import HeaderSearchBar from '../../home/header/HeaderSearchBar';
import CategoryTabs from '../../home/header/CategoryTabs';
import CategoryPanel from '../../home/header/CategoryPanel';
import VoiceSearchOverlay from '../../home/header/VoiceSearchOverlay';
import HeaderLanguage from '../../home/header/HeaderLanguage';
import NotificationBadge from '../../home/header/NotificationBadge';
import HeaderLogoToggle from '../../home/header/HeaderLogoToggle';
import { useAuthOverlay } from '@/context/AuthOverlayContext';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'react-router-dom';

interface PaytmMobileHeaderProps {
  activeTabId?: string;
}

export default function PaytmMobileHeader({ activeTabId = 'transfer' }: PaytmMobileHeaderProps) {
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

  // Update active tab when prop changes
  useEffect(() => {
    setActiveTab(activeTabId);
  }, [activeTabId]);

  // Enable glowing effect on search focus
  useEffect(() => {
    setIsSearchGlowing(isSearchFocused);
  }, [isSearchFocused]);

  const categories = [
    { id: 'transfer', name: 'Transfer', icon: <Home className="h-3 w-3" />, path: '/' },
    { id: 'electronics', name: 'Electronics & Tech', icon: <Tv className="h-3 w-3" />, path: '/electronics' },
    { id: 'home', name: 'Home & Living', icon: <Sofa className="h-3 w-3" />, path: '/home-living' },
    { id: 'fashion', name: 'Fashion & Accessories', icon: <ShoppingBag className="h-3 w-3" />, path: '/fashion' },
    { id: 'entertainment', name: 'Entertainment', icon: <Gamepad2 className="h-3 w-3" />, path: '/entertainment' },
    { id: 'kids', name: 'Kids & Hobbies', icon: <ShoppingCart className="h-3 w-3" />, path: '/kids-hobbies' },
    { id: 'sports', name: 'Sports & Outdoors', icon: <ShoppingBag className="h-3 w-3" />, path: '/sports-outdoors' },
    { id: 'automotive', name: 'Automotive', icon: <Car className="h-3 w-3" />, path: '/automotive' },
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
    <header id="paytm-header" className="fixed top-0 w-full z-30">
      {/* Top Bar */}
      <div
        className="flex items-center justify-between px-2 bg-gray-50 transition-all duration-300"
        style={{
          height: '36px',
        }}
      >
        {/* Left: Logo */}
        <HeaderLogoToggle 
          progress={1}
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

        {/* Right: Language and Notifications */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <HeaderLanguage />
          <NotificationBadge />
        </div>
      </div>

      {/* Category Tabs */}
      <CategoryTabs 
        progress={1}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        categories={categories}
      />

      {/* Dropdown Panel */}
      <CategoryPanel 
        progress={1}
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
