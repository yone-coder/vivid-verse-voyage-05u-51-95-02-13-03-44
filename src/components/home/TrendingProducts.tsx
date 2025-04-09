
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Zap, ShoppingCart, Heart, ChevronRight, Star } from "lucide-react";

interface TrendingProductsProps {
  products?: any[];
  isLoading?: boolean;
}

export default function TrendingProducts({ products = [], isLoading = false }: TrendingProductsProps) {
  if (isLoading) {
    return (
      <div className="bg-white p-4 mb-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="h-7 w-48 bg-gray-200 rounded"></div>
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="aspect-[3/4] bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  // Filter to just show up to 4 products
  const trendingProducts = products.slice(0, 4);

  return (
    <div className="bg-white p-4 mb-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center">
          <Zap className="h-5 w-5 text-yellow-500 mr-2" />
          Trending Now
        </h2>
        <Button variant="link" className="text-xs text-red-500 p-0 flex items-center">
          View All <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trendingProducts.map((product) => {
          const mainImage = product.product_images && product.product_images.length > 0
            ? product.product_images[0].src
            : "https://placehold.co/300x300?text=No+Image";
            
          const discountPercentage = product.discount_price && 
            Math.round(((product.price - product.discount_price) / product.price) * 100);
            
          return (
            <Card key={product.id} className="overflow-hidden transition-all hover:shadow-md border border-gray-100 group">
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={mainImage} 
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.discount_price && (
                    <Badge variant="aliDiscount" className="absolute top-2 left-2 text-[10px] px-1.5">
                      {discountPercentage}% OFF
                    </Badge>
                  )}
                </div>
              </Link>
              <CardContent className="p-3">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium text-xs line-clamp-2 mb-1 hover:text-red-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    {product.discount_price ? (
                      <>
                        <span className="text-red-500 text-xs font-semibold">${product.discount_price.toFixed(2)}</span>
                        <span className="text-gray-400 text-[10px] line-through">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-xs font-semibold">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
