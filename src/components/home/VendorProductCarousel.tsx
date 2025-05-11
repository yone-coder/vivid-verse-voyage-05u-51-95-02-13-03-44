
import React, { useRef } from 'react';
import { Product } from '@/integrations/supabase/products';

// Interface to define the component props
interface VendorProductCarouselProps {
  title: string;
  products: Product[];
}

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

const VendorProductCarousel = ({ title, products }: VendorProductCarouselProps) => {
  const vendorData = {
    vendorName: "Fashion Boutique",
    profilePic: "https://picsum.photos/seed/vendor/50/50",
    followers: "24.5K",
    publishedAt: "2025-05-03T15:30:00Z",
    verified: true
  };

  // Transform products for display, using actual product images when available
  const displayProducts = products.slice(0, 10).map(product => ({
    id: product.id,
    currentPrice: product.discount_price ? `$${product.discount_price}` : `$${product.price}`,
    originalPrice: product.discount_price ? `$${product.price}` : undefined,
    discount: product.discount_price ? `${Math.round(((product.price - product.discount_price) / product.price) * 100)}%` : null,
    image: product.product_images?.[0]?.src || "https://picsum.photos/seed/product/320/320"
  }));

  const carouselRef = useRef(null);

  return (
    <div className="max-w-6xl mx-auto overflow-hidden">
      {/* Vendor Info Header */}
      <div className="flex items-center mb-4 px-3 md:px-4">
        <div className="flex-shrink-0 mr-3 rounded-full overflow-hidden w-12 h-12">
          <img
            src={vendorData.profilePic}
            alt={vendorData.vendorName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <h3 className="font-bold text-gray-800 text-sm md:text-base">
              {title || vendorData.vendorName}
            </h3>
            {vendorData.verified && (
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <p className="text-gray-500 text-xs md:text-sm">
            {vendorData.followers} followers • {timeAgo(vendorData.publishedAt)}
          </p>
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
          {displayProducts.map((product) => (
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
                  loading="lazy"
                />
                {/* Discount Tag */}
                {product.discount && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
                    {product.discount} OFF
                  </div>
                )}
                {/* Price Info Overlay */}
                <div className="absolute bottom-0 w-full px-2 py-1 bg-gradient-to-t from-black/70 to-transparent text-white flex items-center justify-between text-xs z-10">
                  <span className="font-bold text-sm text-red-400">{product.currentPrice}</span>
                  {product.originalPrice && (
                    <span className="line-through text-gray-300">{product.originalPrice}</span>
                  )}
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
