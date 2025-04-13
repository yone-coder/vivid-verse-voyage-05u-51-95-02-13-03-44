
import React, { useState } from 'react';
import { Star, User, ShoppingBag, ChevronRight, Award, ThumbsUp } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const EnhancedRating = () => {
  // Sample data
  const rating = 4.8;
  const reviews = 2543;
  const sold = "5.0k+";
  const [showStats, setShowStats] = useState(false);
  
  // More detailed rating stats
  const ratingBreakdown = [
    { stars: 5, percentage: 78, count: 1983 },
    { stars: 4, percentage: 15, count: 381 },
    { stars: 3, percentage: 4, count: 102 },
    { stars: 2, percentage: 2, count: 51 },
    { stars: 1, percentage: 1, count: 26 }
  ];
  
  const toggleStats = () => {
    setShowStats(!showStats);
  };
  
  const renderStars = (score) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score - fullStars >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star 
            key={i} 
            size={16} 
            className="text-yellow-400 fill-yellow-400" 
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star size={16} className="text-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star 
            key={i} 
            size={16} 
            className="text-gray-300" 
          />
        );
      }
    }
    
    return stars;
  };

  return (
    <div className="w-full px-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {renderStars(rating)}
          </div>
          <span className="font-bold text-lg text-gray-800">{rating}</span>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm text-blue-600 underline underline-offset-2"
                  onClick={toggleStats}
                >
                  {reviews} Reviews
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Click to view rating details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <span className="text-gray-300">|</span>
          
          <div className="flex items-center text-gray-600">
            <ShoppingBag className="w-4 h-4 mr-1" />
            <span className="font-medium">{sold} Sold</span>
          </div>
          
          <Badge className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-none">
            Top Seller
          </Badge>
        </div>
        
        <Button variant="ghost" size="sm" className="text-blue-600 p-1 h-auto">
          <span className="text-xs mr-1">All Reviews</span>
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
      
      {showStats && (
        <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200 animate-in fade-in-50 duration-300">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Rating Breakdown</h4>
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={toggleStats}>
              Hide
            </Button>
          </div>
          
          <div className="space-y-1.5">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-2 text-sm">
                <div className="flex items-center w-12">
                  <span className="mr-1">{item.stars}</span>
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                </div>
                <Progress value={item.percentage} className="h-2 w-full max-w-[180px]" />
                <span className="text-xs text-gray-500 w-10">{item.percentage}%</span>
                <span className="text-xs text-gray-500">({item.count})</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-3 text-xs text-gray-600">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              <span>{Math.round(reviews * 0.22)} verified purchases</span>
            </div>
            <div className="flex items-center">
              <ThumbsUp className="h-3 w-3 mr-1" />
              <span>94% recommend this product</span>
            </div>
            <div className="flex items-center">
              <Award className="h-3 w-3 mr-1" />
              <span>Top 5% in category</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedRating;
