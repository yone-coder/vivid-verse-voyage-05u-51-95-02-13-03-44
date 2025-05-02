
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingCart, Search, Heart, Menu, Package2 } from "lucide-react";
import { Link } from "react-router-dom";

const MainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Header - Make it fully sticky */}
      <header 
        className={`w-full transition-all duration-300 bg-white z-30 fixed top-0 left-0 right-0 shadow-sm ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        {/* Top navigation */}
        <div className="bg-red-600 text-white px-4 py-1 text-xs flex justify-between">
          <div className="flex space-x-4">
            <Link to="/" className="hover:underline">Welcome</Link>
            <Link to="/" className="hover:underline">Sell on AliExpress</Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/account" className="hover:underline">Account</Link>
            <Link to="/wishlist" className="hover:underline">Wishlist</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
            <Link to="/" className="hover:underline">Help</Link>
            <Link to="/" className="hover:underline">App</Link>
            <Link to="/" className="hover:underline">English / USD</Link>
          </div>
        </div>

        {/* Logo and search */}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-red-600 mr-8">AliExpress</Link>
            <Menu className="h-6 w-6 mr-2 text-gray-500 lg:hidden" />
          </div>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="flex">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="rounded-r-none border-r-0 focus-visible:ring-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" className="rounded-l-none bg-red-600 hover:bg-red-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
          
          <div className="flex items-center space-x-4">
            <Link to="/account" className="hidden md:flex flex-col items-center text-xs">
              <Avatar className="h-6 w-6">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span>Account</span>
            </Link>
            <Link to="/wishlist" className="hidden md:flex flex-col items-center text-xs">
              <Heart className="h-5 w-5 text-gray-700" />
              <span>Wishlist</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-xs">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              <span>Cart</span>
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center space-x-6 px-4 py-2 overflow-x-auto text-sm whitespace-nowrap">
          <Link to="/categories" className="flex items-center space-x-1 text-gray-700 hover:text-red-600">
            <Package2 className="h-4 w-4" />
            <span>All Categories</span>
          </Link>
          <Link to="/" className="hover:text-red-600">Popular</Link>
          <Link to="/" className="hover:text-red-600">Electronics</Link>
          <Link to="/" className="hover:text-red-600">Clothing</Link>
          <Link to="/" className="hover:text-red-600">Home & Garden</Link>
          <Link to="/" className="hover:text-red-600">Beauty</Link>
          <Link to="/" className="hover:text-red-600">Sports</Link>
          <Link to="/" className="hover:text-red-600">Toys</Link>
          <Link to="/" className="hover:text-red-600">Automotive</Link>
        </div>
      </header>

      {/* Content area with padding to account for fixed header height */}
      <main className="flex-1 mt-[132px]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Help</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-red-600">Customer Service</a></li>
                <li><a href="#" className="hover:text-red-600">Disputes & Reports</a></li>
                <li><a href="#" className="hover:text-red-600">Buyer Protection</a></li>
                <li><a href="#" className="hover:text-red-600">Report IPR infringement</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Shopping</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-red-600">Consumer Trends</a></li>
                <li><a href="#" className="hover:text-red-600">Best Sellers</a></li>
                <li><a href="#" className="hover:text-red-600">Price Tracker</a></li>
                <li><a href="#" className="hover:text-red-600">Flash Deals</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-red-600">Electronics</a></li>
                <li><a href="#" className="hover:text-red-600">Fashion</a></li>
                <li><a href="#" className="hover:text-red-600">Home & Garden</a></li>
                <li><a href="#" className="hover:text-red-600">Toys & Hobbies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Follow Us</h3>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-gray-500 hover:text-red-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-red-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-red-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
              <div className="mt-4">
                <h4 className="text-sm mb-2">Payment Methods</h4>
                <div className="flex space-x-2">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-xs">
            <p>&copy; 2025 AliExpress Clone. All rights reserved.</p>
            <p className="mt-1">This is a demo site for educational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
