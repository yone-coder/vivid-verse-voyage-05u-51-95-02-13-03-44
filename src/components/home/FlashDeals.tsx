
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
    <div className="py-8 bg-gradient-to-r from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-red-600 mr-3">Flash Deals</h2>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-red-500" />
              <div className="text-sm font-medium">
                <span className="inline-flex items-center justify-center bg-red-500 text-white h-5 w-5 rounded">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                :
                <span className="inline-flex items-center justify-center bg-red-500 text-white h-5 w-5 rounded">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                :
                <span className="inline-flex items-center justify-center bg-red-500 text-white h-5 w-5 rounded">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
          <Link to="#" className="text-sm text-red-500 hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {flashProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-sm font-medium">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2 mb-1 hover:text-red-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-red-500 font-semibold">${product.discountPrice.toFixed(2)}</span>
                    <span className="text-gray-400 text-xs line-through">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex text-amber-400 text-xs">
                      <Star className="h-3 w-3 fill-amber-400" />
                      <span className="ml-1 text-gray-600">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({product.ratingCount})</span>
                  </div>
                  <div className="mt-2">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full" 
                        style={{width: `${100 - (product.stock / (product.stock + product.sold) * 100)}%`}}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {product.sold} sold | {product.stock} left
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
