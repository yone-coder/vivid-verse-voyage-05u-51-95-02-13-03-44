
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Share, Search, Camera, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductHeaderProps {
  isFavorite: boolean;
  toggleFavorite: () => void;
  handleShare: () => void;
  handleCartClick?: () => void;
  isScrolled?: boolean;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  handleSearch?: (e: React.FormEvent) => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  isFavorite,
  toggleFavorite,
  handleShare,
  handleCartClick = () => {},
  isScrolled = false,
  searchQuery = "",
  setSearchQuery = () => {},
  handleSearch = () => {}
}) => {
  return (
    <div className={`${isScrolled ? 'py-1.5 bg-white shadow-sm' : 'py-2'} px-2 w-full`}>
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button 
            variant={isScrolled ? "ghost" : "outline"} 
            size="sm" 
            className={`rounded-full ${isScrolled ? 'text-gray-700 hover:bg-gray-100 h-7 w-7' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-7 w-7'} p-0`}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </Button>
        </Link>
        
        <div className="flex-1 mx-3 relative hidden md:block">
          <div className="relative w-full max-w-[300px] mx-auto">
            <Input 
              type="text" 
              placeholder="Search products..." 
              className={`h-7 pl-7 pr-7 text-[10px] rounded-full ${isScrolled ? 'border-gray-200' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white placeholder:text-gray-300'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e as unknown as React.FormEvent);
                }
              }}
            />
            <Search className={`absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 ${isScrolled ? 'text-gray-500' : 'text-gray-300'}`} />
            {!isScrolled && <Camera className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-300" />}
          </div>
        </div>
        
        <div className="flex gap-1">
          <Button 
            variant={isScrolled ? "ghost" : "outline"}
            size="sm" 
            className={`rounded-full ${isScrolled ? 'text-gray-700 hover:bg-gray-100 h-7 w-7' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-7 w-7'} p-0`}
            onClick={toggleFavorite}
          >
            <Heart className={`h-3.5 w-3.5 ${isFavorite ? (isScrolled ? "fill-red-500 text-red-500" : "fill-white text-white") : ""}`} />
          </Button>
          <Button 
            variant={isScrolled ? "ghost" : "outline"}
            size="sm" 
            className={`rounded-full ${isScrolled ? 'text-gray-700 hover:bg-gray-100 h-7 w-7' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-7 w-7'} p-0`}
            onClick={handleShare}
          >
            <Share className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant={isScrolled ? "ghost" : "outline"}
            size="sm" 
            className={`rounded-full ${isScrolled ? 'text-gray-700 hover:bg-gray-100 h-7 w-7' : 'bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-7 w-7'} p-0`}
            onClick={handleCartClick}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
