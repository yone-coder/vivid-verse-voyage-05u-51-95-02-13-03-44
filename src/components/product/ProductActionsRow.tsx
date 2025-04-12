
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Share2,
  ShoppingCart,
  RotateCcw,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ProductActionsRowProps {
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  onToggleFavorite?: () => void;
  onShare?: () => void;
  isFavorite?: boolean;
  isDisabled?: boolean;
  disabledReason?: string;
  className?: string;
}

const ProductActionsRow: React.FC<ProductActionsRowProps> = ({
  onAddToCart,
  onBuyNow,
  onToggleFavorite,
  onShare,
  isFavorite = false,
  isDisabled = false,
  disabledReason = "This product is currently unavailable",
  className,
}) => {
  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      if (navigator.share) {
        navigator.share({
          title: "Check out this product",
          text: "I found this amazing product you might like!",
          url: window.location.href,
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Product link copied to clipboard",
        });
      }
    }
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite();
    } else {
      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        description: isFavorite
          ? "Product removed from your wishlist"
          : "Product added to your wishlist",
      });
    }
  };

  const handleAddToCart = () => {
    if (isDisabled) {
      toast({
        title: "Cannot add to cart",
        description: disabledReason,
        variant: "destructive",
      });
      return;
    }

    if (onAddToCart) {
      onAddToCart();
    } else {
      toast({
        title: "Added to cart",
        description: "This product has been added to your cart",
      });
    }
  };

  const handleBuyNow = () => {
    if (isDisabled) {
      toast({
        title: "Cannot proceed",
        description: disabledReason,
        variant: "destructive",
      });
      return;
    }

    if (onBuyNow) {
      onBuyNow();
    } else {
      toast({
        title: "Proceeding to checkout",
        description: "You are being redirected to checkout",
      });
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 w-full flex-wrap sm:flex-nowrap",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full flex-shrink-0"
          onClick={handleToggleFavorite}
        >
          <Heart
            className={cn("h-5 w-5", isFavorite && "fill-red-500 text-red-500")}
          />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full flex-shrink-0"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-1 w-full">
        <Button
          variant="outline"
          className="flex-1 gap-2"
          onClick={handleAddToCart}
          disabled={isDisabled}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>

        <Button
          className="flex-1 gap-2 bg-primary"
          onClick={handleBuyNow}
          disabled={isDisabled}
        >
          Buy Now
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {isDisabled && (
        <div className="w-full text-xs text-destructive flex items-center gap-1 mt-1">
          <AlertCircle className="h-3 w-3" />
          {disabledReason}
        </div>
      )}
    </div>
  );
};

export default ProductActionsRow;
