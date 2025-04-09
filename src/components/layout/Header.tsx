import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Search, 
  ShoppingCart, 
  User, 
  ChevronDown, 
  Heart, 
  Bell, 
  Globe, 
  MessageSquare,
  Camera,
  Menu,
  ArrowLeft,
  Share,
  Smartphone,
  Laptop,
  Shirt,
  HardHat,
  Bookmark,
  Award,
  Gamepad,
  Truck,
  Zap,
  Package,
  Percent,
  ShieldCheck,
  Gift,
  CheckSquare,
  AlertCircle,
  MessageCircle,
  X,
  QrCode,
  ChevronRight,
  MapPin,
  Moon,
  Sun,
  LogOut,
  Settings,
  UserCircle,
  ShoppingBag,
  HelpCircle,
  Headphones,
  Clock,
  Undo,
  DollarSign,
  UserPlus,
  Calendar,
  BarChart,
  SendHorizonal,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/components/theme-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";

const Header = ({ isProductHeader, isFavorite, toggleFavorite, handleShare }: { isProductHeader?: boolean, isFavorite?: boolean, toggleFavorite?: () => void, handleShare?: () => void }) => {
  const isMobile = useIsMobile();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isSearchModalOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isSearchModalOpen && searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsSearchModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSearchModalOpen]);

  const handleSearchIconClick = () => {
    setIsSearchModalOpen(true);
  };

  if (isProductHeader) {
    return (
      <div className="sticky top-0 left-0 right-0 bg-white z-40">
        <div className={`relative h-[var(--header-height)] w-full border-b ${isScrolled ? 'shadow-md' : ''}`}>
          <div className={`fixed top-0 left-0 right-0 h-[var(--header-height)] bg-white z-30 ${isScrolled ? 'shadow-md' : ''}`}>
            <div className="container h-full">
              <div className="flex items-center justify-between h-full px-2">
                <Link to="/" className="mr-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <div className="flex-1 relative">
                  <Input type="text" placeholder="Search products..." className="h-9 pl-9 pr-3 rounded-full border-gray-200" />
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleFavorite}>
                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={handleShare}>
                    <Share className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 left-0 right-0 bg-white z-40">
      <div className="relative h-[var(--header-height)] w-full border-b">
        <div className="container h-full">
          <div className="flex items-center justify-between h-full px-2">
            <Link to="/" className="text-2xl font-bold">
              E-Shop
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost">
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile
              </Button>
              <Button variant="ghost">
                <Laptop className="mr-2 h-4 w-4" />
                Laptops
              </Button>
              <Button variant="ghost">
                <Shirt className="mr-2 h-4 w-4" />
                Clothings
              </Button>
              <Button variant="ghost">
                <HardHat className="mr-2 h-4 w-4" />
                Equipments
              </Button>
              <Button variant="ghost">
                <Bookmark className="mr-2 h-4 w-4" />
                Books
              </Button>
              <Button variant="ghost">
                <Award className="mr-2 h-4 w-4" />
                Awards
              </Button>
              <Button variant="ghost">
                <Gamepad className="mr-2 h-4 w-4" />
                Games
              </Button>
              <Button variant="ghost">
                <Truck className="mr-2 h-4 w-4" />
                Others
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleSearchIconClick}>
                <Search className="h-5 w-5" />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="md:hidden h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:w-3/4 md:w-1/2">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                      Explore our site and discover new products.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <Link to="/" className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span>Deals</span>
                    </Link>
                    <Link to="/" className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span>Trending</span>
                    </Link>
                    <Link to="/" className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span>New Arrivals</span>
                    </Link>
                    <Link to="/" className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span>Top Rated</span>
                    </Link>
                    <Link to="/" className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span>Best Sellers</span>
                    </Link>
                    <Link to="/" className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span>Most Viewed</span>
                    </Link>
                    <Link to="/" className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span>Recently Added</span>
                    </Link>
                    <Link to="/" className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span>On Sale</span>
                    </Link>
                    <Link to="/" className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span>Limited Time Offers</span>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="ghost" size="icon" className="md:hidden">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:block">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80">
                  <DropdownMenuLabel>Shopping Cart</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Percent className="mr-2 h-4 w-4" />
                    Promotions
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Warranty
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Gift className="mr-2 h-4 w-4" />
                    Gift Vouchers
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Saved Items
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Returns
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Support
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <X className="mr-2 h-4 w-4" />
                    Redeem a Voucher
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <QrCode className="mr-2 h-4 w-4" />
                    Redeem a Gift Card
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Payment Methods
                    <div className="ml-auto">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Addresses
                    <div className="ml-auto">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    My Orders
                    <div className="ml-auto">
                      <Package className="mr-2 h-4 w-4" />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    My Vouchers
                    <div className="ml-auto">
                      <Gift className="mr-2 h-4 w-4" />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Support
                    <div className="ml-auto">
                      <MessageCircle className="mr-2 h-4 w-4" />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Help
                    <div className="ml-auto">
                      <HelpCircle className="mr-2 h-4 w-4" />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <div className="ml-auto">
                      <Settings className="mr-2 h-4 w-4" />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Country
                    <div className="ml-auto">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Language
                    <div className="ml-auto">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Find Stores
                    <div className="ml-auto">
                      <MapPin className="mr-2 h-4 w-4" />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Dark Mode
                    <div className="ml-auto">
                      {theme === "light" ? (
                        <Moon
                          className="h-4 w-4"
                          onClick={() => setTheme("dark")}
                        />
                      ) : (
                        <Sun
                          className="h-4 w-4"
                          onClick={() => setTheme("light")}
                        />
                      )}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Logout
                    <div className="ml-auto">
                      <LogOut className="mr-2 h-4 w-4" />
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      {/* Search Modal */}
      {isMounted && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white z-50 ${isSearchModalOpen ? 'block' : 'hidden'
            }`}
        >
          <div className="container h-full">
            <div className="flex items-center justify-between h-16 px-2">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchModalOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <AlertCircle className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="h-11 pl-11 pr-4 rounded-full border-gray-200"
                  ref={searchInputRef}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Recent Searches</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Iphone 14
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Samsung S23
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Macbook Pro
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Airpods
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Popular Products</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Product"
                        className="rounded-md w-full h-32 object-cover"
                      />
                      <Button variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full">
                        <Clock className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm mt-2 text-center">Macbook Pro 16 inch</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1589492447136-64efb5147a5f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Product"
                        className="rounded-md w-full h-32 object-cover"
                      />
                      <Button variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full">
                        <Undo className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm mt-2 text-center">Iphone 14 Pro Max</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1505740420928-5e0e321c5d08?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Product"
                        className="rounded-md w-full h-32 object-cover"
                      />
                      <Button variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm mt-2 text-center">Sony Headphones</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf0c?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Product"
                        className="rounded-md w-full h-32 object-cover"
                      />
                      <Button variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full">
                        <DollarSign className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm mt-2 text-center">Rolex Watch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
