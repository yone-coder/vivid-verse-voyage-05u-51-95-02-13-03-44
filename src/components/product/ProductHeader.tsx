
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Share, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductHeaderProps {
  isFavorite: boolean;
  toggleFavorite: () => void;
  handleShare: () => void;
  isScrolled?: boolean;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  isFavorite,
  toggleFavorite,
  handleShare,
  isScrolled = false
}) => {
  if (isScrolled) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-orange-500 z-30 shadow-sm">
        <div className="flex items-center h-12 px-2">
          <Link to="/" className="mr-1">
            <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0 text-white hover:bg-orange-600">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1 relative">
            <Input 
              type="text" 
              placeholder="Search products..." 
              className="h-8 pl-8 pr-3 text-xs rounded-full border-0"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
          </div>
          <div className="flex gap-1 ml-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full h-8 w-8 p-0 text-white hover:bg-orange-600"
              onClick={toggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-white" : ""}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full h-8 w-8 p-0 text-white hover:bg-orange-600"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-2 left-0 right-0 flex justify-between z-10 px-2">
      <Link to="/">
        <Button variant="outline" size="sm" className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </Link>
      <div className="flex-1 mx-3 relative hidden md:block">
        <div className="relative w-full max-w-[300px] mx-auto">
          <Input 
            type="text" 
            placeholder="Search products..." 
            className="h-8 pl-8 pr-3 bg-black/30 backdrop-blur-sm hover:bg-black/40 text-xs rounded-full border-0 text-white placeholder:text-gray-300"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-300" />
        </div>
      </div>
      <div className="flex gap-1">
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white"
          onClick={toggleFavorite}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-white text-white" : ""}`} />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 border-0 text-white"
          onClick={handleShare}
        >
          <Share className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductHeader;
