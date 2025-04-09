
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
  Home,
  ShoppingBag,
  Gift,
  Gamepad2 as Gamepad,
  Truck,
  Zap,
  Package,
  Percent,
  ShieldCheck,
  CheckSquare,
  AlertCircle,
  X,
  QrCode,
  ChevronRight,
  MapPin,
  Moon,
  Sun,
  LogOut,
  Settings,
  UserCircle,
  HelpCircle,
  Headphones,
  Clock,
  Undo,
  DollarSign,
  UserPlus,
  Calendar,
  BarChart,
  SendHorizontal as SendHorizonal,
  Mic
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showTopPromoBanner, setShowTopPromoBanner] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("English");

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchModalOpen(false);
    toast({
      title: "Search submitted",
      description: `Searching for: ${searchQuery}`,
    });
    // Here you would typically redirect to search results page
  };

  const megaMenuCategories = [
    {
      id: 1,
      name: "Women's Fashion",
      icon: <Shirt className="h-4 w-4" />,
      subcategories: [
        "Dresses", "Tops", "Bottoms", "Lingerie", "Sleepwear", 
        "Sets", "Accessories", "Shoes", "Bags"
      ]
    },
    {
      id: 2,
      name: "Men's Fashion",
      icon: <Shirt className="h-4 w-4" />,
      subcategories: [
        "Tops", "Bottoms", "Underwear", "Socks", "Suits", 
        "Sleepwear", "Accessories", "Shoes"
      ]
    },
    {
      id: 3,
      name: "Phones & Telecom",
      icon: <Smartphone className="h-4 w-4" />,
      subcategories: [
        "Mobile Phones", "Accessories", "Cases & Covers", "Chargers", 
        "Cables", "Screen Protectors", "Power Banks"
      ]
    },
    {
      id: 4,
      name: "Computer & Office",
      icon: <Laptop className="h-4 w-4" />,
      subcategories: [
        "Laptops", "Gaming PCs", "Components", "Peripherals", 
        "Networking", "Office Equipment", "Software"
      ]
    },
    {
      id: 5,
      name: "Consumer Electronics",
      icon: <Zap className="h-4 w-4" />,
      subcategories: [
        "TVs", "Home Audio", "Cameras", "Gaming", 
        "Smart Devices", "Wearables"
      ]
    },
    {
      id: 6,
      name: "Jewelry & Watches",
      icon: <Clock className="h-4 w-4" />,
      subcategories: [
        "Fine Jewelry", "Wedding Jewelry", "Men's Watches", 
        "Women's Watches", "Fashion Jewelry"
      ]
    },
    {
      id: 7,
      name: "Home, Pet & Appliances",
      icon: <Home className="h-4 w-4" />,
      subcategories: [
        "Kitchen", "Home Decor", "Textiles", "Pet Supplies", 
        "Major Appliances", "Small Appliances"
      ]
    },
    {
      id: 8,
      name: "Bags & Shoes",
      icon: <ShoppingBag className="h-4 w-4" />,
      subcategories: [
        "Women's Bags", "Men's Bags", "Women's Shoes", 
        "Men's Shoes", "Wallets", "Luggage"
      ]
    },
    {
      id: 9,
      name: "Toys, Kids & Babies",
      icon: <Gift className="h-4 w-4" />,
      subcategories: [
        "Baby Clothing", "Toys", "Remote Control", 
        "Educational", "Baby Care", "Children's Clothing"
      ]
    },
    {
      id: 10,
      name: "Sports & Outdoors",
      icon: <Gamepad className="h-4 w-4" />,
      subcategories: [
        "Sports Clothing", "Cycling", "Fishing", "Camping", 
        "Fitness Equipment", "Team Sports"
      ]
    }
  ];

  if (isProductHeader) {
    return (
      <div className="sticky top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-40">
        <div className={`relative h-[48px] w-full ${isScrolled ? 'shadow-sm' : ''}`}>
          <div className={`fixed top-0 left-0 right-0 h-[48px] bg-white/95 backdrop-blur-sm z-30 ${isScrolled ? 'shadow-sm' : ''}`}>
            <div className="container h-full max-w-screen-2xl">
              <div className="flex items-center justify-between h-full px-2">
                <Link to="/" className="mr-1">
                  <Button variant="ghost" size="icon" className="rounded-full h-7 w-7">
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <div className="flex-1 relative max-w-xl mx-auto">
                  <Input 
                    type="text" 
                    placeholder="Search products..." 
                    className="h-7 pl-7 pr-2 rounded-full border-gray-200 text-[10px]" 
                  />
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
                </div>
                <div className="flex items-center gap-1 ml-1">
                  <Button variant="ghost" size="icon" className="rounded-full h-7 w-7" onClick={toggleFavorite}>
                    <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-7 w-7" onClick={handleShare}>
                    <Share className="h-3.5 w-3.5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full h-7 w-7">
                        <div className="relative">
                          <ShoppingCart className="h-3.5 w-3.5" />
                          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
                            2
                          </span>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-72">
                      <div className="p-2 border-b">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">Cart (2)</span>
                          <Button variant="link" size="sm" className="h-auto p-0 text-[10px] text-red-500">
                            View All
                          </Button>
                        </div>
                      </div>
                      <div className="max-h-60 overflow-auto">
                        <div className="p-2 border-b hover:bg-gray-50">
                          <div className="flex">
                            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf0c?w=80&h=80&fit=crop" className="w-12 h-12 object-cover rounded mr-2" alt="Watch" />
                            <div className="flex-1">
                              <p className="text-xs font-medium truncate">Luxury Watch with Leather Strap</p>
                              <p className="text-[10px] text-gray-500">1 × $129.99</p>
                              <div className="flex justify-between items-center mt-1">
                                <p className="text-xs font-medium text-red-500">$129.99</p>
                                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 border-b hover:bg-gray-50">
                          <div className="flex">
                            <img src="https://images.unsplash.com/photo-1505740420928-5e0e321c5d08?w=80&h=80&fit=crop" className="w-12 h-12 object-cover rounded mr-2" alt="Headphones" />
                            <div className="flex-1">
                              <p className="text-xs font-medium truncate">Wireless Noise Cancelling Headphones</p>
                              <p className="text-[10px] text-gray-500">1 × $89.99</p>
                              <div className="flex justify-between items-center mt-1">
                                <p className="text-xs font-medium text-red-500">$89.99</p>
                                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 border-b">
                        <div className="flex justify-between items-center text-xs">
                          <span>Total:</span>
                          <span className="font-medium text-red-500">$219.98</span>
                        </div>
                      </div>
                      <div className="p-2 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 h-7 text-[10px]">View Cart</Button>
                        <Button variant="default" size="sm" className="flex-1 h-7 text-[10px] bg-red-500 hover:bg-red-600">Checkout</Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
      {/* Top Promo Banner */}
      {showTopPromoBanner && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] py-0.5 px-2">
          <div className="container mx-auto flex justify-between items-center max-w-screen-2xl">
            <div className="flex items-center space-x-4">
              <span className="text-white/90">Flash Sale: 24hrs only • Extra 10% off with code <span className="font-semibold bg-white/20 px-1 rounded">EXTRA10</span></span>
              <div className="hidden md:flex items-center space-x-3 text-[9px]">
                <span className="flex items-center">
                  <MapPin className="h-2 w-2 mr-0.5" />
                  USA
                </span>
                <span className="flex items-center">
                  <Globe className="h-2 w-2 mr-0.5" />
                  {language}
                </span>
                <span className="flex items-center">
                  <DollarSign className="h-2 w-2 mr-0.5" />
                  {currency}
                </span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4 text-white hover:bg-red-600/20 p-0" 
              onClick={() => setShowTopPromoBanner(false)}
            >
              <X className="h-2 w-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-1 max-w-screen-2xl">
          {/* Top Nav - Desktop */}
          <div className="hidden md:flex justify-between items-center text-[9px] text-gray-500 mb-1">
            <div className="flex items-center space-x-3">
              <Link to="/" className="hover:text-red-500">Sell on AliExpress</Link>
              <div className="h-2.5 border-r border-gray-200"></div>
              <Link to="/" className="hover:text-red-500">Help</Link>
              <div className="h-2.5 border-r border-gray-200"></div>
              <Link to="/" className="hover:text-red-500">Buyer Protection</Link>
              <div className="h-2.5 border-r border-gray-200"></div>
              <Link to="/" className="hover:text-red-500">App</Link>
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-auto py-0 px-1.5 text-[9px] font-normal">
                    <UserCircle className="h-2.5 w-2.5 mr-0.5" />
                    Account
                    <ChevronDown className="h-2.5 w-2.5 ml-0.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-3 border-b">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium">Welcome</span>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm" className="h-6 text-[10px]">Sign In</Button>
                        <Button variant="default" size="sm" className="h-6 text-[10px] bg-red-500 hover:bg-red-600">Register</Button>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500">Sign in for a personalized experience</p>
                  </div>
                  <div className="py-1.5">
                    <DropdownMenuItem className="text-xs py-1.5">
                      <UserCircle className="mr-2 h-3 w-3" />
                      My Account
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs py-1.5">
                      <Package className="mr-2 h-3 w-3" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-xs py-1.5">
                      <Heart className="mr-2 h-3 w-3" />
                      My Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs py-1.5">
                      <Gift className="mr-2 h-3 w-3" />
                      My Coupons
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs py-1.5">
                      <MessageSquare className="mr-2 h-3 w-3" />
                      Messages
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-xs py-1.5">
                      <Settings className="mr-2 h-3 w-3" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs py-1.5">
                      <HelpCircle className="mr-2 h-3 w-3" />
                      Help Center
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-xs py-1.5">
                      <LogOut className="mr-2 h-3 w-3" />
                      Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-auto py-0 px-1.5 text-[9px] font-normal">
                    <Bell className="h-2.5 w-2.5 mr-0.5" />
                    Alerts
                    <Badge className="ml-0.5 bg-red-500 text-[8px] h-3 min-w-3">3</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <div className="p-3 border-b">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Notifications</span>
                      <Button variant="ghost" size="sm" className="h-auto py-0 px-1 text-[10px]">
                        Mark all as read
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-[300px] overflow-auto">
                    <div className="p-2.5 border-b hover:bg-gray-50 cursor-pointer">
                      <div className="flex">
                        <div className="rounded-md bg-red-100 p-1.5 mr-2">
                          <Zap className="h-3.5 w-3.5 text-red-500" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">Flash Sale Alert!</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">50% off on selected items for the next 2 hours!</p>
                          <p className="text-[9px] text-gray-400 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2.5 border-b hover:bg-gray-50 cursor-pointer">
                      <div className="flex">
                        <div className="rounded-md bg-blue-100 p-1.5 mr-2">
                          <Package className="h-3.5 w-3.5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">Order Shipped</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">Your order #235789 has been shipped!</p>
                          <p className="text-[9px] text-gray-400 mt-1">Yesterday</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 text-center">
                    <Button variant="ghost" size="sm" className="text-[10px] text-red-500">
                      View All Notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-auto py-0 px-1.5 text-[9px] font-normal">
                    <ShoppingCart className="h-2.5 w-2.5 mr-0.5" />
                    Cart
                    <Badge className="ml-0.5 bg-red-500 text-[8px] h-3 min-w-3">2</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <div className="p-3 border-b">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Shopping Cart (2)</span>
                      <Button variant="ghost" size="sm" className="h-auto py-0 px-1 text-[10px]">
                        View All
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-[200px] overflow-auto">
                    <div className="p-2 border-b hover:bg-gray-50">
                      <div className="flex">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf0c?w=80&h=80&fit=crop" className="w-12 h-12 object-cover rounded mr-2" alt="Watch" />
                        <div className="flex-1">
                          <p className="text-xs font-medium truncate">Luxury Watch with Leather Strap</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">1 × $129.99</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs font-medium text-red-500">$129.99</p>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border-b hover:bg-gray-50">
                      <div className="flex">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e0e321c5d08?w=80&h=80&fit=crop" className="w-12 h-12 object-cover rounded mr-2" alt="Headphones" />
                        <div className="flex-1">
                          <p className="text-xs font-medium truncate">Wireless Noise Cancelling Headphones</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">1 × $89.99</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs font-medium text-red-500">$89.99</p>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 border-b">
                    <div className="flex justify-between items-center text-xs">
                      <span>Subtotal:</span>
                      <span className="font-medium">$219.98</span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-1">
                      <span>Shipping:</span>
                      <span className="font-medium">$5.99</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-medium mt-1">
                      <span>Total:</span>
                      <span className="text-red-500">$225.97</span>
                    </div>
                  </div>
                  <div className="p-2 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 h-7 text-[10px]">View Cart</Button>
                    <Button variant="default" size="sm" className="flex-1 h-7 text-[10px] bg-red-500 hover:bg-red-600">Checkout</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="sm" className="h-auto py-0 px-1.5 text-[9px] font-normal">
                <Headphones className="h-2.5 w-2.5 mr-0.5" />
                Support
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-auto py-0 px-1.5 text-[9px] font-normal">
                    {theme === "dark" ? (
                      <>
                        <Moon className="h-2.5 w-2.5 mr-0.5" />
                        Dark
                      </>
                    ) : (
                      <>
                        <Sun className="h-2.5 w-2.5 mr-0.5" />
                        Light
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")} className="text-xs py-1.5">
                    <Sun className="mr-2 h-3 w-3" />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")} className="text-xs py-1.5">
                    <Moon className="mr-2 h-3 w-3" />
                    Dark
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Main Header Row */}
          <div className="flex items-center justify-between py-0.5">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 text-lg font-bold text-red-500 mr-1 flex items-center">
              <ShoppingBag className="h-4 w-4 mr-1" />
              <span className="hidden xs:inline">AliExpress</span>
            </Link>

            {/* Categories Button - Mobile */}
            <Sheet>
              <SheetContent side="left" className="w-[260px] sm:w-[300px] overflow-auto p-3">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-base">Categories</SheetTitle>
                </SheetHeader>
                <div className="mt-2 space-y-1">
                  {megaMenuCategories.map((category) => (
                    <div key={category.id} className="py-1.5 border-b">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-2 font-medium text-xs">{category.name}</span>
                        </div>
                        <ChevronRight className="h-3 w-3 text-gray-400" />
                      </div>
                      <div className="pl-6 space-y-0.5">
                        {category.subcategories.slice(0, 3).map((sub, idx) => (
                          <Link key={idx} to="/" className="block text-[10px] py-0.5 text-gray-600 hover:text-red-500">
                            {sub}
                          </Link>
                        ))}
                        {category.subcategories.length > 3 && (
                          <Link to="/" className="block text-[10px] py-0.5 text-red-500">
                            View more...
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
              <Button variant="ghost" size="icon" className="md:hidden h-7 w-7">
                <Menu className="h-4 w-4" />
              </Button>
            </Sheet>

            {/* Categories - Desktop */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 focus:bg-red-100 h-7 px-3 text-xs">
                      <Menu className="h-3 w-3 mr-1.5" />
                      Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-[400px] md:w-[500px] lg:w-[600px]">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3">
                        {megaMenuCategories.map((category) => (
                          <div key={category.id} className="group">
                            <Link 
                              to="/"
                              className="flex items-center p-1.5 rounded-md hover:bg-red-50 group-hover:text-red-500"
                            >
                              {category.icon}
                              <span className="ml-1.5 text-xs">{category.name}</span>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-2 relative hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="h-7 pl-8 pr-16 rounded border-red-500 focus-visible:ring-red-500 text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                  <Search className="h-3 w-3 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <Button type="submit" className="h-[75%] bg-red-500 hover:bg-red-600 rounded-none rounded-r px-3 text-xs">
                    Search
                  </Button>
                </div>
              </form>
              <div className="mt-1 flex items-center space-x-2 text-[9px] text-gray-500">
                <Link to="/" className="hover:text-red-500">phones</Link>
                <Link to="/" className="hover:text-red-500">laptops</Link>
                <Link to="/" className="hover:text-red-500">beauty</Link>
                <Link to="/" className="hover:text-red-500">jewelry</Link>
              </div>
            </div>

            {/* Mobile Search Icon */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={handleSearchIconClick} className="h-7 w-7">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Call to Actions */}
            <div className="flex items-center space-x-0.5 ml-0.5">
              <Button variant="ghost" size="icon" className="hidden sm:flex h-7 w-7">
                <Heart className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <div className="relative">
                      <ShoppingCart className="h-4 w-4" />
                      <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
                        2
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <div className="p-3 border-b">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Shopping Cart (2)</span>
                      <Button variant="ghost" size="sm" className="h-auto py-0 px-1 text-[10px]">
                        View All
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-[200px] overflow-auto">
                    <div className="p-2 border-b hover:bg-gray-50">
                      <div className="flex">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf0c?w=80&h=80&fit=crop" className="w-12 h-12 object-cover rounded mr-2" alt="Watch" />
                        <div className="flex-1">
                          <p className="text-xs font-medium truncate">Luxury Watch with Leather Strap</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">1 × $129.99</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs font-medium text-red-500">$129.99</p>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border-b hover:bg-gray-50">
                      <div className="flex">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e0e321c5d08?w=80&h=80&fit=crop" className="w-12 h-12 object-cover rounded mr-2" alt="Headphones" />
                        <div className="flex-1">
                          <p className="text-xs font-medium truncate">Wireless Noise Cancelling Headphones</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">1 × $89.99</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs font-medium text-red-500">$89.99</p>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 border-b">
                    <div className="flex justify-between items-center text-xs">
                      <span>Total:</span>
                      <span className="font-medium text-red-500">$219.98</span>
                    </div>
                  </div>
                  <div className="p-2 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 h-7 text-[10px]">Cart</Button>
                    <Button variant="default" size="sm" className="flex-1 h-7 text-[10px] bg-red-500 hover:bg-red-600">Checkout</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Avatar className="h-6 w-6 ml-0.5">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Navigation - Desktop */}
      <div className="hidden md:block bg-white border-b">
        <div className="container mx-auto max-w-screen-2xl">
          <div className="flex items-center space-x-6 py-0.5 overflow-x-auto whitespace-nowrap text-[10px] font-medium">
            <Link to="/" className="text-red-500 flex items-center px-1 py-1.5 hover:text-red-600">
              <Home className="h-3 w-3 mr-0.5" />
              Home
            </Link>
            <Link to="/" className="text-gray-700 px-1 py-1.5 hover:text-red-500">Super Deals</Link>
            <Link to="/" className="text-gray-700 px-1 py-1.5 hover:text-red-500">Featured</Link>
            <Link to="/" className="text-gray-700 px-1 py-1.5 hover:text-red-500">New Arrivals</Link>
            <div className="flex items-center text-gray-700 px-1 py-1.5 hover:text-red-500 cursor-pointer">
              Flash Deals
              <Badge className="ml-1 bg-red-500 text-white text-[8px]">HOT</Badge>
            </div>
            <Link to="/" className="text-gray-700 px-1 py-1.5 hover:text-red-500">Top Rated</Link>
            <Link to="/" className="text-gray-700 px-1 py-1.5 hover:text-red-500">Best Sellers</Link>
            <Link to="/" className="text-gray-700 px-1 py-1.5 hover:text-red-500">Free Shipping</Link>
            <Link to="/" className="text-gray-700 px-1 py-1.5 hover:text-red-500">Clearance</Link>
            <Link to="/" className="text-gray-700 px-1 py-1.5 hover:text-red-500">
              <Percent className="h-3 w-3 mr-0.5 inline" />
              Promotions
            </Link>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isMounted && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white/95 backdrop-blur-sm z-50 ${isSearchModalOpen ? 'block' : 'hidden'}`}
        >
          <div className="container h-full max-w-screen-2xl">
            <div className="flex items-center justify-between h-12 px-2 border-b">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchModalOpen(false)} className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
              <form onSubmit={handleSearchSubmit} className="flex-1 mx-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="h-8 pl-8 pr-8 rounded-full border-gray-200 text-xs"
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                    <Search className="h-3 w-3 text-gray-400" />
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                  >
                    <Mic className="h-3 w-3 text-gray-400" />
                  </Button>
                </div>
              </form>
              <Button type="submit" className="bg-red-500 hover:bg-red-600 h-7 px-2.5 rounded-full text-xs">
                Search
              </Button>
            </div>
            <div className="p-3">
              <div className="mb-4">
                <h3 className="text-xs font-medium mb-2">Recent Searches</h3>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Button variant="outline" size="sm" className="rounded-full text-[10px] h-6 py-0">
                    Iphone 14
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-[10px] h-6 py-0">
                    Samsung S23
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-[10px] h-6 py-0">
                    Macbook Pro
                  </Button>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xs font-medium mb-2">Trending Products</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200"
                        alt="Product"
                        className="rounded-md w-full h-24 object-cover"
                      />
                      <Badge className="absolute bottom-1 left-1 bg-red-500 text-[8px] px-1.5">-20%</Badge>
                    </div>
                    <p className="text-[10px] mt-1 text-center truncate w-full">Macbook Pro 16"</p>
                    <p className="text-[10px] text-red-500 font-medium">$1,999.00</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1505740420928-5e0e321c5d08?w=200"
                        alt="Product"
                        className="rounded-md w-full h-24 object-cover"
                      />
                      <Badge className="absolute bottom-1 left-1 bg-green-500 text-[8px] px-1.5">NEW</Badge>
                    </div>
                    <p className="text-[10px] mt-1 text-center truncate w-full">Noise Cancelling Headphones</p>
                    <p className="text-[10px] text-red-500 font-medium">$299.00</p>
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
