
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
  Search, User, ShoppingCart, Heart, Menu, Camera, Home, 
  Package, Gift, Percent, ChevronDown, Bell, LogOut, Settings,
  UserCircle, ShoppingBag, Award, HelpCircle, Truck, Headphones,
  Languages, Globe, DollarSign, MessageCircle, CheckSquare, MapPin,
  ChevronRight, Sun, Moon, Phone, Laptop, Monitor, Gamepad, Shirt, Clock,
  BookOpen, Pizza, HardHat, X, Zap, Bookmark, PlusCircle, AlertCircle, MailOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { 
    name: "Electronics", 
    icon: <Laptop className="h-4 w-4" />,
    subcategories: [
      "Smartphones", "Laptops", "Audio", "Cameras", "Gaming", "Accessories",
      "Smart Home", "Computer Components", "TV & Monitors", "Wearables"
    ] 
  },
  { 
    name: "Fashion", 
    icon: <Shirt className="h-4 w-4" />,
    subcategories: [
      "Women's Clothing", "Men's Clothing", "Kids", "Shoes", "Jewelry",
      "Watches", "Bags", "Accessories", "Activewear", "Seasonal Collections"
    ] 
  },
  { 
    name: "Home & Garden", 
    icon: <HardHat className="h-4 w-4" />,
    subcategories: [
      "Kitchen", "Furniture", "Decor", "Bedding", "Bathroom",
      "Garden", "Lighting", "Storage", "Home Appliances", "Tools"
    ] 
  },
  { 
    name: "Beauty", 
    icon: <Bookmark className="h-4 w-4" />,
    subcategories: [
      "Skincare", "Makeup", "Fragrance", "Hair Care", "Personal Care",
      "Men's Grooming", "Health", "K-Beauty", "Organic Products", "Sets & Kits"
    ] 
  },
  { 
    name: "Sports", 
    icon: <Award className="h-4 w-4" />,
    subcategories: [
      "Fitness", "Outdoor Recreation", "Team Sports", "Water Sports", "Winter Sports",
      "Camping", "Activewear", "Sports Nutrition", "Equipment", "Accessories"
    ] 
  },
  { 
    name: "Toys & Kids", 
    icon: <Gamepad className="h-4 w-4" />,
    subcategories: [
      "Toys", "Baby Products", "Children's Clothing", "Educational Toys", "Dolls",
      "Action Figures", "Outdoor Play", "Arts & Crafts", "Board Games", "STEM Toys"
    ] 
  },
  { 
    name: "Automotive", 
    icon: <Truck className="h-4 w-4" />,
    subcategories: [
      "Car Accessories", "Motorcycle", "Tools & Equipment", "GPS & Electronics", "Car Care",
      "Exterior Accessories", "Interior Accessories", "Replacement Parts", "Performance Parts", "Tires & Wheels"
    ] 
  },
];

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
];

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "MXN", symbol: "Mex$", name: "Mexican Peso" },
];

const trendingSearches = [
  "Wireless Earbuds", "Smart Watch", "Laptop Stand", "Phone Case",
  "Gaming Mouse", "LED Strips", "Fitness Tracker", "Smart Home", "Kitchen Gadgets"
];

const recentSearches = [
  "Bluetooth Speaker", "USB C Cable", "Wireless Charger", "Mechanical Keyboard"
];

const wishlistItems = [
  { id: 1, name: "Bluetooth Earbuds", price: 29.99, discount: 15, image: "placeholder.svg" },
  { id: 2, name: "Smart Watch", price: 79.99, discount: 20, image: "placeholder.svg" },
  { id: 3, name: "Mechanical Keyboard", price: 59.99, discount: 10, image: "placeholder.svg" },
  { id: 4, name: "Laptop Stand", price: 24.99, discount: 5, image: "placeholder.svg" },
  { id: 5, name: "Wireless Mouse", price: 19.99, discount: 0, image: "placeholder.svg" },
];

