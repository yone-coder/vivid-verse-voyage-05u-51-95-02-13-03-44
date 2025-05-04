
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, ShoppingCart, Heart, Zap, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function IndexBottomNav() {
  const [activeTab, setActiveTab] = useState("home");
  
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
      icon: Search,
      label: "Categories",
      path: "/categories", 
      badge: null,
    },
    {
      id: "deals",
      icon: Zap,
      label: "Deals",
      path: "/browse",
      badge: "NEW",
    },
    {
      id: "wishlist",
      icon: Heart,
      label: "Wishlist",
      path: "/wishlist",
      badge: null,
    },
    {
      id: "account",
      icon: User,
      label: "Account",
      path: "/account",
      badge: null,
    },
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 z-50"
    >
      <div className="h-full max-w-md mx-auto flex items-center justify-between px-6">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="flex flex-col items-center justify-center relative"
            onClick={() => setActiveTab(item.id)}
          >
            <div className="relative">
              <motion.div
                className={cn(
                  "absolute -inset-3 rounded-full",
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
            
            <span 
              className={cn(
                "text-[10px] mt-1 font-medium",
                activeTab === item.id 
                  ? "text-red-500" 
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              {item.label}
            </span>
            
            {activeTab === item.id && (
              <motion.div 
                className="absolute -bottom-4 w-1 h-1 rounded-full bg-red-500"
                layoutId="activeIndicator"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
          </Link>
        ))}
      </div>
      
      {/* Extra space at bottom for iOS safe area */}
      <div className="h-safe-bottom bg-white dark:bg-zinc-900" />
    </motion.div>
  );
}
