import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Heart, ShoppingCart, Share2, Home } from "lucide-react";

interface TabsNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled: boolean;
}

const TabsNavigation = ({ activeTab, setActiveTab, isScrolled }: TabsNavigationProps) => {
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    // Handle special navigation tabs
    if (value === "back") {
      navigate(-1);
      return;
    }
    
    if (value === "home") {
      navigate("/");
      return;
    }
    
    if (value === "cart") {
      navigate("/cart");
      return;
    }
    
    if (value === "wishlist") {
      navigate("/wishlist");
      return;
    }
    
    // Otherwise set the active content tab
    setActiveTab(value);
  };
  
  return (
    <div className={`bg-white border-b border-gray-200 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <ScrollArea className="w-full" orientation="horizontal">
        <TabsList className="w-full h-12 bg-white px-0 justify-between">
          <TabsTrigger 
            value="back" 
            className="data-[state=active]:bg-transparent flex-1"
            onClick={() => handleTabChange("back")}
          >
            <div className="flex flex-col items-center">
              <ArrowLeft size={16} />
              <span className="text-xs mt-0.5">Back</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="home" 
            className="data-[state=active]:bg-transparent flex-1"
            onClick={() => handleTabChange("home")}
          >
            <div className="flex flex-col items-center">
              <Home size={16} />
              <span className="text-xs mt-0.5">Home</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="description" 
            className={`data-[state=active]:bg-transparent flex-1 ${activeTab === "description" ? "border-b-2 border-red-500" : ""}`}
            onClick={() => handleTabChange("description")}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs mt-0.5">Details</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="specs" 
            className={`data-[state=active]:bg-transparent flex-1 ${activeTab === "specs" ? "border-b-2 border-red-500" : ""}`}
            onClick={() => handleTabChange("specs")}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs mt-0.5">Specs</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="reviews" 
            className={`data-[state=active]:bg-transparent flex-1 ${activeTab === "reviews" ? "border-b-2 border-red-500" : ""}`}
            onClick={() => handleTabChange("reviews")}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs mt-0.5">Reviews</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="wishlist" 
            className="data-[state=active]:bg-transparent flex-1"
            onClick={() => handleTabChange("wishlist")}
          >
            <div className="flex flex-col items-center">
              <Heart size={16} />
              <span className="text-xs mt-0.5">Save</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="cart" 
            className="data-[state=active]:bg-transparent flex-1"
            onClick={() => handleTabChange("cart")}
          >
            <div className="flex flex-col items-center">
              <ShoppingCart size={16} />
              <span className="text-xs mt-0.5">Cart</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </ScrollArea>
    </div>
  );
};

export default TabsNavigation;
