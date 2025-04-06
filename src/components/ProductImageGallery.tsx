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
  Share2,
  Maximize,
  Square,
  ImagePlus,
  Image as ImageIcon,
  PanelRight,
  X,
  Undo2,
  Filter,
  Paintbrush,
  BadgeInfo,
  View,
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

interface ProductImageGalleryProps {
  images: string[];
}

interface TouchPosition {
  x: number;
  y: number;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  // Core state
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
  
  // Enhanced features state
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
      
      // Add to view history for undo feature
      setViewHistory(prev => [...prev, index]);
    });
  }, []);

  const undoLastView = useCallback(() => {
    if (viewHistory.length > 1) {
      const newHistory = [...viewHistory];
      newHistory.pop(); // Remove current view
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
    e.stopPropagation(); // Prevent thumbnail click
    e.preventDefault(); // Prevent default behavior
    action();
  }, []);

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
            "absolute bottom-4 left-0 right-0 flex items-center justify-between px-4 z-10",
            viewMode === "immersive" && "opacity-0 hover:opacity-100 transition-opacity"
          )}>
            <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1.5 rounded-lg text-xs flex items-center gap-1.5">
              <span>{currentIndex + 1}/{images.length}</span>
              {viewHistory.length > 1 && (
                <button onClick={undoLastView} className="p-0.5 hover:bg-white/10 rounded">
                  <Undo2 size={12} />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-1.5">
              {!showAllControls ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleRotate}
                          className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
                        >
                          <RotateCw size={16} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Rotate 90°</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={toggleFavorite}
                          className={cn(
                            "bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors",
                            isFavorite && "text-red-500"
                          )}
                        >
                          <Heart size={16} className={isFavorite ? "fill-red-500" : ""} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setShowAllControls(true)}
                          className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
                        >
                          <PanelRight size={16} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>More Options</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-lg">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleRotate}
                          className="p-1 rounded-md text-white hover:bg-white/10 transition-colors"
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
                          className="p-1 rounded-md text-white hover:bg-white/10 transition-colors"
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
                            "p-1 rounded-md text-white hover:bg-white/10 transition-colors",
                            isFavorite && "text-red-500"
                          )}
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
                            "p-1 rounded-md text-white hover:bg-white/10 transition-colors",
                            autoScrollEnabled && "text-green-500"
                          )}
                        >
                          {autoScrollEnabled ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{autoScrollEnabled ? "Disable Auto-scroll" : "Enable Auto-scroll"}</TooltipContent>
                    </Tooltip>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="p-1 rounded-md text-white hover:bg-white/10 transition-colors">
                          <Filter size={14} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40 p-2">
                        <p className="text-xs font-medium mb-2">Image Filters</p>
                        <div className="flex flex-col gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={cn("justify-start h-7", imageFilter === "none" && "bg-accent")} 
                            onClick={() => applyFilter("none")}
                          >
                            Normal
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={cn("justify-start h-7", imageFilter === "grayscale" && "bg-accent")} 
                            onClick={() => applyFilter("grayscale")}
                          >
                            Grayscale
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={cn("justify-start h-7", imageFilter === "sepia" && "bg-accent")} 
                            onClick={() => applyFilter("sepia")}
                          >
                            Sepia
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={cn("justify-start h-7", imageFilter === "brightness" && "bg-accent")} 
                            onClick={() => applyFilter("brightness")}
                          >
                            Brighten
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={cn("justify-start h-7", imageFilter === "contrast" && "bg-accent")} 
                            onClick={() => applyFilter("contrast")}
                          >
                            Enhance Contrast
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={resetEnhancements}
                          className="p-1 rounded-md text-white hover:bg-white/10 transition-colors"
                        >
                          <Undo2 size={14} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Reset All</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setZoomLevel(prev => prev < 2 ? prev + 0.25 : 1)}
                          className="p-1 rounded-md text-white hover:bg-white/10 transition-colors"
                        >
                          <ZoomIn size={14} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Zoom {zoomLevel >= 2 ? "Reset" : "In"}</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => shareImage(currentIndex)}
                          className="p-1 rounded-md text-white hover:bg-white/10 transition-colors"
                        >
                          <Share2 size={14} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Share Image</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setShowAllControls(false)}
                          className="p-1 rounded-md text-white hover:bg-white/10 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Hide Controls</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          </div>

          <div className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10",
            viewMode === "immersive" && "opacity-0 hover:opacity-100 transition-opacity"
          )}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 w-8 h-8"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10",
            viewMode === "immersive" && "opacity-0 hover:opacity-100 transition-opacity"
          )}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 w-8 h-8"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className={cn(
            "absolute top-4 right-4",
            viewMode === "immersive" && "opacity-0 hover:opacity-100 transition-opacity"
          )}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 w-7 h-7"
              onClick={toggleImmersiveView}
            >
              {viewMode === "default" ? <Maximize size={13} /> : <Square size={13} />}
            </Button>
          </div>
        </Carousel>
      </div>
      
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <p className="text-xs text-gray-500 ml-1">
            {images.length} Images
          </p>
          {viewHistory.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-1.5 text-xs text-blue-600"
              onClick={undoLastView}
            >
              <Undo2 size={12} className="mr-1" />
              Undo
            </Button>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={toggleImmersiveView}
            className="flex items-center text-xs text-gray-600 hover:text-blue-600 px-1.5 py-1"
          >
            {viewMode === "default" ? <Maximize size={12} className="mr-1" /> : <Square size={12} className="mr-1" />}
            {viewMode === "default" ? "Focus" : "Normal"}
          </button>
          <button 
            onClick={toggleThumbnailViewMode}
            className="flex items-center text-xs text-gray-600 hover:text-blue-600 px-1.5 py-1"
          >
            <GalleryHorizontal className="h-3.5 w-3.5 mr-1" />
            {thumbnailViewMode === "row" ? "Grid" : "Row"}
          </button>
        </div>
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
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full bg-white/80 hover:bg-white"
                    >
                      <Eye className="h-3 w-3 text-gray-800" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="p-0 w-auto">
                    <img 
                      src={image} 
                      alt={`Preview ${index + 1}`} 
                      className="max-w-[200px] max-h-[200px] object-contain"
                    />
                  </HoverCardContent>
                </HoverCard>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full bg-white/80 hover:bg-white ml-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <View className="h-3 w-3 text-gray-800" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-40 p-1" 
                    align="center" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col gap-0.5 py-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-sm h-8 px-2 w-full"
                        onClick={(e) => handleMenuAction(e, () => handleThumbnailClick(index))}
                      >
                        <Eye className="h-4 w-4 mr-2" /> View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-sm h-8 px-2 w-full"
                        onClick={(e) => handleMenuAction(e, () => downloadImage(index))}
                      >
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-sm h-8 px-2 w-full"
                        onClick={(e) => handleMenuAction(e, () => copyImageUrl(index))}
                      >
                        {copiedIndex === index ? (
                          <Check className="h-4 w-4 mr-2 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        {copiedIndex === index ? "Copied!" : "Copy URL"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-sm h-8 px-2 w-full"
                        onClick={(e) => {
                          handleMenuAction(e, () => {
                            toggleFullscreen();
                            handleThumbnailClick(index);
                          });
                        }}
                      >
                        <ZoomIn className="h-4 w-4 mr-2" /> Fullscreen
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-sm h-8 px-2 w-full"
                        onClick={(e) => handleMenuAction(e, () => shareImage(index))}
                      >
                        <Share2 className="h-4 w-4 mr-2" /> Share
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
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
                <RotateCw className="h-4 w-4" />
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
                <FlipHorizontal className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomLevel(prev => prev < 2 ? prev + 0.25 : 1);
                }}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  resetEnhancements();
                }}
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              
              <Popover>
                <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-white/10"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-black/90 border-gray-800 text-white" onClick={(e) => e.stopPropagation()}>
                  <p className="text-xs font-medium mb-2">Image Filters</p>
                  <div className="grid grid-cols-2 gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn("justify-start h-7 text-white hover:bg-white/10", imageFilter === "none" && "bg-white/20")} 
                      onClick={() => applyFilter("none")}
                    >
                      Normal
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn("justify-start h-7 text-white hover:bg-white/10", imageFilter === "grayscale" && "bg-white/20")} 
                      onClick={() => applyFilter("grayscale")}
                    >
                      Grayscale
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn("justify-start h-7 text-white hover:bg-white/10", imageFilter === "sepia" && "bg-white/20")} 
                      onClick={() => applyFilter("sepia")}
                    >
                      Sepia
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn("justify-start h-7 text-white hover:bg-white/10", imageFilter === "brightness" && "bg-white/20")} 
                      onClick={() => applyFilter("brightness")}
                    >
                      Brighten
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn("justify-start h-7 text-white hover:bg-white/10", imageFilter === "contrast" && "bg-white/20")} 
                      onClick={() => applyFilter("contrast")}
                    >
                      Enhance
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
