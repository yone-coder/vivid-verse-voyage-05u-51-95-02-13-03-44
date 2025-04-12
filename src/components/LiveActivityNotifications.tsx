import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Gift, 
  Star, 
  MessageCircle, 
  ShoppingCart, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Users, 
  Award, 
  Percent, 
  Package,
  DollarSign,
  CheckCircle,
  ThumbsUp
} from 'lucide-react';

const LiveActivityNotifications = () => {
  const [streamItems, setStreamItems] = useState([]);
  const containerRef = useRef(null);
  const addItemTimerRef = useRef(null);
  
  const users = [
    { username: "dance_queen22", color: "text-pink-500", location: "New York" },
    { username: "viral_guy", color: "text-blue-500", location: "Los Angeles" },
    { username: "tikfamous", color: "text-purple-500", location: "Miami" },
    { username: "comedy_central", color: "text-green-500", location: "Chicago" },
    { username: "music_lover99", color: "text-yellow-500", location: "Toronto" },
    { username: "trend_setter", color: "text-red-500", location: "London" },
    { username: "cool_vibes", color: "text-indigo-500", location: "Sydney" },
    { username: "just_watching", color: "text-orange-500", location: "Berlin" },
    { username: "first_timer", color: "text-teal-500", location: "Tokyo" },
    { username: "daily_poster", color: "text-cyan-500", location: "Paris" },
    { username: "sarah.j123", color: "text-pink-600", location: "Austin" },
    { username: "mike_outdoors", color: "text-green-600", location: "Denver" },
    { username: "fashionista2025", color: "text-purple-600", location: "Milan" },
    { username: "tech_geek42", color: "text-blue-600", location: "San Francisco" },
    { username: "fitness_freak", color: "text-orange-600", location: "Melbourne" },
    { username: "bookworm_emma", color: "text-yellow-600", location: "Seattle" },
    { username: "coffee_addict", color: "text-brown-500", location: "Portland" },
    { username: "night_owl88", color: "text-indigo-600", location: "Amsterdam" },
    { username: "travel_junkie", color: "text-teal-600", location: "Barcelona" },
    { username: "photo_pro", color: "text-cyan-600", location: "Singapore" }
  ];

  const generateComment = () => {
    const commentTypes = [
      { text: "Do you offer international shipping? 🌍", type: "question" },
      { text: "How long does delivery usually take?", type: "question" },
      { text: "Does this come in other colors?", type: "question" },
      { text: "What size should I get if I'm usually a medium?", type: "question" },
      { text: "Can you bundle this with the other item?", type: "question" },
      { text: "Is there a warranty on this?", type: "question" },
      { text: "Do you have a store location in NYC?", type: "question" },
      { text: "How does this compare to last year's model?", type: "question" },
      
      { text: "OMG I NEED THIS RIGHT NOW!!! 😍", type: "enthusiasm" },
      { text: "This is exactly what I've been looking for!", type: "enthusiasm" },
      { text: "Wow this looks amazing! Definitely buying 🔥", type: "enthusiasm" },
      { text: "Finally restocked! Just ordered 2!", type: "enthusiasm" },
      { text: "The quality looks incredible", type: "enthusiasm" },
      { text: "obsessed with this! gonna get one asap", type: "enthusiasm" },
      
      { text: "I've been using mine for 3 months and it's still perfect", type: "experience" },
      { text: "Got this last week and can confirm it's worth every penny", type: "experience" },
      { text: "My sister has this and I'm so jealous", type: "experience" },
      { text: "Been waiting for the restock since December!", type: "experience" },
      { text: "had a similar product before but this looks much better quality", type: "experience" },
      { text: "used this for my trip to europe and it was so handy", type: "experience" },
      
      { text: "wher can i buy this??", type: "casual" },
      { text: "omw to buy this rn!!", type: "casual" },
      { text: "cant believe i found this, thx for the rec", type: "casual" },
      { text: "is this the same one from ur story last week?", type: "casual" },
      { text: "this or the blue one????? cant decide", type: "casual" },
      { text: "literally perfect! im obsesssed", type: "casual" },
      
      { text: "Any discount codes available?", type: "discount" },
      { text: "Do you have sale coming up soon?", type: "discount" },
      { text: "Any chance of a bundle discount?", type: "discount" },
      { text: "Will this go on sale for Black Friday?", type: "discount" },
      { text: "How much is shipping to Canada?", type: "discount" },
      
      { text: "What material is this made from?", type: "specific" },
      { text: "Is it water resistant?", type: "specific" },
      { text: "How much does it weigh?", type: "specific" },
      { text: "Will this fit in a carry-on bag?", type: "specific" },
      { text: "Does the battery last as long as advertised?", type: "specific" },
      { text: "Does it come with a charger?", type: "specific" }
    ];
    
    return commentTypes[Math.floor(Math.random() * commentTypes.length)];
  };

  const gifts = [
    { name: "Rose", value: "sent a rose 🌹", color: "text-red-500", icon: Heart },
    { name: "Crown", value: "sent a crown 👑", color: "text-yellow-500", icon: Star },
    { name: "Present", value: "sent a gift box 🎁", color: "text-blue-500", icon: Gift },
    { name: "Clap", value: "is clapping 👏", color: "text-green-500", icon: MessageCircle },
    { name: "Heart", value: "sent hearts ❤️❤️", color: "text-pink-500", icon: Heart },
    { name: "Trophy", value: "awarded a trophy 🏆", color: "text-amber-500", icon: Award },
    { name: "Sparkle", value: "sent sparkles ✨", color: "text-yellow-400", icon: Star },
    { name: "Support", value: "supports this 💯", color: "text-blue-400", icon: ThumbsUp }
  ];

  const generateSaleNotification = () => {
    const currentHour = new Date().getHours();
    const isEvening = currentHour >= 18 || currentHour < 6;
    const isWeekend = [0, 6].includes(new Date().getDay());
    
    const notifications = [
      { 
        title: "Flash Sale",
        content: `${Math.floor(Math.random() * 20) + 30}% OFF for the next ${Math.floor(Math.random() * 3) + 1} hours!`,
        color: "text-red-500",
        bgColor: "bg-red-100/10",
        icon: Percent
      },
      { 
        title: isWeekend ? "Weekend Special" : "Weekday Deal",
        content: isWeekend ? "Buy one get one half price this weekend" : "Midweek special: free shipping on all orders",
        color: "text-blue-500",
        bgColor: "bg-blue-100/10",
        icon: ShoppingCart
      },
      { 
        title: "Limited Offer",
        content: `Free shipping on orders over $${[25, 30, 35, 40, 50][Math.floor(Math.random() * 5)]}`,
        color: "text-green-500",
        bgColor: "bg-green-100/10",
        icon: DollarSign
      },
      { 
        title: "Bundle Deal",
        content: `Save ${[20, 25, 30, 35][Math.floor(Math.random() * 4)]}% when you buy the complete set`,
        color: "text-purple-500",
        bgColor: "bg-purple-100/10",
        icon: Package
      },
      { 
        title: isEvening ? "Night Owl Special" : "Early Bird Offer",
        content: isEvening ? "Extra 10% off until midnight" : "Morning discount: 15% off until noon",
        color: "text-indigo-500",
        bgColor: "bg-indigo-100/10",
        icon: Clock
      }
    ];
    
    return notifications[Math.floor(Math.random() * notifications.length)];
  };

  const generateStockNotification = () => {
    const stockLevels = [2, 3, 4, 5, 7, 10];
    const randomStock = stockLevels[Math.floor(Math.random() * stockLevels.length)];
    const itemNames = ["in this size", "in this color", "in total", "in our warehouse", "until next shipment"];
    const randomItemContext = itemNames[Math.floor(Math.random() * itemNames.length)];
    
    const notifications = [
      { 
        title: "Low Stock",
        content: `Only ${randomStock} left ${randomItemContext}!`,
        color: "text-orange-500",
        bgColor: "bg-orange-100/10",
        icon: AlertTriangle
      },
      { 
        title: "Back in Stock",
        content: "Just restocked after being sold out for 2 weeks",
        color: "text-green-500",
        bgColor: "bg-green-100/10", 
        icon: CheckCircle
      },
      { 
        title: "Selling Fast",
        content: `${Math.floor(Math.random() * 15) + 10} sold in the last hour`,
        color: "text-yellow-500",
        bgColor: "bg-yellow-100/10",
        icon: TrendingUp
      },
      { 
        title: "Limited Edition",
        content: "Only 500 made - won't be restocked",
        color: "text-purple-500",
        bgColor: "bg-purple-100/10",
        icon: Award
      },
      { 
        title: "Restock Alert",
        content: "More arriving in 3 days - pre-order now",
        color: "text-blue-500",
        bgColor: "bg-blue-100/10",
        icon: Package
      }
    ];
    
    return notifications[Math.floor(Math.random() * notifications.length)];
  };

  const generateSocialNotification = () => {
    const cities = ["New York", "Los Angeles", "Chicago", "Miami", "Toronto", "London", "Paris", "Berlin", "Sydney", "Tokyo"];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    
    const names = ["Alex", "Sam", "Jamie", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Cameron", "Emma", "James", "Sofia", "Michael", "Olivia"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    
    const viewerCount = Math.floor(Math.random() * 30) + 5;
    
    const notifications = [
      { 
        title: "Live Activity",
        content: `${viewerCount} people viewing this product now`,
        color: "text-blue-500",
        bgColor: "bg-blue-100/10",
        icon: Users
      },
      { 
        title: "Recent Purchase",
        content: `${randomName} from ${randomCity} just bought this`,
        color: "text-green-500",
        bgColor: "bg-green-100/10",
        icon: ShoppingCart
      },
      { 
        title: "Trending Item",
        content: `In our top 5 products this ${Math.random() > 0.5 ? "week" : "month"}`,
        color: "text-pink-500",
        bgColor: "bg-pink-100/10",
        icon: TrendingUp
      },
      { 
        title: "Customer Review",
        content: `New ${Math.random() > 0.3 ? "5" : "4"}-star review: "${Math.random() > 0.5 ? "Love it!" : "Great quality"}"`,
        color: "text-yellow-500", 
        bgColor: "bg-yellow-100/10",
        icon: ThumbsUp
      },
      { 
        title: "Popular Choice",
        content: `${Math.floor(Math.random() * 90) + 100} sold in the past week`,
        color: "text-indigo-500",
        bgColor: "bg-indigo-100/10",
        icon: Award
      }
    ];
    
    return notifications[Math.floor(Math.random() * notifications.length)];
  };

  const generateTimeNotification = () => {
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDay();
    const isEvening = currentHour >= 18;
    const isWeekend = [0, 6].includes(currentDay);
    const timeLeft = Math.floor(Math.random() * 5) + 1;
    const daysLeft = Math.floor(Math.random() * 3) + 1;
    
    const notifications = [
      { 
        title: "Ending Soon",
        content: `Sale ends in ${timeLeft} ${timeLeft === 1 ? "hour" : "hours"}`,
        color: "text-red-500",
        bgColor: "bg-red-100/10",
        icon: Clock
      },
      { 
        title: "Last Chance",
        content: isWeekend ? "Weekend offer ends tonight" : `${isEvening ? "Today's" : "Tomorrow's"} deal expires at midnight`,
        color: "text-orange-500",
        bgColor: "bg-orange-100/10",
        icon: Clock
      },
      { 
        title: "New Arrival",
        content: "Added to our collection within the last 24 hours",
        color: "text-teal-500",
        bgColor: "bg-teal-100/10",
        icon: Package
      },
      { 
        title: "Limited Time",
        content: `Special promotion ends in ${daysLeft} ${daysLeft === 1 ? "day" : "days"}`,
        color: "text-indigo-500",
        bgColor: "bg-indigo-100/10",
        icon: Clock
      },
      { 
        title: "Early Access",
        content: "VIP access before public release tomorrow",
        color: "text-purple-500",
        bgColor: "bg-purple-100/10",
        icon: Users
      }
    ];
    
    return notifications[Math.floor(Math.random() * notifications.length)];
  };

  const createRandomStreamItem = () => {
    const rand = Math.random();
    const randomUser = users[Math.floor(Math.random() * users.length)];
    
    if (rand < 0.4) {
      const randomComment = generateComment();
      
      return {
        id: Date.now() + Math.random(),
        itemType: "comment",
        username: randomUser.username,
        userColor: randomUser.color,
        text: randomComment.text,
        commentType: randomComment.type,
        opacity: 0,
        translateY: -20,
        scale: 0.95
      };
    } 
    else if (rand < 0.5) {
      const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
      
      return {
        id: Date.now() + Math.random(),
        itemType: "gift",
        username: randomUser.username,
        userColor: randomUser.color,
        text: randomGift.value,
        giftColor: randomGift.color,
        giftIcon: randomGift.icon,
        opacity: 0,
        translateY: -20,
        scale: 0.95
      };
    } 
    else {
      const notificationType = Math.random();
      let randomNotif;
      
      if (notificationType < 0.25) {
        randomNotif = generateSaleNotification();
      } else if (notificationType < 0.5) {
        randomNotif = generateStockNotification();
      } else if (notificationType < 0.75) {
        randomNotif = generateSocialNotification();
      } else {
        randomNotif = generateTimeNotification();
      }
      
      return {
        id: Date.now() + Math.random(),
        itemType: "notification",
        title: randomNotif.title,
        content: randomNotif.content,
        color: randomNotif.color,
        bgColor: randomNotif.bgColor,
        icon: randomNotif.icon,
        opacity: 0,
        translateY: -20,
        scale: 0.95
      };
    }
  };

  const addNewStreamItem = () => {
    const newItem = createRandomStreamItem();
    
    setStreamItems(prevItems => {
      let updatedItems = [newItem, ...prevItems];
      
      if (updatedItems.length > 4) {
        updatedItems = updatedItems.slice(0, 4);
      }
      
      return updatedItems;
    });
    
    setTimeout(() => {
      setStreamItems(prevItems => 
        prevItems.map(item => 
          item.id === newItem.id 
            ? { ...item, opacity: 1, translateY: 0, scale: 1 }
            : item
        )
      );
    }, 30);
    
    setTimeout(() => {
      setStreamItems(prevItems => 
        prevItems.map(item => 
          item.id === newItem.id 
            ? { ...item, opacity: 0, translateY: 20 }
            : item
        )
      );
      
      setTimeout(() => {
        setStreamItems(prevItems => 
          prevItems.filter(item => item.id !== newItem.id)
        );
      }, 400);
    }, 4000 + Math.random() * 2000);
  };

  useEffect(() => {
    const initialItemsInterval = setInterval(() => {
      addNewStreamItem();
    }, 300);
    
    setTimeout(() => {
      clearInterval(initialItemsInterval);
      
      const addItem = () => {
        addNewStreamItem();
        
        const nextInterval = 400 + Math.random() * 1400;
        addItemTimerRef.current = setTimeout(addItem, nextInterval);
      };
      
      addItem();
    }, 2000);
    
    return () => {
      clearInterval(initialItemsInterval);
      if (addItemTimerRef.current) {
        clearTimeout(addItemTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [streamItems]);

  const CommentItem = ({ comment }) => {
    let specialStyles = "";
    
    if (comment.commentType === "enthusiasm") {
      specialStyles = "font-semibold";
    } else if (comment.commentType === "question") {
      specialStyles = "italic";
    }
    
    return (
      <div 
        className="mb-2 transition-all duration-300 ease-in-out will-change-transform will-change-opacity"
        style={{ 
          opacity: comment.opacity,
          transform: `translateY(${comment.translateY}px) scale(${comment.scale})`,
          transformOrigin: 'center center'
        }}
      >
        <div className="flex items-center px-3 py-1 bg-black/60 rounded-full backdrop-blur-sm">
          <div className="truncate flex items-center">
            <span className={`font-medium text-xs ${comment.userColor}`}>
              {comment.username}:
            </span>
            <span className={`text-gray-200 text-xs ml-1 ${specialStyles}`}>
              {comment.text}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const GiftItem = ({ gift }) => {
    const IconComponent = gift.giftIcon;
    
    return (
      <div 
        className="mb-2 transition-all duration-300 ease-in-out will-change-transform will-change-opacity"
        style={{ 
          opacity: gift.opacity,
          transform: `translateY(${gift.translateY}px) scale(${gift.scale})`,
          transformOrigin: 'center center'
        }}
      >
        <div className="flex items-center px-3 py-1 bg-black/60 rounded-full backdrop-blur-sm">
          {IconComponent && (
            <IconComponent size={14} className={`${gift.giftColor} animate-pulse`} />
          )}
          <div className="truncate flex items-center ml-1">
            <span className={`font-medium text-xs ${gift.userColor}`}>
              {gift.username}
            </span>
            <span className="text-gray-200 text-xs ml-1">
              {gift.text}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const NotificationItem = ({ notification }) => {
    const IconComponent = notification.icon;
    
    return (
      <div 
        className="mb-2 transition-all duration-300 ease-in-out will-change-transform will-change-opacity"
        style={{ 
          opacity: notification.opacity,
          transform: `translateY(${notification.translateY}px) scale(${notification.scale})`,
          transformOrigin: 'center center'
        }}
      >
        <div className={`flex items-center px-3 py-1 bg-black/70 rounded-full backdrop-blur-sm border-l-2 ${notification.color.replace('text', 'border')}`}>
          <IconComponent size={14} className={`${notification.color}`} />
          <div className="ml-2 truncate">
            {notification.title && (
              <span className={`text-xs font-medium ${notification.color} mr-1`}>
                {notification.title}:
              </span>
            )}
            <span className="text-gray-200 text-xs">
              {notification.content}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="absolute z-20 bottom-20 left-2 flex flex-col-reverse space-y-reverse space-y-2 pointer-events-none max-w-[250px]">
      <div 
        ref={containerRef}
        className="overflow-y-auto max-h-[300px] flex flex-col-reverse"
      >
        {streamItems.map(item => (
          <div key={item.id}>
            {item.itemType === "comment" && (
              <CommentItem comment={item} />
            )}
            {item.itemType === "gift" && (
              <GiftItem gift={item} />
            )}
            {item.itemType === "notification" && (
              <NotificationItem notification={item} />
            )}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes float-down {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LiveActivityNotifications;
