
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
        {/* Added proper padding and container styling for the search icon */}
        <div className="flex items-center justify-center ml-2 w-5 h-5">
          <Search className="h-3.5 w-3.5 text-orange-500" />
        </div>
        <input
          className="py-1 px-2 text-xs outline-none bg-gray-100 placeholder-gray-400 w-full"
          placeholder="Search on AliExpress"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleSearchFocus}
        />
        {/* Standardized container sizes for all icons */}
        <div
          className="flex items-center justify-center w-5 h-5 cursor-pointer mx-1 rounded-full hover:bg-gray-200 p-0.5"
          onClick={handleVoiceSearch}
        >
          <Mic className={`h-3.5 w-3.5 ${voiceSearchActive ? 'text-orange-500 bg-orange-100 rounded-full' : 'text-orange-500'}`} />
        </div>
        <div className="flex items-center justify-center w-5 h-5 cursor-pointer mx-1 rounded-full hover:bg-gray-200 p-0.5">
          <QrCode className="h-3.5 w-3.5 text-orange-500" />
        </div>
        {searchQuery && (
          <div
            className="flex items-center justify-center w-5 h-5 cursor-pointer mr-2 rounded-full hover:bg-gray-200"
            onClick={handleClearSearch}
          >
            <X className="h-3.5 w-3.5 text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderSearchBar;
