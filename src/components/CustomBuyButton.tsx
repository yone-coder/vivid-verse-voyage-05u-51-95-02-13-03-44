
import React, { useState } from "react";
import { ShoppingCart, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface CustomBuyButtonProps {
  product?: {
    name: string;
    price: number;
  };
  selectedColor?: string;
  quantity?: number;
  totalPrice?: number;
}

const CustomBuyButton = ({
  product,
  selectedColor = "Default",
  quantity = 1,
  totalPrice = 24.99
}: CustomBuyButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  
  const addToCart = () => {
    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 1000);
    
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product?.name || 'Product'} (${selectedColor}) added to your cart`,
    });
  };

  const buyNow = () => {
    toast({
      title: "Proceeding to checkout",
      description: `Processing order for ${quantity} x ${product?.name || 'Product'} (${selectedColor})`,
    });
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${isExpanded ? 'h-36' : 'h-16'} bg-white border-t border-gray-200 px-4`}>
      {isExpanded && (
        <div className="pt-3 pb-1 grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="h-12 text-sm"
            onClick={addToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button 
            className="h-12 text-sm bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            onClick={buyNow}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Buy Now
          </Button>
        </div>
      )}
      
      <div className="flex items-center h-16">
        <div className="flex flex-col mr-auto">
          <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
          <span className="text-xs text-gray-500">Free Shipping</span>
        </div>
        
        <Button 
          className={`min-w-36 h-12 text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all ${showCartAnimation ? 'scale-110' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            'Hide Options'
          ) : (
            <>
              Buy Now <ArrowRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CustomBuyButton;
