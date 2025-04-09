
import { Link } from "react-router-dom";
import { Search, User, ShoppingCart, Heart, ChevronDown } from "lucide-react";
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
  { name: "Electronics", subcategories: ["Smartphones", "Laptops", "Audio", "Cameras"] },
  { name: "Home & Garden", subcategories: ["Kitchen", "Furniture", "Decor", "Outdoor"] },
  { name: "Fashion", subcategories: ["Women's Clothing", "Men's Clothing", "Jewelry", "Shoes"] },
  { name: "Beauty", subcategories: ["Skincare", "Makeup", "Fragrance", "Hair Care"] },
  { name: "Sports", subcategories: ["Fitness", "Outdoor Recreation", "Team Sports", "Water Sports"] }
];

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 border-b">
      {/* Top bar with shipping info */}
      <div className="bg-gray-50 py-1.5 text-xs text-gray-600 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span>Ship to: United States</span>
              <span>|</span>
              <span>Language: English</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="#" className="hover:text-red-500 transition-colors">Help</Link>
              <Link to="#" className="hover:text-red-500 transition-colors">Buyer Protection</Link>
              <Link to="#" className="hover:text-red-500 transition-colors">App</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="py-3 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-red-500 flex-shrink-0">
              ShopNow
            </Link>
            
            {/* Search */}
            <div className="flex-1 relative max-w-3xl">
              <div className="flex">
                <Input 
                  type="text" 
                  placeholder="Search among millions of products..." 
                  className="rounded-r-none border-r-0 focus-visible:ring-red-200"
                />
                <div className="relative group">
                  <Button variant="outline" className="h-10 rounded-l-none rounded-r-none border-x-0 bg-white hover:bg-gray-50">
                    All Categories <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-70" />
                  </Button>
                  <div className="absolute top-full right-0 w-48 bg-white shadow-lg border rounded-md py-2 hidden group-hover:block z-50">
                    {categories.map(category => (
                      <Link 
                        key={category.name} 
                        to="#" 
                        className="block px-4 py-2 hover:bg-gray-50 text-sm"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <Button className="rounded-l-none bg-red-500 hover:bg-red-600">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* User actions */}
            <div className="flex items-center gap-3 md:gap-5">
              <Link to="/account" className="flex flex-col items-center text-xs text-gray-700 hover:text-red-500">
                <User className="h-6 w-6 mb-1" />
                <span className="hidden sm:inline">Account</span>
              </Link>
              <Link to="/wishlist" className="flex flex-col items-center text-xs text-gray-700 hover:text-red-500">
                <Heart className="h-6 w-6 mb-1" />
                <span className="hidden sm:inline">Wishlist</span>
              </Link>
              <Link to="/cart" className="flex flex-col items-center text-xs text-gray-700 hover:text-red-500">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 mb-1" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium">3</span>
                </div>
                <span className="hidden sm:inline">Cart</span>
              </Link>
              <Link to="/admin" className="hidden md:block">
                <Button variant="outline" size="sm">Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category navigation */}
      <div className="bg-gray-50 py-1 hidden md:block border-t">
        <div className="container mx-auto">
          <NavigationMenu>
            <NavigationMenuList>
              {categories.map((category) => (
                <NavigationMenuItem key={category.name}>
                  <NavigationMenuTrigger className="bg-transparent h-auto py-1.5 px-3 text-sm">
                    {category.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory}>
                          <NavigationMenuLink asChild>
                            <Link
                              to="#"
                              className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              {subcategory}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
