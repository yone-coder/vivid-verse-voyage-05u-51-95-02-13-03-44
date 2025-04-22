
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
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
  currentTime?: number;
  duration?: number;
  onPlayPause: () => void;
  onVolumeChange?: (volume: number) => void;
  onMuteToggle?: () => void;
  onSeek?: (time: number) => void;
  className?: string;
}

const VideoControls = ({
  isPlaying,
  isMuted = false,
  volume = 1,
  currentTime = 0,
  duration = 0,
  onPlayPause,
  onVolumeChange,
  onMuteToggle,
  onSeek,
  className
}: VideoControlsProps) => {
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 0.3) return <Volume className="h-4 w-4" />;
    if (volume < 0.7) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn(
      "absolute bottom-3 left-0 right-0 flex flex-col gap-2 px-3 z-30",
      className
    )}>
      {/* Progress bar */}
      {onSeek && (
        <div className="w-full flex items-center gap-2 text-white text-xs">
          <span>{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={1}
            onValueChange={(value) => onSeek(value[0])}
            className="flex-1"
          />
          <span>{formatTime(duration)}</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white"
              onClick={onMuteToggle}
            >
              {getVolumeIcon()}
            </Button>
            
            <div className="w-24">
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => onVolumeChange(value[0] / 100)}
                className="bg-black/60 backdrop-blur-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoControls;
