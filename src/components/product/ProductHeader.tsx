
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Heart, Share, Search, Camera, ShoppingCart, X, 
  Star, MessageSquare, FileText, Truck, Info, Users, Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductHeaderProps {
  isFavorite: boolean;
  toggleFavorite: () => void;
  handleShare: () => void;
  handleCartClick?: () => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  handleSearch?: (e: React.FormEvent) => void;
  shouldHide?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  totalReviews?: number;
  hasQuestions?: boolean;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  isFavorite,
  toggleFavorite,
  handleShare,
  handleCartClick = () => {},
  searchQuery = "",
  setSearchQuery = () => {},
  handleSearch = () => {},
  shouldHide = false,
  activeTab = "description",
  onTabChange = () => {},
  totalReviews = 0,
  hasQuestions = false
}) => {
  const navigate = useNavigate();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [open, setOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  const searchSuggestions = [
    "Smartphones",
    "Laptops",
    "Gaming consoles",
    "Headphones",
    "Smartwatches",
    "Cameras"
  ];
  
  const activateSearch = () => {
    setIsSearchActive(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };
  
  const deactivateSearch = () => {
    if (searchQuery === "") {
      setIsSearchActive(false);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };
  
  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(e);
    setOpen(false);
  };
  
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchActive) {
        deactivateSearch();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isSearchActive]);

  if (shouldHide) return null;

  // Define tabs
  const tabs = [
    { id: "description", label: "Details", icon: <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> },
    { id: "specs", label: `Specs`, icon: <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> },
    { id: "reviews", label: `Reviews (${totalReviews})`, icon: <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> },
  ];

  return (
    <div className="py-2 sm:py-2.5 bg-white shadow-sm px-1.5 sm:px-2 w-full sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {!isSearchActive && (
          <Link to="/">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-700 hover:bg-gray-100 h-6 w-6 sm:h-7 sm:w-7 rounded-full p-0"
            >
              <ArrowLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Button>
          </Link>
        )}
        
        <div className={`relative ${isSearchActive ? 'flex-1' : 'flex-1'} mx-1.5 sm:mx-2`}>
          <form onSubmit={submitSearch} className="w-full">
            <div className={`relative w-full ${isSearchActive ? 'max-w-full' : 'max-w-full'} mx-auto`}>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div className="relative w-full">
                    <Input 
                      ref={searchInputRef}
                      type="text" 
                      placeholder="Search products..." 
                      className="h-6 sm:h-7 pl-7 sm:pl-8 pr-7 sm:pr-8 text-[10px] sm:text-xs rounded-full border-gray-200"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => {
                        activateSearch();
                        setOpen(true);
                      }}
                      onBlur={() => {
                        if (!open) {
                          deactivateSearch();
                        }
                      }}
                      onClick={() => setOpen(true)}
                    />
                    <Search className="absolute left-2 sm:left-2.5 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-500" />
                    {searchQuery && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 sm:right-1.5 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 p-0 rounded-full"
                        onClick={clearSearch}
                      >
                        <X className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-500" />
                      </Button>
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[250px] sm:w-[300px] md:w-[350px]" align="start">
                  <Command>
                    <CommandInput placeholder="Search products..." value={searchQuery} onValueChange={setSearchQuery} />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        {searchSuggestions.map((suggestion) => (
                          <CommandItem
                            key={suggestion}
                            onSelect={() => {
                              setSearchQuery(suggestion);
                              setOpen(false);
                              submitSearch(new Event('submit') as unknown as React.FormEvent);
                            }}
                          >
                            <Search className="mr-2 h-4 w-4" />
                            {suggestion}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </form>
        </div>
        
        {!isSearchActive ? (
          <div className="flex gap-1">
            <Button 
              variant="ghost"
              size="sm" 
              className="text-gray-700 hover:bg-gray-100 h-6 w-6 sm:h-7 sm:w-7 rounded-full p-0"
              onClick={activateSearch}
            >
              <Search className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Button>
            
            <Button 
              variant="ghost"
              size="sm" 
              className="text-gray-700 hover:bg-gray-100 h-6 w-6 sm:h-7 sm:w-7 rounded-full p-0"
              onClick={toggleFavorite}
            >
              <Heart className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            
            <Button 
              variant="ghost"
              size="sm" 
              className="text-gray-700 hover:bg-gray-100 h-6 w-6 sm:h-7 sm:w-7 rounded-full p-0"
              onClick={handleShare}
            >
              <Share className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Button>
            
            <Button 
              variant="ghost"
              size="sm" 
              className="text-gray-700 hover:bg-gray-100 h-6 w-6 sm:h-7 sm:w-7 rounded-full p-0"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Button>
          </div>
        ) : (
          <Button 
            variant="ghost"
            size="sm" 
            className="text-gray-700 hover:bg-gray-100 h-6 w-6 sm:h-7 sm:w-7 rounded-full p-0"
            onClick={deactivateSearch}
          >
            <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </Button>
        )}
      </div>
      
      <div className="mt-1 px-1 overflow-x-auto no-scrollbar">
        <div className="flex space-x-1 whitespace-nowrap">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-6 sm:h-7 text-[9px] sm:text-[10px] px-2 sm:px-3 rounded-full", 
                activeTab === tab.id 
                  ? "bg-red-500 hover:bg-red-600 text-white border-transparent" 
                  : "border-gray-200"
              )}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
