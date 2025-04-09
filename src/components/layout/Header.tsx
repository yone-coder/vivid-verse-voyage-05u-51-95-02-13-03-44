
import { Link } from "react-router-dom";
import { Search, User, ShoppingCart, Heart, ChevronDown, Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Picks", subcategories: ["Daily Picks", "Top Sellers", "New Arrivals"] },
  { name: "Electronics", subcategories: ["Smartphones", "Laptops", "Audio", "Cameras"] },
  { name: "Home & Garden", subcategories: ["Kitchen", "Furniture", "Decor", "Outdoor"] },
  { name: "Fashion", subcategories: ["Women's Clothing", "Men's Clothing", "Jewelry", "Shoes"] },
  { name: "Beauty", subcategories: ["Skincare", "Makeup", "Fragrance", "Hair Care"] },
  { name: "Sports", subcategories: ["Fitness", "Outdoor Recreation", "Team Sports", "Water Sports"] }
];

export function Header() {
  return (
    <header className="bg-white sticky top-0 z-40 border-b">
      {/* Top bar with app promotion and currency */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-1.5 text-xs text-white text-center hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 text-left">
              <Link to="#" className="hover:underline">Get the app</Link>
            </div>
            <div className="flex-1 text-center font-bold">
              <span>Deals up to 70% OFF</span>
            </div>
            <div className="flex-1 flex justify-end items-center space-x-4">
              <Link to="#" className="hover:underline">EN</Link>
              <span>|</span>
              <Link to="#" className="hover:underline">USD</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="py-2 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-2">
            {/* Menu button (mobile) */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-orange-500 flex-shrink-0 mr-1">
              AliMarket
            </Link>
            
            {/* Search */}
            <div className="flex-1 relative">
              <div className="flex">
                <Input 
                  type="text" 
                  placeholder="Search..." 
                  className="rounded-full h-9 pr-10 pl-4 bg-gray-100 border-gray-200 focus-visible:ring-orange-200"
                />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9 rounded-full">
                  <Search className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
            
            {/* User actions */}
            <div className="flex items-center gap-1 md:gap-3">
              <Button variant="ghost" size="icon" className="hidden md:flex flex-col items-center rounded-full h-10 w-10">
                <Bell className="h-5 w-5" />
              </Button>
              <Link to="/account" className="hidden md:flex flex-col items-center text-xs p-1">
                <User className="h-5 w-5 mb-0.5" />
                <span>Account</span>
              </Link>
              <Link to="/wishlist" className="flex flex-col items-center text-xs p-1">
                <Heart className="h-5 w-5 mb-0.5" />
                <span className="hidden md:inline">Wishlist</span>
              </Link>
              <Link to="/cart" className="flex flex-col items-center text-xs p-1">
                <div className="relative">
                  <ShoppingCart className="h-5 w-5 mb-0.5" />
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-medium">3</span>
                </div>
                <span className="hidden md:inline">Cart</span>
              </Link>
              <Link to="/admin" className="hidden md:block">
                <Button variant="outline" size="sm" className="text-xs h-7">Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category navigation */}
      <div className="bg-white py-1 hidden md:block border-t">
        <div className="container mx-auto">
          <div className="flex gap-6 overflow-x-auto pb-1 text-sm">
            {categories.map((category) => (
              <Link to="#" key={category.name} className="whitespace-nowrap hover:text-orange-500 transition-colors">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
