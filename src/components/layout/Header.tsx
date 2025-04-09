
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
  Home,
  Mic
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
  navigationMenuTriggerStyle,
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
      icon: <Shirt className="h-5 w-5" />,
      subcategories: [
        "Dresses", "Tops", "Bottoms", "Lingerie", "Sleepwear", 
        "Sets", "Accessories", "Shoes", "Bags"
      ]
    },
    {
      id: 2,
      name: "Men's Fashion",
      icon: <Shirt className="h-5 w-5" />,
      subcategories: [
        "Tops", "Bottoms", "Underwear", "Socks", "Suits", 
        "Sleepwear", "Accessories", "Shoes"
      ]
    },
    {
      id: 3,
      name: "Phones & Telecommunications",
      icon: <Smartphone className="h-5 w-5" />,
      subcategories: [
        "Mobile Phones", "Accessories", "Cases & Covers", "Chargers", 
        "Cables", "Screen Protectors", "Power Banks"
      ]
    },
    {
      id: 4,
      name: "Computer & Office",
      icon: <Laptop className="h-5 w-5" />,
      subcategories: [
        "Laptops", "Gaming PCs", "Components", "Peripherals", 
        "Networking", "Office Equipment", "Software"
      ]
    },
    {
      id: 5,
      name: "Consumer Electronics",
      icon: <Zap className="h-5 w-5" />,
      subcategories: [
        "TVs", "Home Audio", "Cameras", "Gaming", 
        "Smart Devices", "Wearables"
      ]
    },
    {
      id: 6,
      name: "Jewelry & Watches",
      icon: <Clock className="h-5 w-5" />,
      subcategories: [
        "Fine Jewelry", "Wedding Jewelry", "Men's Watches", 
        "Women's Watches", "Fashion Jewelry"
      ]
    },
    {
      id: 7,
      name: "Home, Pet & Appliances",
      icon: <Home className="h-5 w-5" />,
      subcategories: [
        "Kitchen", "Home Decor", "Textiles", "Pet Supplies", 
        "Major Appliances", "Small Appliances"
      ]
    },
    {
      id: 8,
      name: "Bags & Shoes",
      icon: <ShoppingBag className="h-5 w-5" />,
      subcategories: [
        "Women's Bags", "Men's Bags", "Women's Shoes", 
        "Men's Shoes", "Wallets", "Luggage"
      ]
    },
    {
      id: 9,
      name: "Toys, Kids & Babies",
      icon: <Gift className="h-5 w-5" />,
      subcategories: [
        "Baby Clothing", "Toys", "Remote Control", 
        "Educational", "Baby Care", "Children's Clothing"
      ]
    },
    {
      id: 10,
      name: "Sports & Outdoors",
      icon: <Gamepad className="h-5 w-5" />,
      subcategories: [
        "Sports Clothing", "Cycling", "Fishing", "Camping", 
        "Fitness Equipment", "Team Sports"
      ]
    }
  ];

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
                  <Input 
                    type="text" 
                    placeholder="Search products..." 
                    className="h-9 pl-9 pr-3 rounded-full border-gray-200" 
                  />
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
      {/* Top Promo Banner */}
      {showTopPromoBanner && (
        <div className="bg-orange-500 text-white text-xs py-1 px-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span>Welcome to AliExpress-style Store • Free shipping on orders over $50</span>
              <div className="hidden md:flex items-center space-x-4">
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  Ship to: USA
                </span>
                <span className="flex items-center">
                  <Globe className="h-3 w-3 mr-1" />
                  {language}
                </span>
                <span className="flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {currency}
                </span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 text-white hover:bg-orange-600 p-0" 
              onClick={() => setShowTopPromoBanner(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-2">
          {/* Top Nav - Desktop */}
          <div className="hidden md:flex justify-between items-center text-xs text-gray-500 mb-2">
            <div className="flex items-center space-x-4">
              <Link to="/" className="hover:text-orange-500">Sell on AliExpress</Link>
              <div className="h-3 border-r border-gray-300"></div>
              <Link to="/" className="hover:text-orange-500">Help</Link>
              <div className="h-3 border-r border-gray-300"></div>
              <Link to="/" className="hover:text-orange-500">Buyer Protection</Link>
              <div className="h-3 border-r border-gray-300"></div>
              <Link to="/" className="hover:text-orange-500">App</Link>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-auto py-0 px-2 text-xs font-normal">
                    <UserCircle className="h-3 w-3 mr-1" />
                    Account
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Welcome</span>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm" className="h-7 text-xs">Sign In</Button>
                        <Button variant="default" size="sm" className="h-7 text-xs bg-orange-500 hover:bg-orange-600">Register</Button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Sign in for a personalized experience</p>
                  </div>
                  <div className="py-2">
                    <DropdownMenuItem>
                      <UserCircle className="mr-2 h-4 w-4" />
                      My Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Heart className="mr-2 h-4 w-4" />
                      My Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Gift className="mr-2 h-4 w-4" />
                      My Coupons
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Messages
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help Center
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-auto py-0 px-2 text-xs font-normal">
                    <Bell className="h-3 w-3 mr-1" />
                    Notifications
                    <Badge className="ml-1 bg-orange-500 text-[10px] h-4 min-w-4">3</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Notifications</span>
                      <Button variant="ghost" size="sm" className="h-auto py-0 px-1 text-xs">
                        Mark all as read
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-[400px] overflow-auto">
                    <div className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                      <div className="flex">
                        <div className="rounded-md bg-orange-100 p-2 mr-3">
                          <Zap className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Flash Sale Alert!</p>
                          <p className="text-xs text-gray-500 mt-1">50% off on selected items for the next 2 hours!</p>
                          <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                      <div className="flex">
                        <div className="rounded-md bg-blue-100 p-2 mr-3">
                          <Package className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Order Shipped</p>
                          <p className="text-xs text-gray-500 mt-1">Your order #235789 has been shipped and is on its way!</p>
                          <p className="text-xs text-gray-400 mt-2">Yesterday</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                      <div className="flex">
                        <div className="rounded-md bg-green-100 p-2 mr-3">
                          <Percent className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">New Coupon</p>
                          <p className="text-xs text-gray-500 mt-1">You've received a $10 coupon! Use it before it expires.</p>
                          <p className="text-xs text-gray-400 mt-2">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 text-center">
                    <Button variant="ghost" size="sm" className="text-xs text-orange-500">
                      View All Notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-auto py-0 px-2 text-xs font-normal">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Cart
                    <Badge className="ml-1 bg-orange-500 text-[10px] h-4 min-w-4">2</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Shopping Cart (2)</span>
                      <Button variant="ghost" size="sm" className="h-auto py-0 px-1 text-xs">
                        View All
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-[300px] overflow-auto">
                    <div className="p-3 border-b hover:bg-gray-50">
                      <div className="flex">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf0c?w=80&h=80&fit=crop" className="w-16 h-16 object-cover rounded mr-3" alt="Watch" />
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate">Luxury Watch with Leather Strap</p>
                          <p className="text-xs text-gray-500 mt-1">1 × $129.99</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm font-medium text-orange-500">$129.99</p>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-b hover:bg-gray-50">
                      <div className="flex">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e0e321c5d08?w=80&h=80&fit=crop" className="w-16 h-16 object-cover rounded mr-3" alt="Headphones" />
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate">Wireless Noise Cancelling Headphones</p>
                          <p className="text-xs text-gray-500 mt-1">1 × $89.99</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm font-medium text-orange-500">$89.99</p>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b">
                    <div className="flex justify-between items-center text-sm">
                      <span>Subtotal:</span>
                      <span className="font-medium">$219.98</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span>Shipping:</span>
                      <span className="font-medium">$5.99</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium mt-2">
                      <span>Total:</span>
                      <span className="text-orange-500">$225.97</span>
                    </div>
                  </div>
                  <div className="p-3 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">View Cart</Button>
                    <Button variant="default" size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">Checkout</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-auto py-0 px-2 text-xs font-normal">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Messages
                    <Badge className="ml-1 bg-orange-500 text-[10px] h-4 min-w-4">5</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Messages</span>
                      <Button variant="ghost" size="sm" className="h-auto py-0 px-1 text-xs">
                        Mark all as read
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-[300px] overflow-auto">
                    <div className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                      <div className="flex">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop" />
                            <AvatarFallback>VS</AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">Electronic Store</p>
                            <p className="text-xs text-gray-400">5m</p>
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-1">Do you have any questions about your order?</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                      <div className="flex">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop" />
                            <AvatarFallback>TS</AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-300 border-2 border-white"></div>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">Trendy Shop</p>
                            <p className="text-xs text-gray-400">2h</p>
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-1">Your order has been shipped. Track your package here!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center border rounded-lg p-2">
                      <Input placeholder="Type a message..." className="border-0 text-sm p-0 h-auto focus-visible:ring-0" />
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 h-8 px-3 ml-2">
                        <SendHorizonal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t">
                    <Button variant="ghost" size="sm" className="text-xs text-orange-500">
                      View All Messages
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="sm" className="h-auto py-0 px-2 text-xs font-normal">
                <Headphones className="h-3 w-3 mr-1" />
                Customer Service
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-auto py-0 px-2 text-xs font-normal">
                    {theme === "dark" ? (
                      <>
                        <Moon className="h-3 w-3 mr-1" />
                        Dark Mode
                      </>
                    ) : (
                      <>
                        <Sun className="h-3 w-3 mr-1" />
                        Light Mode
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Laptop className="mr-2 h-4 w-4" />
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Main Header Row */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 text-2xl font-bold text-orange-500 mr-4">
              AliShop
            </Link>

            {/* Categories Button - Mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px] overflow-auto">
                <SheetHeader className="text-left">
                  <SheetTitle>Categories</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-2">
                  {megaMenuCategories.map((category) => (
                    <div key={category.id} className="py-2 border-b">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-2 font-medium">{category.name}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="pl-7 space-y-1">
                        {category.subcategories.slice(0, 5).map((sub, idx) => (
                          <Link key={idx} to="/" className="block text-sm py-1 text-gray-600 hover:text-orange-500">
                            {sub}
                          </Link>
                        ))}
                        {category.subcategories.length > 5 && (
                          <Link to="/" className="block text-sm py-1 text-orange-500">
                            View more...
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Categories - Desktop */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-600 focus:bg-orange-100 h-10 px-4">
                      <Menu className="h-4 w-4 mr-2" />
                      Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-[500px] md:w-[600px] lg:w-[700px]">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
                        {megaMenuCategories.map((category) => (
                          <div key={category.id} className="group">
                            <Link 
                              to="/"
                              className="flex items-center p-2 rounded-md hover:bg-orange-50 group-hover:text-orange-500"
                            >
                              {category.icon}
                              <span className="ml-2 text-sm font-medium">{category.name}</span>
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
            <div className="flex-1 max-w-3xl mx-4 relative hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="h-10 pl-10 pr-20 rounded-[3px] border-orange-500 focus-visible:ring-orange-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Button type="submit" className="h-[85%] bg-orange-500 hover:bg-orange-600 rounded-none rounded-r-[3px] px-4">
                    Search
                  </Button>
                </div>
              </form>
              <div className="mt-1.5 flex items-center space-x-2 text-xs text-gray-500">
                <Link to="/" className="hover:text-orange-500">phones</Link>
                <Link to="/" className="hover:text-orange-500">laptops</Link>
                <Link to="/" className="hover:text-orange-500">beauty</Link>
                <Link to="/" className="hover:text-orange-500">jewelry</Link>
                <Link to="/" className="hover:text-orange-500">watches</Link>
              </div>
            </div>

            {/* Mobile Search Icon */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={handleSearchIconClick}>
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Call to Actions */}
            <div className="flex items-center space-x-1 ml-2">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Heart className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <div className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                        2
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Shopping Cart (2)</span>
                      <Button variant="ghost" size="sm" className="h-auto py-0 px-1 text-xs">
                        View All
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-[300px] overflow-auto">
                    <div className="p-3 border-b hover:bg-gray-50">
                      <div className="flex">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf0c?w=80&h=80&fit=crop" className="w-16 h-16 object-cover rounded mr-3" alt="Watch" />
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate">Luxury Watch with Leather Strap</p>
                          <p className="text-xs text-gray-500 mt-1">1 × $129.99</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm font-medium text-orange-500">$129.99</p>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-b hover:bg-gray-50">
                      <div className="flex">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e0e321c5d08?w=80&h=80&fit=crop" className="w-16 h-16 object-cover rounded mr-3" alt="Headphones" />
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate">Wireless Noise Cancelling Headphones</p>
                          <p className="text-xs text-gray-500 mt-1">1 × $89.99</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm font-medium text-orange-500">$89.99</p>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b">
                    <div className="flex justify-between items-center text-sm">
                      <span>Subtotal:</span>
                      <span className="font-medium">$219.98</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span>Shipping:</span>
                      <span className="font-medium">$5.99</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium mt-2">
                      <span>Total:</span>
                      <span className="text-orange-500">$225.97</span>
                    </div>
                  </div>
                  <div className="p-3 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">View Cart</Button>
                    <Button variant="default" size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">Checkout</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Avatar className="h-8 w-8 ml-1">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Navigation - Desktop */}
      <div className="hidden md:block bg-white border-b">
        <div className="container mx-auto">
          <div className="flex items-center space-x-8 py-1 overflow-x-auto whitespace-nowrap text-sm font-medium">
            <Link to="/" className="text-orange-500 flex items-center px-1 py-2 hover:text-orange-600">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link to="/" className="text-gray-700 px-1 py-2 hover:text-orange-500">Super Deals</Link>
            <Link to="/" className="text-gray-700 px-1 py-2 hover:text-orange-500">Featured</Link>
            <Link to="/" className="text-gray-700 px-1 py-2 hover:text-orange-500">New Arrivals</Link>
            <div className="flex items-center text-gray-700 px-1 py-2 hover:text-orange-500 cursor-pointer">
              Flash Deals
              <Badge className="ml-1 bg-red-500 text-white text-[10px]">HOT</Badge>
            </div>
            <Link to="/" className="text-gray-700 px-1 py-2 hover:text-orange-500">Top Rated</Link>
            <Link to="/" className="text-gray-700 px-1 py-2 hover:text-orange-500">Best Sellers</Link>
            <Link to="/" className="text-gray-700 px-1 py-2 hover:text-orange-500">Free Shipping</Link>
            <Link to="/" className="text-gray-700 px-1 py-2 hover:text-orange-500">Clearance</Link>
            <Link to="/" className="text-gray-700 px-1 py-2 hover:text-orange-500">Outlet</Link>
            <Link to="/" className="text-gray-700 px-1 py-2 hover:text-orange-500">
              <Percent className="h-4 w-4 mr-1 inline" />
              Promotions
            </Link>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isMounted && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white z-50 ${isSearchModalOpen ? 'block' : 'hidden'}`}
        >
          <div className="container h-full">
            <div className="flex items-center justify-between h-14 px-2 border-b">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchModalOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
              <form onSubmit={handleSearchSubmit} className="flex-1 mx-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="h-10 pl-10 pr-10 rounded-full border-gray-200"
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  >
                    <Mic className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </form>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 h-8 px-3 rounded-full">
                Search
              </Button>
            </div>
            <div className="p-4">
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Recent Searches</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-8">
                    Iphone 14
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-8">
                    Samsung S23
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-8">
                    Macbook Pro
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-8">
                    Airpods
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-8">
                    Mechanical Keyboard
                  </Button>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Popular Categories</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {megaMenuCategories.slice(0, 8).map((category) => (
                    <Button key={category.id} variant="outline" className="justify-start h-auto py-2">
                      {category.icon}
                      <span className="ml-2 text-xs">{category.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-medium">Trending Products</h3>
                  <Button variant="ghost" size="sm" className="text-orange-500 h-7 px-2 text-xs">View All</Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200"
                        alt="Product"
                        className="rounded-md w-full h-32 object-cover"
                      />
                      <Button variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full h-6 w-6 bg-white/80 hover:bg-white">
                        <Clock className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs mt-2 text-center">Macbook Pro 16 inch</p>
                    <p className="text-xs text-orange-500 font-medium">$1,999.00</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1589492447136-64efb5147a5f?w=200"
                        alt="Product"
                        className="rounded-md w-full h-32 object-cover"
                      />
                      <Button variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full h-6 w-6 bg-white/80 hover:bg-white">
                        <Undo className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs mt-2 text-center">Iphone 14 Pro Max</p>
                    <p className="text-xs text-orange-500 font-medium">$1,099.00</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1505740420928-5e0e321c5d08?w=200"
                        alt="Product"
                        className="rounded-md w-full h-32 object-cover"
                      />
                      <Button variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full h-6 w-6 bg-white/80 hover:bg-white">
                        <MapPin className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs mt-2 text-center">Sony Headphones</p>
                    <p className="text-xs text-orange-500 font-medium">$299.00</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf0c?w=200"
                        alt="Product"
                        className="rounded-md w-full h-32 object-cover"
                      />
                      <Button variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full h-6 w-6 bg-white/80 hover:bg-white">
                        <DollarSign className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs mt-2 text-center">Rolex Watch</p>
                    <p className="text-xs text-orange-500 font-medium">$4,999.00</p>
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
