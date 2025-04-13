
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  Grid,
  Maximize,
  RotateCw,
  Square,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  // Core state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isRotated, setIsRotated] = useState(0);
  const [viewHistory, setViewHistory] = useState<number[]>([0]);
  const [thumbnailViewMode, setThumbnailViewMode] = useState<"row" | "grid">("row");
  const [viewMode, setViewMode] = useState<"default" | "immersive">("default");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Simplified state
  const [hoveredThumbnail, setHoveredThumbnail] = useState<number | null>(null);

  const onApiChange = useCallback((api: CarouselApi | null) => {
    if (!api) return;
    
    setApi(api);
    setCurrentIndex(api.selectedScrollSnap());
    
    api.on("select", () => {
      const index = api.selectedScrollSnap();
      setCurrentIndex(index);
      setIsRotated(0);
      
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

  const toggleImmersiveView = useCallback(() => {
    setViewMode(prev => prev === "default" ? "immersive" : "default");
    
    toast({
      title: viewMode === "default" ? "Immersive View" : "Default View",
      description: viewMode === "default" ? "Showing image without distractions" : "Showing standard gallery view",
      duration: 2000,
    });
  }, [viewMode]);

  const toggleThumbnailViewMode = useCallback(() => {
    setThumbnailViewMode(prev => prev === "row" ? "grid" : "row");
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-1 bg-gray-50 mb-0">
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
                      transform: `rotate(${isRotated}deg)`,
                      transition: "transform 0.2s ease-out",
                    }}
                    draggable={false}
                  />
                  
                  {/* Focus button moved directly onto the image */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleImmersiveView();
                    }}
                    className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/80 transition-colors z-30"
                  >
                    {viewMode === "default" ? <Maximize size={16} /> : <Square size={16} />}
                  </button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                size="icon"
                className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/60 border-0 text-white h-7 w-7 p-0"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          
          <div className={cn(
            "absolute bottom-4 right-0 px-4 z-10 flex items-center justify-end",
            viewMode === "immersive" && "opacity-0 hover:opacity-100 transition-opacity"
          )}>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleRotate}
                className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white hover:bg-black/60 transition-colors"
              >
                <RotateCw size={16} />
              </button>
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
        </Carousel>
      </div>
      
      {/* Simplified thumbnail header with image counter, undo button and grid toggle */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">{currentIndex + 1}/{images.length}</span>
          
          {viewHistory.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-blue-600"
              onClick={undoLastView}
            >
              <Undo2 size={16} className="mr-1" />
              Undo
            </Button>
          )}
        </div>
        
        {/* Grid/Row layout toggle */}
        <Button 
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-blue-600"
          onClick={toggleThumbnailViewMode}
        >
          <Grid className="h-4 w-4 mr-1" />
          Grid
        </Button>
      </div>
      
      {/* Simplified thumbnails section */}
      <div 
        className={cn(
          "mb-2 px-4",
          thumbnailViewMode === "row" 
            ? "flex gap-2 overflow-x-auto pb-2 scrollbar-none" 
            : "grid grid-cols-4 gap-2"
        )}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative rounded-md border overflow-hidden cursor-pointer",
              thumbnailViewMode === "row" ? "w-16 h-16 flex-shrink-0" : "aspect-square",
              currentIndex === index 
                ? "border-primary" 
                : "border-gray-200"
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
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Eye className="h-4 w-4 text-white" />
              </div>
            )}
            
            <span className="absolute bottom-0.5 right-0.5 text-[10px] bg-black/40 text-white px-1 rounded">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
