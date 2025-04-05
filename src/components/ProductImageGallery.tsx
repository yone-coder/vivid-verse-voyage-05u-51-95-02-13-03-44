
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Custom handler to work with the Carousel component's API
  const handleApiChange = (api: any) => {
    if (api) {
      setCurrentIndex(api.selectedScrollSnap());
    }
  };

  return (
    <div className="relative w-full aspect-square bg-gray-100">
      <Carousel
        className="w-full h-full"
        opts={{
          loop: true,
        }}
        setApi={(api) => {
          if (api) {
            api.on("select", () => handleApiChange(api));
          }
        }}
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="flex h-full w-full items-center justify-center">
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Hide the default arrows from the main view */}
        <div className="hidden">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
      
      {/* Compact navigation controls in the bottom right */}
      <div className="absolute bottom-3 right-3 flex items-center space-x-2 bg-black/50 rounded-full px-2 py-1">
        <button 
          onClick={() => document.querySelector<HTMLButtonElement>('[data-carousel-prev]')?.click()}
          className="text-white hover:text-gray-200 transition-colors focus:outline-none"
          aria-label="Previous image"
        >
          <ChevronLeft size={16} />
        </button>
        <button 
          onClick={() => document.querySelector<HTMLButtonElement>('[data-carousel-next]')?.click()}
          className="text-white hover:text-gray-200 transition-colors focus:outline-none"
          aria-label="Next image"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      
      {/* Image counter indicator moved to bottom left */}
      <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
};

export default ProductImageGallery;
