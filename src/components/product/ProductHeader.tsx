
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
  productTitle?: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  isFavorite,
  toggleFavorite,
  handleShare,
  isScrolled = false,
  productTitle
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
          <div className="flex-1 ml-2 truncate">
            <span className="text-sm font-medium text-white truncate">
              {productTitle || "Product Details"}
            </span>
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
