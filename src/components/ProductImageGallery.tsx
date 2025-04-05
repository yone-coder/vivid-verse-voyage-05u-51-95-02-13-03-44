
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Share2, 
  Heart, 
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const [showControls, setShowControls] = useState(true);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  // Preload images for smoother navigation
  useEffect(() => {
    const preloadImages = async () => {
      const preloaded = await Promise.all(
        images.map((src) => {
          return new Promise<string>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(src);
            img.onerror = () => resolve(src); // Still resolve on error to not block
          });
        })
      );
      setPreloadedImages(preloaded);
    };
    
    preloadImages();
  }, [images]);

  // Set up the carousel API
  const onApiChange = useCallback((api: CarouselApi | null) => {
    if (!api) return;
    
    setApi(api);
    setCurrentIndex(api.selectedScrollSnap());
    
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
      // Reset zoom when changing images
      setZoomLevel(1);
      setDragOffset({ x: 0, y: 0 });
    });
  }, []);

  // Handle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
    
    // Reset zoom when toggling fullscreen
    setZoomLevel(1);
    setDragOffset({ x: 0, y: 0 });
  }, [isFullscreen]);

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement) {
        setZoomLevel(1);
        setDragOffset({ x: 0, y: 0 });
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle zoom
  const handleZoom = useCallback((zoomIn: boolean) => {
    setZoomLevel(prevZoom => {
      const newZoom = zoomIn
        ? Math.min(prevZoom + 0.5, 3)
        : Math.max(prevZoom - 0.5, 1);
      
      // Reset drag offset when zooming out to 1
      if (newZoom === 1) {
        setDragOffset({ x: 0, y: 0 });
      }
      
      return newZoom;
    });
  }, []);

  // Handle image dragging when zoomed
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
    }
  }, [zoomLevel]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && zoomLevel > 1) {
      setDragOffset(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    }
  }, [isDragging, zoomLevel]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle touch events for mobile dragging when zoomed
  const touchStartPosition = useRef<{ x: number, y: number } | null>(null);
  
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (zoomLevel > 1 && e.touches.length === 1) {
      touchStartPosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  }, [zoomLevel]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (zoomLevel > 1 && touchStartPosition.current && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - touchStartPosition.current.x;
      const deltaY = e.touches[0].clientY - touchStartPosition.current.y;
      
      setDragOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      touchStartPosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  }, [zoomLevel]);

  const handleTouchEnd = useCallback(() => {
    touchStartPosition.current = null;
  }, []);

  // Handle download image
  const handleDownload = useCallback(() => {
    if (images.length <= currentIndex) return;
    
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.download = `product-image-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Image downloaded",
      description: "The image has been saved to your device",
      duration: 2000,
    });
  }, [currentIndex, images]);

  // Handle share image
  const handleShare = useCallback(() => {
    if (images.length <= currentIndex) return;
    
    if (navigator.share) {
      navigator.share({
        title: "Product Image",
        text: "Check out this product image!",
        url: images[currentIndex]
      }).catch(err => {
        console.error("Error sharing:", err);
      });
    } else {
      navigator.clipboard.writeText(images[currentIndex]);
      toast({
        title: "Link copied!",
        description: "Image link copied to clipboard",
        duration: 2000,
      });
    }
  }, [currentIndex, images]);

  // Handle favorite toggle
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

  // Handle thumbnail click
  const handleThumbnailClick = useCallback((index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  }, [api]);

  // Navigation functions
  const handlePrevious = useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  // Auto-hide controls on inactivity
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      if (isFullscreen) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isFullscreen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          if (zoomLevel > 1) {
            setZoomLevel(1);
            setDragOffset({ x: 0, y: 0 });
          } else if (isFullscreen) {
            toggleFullscreen();
          }
          break;
        case '+':
          handleZoom(true);
          break;
        case '-':
          handleZoom(false);
          break;
        case 'f':
          toggleFullscreen();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrevious, handleZoom, isFullscreen, toggleFullscreen, zoomLevel]);

  // Auto scroll setup
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

  // Toggle auto scroll
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

  // Calculate constrained drag offset for zoom
  const constrainDragOffset = useCallback(() => {
    if (!imageRef.current || !containerRef.current) return dragOffset;
    
    const imageWidth = imageRef.current.naturalWidth * zoomLevel;
    const imageHeight = imageRef.current.naturalHeight * zoomLevel;
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    const maxOffsetX = Math.max(0, (imageWidth - containerWidth) / 2);
    const maxOffsetY = Math.max(0, (imageHeight - containerHeight) / 2);
    
    return {
      x: Math.max(-maxOffsetX, Math.min(maxOffsetX, dragOffset.x)),
      y: Math.max(-maxOffsetY, Math.min(maxOffsetY, dragOffset.y)),
    };
  }, [dragOffset, zoomLevel]);

  const constrainedOffset = constrainDragOffset();

  // Function to determine if carousel should be draggable
  const shouldEnableDrag = useCallback(() => {
    return zoomLevel === 1;
  }, [zoomLevel]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "flex flex-col gap-4 relative",
        isFullscreen && "fixed inset-0 bg-black z-50"
      )}
    >
      {/* Main image carousel */}
      <div 
        className={cn(
          "relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden",
          isFullscreen && "w-full h-full aspect-auto rounded-none"
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? "grabbing" : zoomLevel > 1 ? "grab" : "default" }}
      >
        <Carousel
          className="w-full h-full"
          opts={{
            loop: true,
            // Fix: The 'draggable' property is removed from opts and handled by the Carousel component itself
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
                    className={cn(
                      "object-contain transition-transform",
                      zoomLevel === 1 ? "w-full h-full" : "max-w-none max-h-none"
                    )}
                    style={{ 
                      transform: zoomLevel > 1 
                        ? `scale(${zoomLevel}) translate(${constrainedOffset.x / zoomLevel}px, ${constrainedOffset.y / zoomLevel}px)` 
                        : "none",
                      transition: isDragging ? "none" : "transform 0.2s ease-out"
                    }}
                    onDoubleClick={() => zoomLevel === 1 ? handleZoom(true) : setZoomLevel(1)}
                    draggable={false}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Custom navigation arrows */}
          {showControls && (
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none p-4">
              <button 
                onClick={handlePrevious}
                className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Previous image"
              >
                <ChevronLeft size={isMobile ? 16 : 20} />
              </button>
              <button 
                onClick={handleNext}
                className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/50" 
                aria-label="Next image"
              >
                <ChevronRight size={isMobile ? 16 : 20} />
              </button>
            </div>
          )}
          
          {/* Image counter indicator */}
          {showControls && (
            <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {currentIndex + 1}/{images.length}
            </div>
          )}
          
          {/* Image controls */}
          {showControls && (
            <div className="absolute top-3 right-3 flex flex-row gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white border-none hover:bg-black/70"
                onClick={() => handleZoom(true)}
                disabled={zoomLevel >= 3}
                aria-label="Zoom in"
              >
                <ZoomIn size={16} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white border-none hover:bg-black/70"
                onClick={() => handleZoom(false)}
                disabled={zoomLevel <= 1}
                aria-label="Zoom out"
              >
                <ZoomOut size={16} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white border-none hover:bg-black/70"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white border-none hover:bg-black/70"
                onClick={handleDownload}
                aria-label="Download image"
              >
                <Download size={16} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white border-none hover:bg-black/70"
                onClick={handleShare}
                aria-label="Share image"
              >
                <Share2 size={16} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white border-none hover:bg-black/70"
                onClick={toggleFavorite}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart 
                  size={16} 
                  className={isFavorite ? "fill-red-500 text-red-500" : ""} 
                />
              </Button>
            </div>
          )}
          
          {/* Fullscreen close button */}
          {isFullscreen && showControls && (
            <Button
              variant="outline"
              size="icon"
              className="absolute top-3 left-3 h-8 w-8 rounded-full bg-black/50 text-white border-none hover:bg-black/70"
              onClick={toggleFullscreen}
              aria-label="Exit fullscreen"
            >
              <X size={16} />
            </Button>
          )}
          
          {/* Zoom level indicator */}
          {zoomLevel > 1 && showControls && (
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {Math.round(zoomLevel * 100)}%
            </div>
          )}
        </Carousel>
      </div>
      
      {/* Advanced Instructions (only visible in fullscreen) */}
      {isFullscreen && showControls && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-4 py-2 rounded-full flex gap-3">
          <span>⬅️ ➡️ Navigate</span>
          <span>+/- Zoom</span>
          <span>ESC Exit</span>
          <span>F Toggle fullscreen</span>
        </div>
      )}
      
      {/* Thumbnail gallery (not shown in fullscreen) */}
      {!isFullscreen && (
        <div className="flex gap-2 overflow-x-auto pb-2 px-1">
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
      )}
      
      {/* Auto-scroll toggle (not shown in fullscreen) */}
      {!isFullscreen && images.length > 1 && (
        <div className="flex items-center justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs flex items-center gap-1 h-8 px-2 text-gray-600 hover:text-gray-900"
            onClick={toggleAutoScroll}
          >
            <span>{autoScrollEnabled ? "Disable" : "Enable"} Auto-scroll</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;

