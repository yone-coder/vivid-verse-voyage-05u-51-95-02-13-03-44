
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
  onSeek?: (newTime: number) => void;
  onSkipForward?: () => void;
  onSkipBackward?: () => void;
  bufferedTime?: number;
  onFullscreenToggle?: () => void;
}

const VideoControls = ({
  isPlaying = false,
  isMuted = false,
  volume = 0.7,
  onPlayPause = () => {},
  onMuteToggle = () => {},
  onVolumeChange = () => {},
  currentTime = 0,
  duration = 0,
  onSeek,
  onSkipForward,
  onSkipBackward,
  bufferedTime = 0,
  onFullscreenToggle = () => {},
}: VideoControlsProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSeek) onSeek(Number(e.target.value));
  };

  const handleVolumeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number(e.target.value));
  };

  return (
    <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="flex items-center gap-12 pointer-events-auto">
          <button
            className="h-10 w-10 rounded-full bg-black/10 backdrop-blur flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 text-white hover:bg-black/20"
            onClick={onSkipBackward}
            aria-label="Skip Backward"
            tabIndex={0}
            type="button"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          
          <button
            className="h-14 w-14 rounded-full bg-black/10 backdrop-blur flex items-center justify-center transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white hover:bg-black/20"
            onClick={onPlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            tabIndex={0}
            type="button"
          >
            {isPlaying ? (
              <Pause className="h-7 w-7" />
            ) : (
              <Play className="h-7 w-7" />
            )}
          </button>

          <button
            className="h-10 w-10 rounded-full bg-black/10 backdrop-blur flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 text-white hover:bg-black/20"
            onClick={onSkipForward}
            aria-label="Skip Forward"
            tabIndex={0}
            type="button"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="w-full bg-gradient-to-t from-black/90 to-transparent p-4 pointer-events-auto relative z-30">
        <div className="w-full mb-4 px-1">
          <div className="relative h-1 bg-gray-600 rounded overflow-hidden group">
            <div 
              className="absolute top-0 left-0 h-full bg-gray-400 bg-opacity-50" 
              style={{ width: duration ? `${(bufferedTime / duration) * 100}%` : "0%" }}
            />
            <div 
              className="absolute top-0 left-0 h-full bg-white" 
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
            />
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={currentTime}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Seek"
              onChange={handleSeek}
              tabIndex={0}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="h-10 w-10 rounded-full bg-black/10 backdrop-blur flex items-center justify-center hover:bg-black/20 text-white"
              onClick={onMuteToggle}
              aria-label={isMuted ? "Unmute" : "Mute"}
              tabIndex={0}
              type="button"
            >
              {getVolumeIcon()}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeSlider}
              className="w-20 h-2 accent-purple-500"
              aria-label="Volume"
            />

            <div className="text-xs text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="h-8 w-8 rounded-full bg-black/10 backdrop-blur flex items-center justify-center hover:bg-black/20 text-white"
              onClick={() => setIsSettingsOpen(x => !x)}
              aria-label="Settings"
              tabIndex={0}
              type="button"
            >
              <Settings className="h-5 w-5" />
            </button>

            <button
              className="h-8 w-8 rounded-full bg-black/10 backdrop-blur flex items-center justify-center hover:bg-black/20 text-white"
              onClick={onFullscreenToggle}
              aria-label="Fullscreen"
              tabIndex={0}
              type="button"
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

