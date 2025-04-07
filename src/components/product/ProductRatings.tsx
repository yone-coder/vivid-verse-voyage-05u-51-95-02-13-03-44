
import React from "react";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProductRatingsProps {
  averageRating: number;
  totalReviews: number;
  ratingsDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  verifiedPurchases?: number;
  helpfulVotes?: number;
}

const ProductRatings: React.FC<ProductRatingsProps> = ({
  averageRating,
  totalReviews,
  ratingsDistribution,
  verifiedPurchases,
  helpfulVotes
}) => {
  // Calculate percentages for star distribution
  const calculatePercentage = (count: number) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
      
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <span className="text-3xl font-bold mr-2">{averageRating.toFixed(1)}</span>
          <div className="flex flex-col">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4"
                  fill={star <= Math.round(averageRating) ? "#FFD700" : "none"}
                  color={star <= Math.round(averageRating) ? "#FFD700" : "#D1D5DB"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center">
            <span className="text-sm w-8">{rating} star</span>
            <Progress
              value={calculatePercentage(ratingsDistribution[rating])}
              className="h-2 flex-1 mx-2"
            />
            <span className="text-xs text-gray-500 w-10 text-right">
              {Math.round(calculatePercentage(ratingsDistribution[rating]))}%
            </span>
          </div>
        ))}
      </div>

      {(verifiedPurchases || helpfulVotes) && (
        <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-600">
          {verifiedPurchases && (
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1.5 text-green-500" fill="#10B981" />
              <span>{verifiedPurchases} verified purchases</span>
            </div>
          )}
          
          {helpfulVotes && (
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1.5 text-blue-500" fill="#3B82F6" />
              <span>{helpfulVotes} helpful votes</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductRatings;
