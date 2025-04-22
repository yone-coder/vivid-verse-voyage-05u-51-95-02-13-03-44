
import React, { useState, useCallback, useRef } from 'react';
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
  Settings
} from "lucide-react";

interface VideoControlsProps {
  isPlaying?: boolean;
  isMuted?: boolean;
  volume?: number;
  onPlayPause?: () => void;
  onMuteToggle?: () => void;
  onVolumeChange?: (newVolume: number) => void;
  currentTime?: number;
  duration?: number;
}

const VideoControls = ({
  isPlaying = false,
  isMuted = false,
  volume = 0.7,
  onPlayPause = () => {},
  onMuteToggle = () => {},
  onVolumeChange = () => {},
  currentTime = 45,
  duration = 180
}: VideoControlsProps) => {
  // State variables to track UI state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [bufferedTime, setBufferedTime] = useState(90);
  
  const controlsTimeoutRef = useRef(null);

  // Helper function to format time as minutes:seconds
  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }, []);

  // Helper function to determine which volume icon to display
  const getVolumeIcon = useCallback(() => {
    if (isMuted || volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 0.3) return <Volume className="h-4 w-4" />;
    if (volume < 0.7) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  }, [isMuted, volume]);

  // Event handlers
  const handlePlayPause = () => {
    onPlayPause();
  };

  const handleVolumeChange = (newVolume) => {
    onVolumeChange(newVolume);
  };

  const handleMuteToggle = () => {
    onMuteToggle();
  };

  const handleSeek = (time) => {
    // External seek handler can be added here if needed
  };

  const handleSubtitlesToggle = () => {
    setSubtitlesEnabled(!subtitlesEnabled);
  };

  const handleSkipForward = () => {
    // External skip handler can be added here if needed
  };

  const handleSkipBackward = () => {
    // External skip backward handler can be added here if needed
  };

  const handleFullscreenToggle = () => {
    console.log("Toggle fullscreen");
  };

  return (
    <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
      {/* Centered Play/Skip Group (pointer-events-auto for buttons) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="flex items-center gap-8 pointer-events-auto">
          <button
            className="h-20 w-20 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={handleSkipBackward}
            aria-label="Skip Backward"
            tabIndex={0}
          >
            <SkipBack className="h-10 w-10" />
          </button>
          
          <button
            className="h-24 w-24 rounded-full bg-white/30 hover:bg-white/60 text-white flex items-center justify-center transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            tabIndex={0}
          >
            {isPlaying ? (
              <Pause className="h-14 w-14" />
            ) : (
              <Play className="h-14 w-14" />
            )}
          </button>

          <button
            className="h-20 w-20 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={handleSkipForward}
            aria-label="Skip Forward"
            tabIndex={0}
          >
            <SkipForward className="h-10 w-10" />
          </button>
        </div>
      </div>
      
      {/* Bottom Controls Bar */}
      <div className="w-full bg-gradient-to-t from-black/90 to-transparent p-4 pointer-events-auto relative z-30">
        {/* Progress bar */}
        <div className="w-full mb-4 px-1">
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
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={currentTime}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Seek"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Left controls */}
          <div className="flex items-center space-x-4">
            <button
              className="h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              onClick={handleMuteToggle}
              aria-label={isMuted ? "Unmute" : "Mute"}
              tabIndex={0}
            >
              {getVolumeIcon()}
            </button>
            {/* Time display */}
            <div className="text-xs text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-4">
            {/* Settings */}
            <button
              className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              onClick={() => setIsSettingsOpen(x => !x)}
              aria-label="Settings"
              tabIndex={0}
            >
              <Settings className="h-5 w-5" />
            </button>

            {/* Fullscreen */}
            <button
              className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              onClick={handleFullscreenToggle}
              aria-label="Fullscreen"
              tabIndex={0}
            >
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;

