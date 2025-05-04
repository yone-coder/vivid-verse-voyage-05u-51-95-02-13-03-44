
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';

// Helper component for product skeleton loading states
const RecommendationSkeleton = () => (
  <div className="w-full">
    <Skeleton className="w-full aspect-square mb-1" />
    <Skeleton className="h-3 w-3/4 mb-1" />
    <Skeleton className="h-2 w-1/2" />
  </div>
);

const ProductRecommendations = ({ products = [], loading = false }) => {
  // Format products to match ProductCard requirements
  const formattedProducts = products?.map(product => ({
    id: String(product.id), // Convert ID to string
    name: product.name || 'Unnamed Product',
    price: product.price || 0,
    discountPrice: product.discount_price,
    rating: 4.5, // Default rating if not provided
    image: product.product_images?.[0]?.src || "https://placehold.co/300x300?text=No+Image",
    category: product.category || 'Uncategorized',
    sold: Math.floor(Math.random() * 100) + 10, // Random sold count for demo
    // Include original product data
    ...product
  }));

  return (
    <div className="py-4">
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-medium">Recommended for You</h2>
          <Button variant="link" className="text-xs text-gray-500 p-0 h-auto" asChild>
            <Link to="/search?category=recommended" className="flex items-center">
              View All <ChevronRight className="h-3 w-3 ml-0.5" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array(6).fill(0).map((_, index) => (
              <RecommendationSkeleton key={index} />
            ))}
          </div>
        ) : formattedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {formattedProducts.slice(0, 6).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showButton={false} 
                compact={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">No recommendations available right now</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRecommendations;
