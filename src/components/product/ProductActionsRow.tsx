
import React from "react";
import { Button } from "@/components/ui/button";

interface ProductActionsRowProps {
  addToCart: () => void;
  buyNow: () => void;
  disabled?: boolean;
}

const ProductActionsRow: React.FC<ProductActionsRowProps> = ({
  addToCart,
  buyNow,
  disabled = false
}) => {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      <Button
        variant="outline"
        size="lg"
        onClick={addToCart}
        disabled={disabled}
        className="rounded-full"
      >
        Add to Cart
      </Button>
      <Button
        variant="default"
        size="lg"
        onClick={buyNow}
        disabled={disabled}
        className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActionsRow;
