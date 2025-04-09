
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share, Search, Camera, ShoppingCart, Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ProductHeaderProps {
  isFavorite: boolean;
  toggleFavorite: () => void;
  handleShare: () => void;
  isScrolled?: boolean;
  cartCount?: number;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  isFavorite,
  toggleFavorite,
  handleShare,
  isScrolled = false,
  cartCount = 2
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchInput(false);
    }
  };

  if (isScrolled) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-orange-500 z-30 shadow-sm">
        <div className="flex items-center h-10 px-2">
          {!showSearchInput ? (
            <>
              <Link to="/" className="mr-1">
                <Button variant="ghost" size="sm" className="rounded-full h-7 w-7 p-0 text-white hover:bg-orange-600">
                  <ArrowLeft className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <div 
                className="flex-1 relative bg-white/20 rounded-full px-3 py-1 text-xs text-white backdrop-blur-sm cursor-pointer"
                onClick={() => setShowSearchInput(true)}
              >
                <div className="flex items-center">
                  <Search className="h-3 w-3 mr-1.5" />
                  <span className="text-[10px] opacity-80">Search products...</span>
                </div>
              </div>
              <div className="flex gap-1 ml-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full h-7 w-7 p-0 text-white hover:bg-orange-600"
                  onClick={toggleFavorite}
                >
                  <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-white" : ""}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full h-7 w-7 p-0 text-white hover:bg-orange-600"
                  onClick={handleShare}
                >
                  <Share className="h-3.5 w-3.5" />
                </Button>
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="rounded-full h-7 w-7 p-0 text-white hover:bg-orange-600" 
                    onClick={() => navigate('/cart')}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            // Search input when expanded
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
              <Button 
                variant="ghost" 
                size="sm" 
                type="button"
                className="rounded-full h-7 w-7 p-0 text-white hover:bg-orange-600 mr-1"
                onClick={() => setShowSearchInput(false)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
              <div className="flex-1 relative">
                <Input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="h-7 pl-7 pr-7 text-[10px] rounded-full border-0"
                  autoFocus
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
                {searchQuery && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-2.5 w-2.5 text-gray-500" />
                  </Button>
                )}
              </div>
              <div className="flex gap-1 ml-1">
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full h-7 w-7 p-0 text-white hover:bg-orange-600"
                >
                  <Camera className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full h-7 w-7 p-0 text-white hover:bg-orange-600"
                >
                  <Mic className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  type="submit"
                  variant="secondary" 
                  size="sm" 
                  className="h-7 px-2 text-[10px] bg-white/90 text-orange-600 hover:bg-white rounded-full"
                >
                  Search
                </Button>
              </div>
            </form>
          )}
        </div>
        
        {/* Quick action chip shortcuts */}
        {!showSearchInput && (
          <div className="overflow-x-auto no-scrollbar bg-orange-500/90 py-1 px-2">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <Badge variant="outline" className="bg-white/20 text-white border-transparent text-[8px] px-2 py-0.5 hover:bg-white/30">
                Similar Items
              </Badge>
              <Badge variant="outline" className="bg-white/20 text-white border-transparent text-[8px] px-2 py-0.5 hover:bg-white/30">
                Related Products
              </Badge>
              <Badge variant="outline" className="bg-white/20 text-white border-transparent text-[8px] px-2 py-0.5 hover:bg-white/30">
                Compare Prices
              </Badge>
              <Badge variant="outline" className="bg-white/20 text-white border-transparent text-[8px] px-2 py-0.5 hover:bg-white/30">
                Save for Later
              </Badge>
              <Badge variant="outline" className="bg-white/20 text-white border-transparent text-[8px] px-2 py-0.5 hover:bg-white/30">
                Customer Reviews
              </Badge>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="absolute top-2 left-0 right-0 flex justify-between z-10 px-2">
      <Link to="/">
        <Button variant="outline" size="sm" className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-7 w-7 p-0">
          <ArrowLeft className="h-3.5 w-3.5" />
        </Button>
      </Link>
      
      {/* Search bar for desktop */}
      <div className="flex-1 mx-3 relative hidden md:block">
        <div className="relative w-full max-w-[300px] mx-auto">
          <Input 
            type="text" 
            placeholder="Search products..." 
            className="h-7 pl-7 pr-7 bg-black/30 backdrop-blur-sm hover:bg-black/40 text-[10px] rounded-full border-0 text-white placeholder:text-gray-300"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-300" />
          <Camera className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-300" />
        </div>
      </div>
      
      {/* Right side actions */}
      <div className="flex gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-7 w-7 p-0 relative"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2" align="end">
            <div className="text-xs font-medium mb-2">Cart ({cartCount})</div>
            <div className="space-y-2">
              {[...Array(cartCount)].map((_, idx) => (
                <div key={idx} className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-md shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-xs truncate">Wireless Earbuds</p>
                    <div className="flex justify-between">
                      <p className="text-[10px] text-red-500 font-medium">$19.99</p>
                      <p className="text-[8px] text-gray-500">Qty: 1</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button size="sm" className="w-full text-xs mt-2 bg-orange-500 hover:bg-orange-600">View Cart</Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-7 w-7 p-0"
          onClick={toggleFavorite}
        >
          <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-white text-white" : ""}`} />
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-7 w-7 p-0"
          onClick={handleShare}
        >
          <Share className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default ProductHeader;
