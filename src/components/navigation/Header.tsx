
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on the search page
  const isSearchPage = location.pathname === "/search";
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };
  
  return (
    <header className={`sticky top-0 z-30 w-full bg-white ${isScrolled ? "shadow-sm" : ""} transition-shadow duration-200`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/for-you" className="px-3 py-2 rounded-md hover:bg-gray-100">For You</Link>
                  <Link to="/trending" className="px-3 py-2 rounded-md hover:bg-gray-100">Trending</Link>
                  <Link to="/posts" className="px-3 py-2 rounded-md hover:bg-gray-100">Posts</Link>
                  <Link to="/reels" className="px-3 py-2 rounded-md hover:bg-gray-100">Reels</Link>
                  <Link to="/videos" className="px-3 py-2 rounded-md hover:bg-gray-100">Videos</Link>
                  <Link to="/shops" className="px-3 py-2 rounded-md hover:bg-gray-100">Shops</Link>
                </div>
              </SheetContent>
            </Sheet>
            
            <Link to="/" className="text-xl font-bold text-red-500">
              SocialShop
            </Link>
          </div>
          
          {/* Center: Search (hidden on small screens) */}
          <div className="hidden md:flex max-w-md flex-1 mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 w-full bg-gray-100 border-0 focus-visible:ring-1 focus-visible:ring-red-500"
                />
              </div>
            </form>
          </div>
          
          {/* Right: Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/search" className="md:hidden">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
