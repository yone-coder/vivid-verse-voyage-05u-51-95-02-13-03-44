
import React, { useState, useRef } from "react";
import { 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Heart,
  RotateCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [rotation, setRotation] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  // Handle zoom toggling with multiple levels
  const toggleZoom = () => {
    if (zoomScale >= 3) {
      setIsZoomed(false);
      setZoomScale(1);
    } else {
      setIsZoomed(true);
      setZoomScale(prev => prev + 1);
    }
  };
  
  // Handle thumbnail selection
  const handleThumbnailSelect = (index: number) => {
    setCurrentIndex(index);
    setIsZoomed(false);
    setZoomScale(1);
    setRotation(0);
  };
  
  // Navigate to previous image
  const prevImage = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
    setZoomScale(1);
    setRotation(0);
  };
  
  // Navigate to next image
  const nextImage = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
    setZoomScale(1);
    setRotation(0);
  };

  // Handle image download
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.download = `product-image-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image download started");
  };

  // Handle image share
  const shareImage = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this product',
        text: 'I found this amazing product!',
        url: window.location.href,
      })
      .then(() => toast.success("Shared successfully"))
      .catch((error) => toast.error("Error sharing"));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  // Handle image rotation
  const rotateImage = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  // Handle like toggle
  const toggleLike = () => {
    setIsLiked(prev => !prev);
    if (!isLiked) {
      toast.success("Added to favorites");
    } else {
      toast.success("Removed from favorites");
    }
  };

  return (
    <div 
      ref={galleryRef} 
      className="relative w-full bg-background overflow-hidden transition-all duration-300 rounded-lg"
    >
      {/* Main image display */}
      <div className="relative w-full h-full group">
        <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={images[currentIndex]} 
              alt={`Product image ${currentIndex + 1}`}
              className={cn(
                "w-full h-full object-contain transition-all duration-300",
                isZoomed && "cursor-zoom-out"
              )}
              style={{ 
                transform: `scale(${isZoomed ? zoomScale : 1}) rotate(${rotation}deg)`,
                transition: "transform 0.3s ease-in-out"
              }}
              onClick={toggleZoom}
            />
          </div>
          
          {/* Zoom level indicator */}
          {isZoomed && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
              {zoomScale}x zoom
            </div>
          )}
          
          {/* Image counter */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            {currentIndex + 1}/{images.length}
          </div>
        </div>
        
        {/* Control buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white/30 backdrop-blur-sm border-transparent hover:bg-white/50"
            onClick={toggleZoom}
            title={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white/30 backdrop-blur-sm border-transparent hover:bg-white/50"
            onClick={rotateImage}
            title="Rotate image"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Social actions */}
        <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white/30 backdrop-blur-sm border-transparent hover:bg-white/50"
            onClick={downloadImage}
            title="Download image"
          >
            <Download className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white/30 backdrop-blur-sm border-transparent hover:bg-white/50"
            onClick={shareImage}
            title="Share product"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className={cn(
              "rounded-full backdrop-blur-sm border-transparent",
              isLiked 
                ? "bg-red-500/50 hover:bg-red-500/70 text-white" 
                : "bg-white/30 hover:bg-white/50"
            )}
            onClick={toggleLike}
            title={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
          </Button>
        </div>
        
        {/* Navigation arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 backdrop-blur-sm border-transparent hover:bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={prevImage}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 backdrop-blur-sm border-transparent hover:bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={nextImage}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Thumbnails with reduced top margin */}
      <div className="mt-1 px-2"> {/* Reduced from mt-2 to mt-1 */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar py-1"> {/* Reduced gap from 2 to 1 */}
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all", /* Reduced from w-16 h-16 to w-14 h-14 */
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
      
      {/* Image caption or description - revealed on hover */}
      <div className="mt-1 px-2 text-center opacity-0 group-hover:opacity-100 transition-opacity"> {/* Reduced from mt-2 to mt-1 */}
        <p className="text-xs text-muted-foreground"> {/* Reduced from text-sm to text-xs */}
          Click to zoom • Use arrow buttons to navigate • Press heart to favorite
        </p>
      </div>
    </div>
  );
};

export default ProductImageGallery;
