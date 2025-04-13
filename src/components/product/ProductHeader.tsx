import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share, Search, Camera, ShoppingCart, X } from "lucide-react";
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

interface ProductHeaderProps {
  isFavorite: boolean;
  toggleFavorite: () => void;
  handleShare: () => void;
  handleCartClick?: () => void;
  isScrolled?: boolean;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  handleSearch?: (e: React.FormEvent) => void;
  shouldHide?: boolean;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  isFavorite,
  toggleFavorite,
  handleShare,
  handleCartClick = () => {},
  isScrolled = false,
  searchQuery = "",
  setSearchQuery = () => {},
  handleSearch = () => {},
  shouldHide = false
}) => {
  const navigate = useNavigate();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [open, setOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
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

  return (
    <div className={`${isScrolled ? 'py-1 sm:py-1.5 bg-white shadow-sm' : 'py-1.5 sm:py-2'} px-1.5 sm:px-2 w-full transition-all duration-200`}>
      <div className="flex items-center justify-between">
        {!isSearchActive && (
          <Link to="/">
            <Button 
              variant={isScrolled ? "ghost" : "outline"} 
              size="sm" 
              className={`rounded-full ${isScrolled ? 'text-gray-700 hover:bg-gray-100 h-6 w-6 sm:h-7 sm:w-7' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-6 w-6 sm:h-7 sm:w-7'} p-0`}
            >
              <ArrowLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Button>
          </Link>
        )}
        
        {(isScrolled || isSearchActive) && (
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
                        className={`h-6 sm:h-7 pl-7 sm:pl-8 pr-7 sm:pr-8 text-[10px] sm:text-xs rounded-full ${isScrolled ? 'border-gray-200' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white placeholder:text-gray-300'}`}
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
                      <Search className={`absolute left-2 sm:left-2.5 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-3.5 sm:w-3.5 ${isScrolled ? 'text-gray-500' : 'text-gray-300'}`} />
                      {searchQuery && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 sm:right-1.5 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 p-0 rounded-full"
                          onClick={clearSearch}
                        >
                          <X className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${isScrolled ? 'text-gray-500' : 'text-gray-300'}`} />
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
        )}
        
        {!isSearchActive ? (
          <div className="flex gap-1">
            {!isScrolled && !isSearchActive && (
              <Button 
                variant={isScrolled ? "ghost" : "outline"}
                size="sm" 
                className={`rounded-full ${isScrolled ? 'text-gray-700 hover:bg-gray-100 h-6 w-6 sm:h-7 sm:w-7' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-6 w-6 sm:h-7 sm:w-7'} p-0`}
                onClick={activateSearch}
              >
                <Search className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Button>
            )}
            
            <Button 
              variant={isScrolled ? "ghost" : "outline"}
              size="sm" 
              className={`rounded-full ${isScrolled ? 'text-gray-700 hover:bg-gray-100 h-6 w-6 sm:h-7 sm:w-7' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-6 w-6 sm:h-7 sm:w-7'} p-0`}
              onClick={toggleFavorite}
            >
              <Heart className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${isFavorite ? (isScrolled ? "fill-red-500 text-red-500" : "fill-white text-white") : ""}`} />
            </Button>
            
            <Button 
              variant={isScrolled ? "ghost" : "outline"}
              size="sm" 
              className={`rounded-full ${isScrolled ? 'text-gray-700 hover:bg-gray-100 h-6 w-6 sm:h-7 sm:w-7' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-6 w-6 sm:h-7 sm:w-7'} p-0`}
              onClick={handleShare}
            >
              <Share className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Button>
            
            <Button 
              variant={isScrolled ? "ghost" : "outline"}
              size="sm" 
              className={`rounded-full ${isScrolled ? 'text-gray-700 hover:bg-gray-100 h-6 w-6 sm:h-7 sm:w-7' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-6 w-6 sm:h-7 sm:w-7'} p-0`}
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Button>
          </div>
        ) : (
          <Button 
            variant={isScrolled ? "ghost" : "outline"}
            size="sm" 
            className={`rounded-full ${isScrolled ? 'text-gray-700 hover:bg-gray-100 h-6 w-6 sm:h-7 sm:w-7' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-6 w-6 sm:h-7 sm:w-7'} p-0`}
            onClick={deactivateSearch}
          >
            <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductHeader;
