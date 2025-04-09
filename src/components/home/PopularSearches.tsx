
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, TrendingUp, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const popularSearches = [
  { id: 1, term: "Wireless Headphones", count: 1243 },
  { id: 2, term: "Smart Watch", count: 986 },
  { id: 3, term: "iPhone Case", count: 879 },
  { id: 4, term: "Gaming Laptop", count: 765 },
  { id: 5, term: "Bluetooth Speaker", count: 654 },
  { id: 6, term: "Drone Camera", count: 543 },
  { id: 7, term: "LED TV", count: 432 },
  { id: 8, term: "Fitness Tracker", count: 321 }
];

export default function PopularSearches() {
  const isMobile = useIsMobile();
  
  return (
    <div className="py-3">
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1.5">
            <Search className="h-3.5 w-3.5 text-gray-500" />
            <h2 className="text-sm font-medium">Popular Searches</h2>
          </div>
          <Link to="/search/trending" className="text-xs text-orange-500 hover:underline flex items-center">
            <TrendingUp className="h-3 w-3 mr-0.5" />
            View All
          </Link>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((item) => (
            <Link 
              key={item.id}
              to={`/search?q=${encodeURIComponent(item.term)}`}
              className="text-xs relative bg-gray-100 hover:bg-gray-200 transition-colors px-2.5 py-1.5 pr-7 rounded-full group"
            >
              {item.term}
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-gray-500 bg-gray-200 group-hover:bg-gray-300 px-1 rounded-full">
                {item.count}
              </span>
            </Link>
          ))}
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-orange-50 rounded-md p-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-orange-500" />
              <span className="text-xs font-medium">Trending Today</span>
            </div>
            <Badge variant="outline" className="text-[8px] border-orange-200 text-orange-600">HOT</Badge>
          </div>
          <div className="bg-blue-50 rounded-md p-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Search className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium">Most Searched</span>
            </div>
            <Badge variant="outline" className="text-[8px] border-blue-200 text-blue-600">TOP</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
