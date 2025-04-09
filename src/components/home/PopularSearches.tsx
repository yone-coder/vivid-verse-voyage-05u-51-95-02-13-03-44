
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const popularSearches = [
  { id: 1, term: "Wireless Headphones" },
  { id: 2, term: "Smart Watch" },
  { id: 3, term: "iPhone Case" },
  { id: 4, term: "Gaming Laptop" },
  { id: 5, term: "Bluetooth Speaker" },
  { id: 6, term: "Drone Camera" },
  { id: 7, term: "LED TV" },
  { id: 8, term: "Fitness Tracker" }
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
        </div>
        
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((item) => (
            <Link 
              key={item.id}
              to={`/search?q=${encodeURIComponent(item.term)}`}
              className="text-xs bg-gray-100 hover:bg-gray-200 transition-colors px-2.5 py-1.5 rounded-full"
            >
              {item.term}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
