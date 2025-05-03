
import React from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";

interface ProductCarouselProps {
  category?: string;
  limit?: number;
  title?: string;
}

const ProductCarousel = ({ category, limit = 6, title = "Featured Products" }: ProductCarouselProps) => {
  const { data: products, isLoading, error } = useProducts();
  
  if (isLoading) {
    return (
      <div className="w-full py-6">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(limit).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse h-56 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !products) {
    return null;
  }
  
  const filteredProducts = category 
    ? products.filter(product => product.category === category).slice(0, limit)
    : products.slice(0, limit);
  
  return (
    <div className="w-full py-6">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {filteredProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                <ProductCard 
                  product={product}
                  showTitle={false}
                  showButton={false}
                  className="h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2" />
          <CarouselNext className="right-0 translate-x-1/2" />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
