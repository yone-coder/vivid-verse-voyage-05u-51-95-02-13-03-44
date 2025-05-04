
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, ShoppingCart, Heart, Zap, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function IndexBottomNav() {
  const [activeTab, setActiveTab] = useState("home");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
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
      id: "add",
      icon: Plus,
      label: "",
      path: "#",
      badge: null,
      isCenter: true,
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

  const handleAddClick = (e) => {
    e.preventDefault();
    setIsAddDialogOpen(true);
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
        className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 z-50"
      >
        <div className="h-full max-w-md mx-auto flex items-center justify-between px-6 relative">
          {navItems.map((item) => (
            item.isCenter ? (
              <div key={item.id} className="relative flex flex-col items-center">
                <button
                  onClick={handleAddClick}
                  className="absolute -top-5 w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg"
                >
                  <Plus className="w-6 h-6 text-white" />
                </button>
              </div>
            ) : (
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
            )
          ))}
        </div>
        
        {/* Extra space at bottom for iOS safe area */}
        <div className="h-safe-bottom bg-white dark:bg-zinc-900" />
      </motion.div>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold leading-6">Add New Product</h3>
            <p className="text-sm text-gray-500">
              Choose where you want to go to add a new product
            </p>
            <div className="flex flex-col space-y-2">
              <Link 
                to="/admin" 
                className="flex items-center justify-center w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Go to Admin
              </Link>
              <button 
                onClick={() => setIsAddDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
