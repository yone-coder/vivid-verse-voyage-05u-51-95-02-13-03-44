
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
  Search, User, ShoppingCart, Heart, Menu, Camera, Home, 
  Package, Gift, Percent, ChevronDown, Bell, LogOut, Settings,
  UserCircle, ShoppingBag, Award, HelpCircle, Truck, Headphones,
  Languages, Globe, DollarSign, MessageCircle, CheckSquare, MapPin,
  ChevronRight, Sun, Moon, Phone, Laptop, Monitor, Gamepad, Shirt, Clock,
  BookOpen, Pizza, HardHat, X, Zap, Bookmark, PlusCircle, AlertCircle, MailOpen,
  ShieldCheck, Mic, QrCode, BarChart, Scan, Upload, Download, CreditCard,
  UserPlus, Calendar, Undo, SendHorizonal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Categories with their icons to match AliExpress style
const categories = [
  { 
    name: "Electronics", 
    icon: <Laptop className="h-4 w-4" />,
    subcategories: [
      "Smartphones", "Laptops", "Audio", "Cameras", "Gaming", "Accessories",
      "Smart Home", "Computer Components", "TV & Monitors", "Wearables"
    ],
    popularBrands: ["Apple", "Samsung", "Xiaomi", "Huawei", "Sony"],
    trendingItems: ["Wireless Earbuds", "Smart Watches", "Power Banks", "Phone Cases"]
  },
  { 
    name: "Fashion", 
    icon: <Shirt className="h-4 w-4" />,
    subcategories: [
      "Women's Clothing", "Men's Clothing", "Kids", "Shoes", "Jewelry",
      "Watches", "Bags", "Accessories", "Activewear", "Seasonal Collections"
    ],
    popularBrands: ["Nike", "Adidas", "Zara", "H&M", "Puma"],
    trendingItems: ["Casual Hoodies", "Summer Dresses", "Sneakers", "Backpacks"]
  },
  { 
    name: "Home & Garden", 
    icon: <HardHat className="h-4 w-4" />,
    subcategories: [
      "Kitchen", "Furniture", "Decor", "Bedding", "Bathroom",
      "Garden", "Lighting", "Storage", "Home Appliances", "Tools"
    ],
    popularBrands: ["IKEA", "Philips", "Dyson", "Bosch", "KitchenAid"],
    trendingItems: ["LED Lights", "Kitchen Gadgets", "Plant Pots", "Storage Boxes"]
  },
  { 
    name: "Beauty", 
    icon: <Bookmark className="h-4 w-4" />,
    subcategories: [
      "Skincare", "Makeup", "Fragrance", "Hair Care", "Personal Care",
      "Men's Grooming", "Health", "K-Beauty", "Organic Products", "Sets & Kits"
    ],
    popularBrands: ["L'Oreal", "Maybelline", "Nivea", "The Ordinary", "Garnier"],
    trendingItems: ["Face Masks", "Serums", "Hair Styling Tools", "Makeup Brushes"]
  },
  { 
    name: "Sports", 
    icon: <Award className="h-4 w-4" />,
    subcategories: [
      "Fitness", "Outdoor Recreation", "Team Sports", "Water Sports", "Winter Sports",
      "Camping", "Activewear", "Sports Nutrition", "Equipment", "Accessories"
    ],
    popularBrands: ["Nike", "Adidas", "Under Armour", "Puma", "Reebok"],
    trendingItems: ["Yoga Mats", "Smart Fitness Bands", "Camping Gear", "Exercise Equipment"]
  },
  { 
    name: "Toys & Kids", 
    icon: <Gamepad className="h-4 w-4" />,
    subcategories: [
      "Toys", "Baby Products", "Children's Clothing", "Educational Toys", "Dolls",
      "Action Figures", "Outdoor Play", "Arts & Crafts", "Board Games", "STEM Toys"
    ],
    popularBrands: ["LEGO", "Fisher-Price", "Mattel", "Hasbro", "Disney"],
    trendingItems: ["Building Blocks", "Remote Control Cars", "Puzzle Games", "Plush Toys"]
  },
  { 
    name: "Automotive", 
    icon: <Truck className="h-4 w-4" />,
    subcategories: [
      "Car Accessories", "Motorcycle", "Tools & Equipment", "GPS & Electronics", "Car Care",
      "Exterior Accessories", "Interior Accessories", "Replacement Parts", "Performance Parts", "Tires & Wheels"
    ],
    popularBrands: ["Bosch", "3M", "Michelin", "Brembo", "Castrol"],
    trendingItems: ["Car Phone Holders", "LED Car Lights", "Dash Cams", "Car Vacuum Cleaners"]
  },
];

// Countries to choose from with flags and more recognizable format
const countries = [
  { code: "us", name: "United States", flag: "🇺🇸", currency: "USD", language: "English" },
  { code: "cn", name: "China", flag: "🇨🇳", currency: "CNY", language: "Chinese" },
  { code: "gb", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", language: "English" },
  { code: "ca", name: "Canada", flag: "🇨🇦", currency: "CAD", language: "English" },
  { code: "au", name: "Australia", flag: "🇦🇺", currency: "AUD", language: "English" },
  { code: "de", name: "Germany", flag: "🇩🇪", currency: "EUR", language: "German" },
  { code: "fr", name: "France", flag: "🇫🇷", currency: "EUR", language: "French" },
  { code: "es", name: "Spain", flag: "🇪🇸", currency: "EUR", language: "Spanish" },
  { code: "it", name: "Italy", flag: "🇮🇹", currency: "EUR", language: "Italian" },
  { code: "jp", name: "Japan", flag: "🇯🇵", currency: "JPY", language: "Japanese" },
  { code: "ru", name: "Russia", flag: "🇷🇺", currency: "RUB", language: "Russian" },
  { code: "br", name: "Brazil", flag: "🇧🇷", currency: "BRL", language: "Portuguese" },
  { code: "in", name: "India", flag: "🇮🇳", currency: "INR", language: "English" },
];

// Languages with proper flags
const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "العربية", flag: "🇦🇪" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
];

