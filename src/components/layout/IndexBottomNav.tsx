
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Zap,
  Heart,
  User,
  Plus,
  ShoppingCart,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import SignInBanner from "./SignInBanner";
import AuthPage from "@/pages/AuthPage";
import ProductUploadOverlay from "@/components/product/ProductUploadOverlay";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function IndexBottomNav() {
  const [activeTab, setActiveTab] = useState("home");
  const [showNotificationDot, setShowNotificationDot] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const plusButtonRef = useRef(null);
  const [showSignInBanner, setShowSignInBanner] = useState(true);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showProductUpload, setShowProductUpload] = useState(false);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/for-you") {
      setActiveTab("home");
    } else if (location.pathname === "/categories" || location.pathname === "/reels") {
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
      badge: null
    },
    {
      id: "categories",
      icon: Zap,
      label: "Shorts",
      path: "/reels",
      badge: null
    },
    {
      id: "add",
      icon: Plus,
      label: "",
      path: "#",
      badge: null,
      isSpecial: true
    },
    {
      id: "wishlist",
      icon: Heart,
      label: "Wishlist",
      path: "/wishlist",
      badge: 3
    },
    {
      id: "account",
      icon: User,
      label: "Account",
      path: "/account",
      badge: null
    }
  ];

  const dismissNotification = () => {
    setShowNotificationDot(false);
    toast({
      title: "Notifications cleared",
      description: "You're all caught up!"
    });
  };

  const handleTabClick = (item) => {
    setActiveTab(item.id);
    if (item.id === "add") {
      // Open content creation overlay directly
      setShowProductUpload(true);
    } else {
      navigate(item.path);
    }
  };

  const openAuthDialog = () => {
    setShowAuthDialog(true);
  };

  return (
    <>
      {showSignInBanner && <SignInBanner openAuthDialog={openAuthDialog} />}
      
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="w-full sm:max-w-md p-0 h-[100dvh] sm:h-auto sm:max-h-[90vh] overflow-auto data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom">
          <button 
            onClick={() => setShowAuthDialog(false)}
            className="absolute left-4 top-4 z-50 rounded-sm opacity-70 text-white bg-gray-800/40 hover:bg-gray-700/40 hover:opacity-100 transition-opacity p-1"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <AuthPage isOverlay={true} onClose={() => setShowAuthDialog(false)} />
        </DialogContent>
      </Dialog>

      {/* Content Creation Overlay */}
      <ProductUploadOverlay 
        isOpen={showProductUpload} 
        onClose={() => setShowProductUpload(false)}
      />

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 z-40 shadow-lg"
      >
        <div className="h-12 max-w-md mx-auto flex items-center justify-between px-2 relative">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="flex flex-col items-center justify-center w-1/5 relative group"
              onClick={() => handleTabClick(item)}
            >
              <div className="relative">
                <div className={cn(
                  "relative transition-transform duration-200 group-hover:scale-110",
                  item.isSpecial && "bg-gradient-to-tr from-red-500 to-red-400 rounded-full p-2 shadow-md transition-all duration-200 hover:shadow-red-300 hover:scale-110"
                )}
                style={item.isSpecial ? {
                  boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)"
                } : {}}
                >
                  <item.icon
                    className={cn(
                      "transition-colors",
                      item.isSpecial 
                        ? "w-4 h-4 text-white" 
                        : "w-5 h-5",
                      !item.isSpecial && activeTab === item.id
                        ? "text-red-500"
                        : !item.isSpecial ? "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" : ""
                    )}
                    strokeWidth={item.isSpecial ? 2 : 1.5}
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

              {activeTab === item.id && !item.isSpecial && (
                <motion.div
                  className="absolute -bottom-2 w-1 h-1 rounded-full bg-red-500"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="h-safe-bottom bg-white dark:bg-zinc-900" />
      </motion.div>
    </>
  );
}
