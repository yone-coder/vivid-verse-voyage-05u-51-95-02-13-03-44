
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  features?: string[];
  specifications?: { name: string; value: string }[];
  reviews?: { id: string; rating: number; author: string; title: string; content: string }[];
}

interface ProductTabsProps {
  product: Product;
  activeTab: string;
  setActiveTab: (value: string) => void;
  isScrolled?: boolean;
  headerHeight?: number;
  hideOnScrollUp?: boolean;
  isScrollingUp?: boolean;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  product,
  activeTab,
  setActiveTab,
  isScrolled = false,
  headerHeight = 0,
  hideOnScrollUp = false,
  isScrollingUp = false
}) => {
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    // Calculate total reviews and average rating
    if (product?.reviews?.length) {
      setTotalReviews(product.reviews.length);
      const totalStars = product.reviews.reduce((acc, review) => acc + review.rating, 0);
      setAverageRating(Math.round((totalStars / product.reviews.length) * 10) / 10);
    }
  }, [product]);

  return (
    <div 
      className={`sticky bg-white border-b border-t z-20 transition-transform duration-300 ${
        isScrolled && hideOnScrollUp && isScrollingUp ? '-translate-y-full' : 'translate-y-0'
      }`} 
      style={{ top: `${headerHeight}px` }}
    >
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex overflow-x-auto scrollbar-none">
          <TabsList className="bg-white p-0 h-auto w-full justify-start">
            <TabsTrigger
              value="description"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="features"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none"
            >
              Features
            </TabsTrigger>
            <TabsTrigger
              value="specs"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none"
            >
              Specs
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none"
            >
              <span className="flex items-center">
                Reviews
                <Badge variant="secondary" className="ml-2 bg-gray-100">
                  {totalReviews}
                </Badge>
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="px-4 pt-4 pb-6">
          <TabsContent value="description" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <p className="text-gray-700 text-sm leading-relaxed">
              {product.description}
            </p>
          </TabsContent>

          <TabsContent value="features" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            {product.features && product.features.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-sm">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic">No feature information available.</p>
            )}
          </TabsContent>

          <TabsContent value="specs" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            {product.specifications && product.specifications.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="py-3 flex justify-between">
                    <span className="text-sm font-medium text-gray-500">{spec.name}</span>
                    <span className="text-sm text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">No specification information available.</p>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl font-bold text-gray-900 mr-2">{averageRating || 0}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                  </span>
                </div>
              </div>
            </div>

            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{review.title}</h4>
                    <p className="text-xs text-gray-500 mb-2">by {review.author}</p>
                    <p className="text-sm text-gray-700">{review.content}</p>
                    <div className="flex items-center mt-2 space-x-3">
                      <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        Helpful
                      </button>
                      <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">No reviews available yet.</p>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
