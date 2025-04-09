
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  ShoppingCart, 
  Camera, 
  Mic, 
  ChevronDown, 
  Heart, 
  Menu,
  X,
  User,
  ArrowLeft,
  Share,
  MessageSquare,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const Header = ({ isProductHeader, isFavorite, toggleFavorite, handleShare }: { 
  isProductHeader?: boolean, 
  isFavorite?: boolean, 
  toggleFavorite?: () => void, 
  handleShare?: () => void 
}) => {
  const isMobile = useIsMobile();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchModalOpen(false);
    toast({
      title: "Search submitted",
      description: `Searching for: ${searchQuery}`,
    });
  };

  if (isProductHeader) {
    return (
      <div className="sticky top-0 left-0 right-0 z-40">
        <div className={`h-[44px] w-full transition-all duration-200 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
          {isScrolled ? (
            // Scrolled Product Header
            <div className="flex items-center justify-between h-full px-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              
              <div className="flex-1 mx-2 max-w-[200px]">
                <div className="text-xs font-medium truncate text-center">Product Details</div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={toggleFavorite}>
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={handleShare}>
                  <Share className="h-4 w-4" />
                </Button>
                <div className="relative">
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
                      2
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Transparent Product Header for hero image
            <div className="absolute top-2 left-0 right-0 flex justify-between z-10 px-3">
              <Button variant="outline" size="icon" className="h-8 w-8 p-0 rounded-full bg-black/40 backdrop-blur-sm border-0 text-white" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 p-0 rounded-full bg-black/40 backdrop-blur-sm border-0 text-white"
                  onClick={toggleFavorite}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-white text-white" : ""}`} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 p-0 rounded-full bg-black/40 backdrop-blur-sm border-0 text-white"
                  onClick={handleShare}
                >
                  <Share className="h-4 w-4" />
                </Button>
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 p-0 rounded-full bg-black/40 backdrop-blur-sm border-0 text-white"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
                      2
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Regular home header
  return (
    <div className="sticky top-0 left-0 right-0 bg-white z-40">
      {/* Main Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="py-2 px-3">
          {/* Main Search Bar */}
          <div className="flex items-center">
            <Sheet>
              <SheetContent side="left" className="w-[80%] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-2">
                          <Button variant="default" size="sm" className="h-7 text-[10px] bg-red-500 hover:bg-red-600">Sign In</Button>
                          <Button variant="outline" size="sm" className="h-7 text-[10px]">Register</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-auto flex-1">
                    <div className="p-3">
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-1">
                            <Heart className="h-5 w-5 text-red-500" />
                          </div>
                          <span className="text-[10px]">Wishlist</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-1">
                            <ShoppingCart className="h-5 w-5 text-orange-500" />
                          </div>
                          <span className="text-[10px]">Cart</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-1">
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                          </div>
                          <span className="text-[10px]">Messages</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-1">
                            <Bell className="h-5 w-5 text-purple-500" />
                          </div>
                          <span className="text-[10px]">Alerts</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-3">
                        <div className="text-sm font-medium">Categories</div>
                        {['Women\'s Fashion', 'Men\'s Fashion', 'Phones & Accessories', 'Electronics', 'Home & Garden'].map((cat, idx) => (
                          <div key={idx} className="py-2 border-b border-gray-100">
                            <div className="flex justify-between items-center">
                              <span className="text-xs">{cat}</span>
                              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
              <Button variant="ghost" size="icon" className="h-7 w-7 mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </Sheet>
            
            <div className="flex-1 relative" onClick={() => setIsSearchModalOpen(true)}>
              <div className="bg-gray-100 rounded-full h-8 px-3 py-1.5 flex items-center">
                <Search className="h-3.5 w-3.5 text-gray-400 mr-2" />
                <span className="text-[11px] text-gray-500">Search on AliExpress</span>
              </div>
            </div>
            
            <div className="flex items-center ml-2 gap-2">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => {
                toast({
                  title: "Camera Search",
                  description: "Camera search feature opened",
                });
              }}>
                <Camera className="h-5 w-5" />
              </Button>
              
              <div className="relative">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
                    2
                  </span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Categories Scroller */}
          <div className="mt-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center space-x-3 whitespace-nowrap pb-1">
              <div className="flex flex-col items-center">
                <Badge variant="aliSuper" className="text-[8px] px-2 py-0.5 rounded-sm">SUPER DEALS</Badge>
              </div>
              <div className="text-[10px]">Flash Deals</div>
              <div className="text-[10px]">Top Selection</div>
              <div className="text-[10px]">New Arrivals</div>
              <div className="text-[10px]">Clearance</div>
              <div className="text-[10px]">Free Shipping</div>
              <div className="text-[10px]">Trending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="p-3 border-b">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="h-8 w-8 mr-2" onClick={() => setIsSearchModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
              
              <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search on AliExpress"
                    className="h-9 pl-8 pr-8 rounded-full border-gray-200 text-xs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  {searchQuery && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-3 w-3 text-gray-400" />
                    </Button>
                  )}
                </div>
                <Button type="submit" className="ml-2 bg-red-500 hover:bg-red-600 h-9 px-3 rounded-full text-xs">
                  Search
                </Button>
              </form>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">Camera</Badge>
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">Mic</Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px]">
                    English
                    <ChevronDown className="h-3 w-3 ml-0.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-xs">English</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">Español</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">Français</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="p-3">
            <div className="mb-4">
              <h3 className="text-xs font-medium mb-2">Recent Searches</h3>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">iphone 15 case</Badge>
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">wireless earbuds</Badge>
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">smart watch</Badge>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xs font-medium mb-2">Popular Searches</h3>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">summer dress</Badge>
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">phone charger</Badge>
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">bluetooth speaker</Badge>
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">men's shoes</Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-medium mb-2">Trending Products</h3>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex flex-col">
                    <div className="relative">
                      <img
                        src={`https://picsum.photos/200/200?random=${item}`}
                        alt="Product"
                        className="rounded-md w-full aspect-square object-cover"
                      />
                      <Badge className="absolute bottom-1 left-1 bg-red-500 text-[8px] px-1.5">-20%</Badge>
                    </div>
                    <p className="text-[10px] mt-1 truncate">Trendy Product Item with Long Name</p>
                    <p className="text-[10px] text-red-500 font-medium">$19.99</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
