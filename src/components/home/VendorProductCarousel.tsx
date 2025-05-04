import React, { useRef } from 'react';

const VendorProductCarousel = () => {
  const vendorData = {
    vendorName: "Fashion Boutique",
    profilePic: "https://picsum.photos/seed/vendor/50/50",
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
      image: "https://picsum.photos/seed/product1/320/320",
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
      image: "https://picsum.photos/seed/product2/320/320",
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
      image: "https://picsum.photos/seed/product3/320/320",
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
      image: "https://picsum.photos/seed/product4/320/320",
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
      image: "https://picsum.photos/seed/product5/320/320",
      tags: ["Limited"]
    }
  ];

  const carouselRef = useRef(null);

  const formatNumber = (num) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;
  };

  return (
    <div className="max-w-6xl mx-auto overflow-hidden">
      {/* Vendor Info Header */}
      <div className="flex items-center mb-4 px-3 md:px-4">
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

      {/* Products Carousel */}
      <div className="relative w-full">
        <div 
          className="flex overflow-x-auto gap-2 md:gap-3 pb-4 snap-x snap-mandatory"
          ref={carouselRef}
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            paddingLeft: '8px', 
            paddingRight: '8px', 
            scrollSnapType: 'x mandatory' 
          }}
        >
          {products.map((product) => (
            <div 
              key={product.id}
              className="flex-shrink-0 rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white hover:shadow-md transition-shadow"
              style={{ 
                width: 'calc(40% - 8px)', 
                minWidth: '140px', 
                scrollSnapAlign: 'center' 
              }}
            >
              {/* Product Image with Price Overlay */}
              <div className="relative aspect-square">
                <img 
                  src={product.image} 
                  alt="Product"
                  className="w-full h-full object-cover"
                />
                {/* Discount Tag */}
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
                  {product.discount} OFF
                </div>
                {/* Price Overlay at Bottom */}
                <div className="absolute bottom-0 w-full px-2 py-1 bg-gradient-to-t from-black/70 to-transparent text-white flex items-center justify-between text-xs z-10">
                  <span className="font-bold text-sm text-red-400">{product.currentPrice}</span>
                  <span className="line-through text-gray-300">{product.originalPrice}</span>
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