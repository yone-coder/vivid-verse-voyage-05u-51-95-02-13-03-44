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
  X,
  Play,
  Pause,
  RotateCw,
  FlipHorizontal,
  Sun,
  Moon,
  SlidersHorizontal,
  Camera,
  Layers,
  Grid3X3,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Slider } from "@/components/ui/slider";
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const [showControls, setShowControls] = useState(true);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRotated, setIsRotated] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
      setZoomLevel(1);
      setDragOffset({ x: 0, y: 0 });
      setIsRotated(0);
      setIsFlipped(false);
      setBrightness(100);
    });
  }, []);

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
    
    setZoomLevel(1);
    setDragOffset({ x: 0, y: 0 });
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement) {
        setZoomLevel(1);
        setDragOffset({ x: 0, y: 0 });
        setIsRotated(0);
        setIsFlipped(false);
        setBrightness(100);
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleZoom = useCallback((zoomIn: boolean) => {
    setZoomLevel(prevZoom => {
      const newZoom = zoomIn
        ? Math.min(prevZoom + 0.5, 3)
        : Math.max(prevZoom - 0.5, 1);
      
      if (newZoom === 1) {
        setDragOffset({ x: 0, y: 0 });
      }
      
      return newZoom;
    });
  }, []);

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

  const handleBrightnessChange = useCallback((value: number[]) => {
    setBrightness(value[0]);
  }, []);

  const toggleCinemaMode = useCallback(() => {
    setIsCinemaMode(prev => !prev);
    if (!isCinemaMode) {
      document.body.style.backgroundColor = "black";
      if (containerRef.current) {
        containerRef.current.style.backgroundColor = "black";
      }
    } else {
      document.body.style.backgroundColor = "";
      if (containerRef.current) {
        containerRef.current.style.backgroundColor = "";
      }
    }
  }, [isCinemaMode]);

  const toggleGrid = useCallback(() => {
    setShowGrid(prev => !prev);
  }, []);

  const toggleInfo = useCallback(() => {
    setShowInfo(prev => !prev);
  }, []);

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
        case 'r':
          handleRotate();
          break;
        case 'g':
          toggleGrid();
          break;
        case 'i':
          toggleInfo();
          break;
        case 'c':
          toggleCinemaMode();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    handleNext, 
    handlePrevious, 
    handleZoom, 
    isFullscreen, 
    toggleFullscreen, 
    zoomLevel, 
    handleRotate, 
    toggleGrid,
    toggleInfo,
    toggleCinemaMode
  ]);

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

  const shouldEnableDrag = useCallback(() => {
    return zoomLevel === 1;
  }, [zoomLevel]);

  const resetImage = useCallback(() => {
    setZoomLevel(1);
    setDragOffset({ x: 0, y: 0 });
    setIsRotated(0);
    setIsFlipped(false);
    setBrightness(100);
    toast({
      title: "Image reset",
      description: "All image modifications have been reset",
      duration: 2000,
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "flex flex-col gap-4 relative",
        isFullscreen && "fixed inset-0 bg-black z-50",
        isCinemaMode && "bg-black"
      )}
    >
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
        style={{ 
          cursor: isDragging ? "grabbing" : zoomLevel > 1 ? "grab" : "default",
          backgroundColor: isCinemaMode ? "black" : ""
        }}
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
                    className={cn(
                      "object-contain transition-transform",
                      zoomLevel === 1 ? "w-full h-full" : "max-w-none max-h-none"
                    )}
                    style={{ 
                      transform: `
                        ${zoomLevel > 1 ? `scale(${zoomLevel})` : 'scale(1)'}
                        translate(${zoomLevel > 1 ? constrainedOffset.x / zoomLevel : 0}px, ${zoomLevel > 1 ? constrainedOffset.y / zoomLevel : 0}px)
                        rotate(${isRotated}deg)
                        ${isFlipped ? 'scaleX(-1)' : ''}
                      `,
                      transition: isDragging ? "none" : "transform 0.2s ease-out",
                      filter: `brightness(${brightness}%)`,
                    }}
                    onDoubleClick={() => zoomLevel === 1 ? handleZoom(true) : setZoomLevel(1)}
                    draggable={false}
                  />
                  {showGrid && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div key={i} className="border border-white/30" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
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
          
          {showControls && (
            <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {currentIndex + 1}/{images.length}
            </div>
          )}
          
          {showInfo && showControls && (
            <div className="absolute bottom-12 left-3 bg-black/70 text-white text-xs p-3 rounded-md max-w-xs">
              <h4 className="font-medium mb-1">Image Information</h4>
              <p className="mb-1">Filename: product-image-{currentIndex + 1}.jpg</p>
              <p className="mb-1">Current Zoom: {Math.round(zoomLevel * 100)}%</p>
              <p className="mb-1">Rotation: {isRotated}°</p>
              <p className="mb-1">Flipped: {isFlipped ? 'Yes' : 'No'}</p>
              <p>Brightness: {brightness}%</p>
            </div>
          )}
          
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
          
          {zoomLevel > 1 && showControls && (
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {Math.round(zoomLevel * 100)}%
            </div>
          )}
          
          {showControls && (
            <div className={cn(
              "absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent",
              "flex justify-center gap-2 flex-wrap",
              !isFullscreen && "pb-1",
              isFullscreen && "pb-6"
            )}>
              <TooltipProvider>
                <div className="flex items-center justify-center gap-2 bg-black/50 backdrop-blur-sm p-1 rounded-full">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-transparent text-white border-none hover:bg-white/20"
                        onClick={() => handleZoom(true)}
                        disabled={zoomLevel >= 3}
                        aria-label="Zoom in"
                      >
                        <ZoomIn size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Zoom In (+)</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-transparent text-white border-none hover:bg-white/20"
                        onClick={() => handleZoom(false)}
                        disabled={zoomLevel <= 1}
                        aria-label="Zoom out"
                      >
                        <ZoomOut size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Zoom Out (-)</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-transparent text-white border-none hover:bg-white/20"
                        onClick={toggleFullscreen}
                        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                      >
                        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen (F)"}</TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex items-center justify-center gap-2 bg-black/50 backdrop-blur-sm p-1 rounded-full">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-transparent text-white border-none hover:bg-white/20"
                        onClick={handleRotate}
                        aria-label="Rotate image"
                      >
                        <RotateCw size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Rotate 90° (R)</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-transparent text-white border-none hover:bg-white/20"
                        onClick={handleFlip}
                        aria-label="Flip image"
                      >
                        <FlipHorizontal size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Flip Horizontally</TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex items-center justify-center gap-2 bg-black/50 backdrop-blur-sm p-1 rounded-full">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-transparent text-white border-none hover:bg-white/20"
                        onClick={handleDownload}
                        aria-label="Download image"
                      >
                        <Download size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download Image</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-transparent text-white border-none hover:bg-white/20"
                        onClick={handleShare}
                        aria-label="Share image"
                      >
                        <Share2 size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share Image</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "h-8 w-8 rounded-full bg-transparent border-none hover:bg-white/20",
                          isFavorite ? "text-red-500" : "text-white"
                        )}
                        onClick={toggleFavorite}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart size={16} className={isFavorite ? "fill-red-500" : ""} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex items-center justify-center gap-2 bg-black/50 backdrop-blur-sm p-1 rounded-full">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "h-8 w-8 rounded-full bg-transparent border-none hover:bg-white/20",
                          autoScrollEnabled ? "text-green-400" : "text-white"
                        )}
                        onClick={toggleAutoScroll}
                        aria-label={autoScrollEnabled ? "Disable auto-scroll" : "Enable auto-scroll"}
                      >
                        {autoScrollEnabled ? <Pause size={16} /> : <Play size={16} />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{autoScrollEnabled ? "Disable Auto-scroll" : "Enable Auto-scroll"}</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "h-8 w-8 rounded-full bg-transparent border-none hover:bg-white/20",
                          showAdvancedControls ? "text-blue-400" : "text-white"
                        )}
                        onClick={() => setShowAdvancedControls(!showAdvancedControls)}
                        aria-label={showAdvancedControls ? "Hide advanced controls" : "Show advanced controls"}
                      >
                        <SlidersHorizontal size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{showAdvancedControls ? "Hide Advanced Controls" : "Show Advanced Controls"}</TooltipContent>
                  </Tooltip>
                </div>
                
                {showAdvancedControls && (
                  <div className="flex items-center justify-center gap-2 bg-black/50 backdrop-blur-sm p-1 rounded-full">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={cn(
                            "h-8 w-8 rounded-full bg-transparent border-none hover:bg-white/20",
                            showGrid ? "text-blue-400" : "text-white"
                          )}
                          onClick={toggleGrid}
                          aria-label={showGrid ? "Hide grid" : "Show grid"}
                        >
                          <Grid3X3 size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{showGrid ? "Hide Grid" : "Show Grid (G)"}</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={cn(
                            "h-8 w-8 rounded-full bg-transparent border-none hover:bg-white/20",
                            showInfo ? "text-blue-400" : "text-white"
                          )}
                          onClick={toggleInfo}
                          aria-label={showInfo ? "Hide info" : "Show info"}
                        >
                          <Info size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{showInfo ? "Hide Info" : "Show Info (I)"}</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={cn(
                            "h-8 w-8 rounded-full bg-transparent border-none hover:bg-white/20",
                            isCinemaMode ? "text-blue-400" : "text-white"
                          )}
                          onClick={toggleCinemaMode}
                          aria-label={isCinemaMode ? "Exit cinema mode" : "Enter cinema mode"}
                        >
                          {isCinemaMode ? <Sun size={16} /> : <Moon size={16} />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{isCinemaMode ? "Exit Cinema Mode" : "Enter Cinema Mode (C)"}</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-transparent text-white border-none hover:bg-white/20"
                          onClick={resetImage}
                          aria-label="Reset image"
                        >
                          <Camera size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Reset Image</TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </TooltipProvider>
            </div>
          )}
          
          {showAdvancedControls && showControls && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/70 text-white p-2 rounded-md flex items-center gap-2 w-64">
              <Sun size={14} />
              <Slider
                value={[brightness]}
                min={50}
                max={150}
                step={5}
                onValueChange={handleBrightnessChange}
                className="w-full"
              />
              <span className="text-xs">{brightness}%</span>
            </div>
          )}
          
          {isFullscreen && showControls && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-4 py-2 rounded-full flex gap-3">
              <span>⬅️ ➡️ Navigate</span>
              <span>+/- Zoom</span>
              <span>R Rotate</span>
              <span>G Grid</span>
              <span>I Info</span>
              <span>C Cinema</span>
              <span>ESC Exit</span>
            </div>
          )}
        </Carousel>
      </div>
      
      {!isFullscreen && (
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
      )}
      
      {!isFullscreen && images.length > 1 && (
        <div className="flex items-center justify-end">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-xs flex items-center gap-1 h-8 px-2 transition-colors",
              autoScrollEnabled ? "text-primary" : "text-gray-600 hover:text-gray-900"
            )}
            onClick={toggleAutoScroll}
          >
            {autoScrollEnabled ? <Pause size={14} className="mr-1" /> : <Play size={14} className="mr-1" />}
            <span>{autoScrollEnabled ? "Stop Auto-scroll" : "Auto-scroll"}</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
