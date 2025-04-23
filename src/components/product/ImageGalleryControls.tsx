
import React from "react";
import { 
  Play, 
  Pause, 
  RotateCw, 
  FlipHorizontal, 
  Focus, 
  ChevronLeft, 
  ChevronRight, 
  Download 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageGalleryControlsProps {
  currentIndex: number;
  totalImages: number;
  isRotated: number;
  isFlipped: boolean;
  autoScrollEnabled: boolean;
  focusMode: boolean;
  isPlaying?: boolean;
  showControls?: boolean;
  variant?: "default" | "fullscreen";
  onRotate: (e?: React.MouseEvent) => void;
  onFlip: (e?: React.MouseEvent) => void;
  onToggleAutoScroll: (e?: React.MouseEvent) => void;
  onToggleFocusMode: (e?: React.MouseEvent) => void;
  onPrevious?: (e?: React.MouseEvent) => void;
  onNext?: (e?: React.MouseEvent) => void;
  onDownload?: (e?: React.MouseEvent) => void;
  className?: string;
}

const ImageGalleryControls: React.FC<ImageGalleryControlsProps> = ({
  currentIndex,
  totalImages,
  isRotated,
  isFlipped,
  autoScrollEnabled,
  focusMode,
  isPlaying,
  showControls = true,
  variant = "default",
  onRotate,
  onFlip,
  onToggleAutoScroll,
  onToggleFocusMode,
  onPrevious,
  onNext,
  onDownload,
  className
}) => {
  // Return early if controls should be hidden
  if (!showControls) return null;

  const isFullscreen = variant === "fullscreen";
  
  // For the main gallery view
  if (!isFullscreen) {
    return (
      <>
        <div className={cn(
          "absolute bottom-3 right-3 flex items-center gap-2 z-30 transition-opacity duration-300",
          (focusMode || (isPlaying)) && "opacity-0",
          className
        )}>
          <Button
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-black/20 text-white"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            onClick={onRotate}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-black/20 text-white"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            onClick={onFlip}
          >
            <FlipHorizontal className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost" 
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full hover:bg-black/20 text-white",
              autoScrollEnabled && "bg-primary text-white"
            )}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            onClick={onToggleAutoScroll}
          >
            {autoScrollEnabled ? 
              <Pause className="h-4 w-4" /> : 
              <Play className="h-4 w-4" />
            }
          </Button>
          
          <button
            onClick={onToggleFocusMode}
            className={cn(
              "h-8 w-8 flex items-center justify-center rounded-full hover:bg-black/20 text-white transition-colors",
              focusMode && "bg-primary text-white"
            )}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            aria-label={focusMode ? "Exit focus mode" : "Enter focus mode"}
          >
            <Focus size={16} />
          </button>
        </div>
        
        {/* Left controls - image counter */}
        <div className={cn(
          "absolute bottom-3 left-3 z-30 transition-opacity duration-300 flex items-center h-8",
          (focusMode || isPlaying) && "opacity-0"
        )}>
          <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
            {currentIndex + 1} / {totalImages}
          </div>
        </div>
      </>
    );
  }
  
  // For fullscreen view
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
      {onPrevious && onNext && (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full hover:bg-black/20 border-white/10"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            onClick={(e) => {
              e.stopPropagation();
              onPrevious(e);
            }}
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </Button>
          
          <div className="bg-black/40 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg">
            {currentIndex + 1} / {totalImages}
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full hover:bg-black/20 border-white/10"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            onClick={(e) => {
              e.stopPropagation();
              onNext(e);
            }}
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </Button>
        </div>
      )}
      
      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full p-1.5">
        <Button
          variant="ghost" 
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-white/10"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          onClick={(e) => {
            e.stopPropagation();
            onRotate(e);
          }}
        >
          <RotateCw className="h-4 w-4 text-white" />
        </Button>
        
        <Button
          variant="ghost" 
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-white/10"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          onClick={(e) => {
            e.stopPropagation();
            onFlip(e);
          }}
        >
          <FlipHorizontal className="h-4 w-4 text-white" />
        </Button>
        
        {onDownload && (
          <Button
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-white/10"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            onClick={(e) => {
              e.stopPropagation();
              onDownload(e);
            }}
          >
            <Download className="h-4 w-4 text-white" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageGalleryControls;
