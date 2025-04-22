
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
    <div className="relative w-full h-64 bg-transparent">
      {/* Center video controls */}
      <div className="absolute inset-0 flex items-center justify-center gap-8">
        <button
          className="h-12 w-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
          onClick={handleSkipBackward}
        >
          <SkipBack className="h-6 w-6" />
        </button>
        
        <button
          className="h-16 w-16 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="h-8 w-8" />
          )}
        </button>
        
        <button
          className="h-12 w-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
          onClick={handleSkipForward}
        >
          <SkipForward className="h-6 w-6" />
        </button>
      </div>
      
      {/* Bottom controls bar */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-12 pb-2 px-3 transition-opacity duration-300"
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
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div 
              className="absolute h-3 w-3 bg-white rounded-full -top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ 
                left: `${(currentTime / duration) * 100}%`, 
                transform: 'translateX(-50%)' 
              }} 
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Left controls */}
          <div className="flex items-center gap-2">
            <button
              className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>

            <button
              className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              onClick={handleSkipBackward}
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              onClick={handleSkipForward}
            >
              <SkipForward className="h-4 w-4" />
            </button>

            {/* Volume controls */}
            <div 
              className="relative"
              onMouseEnter={() => setIsVolumeSliderVisible(true)}
              onMouseLeave={() => setIsVolumeSliderVisible(false)}
            >
              <button
                className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
                onClick={handleMuteToggle}
              >
                {getVolumeIcon()}
              </button>

              {isVolumeSliderVisible && (
                <div className="absolute bottom-full left-0 mb-2 p-2 bg-black/80 rounded-md w-32 z-10">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
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
            {/* Settings */}
            <button
              className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings className="h-4 w-4" />
            </button>

            {/* Fullscreen toggle */}
            <button
              className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              onClick={handleFullscreenToggle}
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
