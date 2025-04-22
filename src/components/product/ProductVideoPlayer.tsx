
import React, { useRef, useState, useEffect, useCallback } from "react";
import VideoControls from "./VideoControls";

interface ProductVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

const ProductVideoPlayer: React.FC<ProductVideoPlayerProps> = ({ src, poster, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [bufferedTime, setBufferedTime] = useState(0);
  const requestRef = useRef<number | null>(null);

  // Animation frame loop for smooth progress updates
  const updateTimeDisplay = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      requestRef.current = requestAnimationFrame(updateTimeDisplay);
    }
  }, []);

  // Start/stop the animation frame loop based on play state
  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(updateTimeDisplay);
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, updateTimeDisplay]);

  // Play/Pause controls
  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play()
        .catch(error => {
          console.error("Error playing video:", error);
        });
    } else {
      videoRef.current.pause();
    }
  }, []);

  // Listen to video events for sync state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onDurationChange = () => setDuration(video.duration || 0);
    const onVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };
    const onProgress = () => {
      try {
        if (video.buffered.length > 0) {
          setBufferedTime(video.buffered.end(video.buffered.length - 1));
        }
      } catch (error) {
        console.error("Error updating buffer time:", error);
      }
    };
    const onSeeked = () => {
      setCurrentTime(video.currentTime);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (video) {
        video.currentTime = 0;
      }
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("durationchange", onDurationChange);
    video.addEventListener("volumechange", onVolumeChange);
    video.addEventListener("progress", onProgress);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("ended", onEnded);

    // Also set initial duration if already loaded
    if (video.readyState >= 1) {
      setDuration(video.duration || 0);
    }

    // Clean up
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("durationchange", onDurationChange);
      video.removeEventListener("volumechange", onVolumeChange);
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  // Volume
  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      if (videoRef.current.muted && newVolume > 0) {
        videoRef.current.muted = false;
      }
    }
  };

  // Mute toggle
  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Seek
  const handleSeek = (newTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Skip 10s forward/backward
  const handleSkip = (amount: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + amount));
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Fullscreen
  const handleFullscreenToggle = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className={className ? className : "relative w-full h-full"}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain bg-black"
        style={{ maxHeight: "480px" }}
        tabIndex={-1}
        controls={false}
        preload="metadata"
      />
      <VideoControls
        isPlaying={isPlaying}
        isMuted={isMuted}
        volume={volume}
        onPlayPause={handlePlayPause}
        onMuteToggle={handleMuteToggle}
        onVolumeChange={handleVolumeChange}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        onSkipForward={() => handleSkip(10)}
        onSkipBackward={() => handleSkip(-10)}
        onFullscreenToggle={handleFullscreenToggle}
        bufferedTime={bufferedTime}
      />
    </div>
  );
};

export default ProductVideoPlayer;
