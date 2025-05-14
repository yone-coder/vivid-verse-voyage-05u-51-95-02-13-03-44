
import React from 'react';
import { Search, Mic, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface HeaderSearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isSearchFocused: boolean;
  handleSearchFocus: () => void;
  handleClearSearch: () => void;
  voiceSearchActive: boolean;
  handleVoiceSearch: () => void;
  isGlowing?: boolean;
}

const HeaderSearchBar = ({
  searchQuery,
  setSearchQuery,
  isSearchFocused,
  handleSearchFocus,
  handleClearSearch,
  voiceSearchActive,
  handleVoiceSearch,
  isGlowing = false
}: HeaderSearchBarProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative flex items-center w-full">
        <div className={cn(
          "absolute left-2",
          isGlowing && "text-orange-500 transition-colors duration-300"
        )}>
          <Search className="h-3.5 w-3.5 text-gray-400" />
        </div>
        <div className="relative w-full search-glow-mini">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-11 py-1 h-7 rounded-full text-xs border border-gray-200 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            placeholder={t('header.search')}
            onFocus={handleSearchFocus}
          />
        </div>
        <div className="absolute right-2 flex items-center gap-1">
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="p-0.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          <button
            type="button"
            onClick={handleVoiceSearch}
            className="p-0.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <Mic className="h-3 w-3" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default HeaderSearchBar;
