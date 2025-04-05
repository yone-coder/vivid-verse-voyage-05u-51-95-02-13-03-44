
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Users, Star, Clock, Award, ThumbsUp, Check, ChevronRight, AlertTriangle, Gift, TrendingUp, Heart, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: "purchase" | "cart" | "viewing" | "review" | "scarcity" | "rating" | "testimonial" | "unique";
  message: string;
  timestamp: number;
  location?: string;
}

// Demo data - in a real app this would come from a backend API
const generateRandomNotification = (): Notification => {
  const types = ["purchase", "cart", "viewing", "review", "scarcity", "rating", "testimonial", "unique"] as const;
  const type = types[Math.floor(Math.random() * types.length)];
  const names = ["Alex", "Jamie", "Taylor", "Jordan", "Casey", "Riley", "Sam", "Morgan", "Avery", "Quinn", "Blake", "Harper"];
  const locations = ["New York", "Los Angeles", "Chicago", "Dallas", "Miami", "Seattle", "Boston", "London", "Paris", "Tokyo", "Berlin", "Sydney"];
  const name = names[Math.floor(Math.random() * names.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  
  // Social proof messages
  const socialProofMessages = [
    `${name} just purchased this item`,
    `${name} from ${location} just purchased this`,
    `15 people bought this in the last hour!`,
    `Someone from ${location} just purchased this.`,
    `Back in stock! Limited quantity available.`,
    `Hot right now! Selling 5x faster than usual.`
  ];
  
  // Scarcity messages
  const scarcityMessages = [
    `Only 2 left in stock — selling fast!`,
    `Deal ends soon — don't miss out!`,
    `This size is almost gone!`,
    `Next restock expected in 2 weeks.`,
    `This item was sold out last week. Get it while you can!`
  ];
  
  // Viewing messages
  const viewingMessages = [
    `${name} is viewing this right now`,
    `32 people are currently viewing this item.`,
    `You've been looking at this for a while… ready to grab it?`,
    `This item is trending right now!`,
    `High demand! Many people are looking at this.`
  ];
  
  // Review messages
  const reviewMessages = [
    `${name} left a ${Math.floor(Math.random() * 2) + 4}-star review`,
    `"Exactly what I needed!" – ${name} T.`,
    `Over 3,000 people love this product.`,
    `Top-rated in its category.`,
    `"Fast shipping and great quality!" – Verified Buyer`
  ];
  
  // Rating messages
  const ratingMessages = [
    `Rated 4.9/5 by 870 customers.`,
    `Customers rate this 4.8 out of 5 stars!`,
    `95% of customers recommend this product.`,
    `Our best-rated item this month!`
  ];
  
  // Testimonial messages
  const testimonialMessages = [
    `"Love it, totally worth it!" - ${name} from ${location}`,
    `"Perfect gift idea!" - Recent Customer`,
    `"Exceeded my expectations!" - Verified Purchase`,
    `"Will definitely buy again!" - Loyal Customer`
  ];
  
  // Unique/fun messages
  const uniqueMessages = [
    `This item completes your vibe. Just sayin'.`,
    `Seen on TikTok – going viral now!`,
    `Buy now and get a surprise bonus!`,
    `Cart's waiting… but this product won't!`,
    `This pairs perfectly with your previous purchases.`
  ];
  
  let message = "";
  switch (type) {
    case "purchase":
      message = socialProofMessages[Math.floor(Math.random() * socialProofMessages.length)];
      break;
    case "cart":
      message = `${name} added this to their cart`;
      break;
    case "viewing":
      message = viewingMessages[Math.floor(Math.random() * viewingMessages.length)];
      break;
    case "review":
      message = reviewMessages[Math.floor(Math.random() * reviewMessages.length)];
      break;
    case "scarcity":
      message = scarcityMessages[Math.floor(Math.random() * scarcityMessages.length)];
      break;
    case "rating":
      message = ratingMessages[Math.floor(Math.random() * ratingMessages.length)];
      break;
    case "testimonial":
      message = testimonialMessages[Math.floor(Math.random() * testimonialMessages.length)];
      break;
    case "unique":
      message = uniqueMessages[Math.floor(Math.random() * uniqueMessages.length)];
      break;
  }
  
  return {
    id: Math.random().toString(36).substring(2, 10),
    type,
    message,
    timestamp: Date.now(),
    location: ["purchase", "review", "testimonial"].includes(type) ? location : undefined
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
        return <Eye className="w-3.5 h-3.5 text-amber-500" />;
      case "review":
        return <Star className="w-3.5 h-3.5 text-yellow-500" />;
      case "scarcity":
        return <AlertTriangle className="w-3.5 h-3.5 text-red-500" />;
      case "rating":
        return <Award className="w-3.5 h-3.5 text-purple-500" />;
      case "testimonial":
        return <ThumbsUp className="w-3.5 h-3.5 text-cyan-500" />;
      case "unique":
        return <Gift className="w-3.5 h-3.5 text-pink-500" />;
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
      case "scarcity":
        return "bg-red-50";
      case "rating":
        return "bg-purple-50";
      case "testimonial":
        return "bg-cyan-50";
      case "unique":
        return "bg-pink-50";
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
                {notification.location && !notification.message.includes(notification.location) && (
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