const notifications = [
  { id: 1, type: "order", title: "Order Shipped", message: "Your order #12345 has been shipped", time: "10 min ago" },
  { id: 2, type: "promo", title: "Flash Sale", message: "50% off on electronics for the next 2 hours", time: "1 hour ago" },
  { id: 3, type: "account", title: "Password Changed", message: "Your account password was recently changed", time: "5 hours ago" },
  { id: 4, type: "promo", title: "New Coupon", message: "You received a new coupon: SUMMER25", time: "1 day ago" },
  { id: 5, type: "order", title: "Order Delivered", message: "Your order #12340 has been delivered", time: "2 days ago" },
];

export function Header() {
  const isMobile = useIsMobile();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [megaMenuCategory, setMegaMenuCategory] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const isProductPage = location.pathname.includes('/product/');
  
  // Wait for the mobile detection to stabilize
  useEffect(() => {
    if (isMobile !== undefined) {
      setIsLoaded(true);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCurrencyChange = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency);
    toast({
      title: "Currency Changed",
      description: `Currency has been changed to ${currency.name}`,
    });
  };

  const handleLanguageChange = (language: typeof languages[0]) => {
    setSelectedLanguage(language);
    toast({
      title: "Language Changed",
      description: `Language has been changed to ${language.name}`,
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    toast({
      title: `${isDarkMode ? "Light" : "Dark"} Mode Activated`,
      description: `Switched to ${isDarkMode ? "light" : "dark"} mode`,
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
      setShowSearch(false);
      setIsCommandOpen(false);
    }
  };

  const handleNotificationClear = () => {
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been cleared",
    });
    setIsNotificationsOpen(false);
  };
  
  // Don't render anything until we're sure about mobile status
  if (!isLoaded) {
    return null;
  }
  
  // Skip rendering the regular header on product pages
  if (isProductPage) {
    return null;
  }

  // Mobile menu drawer
  const renderMobileMenu = () => {
    if (!isMenuOpen) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          ref={menuRef}
          className="fixed top-0 left-0 h-full w-[80%] max-w-[320px] bg-white z-50 flex flex-col overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <UserCircle className="h-6 w-6 text-gray-600 mr-2" />
              <div>
                <div className="text-sm font-medium">Hello, Sign In</div>
                <div className="text-xs text-gray-500">Account & Lists</div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="overflow-auto flex-grow">
            <div className="p-2 font-medium text-lg border-b bg-gray-50">Browse Categories</div>
            {categories.map((category) => (
              <div key={category.name} className="border-b">
                <Link 
                  to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between p-3 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span>{category.name}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
            ))}

            <div className="p-2 font-medium text-lg border-b bg-gray-50 mt-2">Account</div>
            <div className="border-b">
              <Link 
                to="/account"
                className="flex items-center justify-between p-3 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Your Account</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
            <div className="border-b">
              <Link 
                to="/orders"
                className="flex items-center justify-between p-3 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>Orders</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
            <div className="border-b">
              <Link 
                to="/wishlist"
                className="flex items-center justify-between p-3 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </div>

            <div className="p-2 font-medium text-lg border-b bg-gray-50 mt-2">Settings</div>
            <div className="border-b">
              <div 
                className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                onClick={toggleTheme}
              >
                <div className="flex items-center gap-2">
                  {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span>Dark Mode</span>
                </div>
                <div className="flex items-center h-5">
                  <div className={`w-10 h-5 rounded-full transition-colors ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'} relative`}>
                    <div className={`absolute top-[2px] w-4 h-4 rounded-full bg-white transition-all ${isDarkMode ? 'right-[2px]' : 'left-[2px]'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2 font-medium text-lg border-b bg-gray-50 mt-2">Help & Contact</div>
            <div className="border-b">
              <Link 
                to="/help"
                className="flex items-center justify-between p-3 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>Help Center</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
            <div className="border-b">
              <Link 
                to="/contact"
                className="flex items-center justify-between p-3 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Headphones className="h-4 w-4" />
                  <span>Contact Us</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
          </div>

          <div className="p-4 border-t mt-auto">
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {selectedLanguage.flag} {selectedLanguage.code.toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">
                  <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {languages.map((lang) => (
                    <DropdownMenuItem 
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {selectedCurrency.code}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">
                  <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {currencies.map((currency) => (
                    <DropdownMenuItem 
                      key={currency.code}
                      onClick={() => handleCurrencyChange(currency)}
                    >
                      <span className="mr-2">{currency.symbol}</span>
                      {currency.code} - {currency.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <form onSubmit={handleSearchSubmit}>
          <CommandInput 
            placeholder="Search products, brands, categories..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
        </form>
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {recentSearches.length > 0 && (
            <CommandGroup heading="Recent Searches">
              {recentSearches.map((item) => (
                <CommandItem 
                  key={item}
                  onSelect={() => {
                    setSearchQuery(item);
                    setIsCommandOpen(false);
                    navigate(`/search?q=${encodeURIComponent(item)}`);
                  }}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{item}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandGroup heading="Trending">
            {trendingSearches.map((item) => (
              <CommandItem 
                key={item}
                onSelect={() => {
                  setSearchQuery(item);
                  setIsCommandOpen(false);
                  navigate(`/search?q=${encodeURIComponent(item)}`);
                }}
              >
                <Zap className="mr-2 h-4 w-4" />
                <span>{item}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Categories">
            {categories.slice(0, 5).map((category) => (
              <CommandItem 
                key={category.name}
                onSelect={() => {
                  setIsCommandOpen(false);
                  navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`);
                }}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <header className="sticky top-0 z-40 w-full">
        <style jsx>{`
          :root {
            --header-height: ${isMobile ? '97px' : '152px'};
          }
        `}</style>
        {/* Mobile search expanded view */}
        {(isSearchFocused || showSearch) && isMobile ? (
          <div className="py-3 px-3 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 w-9 p-0 rounded-full text-white" 
              onClick={() => {
                setIsSearchFocused(false);
                setShowSearch(false);
              }}
            >
              <X className="h-5 w-5" />
            </Button>
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search on Mimaht..." 
                  className="rounded-full h-9 pr-12 pl-4 bg-white border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={() => {
                      // Handle camera/image search
                      toast({
                        title: "Image Search",
                        description: "Image search feature coming soon!",
                      });
                    }}
                  >
                    <Camera className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button type="submit" variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Search className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Top bar with country selector, language, help, etc. */}
            {!isMobile && (
              <div className="bg-gray-100 text-xs py-1">
                <div className="container mx-auto px-4 max-w-7xl">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 text-gray-600 mr-1" />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="flex items-center text-gray-800 hover:text-purple-600">
                              <span>United States</span>
                              <ChevronDown className="h-3 w-3 ml-0.5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-[200px]">
                            <DropdownMenuLabel>Select Country</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-[200px] overflow-y-auto">
                              <DropdownMenuItem>United States</DropdownMenuItem>
                              <DropdownMenuItem>Canada</DropdownMenuItem>
                              <DropdownMenuItem>United Kingdom</DropdownMenuItem>
                              <DropdownMenuItem>Australia</DropdownMenuItem>
                              <DropdownMenuItem>Germany</DropdownMenuItem>
                              <DropdownMenuItem>France</DropdownMenuItem>
                              <DropdownMenuItem>Spain</DropdownMenuItem>
                              <DropdownMenuItem>Italy</DropdownMenuItem>
                              <DropdownMenuItem>Japan</DropdownMenuItem>
                              <DropdownMenuItem>China</DropdownMenuItem>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Separator orientation="vertical" className="h-3" />
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center text-gray-800 hover:text-purple-600">
                            <Globe className="h-3 w-3 mr-1" />
                            <span>{selectedLanguage.flag} {selectedLanguage.name}</span>
                            <ChevronDown className="h-3 w-3 ml-0.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[200px]">
                          <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <div className="max-h-[200px] overflow-y-auto">
                            {languages.map((lang) => (
                              <DropdownMenuItem 
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang)}
                              >
                                <span className="mr-2">{lang.flag}</span>
                                {lang.name}
                              </DropdownMenuItem>
                            ))}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <Separator orientation="vertical" className="h-3" />
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center text-gray-800 hover:text-purple-600">
                            <DollarSign className="h-3 w-3 mr-1" />
                            <span>{selectedCurrency.code} ({selectedCurrency.symbol})</span>
                            <ChevronDown className="h-3 w-3 ml-0.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[250px]">
                          <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <div className="max-h-[200px] overflow-y-auto">
                            {currencies.map((currency) => (
                              <DropdownMenuItem 
                                key={currency.code}
                                onClick={() => handleCurrencyChange(currency)}
                              >
                                <span className="mr-2">{currency.symbol}</span>
                                {currency.code} - {currency.name}
                              </DropdownMenuItem>
                            ))}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button 
                        className="text-gray-800 hover:text-purple-600 flex items-center"
                        onClick={toggleTheme}
                      >
                        {isDarkMode ? (
                          <>
                            <Sun className="h-3 w-3 mr-1" />
                            <span>Light Mode</span>
                          </>
                        ) : (
                          <>
                            <Moon className="h-3 w-3 mr-1" />
                            <span>Dark Mode</span>
                          </>
                        )}
                      </button>
                      <Separator orientation="vertical" className="h-3" />
                      <Link to="/help" className="text-gray-800 hover:text-purple-600 flex items-center">
                        <HelpCircle className="h-3 w-3 mr-1" />
                        <span>Help</span>
                      </Link>
                      <Separator orientation="vertical" className="h-3" />
                      <Link to="/track-order" className="text-gray-800 hover:text-purple-600 flex items-center">
                        <Truck className="h-3 w-3 mr-1" />
                        <span>Track Order</span>
                      </Link>
                      <Separator orientation="vertical" className="h-3" />
                      <Link to="/contact" className="text-gray-800 hover:text-purple-600 flex items-center">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        <span>Contact Us</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-3 shadow-md">
              <div className="container mx-auto px-2 max-w-7xl">
                <div className="flex items-center gap-2">
                  {/* Menu button (mobile) */}
                  {isMobile && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full p-1.5 text-white hover:bg-white/20"
                      onClick={() => setIsMenuOpen(true)}
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  )}
                  
                  {/* Logo */}
                  <Link to="/" className="text-xl font-bold text-white flex-shrink-0 mr-4">
                    Mimaht
                  </Link>
                  
                  {/* Categories dropdown - desktop only */}
                  {!isMobile && (
                    <div 
                      className="relative mr-4 hidden md:block"
                      onMouseLeave={() => setMegaMenuCategory(null)}
                    >
                      <Button 
                        variant="ghost" 
                        className="text-white hover:bg-white/20 flex items-center gap-1 h-10 border-0"
                        onMouseEnter={() => setMegaMenuCategory("all")}
                      >
                        <span>All Categories</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>

                      {megaMenuCategory === "all" && (
                        <div 
                          className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg z-30 w-[240px] border"
                        >
                          {categories.map((category, index) => (
                            <div 
                              key={category.name}
                              className="relative"
                              onMouseEnter={() => setMegaMenuCategory(category.name)}
                            >
                              <Link 
                                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className={`flex items-center justify-between p-3 hover:bg-gray-50 ${index !== categories.length - 1 ? 'border-b' : ''}`}
                              >
                                <div className="flex items-center gap-2">
                                  {category.icon}
                                  <span>{category.name}</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              </Link>

                              {megaMenuCategory === category.name && (
                                <div 
                                  className="absolute left-full top-0 ml-1 bg-white rounded-md shadow-lg z-30 w-[500px] border p-4"
                                  onMouseLeave={(e) => e.stopPropagation()}
                                >
                                  <div className="font-medium text-lg mb-3 text-purple-600 flex items-center gap-2">
                                    {category.icon}
                                    {category.name}
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    {category.subcategories.map((subcategory) => (
                                      <Link 
                                        key={subcategory}
                                        to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="py-1.5 px-2 hover:bg-gray-50 rounded text-sm text-gray-700 hover:text-purple-600"
                                      >
                                        {subcategory}
                                      </Link>
                                    ))}
                                  </div>
                                  <div className="mt-4 pt-3 border-t">
                                    <Link 
                                      to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="text-purple-600 text-sm font-medium hover:underline"
                                    >
                                      View All {category.name} →
                                    </Link>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Search */}
                  {isMobile ? (
                    <div 
                      className="flex-1 bg-white/20 backdrop-blur-sm rounded-full h-9 flex items-center px-3 shadow-sm"
                      onClick={() => setShowSearch(true)}
                    >
                      <Search className="h-4 w-4 text-white mr-2" />
                      <div className="text-sm text-white">Search on Mimaht</div>
                    </div>
                  ) : (
                    <div className="flex-1 relative mx-4 max-w-xl">
                      <form onSubmit={handleSearchSubmit}>
                        <div className="flex">
                          <div className="relative flex-1">
                            <Input 
                              type="text" 
                              placeholder="Search on Mimaht..."
                              className="rounded-l-full h-10 pr-10 pl-4 bg-white border-r-0 focus-visible:ring-purple-400 focus-visible:ring-offset-0 shadow-sm"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onFocus={() => setIsSearchFocused(true)}
                              onBlur={() => setTimeout(() => setIsSearchFocused(false), 100)}
                            />
                            <button 
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              onClick={() => {
                                // Handle camera/image search
                                toast({
                                  title: "Image Search",
                                  description: "Image search feature coming soon!",
                                });
                              }}
                            >
                              <Camera className="h-4 w-4" />
                            </button>
                          </div>
                          <Button 
                            type="submit"
                            className="rounded-l-none rounded-r-full h-10 bg-purple-700 hover:bg-purple-800"
                          >
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                      </form>

                      {isSearchFocused && !isMobile && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg z-50 border p-4">
                          {recentSearches.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-gray-700">Recent Searches</h3>
                                <button className="text-xs text-purple-600 hover:underline">Clear All</button>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {recentSearches.map((item) => (
                                  <div 
                                    key={item}
                                    className="flex items-center p-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer"
                                    onClick={() => {
                                      setSearchQuery(item);
                                      navigate(`/search?q=${encodeURIComponent(item)}`);
                                    }}
                                  >
                                    <Clock className="h-3.5 w-3.5 mr-2 text-gray-400" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Trending Searches</h3>
                            <div className="grid grid-cols-2 gap-2">
                              {trendingSearches.map((item) => (
                                <div 
                                  key={item}
                                  className="flex items-center p-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer"
                                  onClick={() => {
                                    setSearchQuery(item);
                                    navigate(`/search?q=${encodeURIComponent(item)}`);
                                  }}
                                >
                                  <Zap className="h-3.5 w-3.5 mr-2 text-yellow-500" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t text-center">
                            <span className="text-xs text-gray-500">Press <kbd className="px-1.5 py-0.5 bg-gray-100 border rounded text-xs">ESC</kbd> to close or <kbd className="px-1.5 py-0.5 bg-gray-100 border rounded text-xs">↵ Enter</kbd> to search</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* User actions */}
                  <div className="flex items-center gap-1 md:gap-3">
                    {!isMobile && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex flex-col items-center rounded-none h-12 p-0 text-white hover:bg-white/20">
                            <Bell className="h-5 w-5 mb-0.5" />
                            <span className="text-[10px]">Notifications</span>
                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-purple-700 text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-medium">{notifications.length}</div>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[340px]">
                          <div className="flex items-center justify-between p-3 border-b">
                            <DropdownMenuLabel className="p-0">Notifications ({notifications.length})</DropdownMenuLabel>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={handleNotificationClear}
                              className="h-8 text-xs"
                            >
                              Clear All
                            </Button>
                          </div>
                          <div className="max-h-[350px] overflow-y-auto">
                            {notifications.map((notification) => (
                              <div key={notification.id} className="p-3 border-b hover:bg-gray-50">
                                <div className="flex gap-3">
                                  <div className="rounded-full bg-purple-100 p-2 text-purple-600 h-9 w-9 flex items-center justify-center flex-shrink-0">
                                    {notification.type === 'order' && <Package className="h-4 w-4" />}
                                    {notification.type === 'promo' && <Percent className="h-4 w-4" />}
                                    {notification.type === 'account' && <UserCircle className="h-4 w-4" />}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                      <h4 className="text-sm font-medium">{notification.title}</h4>
                                      <span className="text-xs text-gray-500">{notification.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-2 text-center">
                            <Link to="/notifications" className="text-xs text-purple-600 hover:underline">
                              View All Notifications
                            </Link>
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    
                    {!isMobile && (
                      <Link to="/messages" className="hidden md:flex flex-col items-center text-xs py-1 px-2 text-white hover:bg-white/20 rounded">
                        <MessageCircle className="h-5 w-5 mb-0.5" />
                        <span className="text-[10px]">Messages</span>
                      </Link>
                    )}
                    
                    {!isMobile && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex flex-col items-center rounded-none h-12 p-0 text-white hover:bg-white/20">
                            <div className="relative">
                              <Heart className="h-5 w-5 mb-0.5" />
                              <span className="absolute -top-1 -right-1 bg-yellow-400 text-purple-700 text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-medium">{wishlistItems.length}</span>
                            </div>
                            <span className="text-[10px]">Wishlist</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[320px]">
                          <div className="flex items-center justify-between p-3 border-b">
                            <DropdownMenuLabel className="p-0">Wishlist ({wishlistItems.length})</DropdownMenuLabel>
                            <Link to="/wishlist" className="text-xs text-purple-600 hover:underline">
                              View All
                            </Link>
                          </div>
                          <div className="max-h-[300px] overflow-y-auto">
                            {wishlistItems.map((item) => (
                              <div key={item.id} className="p-3 border-b hover:bg-gray-50">
                                <div className="flex gap-3">
                                  <div className="h-16 w-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-cover" />
                                  </div>
                                  <div className="flex-1">
                                    <Link to={`/product/${item.id}`} className="text-sm font-medium hover:text-purple-600 line-clamp-2">
                                      {item.name}
                                    </Link>
                                    <div className="mt-1 flex items-center gap-2">
                                      <span className="text-sm font-medium text-purple-600">${(item.price * (1 - item.discount / 100)).toFixed(2)}</span>
                                      {item.discount > 0 && (
                                        <span className="text-xs text-gray-500 line-through">${item.price.toFixed(2)}</span>
                                      )}
                                      {item.discount > 0 && (
                                        <Badge className="bg-red-100 text-red-600 hover:bg-red-100 px-1.5 text-[10px]">-{item.discount}%</Badge>
                                      )}
                                    </div>
                                    <div className="mt-2">
                                      <Button size="sm" className="h-7 text-xs bg-purple-600 hover:bg-purple-700">Add to Cart</Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    
                    <Link to="/cart" className="flex flex-col items-center text-xs py-1 px-2 text-white hover:bg-white/20 rounded">
                      <div className="relative">
                        <ShoppingCart className="h-5 w-5 mb-0.5" />
                        <span className="absolute -top-1 -right-1 bg-yellow-400 text-purple-700 text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-medium">3</span>
                      </div>
                      <span className="hidden md:inline text-[10px]">Cart</span>
                    </Link>
                    
                    {!isMobile && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex flex-col items-center rounded-none h-12 p-0 text-white hover:bg-white/20">
                            <User className="h-5 w-5 mb-0.5" />
                            <span className="text-[10px]">Account</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[220px]">
                          <div className="p-3 border-b">
                            <div className="mb-2">
                              <h4 className="font-medium">Welcome!</h4>
                              <p className="text-xs text-gray-500">Access account & manage orders</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 h-8 text-xs bg-purple-600 hover:bg-purple-700">Sign In</Button>
                              <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">Sign Up</Button>
                            </div>
                          </div>
                          <DropdownMenuItem asChild>
                            <Link to="/account" className="flex gap-2 cursor-pointer">
                              <UserCircle className="h-4 w-4" />
                              <span>My Account</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/orders" className="flex gap-2 cursor-pointer">
                              <Package className="h-4 w-4" />
                              <span>Orders</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/wishlist" className="flex gap-2 cursor-pointer">
                              <Heart className="h-4 w-4" />
                              <span>Wishlist</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/returns" className="flex gap-2 cursor-pointer">
                              <PlusCircle className="h-4 w-4" />
                              <span>Returns & Cancellations</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link to="/settings" className="flex gap-2 cursor-pointer">
                              <Settings className="h-4 w-4" />
                              <span>Settings</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/help" className="flex gap-2 cursor-pointer">
                              <HelpCircle className="h-4 w-4" />
                              <span>Help Center</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex gap-2 cursor-pointer text-red-600 hover:text-red-600">
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Category navigation */}
            <div className="bg-white py-2 border-t shadow-sm overflow-x-auto hide-scrollbar">
              <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex gap-6 text-sm">
                  <Link to="/flash-deals" className="whitespace-nowrap text-purple-600 font-medium flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    Flash Deals
                  </Link>
                  <Link to="/superdeals" className="whitespace-nowrap text-purple-600 font-medium">
                    Super Deals
                  </Link>
                  <Link to="/bestsellers" className="whitespace-nowrap hover:text-purple-600 transition-colors">
                    Best Sellers
                  </Link>
                  <Link to="/new-arrivals" className="whitespace-nowrap hover:text-purple-600 transition-colors">
                    New Arrivals
                  </Link>
                  {categories.slice(0, isMobile ? 3 : 6).map((category) => (
                    <Link 
                      to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
                      key={category.name} 
                      className="whitespace-nowrap hover:text-purple-600 transition-colors flex items-center"
                    >
                      {category.icon && <span className="mr-1">{category.icon}</span>}
                      {category.name}
                    </Link>
                  ))}
                  {isMobile && (
                    <Link to="/categories" className="whitespace-nowrap text-purple-600 font-medium">
                      More →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      
        {/* Mobile bottom navigation */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 py-1 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
            <div className="grid grid-cols-5 gap-1">
              <Link to="/" className="flex flex-col items-center justify-center p-1 text-[10px] text-purple-600">
                <Home className="h-5 w-5 mb-0.5" />
                <span>Home</span>
              </Link>
              <Link to="/categories" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
                <Menu className="h-5 w-5 mb-0.5" />
                <span>Categories</span>
              </Link>
              <Link to="/deals" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
                <Percent className="h-5 w-5 mb-0.5" />
                <span>Deals</span>
              </Link>
              <Link to="/orders" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
                <Package className="h-5 w-5 mb-0.5" />
                <span>Orders</span>
              </Link>
              <Link to="/account" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
                <User className="h-5 w-5 mb-0.5" />
                <span>Account</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {renderMobileMenu()}
      
      {/* Helper element to create proper spacing for fixed bottom navigation on mobile */}
      {isMobile && <div className="h-14"></div>}
    </>
  );
}

export default Header;
