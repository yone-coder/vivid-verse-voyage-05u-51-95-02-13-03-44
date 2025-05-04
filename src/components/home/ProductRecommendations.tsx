
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Helper component for product skeleton loading states
const RecommendationSkeleton = () => (
  <div className="w-[calc(40vw)] md:w-[calc(25vw)] lg:w-[calc(16.66vw)] flex-shrink-0">
    <Skeleton className="aspect-square mb-1" />
    <Skeleton className="h-3 w-1/2" />
  </div>
);

// Minimal product card component
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
  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);
  
  // Format products and ensure it's an array
  const formattedProducts = Array.isArray(products) ? products.map(product => ({
    id: String(product.id), // Convert ID to string
    price: product.price || 0,
    discountPrice: product.discount_price,
    rating: 4.5, // Default rating if not provided
    image: product.product_images?.[0]?.src || "https://placehold.co/300x300?text=No+Image",
    // Include original product data
    ...product
  })) : [];
  
  const firstRow = formattedProducts.slice(0, Math.ceil(formattedProducts.length / 2));
  const secondRow = formattedProducts.slice(Math.ceil(formattedProducts.length / 2));

  // Setup synchronized scrolling between rows with improved implementation
  useEffect(() => {
    const firstRowElement = firstRowRef.current;
    const secondRowElement = secondRowRef.current;

    if (!firstRowElement || !secondRowElement) return;

    // Flag to prevent infinite loop when synchronizing scrolls
    let isScrolling = false;

    const handleFirstRowScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        secondRowElement.scrollLeft = firstRowElement.scrollLeft;
        setTimeout(() => {
          isScrolling = false;
        }, 10);
      }
    };

    const handleSecondRowScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        firstRowElement.scrollLeft = secondRowElement.scrollLeft;
        setTimeout(() => {
          isScrolling = false;
        }, 10);
      }
    };

    firstRowElement.addEventListener('scroll', handleFirstRowScroll);
    secondRowElement.addEventListener('scroll', handleSecondRowScroll);

    return () => {
      firstRowElement.removeEventListener('scroll', handleFirstRowScroll);
      secondRowElement.removeEventListener('scroll', handleSecondRowScroll);
    };
  }, []);

  return (
    <div className="py-2">
      <div className="px-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-medium">Recommended for You</h2>
          <Button variant="link" className="text-xs text-gray-500 p-0 h-auto" asChild>
            <Link to="/search?category=recommended" className="flex items-center">
              View All <ChevronRight className="h-3 w-3 ml-0.5" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="space-y-2">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {Array(3).fill(0).map((_, index) => (
                <RecommendationSkeleton key={`row1-${index}`} />
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {Array(3).fill(0).map((_, index) => (
                <RecommendationSkeleton key={`row2-${index}`} />
              ))}
            </div>
          </div>
        ) : formattedProducts.length > 0 ? (
          <div className="space-y-2">
            <div 
              ref={firstRowRef}
              className="flex gap-2 overflow-x-auto pb-2 scroll-smooth scrollbar-hide snap-x snap-mandatory"
              style={{
                scrollPaddingLeft: "0.5rem",
                WebkitOverflowScrolling: "touch"
              }}
            >
              {firstRow.map((product) => (
                <div 
                  key={product.id} 
                  className="w-[40%] md:w-[25%] lg:w-[16.66%] flex-shrink-0 snap-start"
                >
                  <MinimalProductCard product={product} />
                </div>
              ))}
              <div className="flex-none w-4" />
            </div>
            
            <div 
              ref={secondRowRef}
              className="flex gap-2 overflow-x-auto pb-2 scroll-smooth scrollbar-hide snap-x snap-mandatory"
              style={{
                scrollPaddingLeft: "0.5rem",
                WebkitOverflowScrolling: "touch"
              }}
            >
              {secondRow.map((product) => (
                <div 
                  key={product.id} 
                  className="w-[40%] md:w-[25%] lg:w-[16.66%] flex-shrink-0 snap-start"
                >
                  <MinimalProductCard product={product} />
                </div>
              ))}
              <div className="flex-none w-4" />
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">No recommendations available right now</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRecommendations;
