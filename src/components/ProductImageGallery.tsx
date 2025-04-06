
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
  ChevronRight,
  GalleryHorizontal,
  Maximize2,
  Download,
  Share2,
  Info,
  Image as ImageIcon,
  Video,
  ArrowUpRightFromCircle,
  Badge as BadgeIcon,
  ZoomIn,
  ZoomOut,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [zoom, setZoom] = useState(1);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isAR, setIsAR] = useState(false);
  const [showImageTypes, setShowImageTypes] = useState(false);
  
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
      setZoom(1);
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

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.1, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
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
    setZoom(1);
    toast({
      title: "Image reset",
      description: "All image modifications have been reset",
      duration: 2000,
    });
  }, []);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.download = `product-image-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Image downloaded",
      description: "The image has been downloaded to your device",
      duration: 2000,
    });
  }, [currentIndex, images]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this product image",
        text: "I found this amazing product image!",
        url: images[currentIndex],
      }).catch(err => console.error("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(images[currentIndex]);
      toast({
        title: "Link copied",
        description: "Image link copied to clipboard",
        duration: 2000,
      });
    }
  }, [currentIndex, images]);

  const toggleAR = useCallback(() => {
    setIsAR(prev => !prev);
    toast({
      title: isAR ? "AR view disabled" : "AR view enabled",
      description: isAR 
        ? "Standard view restored" 
        : "Viewing in augmented reality mode",
      duration: 2000,
    });
  }, [isAR]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col gap-3"
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
                        scale(${zoom})
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
          
          <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4 z-10">
            <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1.5 rounded-lg text-xs flex items-center space-x-1">
              <ImageIcon size={14} />
              <span>{currentIndex + 1}/{images.length}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleZoomIn}
                      className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
                      aria-label="Zoom in"
                    >
                      <ZoomIn size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom In</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleZoomOut}
                      className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
                      aria-label="Zoom out"
                    >
                      <ZoomOut size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom Out</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
                      <DialogTrigger asChild>
                        <button
                          className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
                          aria-label="View fullscreen"
                        >
                          <Maximize2 size={14} />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 overflow-hidden">
                        <div className="h-[90vh] flex items-center justify-center bg-black relative">
                          <img
                            src={images[currentIndex]}
                            alt={`Fullscreen product image ${currentIndex + 1}`}
                            className="max-h-full max-w-full object-contain"
                          />
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute top-4 right-4 rounded-full"
                            onClick={() => setIsFullscreenOpen(false)}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent>View Fullscreen</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleAR}
                      className={cn(
                        "bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors",
                        isAR && "text-green-400"
                      )}
                      aria-label={isAR ? "Exit AR view" : "View in AR"}
                    >
                      <BadgeIcon size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>View in AR</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4 z-10">
            <div className="flex items-center gap-1.5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleShare}
                      className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
                      aria-label="Share image"
                    >
                      <Share2 size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Share</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleDownload}
                      className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
                      aria-label="Download image"
                    >
                      <Download size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Download</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="flex items-center gap-1.5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleRotate}
                      className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
                      aria-label="Rotate image"
                    >
                      <RotateCw size={14} />
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
                      <FlipHorizontal size={14} />
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
                      <Heart size={14} className={isFavorite ? "fill-red-500" : ""} />
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
                      {autoScrollEnabled ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{autoScrollEnabled ? "Disable Auto-scroll" : "Enable Auto-scroll"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 w-8 h-8"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 w-8 h-8"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Carousel>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-1 px-1 scrollbar-none">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "w-14 h-14 overflow-hidden rounded-md border-2 flex-shrink-0 transition-all relative",
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
