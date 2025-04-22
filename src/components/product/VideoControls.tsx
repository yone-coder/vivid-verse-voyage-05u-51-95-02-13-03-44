
import { useState } from 'react';
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
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  onPlaybackSpeedChange?: (speed: number) => void;
  className?: string;
}

const VideoControls = ({
  isPlaying,
  isMuted = false,
  volume = 0.8,
  currentTime = 0,
  duration = 0,
  onPlayPause,
  onVolumeChange,
  onMuteToggle,
  onSeek,
  onPlaybackSpeedChange,
  className
}: VideoControlsProps) => {
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 0.3) return <Volume className="h-4 w-4" />;
    if (volume < 0.7) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  const handlePlaybackSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    setIsSettingsOpen(false);
    if (onPlaybackSpeedChange) {
      onPlaybackSpeedChange(speed);
    }
  };

  const playbackSpeedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div className={cn(
      "bg-gradient-to-t from-black to-transparent pt-8 pb-3 px-3 rounded-md",
      className
    )}>
      {/* Progress bar */}
      {onSeek && (
        <div className="w-full mb-3 px-1">
          <div className="relative h-1 bg-gray-500 rounded overflow-hidden">
            {/* Buffered progress */}
            <div 
              className="absolute top-0 left-0 h-full bg-gray-300 bg-opacity-50" 
              style={{ width: '85%' }}
            />
            {/* Playback progress */}
            <div 
              className="absolute top-0 left-0 h-full bg-white" 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            <input
              type="range"
              min={0}
              max={duration}
              step={0.01}
              value={currentTime}
              onChange={(e) => onSeek(parseFloat(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Main controls row */}
      <div className="flex items-center justify-between w-full gap-2">
        {/* Left controls */}
        <div className="flex items-center gap-2">
          <button
            className="h-8 w-8 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 text-white flex items-center justify-center"
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>

          <button
            className="h-8 w-8 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 text-white flex items-center justify-center"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          <button
            className="h-8 w-8 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 text-white flex items-center justify-center"
          >
            <SkipForward className="h-4 w-4" />
          </button>

          {/* Volume controls with hover slider */}
          {onVolumeChange && onMuteToggle && (
            <div 
              className="relative"
              onMouseEnter={() => setIsVolumeSliderVisible(true)}
              onMouseLeave={() => setIsVolumeSliderVisible(false)}
            >
              <button
                className="h-8 w-8 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 text-white flex items-center justify-center"
                onClick={onMuteToggle}
              >
                {getVolumeIcon()}
              </button>
              
              {isVolumeSliderVisible && (
                <div className="absolute bottom-full left-0 mb-2 p-2 bg-black bg-opacity-80 rounded-md w-32">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="w-full accent-white"
                  />
                </div>
              )}
            </div>
          )}

          {/* Time display */}
          <div className="text-xs text-white">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Playback speed */}
          {onPlaybackSpeedChange && (
            <div className="relative">
              <button
                className="h-8 px-2 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 text-white text-xs flex items-center gap-1"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              >
                {playbackSpeed}x
                <ChevronDown className="h-3 w-3" />
              </button>

              {isSettingsOpen && (
                <div className="absolute bottom-full right-0 mb-2 p-2 bg-black bg-opacity-80 rounded-md w-36">
                  <div className="grid grid-cols-2 gap-1">
                    {playbackSpeedOptions.map((speed) => (
                      <button
                        key={speed}
                        className={`h-6 text-xs rounded text-white ${
                          playbackSpeed === speed 
                            ? "bg-white bg-opacity-20" 
                            : "hover:bg-white hover:bg-opacity-10"
                        }`}
                        onClick={() => handlePlaybackSpeedChange(speed)}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Settings button */}
          <button
            className="h-8 w-8 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 text-white flex items-center justify-center"
          >
            <Settings className="h-4 w-4" />
          </button>

          {/* Fullscreen toggle */}
          <button
            className="h-8 w-8 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 text-white flex items-center justify-center"
          >
            <Maximize className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
