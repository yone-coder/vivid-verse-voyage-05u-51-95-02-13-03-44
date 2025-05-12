
import { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Clock, Newspaper } from "lucide-react";

// News items for the ticker
const newsItems = [
  { id: 1, icon: <AlertCircle className="w-3 h-3 text-white" />, text: "EXTRA 10% OFF WITH CODE: SUMMER10" },
  { id: 2, icon: <TrendingUp className="w-3 h-3 text-white" />, text: "FREE SHIPPING ON ORDERS OVER ¥99" },
  { id: 3, icon: <Clock className="w-3 h-3 text-white" />, text: "LIMITED TIME: BUY 2 GET 1 FREE" },
  { id: 4, icon: <Newspaper className="w-3 h-3 text-white" />, text: "NEW SEASON ITEMS JUST ARRIVED" }
];

export default function NewsTicker() {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [previousNewsIndex, setPreviousNewsIndex] = useState<number | null>(null);
  const newsDuration = 4000;

  // Set up interval for news ticker
  useEffect(() => {
    const newsIntervalRef = setInterval(() => {
      setPreviousNewsIndex(activeNewsIndex);
      setActiveNewsIndex(current => (current + 1) % newsItems.length);
    }, newsDuration);

    return () => {
      clearInterval(newsIntervalRef);
    };
  }, [activeNewsIndex]);

  return (
    <div className="bg-red-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative overflow-hidden h-7">
          {newsItems.map((item, index) => {
            const bgColors = [
              "bg-red-600", "bg-orange-500", "bg-blue-600", "bg-purple-600"
            ];
            const bgColor = bgColors[index % bgColors.length];
            const isActive = index === activeNewsIndex;
            const isPrevious = index === previousNewsIndex;

            return (
              <div
                key={item.id}
                className={`absolute top-0 left-0 w-full h-7 flex items-center px-2 transform transition-transform duration-500 ease-in-out ${bgColor} ${
                  isActive ? "translate-y-0 z-10" : 
                  isPrevious ? "-translate-y-full z-0" : "translate-y-full z-0"
                }`}
              >
                <span className="flex-shrink-0 mr-1">{item.icon}</span>
                <span className="text-xs font-medium text-white truncate">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
