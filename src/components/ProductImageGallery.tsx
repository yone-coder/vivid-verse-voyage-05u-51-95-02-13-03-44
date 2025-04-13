
import React, { useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onApiChange = useCallback((api: CarouselApi | null) => {
    if (!api) return;
    
    setApi(api);
    setCurrentIndex(api.selectedScrollSnap());
    
    api.on("select", () => {
      const index = api.selectedScrollSnap();
      setCurrentIndex(index);
    });
  }, []);

  const handlePrevious = useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  const handleThumbnailClick = useCallback((index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  }, [api]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
    
    if (!isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isFullscreen]);

  return (
    <div className="flex flex-col gap-3 bg-white">
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden rounded-md">
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
                    className="w-full h-full object-contain transition-all"
                    onClick={toggleFullscreen}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute top-2 right-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full bg-white/80 hover:bg-white shadow-sm"
              onClick={toggleFullscreen}
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </Carousel>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-1 px-1 scrollbar-none">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative overflow-hidden rounded-md border-2 w-14 h-14 flex-shrink-0 cursor-pointer transition-all",
              currentIndex === index 
                ? "border-primary" 
                : "border-transparent hover:border-gray-200",
            )}
            onClick={() => handleThumbnailClick(index)}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            
            {currentIndex === index && (
              <div className="absolute inset-0 bg-primary/5"></div>
            )}
          </div>
        ))}
      </div>
      
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={toggleFullscreen}
        >
          <button 
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
            onClick={toggleFullscreen}
          >
            ×
          </button>
          
          <img 
            src={images[currentIndex]} 
            alt={`Product fullscreen image ${currentIndex + 1}`} 
            className="max-w-[90%] max-h-[90%] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/20 hover:bg-white/40"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="bg-white/20 text-white px-3 py-1 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/20 hover:bg-white/40"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
