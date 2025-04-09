
import { Link, useLocation } from "react-router-dom";
import { Search, User, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

export function Header() {
  const isMobile = useIsMobile();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  
  const isProductPage = location.pathname.includes('/product/');
  
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
  
  // Skip rendering the regular header on product pages
  if (isProductPage) {
    return null;
  }

  // Expanded search view for mobile
  if ((isSearchFocused || showSearch) && isMobile) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 py-3 px-4 flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 w-9 p-0 rounded-full text-white" 
          onClick={() => {
            setIsSearchFocused(false);
            setShowSearch(false);
          }}
        >
          <Search className="h-5 w-5" />
        </Button>
        <div className="flex-1 relative">
          <Input 
            type="text" 
            placeholder="Search on mimaht..." 
            className="rounded-full h-9 pl-4 pr-8 bg-white/10 border-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
        </div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-purple-600 to-pink-500 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center h-14 px-4">
          {/* Menu button (mobile) */}
          {isMobile && (
            <Button variant="ghost" size="sm" className="mr-2 p-1 text-white hover:bg-white/10 rounded-full">
              <Menu className="h-6 w-6" />
            </Button>
          )}

          {/* Logo */}
          <Link to="/" className={`text-xl font-bold text-white ${isMobile ? 'mr-auto' : 'mr-6'}`}>
            mimaht
          </Link>

          {/* Search */}
          {isMobile ? (
            <div 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 mr-2"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-5 w-5 text-white" />
            </div>
          ) : (
            <div className="flex-1 max-w-lg relative mx-4">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search on mimaht..." 
                  className="h-10 pl-10 rounded-full bg-white/10 border-0 text-white placeholder:text-white/70 focus-visible:ring-white/20"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 100)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
              </div>
            </div>
          )}

          {/* User account */}
          <Link to="/account" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 mr-2">
            <User className="h-5 w-5 text-white" />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 relative">
            <ShoppingCart className="h-5 w-5 text-white" />
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-purple-700 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </Link>
        </div>
      </div>

      {/* Bottom navigation for mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 py-1.5 shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
          <div className="grid grid-cols-4 gap-1">
            <Link to="/" className="flex flex-col items-center justify-center p-1 text-[10px] text-purple-600">
              <div className="h-6 w-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Home</span>
            </Link>
            <Link to="/categories" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
              <div className="h-6 w-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M10 3H3v7h7V3zM21 3h-7v7h7V3zM21 14h-7v7h7v-7zM10 14H3v7h7v-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Categories</span>
            </Link>
            <Link to="/orders" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
              <div className="h-6 w-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Orders</span>
            </Link>
            <Link to="/account" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
              <div className="h-6 w-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Me</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
