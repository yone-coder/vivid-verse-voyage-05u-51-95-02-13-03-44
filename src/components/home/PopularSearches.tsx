
import React, { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, TrendingUp, ArrowUp, Tags, Bookmark, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const popularSearches = [
  { id: 1, term: "Wireless Headphones", count: 1243 },
  { id: 2, term: "Smart Watch", count: 986 },
  { id: 3, term: "iPhone Case", count: 879 },
  { id: 4, term: "Gaming Laptop", count: 765 },
  { id: 5, term: "Bluetooth Speaker", count: 654 },
  { id: 6, term: "Drone Camera", count: 543 },
  { id: 7, term: "LED TV", count: 432 },
  { id: 8, term: "Fitness Tracker", count: 321 },
  { id: 9, term: "Power Bank", count: 298 },
  { id: 10, term: "Smart Home Hub", count: 276 },
  { id: 11, term: "Mechanical Keyboard", count: 254 },
  { id: 12, term: "Wireless Mouse", count: 243 },
  { id: 13, term: "USB-C Hub", count: 231 },
  { id: 14, term: "Monitor Stand", count: 219 },
  { id: 15, term: "Desk Lamp", count: 208 },
  { id: 16, term: "Webcam Cover", count: 197 },
  { id: 17, term: "Laptop Cooling Pad", count: 185 },
  { id: 18, term: "Cable Organizer", count: 176 },
  { id: 19, term: "Wireless Charger", count: 165 },
  { id: 20, term: "Phone Tripod", count: 154 }
];

export default function PopularSearches() {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Group searches into rows for display
  const rows = [
    popularSearches.slice(0, 5),    // Row 1: items 0-4
    popularSearches.slice(5, 10),   // Row 2: items 5-9
    popularSearches.slice(10, 15),  // Row 3: items 10-14
    popularSearches.slice(15, 20)   // Row 4: items 15-19
  ];
  
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
        
        <ScrollArea className="w-full">
          <div className="space-y-2">
            {rows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="flex gap-2">
                {row.map((item) => (
                  <Link 
                    key={item.id}
                    to={`/search?q=${encodeURIComponent(item.term)}`}
                    className="text-xs flex-none relative bg-gray-100 hover:bg-gray-200 transition-colors px-2.5 py-1.5 pr-7 rounded-full group"
                  >
                    {item.term}
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-gray-500 bg-gray-200 group-hover:bg-gray-300 px-1 rounded-full">
                      {item.count}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        
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
              <Tag className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium">Most Searched</span>
            </div>
            <Badge variant="outline" className="text-[8px] border-blue-200 text-blue-600">TOP</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
