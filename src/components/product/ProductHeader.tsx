import React, { useState, useEffect } from "react";
import { ShoppingCart, Eye, Heart, Share, ChevronLeft, Search } from "lucide-react";

// Hook to track scroll position and progress
const useScrollProgress = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset || 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // You can easily adjust this max value - here 120 is a nice mobile-friendly threshold.
  const maxScroll = 120;
  const progress = Math.min(scrollY / maxScroll, 1);

  return { scrollY, progress };
};

const ProductHeader = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { progress } = useScrollProgress();
  const [searchQuery, setSearchQuery] = useState("");
  
  // LiveBadge component with aligned sizing
  const LiveBadge = () => {
    const [viewerCount, setViewerCount] = useState(324);
    const [pulsing, setPulsing] = useState(false);

    // Simulate fluctuating viewer count
    useEffect(() => {
      const interval = setInterval(() => {
        const change = Math.floor(Math.random() * 7) - 3;
        setViewerCount(prev => Math.max(1, prev + change));
        setPulsing(true);
        setTimeout(() => setPulsing(false), 1000);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="backdrop-blur-sm h-7 rounded-full px-2.5 flex items-center transition-all duration-700"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${0.1 + (progress * 0.85)})`,
          backdropFilter: `blur(${4 + (progress * 4)}px)`
        }}>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            <div className="relative w-1.5 h-1.5">
              <div className="absolute inset-0 rounded-full bg-orange-500 shadow-lg transition-all duration-700"
                style={{boxShadow: `0 0 ${6 + (progress * 2)}px rgba(249, 115, 22, ${0.5 - (progress * 0.2)})`}}></div>
              <div className={`absolute inset-0 rounded-full bg-orange-500 ${pulsing ? 'animate-ping opacity-60' : 'opacity-0'} transition-all duration-700`}></div>
            </div>
            <span className="text-xs uppercase font-medium tracking-widest transition-all duration-700"
              style={{
                color: progress > 0.5 ? `rgba(75, 85, 99, ${0.7 + (progress * 0.3)})` : `rgba(255, 255, 255, ${0.9 - (progress * 0.3)})`,
                textShadow: `0 0 ${8 - (progress * 8)}px rgba(0, 0, 0, 0.2)`
              }}>live</span>
          </div>
          <div className="mx-1 h-2.5 w-px transition-all duration-700"
            style={{
              backgroundColor: progress > 0.5 
                ? `rgba(75, 85, 99, ${0.2 + (progress * 0.1)})` 
                : `rgba(255, 255, 255, ${0.2 + (progress * 0.1)})`
            }}></div>
          <div className="flex items-center gap-1">
            <Eye 
              className="w-3 h-3 transition-all duration-700" 
              style={{
                color: progress > 0.5 
                  ? `rgba(75, 85, 99, ${0.6 + (progress * 0.3)})` 
                  : `rgba(255, 255, 255, ${0.7 - (progress * 0.2)})`
              }} 
              strokeWidth={2} 
            />
            <span className="text-xs font-medium transition-all duration-700"
              style={{
                color: progress > 0.5 
                  ? `rgba(75, 85, 99, ${0.7 + (progress * 0.3)})` 
                  : `rgba(255, 255, 255, ${0.8 - (progress * 0.2)})`
              }}>{viewerCount}</span>
          </div>
        </div>
      </div>
    );
  };

  // Search bar component
  const SearchBar = () => {
    return (
      <div className="relative flex-1 max-w-xs">
        <div className="relative flex items-center h-7 rounded-full transition-all duration-700"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${0.2 + (progress * 0.8)})`,
            boxShadow: `0 2px 4px rgba(0, 0, 0, ${0.02 + (progress * 0.03)})`
          }}>
          <div className="absolute left-2 flex items-center justify-center">
            <Search 
              size={14} 
              className="transition-all duration-700"
              style={{
                color: `rgba(75, 85, 99, ${0.5 + (progress * 0.3)})`
              }}
              strokeWidth={2}
            />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products"
            className="bg-transparent w-full h-full pl-7 pr-3 py-1 text-sm rounded-full outline-none transition-all duration-700"
            style={{
              color: `rgba(75, 85, 99, ${0.8 + (progress * 0.2)})`,
              caretColor: "#f97316"
            }}
          />
        </div>
      </div>
    );
  };

  // Back button
  const BackButton = () => (
    <div className="rounded-full transition-all duration-700 overflow-hidden"
      style={{backgroundColor: `rgba(0, 0, 0, ${0.1 * (1 - progress)})`}}>
      <button className="h-7 w-7 rounded-full flex items-center justify-center transition-all duration-700"
        style={{
          backgroundColor: progress > 0.5 ? `rgba(243, 244, 246, ${(progress - 0.5) * 0.4})` : 'transparent'
        }}>
        <ChevronLeft 
          className="transition-all duration-700"
          style={{
            color: progress > 0.5 ? `rgba(75, 85, 99, ${0.7 + (progress * 0.3)})` : `rgba(255, 255, 255, ${0.9 - (progress * 0.2)})`
          }}
          strokeWidth={2} 
          size={18} 
        />
      </button>
    </div>
  );

  return (
    <div className="py-2 px-3 w-full fixed top-0 left-0 right-0 z-30 transition-all duration-700"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${progress * 0.95})`,
        backdropFilter: `blur(${progress * 8}px)`,
        boxShadow: `0 ${progress * 4}px ${progress * 8}px rgba(0, 0, 0, ${progress * 0.08})`
      }}>
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2 flex-1">
          <BackButton />
          {progress < 0.5 ? <LiveBadge /> : <SearchBar />}
        </div>
        
        <div className="flex gap-2">
          <div className="rounded-full transition-all duration-700"
            style={{backgroundColor: `rgba(0, 0, 0, ${0.1 * (1 - progress)})`}}>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="h-7 w-7 rounded-full flex items-center justify-center transition-all duration-700"
              style={{
                backgroundColor: progress > 0.5 && !isFavorite ? `rgba(243, 244, 246, ${(progress - 0.5) * 0.4})` : 'transparent'
              }}
            >
              <Heart 
                className="transition-all duration-700"
                style={{
                  fill: isFavorite ? '#f97316' : 'transparent',
                  color: isFavorite ? '#f97316' : progress > 0.5 ? `rgba(75, 85, 99, ${0.7 + (progress * 0.3)})` : `rgba(255, 255, 255, ${0.9 - (progress * 0.3)})`
                }}
                strokeWidth={1.5}
                size={18}
              />
            </button>
          </div>
          
          <div className="rounded-full transition-all duration-700"
            style={{backgroundColor: `rgba(0, 0, 0, ${0.1 * (1 - progress)})`}}>
            <button 
              className="h-7 w-7 rounded-full flex items-center justify-center transition-all duration-700"
              style={{
                backgroundColor: progress > 0.5 ? `rgba(243, 244, 246, ${(progress - 0.5) * 0.4})` : 'transparent'
              }}
            >
              <Share 
                className="transition-all duration-700"
                style={{
                  color: progress > 0.5 ? `rgba(75, 85, 99, ${0.7 + (progress * 0.3)})` : `rgba(255, 255, 255, ${0.9 - (progress * 0.3)})`
                }}
                strokeWidth={1.5} 
                size={18} 
              />
            </button>
          </div>
          
          <div className="rounded-full">
            <button 
              className="h-7 w-7 rounded-full flex items-center justify-center transition-all duration-700 bg-orange-500"
              style={{
                transform: `scale(${1 + (progress * 0.05)})`,
                boxShadow: `0 ${2 + (progress * 2)}px ${4 + (progress * 4)}px rgba(0, 0, 0, ${0.1 + (progress * 0.1)})`
              }}
            >
              <ShoppingCart 
                className="transition-all duration-700"
                style={{
                  color: 'white',
                  transform: `scale(${1 - (progress * 0.05)})`
                }}
                strokeWidth={1.5} 
                size={17} 
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
