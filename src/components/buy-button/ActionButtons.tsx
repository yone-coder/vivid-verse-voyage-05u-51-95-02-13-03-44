
import React from 'react';
import { ShoppingCart, ArrowRight, Zap } from 'lucide-react';

interface ActionButtonsProps {
  handleBuyNow: () => void;
  buttonHover: boolean;
  setButtonHover: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInstantBuy: React.Dispatch<React.SetStateAction<boolean>>;
  rotateIcons: boolean;
  shakeButton: boolean;
  bounceButton: boolean;
  showInstantBuy: boolean;
  handleInstantBuy: () => void;
}

const ActionButtons = ({
  handleBuyNow,
  buttonHover,
  setButtonHover,
  setShowInstantBuy,
  rotateIcons,
  shakeButton,
  bounceButton,
  showInstantBuy,
  handleInstantBuy,
}: ActionButtonsProps) => {
  return (
    <>
      <button
        onClick={handleBuyNow}
        onMouseEnter={() => {
          setButtonHover(true);
          setTimeout(() => setShowInstantBuy(true), 300);
        }}
        onMouseLeave={() => {
          setButtonHover(false); 
          setTimeout(() => setShowInstantBuy(false), 500);
        }}
        className={`bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-1.5 px-4 rounded-lg flex-grow flex items-center justify-center space-x-1 transition-all duration-300 
                   ${buttonHover ? 'shadow-lg scale-105' : 'shadow-md'}
                   ${shakeButton ? 'animate-shake' : ''}
                   ${bounceButton ? 'animate-bounce' : ''}`}
        aria-label="Buy Now"
        style={{ 
          backgroundSize: buttonHover ? '200% 100%' : '100% 100%',
          backgroundPosition: buttonHover ? 'right center' : 'left center'
        }}
      >
        <ShoppingCart size={14} className={rotateIcons ? 'animate-spin' : ''} />
        <span className="text-sm">{buttonHover ? 'Buy Now!' : 'Buy Now'}</span>
        {buttonHover && <ArrowRight size={12} className="ml-1 animate-pulse" />}
      </button>
      
      {showInstantBuy && (
        <button
          onClick={handleInstantBuy}
          className="absolute right-0 -top-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-1.5 px-4 rounded-lg flex items-center justify-center space-x-1 transition-all duration-300 shadow-lg border border-amber-600 animate-bounce"
          style={{animation: "fadeIn 0.3s ease-out, pulse 2s infinite"}}
        >
          <Zap size={14} className="animate-pulse" />
          <span className="text-sm">Express Checkout</span>
        </button>
      )}
    </>
  );
};

export default ActionButtons;
