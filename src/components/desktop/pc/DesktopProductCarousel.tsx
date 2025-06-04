
import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '@/integrations/supabase/products';

interface DesktopProductCarouselProps {
  title: string;
  products: Product[];
}

const DesktopProductCarousel = ({ title, products }: DesktopProductCarouselProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <a
          href={`/search?category=${title.toLowerCase()}`}
          className="text-orange-500 hover:text-orange-600 flex items-center font-medium"
        >
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </a>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 p-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => {
            const image = product.product_images?.[0]?.src || "https://placehold.co/300x300?text=No+Image";
            const hasDiscount = product.discount_price && product.discount_price < product.price;
            
            return (
              <div key={product.id} className="flex-none w-64 group">
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
                    
                    <div className="flex items-baseline gap-2 mb-2">
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

        {/* Navigation Arrows */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 z-10"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 z-10"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default DesktopProductCarousel;
