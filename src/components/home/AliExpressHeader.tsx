import { Search, X, Mic, Bell, QrCode } from 'lucide-react';
import Logo from './Logo';

export default function CompactAliExpressHeader() {
  const [activeTab, setActiveTab] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const searchRef = useRef(null);

  const categories = [
    'All', 'Women', 'Men', 'Electronics', 'Home', 'Beauty', 'Kids', 'Sports',
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Close the search bar if clicked outside
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
    <div className="fixed top-0 left-0 w-full z-10 bg-transparent">
      {/* Main Header */}
      <div className="flex items-center justify-between py-4 px-8">
        {/* Logo on the left */}
        <Logo />
        
        {/* Search bar in the middle */}
        <div className="flex-1 max-w-xs mx-2 relative" ref={searchRef}>
          <div className={`flex items-center bg-gray-100 rounded-full ${isSearchFocused ? 'border border-orange-500' : 'border border-gray-200'}`}>
            <Search className="ml-2 h-4 w-4 text-orange-500" />
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
              <Mic className="h-4 w-4 text-orange-500" />
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

        {/* Icons on the right */}
        <div className="flex items-center space-x-3">
          <div className="cursor-pointer relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-3.5 w-3.5 flex items-center justify-center">
              2
            </span>
          </div>
          <div className="cursor-pointer">
            <QrCode className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar bg-white mt-[-6px]">
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
  );
}