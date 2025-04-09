
import { Link } from "react-router-dom";
import { Search, User, ShoppingCart, Heart, ChevronDown, Menu, Bell, Camera, MessageCircle, Scan, Home, Package, Gift, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const categories = [
  { name: "All Categories", subcategories: ["Featured", "Popular", "New Arrivals"] },
  { name: "Women's Fashion", subcategories: ["Dresses", "Tops", "Bottoms", "Accessories"] },
  { name: "Men's Fashion", subcategories: ["Shirts", "Pants", "Outerwear", "Shoes"] },
  { name: "Electronics", subcategories: ["Smartphones", "Laptops", "Audio", "Cameras"] },
  { name: "Home & Garden", subcategories: ["Kitchen", "Furniture", "Decor", "Outdoor"] },
  { name: "Beauty", subcategories: ["Skincare", "Makeup", "Fragrance", "Hair Care"] },
  { name: "Sports", subcategories: ["Fitness", "Outdoor Recreation", "Team Sports", "Water Sports"] }
];

export function Header() {
  const isMobile = useIsMobile();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  return (
    <header className="bg-white sticky top-0 z-40 border-b">
      {/* Top promotional banner (desktop only) */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-1.5 text-xs text-white text-center hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 text-left">
              <Link to="#" className="hover:underline">Get the app</Link>
            </div>
            <div className="flex-1 text-center font-bold">
              <span>Deals up to 70% OFF</span>
            </div>
            <div className="flex-1 flex justify-end items-center space-x-4">
              <Link to="#" className="hover:underline">EN</Link>
              <span>|</span>
              <Link to="#" className="hover:underline">USD</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      {isSearchFocused && isMobile ? (
        // Mobile search expanded view
        <div className="py-2 px-3 flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 w-9 p-0 rounded-full" 
            onClick={() => setIsSearchFocused(false)}
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input 
              type="text" 
              placeholder="Search on AliMarket..." 
              className="rounded-full h-9 pr-12 pl-4 bg-gray-100 border-gray-200 focus-visible:ring-orange-200"
              autoFocus
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <Camera className="h-4 w-4 text-gray-500" />
              <Search className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      ) : (
        // Regular header view
        <div className="py-2 px-3">
          <div className="container mx-auto">
            <div className="flex items-center gap-2">
              {/* Menu button (mobile) */}
              {isMobile && (
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              
              {/* Logo */}
              <Link to="/" className="text-xl font-bold text-orange-500 flex-shrink-0 mr-1">
                AliMarket
              </Link>
              
              {/* Search */}
              <div className="flex-1 relative">
                <div className="flex">
                  <Input 
                    type="text" 
                    placeholder={isMobile ? "Search" : "Search on AliMarket..."}
                    className="rounded-full h-9 pr-10 pl-4 bg-gray-100 border-gray-200 focus-visible:ring-orange-200"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 100)}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    {!isMobile && <Camera className="h-4 w-4 text-gray-500 mr-1" />}
                    <Search className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
              
              {/* User actions */}
              <div className="flex items-center gap-1 md:gap-3">
                <Button variant="ghost" size="icon" className="hidden md:flex flex-col items-center rounded-full h-10 w-10">
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Link to="/account" className="hidden md:flex flex-col items-center text-xs p-1">
                  <User className="h-5 w-5 mb-0.5" />
                  <span>Account</span>
                </Link>
                <Link to="/wishlist" className="flex flex-col items-center text-xs p-1">
                  <Heart className="h-5 w-5 mb-0.5" />
                  <span className="hidden md:inline">Wishlist</span>
                </Link>
                <Link to="/cart" className="flex flex-col items-center text-xs p-1">
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5 mb-0.5" />
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-medium">3</span>
                  </div>
                  <span className="hidden md:inline">Cart</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category navigation (desktop) */}
      <div className="bg-white py-1 hidden md:block border-t">
        <div className="container mx-auto">
          <div className="flex gap-6 overflow-x-auto pb-1 text-sm">
            {categories.map((category) => (
              <Link to="#" key={category.name} className="whitespace-nowrap hover:text-orange-500 transition-colors">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile bottom navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 py-1">
          <div className="grid grid-cols-5 gap-1">
            <Link to="/" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
              <Home className="h-5 w-5 mb-0.5" />
              <span>Home</span>
            </Link>
            <Link to="/categories" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
              <Menu className="h-5 w-5 mb-0.5" />
              <span>Categories</span>
            </Link>
            <Link to="/scan" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
              <Scan className="h-5 w-5 mb-0.5" />
              <span>Scan</span>
            </Link>
            <Link to="/orders" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
              <Package className="h-5 w-5 mb-0.5" />
              <span>Orders</span>
            </Link>
            <Link to="/account" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
              <User className="h-5 w-5 mb-0.5" />
              <span>My Page</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
