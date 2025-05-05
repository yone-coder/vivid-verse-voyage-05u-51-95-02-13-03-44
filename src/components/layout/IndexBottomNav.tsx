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
  Video,
  PencilLine,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function IndexBottomNav() {
  const [activeTab, setActiveTab] = useState("home");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/for-you") {
      setActiveTab("home");
    } else if (location.pathname === "/shorts") {
      setActiveTab("shorts");
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
      id: "shorts",
      icon: Search,
      label: "Shorts",
      path: "/shorts",
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
      title: `Opening ${action}`,
      description: `Redirecting to create a new ${action.toLowerCase()}...`,
    });
    setTimeout(() => {
      if (action === "Product") navigate("/admin");
    }, 500);
  };

  const quickActions = [
    { icon: ShoppingCart, label: "Product", action: "Product", color: "text-blue-600", badge: "HOT" },
    { icon: Camera, label: "Photo", action: "Photo", color: "text-purple-600" },
    { icon: Tag, label: "Offer", action: "Offer", color: "text-pink-600", badge: "NEW" },
    { icon: Gift, label: "Sale", action: "Sale", color: "text-orange-600" },
    { icon: Video, label: "Video", action: "Video", color: "text-emerald-600" },
    { icon: PencilLine, label: "Post", action: "Post", color: "text-yellow-600" },
    { icon: Upload, label: "Story", action: "Story", color: "text-cyan-600" },
  ];

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 z-50 shadow-lg"
      >
        <div className="h-12 max-w-md mx-auto flex items-center justify-between px-2 relative">
          {navItems.map((item) =>
            item.id === "add" ? (
              <Popover
                key={item.id}
                open={isPopoverOpen}
                onOpenChange={setIsPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <button
                    className="flex flex-col items-center justify-center w-1/5 relative"
                    onClick={() => setIsPopoverOpen(true)}
                  >
                    <div
                      className="bg-gradient-to-tr from-red-500 to-red-400 rounded-full p-2 shadow-md hover:scale-110 transition-all"
                      style={{ boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)" }}
                    >
                      <Plus className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent
  className="w-full max-w-md mx-auto p-0 border-none rounded-t-2xl shadow-xl bg-white dark:bg-zinc-900"
  align="center"
  side="top"
  sideOffset={0}
>
  <div className="pt-3 px-4 border-b border-gray-200 dark:border-zinc-800">
    <div className="w-12 h-1.5 bg-gray-300 dark:bg-zinc-600 rounded-full mx-auto mb-3" />
    <h3 className="text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
      Quick Create
    </h3>
  </div>

  <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
    {quickActions.map((item, idx) => (
      <button
        key={idx}
        onClick={() => handleQuickAction(item.action)}
        className="w-full flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all"
      >
        <div
          className={`${item.color} w-10 h-10 flex items-center justify-center rounded-full bg-opacity-10`}
        >
          <item.icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {item.label}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {item.desc}
          </div>
        </div>
      </button>
    ))}
  </div>

  <div className="border-t border-gray-200 dark:border-zinc-800 p-3 flex justify-center">
    <button
      onClick={() => setIsPopoverOpen(false)}
      className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    >
      Close
    </button>
  </div>
</PopoverContent>
              </Popover>
            ) : (
              <button
                key={item.id}
                className="flex flex-col items-center justify-center w-1/5 relative group"
                onClick={() => {
                  setActiveTab(item.id);
                  navigate(item.path);
                }}
              >
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
                {item.label && (
                  <span
                    className={cn(
                      "text-[10px] mt-0.5 font-medium",
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
                    className="absolute -bottom-2 w-1 h-1 rounded-full bg-red-500"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </button>
            )
          )}
        </div>
        <div className="h-safe-bottom bg-white dark:bg-zinc-900" />
      </motion.div>
    </>
  );
}