
import React from "react";
import { Star } from "lucide-react";

interface ProductReviewsProps {
  rating: number;
  reviewCount: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ rating, reviewCount }) => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
        <span className="mx-2 text-gray-300">•</span>
        <span className="text-sm text-gray-500">{reviewCount} reviews</span>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Be the first to leave a review!</p>
      </div>
    </div>
  );
};

export default ProductReviews;
