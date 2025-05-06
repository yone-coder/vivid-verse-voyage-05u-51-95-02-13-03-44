
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react";

const MobileNavbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          <Link 
            to="/for-you" 
            className={`flex flex-col items-center justify-center w-full h-full text-xs ${
              isActive("/for-you") || isActive("/") ? "text-red-500" : "text-gray-500"
            }`}
          >
            <Home size={20} />
            <span className="mt-1">Home</span>
          </Link>
          
          <Link 
            to="/search" 
            className={`flex flex-col items-center justify-center w-full h-full text-xs ${
              isActive("/search") ? "text-red-500" : "text-gray-500"
            }`}
          >
            <Search size={20} />
            <span className="mt-1">Search</span>
          </Link>
          
          <Link 
            to="/cart" 
            className={`flex flex-col items-center justify-center w-full h-full text-xs ${
              isActive("/cart") ? "text-red-500" : "text-gray-500"
            }`}
          >
            <ShoppingBag size={20} />
            <span className="mt-1">Cart</span>
          </Link>
          
          <Link 
            to="/wishlist" 
            className={`flex flex-col items-center justify-center w-full h-full text-xs ${
              isActive("/wishlist") ? "text-red-500" : "text-gray-500"
            }`}
          >
            <Heart size={20} />
            <span className="mt-1">Wishlist</span>
          </Link>
          
          <Link 
            to="/auth" 
            className={`flex flex-col items-center justify-center w-full h-full text-xs ${
              isActive("/auth") ? "text-red-500" : "text-gray-500"
            }`}
          >
            <User size={20} />
            <span className="mt-1">Account</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
