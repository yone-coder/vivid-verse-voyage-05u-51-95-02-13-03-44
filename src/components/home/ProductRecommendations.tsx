
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Helper component for product skeleton loading states
const RecommendationSkeleton = () => (
  <div className="w-full">
    <Skeleton className="w-full aspect-square mb-1" />
    <Skeleton className="h-3 w-1/2" />
  </div>
);

// Minimal product card component (without names)
const MinimalProductCard = ({ product }) => {
  const discount = product.discount_price ? 
    Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;
  
  return (
    <Card className="overflow-hidden rounded-sm border-gray-100 h-full hover:shadow-sm transition-all">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square bg-white">
          <img
            src={product.image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {discount > 0 && (
            <Badge className="absolute top-1.5 left-1.5 bg-red-500 hover:bg-red-600 text-[10px] px-1.5 py-0.5 rounded-sm">
              -{discount}%
            </Badge>
          )}
        </div>
        <CardContent className="p-2 flex justify-between items-center">
          <div className="flex items-baseline gap-1">
            <span className="text-red-500 text-sm font-bold">
              ${product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="text-gray-400 line-through text-xs">
                ${product.price}
              </span>
            )}
          </div>
          <div className="flex items-center text-[10px] text-amber-500">
            <Star className="h-3 w-3 fill-amber-400" />
            <span className="ml-0.5">{product.rating}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

const ProductRecommendations = ({ products = [], loading = false }) => {
  // Format products to match MinimalProductCard requirements
  const formattedProducts = products?.map(product => ({
    id: String(product.id), // Convert ID to string
    price: product.price || 0,
    discountPrice: product.discount_price,
    rating: 4.5, // Default rating if not provided
    image: product.product_images?.[0]?.src || "https://placehold.co/300x300?text=No+Image",
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
              <MinimalProductCard 
                key={product.id} 
                product={product} 
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
