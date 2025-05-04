
import { Search, X, Mic, QrCode } from 'lucide-react';
import { useRef } from 'react';

interface HeaderSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchFocused: boolean;
  handleSearchFocus: () => void;
  handleClearSearch: () => void;
  voiceSearchActive: boolean;
  handleVoiceSearch: () => void;
}

const HeaderSearchBar = ({
  searchQuery,
  setSearchQuery,
  isSearchFocused,
  handleSearchFocus,
  handleClearSearch,
  voiceSearchActive,
  handleVoiceSearch
}: HeaderSearchBarProps) => {
  return (
    <div className="flex-grow transition-all duration-300">
      <div
        className={`flex items-center w-full bg-gray-100 rounded-full ${
          isSearchFocused
            ? 'border border-orange-500'
            : 'border border-gray-200'
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
        <div className="cursor-pointer mx-1 rounded-full hover:bg-gray-200 p-0.5">
          <QrCode className="h-3.5 w-3.5 text-orange-500" />
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
  );
};

export default HeaderSearchBar;
