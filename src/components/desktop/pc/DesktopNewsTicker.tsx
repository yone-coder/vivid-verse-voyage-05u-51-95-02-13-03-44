
import { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Clock, Newspaper } from "lucide-react";

const newsItems = [
  { id: 1, icon: <AlertCircle className="w-4 h-4 text-white" />, text: "EXTRA 15% OFF WITH CODE: DESKTOP15" },
  { id: 2, icon: <TrendingUp className="w-4 h-4 text-white" />, text: "FREE SHIPPING ON ORDERS OVER $199" },
  { id: 3, icon: <Clock className="w-4 h-4 text-white" />, text: "LIMITED TIME: BUY 3 GET 1 FREE" },
  { id: 4, icon: <Newspaper className="w-4 h-4 text-white" />, text: "NEW SEASON COLLECTION JUST ARRIVED" }
];

export default function DesktopNewsTicker() {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const newsDuration = 4000;

  useEffect(() => {
    const newsInterval = setInterval(() => {
      setActiveNewsIndex(current => (current + 1) % newsItems.length);
    }, newsDuration);

    return () => clearInterval(newsInterval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 mt-4 rounded-lg overflow-hidden">
      <div className="relative h-12">
        {newsItems.map((item, index) => {
          const isActive = index === activeNewsIndex;
          
          return (
            <div
              key={item.id}
              className={`absolute top-0 left-0 w-full h-12 flex items-center justify-center px-4 transform transition-transform duration-500 ease-in-out ${
                isActive ? "translate-y-0 z-10" : "translate-y-full z-0"
              }`}
            >
              <span className="flex-shrink-0 mr-3">{item.icon}</span>
              <span className="text-sm font-medium text-white text-center">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
