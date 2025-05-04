import React, { useState } from "react";
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
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function IndexBottomNav() {
  const [activeTab, setActiveTab] = useState("home");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showNotificationDot, setShowNotificationDot] = useState(true);
  const location = useLocation();
  const { toast } = useToast();

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

  const handleAddClick = (e) => {
    e.preventDefault();
    setIsAddDialogOpen(true);
  };

  const dismissNotification = () => {
    setShowNotificationDot(false);
    toast({
      title: "Notifications cleared",
      description: "You're all caught up!",
    });
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
        <div className="h-16 max-w-md mx-auto flex items-center justify-between px-2 relative">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="flex flex-col items-center justify-center w-1/5 relative"
              onClick={(e) => {
                if (item.id === "add") {
                  handleAddClick(e);
                } else {
                  setActiveTab(item.id);
                }
              }}
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
                  {item.isSpecial ? (
                    <div className="bg-gradient-to-tr from-red-500 to-red-400 rounded-full p-2 shadow-md"
                      style={{
                        boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)"
                      }}>
                      <Plus className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                  ) : (
                    <item.icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        activeTab === item.id 
                          ? "text-red-500" 
                          : "text-gray-500 dark:text-gray-400"
                      )}
                    />
                  )}

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
                    "text-[10px] mt-1 font-medium",
                    item.isSpecial 
                      ? "text-red-500"
                      : activeTab === item.id 
                        ? "text-red-500" 
                        : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {item.label}
                </span>
              )}

              {activeTab === item.id && !item.isSpecial && (
                <motion.div 
                  className="absolute -bottom-3 w-1 h-1 rounded-full bg-red-500"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Quick actions drawer pull indicator */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gray-300 dark:bg-gray-700 rounded-full opacity-80" />

        {/* Extra space at bottom for iOS safe area */}
        <div className="h-safe-bottom bg-white dark:bg-zinc-900" />
      </motion.div>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold leading-6">Add New Product</h3>
            <p className="text-sm text-gray-500">
              Choose what you want to do
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link 
                to="/admin" 
                className="flex flex-col items-center justify-center p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                onClick={() => setIsAddDialogOpen(false)}
              >
                <Plus className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Add Product</span>
              </Link>

              <Link 
                to="/categories" 
                className="flex flex-col items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-500 rounded-lg transition-colors"
                onClick={() => setIsAddDialogOpen(false)}
              >
                <Compass className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Browse Categories</span>
              </Link>

              <Link 
                to="/wishlist" 
                className="flex flex-col items-center justify-center p-3 bg-purple-50 hover:bg-purple-100 text-purple-500 rounded-lg transition-colors"
                onClick={() => setIsAddDialogOpen(false)}
              >
                <Heart className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">My Wishlist</span>
              </Link>

              <button 
                onClick={() => {
                  setIsAddDialogOpen(false);
                  toast({
                    title: "Coming Soon",
                    description: "This feature will be available in the next update!",
                  });
                }}
                className="flex flex-col items-center justify-center p-3 bg-amber-50 hover:bg-amber-100 text-amber-500 rounded-lg transition-colors"
              >
                <Bell className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Notifications</span>
              </button>
            </div>
            <button 
              onClick={() => setIsAddDialogOpen(false)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors mt-2"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}