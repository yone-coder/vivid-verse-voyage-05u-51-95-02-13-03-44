
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight, Star, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

const localRecommendations = [
  {
    id: 401,
    name: "Local Phone Repair Shop - Screen Protector",
    image: "https://placehold.co/300x300/22C55E/FFF?text=Screen",
    price: 12.99,
    distance: "0.5 miles away",
    deliveryTime: "30 min",
    rating: 4.8,
    ratingCount: 124,
    freeShipping: true
  },
  {
    id: 402,
    name: "Tech Accessories Store - USB-C Fast Charging Cable",
    image: "https://placehold.co/300x300/3B82F6/FFF?text=Cable",
    price: 9.99,
    distance: "1.2 miles away",
    deliveryTime: "45 min",
    rating: 4.6,
    ratingCount: 89,
    freeShipping: false
  },
  {
    id: 403,
    name: "Electronics Outlet - Wireless Mouse",
    image: "https://placehold.co/300x300/8B5CF6/FFF?text=Mouse",
    price: 15.99,
    distance: "1.8 miles away",
    deliveryTime: "50 min",
    rating: 4.7,
    ratingCount: 156,
    freeShipping: true
  },
  {
    id: 404,
    name: "Phone Case Kiosk - Premium Case",
    image: "https://placehold.co/300x300/EC4899/FFF?text=Case",
    price: 14.99,
    distance: "0.8 miles away",
    deliveryTime: "35 min",
    rating: 4.4,
    ratingCount: 78,
    freeShipping: true
  }
];

export default function LocalRecommendations() {
  const isMobile = useIsMobile();
  
  return (
    <div className="py-3 bg-white">
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-orange-500" />
            <h2 className="text-sm font-bold">Near You</h2>
          </div>
          <Link to="/local-recommendations" className="text-xs text-orange-500 hover:underline flex items-center">
            More <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {localRecommendations.map(item => (
            <Card key={item.id} className="min-w-[180px] max-w-[180px] border hover:shadow-sm transition-shadow">
              <Link to={`/product/${item.id}`}>
                <div className="p-2">
                  <div className="aspect-square rounded-md overflow-hidden mb-2 relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {item.freeShipping && (
                      <Badge className="absolute bottom-1 left-1 text-[9px] bg-green-500 hover:bg-green-600">
                        Free Shipping
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-medium text-xs line-clamp-2 mb-1">
                    {item.name}
                  </h3>
                  <div className="text-orange-500 font-semibold text-xs">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-2.5 w-2.5 fill-orange-400 text-orange-400" />
                    <span className="text-[10px] text-gray-700">
                      {item.rating} ({item.ratingCount})
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1.5">
                    <div className="text-[10px] text-gray-500 flex items-center">
                      <MapPin className="h-2.5 w-2.5 mr-0.5" />
                      {item.distance}
                    </div>
                    <div className="text-[10px] bg-orange-100 text-orange-700 px-1 rounded flex items-center">
                      <Clock className="h-2 w-2 mr-0.5" />
                      {item.deliveryTime}
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
