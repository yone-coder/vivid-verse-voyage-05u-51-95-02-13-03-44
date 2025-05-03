import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';

const ProductCarousel = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const products = [
    // ...same product array...
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      setTimeout(() => {
        setShowLeftArrow(current.scrollLeft > 0);
      }, 500);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 0);
    }
  };

  return (
    <div className="w-full bg-gray-50 py-6 px-0 relative">
      {/* Header */}
      <div className="px-4 flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="text-lg font-bold text-gray-800">Sponsored</span>
          <span className="ml-2 text-xs text-gray-500 border border-gray-300 rounded px-1">AD</span>
        </div>
        <div className="flex items-center text-sm text-orange-500 font-medium cursor-pointer hover:text-orange-600">
          Show More
          <ChevronRight size={16} className="ml-1" />
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md p-2 hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div
          className="flex overflow-x-auto scrollbar-hide pb-4 gap-2"
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[28.5%] sm:w-40 bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 ml-2 first:ml-4 last:mr-4"
            >
              <div className="relative">
                <img src={product.image} alt={product.title} className="w-full h-36 object-cover" />
                <button className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white">
                  <Heart size={16} className="text-gray-400 hover:text-red-500" />
                </button>
                <div className="absolute bottom-0 left-0 bg-red-500 text-white text-xs px-1.5 py-0.5">
                  -{product.discount}%
                </div>
              </div>

              <div className="p-2">
                <div className="flex items-baseline">
                  <span className="text-red-500 font-medium text-base">
                    US ${product.discountPrice.toFixed(2)}
                  </span>
                  <span className="ml-1 text-gray-400 text-xs line-through">
                    US ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="ml-0.5 font-medium">{product.rating}</span>
                  </div>
                  <span className="mx-1">·</span>
                  <span className="font-medium">{product.sales}+ sold</span>
                </div>
                {product.freeShipping && (
                  <div className="mt-1">
                    <span className="text-xs text-green-600">Free Shipping</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md p-2 hover:bg-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;