
import React, { useCallback, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Rewind,
  FastForward
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
}

const VideoControls = ({ 
  videoRef, 
  isPlaying, 
  isMuted,
  onPlayPause,
  onMuteToggle
}: VideoControlsProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const progressRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  }, [videoRef]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleTimeUpdate);
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleTimeUpdate);
      };
    }
  }, [videoRef, handleTimeUpdate]);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  }, [videoRef]);

  const handlePlaybackRateChange = useCallback(() => {
    if (!videoRef.current) return;
    
    const rates = [0.5, 1, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    
    videoRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
    
    toast({
      title: `Playback Speed: ${nextRate}x`,
      duration: 2000,
    });
  }, [playbackRate, toast]);

  const handleRewind = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime -= 10;
    
    toast({
      title: "Rewound 10 seconds",
      duration: 1000,
    });
  }, [toast]);

  const handleFastForward = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += 10;
    
    toast({
      title: "Fast forwarded 10 seconds",
      duration: 1000,
    });
  }, [toast]);

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 transition-opacity duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Progress bar */}
      <div 
        ref={progressRef}
        className="w-full h-1 bg-white/30 cursor-pointer mb-2"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-white"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          {/* Playback controls */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-white/10"
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="h-4 w-4 text-white" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-white/10"
            onClick={handleRewind}
          >
            <Rewind className="h-4 w-4 text-white" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-white/10"
            onClick={handleFastForward}
          >
            <FastForward className="h-4 w-4 text-white" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-white/10"
            onClick={onMuteToggle}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-white" />
            ) : (
              <Volume2 className="h-4 w-4 text-white" />
            )}
          </Button>
          
          {/* Time display */}
          <span className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        
        {/* Playback speed */}
        <Button
          variant="ghost"
          size="sm"
          className="text-white text-sm hover:bg-white/10"
          onClick={handlePlaybackRateChange}
        >
          {playbackRate}x
        </Button>
      </div>
    </div>
  );
};

export default VideoControls;
