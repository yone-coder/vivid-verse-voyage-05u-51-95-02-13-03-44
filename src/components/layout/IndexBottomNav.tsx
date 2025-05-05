
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  Plus,
  ShoppingCart,
  Camera,
  Tag,
  Gift
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function IndexBottomNav() {
  const [activeTab, setActiveTab] = useState("home");
  const [showNotificationDot, setShowNotificationDot] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const plusButtonRef = useRef(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Update activeTab when the route changes
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/for-you") {
      setActiveTab("home");
    } else if (location.pathname === "/categories") {
      setActiveTab("categories");
    } else if (location.pathname === "/wishlist") {
      setActiveTab("wishlist");
    } else if (location.pathname === "/account") {
      setActiveTab("account");
    }
  }, [location.pathname]);

  const navItems = [
    {
      id: "home",
      icon: Home,
      label: "Home",
      path: "/for-you",
      badge: null,
    },
    {
      id: "categories",
      icon: Search,
      label: "Explore",
      path: "/categories", 
      badge: null,
    },
    {
      id: "add",
      icon: Plus,
      label: "", // Removed label
      path: "#",
      badge: null,
      isSpecial: true,
    },
    {
      id: "wishlist",
      icon: Heart,
      label: "Wishlist",
      path: "/wishlist",
      badge: 3,
    },
    {
      id: "account",
      icon: User,
      label: "Account",
      path: "/account",
      badge: null,
    },
  ];

  const dismissNotification = () => {
    setShowNotificationDot(false);
    toast({
      title: "Notifications cleared",
      description: "You're all caught up!",
    });
  };

  const handleQuickAction = (action) => {
    setIsPopoverOpen(false);
    
    toast({
      title: `Adding new ${action}`,
      description: `Creating a new ${action}...`,
    });
    
    // Close the popover after action
    setTimeout(() => {
      if (action === "Product") {
        navigate("/admin");
      }
    }, 500);
  };

  const handleTabClick = (item) => {
    setActiveTab(item.id);
    if (item.id !== "add") {
      navigate(item.path);
    }
  };

  // Quick action items in a single row
  const quickActions = [
    { icon: ShoppingCart, label: "Product", action: "Product", color: "text-blue-600", badge: "HOT" },
    { icon: Camera, label: "Photo", action: "Photo", color: "text-purple-600" },
    { icon: Tag, label: "Offer", action: "Offer", color: "text-pink-600", badge: "NEW" },
    { icon: Gift, label: "Sale", action: "Sale", color: "text-orange-600" },
  ];

  return (
    <>
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 z-50 shadow-lg"
      >
        <div className="h-12 max-w-md mx-auto flex items-center justify-between px-2 relative">
          {navItems.map((item) => (
            item.id === "add" ? (
              <Popover key={item.id} open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <button
                    ref={plusButtonRef}
                    className="flex flex-col items-center justify-center w-1/5 relative"
                    onClick={() => setIsPopoverOpen(true)}
                  >
                    <div className="bg-gradient-to-tr from-red-500 to-red-400 rounded-full p-2 shadow-md transition-all duration-200 hover:shadow-red-300 hover:scale-110"
                      style={{
                        boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)"
                      }}>
                      <Plus className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-[280px] p-0 border border-gray-200 shadow-xl rounded-lg overflow-hidden" 
                  align="center" 
                  side="top" 
                  sideOffset={5}
                >
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 text-white">
                    <h3 className="font-medium text-sm">Quick Actions</h3>
                  </div>
                  
                  <div className="py-3 px-2">
                    <div className="grid grid-cols-4 gap-1">
                      {quickActions.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(item.action)}
                          className="flex flex-col items-center justify-center p-2 hover:bg-gray-50 rounded-md text-[11px] transition-all duration-200"
                        >
                          <div className={`mb-1 ${item.color} transition-transform duration-200 hover:scale-110`}>
                            <item.icon className="w-5 h-5" />
                          </div>
                          <span className="text-center line-clamp-1 text-gray-700">{item.label}</span>
                          {item.badge && (
                            <Badge 
                              variant={item.badge === "HOT" ? "aliHot" : "aliNew"} 
                              className="text-[9px] mt-1 p-px px-1"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 p-2 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Go to shop center</span>
                      <button 
                        onClick={() => setIsPopoverOpen(false)}
                        className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <button
                key={item.id}
                className="flex flex-col items-center justify-center w-1/5 relative group"
                onClick={() => handleTabClick(item)}
              >
                <div className="relative">
                  {/* Icon with hover effect */}
                  <div className="relative transition-transform duration-200 group-hover:scale-110">
                    <item.icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        activeTab === item.id 
                          ? "text-red-500" 
                          : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                      )}
                    />

                    {item.badge && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-medium rounded-full px-1 min-w-[14px] h-3.5 flex items-center justify-center"
                      >
                        {item.badge}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Label with improved hover state */}
                {item.label && (
                  <span 
                    className={cn(
                      "text-[10px] mt-0.5 font-medium transition-colors",
                      activeTab === item.id 
                        ? "text-red-500" 
                        : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                    )}
                  >
                    {item.label}
                  </span>
                )}

                {/* Active indicator dot */}
                {activeTab === item.id && (
                  <motion.div 
                    className="absolute -bottom-2 w-1 h-1 rounded-full bg-red-500"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </button>
            )
          ))}
        </div>
        
        {/* Extra space at bottom for iOS safe area */}
        <div className="h-safe-bottom bg-white dark:bg-zinc-900" />
      </motion.div>
    </>
  );
}
