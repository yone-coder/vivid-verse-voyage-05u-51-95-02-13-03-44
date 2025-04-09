
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Share, Search, Camera, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductHeaderProps {
  isFavorite: boolean;
  toggleFavorite: () => void;
  handleShare: () => void;
  isScrolled?: boolean;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  handleSearch?: (e: React.FormEvent) => void;
  handleCartClick?: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  isFavorite,
  toggleFavorite,
  handleShare,
  isScrolled = false,
  searchQuery = "",
  setSearchQuery = () => {},
  handleSearch = () => {},
  handleCartClick = () => {}
}) => {
  return (
    <div className={`px-2 py-2 w-full ${isScrolled ? 'bg-orange-500' : 'bg-white shadow-sm'}`}>
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button 
            variant={isScrolled ? "ghost" : "outline"} 
            size="sm" 
            className={`rounded-full ${isScrolled ? 'text-white hover:bg-orange-600 h-7 w-7' : 'bg-gray-100 hover:bg-gray-200 border-0 text-gray-700 h-7 w-7'} p-0`}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </Button>
        </Link>
        
        <div className="flex-1 mx-3 relative hidden md:block">
          <div className="relative w-full max-w-[300px] mx-auto">
            <Input 
              type="text" 
              placeholder="Search products..." 
              className={`h-7 pl-7 pr-7 text-[10px] rounded-full ${isScrolled ? 'border-0' : 'bg-gray-100 border-0 text-gray-700 placeholder:text-gray-500'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e as unknown as React.FormEvent);
                }
              }}
            />
            <Search className={`absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 ${isScrolled ? 'text-gray-100' : 'text-gray-500'}`} />
            <Camera className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
          </div>
        </div>
        
        <div className="flex gap-1">
          <Button 
            variant={isScrolled ? "ghost" : "outline"}
            size="sm" 
            className={`rounded-full ${isScrolled ? 'text-white hover:bg-orange-600 h-7 w-7' : 'bg-gray-100 hover:bg-gray-200 border-0 text-gray-700 h-7 w-7'} p-0`}
            onClick={toggleFavorite}
          >
            <Heart className={`h-3.5 w-3.5 ${isFavorite ? (isScrolled ? "fill-red-500 text-red-500" : "fill-red-500 text-red-500") : ""}`} />
          </Button>
          <Button 
            variant={isScrolled ? "ghost" : "outline"}
            size="sm" 
            className={`rounded-full ${isScrolled ? 'text-white hover:bg-orange-600 h-7 w-7' : 'bg-gray-100 hover:bg-gray-200 border-0 text-gray-700 h-7 w-7'} p-0`}
            onClick={handleCartClick}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant={isScrolled ? "ghost" : "outline"}
            size="sm" 
            className={`rounded-full ${isScrolled ? 'text-white hover:bg-orange-600 h-7 w-7' : 'bg-gray-100 hover:bg-gray-200 border-0 text-gray-700 h-7 w-7'} p-0`}
            onClick={handleShare}
          >
            <Share className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