// Currencies with symbols and more detailed info
const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", flag: "🇧🇷" },
  { code: "MXN", symbol: "Mex$", name: "Mexican Peso", flag: "🇲🇽" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble", flag: "🇷🇺" },
  { code: "KRW", symbol: "₩", name: "South Korean Won", flag: "🇰🇷" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar", flag: "🇭🇰" },
];

// Enhanced trending/popular searches with categories
const trendingSearches = [
  { term: "Wireless Earbuds", category: "Electronics", icon: <Zap className="h-3 w-3" /> }, 
  { term: "Smart Watch", category: "Electronics", icon: <Zap className="h-3 w-3" /> },
  { term: "Phone Case", category: "Electronics", icon: <Zap className="h-3 w-3" /> },
  { term: "Summer Dress", category: "Fashion", icon: <Zap className="h-3 w-3" /> },
  { term: "Running Shoes", category: "Fashion", icon: <Zap className="h-3 w-3" /> },
  { term: "LED Strip Lights", category: "Home", icon: <Zap className="h-3 w-3" /> },
  { term: "Gaming Mouse", category: "Electronics", icon: <Zap className="h-3 w-3" /> },
  { term: "Face Masks", category: "Beauty", icon: <Zap className="h-3 w-3" /> },
  { term: "Fitness Tracker", category: "Sports", icon: <Zap className="h-3 w-3" /> },
];

// Sample recent searches with timestamps
const recentSearches = [
  { term: "Bluetooth Speaker", time: "3 days ago" },
  { term: "USB C Cable", time: "1 week ago" },
  { term: "Wireless Charger", time: "2 weeks ago" },
  { term: "Mechanical Keyboard", time: "3 weeks ago" },
];

// Enhanced wishlist items with more details to match AliExpress style
const wishlistItems = [
  { 
    id: 1, 
    name: "TWS Bluetooth 5.0 Wireless Earbuds with Noise Cancellation", 
    price: 29.99, 
    originalPrice: 59.99,
    discount: 50, 
    image: "placeholder.svg",
    rating: 4.7,
    numReviews: 2548,
    freeShipping: true,
    orders: "5.2k",
    seller: { name: "Official iTech Store", rating: 98 }
  },
  { 
    id: 2, 
    name: "Smart Watch with Heart Rate Monitor, IP68 Waterproof", 
    price: 24.79, 
    originalPrice: 89.99,
    discount: 72, 
    image: "placeholder.svg",
    rating: 4.8,
    numReviews: 3651,
    freeShipping: true,
    orders: "10k+",
    seller: { name: "WearTech Official Store", rating: 97 }
  },
  { 
    id: 3, 
    name: "Mechanical Gaming Keyboard RGB Backlit Blue Switches", 
    price: 45.99, 
    originalPrice: 89.99,
    discount: 49, 
    image: "placeholder.svg",
    rating: 4.6,
    numReviews: 1287,
    freeShipping: true,
    orders: "3.4k",
    seller: { name: "GameGear Pro", rating: 96 }
  },
  { 
    id: 4, 
    name: "Adjustable Laptop Stand Aluminum Alloy Ergonomic Design", 
    price: 15.99, 
    originalPrice: 29.99,
    discount: 47, 
    image: "placeholder.svg",
    rating: 4.9,
    numReviews: 895,
    freeShipping: true,
    orders: "4.7k",
    seller: { name: "Home Office Supplies", rating: 99 }
  },
  { 
    id: 5, 
    name: "2.4GHz Wireless Mouse Ultra Thin Rechargeable", 
    price: 12.59, 
    originalPrice: 19.99,
    discount: 37, 
    image: "placeholder.svg",
    rating: 4.5,
    numReviews: 756,
    freeShipping: true,
    orders: "8.3k",
    seller: { name: "TechAccessories Plus", rating: 95 }
  },
];

// Enhanced notifications with more categories and details
const notifications = [
  { 
    id: 1, 
    type: "order", 
    title: "Your order has shipped!", 
    message: "Order #89723651 has been shipped via AliExpress Standard Shipping. Estimated delivery: May 15-25.", 
    time: "10 min ago",
    icon: <Package className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-600"
  },
  { 
    id: 2, 
    type: "promo", 
    title: "⚡ Flash Sale Alert!", 
    message: "50% off on electronics for the next 2 hours! Limited quantities available.", 
    time: "1 hour ago",
    icon: <Percent className="h-5 w-5" />,
    color: "bg-orange-100 text-orange-600"
  },
  { 
    id: 3, 
    type: "account", 
    title: "Password Changed", 
    message: "Your account password was changed successfully. If you didn't do this, please contact support.", 
    time: "5 hours ago",
    icon: <ShieldCheck className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-600"
  },
  { 
    id: 4, 
    type: "promo", 
    title: "New Coupon Available", 
    message: "You received a new $5 off coupon for your next purchase. Valid for 7 days.", 
    time: "1 day ago",
    icon: <Gift className="h-5 w-5" />,
    color: "bg-green-100 text-green-600"
  },
  { 
    id: 5, 
    type: "order", 
    title: "Order Delivered", 
    message: "Your order #32587941 has been delivered. Please rate your purchase!", 
    time: "2 days ago",
    icon: <CheckSquare className="h-5 w-5" />,
    color: "bg-teal-100 text-teal-600"
  },
  { 
    id: 6, 
    type: "wishlist", 
    title: "Price Drop Alert", 
    message: "A product in your wishlist is now 15% cheaper. Don't miss out!", 
    time: "3 days ago",
    icon: <AlertCircle className="h-5 w-5" />,
    color: "bg-red-100 text-red-600"
  },
  { 
    id: 7, 
    type: "message", 
    title: "New Seller Message", 
    message: "You have a new message from TechGadgets Store regarding your order.", 
    time: "4 days ago",
    icon: <MessageCircle className="h-5 w-5" />,
    color: "bg-indigo-100 text-indigo-600"
  },
];

// Special deals for header promotion, commonly seen on AliExpress
const topPromotions = [
  { 
    title: "New User Deal", 
    description: "Extra $3 off your first order",
    code: "WELCOME3",
    expiry: "Limited time"
  },
  { 
    title: "App-Only Coupon", 
    description: "$5 off $50+",
    code: "APPEXTRA5",
    expiry: "24 hours left"
  },
  { 
    title: "Free Shipping", 
    description: "On orders over $10",
    code: null,
    expiry: "Ongoing"
  }
];

// Cart items sample
const cartItems = [
  { 
    id: 101, 
    name: "Mini Portable Bluetooth Speaker with Enhanced Bass", 
    price: 14.99, 
    originalPrice: 29.99,
    quantity: 1,
    image: "placeholder.svg",
    seller: "AudioTech Store",
    variant: "Black"
  },
  { 
    id: 102, 
    name: "Phone Holder Car Mount Air Vent Universal", 
    price: 8.79, 
    originalPrice: 12.99,
    quantity: 2,
    image: "placeholder.svg",
    seller: "AutoAccessories Pro",
    variant: "360° Rotation"
  },
  { 
    id: 103, 
    name: "Fast Charging USB Type-C Cable 3-Pack 6ft", 
    price: 7.49, 
    originalPrice: 19.99,
    quantity: 1,
    image: "placeholder.svg",
    seller: "TechCables Official",
    variant: "Nylon Braided"
  }
];

// Helper to format large numbers with k and m suffixes
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

interface HeaderProps {
  isProductHeader?: boolean;
  isFavorite?: boolean;
  toggleFavorite?: () => void;
  handleShare?: () => void;
}

export function Header({
  isProductHeader = false,
  isFavorite = false,
  toggleFavorite = () => {},
  handleShare = () => {},
}: HeaderProps) {
  const isMobile = useIsMobile();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [megaMenuCategory, setMegaMenuCategory] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const isProductPage = location.pathname.includes('/product/');
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  
  // Wait for the mobile detection to stabilize
  useEffect(() => {
    if (isMobile !== undefined) {
      setIsLoaded(true);
    }
  }, [isMobile]);

  // Track scroll for sticky header effects
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCurrencyChange = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency);
    toast({
      title: "Currency Changed",
      description: `Currency has been changed to ${currency.name} (${currency.symbol})`,
    });
  };

  const handleLanguageChange = (language: typeof languages[0]) => {
    setSelectedLanguage(language);
    toast({
      title: "Language Changed",
      description: `Language has been changed to ${language.name}`,
    });
  };

  const handleCountryChange = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    toast({
      title: "Shopping Region Changed",
      description: `Shopping region has been changed to ${country.name}`,
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    toast({
      title: `${isDarkMode ? "Light" : "Dark"} Mode Activated`,
      description: `Switched to ${isDarkMode ? "light" : "dark"} mode`,
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
      setShowSearch(false);
      setIsCommandOpen(false);
    }
  };

  const handleNotificationClear = () => {
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been cleared",
    });
    setIsNotificationsOpen(false);
  };
  
  const addToCart = (productId: number) => {
    toast({
      title: "Added to Cart",
      description: "Item has been added to your shopping cart",
    });
  };
  
  // Special styling for product pages
  if (isProductHeader && isProductPage) {
    return (
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-orange-500' : 'bg-transparent'}`}>
        <div className={`flex items-center h-14 px-3 ${isScrolled ? 'shadow-md' : ''}`}>
          <Link to="/" className="mr-1">
            <Button variant="ghost" size="sm" className={`rounded-full h-9 w-9 p-0 ${isScrolled ? 'text-white hover:bg-orange-600' : 'bg-black/30 text-white hover:bg-black/40 backdrop-blur-sm'}`}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1 relative mx-2">
            <form onSubmit={handleSearchSubmit}>
              <Input 
                type="text" 
                placeholder="Search on Mimaht..." 
                className={`rounded-full h-9 pl-8 pr-10 text-sm ${isScrolled ? 'bg-white border-0' : 'bg-black/30 border-0 text-white placeholder:text-gray-300 backdrop-blur-sm'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 100)}
              />
            </form>
            <Search className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isScrolled ? 'text-gray-500' : 'text-gray-300'}`} />
            <Camera className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-full h-9 w-9 p-0 ${isScrolled ? 'text-white hover:bg-orange-600' : 'bg-black/30 text-white hover:bg-black/40 backdrop-blur-sm'}`}
              onClick={toggleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-full h-9 w-9 p-0 ${isScrolled ? 'text-white hover:bg-orange-600' : 'bg-black/30 text-white hover:bg-black/40 backdrop-blur-sm'}`}
              onClick={handleShare}
            >
              <Share className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-full h-9 w-9 p-0 relative ${isScrolled ? 'text-white hover:bg-orange-600' : 'bg-black/30 text-white hover:bg-black/40 backdrop-blur-sm'}`}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-purple-700 text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-medium">{cartItemCount}</span>
            </Button>
          </div>
        </div>
        
        {/* Search dropdown for product page */}
        {isSearchFocused && (
          <div className="absolute top-full left-0 right-0 bg-white rounded-b-lg shadow-lg z-50 border-t max-h-[70vh] overflow-y-auto">
            <div className="p-3">
              <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Trending in Electronics</h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.filter(item => item.category === "Electronics").map((item) => (
                    <Button 
                      key={item.term}
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs rounded-full"
                      onClick={() => {
                        setSearchQuery(item.term);
                        navigate(`/search?q=${encodeURIComponent(item.term)}`);
                        setIsSearchFocused(false);
                      }}
                    >
                      {item.term}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="my-3">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 4).map((category) => (
                    <Button 
                      key={category.name}
                      variant="outline" 
                      size="sm" 
                      className="h-8 justify-start text-xs"
                      onClick={() => {
                        navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`);
                        setIsSearchFocused(false);
                      }}
                    >
                      {category.icon}
                      <span className="ml-2">{category.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }
  
  // Don't render anything until we're sure about mobile status
  if (!isLoaded) {
    return null;
  }

  // Mobile menu drawer
  const renderMobileMenu = () => {
    if (!isMenuOpen) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          ref={menuRef}
          className="fixed top-0 left-0 h-full w-[85%] max-w-[350px] bg-white z-50 flex flex-col overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-orange-500 to-rose-500 p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs text-white hover:bg-white/20 rounded-full"
              >
                <QrCode className="h-4 w-4 mr-1" />
                Get App
              </Button>
            </div>
            <div className="flex items-center">
              <div className="h-12 w-12 bg-white/30 rounded-full flex items-center justify-center text-2xl font-bold">
                G
              </div>
              <div className="ml-3">
                <div className="text-sm">Hello, Guest</div>
                <div className="flex gap-2 mt-1">
                  <Button size="sm" className="bg-white text-orange-600 hover:bg-white/90 text-xs h-7 px-2.5">
                    Sign In
                  </Button>
                  <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20 text-xs h-7 px-2.5">
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-auto flex-grow">
            <div className="p-3 border-b">
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-xs h-7 px-2.5">
                  <Zap className="h-3 w-3 mr-1" />
                  Flash Deals
                </Button>
                <Button size="sm" variant="outline" className="text-xs h-7 px-2.5 border-orange-500 text-orange-500">
                  New User Zone
                </Button>
                <Button size="sm" variant="outline" className="text-xs h-7 px-2.5">
                  Super Deals
                </Button>
                <Button size="sm" variant="outline" className="text-xs h-7 px-2.5">
                  Free Shipping
                </Button>
              </div>
            </div>

            <div className="p-2 font-medium text-base border-b bg-gray-50 flex items-center justify-between">
              <span>Categories</span>
              <Link to="/categories" className="text-xs text-orange-500" onClick={() => setIsMenuOpen(false)}>
                View All
              </Link>
            </div>

            {categories.map((category) => (
              <div key={category.name} className="border-b">
                <Link 
                  to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between p-3 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span>{category.name}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
            ))}

            <div className="p-2 font-medium text-base border-b bg-gray-50 mt-2 flex items-center justify-between">
              <span>My Account</span>
              <Link to="/account" className="text-xs text-orange-500" onClick={() => setIsMenuOpen(false)}>
                View All
              </Link>
            </div>

            <div className="grid grid-cols-3 p-3 border-b">
              <Link 
                to="/orders"
                className="flex flex-col items-center p-2 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="h-5 w-5 text-gray-600 mb-1" />
                <span className="text-xs">Orders</span>
              </Link>
              <Link 
                to="/wishlist"
                className="flex flex-col items-center p-2 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-5 w-5 text-gray-600 mb-1" />
                <span className="text-xs">Wishlist</span>
              </Link>
              <Link 
                to="/coupons"
                className="flex flex-col items-center p-2 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <Gift className="h-5 w-5 text-gray-600 mb-1" />
                <span className="text-xs">Coupons</span>
              </Link>
              <Link 
                to="/messages"
                className="flex flex-col items-center p-2 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="h-5 w-5 text-gray-600 mb-1" />
                <span className="text-xs">Messages</span>
              </Link>
              <Link 
                to="/help"
                className="flex flex-col items-center p-2 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <HelpCircle className="h-5 w-5 text-gray-600 mb-1" />
                <span className="text-xs">Help</span>
              </Link>
              <Link 
                to="/settings"
                className="flex flex-col items-center p-2 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="h-5 w-5 text-gray-600 mb-1" />
                <span className="text-xs">Settings</span>
              </Link>
            </div>

            <div className="p-2 font-medium text-base border-b bg-gray-50 mt-2">Settings</div>
            <div className="border-b">
              <div className="flex p-3 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-600" />
                  <span>Language / Currency</span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <span>{selectedLanguage.flag} {selectedLanguage.code.toUpperCase()}</span>
                  <span className="mx-1">|</span>
                  <span>{selectedCurrency.code}</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
            <div className="border-b">
              <div className="flex p-3 items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span>Ship to</span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <span>{selectedCountry.flag} {selectedCountry.name}</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
            <div className="border-b">
              <div 
                className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                onClick={toggleTheme}
              >
                <div className="flex items-center gap-2">
                  {isDarkMode ? <Moon className="h-4 w-4 text-gray-600" /> : <Sun className="h-4 w-4 text-gray-600" />}
                  <span>Dark Mode</span>
                </div>
                <div className="flex items-center h-5">
                  <div className={`w-10 h-5 rounded-full transition-colors ${isDarkMode ? 'bg-orange-500' : 'bg-gray-300'} relative`}>
                    <div className={`absolute top-[2px] w-4 h-4 rounded-full bg-white transition-all ${isDarkMode ? 'right-[2px]' : 'left-[2px]'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 mt-2 bg-gray-50">
              <Button variant="outline" size="sm" className="w-full justify-start text-red-500 border-red-200">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="p-4 text-xs text-center text-gray-500">
            <div className="mb-2">© 2025 Mimaht.com. All rights reserved.</div>
            <div className="flex justify-center gap-4">
              <Link to="/terms" className="hover:text-orange-500">Terms</Link>
              <Link to="/privacy" className="hover:text-orange-500">Privacy</Link>
              <Link to="/about" className="hover:text-orange-500">About</Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Shopping cart drawer component
  const renderCartDrawer = () => {
    if (!isCartOpen) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsCartOpen(false)}
      >
        <div 
          className="fixed top-0 right-0 h-full w-[90%] max-w-[400px] bg-white z-50 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-medium text-lg">Shopping Cart ({cartItemCount})</h2>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsCartOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-grow overflow-auto">
            {cartItems.length > 0 ? (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="p-3 border-b hover:bg-gray-50">
                    <div className="flex gap-3">
                      <div className="h-20 w-20 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="max-h-full max-w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`} className="text-sm font-medium hover:text-orange-500 line-clamp-2">
                          {item.name}
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">Variant: {item.variant}</div>
                        <div className="text-xs text-gray-500">Seller: {item.seller}</div>
                        <div className="mt-1 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-orange-500">${item.price.toFixed(2)}</span>
                            {item.originalPrice > item.price && (
                              <span className="text-xs text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                          <div className="flex items-center border rounded">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-none">-</Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-none">+</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <ShoppingCart className="h-16 w-16 text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-700">Your cart is empty</h3>
                <p className="text-gray-500 text-sm mt-1 text-center">Looks like you haven't added any products to your cart yet.</p>
                <Button 
                  className="mt-4 bg-orange-500 hover:bg-orange-600"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/');
                  }}
                >
                  Start Shopping
                </Button>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Shipping:</span>
                  <span className="text-sm text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium text-lg text-orange-500">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </Button>
                <Button 
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                >
                  Checkout
                </Button>
              </div>
              <div className="mt-3 text-xs text-center text-gray-500">
                We accept: <span className="font-medium">Visa, Mastercard, PayPal, Apple Pay</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <form onSubmit={handleSearchSubmit}>
          <CommandInput 
            placeholder="Search products, brands, categories..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
        </form>
        <CommandList>
          <CommandEmpty>
            <div className="py-4 text-center flex flex-col items-center">
              <AlertCircle className="h-8 w-8 text-gray-300 mb-2" />
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
              <p className="text-xs text-gray-400 mt-1">Try a different search term or browse categories</p>
            </div>
          </CommandEmpty>
          {recentSearches.length > 0 && (
            <CommandGroup heading="Recent Searches">
              {recentSearches.map((item) => (
                <CommandItem 
                  key={item.term}
                  onSelect={() => {
                    setSearchQuery(item.term);
                    setIsCommandOpen(false);
                    navigate(`/search?q=${encodeURIComponent(item.term)}`);
                  }}
                >
                  <Clock className="mr-2 h-4 w-4 text-gray-400" />
                  <div className="flex-1">{item.term}</div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </CommandItem>
              ))}
              <CommandItem className="text-xs text-orange-500 justify-center hover:bg-white hover:text-orange-600">
                Clear recent searches
              </CommandItem>
            </CommandGroup>
          )}
          <CommandGroup heading="Trending Searches">
            {trendingSearches.map((item) => (
              <CommandItem 
                key={item.term}
                onSelect={() => {
                  setSearchQuery(item.term);
                  setIsCommandOpen(false);
                  navigate(`/search?q=${encodeURIComponent(item.term)}`);
                }}
              >
                <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                <span>{item.term}</span>
                <Badge className="ml-2 bg-orange-100 text-orange-600 hover:bg-orange-100 text-[10px]">{item.category}</Badge>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Categories">
            {categories.slice(0, 5).map((category) => (
              <CommandItem 
                key={category.name}
                onSelect={() => {
                  setIsCommandOpen(false);
                  navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`);
                }}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
                <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
              </CommandItem>
            ))}
            <CommandItem 
              onSelect={() => {
                setIsCommandOpen(false);
                navigate('/categories');
              }}
              className="text-orange-500"
            >
              <span className="ml-6">View all categories</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        {/* Mobile search expanded view */}
        {(isSearchFocused || showSearch) && isMobile ? (
          <div className="py-3 px-3 flex items-center gap-2 bg-orange-500">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 w-9 p-0 rounded-full text-white hover:bg-orange-600" 
              onClick={() => {
                setIsSearchFocused(false);
                setShowSearch(false);
              }}
            >
              <X className="h-5 w-5" />
            </Button>
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search on Mimaht..." 
                  className="rounded-full h-9 pr-16 pl-4 bg-white border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={() => {
                      toast({
                        title: "Image Search",
                        description: "Image search feature coming soon!",
                      });
                    }}
                  >
                    <Camera className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => {
                      toast({
                        title: "Voice Search",
                        description: "Voice search feature coming soon!",
                      });
                    }}
                  >
                    <Mic className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button type="submit" variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Search className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            </form>

            {/* Mobile search dropdown */}
            <div className="absolute top-[calc(100%)] left-0 right-0 bg-white z-50 max-h-[70vh] overflow-y-auto shadow-lg">
              <div className="p-3">
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.slice(0, 6).map((item) => (
                      <Button 
                        key={item.term}
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs rounded-full"
                        onClick={() => {
                          setSearchQuery(item.term);
                          navigate(`/search?q=${encodeURIComponent(item.term)}`);
                          setShowSearch(false);
                        }}
                      >
                        {item.term}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {recentSearches.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Recent Searches</h3>
                      <button className="text-xs text-orange-500 hover:underline">Clear</button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((item) => (
                        <div 
                          key={item.term}
                          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                          onClick={() => {
                            setSearchQuery(item.term);
                            navigate(`/search?q=${encodeURIComponent(item.term)}`);
                            setShowSearch(false);
                          }}
                        >
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-2 text-gray-400" />
                            <span className="text-sm">{item.term}</span>
                          </div>
                          <Undo className="h-3.5 w-3.5 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.slice(0, 4).map((category) => (
                      <Button 
                        key={category.name}
                        variant="outline" 
                        size="sm" 
                        className="h-8 justify-start text-xs"
                        onClick={() => {
                          navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`);
                          setShowSearch(false);
                        }}
                      >
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Top bar with country selector, language, help, etc. */}
            {!isMobile && (
              <div className="bg-gray-100 text-xs py-1.5">
                <div className="container mx-auto px-4 max-w-7xl">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 text-gray-600 mr-1" />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="flex items-center text-gray-800 hover:text-orange-500">
                              <span>{selectedCountry.flag} {selectedCountry.name}</span>
                              <ChevronDown className="h-3 w-3 ml-0.5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-[250px]">
                            <DropdownMenuLabel>Ship to</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-[250px] overflow-y-auto">
                              {countries.map((country) => (
                                <DropdownMenuItem 
                                  key={country.code}
                                  onClick={() => handleCountryChange(country)}
                                  className="cursor-pointer"
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                      <span className="mr-2">{country.flag}</span>
                                      <span>{country.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{country.currency}</span>
                                  </div>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <Separator orientation="vertical" className="h-3" />
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center text-gray-800 hover:text-orange-500">
                            <Globe className="h-3 w-3 mr-1" />
                            <span>{selectedLanguage.flag} {selectedLanguage.name}</span>
                            <ChevronDown className="h-3 w-3 ml-0.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[200px]">
                          <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <div className="max-h-[250px] overflow-y-auto">
                            {languages.map((lang) => (
                              <DropdownMenuItem 
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang)}
                                className="cursor-pointer"
                              >
                                <span className="mr-2">{lang.flag}</span>
                                {lang.name}
                              </DropdownMenuItem>
                            ))}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <Separator orientation="vertical" className="h-3" />
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center text-gray-800 hover:text-orange-500">
                            <DollarSign className="h-3 w-3 mr-1" />
                            <span>{selectedCurrency.code} ({selectedCurrency.symbol})</span>
                            <ChevronDown className="h-3 w-3 ml-0.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[250px]">
                          <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <div className="max-h-[250px] overflow-y-auto">
                            {currencies.map((currency) => (
                              <DropdownMenuItem 
                                key={currency.code}
                                onClick={() => handleCurrencyChange(currency)}
                                className="cursor-pointer"
                              >
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center">
                                    <span className="mr-2">{currency.flag}</span>
                                    <span>{currency.code}</span>
                                  </div>
                                  <span className="text-xs text-gray-500">{currency.symbol} {currency.name}</span>
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Link to="/sell" className="text-gray-800 hover:text-orange-500">
                        <ShoppingBag className="h-3 w-3 inline mr-1" />
                        <span>Sell on Mimaht</span>
                      </Link>
                      <Separator orientation="vertical" className="h-3" />

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center text-gray-800 hover:text-orange-500">
                            <UserCircle className="h-3 w-3 mr-1" />
                            <span>Account</span>
                            <ChevronDown className="h-3 w-3 ml-0.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[220px]">
                          <div className="p-3 border-b">
                            <div className="mb-2">
                              <h4 className="font-medium">Welcome!</h4>
                              <p className="text-xs text-gray-500">Access account & manage orders</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 h-8 text-xs bg-orange-500 hover:bg-orange-600">Sign In</Button>
                              <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">Sign Up</Button>
                            </div>
                          </div>
                          <DropdownMenuItem asChild>
                            <Link to="/account" className="flex gap-2 cursor-pointer">
                              <UserCircle className="h-4 w-4" />
                              <span>My Account</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/orders" className="flex gap-2 cursor-pointer">
                              <Package className="h-4 w-4" />
                              <span>Orders</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/wishlist" className="flex gap-2 cursor-pointer">
                              <Heart className="h-4 w-4" />
                              <span>Wishlist</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/messages" className="flex gap-2 cursor-pointer">
                              <MessageCircle className="h-4 w-4" />
                              <span>Messages</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/coupons" className="flex gap-2 cursor-pointer">
                              <Gift className="h-4 w-4" />
                              <span>Coupons</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link to="/settings" className="flex gap-2 cursor-pointer">
                              <Settings className="h-4 w-4" />
                              <span>Settings</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/help" className="flex gap-2 cursor-pointer">
                              <HelpCircle className="h-4 w-4" />
                              <span>Help Center</span>
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <Separator orientation="vertical" className="h-3" />
                      
                      <button 
                        className="text-gray-800 hover:text-orange-500 flex items-center"
                        onClick={toggleTheme}
                      >
                        {isDarkMode ? (
                          <>
                            <Sun className="h-3 w-3 mr-1" />
                            <span>Light Mode</span>
                          </>
                        ) : (
                          <>
                            <Moon className="h-3 w-3 mr-1" />
                            <span>Dark Mode</span>
                          </>
                        )}
                      </button>
                      
                      <Separator orientation="vertical" className="h-3" />
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="text-gray-800 hover:text-orange-500 flex items-center">
                            <HelpCircle className="h-3 w-3 mr-1" />
                            <span>Help</span>
                            <ChevronDown className="h-3 w-3 ml-0.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                          <DropdownMenuItem asChild>
                            <Link to="/help-center" className="flex gap-2 cursor-pointer">
                              <HelpCircle className="h-4 w-4" />
                              <span>Help Center</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/track-order" className="flex gap-2 cursor-pointer">
                              <Truck className="h-4 w-4" />
                              <span>Track Order</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/contact" className="flex gap-2 cursor-pointer">
                              <MessageCircle className="h-4 w-4" />
                              <span>Contact Us</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/returns" className="flex gap-2 cursor-pointer">
                              <Undo className="h-4 w-4" />
                              <span>Returns & Refunds</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/customer-support" className="flex gap-2 cursor-pointer">
                              <Headphones className="h-4 w-4" />
                              <span>Customer Support</span>
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Special promotions/announcements bar */}
            {!isMobile && (
              <div className="bg-orange-50 text-xs py-1.5 border-b border-orange-100">
                <div className="container mx-auto px-4 max-w-7xl">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      {topPromotions.map((promo, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center text-white ${index === 0 ? 'bg-orange-500' : index === 1 ? 'bg-red-500' : 'bg-green-500'}`}>
                            {index === 0 ? <UserPlus className="h-3 w-3" /> : 
                             index === 1 ? <Smartphone className="h-3 w-3" /> : 
                             <Truck className="h-3 w-3" />}
                          </div>
                          <div className="ml-1.5">
                            <span className="font-medium text-gray-800">{promo.title}:</span>
                            <span className="ml-1 text-gray-600">{promo.description}</span>
                            {promo.code && (
                              <span className="ml-1 bg-orange-100 px-1 py-0.5 rounded text-orange-700 font-medium cursor-pointer" onClick={() => {
                                navigator.clipboard.writeText(promo.code || "");
                                toast({
                                  title: "Coupon Copied",
                                  description: `${promo.code} has been copied to clipboard!`,
                                });
                              }}>
                                {promo.code}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Header */}
            <div className={`bg-orange-500 py-3 ${isScrolled ? 'shadow-md' : ''}`}>
              <div className="container mx-auto px-2 max-w-7xl">
                <div className="flex items-center gap-2">
                  {/* Menu button (mobile) */}
                  {isMobile && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full p-1.5 text-white hover:bg-white/20"
                      onClick={() => setIsMenuOpen(true)}
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  )}
                  
                  {/* Logo */}
                  <Link to="/" className="text-xl font-bold text-white flex-shrink-0 mr-4">
                    Mimaht
                  </Link>
                  
                  {/* Categories dropdown - desktop only */}
                  {!isMobile && (
                    <div 
                      className="relative mr-4 hidden md:block"
                      onMouseLeave={() => setMegaMenuCategory(null)}
                    >
                      <Button 
                        variant="ghost" 
                        className="text-white hover:bg-white/20 flex items-center gap-1 h-10 border-0"
                        onMouseEnter={() => setMegaMenuCategory("all")}
                      >
                        <Menu className="h-4 w-4 mr-1" />
                        <span>All Categories</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>

                      {megaMenuCategory === "all" && (
                        <div 
                          className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg z-30 w-[240px] border overflow-hidden"
                        >
                          {categories.map((category, index) => (
                            <div 
                              key={category.name}
                              className="relative"
                              onMouseEnter={() => setMegaMenuCategory(category.name)}
                            >
                              <Link 
                                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className={`flex items-center justify-between p-3 hover:bg-gray-50 ${index !== categories.length - 1 ? 'border-b' : ''}`}
                              >
                                <div className="flex items-center gap-2">
                                  {category.icon}
                                  <span>{category.name}</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              </Link>

                              {megaMenuCategory === category.name && (
                                <div 
                                  className="absolute left-full top-0 ml-1 bg-white rounded-md shadow-lg z-30 w-[600px] border p-4"
                                  onMouseLeave={(e) => e.stopPropagation()}
                                >
                                  <div className="flex gap-6">
                                    <div className="flex-1">
                                      <div className="font-medium text-lg mb-3 text-orange-500 flex items-center gap-2">
                                        {category.icon}
                                        {category.name}
                                      </div>
                                      <div className="grid grid-cols-2 gap-1">
                                        {category.subcategories.map((subcategory) => (
                                          <Link 
                                            key={subcategory}
                                            to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="py-1.5 px-2 hover:bg-gray-50 rounded text-sm text-gray-700 hover:text-orange-500"
                                          >
                                            {subcategory}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="w-[200px] border-l pl-4">
                                      <div className="font-medium text-gray-700 mb-2">Popular Brands</div>
                                      <div className="space-y-1">
                                        {category.popularBrands.map((brand) => (
                                          <Link 
                                            key={brand}
                                            to={`/brand/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="block py-1 text-sm text-gray-600 hover:text-orange-500"
                                          >
                                            {brand}
                                          </Link>
                                        ))}
                                      </div>
                                      
                                      <div className="font-medium text-gray-700 mb-2 mt-4">Trending Items</div>
                                      <div className="space-y-1">
                                        {category.trendingItems.map((item) => (
                                          <Link 
                                            key={item}
                                            to={`/search?q=${encodeURIComponent(item)}`}
                                            className="block py-1 text-sm text-gray-600 hover:text-orange-500"
                                          >
                                            <span className="text-yellow-500 mr-1">➤</span> {item}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-4 pt-3 border-t flex justify-between items-center">
                                    <Link 
                                      to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="text-orange-500 text-sm font-medium hover:underline"
                                    >
                                      View All {category.name} →
                                    </Link>
                                    <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                      Up to 50% OFF
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Search */}
                  {isMobile ? (
                    <div 
                      className="flex-1 bg-white/20 backdrop-blur-sm rounded-full h-9 flex items-center px-3 shadow-sm"
                      onClick={() => setShowSearch(true)}
                    >
                      <Search className="h-4 w-4 text-white mr-2" />
                      <div className="text-sm text-white">Search on Mimaht</div>
                    </div>
                  ) : (
                    <div className="flex-1 relative mx-4 max-w-xl">
                      <form onSubmit={handleSearchSubmit}>
                        <div className="flex">
                          <div className="relative flex-1">
                            <Input 
                              type="text" 
                              placeholder="Search on Mimaht..."
                              className="rounded-l-full h-10 pr-16 pl-4 bg-white border-r-0 focus-visible:ring-orange-400 focus-visible:ring-offset-0 shadow-sm"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onFocus={() => setIsSearchFocused(true)}
                              onBlur={() => setTimeout(() => setIsSearchFocused(false), 100)}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                              <button 
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                  toast({
                                    title: "Image Search",
                                    description: "Image search feature coming soon!",
                                  });
                                }}
                              >
                                <Camera className="h-4 w-4" />
                              </button>
                              <button 
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                  toast({
                                    title: "Voice Search",
                                    description: "Voice search feature coming soon!",
                                  });
                                }}
                              >
                                <Mic className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                type="button"
                                className="rounded-none border-l border-r border-gray-300 h-10 bg-gray-50 hover:bg-gray-100 px-2 text-xs"
                              >
                                All Categories
                                <ChevronDown className="h-3 w-3 ml-1" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-[200px]">
                              <DropdownMenuItem className="cursor-pointer">
                                All Categories
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {categories.map((category) => (
                                <DropdownMenuItem key={category.name} className="cursor-pointer">
                                  <div className="flex items-center">
                                    {category.icon}
                                    <span className="ml-2">{category.name}</span>
                                  </div>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Button 
                            type="submit"
                            className="rounded-l-none rounded-r-full h-10 bg-orange-500 hover:bg-orange-600"
                          >
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                      </form>

                      {isSearchFocused && !isMobile && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg z-50 border p-4">
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <div className="mb-3">
                                <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                                  <span>Popular Searches</span>
                                  <Badge className="ml-2 bg-orange-100 text-orange-600 hover:bg-orange-100">Today</Badge>
                                </h3>
                                <div className="space-y-1.5">
                                  {trendingSearches.slice(0, 5).map((item, index) => (
                                    <div 
                                      key={item.term}
                                      className="flex items-center p-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer"
                                      onClick={() => {
                                        setSearchQuery(item.term);
                                        navigate(`/search?q=${encodeURIComponent(item.term)}`);
                                      }}
                                    >
                                      <span className="w-5 text-orange-500 font-bold">{index + 1}</span>
                                      <span className="flex-1">{item.term}</span>
                                      <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 text-[10px]">{item.category}</Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div>
                              {recentSearches.length > 0 && (
                                <div className="mb-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-medium text-gray-800">Recent Searches</h3>
                                    <button className="text-xs text-orange-500 hover:underline">Clear All</button>
                                  </div>
                                  <div className="space-y-1.5">
                                    {recentSearches.map((item) => (
                                      <div 
                                        key={item.term}
                                        className="flex items-center justify-between p-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer"
                                        onClick={() => {
                                          setSearchQuery(item.term);
                                          navigate(`/search?q=${encodeURIComponent(item.term)}`);
                                        }}
                                      >
                                        <div className="flex items-center">
                                          <Clock className="h-3.5 w-3.5 mr-2 text-gray-400" />
                                          <span>{item.term}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{item.time}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div>
                                <h3 className="font-medium text-gray-800 mb-2">Quick Links</h3>
                                <div className="grid grid-cols-2 gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 justify-start text-xs"
                                    onClick={() => {
                                      navigate('/deals');
                                      setIsSearchFocused(false);
                                    }}
                                  >
                                    <Percent className="h-3.5 w-3.5 mr-2" />
                                    <span>Daily Deals</span>
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 justify-start text-xs"
                                    onClick={() => {
                                      navigate('/new-arrivals');
                                      setIsSearchFocused(false);
                                    }}
                                  >
                                    <Zap className="h-3.5 w-3.5 mr-2" />
                                    <span>New Arrivals</span>
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 justify-start text-xs"
                                    onClick={() => {
                                      navigate('/best-sellers');
                                      setIsSearchFocused(false);
                                    }}
                                  >
                                    <BarChart className="h-3.5 w-3.5 mr-2" />
                                    <span>Best Sellers</span>
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 justify-start text-xs"
                                    onClick={() => {
                                      navigate('/coupon-center');
                                      setIsSearchFocused(false);
                                    }}
                                  >
                                    <Gift className="h-3.5 w-3.5 mr-2" />
                                    <span>Coupon Center</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t flex items-center justify-between">
                            <span className="text-xs text-gray-500">Press <kbd className="px-1.5 py-0.5 bg-gray-100 border rounded text-xs">ESC</kbd> to close or <kbd className="px-1.5 py-0.5 bg-gray-100 border rounded text-xs">↵ Enter</kbd> to search</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setIsCommandOpen(true);
                                setIsSearchFocused(false);
                              }}
                              className="text-xs text-orange-500 hover:text-orange-600"
                            >
                              <Command className="h-3.5 w-3.5 mr-1" />
                              Advanced Search
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* User actions */}
                  <div className="flex items-center gap-1 md:gap-3">
                    {!isMobile && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex flex-col items-center rounded-none h-12 p-0 text-white hover:bg-white/20">
                            <Bell className="h-5 w-5 mb-0.5" />
                            <span className="text-[10px]">Notifications</span>
                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-medium">{notifications.length}</div>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[360px]">
                          <div className="flex items-center justify-between p-3 border-b">
                            <DropdownMenuLabel className="p-0">Notifications ({notifications.length})</DropdownMenuLabel>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={handleNotificationClear}
                              className="h-8 text-xs text-orange-500 hover:text-orange-600"
                            >
                              Clear All
                            </Button>
                          </div>
                          <div className="max-h-[400px] overflow-y-auto">
                            {notifications.map((notification) => (
                              <div key={notification.id} className="p-3 border-b hover:bg-gray-50">
                                <div className="flex gap-3">
                                  <div className={`rounded-full ${notification.color} p-2 h-10 w-10 flex items-center justify-center flex-shrink-0`}>
                                    {notification.icon}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                      <h4 className="text-sm font-medium">{notification.title}</h4>
                                      <span className="text-xs text-gray-500">{notification.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                    {notification.type === 'order' && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-2 h-7 text-xs border-orange-200 text-orange-500 hover:bg-orange-50"
                                      >
                                        Track Order
                                      </Button>
                                    )}
                                    {notification.type === 'promo' && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-2 h-7 text-xs border-orange-200 text-orange-500 hover:bg-orange-50"
                                      >
                                        View Deal
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-2 text-center">
                            <Link to="/notifications" className="text-xs text-orange-500 hover:underline">
                              View All Notifications
                            </Link>
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    
                    {!isMobile && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex flex-col items-center rounded-none h-12 p-0 text-white hover:bg-white/20">
                            <MessageCircle className="h-5 w-5 mb-0.5" />
                            <span className="text-[10px]">Messages</span>
                            <div className="absolute -top-1 right-0 bg-yellow-400 text-black text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-medium">3</div>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[360px]">
                          <div className="flex items-center justify-between p-3 border-b">
                            <DropdownMenuLabel className="p-0">Messages (3)</DropdownMenuLabel>
                            <Link to="/messages" className="text-xs text-orange-500 hover:underline">
                              View All
                            </Link>
                          </div>
                          <div className="max-h-[400px] overflow-y-auto">
                            <div className="p-3 border-b hover:bg-gray-50">
                              <div className="flex gap-3">
                                <div className="h-10 w-10 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500">
                                  <User className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <h4 className="text-sm font-medium">TechGadgets Store</h4>
                                    <span className="text-xs text-gray-500">2h ago</span>
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">Thank you for your order! Your package will be shipped within 24 hours. Let me know if you have any questions.</p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 h-7 text-xs border-orange-200 text-orange-500 hover:bg-orange-50"
                                  >
                                    <SendHorizonal className="h-3 w-3 mr-1" />
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="p-3 border-b hover:bg-gray-50">
                              <div className="flex gap-3">
                                <div className="h-10 w-10 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500">
                                  <User className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <h4 className="text-sm font-medium">ElectronicsPlus</h4>
                                    <span className="text-xs text-gray-500">1d ago</span>
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">Hello! We noticed you viewed our wireless earbuds. Would you like more information about them? We're offering a 15% discount this week.</p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 h-7 text-xs border-orange-200 text-orange-500 hover:bg-orange-50"
                                  >
                                    <SendHorizonal className="h-3 w-3 mr-1" />
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 text-center bg-gray-50">
                            <div className="text-xs text-gray-500 mb-2">Have questions about your orders?</div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs w-full border-orange-200 text-orange-500 hover:bg-orange-50"
                              onClick={() => navigate('/contact')}
                            >
                              <Headphones className="h-3.5 w-3.5 mr-1.5" />
                              Contact Support
                            </Button>
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    
                    {!isMobile && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex flex-col items-center rounded-none h-12 p-0 text-white hover:bg-white/20">
                            <div className="relative">
                              <Heart className="h-5 w-5 mb-0.5" />
                              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-medium">{wishlistItems.length}</span>
                            </div>
                            <span className="text-[10px]">Wishlist</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[380px]">
                          <div className="flex items-center justify-between p-3 border-b">
                            <DropdownMenuLabel className="p-0">Wishlist ({wishlistItems.length})</DropdownMenuLabel>
                            <Link to="/wishlist" className="text-xs text-orange-500 hover:underline">
                              View All
                            </Link>
                          </div>
                          <div className="max-h-[400px] overflow-y-auto">
                            {wishlistItems.slice(0, 3).map((item) => (
                              <div key={item.id} className="p-3 border-b hover:bg-gray-50">
                                <div className="flex gap-3">
                                  <div className="h-20 w-20 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-cover" />
                                  </div>
                                  <div className="flex-1">
                                    <Link to={`/product/${item.id}`} className="text-sm font-medium hover:text-orange-500 line-clamp-2">
                                      {item.name}
                                    </Link>
                                    <div className="flex items-center gap-1 mt-1">
                                      <div className="text-yellow-500 text-xs flex items-center">
                                        {"★".repeat(Math.floor(item.rating))}
                                        {"☆".repeat(5 - Math.floor(item.rating))}
                                      </div>
                                      <span className="text-xs text-gray-500">({formatNumber(item.numReviews)})</span>
                                      <span className="text-xs text-gray-500 px-1.5">•</span>
                                      <span className="text-xs text-gray-500">{item.orders} sold</span>
                                    </div>
                                    <div className="mt-1 flex items-center gap-2">
                                      <span className="text-base font-medium text-orange-500">${item.price.toFixed(2)}</span>
                                      {item.discount > 0 && (
                                        <span className="text-xs text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                                      )}
                                      {item.discount > 0 && (
                                        <Badge className="bg-red-100 text-red-600 hover:bg-red-100 px-1.5 text-[10px]">-{item.discount}%</Badge>
                                      )}
                                    </div>
                                    <div className="mt-2 flex gap-2">
                                      <Button size="sm" className="h-7 text-xs flex-1 bg-orange-500 hover:bg-orange-600" onClick={() => addToCart(item.id)}>
                                        Add to Cart
                                      </Button>
                                      <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-red-500" onClick={() => toggleFavorite()}>
                                        <Heart className="h-4 w-4 fill-current" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {wishlistItems.length > 3 && (
                            <div className="p-3 text-center border-t">
                              <p className="text-sm text-gray-600 mb-2">
                                And {wishlistItems.length - 3} more items in your wishlist
                              </p>
                              <Link to="/wishlist">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="border-orange-200 text-orange-500 hover:bg-orange-50"
                                >
                                  View All Items
                                </Button>
                              </Link>
                            </div>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex flex-col items-center rounded-none h-12 p-0 text-white hover:bg-white/20"
                      onClick={() => setIsCartOpen(true)}
                    >
                      <div className="relative">
                        <ShoppingCart className="h-5 w-5 mb-0.5" />
                        <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-medium">{cartItems.reduce((count, item) => count + item.quantity, 0)}</span>
                      </div>
                      <span className="hidden md:inline text-[10px]">Cart</span>
                    </Button>
                    
                    {!isMobile && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex flex-col items-center rounded-none h-12 p-0 text-white hover:bg-white/20">
                            <User className="h-5 w-5 mb-0.5" />
                            <span className="text-[10px]">Account</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[240px]">
                          <div className="p-3 border-b">
                            <div className="mb-2">
                              <h4 className="font-medium">Welcome to Mimaht!</h4>
                              <p className="text-xs text-gray-500">Sign in for the best shopping experience</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 h-8 text-xs bg-orange-500 hover:bg-orange-600">Sign In</Button>
                              <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">Sign Up</Button>
                            </div>
                          </div>
                          <DropdownMenuItem asChild>
                            <Link to="/account" className="flex gap-2 cursor-pointer">
                              <UserCircle className="h-4 w-4" />
                              <span>My Account</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/orders" className="flex gap-2 cursor-pointer">
                              <Package className="h-4 w-4" />
                              <span>Orders</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/wishlist" className="flex gap-2 cursor-pointer">
                              <Heart className="h-4 w-4" />
                              <span>Wishlist</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/coupons" className="flex gap-2 cursor-pointer">
                              <Gift className="h-4 w-4" />
                              <span>Coupons</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/messages" className="flex gap-2 cursor-pointer">
                              <MessageCircle className="h-4 w-4" />
                              <span>Messages</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link to="/settings" className="flex gap-2 cursor-pointer">
                              <Settings className="h-4 w-4" />
                              <span>Settings</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/help" className="flex gap-2 cursor-pointer">
                              <HelpCircle className="h-4 w-4" />
                              <span>Help Center</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex gap-2 cursor-pointer text-red-600 hover:text-red-600">
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Category navigation */}
            <div className="bg-white py-2 border-t border-b shadow-sm overflow-x-auto hide-scrollbar">
              <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex gap-6 text-sm">
                  <Link to="/flash-deals" className="whitespace-nowrap text-orange-500 font-medium flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    Flash Deals
                  </Link>
                  <Link to="/superdeals" className="whitespace-nowrap text-orange-500 font-medium">
                    Super Deals
                  </Link>
                  <Link to="/bestsellers" className="whitespace-nowrap hover:text-orange-500 transition-colors">
                    Best Sellers
                  </Link>
                  <Link to="/new-arrivals" className="whitespace-nowrap hover:text-orange-500 transition-colors">
                    New Arrivals
                  </Link>
                  {categories.slice(0, isMobile ? 2 : 5).map((category) => (
                    <Link 
                      to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
                      key={category.name} 
                      className="whitespace-nowrap hover:text-orange-500 transition-colors flex items-center"
                    >
                      {isMobile ? null : category.icon}
                      <span className={isMobile ? '' : 'ml-1'}>{category.name}</span>
                    </Link>
                  ))}
                  {isMobile && (
                    <Link to="/categories" className="whitespace-nowrap text-orange-500 font-medium">
                      More →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      
        {/* Mobile bottom navigation */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 py-1 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
            <div className="grid grid-cols-5 gap-1">
              <Link to="/" className="flex flex-col items-center justify-center p-1 text-[10px] text-orange-500">
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
              <Link to="/wishlist" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500 relative">
                <Heart className="h-5 w-5 mb-0.5" />
                <span>Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="absolute top-0 right-[calc(50%-14px)] bg-orange-500 text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-medium">{wishlistItems.length}</span>
                )}
              </Link>
              <Link to="/account" className="flex flex-col items-center justify-center p-1 text-[10px] text-gray-500">
                <User className="h-5 w-5 mb-0.5" />
                <span>Account</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {renderMobileMenu()}
      {renderCartDrawer()}
      
      {/* Helper element to create proper spacing for fixed bottom navigation on mobile */}
      {isMobile && <div className="h-14"></div>}
    </>
  );
}

export default Header;

