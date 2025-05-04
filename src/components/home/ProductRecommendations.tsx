import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';

// Helper component for loading state
const RecommendationSkeleton = () => (
  <div className="w-full">
    <div className="aspect-square bg-gray-200 animate-pulse rounded-md mb-1.5"></div>
    <div className="h-3 w-3/4 bg-gray-200 animate-pulse mb-1"></div>
    <div className="h-2 w-1/2 bg-gray-200 animate-pulse"></div>
  </div>
);

// Minimal product card component styled like FlashDeals
const MinimalProductCard = ({ product }) => {
  const discount = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <div className="h-full w-full">
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-md mb-1.5">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {discount > 0 && (
            <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-br-md font-medium">
              -{discount}% OFF
            </div>
          )}
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <div className="text-red-500 font-semibold text-sm">
              ${(product.discountPrice || product.price).toFixed(2)}
            </div>
            {product.discountPrice && (
              <div className="text-xs text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </div>
            )}
          </div>
          <div className="text-[10px] text-gray-500 truncate max-w-full mt-0.5">
            {product.name}
          </div>
        </div>
      </Link>
    </div>
  );
};

const ProductRecommendations = ({ products = [], loading = false }) => {
  // Format products into usable structure
  const formattedProducts = Array.isArray(products)
    ? products.map((product) => ({
        id: String(product.id),
        price: product.price || 0,
        discountPrice: product.discount_price,
        name: product.name || "Product Name",
        image:
          product.product_images?.[0]?.src ||
          "https://placehold.co/300x300?text=No+Image",
        ...product,
      }))
    : [];

  // Group products into pairs (2 items per column)
  const groupedPairs = [];
  for (let i = 0; i < formattedProducts.length; i += 2) {
    groupedPairs.push([formattedProducts[i], formattedProducts[i + 1]]);
  }

  return (
    <div className="py-2">
      <div className="px-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-medium">Recommended for You</h2>
          <Button
            variant="link"
            className="text-xs text-gray-500 p-0 h-auto"
            asChild
          >
            <Link to="/search?category=recommended" className="flex items-center">
              View All <ChevronRight className="h-3 w-3 ml-0.5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory -mx-2 px-2">
        <div className="flex gap-2">
          {loading
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={`skeleton-${i}`}
                    className="w-[calc(30%)] flex-shrink-0 snap-start space-y-2"
                  >
                    <RecommendationSkeleton />
                    <RecommendationSkeleton />
                  </div>
                ))
            : groupedPairs.map((pair, index) => (
                <div
                  key={`group-${index}`}
                  className="w-[calc(30%)] flex-shrink-0 snap-start space-y-2"
                >
                  {pair.map(
                    (product) =>
                      product && (
                        <MinimalProductCard key={product.id} product={product} />
                      )
                  )}
                </div>
              ))}
          <div className="flex-none w-4" />
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendations;