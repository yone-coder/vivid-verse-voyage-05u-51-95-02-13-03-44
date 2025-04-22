
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted?: boolean;
  volume?: number;
  onPlayPause: () => void;
  onVolumeChange?: (volume: number) => void;
  onMuteToggle?: () => void;
  className?: string;
}

const VideoControls = ({
  isPlaying,
  isMuted = false,
  volume = 1,
  onPlayPause,
  onVolumeChange,
  onMuteToggle,
  className
}: VideoControlsProps) => {
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 0.3) return <Volume className="h-4 w-4" />;
    if (volume < 0.7) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <div className={cn(
      "absolute bottom-3 left-3 flex items-center gap-2 z-30",
      className
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>

      {onVolumeChange && onMuteToggle && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white"
          onClick={onMuteToggle}
        >
          {getVolumeIcon()}
        </Button>
      )}
    </div>
  );
};

export default VideoControls;
