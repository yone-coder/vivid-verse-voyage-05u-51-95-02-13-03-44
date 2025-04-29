
import React from "react";
import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  progress: number;
}

const CartButton = ({ progress }: CartButtonProps) => {
  return (
    <div className="rounded-full">
      <button
        className="h-7 w-7 rounded-full flex items-center justify-center transition-all duration-700 bg-orange-500"
        style={{
          transform: `scale(${1 + (progress * 0.05)})`,
          boxShadow: `0 ${2 + (progress * 2)}px ${4 + (progress * 4)}px rgba(0, 0, 0, ${0.1 + (progress * 0.1)})`
        }}
      >
        <ShoppingCart
          className="transition-all duration-700"
          style={{
            color: 'white',
            transform: `scale(${1 - (progress * 0.05)})`
          }}
          strokeWidth={1.5}
          size={17}
        />
      </button>
    </div>
  );
};

export default CartButton;
