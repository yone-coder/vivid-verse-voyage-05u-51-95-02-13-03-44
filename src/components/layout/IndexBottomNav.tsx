
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
  Pencil,
  Camera,
  Package,
  Tag,
  Clock,
  MapPin,
  Gift,
  DollarSign,
  Percent,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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

  // Quick action categories for the enhanced popover
  const quickActions = [
    {
      title: "Add Content",
      items: [
        { icon: ShoppingCart, label: "Product", action: "Product", color: "text-blue-600" },
        { icon: Pencil, label: "Post", action: "Post", color: "text-green-600" },
        { icon: Camera, label: "Photo", action: "Image", color: "text-purple-600" },
        { icon: Video, label: "Video", action: "Video", color: "text-red-600" },
      ]
    },
    {
      title: "Sell Products",
      items: [
        { icon: Package, label: "List Item", action: "ListItem", color: "text-orange-600" },
        { icon: Tag, label: "Create Offer", action: "Offer", color: "text-pink-600" },
        { icon: DollarSign, label: "Set Price", action: "Price", color: "text-green-700" },
        { icon: Percent, label: "Discount", action: "Discount", color: "text-red-700" },
      ]
    },
    {
      title: "Promotions",
      items: [
        { icon: Gift, label: "Flash Sale", action: "FlashSale", color: "text-purple-700" },
        { icon: Clock, label: "Limited Time", action: "LimitedOffer", color: "text-amber-600" },
        { icon: TrendingUp, label: "Boost Item", action: "Boost", color: "text-blue-700" },
        { icon: MapPin, label: "Local Ads", action: "LocalAds", color: "text-emerald-600" },
      ]
    }
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
                    <div className="bg-gradient-to-tr from-red-500 to-red-400 rounded-full p-2 shadow-md"
                      style={{
                        boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)"
                      }}>
                      <Plus className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-[300px] p-0 border border-gray-200 shadow-xl rounded-lg overflow-hidden" 
                  align="center" 
                  side="top" 
                  sideOffset={5}
                >
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 text-white">
                    <h3 className="font-medium text-sm">Create New</h3>
                  </div>
                  
                  <div className="max-h-[60vh] overflow-y-auto p-2">
                    {quickActions.map((category, idx) => (
                      <div key={idx} className={`mb-3 ${idx > 0 ? "pt-2 border-t border-gray-100" : ""}`}>
                        <h4 className="text-xs font-medium text-gray-500 mb-2 px-1">{category.title}</h4>
                        <div className="grid grid-cols-4 gap-1">
                          {category.items.map((item, itemIdx) => (
                            <button
                              key={itemIdx}
                              onClick={() => handleQuickAction(item.action)}
                              className="flex flex-col items-center justify-center p-2 hover:bg-gray-50 rounded-md text-[11px] transition-colors"
                            >
                              <div className={`mb-1 ${item.color}`}>
                                <item.icon className="w-5 h-5" />
                              </div>
                              <span className="text-center line-clamp-2 text-gray-700">{item.label}</span>
                              {itemIdx === 0 && category.title === "Add Content" && (
                                <Badge variant="aliHot" className="text-[9px] mt-1 p-px px-1">HOT</Badge>
                              )}
                              {itemIdx === 0 && category.title === "Sell Products" && (
                                <Badge variant="aliNew" className="text-[9px] mt-1 p-px px-1">NEW</Badge>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-100 p-2 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Go to shop center</span>
                      <button 
                        onClick={() => setIsPopoverOpen(false)}
                        className="text-xs text-blue-600"
                      >
                        Close
                      </button>
                    </div>
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
