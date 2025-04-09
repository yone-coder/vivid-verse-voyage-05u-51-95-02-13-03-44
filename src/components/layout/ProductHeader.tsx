
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Search, ShoppingCart, Heart, Share, Camera, ArrowLeft, 
  Menu, X, ChevronDown, ChevronRight, User, Bell, MessageCircle,
  Globe, DollarSign, Zap, Clock, ShoppingBag, Home 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
];

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
];

const trendingSearches = [
  "Wireless Earbuds", "Smart Watch", "Laptop Stand", "Phone Case",
  "Gaming Mouse", "LED Strips", "Fitness Tracker", "Smart Home"
];

const recentlyViewed = [
  { id: 1, name: "Bluetooth Earbuds", price: 29.99, image: "placeholder.svg" },
  { id: 2, name: "Smart Watch", price: 79.99, image: "placeholder.svg" },
  { id: 3, name: "Mechanical Keyboard", price: 59.99, image: "placeholder.svg" },
];

const ProductHeader: React.FC = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Item removed from your wishlist" : "Item added to your wishlist",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this product!",
        text: "I found this amazing product on Mimaht!",
        url: window.location.href,
      }).catch((error) => {
        console.log('Error sharing:', error);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Product link copied to clipboard",
      });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
      setIsSearchExpanded(false);
    }
  };

  const handleLanguageChange = (language: typeof languages[0]) => {
    setSelectedLanguage(language);
    toast({
      title: "Language Changed",
      description: `Language has been changed to ${language.name}`,
    });
  };

  const handleCurrencyChange = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency);
    toast({
      title: "Currency Changed",
      description: `Currency has been changed to ${currency.name}`,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <Link to="/" className="text-xl font-bold">Mimaht</Link>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="overflow-auto flex-grow">
            <Link 
              to="/"
              className="flex items-center justify-between p-3 border-b hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-purple-600" />
                <span>Home</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Link>

            <Link 
              to="/cart"
              className="flex items-center justify-between p-3 border-b hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-purple-600" />
                <span>Cart</span>
              </div>
              <div>
                <Badge className="bg-purple-600 hover:bg-purple-600">3</Badge>
              </div>
            </Link>

            <div className="p-2 font-medium text-lg border-b bg-gray-50 mt-2">Settings</div>

            <div className="border-b">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-between w-full p-3 hover:bg-gray-50 text-left">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-purple-600" />
                      <span>{selectedLanguage.flag} {selectedLanguage.name}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
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
            </div>
            
            <div className="border-b">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-between w-full p-3 hover:bg-gray-50 text-left">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-purple-600" />
                      <span>{selectedCurrency.code} ({selectedCurrency.symbol})</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
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

  if (isSearchExpanded && isMobile) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 z-50 shadow-sm">
        <div className="flex items-center h-12 px-3 py-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full h-8 w-8 p-0 text-white mr-2 hover:bg-white/20" 
            onClick={() => setIsSearchExpanded(false)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="h-8 pl-8 pr-8 text-xs rounded-full border-0 focus-visible:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Camera className="h-3.5 w-3.5 text-gray-500" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (isScrolled) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 z-50 shadow-sm">
        <div className="flex items-center h-12 px-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-white hover:bg-white/20 mr-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          {isMobile ? (
            <div 
              className="flex-1 bg-white/20 backdrop-blur-sm rounded-full h-8 flex items-center px-3"
              onClick={() => setIsSearchExpanded(true)}
            >
              <Search className="h-3.5 w-3.5 text-white/70 mr-2" />
              <div className="text-xs text-white/70">Search products...</div>
            </div>
          ) : (
            <div className="flex-1 relative mx-2">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Search products..." 
                    className="h-8 pl-8 pr-8 text-xs rounded-full border-0 focus-visible:ring-purple-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                  <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Camera className="h-3.5 w-3.5 text-gray-500" />
                  </button>
                </div>
              </form>
            </div>
          )}
          
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full h-8 w-8 p-0 text-white hover:bg-white/20"
              onClick={toggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-white" : ""}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full h-8 w-8 p-0 text-white hover:bg-white/20"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
            </Button>
            <Link to="/cart">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <div className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-purple-800 text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-medium">3</span>
                </div>
              </Button>
            </Link>
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full h-8 w-8 p-0 text-white hover:bg-white/20"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {!isMobile && (
          <div className="h-8 px-3 flex items-center text-xs gap-4 bg-purple-700/60 text-white/80">
            <div className="flex items-center gap-1">
              <span>Ships to:</span>
              <button className="flex items-center text-white hover:text-white/60">
                <span>United States</span>
                <ChevronDown className="h-3 w-3 ml-0.5" />
              </button>
            </div>
            <Separator orientation="vertical" className="h-3 bg-white/30" />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-white hover:text-white/60">
                  <span>{selectedLanguage.flag} {selectedLanguage.code.toUpperCase()}</span>
                  <ChevronDown className="h-3 w-3 ml-0.5" />
                </button>
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
            
            <Separator orientation="vertical" className="h-3 bg-white/30" />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-white hover:text-white/60">
                  <span>{selectedCurrency.code}</span>
                  <ChevronDown className="h-3 w-3 ml-0.5" />
                </button>
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
        )}
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-50 pt-2 px-3">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          {!isMobile && (
            <div className="flex-1 max-w-md mx-auto relative">
              <form onSubmit={handleSearchSubmit}>
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="h-8 pl-8 pr-8 bg-black/30 backdrop-blur-sm text-white text-xs rounded-full border-0 placeholder:text-white/60 focus-visible:ring-white/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 100)}
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-white/60" />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Camera className="h-3.5 w-3.5 text-white/60" />
                </button>
              </form>
              
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg border p-3 z-10">
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-xs font-medium text-gray-700 mb-1.5">Trending Searches</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {trendingSearches.slice(0, 5).map((item) => (
                          <div 
                            key={item}
                            className="flex items-center px-2 py-1 text-xs bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                            onClick={() => {
                              setSearchQuery(item);
                              setIsSearchFocused(false);
                              navigate(`/search?q=${encodeURIComponent(item)}`);
                            }}
                          >
                            <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-medium text-gray-700 mb-1.5">Recently Viewed</h3>
                      <div className="space-y-2">
                        {recentlyViewed.map((item) => (
                          <div key={item.id} className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                              <img src={item.image} alt={item.name} className="max-h-full max-w-full object-cover" />
                            </div>
                            <div>
                              <div className="text-xs font-medium line-clamp-1">{item.name}</div>
                              <div className="text-xs text-gray-500">${item.price.toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white"
              onClick={toggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-white" : ""}`} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
            </Button>
            <Link to="/cart">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white"
              >
                <div className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-medium">3</span>
                </div>
              </Button>
            </Link>
            {isMobile && (
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile search trigger - floating button */}
      {isMobile && (
        <Button
          className="fixed bottom-20 right-4 h-10 w-10 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg z-30 flex items-center justify-center"
          onClick={() => setIsSearchExpanded(true)}
        >
          <Search className="h-5 w-5" />
        </Button>
      )}
      
      {renderMobileMenu()}
    </>
  );
};

export default ProductHeader;
