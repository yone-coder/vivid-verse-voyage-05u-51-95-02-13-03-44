
import React, { useEffect, useState } from 'react';
import { ShoppingCart, Users, Heart, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const notifications = [
  { id: 1, message: "Someone from Munich just purchased this item", icon: ShoppingCart },
  { id: 2, message: "56 people are viewing this right now", icon: Eye },
  { id: 3, message: "This item was added to 8 carts in the last hour", icon: ShoppingCart },
  { id: 4, message: "12 people from your area bought this recently", icon: Users },
  { id: 5, message: "This item was added to 15 wishlists today", icon: Heart }
];

const LiveActivityNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const notification = notifications[currentNotification];

  return (
    <div
      style={{
        position: 'absolute',
        right: '12px',
        top: '120px',
        width: '240px',
        zIndex: 10
      }}
      className="hidden md:block"
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-3",
              "shadow-lg"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                {React.createElement(notification.icon, { 
                  className: "w-4 h-4 text-primary" 
                })}
              </div>
              <p className="text-xs text-gray-700">{notification.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveActivityNotifications;
