
import React from 'react';
import { Star } from 'lucide-react';

const EnhancedRating = () => {
  // Sample data
  const rating = 4.8;
  const reviews = 2543;
  const sold = "5.0k+";
  
  const renderStars = (score) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score - fullStars >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star 
            key={i} 
            size={14} 
            className="text-yellow-400 fill-yellow-400" 
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <Star size={14} className="absolute top-0 right-0 text-yellow-400 fill-gray-200 overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </div>
        );
      } else {
        stars.push(
          <Star 
            key={i} 
            size={14} 
            className="text-yellow-400 fill-gray-200" 
          />
        );
      }
    }
    
    return stars;
  };

  return (
    <div className="w-full px-0">
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            {renderStars(rating)}
          </div>
          <span className="font-bold text-gray-800">{rating}</span>
          <div className="flex items-center text-gray-500 text-xs">
            <span className="border-r border-gray-300 pr-2">{reviews} Reviews</span>
            <span className="pl-2">{sold} Sold</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedRating;
