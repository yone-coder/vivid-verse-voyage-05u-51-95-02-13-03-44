
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Users, Star, Clock, Award, ThumbsUp, Check, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: "purchase" | "cart" | "viewing" | "review";
  message: string;
  timestamp: number;
  location?: string;
}

// Demo data - in a real app this would come from a backend API
const generateRandomNotification = (): Notification => {
  const types = ["purchase", "cart", "viewing", "review"] as const;
  const type = types[Math.floor(Math.random() * types.length)];
  const names = ["Alex", "Jamie", "Taylor", "Jordan", "Casey", "Riley", "Sam", "Morgan", "Avery"];
  const locations = ["New York", "Los Angeles", "Chicago", "Dallas", "Miami", "Seattle", "Boston", "London", "Paris"];
  const name = names[Math.floor(Math.random() * names.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  
  let message = "";
  switch (type) {
    case "purchase":
      message = `${name} just purchased this item`;
      break;
    case "cart":
      message = `${name} added this to their cart`;
      break;
    case "viewing":
      message = `${name} is viewing this right now`;
      break;
    case "review":
      const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars
      message = `${name} left a ${rating}-star review`;
      break;
  }
  
  return {
    id: Math.random().toString(36).substring(2, 10),
    type,
    message,
    timestamp: Date.now(),
    location: type !== "viewing" ? location : undefined
  };
};

const LiveActivityNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeVisitors, setActiveVisitors] = useState<number>(0);
  const [showVisitorBadge, setShowVisitorBadge] = useState<boolean>(false);

  useEffect(() => {
    // Initial setup
    setActiveVisitors(Math.floor(Math.random() * 15) + 8); // 8-22 visitors
    
    // Add first notification
    setTimeout(() => {
      const notification = generateRandomNotification();
      setNotifications([notification]);
    }, 3000);
    
    // Set up interval for random notifications
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.4) { // 60% chance of new notification
        const notification = generateRandomNotification();
        setNotifications(prev => [notification, ...prev].slice(0, 3)); // Keep only 3 most recent
      }
    }, 12000); // Every 12 seconds
    
    // Update visitor count periodically
    const visitorInterval = setInterval(() => {
      setActiveVisitors(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(5, prev + change); // Minimum 5 visitors
      });
      setShowVisitorBadge(true);
      setTimeout(() => setShowVisitorBadge(false), 2000);
    }, 20000); // Every 20 seconds
    
    return () => {
      clearInterval(notificationInterval);
      clearInterval(visitorInterval);
    };
  }, []);

  const getIconForType = (type: Notification['type']) => {
    switch (type) {
      case "purchase":
        return <Check className="w-3.5 h-3.5 text-green-500" />;
      case "cart":
        return <ShoppingCart className="w-3.5 h-3.5 text-blue-500" />;
      case "viewing":
        return <Clock className="w-3.5 h-3.5 text-amber-500" />;
      case "review":
        return <Star className="w-3.5 h-3.5 text-yellow-500" />;
    }
  };

  const getBackgroundForType = (type: Notification['type']) => {
    switch (type) {
      case "purchase":
        return "bg-green-50";
      case "cart":
        return "bg-blue-50";
      case "viewing":
        return "bg-amber-50";
      case "review":
        return "bg-yellow-50";
    }
  };

  return (
    <div className="fixed z-20 bottom-36 left-4 flex flex-col space-y-2 pointer-events-none max-w-[250px]">
      {/* Active visitors badge */}
      <div className="flex items-center justify-start">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: showVisitorBadge ? 1.1 : 1, 
            opacity: 1 
          }}
          transition={{
            scale: { duration: 0.3, type: "spring" },
            opacity: { duration: 0.2 }
          }}
          className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium shadow-md border border-purple-100"
        >
          <Users className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
          <span className="text-purple-900">{activeVisitors} people viewing this</span>
        </motion.div>
      </div>

      {/* Activity notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className={`rounded-lg shadow-md border px-3 py-2 ${getBackgroundForType(notification.type)} border-gray-100 backdrop-blur-sm max-w-[250px]`}
            initial={{ opacity: 0, x: -50, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                {getIconForType(notification.type)}
              </div>
              <div className="flex-1 text-xs text-gray-700">
                <p className="font-medium">{notification.message}</p>
                {notification.location && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    from {notification.location}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LiveActivityNotifications;
