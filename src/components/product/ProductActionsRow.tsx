
import React from "react";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProductActionsRowProps {
  isFavorite: boolean;
  toggleFavorite: () => void;
  handleShare: () => void;
  handleCartClick: () => void;
}

const ProductActionsRow: React.FC<ProductActionsRowProps> = ({
  isFavorite,
  toggleFavorite,
  handleShare,
  handleCartClick
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full"
        onClick={toggleFavorite}
      >
        <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full"
        onClick={handleShare}
      >
        <Share2 className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full"
        onClick={handleCartClick}
      >
        <ShoppingCart className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ProductActionsRow;
