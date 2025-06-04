
import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Product } from '@/integrations/supabase/products';

interface DesktopProductRecommendationsProps {
  products: Product[];
}

const DesktopProductRecommendations = ({ products }: DesktopProductRecommendationsProps) => {
  const displayProducts = products.slice(0, 16);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recommended for You</h2>
        <a
          href="/recommendations"
          className="text-orange-500 hover:text-orange-600 flex items-center font-medium"
        >
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </a>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {displayProducts.map((product) => {
          const image = product.product_images?.[0]?.src || "https://placehold.co/300x300?text=No+Image";
          const hasDiscount = product.discount_price && product.discount_price < product.price;
          const rating = 4 + Math.random();
          const reviewCount = Math.floor(Math.random() * 500) + 50;
          
          return (
            <div key={product.id} className="group">
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {hasDiscount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                      SALE
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2" title={product.name}>
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({reviewCount})</span>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-3">
                    {hasDiscount ? (
                      <>
                        <div className="text-orange-500 font-bold text-lg">
                          ${Number(product.discount_price).toFixed(2)}
                        </div>
                        <div className="text-gray-500 line-through text-sm">
                          ${Number(product.price).toFixed(2)}
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-800 font-bold text-lg">
                        ${Number(product.price).toFixed(2)}
                      </div>
                    )}
                  </div>
                  
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded font-medium transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopProductRecommendations;
