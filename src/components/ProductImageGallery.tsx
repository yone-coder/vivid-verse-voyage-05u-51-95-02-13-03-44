
import React, { useState, useCallback, useRef } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Fullscreen, 
  Image as ImageIcon,
  ArrowLeft,
  ArrowRight,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoveredThumbnail, setHoveredThumbnail] = useState<number | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleApiChange = (api: any) => {
    if (api) {
      setCurrentIndex(api.selectedScrollSnap());
      // Reset zoom and position when changing images
      if (isZoomed) {
        setIsZoomed(false);
        setZoomLevel(100);
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  const handleThumbnailClick = (index: number) => {
    if (containerRef.current) {
      const carousel = containerRef.current.querySelector('[data-embla-container="true"]');
      if (carousel && typeof (carousel as any).scrollTo === 'function') {
        (carousel as any).scrollTo(index);
      }
      setCurrentIndex(index);
    }
  };

  const toggleZoom = () => {
    if (isZoomed) {
      // Reset zoom
      setIsZoomed(false);
      setZoomLevel(100);
      setPosition({ x: 0, y: 0 });
    } else {
      // Zoom in
      setIsZoomed(true);
      setZoomLevel(200);
      setPosition({ x: 0, y: 0 });
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const resetZoom = () => {
    setIsZoomed(false);
    setZoomLevel(100);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomChange = (newValue: number[]) => {
    setZoomLevel(newValue[0]);
    setIsZoomed(newValue[0] > 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    setIsPanning(true);
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isZoomed) return;
    setIsPanning(true);
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || !isZoomed) return;
    setPosition(prev => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY
    }));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPanning || !isZoomed) return;
    const deltaX = e.touches[0].clientX - touchStart.x;
    const deltaY = e.touches[0].clientY - touchStart.y;
    
    setPosition(prev => ({
      x: prev.x + deltaX / 5, // Reduced sensitivity for touch
      y: prev.y + deltaY / 5
    }));
    
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
  };

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    if (!isZoomed) {
      setShowControls(true);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        if (isZoomed) resetZoom();
        break;
      case 'ArrowLeft':
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
        break;
      case 'ArrowRight':
        if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
        break;
      case '+':
        if (zoomLevel < 300) setZoomLevel(prev => Math.min(prev + 25, 300));
        setIsZoomed(true);
        break;
      case '-':
        if (zoomLevel > 100) setZoomLevel(prev => Math.max(prev - 25, 100));
        if (zoomLevel <= 125) setIsZoomed(false);
        break;
      default:
        break;
    }
  }, [currentIndex, images.length, isZoomed, zoomLevel]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-square bg-gray-100 overflow-hidden",
        isFullscreen && "fixed inset-0 z-50 h-screen w-screen bg-black"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={cn(
          "relative w-full h-full transition-all duration-200 ease-out",
          isZoomed && "cursor-move"
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Carousel
          className="w-full h-full"
          opts={{
            loop: true,
            dragFree: !isZoomed,
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
                <div className="flex h-full w-full items-center justify-center overflow-hidden">
                  <img
                    ref={index === currentIndex ? imageRef : undefined}
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className={cn(
                      "w-full h-full object-contain transition-transform duration-200",
                      isZoomed && "cursor-move"
                    )}
                    style={{
                      transform: isZoomed ? `scale(${zoomLevel / 100}) translate(${position.x}px, ${position.y}px)` : 'none',
                    }}
                    draggable={false}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {!isZoomed && showControls && (
            <>
              <CarouselPrevious className="left-4 h-10 w-10 rounded-full opacity-70 transition-opacity hover:opacity-100" />
              <CarouselNext className="right-4 h-10 w-10 rounded-full opacity-70 transition-opacity hover:opacity-100" />
            </>
          )}
        </Carousel>
      </div>

      {/* Image counter indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full z-10">
        {currentIndex + 1}/{images.length}
      </div>

      {/* Controls Overlay */}
      {showControls && (
        <div className={cn(
          "absolute bottom-4 right-4 flex gap-2 z-10 transition-opacity duration-200",
          isFullscreen ? "opacity-60 hover:opacity-100" : ""
        )}>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70"
            onClick={toggleZoom}
          >
            {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
          </Button>
          
          {isZoomed && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70"
              onClick={resetZoom}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <X className="h-4 w-4" /> : <Fullscreen className="h-4 w-4" />}
          </Button>
        </div>
      )}

      {/* Zoom slider in fullscreen mode */}
      {isFullscreen && isZoomed && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 p-2 rounded-full z-10">
          <ZoomOut className="h-4 w-4 text-white" />
          <Slider
            className="w-40"
            defaultValue={[100]}
            value={[zoomLevel]}
            min={100}
            max={300}
            step={10}
            onValueChange={handleZoomChange}
          />
          <ZoomIn className="h-4 w-4 text-white" />
        </div>
      )}

      {/* Thumbnails */}
      <div className={cn(
        "absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-sm transition-transform duration-300 z-10",
        isFullscreen ? "py-3" : "py-2",
        isZoomed ? "translate-y-full" : "translate-y-0"
      )}>
        <div className="flex justify-center px-4 items-center gap-1 max-w-full overflow-x-auto no-scrollbar">
          {images.map((thumb, idx) => (
            <div
              key={idx}
              className={cn(
                "relative cursor-pointer transition-all duration-200 rounded-sm overflow-hidden",
                currentIndex === idx ? "opacity-100 ring-2 ring-white" : "opacity-70 hover:opacity-100",
                isFullscreen ? "w-16 h-16" : "w-12 h-12"
              )}
              onClick={() => handleThumbnailClick(idx)}
              onMouseEnter={() => setHoveredThumbnail(idx)}
              onMouseLeave={() => setHoveredThumbnail(null)}
            >
              <img
                src={thumb}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {hoveredThumbnail === idx && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <ImageIcon className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen navigation buttons */}
      {isFullscreen && (
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/30 border-white/20 text-white hover:bg-black/50 pointer-events-auto"
            onClick={() => handleThumbnailClick(currentIndex > 0 ? currentIndex - 1 : images.length - 1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/30 border-white/20 text-white hover:bg-black/50 pointer-events-auto"
            onClick={() => handleThumbnailClick(currentIndex < images.length - 1 ? currentIndex + 1 : 0)}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Exit fullscreen button */}
      {isFullscreen && (
        <Button
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 bg-black/50 border-white/20 text-white hover:bg-black/70 z-50"
          onClick={toggleFullscreen}
        >
          <X className="h-4 w-4 mr-1" />
          Exit Fullscreen
        </Button>
      )}
    </div>
  );
};

export default ProductImageGallery;
