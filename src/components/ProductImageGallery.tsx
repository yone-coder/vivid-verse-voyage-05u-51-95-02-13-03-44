
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
  Download,
  Copy,
  ZoomIn,
  Eye,
  ArrowUpToLine,
  Check,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [thumbnailViewMode, setThumbnailViewMode] = useState<"row" | "grid">("row");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [hoveredThumbnail, setHoveredThumbnail] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const touchStartPosition = useRef<TouchPosition | null>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
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

  const downloadImage = useCallback((index: number) => {
    const image = images[index];
    const link = document.createElement('a');
    link.href = image;
    link.download = `product-image-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Image downloaded",
      description: `Image ${index + 1} has been downloaded`,
      duration: 2000,
    });
  }, [images]);

  const copyImageUrl = useCallback((index: number) => {
    const image = images[index];
    navigator.clipboard.writeText(image);
    
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    
    toast({
      title: "Image URL copied",
      description: "Image URL has been copied to clipboard",
      duration: 2000,
    });
  }, [images]);

  const toggleThumbnailViewMode = useCallback(() => {
    setThumbnailViewMode(prev => prev === "row" ? "grid" : "row");
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreenMode(prev => !prev);
    
    if (!isFullscreenMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isFullscreenMode]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreenMode) {
        toggleFullscreen();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullscreenMode, toggleFullscreen]);

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
                        rotate(${isRotated}deg)
                        ${isFlipped ? 'scaleX(-1)' : ''}
                      `,
                      transition: "transform 0.2s ease-out",
                    }}
                    draggable={false}
                    onClick={toggleFullscreen}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4 z-10">
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
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleFullscreen}
                      className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
                      aria-label="View fullscreen"
                    >
                      <ZoomIn size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Fullscreen View</TooltipContent>
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
      
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-gray-500 ml-1">
          {images.length} Images
        </p>
        <button 
          onClick={toggleThumbnailViewMode}
          className="flex items-center text-xs text-blue-600 hover:text-blue-800"
        >
          <GalleryHorizontal className="h-3.5 w-3.5 mr-1" />
          {thumbnailViewMode === "row" ? "Grid View" : "Row View"}
        </button>
      </div>
      
      <div 
        className={cn(
          "transition-all duration-300",
          thumbnailViewMode === "row" 
            ? "flex gap-2 overflow-x-auto pb-1 px-1 scrollbar-none" 
            : "grid grid-cols-4 gap-2 pb-1 px-1"
        )}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative overflow-hidden rounded-md border-2 flex-shrink-0 transition-all",
              thumbnailViewMode === "row" ? "w-14 h-14" : "aspect-square",
              currentIndex === index 
                ? "border-primary ring-2 ring-primary/20" 
                : "border-transparent hover:border-gray-300",
              "group cursor-pointer",
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
            
            {hoveredThumbnail === index && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full bg-white/80 hover:bg-white"
                    >
                      <Eye className="h-3 w-3 text-gray-800" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-40">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      handleThumbnailClick(index);
                    }}>
                      <Eye className="h-4 w-4 mr-2" /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(index);
                    }}>
                      <Download className="h-4 w-4 mr-2" /> Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      copyImageUrl(index);
                    }}>
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copiedIndex === index ? "Copied!" : "Copy URL"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                      handleThumbnailClick(index);
                    }}>
                      <ZoomIn className="h-4 w-4 mr-2" /> Fullscreen
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            <span className="absolute bottom-0.5 right-0.5 text-[10px] bg-black/40 text-white px-1 rounded">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
      
      {isFullscreenMode && (
        <div 
          ref={fullscreenRef}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center animate-fade-in"
          onClick={toggleFullscreen}
        >
          <button 
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            onClick={toggleFullscreen}
          >
            <ArrowUpToLine className="h-5 w-5" />
          </button>
          
          <img 
            src={images[currentIndex]} 
            alt={`Product fullscreen image ${currentIndex + 1}`} 
            className="max-w-[90%] max-h-[90%] object-contain"
            style={{ 
              transform: `
                rotate(${isRotated}deg)
                ${isFlipped ? 'scaleX(-1)' : ''}
              `,
            }}
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
