
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Bell, User, ShoppingCart } from "lucide-react";

// Simulated activity data
const activities = [
  { id: 1, type: "purchase", message: "John D. just purchased iPhone 14 Pro", timeAgo: "2 minutes ago" },
  { id: 2, type: "review", message: "Maria L. gave 5 stars to Wireless Headphones", timeAgo: "5 minutes ago" },
  { id: 3, type: "purchase", message: "Alex T. just purchased Smart Watch", timeAgo: "7 minutes ago" },
  { id: 4, type: "review", message: "Sara M. gave 4 stars to Bluetooth Speaker", timeAgo: "10 minutes ago" },
  { id: 5, type: "purchase", message: "David R. just purchased Gaming Laptop", timeAgo: "15 minutes ago" },
  { id: 6, type: "purchase", message: "Lisa K. just purchased Robot Vacuum", timeAgo: "18 minutes ago" },
  { id: 7, type: "review", message: "Mark B. gave 5 stars to 4K TV", timeAgo: "22 minutes ago" },
  { id: 8, type: "purchase", message: "Emma S. just purchased Coffee Machine", timeAgo: "25 minutes ago" }
];

export default function LiveActivityFeed() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [visible, setVisible] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Show a new activity every 8 seconds
    const interval = setInterval(() => {
      setVisible(false);
      
      // After fade out animation, change the activity
      setTimeout(() => {
        setCurrentActivity((prev) => (prev + 1) % activities.length);
        setVisible(true);
        
        // Show toast notification every 4 activities
        if (currentActivity % 4 === 0) {
          toast({
            title: "New Activity",
            description: activities[(currentActivity + 1) % activities.length].message,
            duration: 3000
          });
        }
      }, 500);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentActivity, toast]);
  
  const activity = activities[currentActivity];
  
  return (
    <div className="bg-white py-2 border-b border-gray-200">
      <div className="container mx-auto px-3">
        <div 
          className={`flex items-center gap-2 text-xs transition-opacity duration-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-gray-100 p-1 rounded-full">
            {activity.type === "purchase" ? (
              <ShoppingCart className="h-3 w-3 text-orange-500" />
            ) : (
              <User className="h-3 w-3 text-blue-500" />
            )}
          </div>
          
          <div className="flex-1">
            <p className="text-gray-700">
              {activity.message}
              <span className="text-[10px] text-gray-500 ml-1">
                {activity.timeAgo}
              </span>
            </p>
          </div>
          
          <Badge 
            variant="outline" 
            className="text-[10px] border-orange-200 text-orange-600 bg-orange-50"
          >
            <Bell className="h-2 w-2 mr-0.5" /> LIVE
          </Badge>
        </div>
      </div>
    </div>
  );
}
