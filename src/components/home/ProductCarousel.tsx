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
    {
      id: 7,
      title: "Wireless Charger Stand",
      image: "https://picsum.photos/seed/charger/300/300",
      originalPrice: 29.99,
      discountPrice: 15.99,
      discount: 47,
      rating: 4.6,
      sales: 4721,
    },
    {
      id: 8,
      title: "Mechanical Gaming Keyboard",
      image: "https://picsum.photos/seed/keyboard/300/300",
      originalPrice: 89.99,
      discountPrice: 45.99,
      discount: 49,
      rating: 4.7,
      sales: 3198,
    }
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
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[28.5%] sm:w-40 bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 ml-2 first:ml-4 last:mr-4"
            >
              <div className="relative">
                <img src={product.image} alt={product.title} className="w-full h-36 object-cover" />
                <button className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white">
                  <Heart size={16} className="text-gray-400 hover:text-red-500" />
                </button>
                <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-700 text-xs px-1.5 py-0.5 rounded flex items-center">
                  <Star size={12} className="fill-yellow-400 text-yellow-400 mr-1" />
                  {product.rating}
                </div>
                <div className="absolute bottom-0 left-0 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-tr">
                  {product.sales}+ sold
                </div>
                <div className="absolute bottom-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-tl">
                  -{product.discount}%
                </div>
              </div>

              <div className="p-2">
                <div className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight mb-1">
                  {product.title}
                </div>
                <div className="flex items-baseline">
                  <span className="text-red-500 font-semibold text-base">
                    US ${product.discountPrice.toFixed(2)}
                  </span>
                  <span className="ml-1 text-gray-400 text-xs line-through">
                    US ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
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