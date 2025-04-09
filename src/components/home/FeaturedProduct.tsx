
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Award, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedProductProps {
  product?: any;
  isLoading?: boolean;
}

export default function FeaturedProduct({ product, isLoading = false }: FeaturedProductProps) {
  if (isLoading || !product) {
    return (
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-sm mb-6">
        <div className="animate-pulse">
          <div className="h-7 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 aspect-square bg-gray-200 rounded-lg"></div>
            <div className="md:w-1/2 space-y-4 mt-4 md:mt-0">
              <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
              <div className="h-24 w-full bg-gray-200 rounded"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const mainImage = product.product_images && product.product_images.length > 0
    ? product.product_images[0].src
    : "https://placehold.co/600x600?text=No+Image";
  
  const discountPercentage = product.discount_price && 
    Math.round(((product.price - product.discount_price) / product.price) * 100);

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center">
          <Award className="h-5 w-5 text-amber-500 mr-2" />
          Featured Product
        </h2>
        <Link to={`/product/${product.id}`}>
          <Button variant="link" className="text-sm text-red-500 p-0">
            View Details
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 relative group">
          <Link to={`/product/${product.id}`}>
            <div className="overflow-hidden rounded-lg bg-gray-100 aspect-square">
              <img 
                src={mainImage} 
                alt={product.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            {product.discount_price && (
              <Badge variant="aliDiscount" className="absolute top-3 left-3 px-2 py-1 text-xs font-bold">
                {discountPercentage}% OFF
              </Badge>
            )}
          </Link>
        </div>
        
        <div className="md:w-1/2 space-y-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-xl font-bold hover:text-red-500 transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-amber-400' : 'fill-gray-200'}`} />
              ))}
            </div>
            <span className="text-sm text-gray-500">(42 reviews)</span>
          </div>
          
          <div className="flex items-baseline gap-3">
            {product.discount_price ? (
              <>
                <span className="text-2xl text-red-500 font-bold">${product.discount_price.toFixed(2)}</span>
                <span className="text-lg text-gray-400 line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-3">
            {product.description || "High-quality product with excellent features, perfect for everyday use. Trusted by thousands of satisfied customers worldwide."}
          </p>
          
          <div className="flex items-center text-sm text-gray-500 gap-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Limited time offer</span>
            </div>
            <div>Free shipping</div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button className="flex-1 bg-red-500 hover:bg-red-600">
              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
            <Button variant="outline">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
