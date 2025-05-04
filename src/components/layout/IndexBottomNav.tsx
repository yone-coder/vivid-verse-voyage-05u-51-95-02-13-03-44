
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  Plus,
  ShoppingCart,
  Bookmark,
  Compass,
  Bell,
  Image,
  Video,
  Pencil
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

export default function IndexBottomNav() {
  const [activeTab, setActiveTab] = useState("home");
  const [showNotificationDot, setShowNotificationDot] = useState(true);
  const location = useLocation();
  const { toast } = useToast();
  const plusButtonRef = useRef(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const navItems = [
    {
      id: "home",
      icon: Home,
      label: "Home",
      path: "/",
      badge: null,
    },
    {
      id: "categories",
      icon: Compass,
      label: "Explore",
      path: "/categories", 
      badge: null,
    },
    {
      id: "add",
      icon: Plus,
      label: "", // Removed the "Add" label here
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
        window.location.href = "/admin";
      }
    }, 500);
  };

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
                    <div className="bg-gradient-to-tr from-red-500 to-red-400 rounded-full p-2 shadow-md"
                      style={{
                        boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)"
                      }}>
                      <Plus className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-48 p-0 border border-gray-200 shadow-lg rounded-lg" 
                  align="center" 
                  side="top" 
                  sideOffset={5}
                >
                  <div className="flex flex-col p-1">
                    <button
                      onClick={() => handleQuickAction("Product")}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-sm transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 text-blue-600" />
                      <span>Add Product</span>
                    </button>
                    <button
                      onClick={() => handleQuickAction("Post")}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-sm transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-green-600" />
                      <span>Create Post</span>
                    </button>
                    <button
                      onClick={() => handleQuickAction("Image")}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-sm transition-colors"
                    >
                      <Image className="w-4 h-4 text-purple-600" />
                      <span>Upload Image</span>
                    </button>
                    <button
                      onClick={() => handleQuickAction("Video")}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-sm transition-colors"
                    >
                      <Video className="w-4 h-4 text-red-600" />
                      <span>Create Video</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link
                key={item.id}
                to={item.path}
                className="flex flex-col items-center justify-center w-1/5 relative"
                onClick={() => setActiveTab(item.id)}
              >
                <div className="relative">
                  <motion.div
                    className={cn(
                      "absolute -inset-2.5 rounded-full",
                      activeTab === item.id ? "bg-red-50 dark:bg-red-950/20" : "bg-transparent"
                    )}
                    layoutId="nav-pill"
                    transition={{ type: "spring", duration: 0.5 }}
                    style={{ opacity: activeTab === item.id ? 1 : 0 }}
                  />
                  <div className="relative">
                    <item.icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        activeTab === item.id 
                          ? "text-red-500" 
                          : "text-gray-500 dark:text-gray-400"
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

                {/* Only render the label if it exists */}
                {item.label && (
                  <span 
                    className={cn(
                      "text-[10px] mt-0.5 font-medium",
                      activeTab === item.id 
                        ? "text-red-500" 
                        : "text-gray-500 dark:text-gray-400"
                    )}
                  >
                    {item.label}
                  </span>
                )}

                {activeTab === item.id && (
                  <motion.div 
                    className="absolute -bottom-2 w-1 h-1 rounded-full bg-red-500"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>
            )
          ))}
        </div>
        
        {/* Extra space at bottom for iOS safe area */}
        <div className="h-safe-bottom bg-white dark:bg-zinc-900" />
      </motion.div>
    </>
  );
}
