import React, { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Heart, MessageSquare, Share, Volume2, VolumeX } from "lucide-react";
import ReelsSkeleton from "@/components/skeletons/ReelsSkeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Reel {
  id: number;
  username: string;
  avatar: string;
  description: string;
  videoUrl: string;
  likes: string;
  comments: number;
  productName: string;
  productPrice: string;
  productImage: string;
}

export default function Reels() {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const reelRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isMobile = useIsMobile();
  
  // Mock data for reels
  const reels: Reel[] = [
    {
      id: 1,
      username: "techgadgets",
      avatar: "https://picsum.photos/id/64/100",
      description: "This portable gadget organizer changed my life! #tech #gadgets",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-computer-keyboard-4851-large.mp4",
      likes: "124K",
      comments: 452,
      productName: "Travel Tech Organizer",
      productPrice: "$19.99",
      productImage: "https://picsum.photos/id/180/100"
    },
    {
      id: 2,
      username: "kitchenmaster",
      avatar: "https://picsum.photos/id/177/100",
      description: "Cook perfect eggs every time with this amazing kitchen tool! #cooking #kitchen",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cooking-in-a-camping-site-12992-large.mp4",
      likes: "67.5K",
      comments: 231,
      productName: "Ultimate Egg Timer",
      productPrice: "$9.99",
      productImage: "https://picsum.photos/id/100/100"
    },
    {
      id: 3,
      username: "beautysecrets",
      avatar: "https://picsum.photos/id/90/100",
      description: "This makeup brush set is a game changer! #beauty #makeup",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-makeup-artist-applies-moisturizer-to-the-face-of-a-woman-48613-large.mp4",
      likes: "215K",
      comments: 823,
      productName: "Pro Makeup Brush Set",
      productPrice: "$24.99",
      productImage: "https://picsum.photos/id/21/100"
    }
  ];

  // Initialize intersection observer to handle video playback
  useEffect(() => {
    if (typeof IntersectionObserver !== 'undefined') {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const videoId = Number(entry.target.id.replace('reel-', ''));
              setActiveReelIndex(videoId);
              
              // Play the video that is in view and pause others
              reelRefs.current.forEach((videoRef, idx) => {
                if (videoRef) {
                  if (idx === videoId) {
                    videoRef.currentTime = 0;
                    videoRef.play().catch(err => console.log('Autoplay prevented:', err));
                  } else {
                    videoRef.pause();
                  }
                }
              });
            }
          });
        },
        { threshold: 0.7 }
      );
    }
  }, []);

  // Set up observers for each reel
  useEffect(() => {
    if (observerRef.current && reelRefs.current.length > 0) {
      reelRefs.current.forEach((ref, index) => {
        if (ref && ref.parentElement) {
          observerRef.current?.observe(ref.parentElement);
        }
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isReady]);

  // Mark component as ready once mobile status is determined
  useEffect(() => {
    if (isMobile !== undefined) {
      setIsReady(true);
    }
  }, [isMobile]);
  
  // Toggle mute/unmute for all videos
  const toggleMute = () => {
    setIsMuted(!isMuted);
    reelRefs.current.forEach(videoRef => {
      if (videoRef) {
        videoRef.muted = !isMuted;
      }
    });
  };

  if (!isReady) {
    return <ReelsSkeleton />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Simplified overlay header with just For You and Following */}
      <div className="absolute top-0 z-10 w-full flex justify-center px-3 py-2">
        <div className="bg-black/30 backdrop-blur-sm rounded-full flex p-1">
          <div className="whitespace-nowrap px-3 py-1 bg-red-500 rounded-full text-white text-sm font-medium">
            For You
          </div>
          <div className="whitespace-nowrap px-3 py-1 text-gray-300 text-sm font-medium">
            Following
          </div>
        </div>
      </div>
      
      {/* Reels container - full screen snapping vertical scroll */}
      <div className="w-full h-[calc(100vh-48px)] overflow-y-scroll snap-y snap-mandatory">
        {reels.map((reel, index) => (
          <div 
            key={reel.id}
            id={`reel-${index}`}
            className="w-full h-full relative snap-start snap-always"
          >
            {/* Video */}
            <video
              ref={(el) => (reelRefs.current[index] = el)}
              src={reel.videoUrl}
              className="w-full h-full object-cover"
              loop
              muted={isMuted}
              playsInline
              poster="https://picsum.photos/seed/reel1/500/800"
            />
            
            {/* Content overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-end">
              {/* Bottom gradient for better text visibility */}
              <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
              
              <div className="relative z-10 pb-16 px-4 pointer-events-auto">
                {/* User info and description */}
                <div className="mb-3">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-9 w-9 border-2 border-white">
                      <AvatarImage src={reel.avatar} alt={reel.username} />
                      <AvatarFallback>{reel.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="ml-2 font-semibold text-white">@{reel.username}</span>
                    <Button variant="default" size="sm" className="ml-2 bg-red-500 hover:bg-red-600 text-white text-xs h-7 px-3 rounded-full">
                      Follow
                    </Button>
                  </div>
                  
                  <p className="text-white mb-3 text-sm">
                    {reel.description}
                  </p>
                </div>
                
                {/* Product info */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center mb-4">
                  <img 
                    src={reel.productImage} 
                    alt={reel.productName}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="ml-3 flex-1">
                    <p className="text-white text-sm font-medium">{reel.productName}</p>
                    <p className="text-red-400 font-bold">{reel.productPrice}</p>
                  </div>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 h-8 rounded-full">
                    Buy
                  </Button>
                </div>
              </div>
              
              {/* Right side action buttons - positioned near the bottom */}
              <div className="absolute bottom-24 right-3 flex flex-col items-center space-y-6 pointer-events-auto">
                <button onClick={toggleMute} className="flex flex-col items-center">
                  {isMuted ? (
                    <div className="rounded-full bg-black/30 p-2">
                      <VolumeX className="h-6 w-6 text-white" />
                    </div>
                  ) : (
                    <div className="rounded-full bg-black/30 p-2">
                      <Volume2 className="h-6 w-6 text-white" />
                    </div>
                  )}
                </button>
                
                <button className="flex flex-col items-center">
                  <div className="rounded-full bg-black/30 p-2">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xs mt-1">{reel.likes}</span>
                </button>
                
                <button className="flex flex-col items-center">
                  <div className="rounded-full bg-black/30 p-2">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xs mt-1">{reel.comments}</span>
                </button>
                
                <button className="flex flex-col items-center">
                  <div className="rounded-full bg-black/30 p-2">
                    <Share className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xs mt-1">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
