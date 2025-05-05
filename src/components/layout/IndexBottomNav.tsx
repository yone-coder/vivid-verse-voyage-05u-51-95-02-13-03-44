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
  Gift,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

export default function IndexBottomNav() {
  const [activeTab, setActiveTab] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const plusButtonRef = useRef(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
    },
    {
      id: "categories",
      icon: Search,
      label: "Shorts",
      path: "/categories",
    },
    {
      id: "add",
      icon: Plus,
      label: "",
      path: "#",
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
    },
  ];

  const handleQuickAction = (action) => {
    setIsPopoverOpen(false);

    toast({
      title: `Creating ${action}`,
      description: `Redirecting to ${action} creation page...`,
    });

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

  const quickActions = [
    {
      icon: ShoppingCart,
      label: "Product",
      desc: "Add a new item to your store",
      action: "Product",
      color: "text-blue-600",
    },
    {
      icon: Camera,
      label: "Photo",
      desc: "Upload an image post",
      action: "Photo",
      color: "text-purple-600",
    },
    {
      icon: Tag,
      label: "Offer",
      desc: "Create a promo deal",
      action: "Offer",
      color: "text-pink-600",
    },
    {
      icon: Gift,
      label: "Sale",
      desc: "Launch a sale campaign",
      action: "Sale",
      color: "text-orange-600",
    },
    {
      icon: User,
      label: "Post",
      desc: "Write a short update",
      action: "Post",
      color: "text-green-600",
    },
    {
      icon: Heart,
      label: "Short",
      desc: "Upload a short video",
      action: "Short",
      color: "text-red-500",
    },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 z-50 shadow-lg safe-area-bottom"
    >
      <div className="h-16 max-w-lg mx-auto flex items-center justify-between px-3 relative">
        {navItems.map((item) =>
          item.id === "add" ? (
            <Popover
              key={item.id}
              open={isPopoverOpen}
              onOpenChange={setIsPopoverOpen}
            >
              <PopoverTrigger asChild>
                <button
                  ref={plusButtonRef}
                  className="flex flex-col items-center justify-center w-1/5 relative"
                  onClick={() => setIsPopoverOpen(true)}
                  aria-label="Quick create menu"
                >
                  <div
                    className="bg-gradient-to-tr from-red-500 to-red-400 rounded-full p-3 shadow-md transition-all duration-200 hover:shadow-red-300 active:scale-95 touch-action-manipulation"
                    style={{
                      boxShadow: "0 2px 10px rgba(239, 68, 68, 0.4)",
                      transform: "translateY(-8px)",
                    }}
                  >
                    <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-screen max-w-xs mx-auto p-0 border-none rounded-t-3xl shadow-xl bg-white dark:bg-zinc-900"
                align="center"
                side="top"
                sideOffset={20}
              >
                <div className="px-4 pt-4 pb-2 border-b border-gray-100 dark:border-zinc-800">
                  <div className="w-16 h-1.5 bg-gray-300 dark:bg-zinc-600 rounded-full mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200">
                    Quick Create
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4">
                  {quickActions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(item.action)}
                      className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-xl transition-all duration-200 text-left active:scale-95 touch-action-manipulation"
                    >
                      <div className={`${item.color} p-2 bg-white dark:bg-zinc-700 rounded-lg shadow-sm`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-zinc-800 p-4 flex justify-center">
                  <button
                    onClick={() => setIsPopoverOpen(false)}
                    className="text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 py-2 px-6 rounded-full bg-gray-50 dark:bg-zinc-800 active:scale-95 touch-action-manipulation"
                  >
                    Close
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <button
              key={item.id}
              className="flex flex-col items-center justify-center w-1/5 relative group touch-action-manipulation"
              onClick={() => handleTabClick(item)}
              aria-label={item.label}
              aria-current={activeTab === item.id ? "page" : undefined}
            >
              <div 
                className={cn(
                  "relative transition-transform duration-200 group-hover:scale-110 group-active:scale-95",
                  activeTab === item.id ? "scale-110" : ""
                )}
              >
                <item.icon
                  className={cn(
                    "w-6 h-6 transition-colors",
                    activeTab === item.id
                      ? "text-red-500"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                  )}
                  strokeWidth={activeTab === item.id ? 2.5 : 2}
                />
                {item.badge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-medium rounded-full px-1.5 min-w-[18px] h-4.5 flex items-center justify-center shadow-sm"
                  >
                    {item.badge}
                  </motion.div>
                )}
              </div>

              {item.label && (
                <span
                  className={cn(
                    "text-xs mt-1 font-medium transition-colors",
                    activeTab === item.id
                      ? "text-red-500"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                  )}
                >
                  {item.label}
                </span>
              )}

              {activeTab === item.id && (
                <motion.div
                  className="absolute -bottom-3 w-6 h-1 rounded-full bg-red-500"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </button>
          )
        )}
      </div>
    </motion.div>
  );
}