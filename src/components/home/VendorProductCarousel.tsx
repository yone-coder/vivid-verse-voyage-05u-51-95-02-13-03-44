import React, { useRef } from 'react';

// Helper to format relative time
const timeAgo = (dateString) => {
  const diff = Date.now() - new Date(dateString).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours >= 24) return `${Math.floor(hours / 24)}d ago`;
  if (hours >= 1) return `${hours}h ago`;
  if (minutes >= 1) return `${minutes}m ago`;
  return 'Just now';
};

const VendorProductCarousel = () => {
  const vendorData = {
    vendorName: "Fashion Boutique",
    profilePic: "https://picsum.photos/seed/vendor/50/50",
    followers: "24.5K",
    publishedAt: "2025-05-03T15:30:00Z"
  };

  const products = [
    {
      id: 1,
      currentPrice: "$23.99",
      originalPrice: "$79.98",
      discount: "70%",
      image: "https://picsum.photos/seed/product1/320/320"
    },
    {
      id: 2,
      currentPrice: "$18.50",
      originalPrice: "$61.67",
      discount: "70%",
      image: "https://picsum.photos/seed/product2/320/320"
    },
    {
      id: 3,
      currentPrice: "$32.99",
      originalPrice: "$109.99",
      discount: "70%",
      image: "https://picsum.photos/seed/product3/320/320"
    },
    {
      id: 4,
      currentPrice: "$16.49",
      originalPrice: "$54.99",
      discount: "70%",
      image: "https://picsum.photos/seed/product4/320/320"
    },
    {
      id: 5,
      currentPrice: "$21.99",
      originalPrice: "$73.30",
      discount: "70%",
      image: "https://picsum.photos/seed/product5/320/320"
    }
  ];

  const carouselRef = useRef(null);

  return (
    <div className="max-w-6xl mx-auto overflow-hidden">
      {/* Vendor Header */}
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
          <p className="text-gray-500 text-xs md:text-sm">
            {vendorData.followers} followers • {timeAgo(vendorData.publishedAt)}
          </p>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
          Follow
        </button>
      </div>

      {/* Product Carousel */}
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
              {/* Product Image with Overlay */}
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
                {/* Price Info Overlay */}
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