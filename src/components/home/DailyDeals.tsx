
import React from "react";
import { Link } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const deals = [
  {
    id: 301,
    name: "Premium Wireless Earbuds - Active Noise Cancelling",
    image: "https://placehold.co/400x400/FF6B6B/FFF?text=Earbuds",
    originalPrice: 89.99,
    salePrice: 34.99,
    discount: 61,
    soldQuantity: 856,
    totalQuantity: 1000,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 48) // 48 hours from now
  },
  {
    id: 302,
    name: "Smart Watch - Health & Fitness Tracker",
    image: "https://placehold.co/400x400/4ECDC4/FFF?text=Watch",
    originalPrice: 129.99,
    salePrice: 59.99,
    discount: 54,
    soldQuantity: 723,
    totalQuantity: 800,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 36) // 36 hours from now
  },
  {
    id: 303,
    name: "Bluetooth Speaker - Waterproof Portable",
    image: "https://placehold.co/400x400/FF9A8B/FFF?text=Speaker",
    originalPrice: 79.99,
    salePrice: 29.99,
    discount: 63,
    soldQuantity: 932,
    totalQuantity: 1000,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hours from now
  }
];

export default function DailyDeals() {
  const isMobile = useIsMobile();
  const [timeLeft, setTimeLeft] = React.useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 1,
    hours: 12,
    minutes: 0,
    seconds: 0
  });
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Use first deal's end time for the countdown
      const end = deals[0].endTime;
      const diff = end.getTime() - now.getTime();
      
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="py-3 bg-gradient-to-r from-orange-50 to-pink-50">
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <h2 className="text-sm font-bold text-red-500 mr-2">Daily Deals</h2>
            <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-gray-200">
              <Clock className="h-3 w-3 text-red-500" />
              <span className="text-xs font-medium">Ends in:</span>
              <div className="flex items-center gap-0.5">
                <span className="bg-gray-900 text-white text-[10px] px-1 rounded">
                  {String(timeLeft.days).padStart(2, '0')}d
                </span>
                <span className="text-[10px]">:</span>
                <span className="bg-gray-900 text-white text-[10px] px-1 rounded">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span className="text-[10px]">:</span>
                <span className="bg-gray-900 text-white text-[10px] px-1 rounded">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span className="text-[10px]">:</span>
                <span className="bg-gray-900 text-white text-[10px] px-1 rounded">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
          </div>
          <Link to="/daily-deals" className="text-xs text-red-500 hover:underline flex items-center">
            See All <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {deals.map(deal => (
            <Card key={deal.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <Link to={`/product/${deal.id}`} className="block">
                <div className="grid grid-cols-2">
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={deal.image} 
                      alt={deal.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                      {deal.discount}% OFF
                    </Badge>
                  </div>
                  <div className="p-2 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-medium line-clamp-2 mb-1">
                        {deal.name}
                      </h3>
                      <div className="text-red-500 font-bold text-sm">${deal.salePrice}</div>
                      <div className="text-[10px] text-gray-500 line-through">${deal.originalPrice}</div>
                    </div>
                    
                    <div>
                      <div className="text-[10px] text-gray-500 mb-1">
                        {deal.soldQuantity} sold
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-red-500 h-1.5 rounded-full" 
                          style={{ 
                            width: `${(deal.soldQuantity / deal.totalQuantity) * 100}%` 
                          }}
                        />
                      </div>
                      <div className="text-[10px] text-red-500 mt-1 font-medium">
                        {deal.totalQuantity - deal.soldQuantity} items left
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
