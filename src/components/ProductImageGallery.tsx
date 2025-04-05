
import React, { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  ZoomIn, 
  ZoomOut, 
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  
  // Handle fullscreen toggling
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setIsZoomed(false);
    setZoomScale(1);
  };
  
  // Handle zoom toggling
  const toggleZoom = () => {
    if (isZoomed) {
      setIsZoomed(false);
      setZoomScale(1);
    } else {
      setIsZoomed(true);
      setZoomScale(2);
    }
  };
  
  // Handle thumbnail selection
  const handleThumbnailSelect = (index: number) => {
    setCurrentIndex(index);
    setIsZoomed(false);
    setZoomScale(1);
  };
  
  // Navigate to previous image
  const prevImage = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
    setZoomScale(1);
  };
  
  // Navigate to next image
  const nextImage = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
    setZoomScale(1);
  };

  return (
    <div className={cn(
      "relative w-full bg-background overflow-hidden transition-all duration-300",
      isFullscreen ? "fixed inset-0 z-50 bg-black" : "rounded-lg"
    )}>
      {/* Main image display */}
      <div className="relative w-full h-full">
        <div className={cn(
          "relative w-full aspect-square overflow-hidden",
          isFullscreen && "h-screen"
        )}>
          <img 
            src={images[currentIndex]} 
            alt={`Product image ${currentIndex + 1}`}
            className={cn(
              "w-full h-full object-contain transition-transform duration-300",
              isZoomed && "cursor-zoom-out"
            )}
            style={{ transform: isZoomed ? `scale(${zoomScale})` : 'none' }}
            onClick={toggleZoom}
          />
          
          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            {currentIndex + 1}/{images.length}
          </div>
        </div>
        
        {/* Control buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white/30 backdrop-blur-sm border-transparent hover:bg-white/50"
            onClick={toggleZoom}
          >
            {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
          </Button>
          
          {isFullscreen && (
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/30 backdrop-blur-sm border-transparent hover:bg-white/50"
              onClick={toggleFullscreen}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Navigation arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 backdrop-blur-sm border-transparent hover:bg-white/50"
          onClick={prevImage}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 backdrop-blur-sm border-transparent hover:bg-white/50"
          onClick={nextImage}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Thumbnails */}
      {!isFullscreen && (
        <div className="mt-4 px-2">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={cn(
                  "w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all",
                  currentIndex === index 
                    ? "border-primary" 
                    : "border-transparent hover:border-primary/50"
                )}
                onClick={() => handleThumbnailSelect(index)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Fullscreen button (only shown when not in fullscreen) */}
      {!isFullscreen && (
        <Button
          variant="outline"
          size="sm"
          className="absolute bottom-4 right-4 bg-white/30 backdrop-blur-sm border-transparent hover:bg-white/50"
          onClick={toggleFullscreen}
        >
          <ZoomIn className="h-4 w-4 mr-1" /> 
          Fullscreen
        </Button>
      )}
    </div>
  );
};

export default ProductImageGallery;
