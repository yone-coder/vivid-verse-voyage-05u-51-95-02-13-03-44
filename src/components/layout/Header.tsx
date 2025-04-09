
import { Link } from "react-router-dom";
import { Search, User, ShoppingCart, Heart, Menu, Camera, MessageCircle, Home, Package, Gift, Percent, ArrowLeft, ChevronDown, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

const categories = [
  { name: "Women's Fashion", subcategories: ["Dresses", "Tops", "Bottoms", "Accessories"] },
  { name: "Men's Fashion", subcategories: ["Shirts", "Pants", "Outerwear", "Shoes"] },
  { name: "Electronics", subcategories: ["Smartphones", "Laptops", "Audio", "Cameras"] },
  { name: "Home & Garden", subcategories: ["Kitchen", "Furniture", "Decor", "Outdoor"] },
  { name: "Beauty", subcategories: ["Skincare", "Makeup", "Fragrance", "Hair Care"] },
  { name: "Sports", subcategories: ["Fitness", "Outdoor Recreation", "Team Sports"] },
  { name: "Toys & Kids", subcategories: ["Toys", "Baby Products", "Children's Clothing"] }
];

const countries = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France"];

export function Header() {
  const isMobile = useIsMobile();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Wait for the mobile detection to stabilize
  useEffect(() => {
    if (isMobile !== undefined) {
      setIsLoaded(true);
    }
  }, [isMobile]);
  
  // Don't render anything until we're sure about mobile status
  if (!isLoaded) {
    return null;
  }
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white">
      {/* Mobile search expanded view */}
      {(isSearchFocused || showSearch) && isMobile ? (
        <div className="py-3 px-3 flex items-center gap-2 bg-orange-500">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 w-9 p-0 rounded-full text-white" 
            onClick={() => {
              setIsSearchFocused(false);
              setShowSearch(false);
            }}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input 
              type="text" 
              placeholder="Search on AliMarket..." 
              className="rounded-full h-9 pr-12 pl-4 bg-white border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm"
              autoFocus
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Camera className="h-4 w-4 text-gray-500" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Search className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Top bar with country selector, language, help, etc. */}
          {!isMobile && (
            <div className="bg-gray-100 text-xs py-1">
              <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <span className="text-gray-600">Ship to:</span>
                      <button className="flex items-center ml-1 text-gray-800 hover:text-orange-500">
                        <span>United States</span>
                        <ChevronDown className="h-3 w-3 ml-0.5" />
                      </button>
                    </div>
                    <Separator orientation="vertical" className="h-3" />
                    <button className="flex items-center text-gray-800 hover:text-orange-500">
                      <span>English</span>
                      <ChevronDown className="h-3 w-3 ml-0.5" />
                    </button>
                    <Separator orientation="vertical" className="h-3" />
                    <button className="flex items-center text-gray-800 hover:text-orange-500">
                      <span>USD</span>
                      <ChevronDown className="h-3 w-3 ml-0.5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Link to="/help" className="text-gray-800 hover:text-orange-500">Help</Link>
                    <Separator orientation="vertical" className="h-3" />
                    <Link to="/wishlist" className="text-gray-800 hover:text-orange-500">Wishlist</Link>
                    <Separator orientation="vertical" className="h-3" />
                    <Link to="/account" className="text-gray-800 hover:text-orange-500">Account</Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Header */}
          <div className={`${isMobile ? 'bg-white py-2 border-b' : 'bg-white py-3 shadow-sm'} px-2`}>
            <div className="container mx-auto px-2 max-w-7xl">
              <div className="flex items-center gap-2">
                {/* Menu button (mobile) */}
                {isMobile && (
                  <Button variant="ghost" size="sm" className="rounded-full p-1.5 text-gray-700">
                    <Menu className="h-5 w-5" />
                  </Button>
                )}
                
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-orange-600 flex-shrink-0 mr-4">
                  AliMarket
                </Link>
                
                {/* Categories dropdown - desktop only */}
                {!isMobile && (
                  <div className="relative mr-4 hidden md:block">
                    <Button variant="outline" className="text-gray-700 border-gray-300 flex items-center gap-1 h-10 bg-white">
                      <span>Categories</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {/* Search */}
                {isMobile ? (
                  <div 
                    className="flex-1 bg-gray-100 rounded-full h-9 flex items-center px-3 shadow-sm"
                    onClick={() => setShowSearch(true)}
                  >
                    <Search className="h-4 w-4 text-gray-400 mr-2" />
                    <div className="text-sm text-gray-400">Search on AliMarket</div>
                  </div>
                ) : (
                  <div className="flex-1 relative mx-4">
                    <div className="flex">
                      <div className="relative flex-1">
                        <Input 
                          type="text" 
                          placeholder="Search on AliMarket..."
                          className="rounded-l-full h-10 pr-10 pl-4 bg-gray-100 border-r-0 focus-visible:ring-orange-200 focus-visible:ring-offset-0 shadow-sm"
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setTimeout(() => setIsSearchFocused(false), 100)}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                          <Camera className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                      <Button className="rounded-l-none rounded-r-full h-10 bg-orange-500 hover:bg-orange-600">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* User actions */}
                <div className="flex items-center gap-1 md:gap-3">
                  {!isMobile && (
                    <Button variant="ghost" size="sm" className="hidden md:flex flex-col items-center rounded-full h-12 w-12 p-0">
                      <Bell className="h-5 w-5 mb-0.5" />
                      <span className="text-[10px]">Notifications</span>
                    </Button>
                  )}
                  
                  {!isMobile && (
                    <Link to="/messages" className="hidden md:flex flex-col items-center text-xs py-1 px-2">
                      <MessageCircle className="h-5 w-5 mb-0.5" />
                      <span className="text-[10px]">Messages</span>
                    </Link>
                  )}
                  
                  {!isMobile && (
                    <Link to="/wishlist" className="flex flex-col items-center text-xs py-1 px-2">
                      <div className="relative">
                        <Heart className="h-5 w-5 mb-0.5" />
                        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-medium">5</span>
                      </div>
                      <span className="text-[10px]">Wishlist</span>
                    </Link>
                  )}
                  
                  <Link to="/cart" className="flex flex-col items-center text-xs py-1 px-2 text-gray-700">
                    <div className="relative">
                      <ShoppingCart className="h-5 w-5 mb-0.5" />
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-medium">3</span>
                    </div>
                    <span className="hidden md:inline text-[10px]">Cart</span>
                  </Link>
                  
                  {!isMobile && (
                    <Link to="/account" className="flex flex-col items-center text-xs py-1 px-2">
                      <User className="h-5 w-5 mb-0.5" />
                      <span className="text-[10px]">Account</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Category navigation (desktop) */}
          {!isMobile && (
            <div className="bg-white py-2 hidden md:block border-t">
              <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex gap-6 overflow-x-auto text-sm">
                  <Link to="/discount" className="whitespace-nowrap text-red-500 font-medium flex items-center">
                    <Percent className="h-4 w-4 mr-1" />
                    Flash Deals
                  </Link>
                  {categories.map((category) => (
                    <Link to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} key={category.name} className="whitespace-nowrap hover:text-orange-500 transition-colors">
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Mobile bottom navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 py-1 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-5 gap-1">
            <Link to="/" className="flex flex-col items-center justify-center p-1 text-[10px] text-orange-600">
              <Home className="h-5 w-5 mb-0.5" />
              <span>Home</span>
            </Link>
            <Link to="/categories" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
              <Menu className="h-5 w-5 mb-0.5" />
              <span>Categories</span>
            </Link>
            <Link to="/deals" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
              <Percent className="h-5 w-5 mb-0.5" />
              <span>Deals</span>
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
