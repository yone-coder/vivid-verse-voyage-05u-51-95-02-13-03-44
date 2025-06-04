
import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Product } from '@/integrations/supabase/products';

interface DesktopSuperDealsProps {
  products?: Product[];
}

const DesktopSuperDeals = ({ products = [] }: DesktopSuperDealsProps) => {
  const discountedProducts = products
    .filter(product => 
      product.discount_price !== null && 
      product.product_images && 
      product.product_images.length > 0
    )
    .slice(0, 12);

  const deals = discountedProducts.map((product) => {
    const discountPercent = product.discount_price 
      ? Math.round(((product.price - product.discount_price) / product.price) * 100) 
      : 0;
    
    const image = product.product_images && product.product_images.length > 0 
      ? product.product_images[0] 
      : null;
    
    return {
      id: product.id,
      title: product.name,
      currentPrice: product.discount_price,
      originalPrice: product.price,
      discount: discountPercent,
      image: image?.src
    };
  });

  if (deals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-orange-500" fill="#FEF7CD" />
            <h2 className="text-lg font-semibold">Super Deals</h2>
          </div>
        </div>
        <div className="text-center py-8 text-gray-500">
          No deals available at the moment
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Star className="w-6 h-6" fill="#FEF7CD" />
            <h2 className="text-lg font-bold uppercase tracking-wide">Super Deals</h2>
          </div>
          
          <div className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="font-medium">{deals.length} Items</span>
          </div>
          
          <a
            href="/super-deals"
            className="text-white hover:underline flex items-center font-medium"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-4 gap-6">
          {deals.map((deal) => (
            <div key={deal.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded z-10">
                  SUPER
                </div>
                {deal.image ? (
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={deal.image} 
                      alt={deal.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2" title={deal.title}>
                  {deal.title}
                </h3>
                <div className="space-y-1">
                  <div className="text-lg font-bold text-orange-500">
                    US ${deal.currentPrice}
                  </div>
                  <div className="text-gray-500 line-through text-sm">
                    US ${deal.originalPrice}
                  </div>
                  <div className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded inline-block">
                    {deal.discount}% OFF
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopSuperDeals;
