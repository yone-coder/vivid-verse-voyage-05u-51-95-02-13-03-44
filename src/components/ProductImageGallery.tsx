import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { 
  Heart, 
  Play,
  Pause,
  RotateCw,
  FlipHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductImageGalleryProps {
  images: string[];
}

interface TouchPosition {
  x: number;
  y: number;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isRotated, setIsRotated] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const touchStartPosition = useRef<TouchPosition | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const preloadImages = async () => {
      const preloaded = await Promise.all(
        images.map((src) => {
          return new Promise<string>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(src);
            img.onerror = () => resolve(src);
          });
        })
      );
      setPreloadedImages(preloaded);
    };
    
    preloadImages();
  }, [images]);

  const onApiChange = useCallback((api: CarouselApi | null) => {
    if (!api) return;
    
    setApi(api);
    setCurrentIndex(api.selectedScrollSnap());
    
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
      setIsRotated(0);
      setIsFlipped(false);
    });
  }, []);

  const toggleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? "Image removed from your saved collection" 
        : "Image saved to your collection",
      duration: 2000,
    });
  }, [isFavorite]);

  const handleThumbnailClick = useCallback((index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  }, [api]);

  const handlePrevious = useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  const handleRotate = useCallback(() => {
    setIsRotated(prev => (prev + 90) % 360);
  }, []);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  useEffect(() => {
    if (autoScrollEnabled && api) {
      const interval = setInterval(() => {
        api.scrollNext();
      }, 3000);
      
      setAutoScrollInterval(interval);
      
      return () => {
        clearInterval(interval);
      };
    } else if (!autoScrollEnabled && autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollInterval(null);
    }
    
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, [autoScrollEnabled, api]);

  const toggleAutoScroll = useCallback(() => {
    setAutoScrollEnabled(prev => !prev);
    toast({
      title: autoScrollEnabled ? "Auto-scroll disabled" : "Auto-scroll enabled",
      description: autoScrollEnabled 
        ? "Images will no longer scroll automatically" 
        : "Images will scroll automatically every 3 seconds",
      duration: 2000,
    });
  }, [autoScrollEnabled]);

  const resetImage = useCallback(() => {
    setIsRotated(0);
    setIsFlipped(false);
    toast({
      title: "Image reset",
      description: "All image modifications have been reset",
      duration: 2000,
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col gap-4 relative"
    >
      <div 
        className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden"
      >
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
                <div className="flex h-full w-full items-center justify-center overflow-hidden">
                  <img
                    ref={index === currentIndex ? imageRef : undefined}
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-contain transition-transform"
                    style={{ 
                      transform: `
                        rotate(${isRotated}deg)
                        ${isFlipped ? 'scaleX(-1)' : ''}
                      `,
                      transition: "transform 0.2s ease-out",
                    }}
                    draggable={false}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
            <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1.5 rounded-lg text-xs">
              {currentIndex + 1}/{images.length}
            </div>
            
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleRotate}
                      className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
                      aria-label="Rotate image"
                    >
                      <RotateCw size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Rotate 90°</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleFlip}
                      className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
                      aria-label="Flip image"
                    >
                      <FlipHorizontal size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Flip Horizontally</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleFavorite}
                      className={cn(
                        "bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors",
                        isFavorite && "text-red-500"
                      )}
                      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart size={16} className={isFavorite ? "fill-red-500" : ""} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleAutoScroll}
                      className={cn(
                        "bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors",
                        autoScrollEnabled && "text-green-500"
                      )}
                      aria-label={autoScrollEnabled ? "Disable auto-scroll" : "Enable auto-scroll"}
                    >
                      {autoScrollEnabled ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{autoScrollEnabled ? "Disable Auto-scroll" : "Enable Auto-scroll"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrevious}
                className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={handleNext}
                className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </Carousel>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-none">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "w-16 h-16 overflow-hidden rounded-md border-2 flex-shrink-0 transition-all relative",
              currentIndex === index 
                ? "border-primary ring-2 ring-primary/20" 
                : "border-transparent hover:border-gray-300"
            )}
            aria-label={`View image ${index + 1}`}
            aria-current={currentIndex === index}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            {currentIndex === index && (
              <div className="absolute inset-0 bg-primary/10"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
