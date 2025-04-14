
import React from "react";
import { Star } from "lucide-react";

interface ProductReviewsProps {
  rating: number;
  reviewCount: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ rating, reviewCount }) => {
  const stars = Array(5).fill(0);
  
  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {stars.map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < Math.floor(rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm ml-2 font-medium">{rating} out of 5</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Based on {reviewCount} reviews
      </p>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm mb-2 font-medium">No reviews yet</p>
          <p className="text-xs text-gray-500">Be the first to review this product</p>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
