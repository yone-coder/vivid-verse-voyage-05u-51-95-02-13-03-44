
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { 
  Play, 
  Pause,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  Maximize,
  Settings,
  ChevronDown,
  Captions,
} from "lucide-react";

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted?: boolean;
  volume?: number;
  currentTime?: number;
  duration?: number;
  playbackSpeed?: number;
  bufferedTime?: number;
  quality?: string;
  hasSubtitles?: boolean;
  subtitlesEnabled?: boolean;
  availableQualities?: string[];
  onPlayPause: () => void;
  onVolumeChange?: (volume: number) => void;
  onMuteToggle?: () => void;
  onSeek?: (time: number) => void;
  onQualityChange?: (quality: string) => void;
  onPlaybackSpeedChange?: (speed: number) => void;
  onSubtitlesToggle?: () => void;
  onFullscreenToggle?: () => void;
  onSkipForward?: () => void;
  onSkipBackward?: () => void;
  className?: string;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  isMuted = false,
  volume = 1,
  currentTime = 0,
  duration = 0,
  playbackSpeed = 1,
  bufferedTime = 0,
  quality = "auto",
  hasSubtitles = false,
  subtitlesEnabled = false,
  availableQualities = ["auto", "1080p", "720p", "480p"],
  onPlayPause,
  onVolumeChange,
  onMuteToggle,
  onSeek,
  onQualityChange,
  onPlaybackSpeedChange,
  onSubtitlesToggle,
  onFullscreenToggle,
  onSkipForward,
  onSkipBackward,
  className
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const playbackSpeedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }, []);

  const getVolumeIcon = useCallback(() => {
    if (isMuted || volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 0.3) return <Volume className="h-4 w-4" />;
    if (volume < 0.7) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  }, [isMuted, volume]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        onPlayPause();
      } else if (e.code === "ArrowRight" && onSkipForward) {
        onSkipForward();
      } else if (e.code === "ArrowLeft" && onSkipBackward) {
        onSkipBackward();
      } else if (e.code === "KeyM" && onMuteToggle) {
        onMuteToggle();
      } else if (e.code === "KeyF" && onFullscreenToggle) {
        onFullscreenToggle();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onPlayPause, onSkipForward, onSkipBackward, onMuteToggle, onFullscreenToggle]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this video",
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Video link copied to clipboard",
      });
    }
  };

  return (
    <div 
      className={cn(
        "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-12 pb-2 px-3 transition-opacity duration-300",
        className
      )}
    >
      {/* Progress bar */}
      <div className="w-full mb-3 px-1">
        <div className="relative h-1 bg-gray-600 rounded overflow-hidden group">
          {/* Buffered progress */}
          <div 
            className="absolute top-0 left-0 h-full bg-gray-400 bg-opacity-50" 
            style={{ width: `${(bufferedTime / duration) * 100}%` }}
          />
          {/* Playback progress */}
          <div 
            className="absolute top-0 left-0 h-full bg-white" 
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          {onSeek && (
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={currentTime}
              onChange={(e) => onSeek(parseFloat(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          )}
          <div className="absolute h-3 w-3 bg-white rounded-full -top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
               style={{ left: `${(currentTime / duration) * 100}%`, transform: 'translateX(-50%)' }} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Left controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white"
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          {onSkipBackward && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white"
              onClick={onSkipBackward}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
          )}

          {onSkipForward && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white"
              onClick={onSkipForward}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          )}

          {/* Volume controls */}
          <div 
            className="relative"
            onMouseEnter={() => setIsVolumeSliderVisible(true)}
            onMouseLeave={() => setIsVolumeSliderVisible(false)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white"
              onClick={onMuteToggle}
            >
              {getVolumeIcon()}
            </Button>
            
            {isVolumeSliderVisible && onVolumeChange && (
              <div className="absolute bottom-full left-0 mb-2 p-2 bg-black/80 rounded-md w-32">
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={[isMuted ? 0 : volume]}
                  onValueChange={([value]) => onVolumeChange(value)}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Time display */}
          <div className="text-xs text-white">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Playback speed */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs flex items-center gap-1"
              >
                {playbackSpeed}x
                <ChevronDown className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-36 p-1 bg-black/90 border-gray-800"
              align="end"
            >
              <div className="grid grid-cols-2 gap-1">
                {playbackSpeedOptions.map((speed) => (
                  <Button
                    key={speed}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-8 text-xs text-white hover:bg-white/20",
                      playbackSpeed === speed && "bg-white/20"
                    )}
                    onClick={() => onPlaybackSpeedChange?.(speed)}
                  >
                    {speed}x
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Quality selector */}
          {onQualityChange && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs"
                >
                  {quality}
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-24 p-1 bg-black/90 border-gray-800"
                align="end"
              >
                {availableQualities.map((q) => (
                  <Button
                    key={q}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full h-8 text-xs text-white hover:bg-white/20",
                      quality === q && "bg-white/20"
                    )}
                    onClick={() => onQualityChange(q)}
                  >
                    {q}
                  </Button>
                ))}
              </PopoverContent>
            </Popover>
          )}

          {/* Subtitles toggle */}
          {hasSubtitles && onSubtitlesToggle && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full bg-black/60 hover:bg-black/80",
                subtitlesEnabled ? "text-white" : "text-gray-400"
              )}
              onClick={onSubtitlesToggle}
            >
              <Captions className="h-4 w-4" />
            </Button>
          )}

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* Fullscreen toggle */}
          {onFullscreenToggle && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white"
              onClick={onFullscreenToggle}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
