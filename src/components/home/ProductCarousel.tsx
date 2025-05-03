import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  ShoppingCart
} from 'lucide-react';

const ProductCarousel = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const products = [
    {
      id: 1,
      title: "Wireless Bluetooth Earbuds",
      image: "/api/placeholder/300/300",
      originalPrice: 39.99,
      discountPrice: 19.99,
      discount: 50,
      rating: 4.8,
      sales: 5382,
      freeShipping: true,
    },
    {
      id: 2,
      title: "Smart Watch Fitness Tracker",
      image: "/api/placeholder/300/300",
      originalPrice: 59.99,
      discountPrice: 29.99,
      discount: 50,
      rating: 4.6,
      sales: 3287,
      freeShipping: true,
    },
    {
      id: 3,
      title: "Portable Power Bank 20000mAh",
      image: "/api/placeholder/300/300",
      originalPrice: 45.99,
      discountPrice: 22.50,
      discount: 51,
      rating: 4.7,
      sales: 7621,
      freeShipping: true,
    },
    {
      id: 4,
      title: "LED Ring Light with Tripod Stand",
      image: "/api/placeholder/300/300",
      originalPrice: 34.99,
      discountPrice: 19.99,
      discount: 43,
      rating: 4.5,
      sales: 2938,
      freeShipping: false,
    },
    {
      id: 5,
      title: "Laptop Backpack with USB Port",
      image: "/api/placeholder/300/300",
      originalPrice: 49.99,
      discountPrice: 27.99,
      discount: 44,
      rating: 4.9,
      sales: 8273,
      freeShipping: true,
    },
    {
      id: 6,
      title: "Foldable Selfie Drone with Camera",
      image: "/api/placeholder/300/300",
      originalPrice: 129.99,
      discountPrice: 79.99,
      discount: 38,
      rating: 4.4,
      sales: 1536,
      freeShipping: true,
    },
    {
      id: 7,
      title: "Wireless Phone Charger Stand",
      image: "/api/placeholder/300/300",
      originalPrice: 29.99,
      discountPrice: 15.99,
      discount: 47,
      rating: 4.6,
      sales: 4721,
      freeShipping: true,
    },
    {
      id: 8,
      title: "Gaming Mechanical Keyboard RGB",
      image: "/api/placeholder/300/300",
      originalPrice: 89.99,
      discountPrice: 45.99,
      discount: 49,
      rating: 4.7,
      sales: 3198,
      freeShipping: true,
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      // Update left arrow visibility after scrolling
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
    <div className="w-full bg-gray-50 py-6 px-4 relative">
      {/* Sponsored header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="text-lg font-bold text-gray-800">Sponsored Products</span>
          <span className="ml-2 text-xs text-gray-500 border border-gray-300 rounded px-1">AD</span>
        </div>
        <div className="text-sm text-orange-500 font-medium cursor-pointer">View More</div>
      </div>

      {/* Carousel container */}
      <div className="relative">
        {/* Left arrow */}
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md p-2 hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Products container */}
        <div 
          className="flex overflow-x-auto scrollbar-hide gap-3 pb-4" 
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-44 bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
              {/* Product image */}
              <div className="relative">
                <img src={product.image} alt={product.title} className="w-full h-44 object-cover" />
                {/* Wishlist button */}
                <button className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white">
                  <Heart size={16} className="text-gray-400 hover:text-red-500" />
                </button>
                {/* Discount tag */}
                <div className="absolute bottom-0 left-0 bg-red-500 text-white text-xs px-1.5 py-0.5">
                  -{product.discount}%
                </div>
              </div>

              {/* Product info */}
              <div className="p-2">
                {/* Price */}
                <div className="flex items-baseline">
                  <span className="text-red-500 font-medium text-base">US ${product.discountPrice.toFixed(2)}</span>
                  <span className="ml-1 text-gray-400 text-xs line-through">US ${product.originalPrice.toFixed(2)}</span>
                </div>

                {/* Title */}
                <p className="text-xs mt-1 text-gray-800 line-clamp-2 h-8">{product.title}</p>

                {/* Rating and sales */}
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="ml-0.5">{product.rating}</span>
                  <span className="mx-1">·</span>
                  <span>{product.sales}+ sold</span>
                </div>

                {/* Shipping */}
                {product.freeShipping && (
                  <div className="text-xs text-gray-500 mt-1">Free Shipping</div>
                )}

                {/* Add to cart */}
                <button className="mt-2 w-full flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded py-1 text-xs font-medium">
                  <ShoppingCart size={12} className="mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
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