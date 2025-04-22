
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
  ArrowUpToLine,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import GalleryThumbnails from "@/components/product/GalleryThumbnails";
import ImageGalleryControls from "@/components/product/ImageGalleryControls";
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
import InfoBand from "@/components/product/InfoBand";
import VideoControls from "@/components/product/VideoControls";

interface ProductImageGalleryProps {
  images: string[];
}

interface TouchPosition {
  x: number;
  y: number;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [replayMode, setReplayMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null);
  const [lastTouch, setLastTouch] = useState<TouchPosition | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [rotated, setRotated] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [infoBandVisible, setInfoBandVisible] = useState(true);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedTime, setBufferedTime] = useState(0);
  
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && isFullscreen) {
      setIsFullscreen(false);
      
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [isFullscreen]);
  
  useEffect(() => {
    const updateZoom = (event: WheelEvent) => {
      if (!imageRef.current || !isFullscreen) return;
      
      event.preventDefault();
      
      const delta = -Math.sign(event.deltaY);
      const newZoom = Math.max(1, Math.min(5, zoom + delta * 0.1));
      
      setZoom(newZoom);
    };
    
    document.addEventListener("wheel", updateZoom, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("wheel", updateZoom);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoom, isFullscreen, handleKeyDown]);
  
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };
  
  useEffect(() => {
    if (videoRef.current) {
      // Listen for timeupdate to track current playback position
      videoRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(videoRef.current?.currentTime || 0);
      });

      // Listen for loadedmetadata to get video duration
      videoRef.current.addEventListener('loadedmetadata', () => {
        setDuration(videoRef.current?.duration || 0);
      });

      // Listen for progress to track buffering
      videoRef.current.addEventListener('progress', () => {
        if (videoRef.current?.buffered.length) {
          setBufferedTime(videoRef.current.buffered.end(videoRef.current.buffered.length - 1));
        }
      });
    }
  }, []);

  // Add seeking functionality
  const handleSeek = (newTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const handleSetFilter = (filter: string) => {
    setCurrentFilter(filter === currentFilter ? null : filter);
    setIsFilterMenuOpen(false);
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    
    if (!isFullscreen) {
      if (fullscreenContainerRef.current?.requestFullscreen) {
        fullscreenContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  const toggleFlip = () => {
    setFlipped(!flipped);
  };
  
  const handleRotate = () => {
    setRotated((rotated + 90) % 360);
  };
  
  const resetTransforms = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setFlipped(false);
    setRotated(0);
    setCurrentFilter(null);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1 && isFullscreen) {
      setIsPanning(true);
      setLastTouch({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleMouseUp = () => {
    setIsPanning(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && lastTouch && zoom > 1) {
      const dx = e.clientX - lastTouch.x;
      const dy = e.clientY - lastTouch.y;
      
      setPan(prev => ({
        x: prev.x + dx,
        y: prev.y + dy
      }));
      
      setLastTouch({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setTouchStart({ x: touch.clientX, y: touch.clientY });
      setLastTouch({ x: touch.clientX, y: touch.clientY });
    } else if (e.touches.length === 2) {
      // For handling pinch zoom in the future
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (zoom > 1 && e.touches.length === 1 && lastTouch) {
      const touch = e.touches[0];
      const dx = touch.clientX - lastTouch.x;
      const dy = touch.clientY - lastTouch.y;
      
      setPan(prev => ({
        x: prev.x + dx,
        y: prev.y + dy
      }));
      
      setLastTouch({ x: touch.clientX, y: touch.clientY });
    }
  };
  
  const handleTouchEnd = () => {
    setTouchStart(null);
    setLastTouch(null);
  };
  
  const handleDownload = () => {
    if (images[current]) {
      fetch(images[current])
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `product-image-${current + 1}.jpg`;
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error('Error downloading image:', error);
        });
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Product Image',
        text: 'Check out this product image!',
        url: images[current],
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      navigator.clipboard.writeText(images[current]);
      toast({
        title: "Link copied",
        description: "Image URL has been copied to your clipboard",
      });
    }
  };
  
  const imageStyles = {
    transform: `
      scale(${zoom})
      translateX(${pan.x}px)
      translateY(${pan.y}px)
      ${flipped ? 'scaleX(-1)' : ''}
      rotate(${rotated}deg)
    `,
    filter: `
      ${currentFilter ? `${currentFilter}(1)` : ''}
      brightness(${brightness}%)
      contrast(${contrast}%)
      saturate(${saturation}%)
    `,
    transition: isPanning ? 'none' : 'transform 0.3s ease'
  };
  
  const getFilterPreviewStyles = (filter: string) => ({
    filter: filter === 'none' ? 'none' : `${filter}(1)`
  });
  
  const isVideo = (src: string) => {
    return src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
  };
  
  const currentIsVideo = isVideo(images[current] || '');

  // Using isVideoMode to allow video controls to be displayed even for non-video media
  useEffect(() => {
    setIsVideoMode(currentIsVideo);
  }, [current, currentIsVideo]);
  
  const renderImageOrVideo = (src: string, index: number) => {
    const isCurrentVideo = isVideo(src);
    
    if (isCurrentVideo) {
      return (
        <video 
          ref={videoRef}
          src={src} 
          className="w-full h-full object-contain"
          controls={false}
          playsInline
          loop
        />
      );
    } else {
      return (
        <img 
          ref={index === current ? imageRef : undefined}
          src={src} 
          alt={`Product view ${index + 1}`} 
          style={index === current ? imageStyles : {}}
          className="w-full h-full object-contain"
        />
      );
    }
  };
  
  return (
    <div ref={fullscreenContainerRef} className="w-full h-full relative">
      {!isFullscreen ? (
        <div className="w-full h-full" ref={galleryRef}>
          <div className="relative overflow-hidden h-full w-full">
            <Carousel setApi={setApi} className="w-full h-full" orientation="horizontal">
              <CarouselContent className="h-full">
                {images.map((image, index) => (
                  <CarouselItem key={index} className="h-full flex items-center justify-center">
                    <div 
                      className="relative w-full h-full max-h-[80vh] flex items-center justify-center"
                      ref={index === current ? containerRef : undefined}
                    >
                      {renderImageOrVideo(image, index)}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {count > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 shadow-md z-10"
                    onClick={() => api?.scrollPrev()}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 shadow-md z-10"
                    onClick={() => api?.scrollNext()}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </Carousel>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <div className="bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1 flex space-x-1.5">
                {images.length > 1 && images.map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      current === idx ? "bg-white" : "bg-white/50"
                    )}
                    onClick={() => api?.scrollTo(idx)}
                  />
                ))}
              </div>
            </div>
            
            <ImageGalleryControls 
              onFullscreen={toggleFullscreen}
              onRotate={handleRotate}
              onFlip={toggleFlip}
              onReset={resetTransforms}
              onShare={handleShare}
              onDownload={handleDownload}
              onFilter={() => setIsFilterMenuOpen(!isFilterMenuOpen)} 
              isVideoMode={isVideoMode}
              isPlaying={isPlaying}
              onPlayToggle={toggleVideo}
              currentFilter={currentFilter}
            />
            
            {isFilterMenuOpen && (
              <div className="absolute top-14 right-2 bg-white rounded-lg shadow-lg p-2 z-30 max-w-[200px]">
                <div className="grid grid-cols-2 gap-2">
                  <div 
                    className={cn(
                      "p-1 cursor-pointer hover:bg-gray-100 rounded text-xs text-center",
                      currentFilter === null && "bg-gray-100"
                    )}
                    onClick={() => handleSetFilter('none')}
                  >
                    <img src={images[0]} alt="None" className="w-full aspect-square object-cover rounded mb-1" />
                    None
                  </div>
                  
                  {['grayscale', 'sepia', 'invert', 'blur'].map(filter => (
                    <div 
                      key={filter}
                      className={cn(
                        "p-1 cursor-pointer hover:bg-gray-100 rounded text-xs text-center",
                        currentFilter === filter && "bg-gray-100"
                      )}
                      onClick={() => handleSetFilter(filter)}
                    >
                      <div className="w-full aspect-square overflow-hidden rounded mb-1">
                        <img 
                          src={images[0]} 
                          alt={filter} 
                          className="w-full h-full object-cover" 
                          style={getFilterPreviewStyles(filter)}
                        />
                      </div>
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {count > 1 && (
            <GalleryThumbnails 
              images={images} 
              currentIndex={current} 
              onSelect={(idx) => api?.scrollTo(idx)} 
            />
          )}
          
          {isVideoMode && (
            <VideoControls
              isPlaying={isPlaying}
              isMuted={isMuted}
              volume={volume}
              onPlayPause={toggleVideo}
              onMuteToggle={handleMuteToggle}
              onVolumeChange={handleVolumeChange}
              currentTime={currentTime}
              duration={duration}
              bufferedTime={bufferedTime}
              onSeek={handleSeek}
              onSkipForward={() => handleSeek(Math.min(currentTime + 10, duration))}
              onSkipBackward={() => handleSeek(Math.max(currentTime - 10, 0))}
              onFullscreenToggle={toggleFullscreen}
            />
          )}
        </div>
      ) : (
        <div className="fixed inset-0 bg-black z-50 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-3 bg-black/50">
            <Button variant="ghost" className="text-white p-1 h-8" onClick={toggleFullscreen}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="text-sm">Back</span>
            </Button>
            
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={handleDownload}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div 
            className="flex-1 overflow-hidden relative"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {renderImageOrVideo(images[current], current)}
            </div>
          </div>
          
          <div className="bg-black/50 p-3">
            <div className="flex items-center justify-between space-x-2">
              <ImageGalleryControls 
                onFullscreen={toggleFullscreen}
                onRotate={handleRotate}
                onFlip={toggleFlip}
                onReset={resetTransforms}
                onShare={handleShare}
                onDownload={handleDownload}
                onFilter={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                isVideoMode={isVideoMode}
                isPlaying={isPlaying}
                onPlayToggle={toggleVideo}
                currentFilter={currentFilter}
                showLabels 
                light
              />
            </div>
            
            {count > 1 && (
              <div className="mt-3">
                <GalleryThumbnails 
                  images={images} 
                  currentIndex={current} 
                  onSelect={(idx) => api?.scrollTo(idx)}
                  dark 
                />
              </div>
            )}
          </div>
          
          {isVideoMode && (
            <VideoControls
              isPlaying={isPlaying}
              isMuted={isMuted}
              volume={volume}
              onPlayPause={toggleVideo}
              onMuteToggle={handleMuteToggle}
              onVolumeChange={handleVolumeChange}
              currentTime={currentTime}
              duration={duration}
              bufferedTime={bufferedTime}
              onSeek={handleSeek}
              onSkipForward={() => handleSeek(Math.min(currentTime + 10, duration))}
              onSkipBackward={() => handleSeek(Math.max(currentTime - 10, 0))}
              onFullscreenToggle={toggleFullscreen}
            />
          )}
        </div>
      )}
      
      {infoBandVisible && <InfoBand onClose={() => setInfoBandVisible(false)} />}
    </div>
  );
};

export default ProductImageGallery;
