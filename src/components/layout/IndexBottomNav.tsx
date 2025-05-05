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
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Camera,
      label: "Photo",
      desc: "Upload an image post",
      action: "Photo",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: Tag,
      label: "Offer",
      desc: "Create a promo deal",
      action: "Offer",
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
    },
    {
      icon: Gift,
      label: "Sale",
      desc: "Launch a sale campaign",
      action: "Sale",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      icon: User,
      label: "Post",
      desc: "Write a short update",
      action: "Post",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: Heart,
      label: "Short",
      desc: "Upload a short video",
      action: "Short",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 z-50 shadow-lg"
    >
      <div className="h-16 max-w-md mx-auto flex items-center justify-between px-3 relative">
        {navItems.map((item) =>
          item.id === "add" ? (
            <Popover
              key={item.id}
              open={isPopoverOpen}
              onOpenChange={setIsPopoverOpen}
            >
              <PopoverTrigger asChild>
                <motion.button
                  ref={plusButtonRef}
                  className="flex flex-col items-center justify-center w-1/5 pt-1 relative"
                  onClick={() => setIsPopoverOpen(true)}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-gradient-to-tr from-red-500 to-red-400 rounded-full p-3 shadow-md"
                    style={{
                      boxShadow: "0 3px 10px rgba(239, 68, 68, 0.4)",
                    }}
                  >
                    <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </motion.div>
                </motion.button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full max-w-sm mx-auto p-0 border border-gray-200 dark:border-zinc-700 rounded-t-2xl shadow-xl bg-white dark:bg-zinc-900"
                align="center"
                side="top"
                sideOffset={12}
              >
                <div className="px-4 pt-3 pb-2 border-b border-gray-100 dark:border-zinc-800">
                  <div className="w-12 h-1.5 bg-gray-300 dark:bg-zinc-600 rounded-full mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    Create New
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4">
                  {quickActions.map((item, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleQuickAction(item.action)}
                      className="flex items-start gap-3 p-3 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-all duration-200 text-left"
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className={`${item.bgColor} p-2 rounded-lg`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-zinc-800 p-3 flex justify-center">
                  <motion.button
                    onClick={() => setIsPopoverOpen(false)}
                    className="w-full py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-50 dark:bg-zinc-800 rounded-lg"
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <motion.button
              key={item.id}
              className="flex flex-col items-center justify-center w-1/5 py-1 relative group touch-action-manipulation"
              onClick={() => handleTabClick(item)}
              whileTap={{ scale: 0.95 }}
              aria-label={item.label}
            >
              <div className="relative">
                {activeTab === item.id ? (
                  <motion.div
                    className="absolute inset-0 -m-1 p-1 bg-red-50 dark:bg-red-900/20 rounded-lg"
                    layoutId="activeTabBackground"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                ) : null}
                <div className="relative z-10">
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      activeTab === item.id
                        ? "text-red-500"
                        : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                    )}
                    strokeWidth={activeTab === item.id ? 2.2 : 1.8}
                  />
                  {item.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-medium rounded-full min-w-[16px] h-4 flex items-center justify-center px-1"
                    >
                      {item.badge}
                    </motion.div>
                  )}
                </div>
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
                  className="absolute -bottom-1 w-10 h-0.5 rounded-full bg-red-500"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </motion.button>
          )
        )}
      </div>

      <div className="h-safe-bottom bg-white dark:bg-zinc-900" />
    </motion.div>
  );
}