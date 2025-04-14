
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { 
  Play,
  Pause,
  RotateCw,
  FlipHorizontal,
  ChevronLeft,
  ChevronRight,
  Share2,
  Maximize,
  Square,
  X,
  Undo2,
  Filter,
  ArrowLeft,
  Focus,
  Download,
  ArrowUpToLine
} from "lucide-react";
import { cn } from "@/lib/utils";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

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
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const [thumbnailViewMode, setThumbnailViewMode] = useState<"row" | "grid">("row");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [hoveredThumbnail, setHoveredThumbnail] = useState<number | null>(null);
  const [focusMode, setFocusMode] = useState(false);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [showCompareMode, setShowCompareMode] = useState(false);
  const [compareIndex, setCompareIndex] = useState(0);
  const [showImageInfo, setShowImageInfo] = useState(false);
  const [viewHistory, setViewHistory] = useState<number[]>([0]);
  const [imageFilter, setImageFilter] = useState<string>("none");
  const [showOtherColors, setShowOtherColors] = useState<boolean>(false);
  const [showAllControls, setShowAllControls] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"default" | "immersive">("default");

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const touchStartPosition = useRef<TouchPosition | null>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [openedThumbnailMenu, setOpenedThumbnailMenu] = useState<number | null>(null);

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
      const index = api.selectedScrollSnap();
      setCurrentIndex(index);
      setIsRotated(0);
      setIsFlipped(false);
      setZoomLevel(1);
      
      setViewHistory(prev => [...prev, index]);
    });
  }, []);

  const undoLastView = useCallback(() => {
    if (viewHistory.length > 1) {
      const newHistory = [...viewHistory];
      newHistory.pop();
      const lastIndex = newHistory[newHistory.length - 1];
      
      if (api) {
        api.scrollTo(lastIndex);
      }
      
      setViewHistory(newHistory);
    }
  }, [api, viewHistory]);

  const applyFilter = useCallback((filter: string) => {
    setImageFilter(filter);
    
    toast({
      title: "Filter Applied",
      description: `Image filter: ${filter}`,
      duration: 2000,
    });
  }, []);

  const resetEnhancements = useCallback(() => {
    setIsRotated(0);
    setIsFlipped(false);
    setZoomLevel(1);
    setImageFilter("none");
    
    toast({
      title: "Image Reset",
      description: "All image modifications have been reset",
      duration: 2000,
    });
  }, []);

  const shareImage = useCallback((index: number) => {
    const image = images[index];
    if (navigator.share) {
      navigator.share({
        title: "Check out this product image",
        text: "I found this amazing product image!",
        url: image,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(image);
      toast({
        title: "Image URL Copied",
        description: "Image link copied to clipboard for sharing",
        duration: 2000,
      });
    }
  }, [images]);

  const toggleCompareMode = useCallback(() => {
    setShowCompareMode(prev => !prev);
  }, []);

  const toggleImmersiveView = useCallback(() => {
    setViewMode(prev => prev === "default" ? "immersive" : "default");
    
    toast({
      title: viewMode === "default" ? "Immersive View" : "Default View",
      description: viewMode === "default" ? "Showing image without distractions" : "Showing standard gallery view",
      duration: 2000,
    });
  }, [viewMode]);

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

  const handleThumbnailMenuToggle = useCallback((index: number, isOpen: boolean) => {
    if (isOpen) {
      setOpenedThumbnailMenu(index);
    } else if (openedThumbnailMenu === index) {
      setOpenedThumbnailMenu(null);
    }
  }, [openedThumbnailMenu]);

  const handleMenuAction = useCallback((e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    e.preventDefault();
    action();
  }, []);

  const toggleFocusMode = useCallback(() => {
    setFocusMode(prev => !prev);
  }, [focusMode]);

  const handleImageClick = useCallback(() => {
    if (focusMode) {
      setFocusMode(false);
    } else {
      toggleFullscreen();
    }
  }, [focusMode, toggleFullscreen]);

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
  }, [autoScrollEnabled]);

  return (
    <div ref={containerRef} className="flex flex-col gap-1 bg-transparent mb-0">
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
                <div className="flex h-full w-full items-center justify-center overflow-hidden relative">
                  <img
                    ref={index === currentIndex ? imageRef : undefined}
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-contain transition-transform"
                    style={{ 
                      transform: `
                        rotate(${isRotated}deg)
                        ${isFlipped ? 'scaleX(-1)' : ''}
                        scale(${zoomLevel})
                      `,
                      transition: "transform 0.2s ease-out",
                      filter: imageFilter !== "none" ? 
                        imageFilter === "grayscale" ? "grayscale(1)" : 
                        imageFilter === "sepia" ? "sepia(0.7)" : 
                        imageFilter === "brightness" ? "brightness(1.2)" :
                        imageFilter === "contrast" ? "contrast(1.2)" : "none"
                        : "none"
                    }}
                    draggable={false}
                    onClick={handleImageClick}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className={cn(
            "absolute bottom-3 right-3 flex items-center gap-2 z-30 transition-opacity",
            focusMode && "opacity-0"
          )}>
            <Button
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white"
              onClick={handleRotate}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white"
              onClick={handleFlip}
            >
              <FlipHorizontal className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost" 
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white",
                autoScrollEnabled && "bg-primary text-white"
              )}
              onClick={toggleAutoScroll}
            >
              {autoScrollEnabled ? 
                <Pause className="h-4 w-4" /> : 
                <Play className="h-4 w-4" />
              }
            </Button>
            
            <button
              onClick={toggleFocusMode}
              className={cn(
                "h-8 w-8 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors",
                focusMode && "bg-primary text-white"
              )}
              aria-label={focusMode ? "Exit focus mode" : "Enter focus mode"}
            >
              <Focus size={16} />
            </button>
          </div>
          
          {/* Image counter moved to bottom left */}
          <div className={cn(
            "absolute bottom-3 left-3 z-30 transition-opacity",
            focusMode && "opacity-0"
          )}>
            <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </Carousel>
      </div>
      
      <div className="flex items-center gap-1.5 px-1.5 pb-1.5 overflow-x-auto scrollbar-none">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative overflow-hidden rounded-md border flex-shrink-0 transition-all",
              "w-14 h-14 cursor-pointer",
              currentIndex === index 
                ? "border-primary shadow-sm" 
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => handleThumbnailClick(index)}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            
            {currentIndex === index && (
              <div className="absolute inset-0 bg-primary/10"></div>
            )}
            
            <span className="absolute bottom-0.5 right-0.5 text-[9px] bg-black/40 text-white px-0.5 rounded">
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
                scale(${zoomLevel})
              `,
              filter: imageFilter !== "none" ? 
                imageFilter === "grayscale" ? "grayscale(1)" : 
                imageFilter === "sepia" ? "sepia(0.7)" : 
                imageFilter === "brightness" ? "brightness(1.2)" :
                imageFilter === "contrast" ? "contrast(1.2)" : "none"
                : "none"
            }}
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 border-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </Button>
              
              <div className="bg-black/40 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg">
                {currentIndex + 1} / {images.length}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 border-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full p-1.5">
              <Button
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRotate();
                }}
              >
                <RotateCw className="h-4 w-4 text-white" />
              </Button>
              
              <Button
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
              >
                <FlipHorizontal className="h-4 w-4 text-white" />
              </Button>
              
              <Button
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(currentIndex);
                }}
              >
                <Download className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;

