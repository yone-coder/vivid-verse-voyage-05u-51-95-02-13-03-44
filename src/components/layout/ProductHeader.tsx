
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, Share, Camera, ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const ProductHeader: React.FC = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();
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
        text: "I found this amazing product on AliMarket!",
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isSearchExpanded && isMobile) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-[#FF4747] z-50 shadow-sm">
        <div className="flex items-center h-12 px-3 py-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full h-8 w-8 p-0 text-white mr-2" 
            onClick={() => setIsSearchExpanded(false)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input 
              type="text" 
              placeholder="Search products..." 
              className="h-8 pl-8 pr-3 text-xs rounded-full border-0 focus-visible:ring-0"
              autoFocus
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <Camera className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
          </div>
        </div>
      </div>
    );
  }

  if (isScrolled) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-[#FF4747] z-50 shadow-sm">
        <div className="flex items-center h-12 px-2">
          <Link to="/" className="mr-1">
            <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0 text-white hover:bg-[#E43E3E]">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          {isMobile ? (
            <div 
              className="flex-1 bg-[#E43E3E] rounded-full h-8 flex items-center px-3"
              onClick={() => setIsSearchExpanded(true)}
            >
              <Search className="h-3.5 w-3.5 text-white/70 mr-2" />
              <div className="text-xs text-white/70">Search products...</div>
            </div>
          ) : (
            <div className="flex-1 relative mx-2">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="h-8 pl-8 pr-3 text-xs rounded-full border-0 focus-visible:ring-0"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
              <Camera className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            </div>
          )}
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full h-8 w-8 p-0 text-white hover:bg-[#E43E3E]"
              onClick={toggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-white" : ""}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full h-8 w-8 p-0 text-white hover:bg-[#E43E3E]"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
            </Button>
            <Link to="/cart">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full h-8 w-8 p-0 text-white hover:bg-[#E43E3E]"
              >
                <div className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-[#FF4747] text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-medium">3</span>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-50 px-4 py-3">
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
            <Input 
              type="text" 
              placeholder="Search products..." 
              className="h-8 pl-8 pr-8 bg-black/30 backdrop-blur-sm text-white text-xs rounded-full border-0 placeholder:text-white/60"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-white/60" />
            <Camera className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-white/60" />
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
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
