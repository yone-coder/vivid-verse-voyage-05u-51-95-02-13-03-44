
import React, { useState } from "react";
import { Home, Search, User, ShoppingCart, Heart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const IndexBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        <button
          onClick={() => handleTabClick("home", "/")}
          className={`flex flex-col items-center p-2 ${
            isActive("/") ? "text-red-600" : "text-gray-600"
          }`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>

        <button
          onClick={() => handleTabClick("search", "/search")}
          className={`flex flex-col items-center p-2 ${
            isActive("/search") ? "text-red-600" : "text-gray-600"
          }`}
        >
          <Search size={20} />
          <span className="text-xs mt-1">Search</span>
        </button>

        <button
          onClick={() => handleTabClick("wishlist", "/wishlist")}
          className={`flex flex-col items-center p-2 ${
            isActive("/wishlist") ? "text-red-600" : "text-gray-600"
          }`}
        >
          <Heart size={20} />
          <span className="text-xs mt-1">Wishlist</span>
        </button>

        <button
          onClick={() => handleTabClick("cart", "/cart")}
          className={`flex flex-col items-center p-2 ${
            isActive("/cart") ? "text-red-600" : "text-gray-600"
          }`}
        >
          <ShoppingCart size={20} />
          <span className="text-xs mt-1">Cart</span>
        </button>

        <button
          onClick={() => handleTabClick("profile", "/profile")}
          className={`flex flex-col items-center p-2 ${
            isActive("/profile") ? "text-red-600" : "text-gray-600"
          }`}
        >
          <User size={20} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default IndexBottomNav;
