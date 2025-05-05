
import React, { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Heart, MessageSquare, Share, Volume2, VolumeX } from "lucide-react";
import ReelsSkeleton from "@/components/skeletons/ReelsSkeleton";

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
      {/* No header here, removed AliExpressHeader */}
      
      {/* Categories header */}
      <div className="bg-black sticky top-0 z-10 border-b border-gray-800">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-3">
          <div className="whitespace-nowrap px-3 py-1 bg-red-500 rounded-full text-white text-sm font-medium">
            For You
          </div>
          <div className="whitespace-nowrap px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm font-medium">
            Following
          </div>
          <div className="whitespace-nowrap px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm font-medium">
            Tech
          </div>
          <div className="whitespace-nowrap px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm font-medium">
            Kitchen
          </div>
          <div className="whitespace-nowrap px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm font-medium">
            Beauty
          </div>
        </div>
      </div>
      
      {/* Reels container - full screen snapping vertical scroll */}
      <div className="w-full h-[calc(100vh-104px)] overflow-y-scroll snap-y snap-mandatory">
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
            
            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {/* Top gradient overlay */}
              <div className="bg-gradient-to-b from-black/50 to-transparent h-16" />
              
              {/* Bottom gradient overlay with content */}
              <div className="bg-gradient-to-t from-black/80 to-transparent pt-10">
                {/* User info and description */}
                <div className="px-4 pb-20">
                  <div className="flex items-center">
                    <img 
                      src={reel.avatar} 
                      alt={reel.username}
                      className="w-9 h-9 rounded-full border-2 border-white"
                    />
                    <span className="ml-2 font-semibold text-white">@{reel.username}</span>
                    <button className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                      Follow
                    </button>
                  </div>
                  
                  <p className="text-white mt-2 text-sm">
                    {reel.description}
                  </p>
                  
                  {/* Product info */}
                  <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
                    <img 
                      src={reel.productImage} 
                      alt={reel.productName}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="ml-3">
                      <p className="text-white text-sm font-medium">{reel.productName}</p>
                      <p className="text-red-400 font-bold">{reel.productPrice}</p>
                    </div>
                    <button className="ml-auto bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Side actions */}
              <div className="absolute bottom-24 right-2 flex flex-col items-center space-y-6">
                <button onClick={toggleMute} className="flex flex-col items-center">
                  {isMuted ? (
                    <div className="bg-black/50 p-2 rounded-full">
                      <VolumeX className="h-6 w-6 text-white" />
                    </div>
                  ) : (
                    <div className="bg-black/50 p-2 rounded-full">
                      <Volume2 className="h-6 w-6 text-white" />
                    </div>
                  )}
                </button>
                
                <button className="flex flex-col items-center">
                  <div className="bg-black/50 p-2 rounded-full">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xs mt-1">{reel.likes}</span>
                </button>
                
                <button className="flex flex-col items-center">
                  <div className="bg-black/50 p-2 rounded-full">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xs mt-1">{reel.comments}</span>
                </button>
                
                <button className="flex flex-col items-center">
                  <div className="bg-black/50 p-2 rounded-full">
                    <Share className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xs mt-1">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom padding to account for the navigation bar - ensures content doesn't get hidden */}
      <div className="h-16"></div>
    </div>
  );
}
