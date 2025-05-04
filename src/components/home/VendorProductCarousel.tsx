import React, { useRef } from 'react';

const VendorProductCarousel = () => {
  // Sample data for vendor and products
  const vendorData = {
    vendorName: "Fashion Boutique",
    profilePic: "/api/placeholder/50/50",
    followers: "24.5K"
  };

  const products = [
    {
      id: 1,
      currentPrice: "$23.99",
      originalPrice: "$79.98",
      discount: "70%",
      sold: 5243,
      rating: 4.9,
      reviews: 2453,
      imageCount: 4,
      image: "/api/placeholder/320/320",
      tags: ["HOT", "Free Shipping"]
    },
    {
      id: 2,
      currentPrice: "$18.50",
      originalPrice: "$61.67",
      discount: "70%",
      sold: 3871,
      rating: 4.8,
      reviews: 1832,
      imageCount: 5,
      image: "/api/placeholder/320/320",
      tags: ["Trending"]
    },
    {
      id: 3,
      currentPrice: "$32.99",
      originalPrice: "$109.99",
      discount: "70%",
      sold: 7621,
      rating: 4.7,
      reviews: 3410,
      imageCount: 6,
      image: "/api/placeholder/320/320",
      tags: ["Free Shipping"]
    },
    {
      id: 4,
      currentPrice: "$16.49",
      originalPrice: "$54.99",
      discount: "70%",
      sold: 4127,
      rating: 4.9,
      reviews: 1976,
      imageCount: 3,
      image: "/api/placeholder/320/320",
      tags: ["HOT", "Best Seller"]
    },
    {
      id: 5,
      currentPrice: "$21.99",
      originalPrice: "$73.30",
      discount: "70%",
      sold: 2856,
      rating: 4.8,
      reviews: 1245,
      imageCount: 4,
      image: "/api/placeholder/320/320",
      tags: ["Limited"]
    }
  ];

  const carouselRef = useRef(null);

  return (
    <div className="max-w-6xl mx-auto overflow-hidden">
      {/* Vendor Info Header */}
      <div className="flex items-center mb-4 px-3 md:px-4">
        {/* Profile image with circular shape */}
        <div className="flex-shrink-0 mr-3 rounded-full overflow-hidden w-12 h-12">
          <img
            src={vendorData.profilePic}
            alt={vendorData.vendorName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-sm md:text-base">{vendorData.vendorName}</h3>
          <p className="text-gray-500 text-xs md:text-sm">{vendorData.followers} followers</p>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
          Follow
        </button>
      </div>

      {/* Products Carousel with Improved Scroll Snapping */}
      <div className="relative w-full px-2">
        <div 
          className="flex overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          ref={carouselRef}
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            paddingLeft: '8px',
            paddingRight: '8px'
          }}
        >
          {products.map((product) => (
            <div 
              key={product.id}
              className="flex-shrink-0 rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white hover:shadow-md transition-shadow mx-1 snap-start"
              style={{ 
                width: 'calc(40% - 8px)', 
                minWidth: '140px'
              }}
            >
              {/* Product Image */}
              <div className="relative aspect-square">
                <img 
                  src={product.image} 
                  alt="Product"
                  className="w-full h-full object-cover"
                />
                
                {/* Discount Tag */}
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                  {product.discount} OFF
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-2">
                {/* Price Info */}
                <div className="flex items-center">
                  <span className="font-bold text-red-500 text-base mr-2">{product.currentPrice}</span>
                  <span className="text-gray-400 text-xs line-through">{product.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorProductCarousel;