
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const flashProducts = [
  {
    id: 101,
    name: "Wireless Earbuds with Noise Cancellation",
    image: "https://placehold.co/300x300/6D28D9/FFF?text=Earbuds",
    price: 79.99,
    discountPrice: 39.99,
    rating: 4.7,
    ratingCount: 235,
    sold: 1253,
    stock: 45
  },
  {
    id: 102,
    name: "Smart Watch with Heart Rate Monitor",
    image: "https://placehold.co/300x300/2563EB/FFF?text=Watch",
    price: 149.99,
    discountPrice: 89.99,
    rating: 4.5,
    ratingCount: 412,
    sold: 982,
    stock: 28
  },
  {
    id: 103,
    name: "Portable Bluetooth Speaker",
    image: "https://placehold.co/300x300/DC2626/FFF?text=Speaker",
    price: 59.99,
    discountPrice: 29.99,
    rating: 4.8,
    ratingCount: 325,
    sold: 754,
    stock: 12
  },
  {
    id: 104,
    name: "10000mAh Power Bank",
    image: "https://placehold.co/300x300/059669/FFF?text=PowerBank",
    price: 49.99,
    discountPrice: 24.99,
    rating: 4.6,
    ratingCount: 186,
    sold: 536,
    stock: 38
  },
  {
    id: 105,
    name: "Wireless Gaming Mouse",
    image: "https://placehold.co/300x300/D946EF/FFF?text=Mouse",
    price: 39.99,
    discountPrice: 19.99,
    rating: 4.5,
    ratingCount: 315,
    sold: 892,
    stock: 31
  }
];

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 30,
    seconds: 0
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        // Reset timer when it reaches 0
        return { hours: 5, minutes: 30, seconds: 0 };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="py-3 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <h2 className="text-lg font-bold text-orange-500 mr-3">Flash Deals</h2>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-orange-500" />
              <div className="text-xs font-medium">
                <span className="inline-flex items-center justify-center bg-gray-800 text-white h-5 w-5 rounded">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                :
                <span className="inline-flex items-center justify-center bg-gray-800 text-white h-5 w-5 rounded">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                :
                <span className="inline-flex items-center justify-center bg-gray-800 text-white h-5 w-5 rounded">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
          <Link to="#" className="text-sm text-orange-500 hover:underline">View All</Link>
        </div>
        
        <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-1 px-1">
          {flashProducts.map((product) => (
            <div key={product.id} className="w-[130px] flex-shrink-0">
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-md mb-1.5">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-0 left-0 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-br-md font-medium">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </div>
                </div>
                <div>
                  <div className="text-orange-500 font-semibold text-sm">US ${product.discountPrice.toFixed(2)}</div>
                  <div className="text-xs text-gray-500 line-through">US ${product.price.toFixed(2)}</div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mt-1.5 mb-1">
                    <div 
                      className="h-full bg-orange-500 rounded-full" 
                      style={{width: `${100 - (product.stock / (product.stock + product.sold) * 100)}%`}}
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
