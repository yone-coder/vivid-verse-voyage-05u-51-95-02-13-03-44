
import React, { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { 
  Heart, 
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Share2,
  Maximize,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { useNavigate } from "react-router-dom";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  // Core state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredThumbnail, setHoveredThumbnail] = useState<number | null>(null);
  
  const isMobile = useIsMobile();
  const navigate = useNavigate();

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
    
    api.on("select", () => {
      const index = api.selectedScrollSnap();
      setCurrentIndex(index);
    });
  }, []);

  const toggleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? "Item removed from your wishlist" 
        : "Item added to your wishlist",
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

  const shareImage = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this product",
        text: "I found this amazing product!",
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Product link copied to clipboard",
        duration: 2000,
      });
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
    
    if (!isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isFullscreen]);

  return (
    <div className="flex flex-col gap-2 bg-white">
      <div className="relative w-full aspect-square overflow-hidden">
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
                    className="w-full h-full object-contain cursor-zoom-in"
                    onClick={toggleFullscreen}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <Button 
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs">
              {currentIndex + 1}/{images.length}
            </div>
          </div>
          
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full bg-white/80 backdrop-blur-sm hover:bg-white h-8 w-8",
                isFavorite && "text-red-500"
              )}
              onClick={toggleFavorite}
            >
              <Heart className={cn("h-4 w-4", isFavorite && "fill-red-500")} />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white h-8 w-8"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white w-8 h-8"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white w-8 h-8"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Carousel>
      </div>
      
      <div className="flex gap-2 overflow-x-auto px-2 pb-2 scrollbar-thin">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative overflow-hidden rounded-md border-2 flex-shrink-0 w-16 h-16 transition-all",
              currentIndex === index 
                ? "border-primary ring-1 ring-primary/20" 
                : "border-transparent hover:border-gray-300",
              "cursor-pointer",
            )}
            onClick={() => handleThumbnailClick(index)}
            onMouseEnter={() => setHoveredThumbnail(index)}
            onMouseLeave={() => setHoveredThumbnail(null)}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            
            {currentIndex === index && (
              <div className="absolute inset-0 bg-primary/10"></div>
            )}
          </div>
        ))}
      </div>
      
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={toggleFullscreen}
        >
          <Button 
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 z-10 rounded-full bg-white/20 hover:bg-white/40 h-9 w-9"
            onClick={toggleFullscreen}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
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
            
            <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg">
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
