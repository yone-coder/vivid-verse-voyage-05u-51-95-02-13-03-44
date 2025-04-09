
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Share, Search, Camera } from "lucide-react";
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
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  isFavorite,
  toggleFavorite,
  handleShare,
  isScrolled = false,
  searchQuery = "",
  setSearchQuery = () => {},
  handleSearch = () => {}
}) => {
  if (isScrolled) {
    return (
      <div className="fixed top-0 left-0 right-0 w-full bg-white shadow-sm z-50">
        <div className="flex items-center h-10 px-2">
          <Link to="/" className="mr-1">
            <Button variant="ghost" size="sm" className="rounded-full h-7 w-7 p-0 text-black hover:bg-gray-100">
              <ArrowLeft className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <form className="flex-1 relative" onSubmit={handleSearch}>
            <Input 
              type="text" 
              placeholder="Search products..." 
              className="h-7 pl-7 pr-3 text-[10px] rounded-full border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
          </form>
          <div className="flex gap-1 ml-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full h-7 w-7 p-0 hover:bg-gray-100"
              onClick={toggleFavorite}
            >
              <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full h-7 w-7 p-0 hover:bg-gray-100"
              onClick={handleShare}
            >
              <Share className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 right-0 w-full z-50 px-2 py-3">
      <Link to="/">
        <Button variant="outline" size="sm" className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white h-7 w-7 p-0">
          <ArrowLeft className="h-3.5 w-3.5" />
        </Button>
      </Link>
      <div className="flex-1 mx-3 relative hidden md:block">
        <div className="relative w-full max-w-[300px] mx-auto">
          <Input 
            type="text" 
            placeholder="Search products..." 
            className="h-7 pl-7 pr-7 bg-black/30 backdrop-blur-sm hover:bg-black/40 text-[10px] rounded-full border-0 text-white placeholder:text-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e as unknown as React.FormEvent);
              }
            }}
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-300" />
          <Camera className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-300" />
        </div>
      </div>
      <div className="flex gap-1">
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
