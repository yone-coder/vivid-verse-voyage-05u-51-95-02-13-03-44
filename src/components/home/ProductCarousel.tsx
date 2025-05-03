import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';

const ProductCarousel = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const products = [
    {
      id: 1,
      title: "Bluetooth Earbuds Wireless Headphones Noise Cancellation",
      image: "/api/placeholder/300/300",
      originalPrice: 39.99,
      discountPrice: 19.99,
      discount: 50,
      rating: 4.8,
      sales: 5382,
      shipping: "Free Shipping",
    },
    {
      id: 2,
      title: "Smart Watch Fitness Tracker Heart Rate Monitor Sport Band",
      image: "/api/placeholder/300/300",
      originalPrice: 59.99,
      discountPrice: 29.99,
      discount: 50,
      rating: 4.6,
      sales: 3287,
      shipping: "Free Shipping",
    },
    {
      id: 3,
      title: "Portable Power Bank 20000mAh Fast Charging External Battery",
      image: "/api/placeholder/300/300",
      originalPrice: 45.99,
      discountPrice: 22.5,
      discount: 51,
      rating: 4.7,
      sales: 7621,
      shipping: "Free Shipping",
    },
    {
      id: 4,
      title: "LED Ring Light with Tripod Stand Selfie Phone Holder",
      image: "/api/placeholder/300/300",
      originalPrice: 34.99,
      discountPrice: 19.99,
      discount: 43,
      rating: 4.5,
      sales: 2938,
      shipping: "Free Shipping",
    },
    {
      id: 5,
      title: "Laptop Backpack USB Charging Waterproof Travel School Bag",
      image: "/api/placeholder/300/300",
      originalPrice: 49.99,
      discountPrice: 27.99,
      discount: 44,
      rating: 4.9,
      sales: 8273,
      shipping: "+ $2.99 Shipping",
    },
    {
      id: 6,
      title: "Foldable Selfie Drone with Camera HD Quadcopter FPV",
      image: "/api/placeholder/300/300",
      originalPrice: 129.99,
      discountPrice: 79.99,
      discount: 38,
      rating: 4.4,
      sales: 1536,
      shipping: "Free Shipping",
    },
    {
      id: 7,
      title: "Wireless Charger Stand Fast Charging Phone Holder",
      image: "/api/placeholder/300/300",
      originalPrice: 29.99,
      discountPrice: 15.99,
      discount: 47,
      rating: 4.6,
      sales: 4721,
      shipping: "Free Shipping",
    },
    {
      id: 8,
      title: "Mechanical Gaming Keyboard RGB Backlit Anti-ghosting",
      image: "/api/placeholder/300/300",
      originalPrice: 89.99,
      discountPrice: 45.99,
      discount: 49,
      rating: 4.7,
      sales: 3198,
      shipping: "+ $4.99 Shipping",
    }
  ];

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  useEffect(() => {
    checkScrollPosition();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -280 : 280; // Adjusted for smaller cards
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollPosition, 500);
    }
  };

  return (
    <div className="w-full bg-gray-50 py-4 px-0 relative">
      {/* Header */}
      <div className="px-4 flex justify-between items-center mb-3">
        <div className="flex items-center">
          <span className="text-sm font-bold text-gray-800">Flash Deals</span>
          <span className="ml-2 text-xs text-gray-500 border border-gray-300 rounded px-1">AD</span>
        </div>
        <div className="flex items-center text-xs text-orange-500 font-medium cursor-pointer hover:text-orange-600">
          More
          <ChevronRight size={14} className="ml-1" />
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md p-1.5 hover:bg-white"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        <div
          className="flex overflow-x-auto scrollbar-hide pb-4 gap-1"
          ref={scrollRef}
          onScroll={checkScrollPosition}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-32 bg-white rounded overflow-hidden hover:shadow-sm transition-shadow duration-300 ml-2 first:ml-4 last:mr-4"
            >
              <div className="relative">
                <img src={product.image} alt={product.title} className="w-full h-28 object-cover" />
                <button className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-white">
                  <Heart size={12} className="text-gray-400 hover:text-red-500" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-8">
                  <div className="absolute bottom-1 left-1 text-white text-xs px-1 py-0.5 rounded flex items-center">
                    <Star size={10} className="fill-yellow-400 text-yellow-400 mr-0.5" />
                    {product.rating}
                  </div>
                  <div className="absolute bottom-1 right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded-sm">
                    -{product.discount}%
                  </div>
                </div>
              </div>

              <div className="p-1.5">
                <div className="text-xs text-gray-800 line-clamp-2 leading-tight h-8 mb-1">
                  {product.title}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-sm text-red-500 font-semibold">
                      US ${product.discountPrice.toFixed(2)}
                    </span>
                    <span className="ml-1 text-xs text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {product.shipping}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {product.sales}+ sold
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md p-1.5 hover:bg-white"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;