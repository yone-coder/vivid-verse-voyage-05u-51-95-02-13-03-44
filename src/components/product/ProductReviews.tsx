
import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

// Mock review data
const mockReviews = [
  {
    id: '1',
    user: { name: 'Alex J.', avatar: 'https://ui-avatars.com/api/?name=Alex+J&background=random' },
    rating: 5,
    title: 'Absolutely amazing product!',
    content: 'These headphones exceeded all my expectations. The sound quality is phenomenal, and they\'re incredibly comfortable for long listening sessions. Battery life is impressive too!',
    date: '2024-04-01',
    helpfulCount: 24,
    verified: true,
    images: ['/placeholder.svg', '/placeholder.svg']
  },
  {
    id: '2', 
    user: { name: 'Sam T.', avatar: 'https://ui-avatars.com/api/?name=Sam+T&background=random' },
    rating: 4,
    title: 'Great value for money',
    content: 'Sound quality is excellent for the price point. The battery lasts a long time and they\'re comfortable to wear. The only slight downside is that the noise cancellation could be better.',
    date: '2024-03-28',
    helpfulCount: 15,
    verified: true,
    images: []
  },
  {
    id: '3',
    user: { name: 'Jordan B.', avatar: 'https://ui-avatars.com/api/?name=Jordan+B&background=random' },
    rating: 3,
    title: 'Decent but expected more',
    content: 'These are okay headphones. The sound is good but I\'ve had issues with the Bluetooth connectivity dropping occasionally. The comfort is nice but they can get a bit warm after extended use.',
    date: '2024-03-15',
    helpfulCount: 8,
    verified: true,
    images: ['/placeholder.svg']
  },
  {
    id: '4',
    user: { name: 'Taylor N.', avatar: 'https://ui-avatars.com/api/?name=Taylor+N&background=random' },
    rating: 5,
    title: 'Perfect for working out!',
    content: 'I love how these stay in place during intense workouts. The sweat resistance is great and the sound quality keeps me motivated. Highly recommended for fitness enthusiasts.',
    date: '2024-03-10',
    helpfulCount: 19,
    verified: true,
    images: []
  },
  {
    id: '5',
    user: { name: 'Morgan W.', avatar: 'https://ui-avatars.com/api/?name=Morgan+W&background=random' },
    rating: 2,
    title: 'Disappointed with durability',
    content: 'While the sound quality is good, these broke after just 3 months of normal use. The right earbud stopped working completely. Customer service was helpful but I expected better quality.',
    date: '2024-02-20',
    helpfulCount: 12,
    verified: true,
    images: ['/placeholder.svg']
  }
];

interface ProductReviewsProps {
  productId?: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [filter, setFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent');
  const [showAll, setShowAll] = useState(false);
  const { toast } = useToast();
  
  const toggleReview = (id: string) => {
    setExpandedReview(expandedReview === id ? null : id);
  };
  
  const filteredReviews = filter 
    ? mockReviews.filter(review => review.rating === filter) 
    : mockReviews;
    
  const visibleReviews = showAll ? filteredReviews : filteredReviews.slice(0, 3);
  
  const handleHelpful = (id: string) => {
    toast({
      title: "Thanks for your feedback",
      description: "You found this review helpful",
    });
  };
  
  // Calculate average rating
  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;
  
  // Count reviews by star rating
  const ratingCounts = mockReviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  
  return (
    <div className="mt-6 bg-white p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>
      
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star}
                  size={20}
                  className={star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-lg font-bold">{averageRating.toFixed(1)}</span>
            <span className="text-sm text-gray-500 ml-2">({mockReviews.length} reviews)</span>
          </div>
          
          <div className="mb-4">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center mb-1">
                <button 
                  onClick={() => setFilter(filter === rating ? null : rating)}
                  className={`flex items-center w-full ${filter === rating ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                >
                  <span className="w-10 text-sm text-gray-600">{rating} star</span>
                  <div className="h-2 mx-2 bg-gray-200 rounded-full flex-1">
                    <div 
                      className="h-2 rounded-full bg-yellow-400" 
                      style={{ width: `${((ratingCounts[rating] || 0) / mockReviews.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-right text-sm text-gray-600">{ratingCounts[rating] || 0}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Review this product</h3>
            <p className="text-sm text-gray-600 mb-3">Share your thoughts with other customers</p>
            <Button 
              className="w-full"
              onClick={() => toast({
                title: "Review feature",
                description: "This would open a review form modal",
              })}
            >
              Write a review
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {filter && (
            <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-sm flex items-center mr-2">
              <span>{filter} Star</span>
              <button 
                onClick={() => setFilter(null)}
                className="ml-1 hover:text-blue-800"
              >
                &times;
              </button>
            </div>
          )}
          <span className="text-sm text-gray-500">
            {filter ? `Showing ${filteredReviews.length} filtered reviews` : `Showing all ${mockReviews.length} reviews`}
          </span>
        </div>
        
        <div className="flex items-center">
          <Filter size={14} className="mr-1 text-gray-500" />
          <select 
            className="text-sm border-none bg-transparent focus:outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'helpful')}
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {visibleReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-4">
            <div className="flex items-start">
              <Avatar className="h-8 w-8">
                <img src={review.user.avatar} alt={review.user.name} />
              </Avatar>
              <div className="ml-2 flex-1">
                <div className="flex items-center">
                  <h4 className="font-medium text-sm">{review.user.name}</h4>
                  {review.verified && (
                    <span className="ml-2 bg-green-50 text-green-600 text-xs px-1.5 py-0.5 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-1 mb-1.5">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star}
                        size={14}
                        className={star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <h5 className="font-medium text-sm mb-1">{review.title}</h5>
                <p className={`text-sm text-gray-600 ${expandedReview === review.id ? '' : 'line-clamp-3'}`}>
                  {review.content}
                </p>
                
                {review.content.length > 150 && (
                  <button 
                    className="text-xs text-blue-500 mt-1 flex items-center"
                    onClick={() => toggleReview(review.id)}
                  >
                    {expandedReview === review.id ? (
                      <>Show less <ChevronUp size={14} className="ml-0.5" /></>
                    ) : (
                      <>Show more <ChevronDown size={14} className="ml-0.5" /></>
                    )}
                  </button>
                )}
                
                {review.images.length > 0 && (
                  <div className="flex mt-2 space-x-2 overflow-x-auto pb-2">
                    {review.images.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={img} 
                        alt={`Review image ${idx+1}`} 
                        className="h-16 w-16 object-cover rounded border border-gray-200"
                      />
                    ))}
                  </div>
                )}
                
                <div className="flex items-center mt-2">
                  <button 
                    onClick={() => handleHelpful(review.id)}
                    className="flex items-center text-xs text-gray-500 hover:text-gray-700"
                  >
                    <ThumbsUp size={12} className="mr-1" />
                    Helpful ({review.helpfulCount})
                  </button>
                  <button className="flex items-center text-xs text-gray-500 hover:text-gray-700 ml-4">
                    <ThumbsDown size={12} className="mr-1" />
                    Not helpful
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-700 ml-4">
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredReviews.length > 3 && (
        <Button
          variant="outline"
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full"
        >
          {showAll ? 'Show Less Reviews' : `Show All ${filteredReviews.length} Reviews`}
        </Button>
      )}
    </div>
  );
};

export default ProductReviews;
