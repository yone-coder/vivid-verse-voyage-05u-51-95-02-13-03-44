
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Set up the carousel API
  const onApiChange = (api: CarouselApi | null) => {
    if (!api) return;
    
    setApi(api);
    setCurrentIndex(api.selectedScrollSnap());
    
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  };

  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
      toast({
        title: "Image changed",
        description: `Viewing image ${index + 1} of ${images.length}`,
        duration: 2000,
      });
    }
  };

  const handlePrevious = () => {
    if (api) api.scrollPrev();
  };

  const handleNext = () => {
    if (api) api.scrollNext();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main image carousel */}
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Carousel
          className="w-full h-full"
          opts={{
            loop: true,
          }}
          setApi={onApiChange}
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
          
          {/* Custom navigation arrows */}
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none p-4">
            <button 
              onClick={handlePrevious}
              className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/50" 
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Image counter indicator */}
          <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {currentIndex + 1}/{images.length}
          </div>
        </Carousel>
      </div>
      
      {/* Thumbnail gallery */}
      <div className="flex gap-2 overflow-x-auto pb-2 px-1">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "w-16 h-16 overflow-hidden rounded border-2 flex-shrink-0 transition-all",
              currentIndex === index ? "border-primary" : "border-transparent hover:border-gray-300"
            )}
            aria-label={`View image ${index + 1}`}
            aria-current={currentIndex === index}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
