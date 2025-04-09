
import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useProduct } from "@/hooks/useProduct";
import { Heart, ShoppingCart, Search, Bell, User, Menu, ChevronDown, Globe, Star, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const MainLayout = () => {
  const location = useLocation();
  const isProductPage = location.pathname.includes('/product/');
  const productId = isProductPage ? location.pathname.split('/').pop() : '';
  const { data: product } = useProduct(productId || '');
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Top navigation bar */}
        <div className="hidden border-b bg-muted/40 py-1 sm:block">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 hover:text-primary">
                <Globe className="h-3 w-3" />
                <span>English</span>
                <ChevronDown className="h-3 w-3" />
              </div>
              <Link to="/" className="hover:text-primary">
                Sell on VVVD
              </Link>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Link to="/help" className="flex items-center gap-1 hover:text-primary">
                <HelpCircle className="h-3 w-3" />
                <span>Help</span>
              </Link>
              <Link to="/wishlist" className="flex items-center gap-1 hover:text-primary">
                <Heart className="h-3 w-3" />
                <span>Wishlist</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main header */}
        <div className="container flex h-14 items-center">
          {/* Logo */}
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-pink-600 text-transparent bg-clip-text">
                VVVD
              </span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button className="mr-2 inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden">
            <Menu className="h-5 w-5" />
          </button>
          
          {/* Search bar */}
          <div className="flex-1 md:max-w-md lg:max-w-lg">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, brands, and categories..."
                className="w-full rounded-full bg-muted pl-9 pr-4 focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          </div>
          
          {/* Right navigation */}
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/account"
              className="hidden items-center justify-center rounded-md p-2 text-foreground hover:bg-muted sm:flex"
            >
              <User className="h-5 w-5" />
              <span className="ml-1.5 text-xs hidden lg:inline-block">Account</span>
            </Link>
            <Link
              to="/notifications"
              className="hidden items-center justify-center rounded-md p-2 text-foreground hover:bg-muted sm:flex"
            >
              <Bell className="h-5 w-5" />
              <span className="ml-1.5 text-xs hidden lg:inline-block">Notifications</span>
            </Link>
            <Link
              to="/wishlist"
              className="hidden items-center justify-center rounded-md p-2 text-foreground hover:bg-muted sm:flex"
            >
              <Heart className="h-5 w-5" />
              <span className="ml-1.5 text-xs hidden lg:inline-block">Wishlist</span>
            </Link>
            <Link
              to="/cart"
              className="relative items-center justify-center rounded-md p-2 text-foreground hover:bg-muted flex"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-1.5 text-xs hidden lg:inline-block">Cart</span>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                2
              </span>
            </Link>
          </div>
        </div>
        
        {/* Category bar for non-product pages */}
        {!isProductPage && (
          <div className="hidden border-t sm:block">
            <div className="container flex h-10 items-center gap-4 overflow-x-auto">
              <Link to="/category/fashion" className="text-xs font-medium hover:text-primary whitespace-nowrap">
                Fashion
              </Link>
              <Link to="/category/electronics" className="text-xs font-medium hover:text-primary whitespace-nowrap">
                Electronics
              </Link>
              <Link to="/category/home" className="text-xs font-medium hover:text-primary whitespace-nowrap">
                Home & Garden
              </Link>
              <Link to="/category/beauty" className="text-xs font-medium hover:text-primary whitespace-nowrap">
                Beauty
              </Link>
              <Link to="/category/sports" className="text-xs font-medium hover:text-primary whitespace-nowrap">
                Sports
              </Link>
              <Link to="/category/toys" className="text-xs font-medium hover:text-primary whitespace-nowrap">
                Toys & Kids
              </Link>
              <Link to="/category/automotive" className="text-xs font-medium hover:text-primary whitespace-nowrap">
                Automotive
              </Link>
            </div>
          </div>
        )}
        
        {/* Breadcrumb for product pages */}
        {isProductPage && (
          <div className="border-t">
            <div className="container flex h-9 items-center text-xs">
              <div className="flex items-center">
                <Link to="/" className="hover:text-primary">Home</Link>
                <span className="mx-1.5">/</span>
                <Link to="/category/all" className="hover:text-primary">All Categories</Link>
                {product && (
                  <>
                    <span className="mx-1.5">/</span>
                    <span className="truncate max-w-[200px] text-muted-foreground">
                      {product.title || "Product"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 VVVD. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
