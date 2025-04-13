
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
  const [focusMode, setFocusMode] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

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

  const toggleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);
    setLikeCount(prev => isFavorite ? prev - 1 : prev + 1);
    
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
    
    toast({
      title: focusMode ? "Normal view" : "Focus mode",
      description: focusMode ? "Showing all controls" : "Distraction-free viewing mode",
      duration: 2000,
    });
  }, [focusMode]);

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
                    onClick={toggleFullscreen}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10",
            viewMode === "immersive" && "opacity-0 hover:opacity-100 transition-opacity",
            focusMode && "opacity-0 hover:opacity-100 transition-opacity duration-200"
          )}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 border-gray-200/10 shadow-sm h-9 w-9"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-5 w-5 text-white" />
              <span className="sr-only">Previous slide</span>
            </Button>
          </div>
          
          <div className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10",
            viewMode === "immersive" && "opacity-0 hover:opacity-100 transition-opacity",
            focusMode && "opacity-0 hover:opacity-100 transition-opacity duration-200"
          )}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 border-gray-200/10 shadow-sm h-9 w-9"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5 text-white" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </Carousel>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full p-1.5 z-30">
          <Button
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-white/10"
            onClick={handleRotate}
          >
            <RotateCw className="h-4 w-4 text-white" />
          </Button>
          
          <Button
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-white/10"
            onClick={handleFlip}
          >
            <FlipHorizontal className="h-4 w-4 text-white" />
          </Button>
          
          <Button
            variant="ghost" 
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full hover:bg-white/10",
              autoScrollEnabled && "bg-white/20"
            )}
            onClick={toggleAutoScroll}
          >
            {autoScrollEnabled ? 
              <Pause className="h-4 w-4 text-white" /> : 
              <Play className="h-4 w-4 text-white" />
            }
          </Button>
          
          <div className="relative">
            <Button
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-white/10"
              onClick={toggleFavorite}
            >
              <Heart className={cn("h-4 w-4 text-white", isFavorite && "fill-red-500")} />
            </Button>
            {likeCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 min-w-[16px] flex items-center justify-center px-1">
                {likeCount > 999 ? '999+' : likeCount}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleImmersiveView();
          }}
          className={cn(
            "absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/80 transition-colors z-30",
            focusMode && "bg-primary text-white",
            focusMode && "opacity-0 hover:opacity-100 transition-opacity"
          )}
        >
          {viewMode === "default" ? <Maximize size={16} /> : <Square size={16} />}
        </button>
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
                  toggleFavorite();
                }}
              >
                <Heart className={cn("h-4 w-4 text-white", isFavorite && "fill-red-500")} />
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
