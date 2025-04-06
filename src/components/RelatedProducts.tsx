
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface RelatedProductsProps {
  currentProductId: string;
  limit?: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  currentProductId,
  limit = 4 
}) => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  if (isLoading) {
    return <div className="p-4">Loading related products...</div>;
  }

  if (error || !products) {
    return <div className="p-4">Failed to load related products</div>;
  }

  // Filter out current product and limit the number of related products
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, limit);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="aspect-square bg-gray-100 rounded-md mb-2 overflow-hidden">
                  {product.product_images && product.product_images.length > 0 ? (
                    <img 
                      src={product.product_images[0].src} 
                      alt={product.product_images[0].alt} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                <div className="mt-1 text-sm">
                  {product.discount_price ? (
                    <div className="flex items-center">
                      <span className="font-semibold text-red-600">${product.discount_price}</span>
                      <span className="text-gray-400 line-through ml-2">${product.price}</span>
                    </div>
                  ) : (
                    <span className="font-semibold">${product.price}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
