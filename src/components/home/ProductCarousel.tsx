import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';

const ProductCarousel = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const products = [
    {
      id: 1,
      title: "Bluetooth Earbuds",
      image: "https://picsum.photos/seed/earbuds/300/300",
      originalPrice: 39.99,
      discountPrice: 19.99,
      discount: 50,
      rating: 4.8,
      sales: 5382,
    },
    {
      id: 2,
      title: "Smart Watch Fitness Tracker",
      image: "https://picsum.photos/seed/smartwatch/300/300",
      originalPrice: 59.99,
      discountPrice: 29.99,
      discount: 50,
      rating: 4.6,
      sales: 3287,
    },
    {
      id: 3,
      title: "Portable Power Bank",
      image: "https://picsum.photos/seed/powerbank/300/300",
      originalPrice: 45.99,
      discountPrice: 22.5,
      discount: 51,
      rating: 4.7,
      sales: 7621,
    },
    {
      id: 4,
      title: "LED Ring Light",
      image: "https://picsum.photos/seed/ringlight/300/300",
      originalPrice: 34.99,
      discountPrice: 19.99,
      discount: 43,
      rating: 4.5,
      sales: 2938,
    },
    {
      id: 5,
      title: "Laptop Backpack",
      image: "https://picsum.photos/seed/backpack/300/300",
      originalPrice: 49.99,
      discountPrice: 27.99,
      discount: 44,
      rating: 4.9,
      sales: 8273,
    },
    {
      id: 6,
      title: "Foldable Selfie Drone",
      image: "https://picsum.photos/seed/drone/300/300",
      originalPrice: 129.99,
      discountPrice: 79.99,
      discount: 38,
      rating: 4.4,
      sales: 1536,
    },
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
    <div className="w-full bg-white py-4 px-0 relative">
      {/* Header */}
      <div className="px-4 flex justify-between items-center mb-3">
        <div className="flex items-center">
          <span className="text-lg font-semibold text-gray-800">Sponsored</span>
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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scrollbar-hide gap-2 pl-2 pb-4"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[28.5%] sm:w-40 bg-white rounded-md border border-gray-200 overflow-hidden ml-1 first:ml-4 last:mr-4"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative">
                <img src={product.image} alt={product.title} className="w-full h-36 object-cover" />
                <button className="absolute top-2 right-2 bg-white/90 rounded-full p-1 hover:bg-white">
                  <Heart size={16} className="text-gray-400 hover:text-red-500" />
                </button>
                <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
                  -{product.discount}%
                </div>
                <div className="absolute bottom-2 left-2 bg-white/90 text-gray-800 text-xs px-1.5 py-0.5 rounded">
                  <span>{product.rating}</span>
                  <span className="mx-1">|</span>
                  <span>{product.sales}+ sold</span>
                </div>
              </div>

              <div className="px-2 py-2">
                <div className="text-[13px] text-gray-800 leading-tight line-clamp-2 h-[34px]">
                  {product.title}
                </div>
                <div className="mt-1">
                  <span className="text-[15px] text-red-500 font-semibold">
                    US ${product.discountPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 line-through ml-1">
                    US ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;