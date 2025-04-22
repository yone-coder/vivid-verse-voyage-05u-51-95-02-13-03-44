
import React, { useState, useEffect } from "react";
import { ShoppingCart, Eye, Heart, Share, ChevronLeft, Search } from "lucide-react";

const ProductHeader = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  // LiveBadge component with aligned sizing
  const LiveBadge = () => {
    const [viewerCount, setViewerCount] = useState(324);
    const [pulsing, setPulsing] = useState(false);
  
    // Simulate fluctuating viewer count
    useEffect(() => {
      const interval = setInterval(() => {
        const change = Math.floor(Math.random() * 7) - 3; // Random number between -3 and 3
        setViewerCount(prev => Math.max(1, prev + change));
        
        // Trigger pulse animation
        setPulsing(true);
        setTimeout(() => setPulsing(false), 1000);
      }, 3000);
      
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="backdrop-blur-sm h-7 rounded-full px-2.5 flex items-center transition-all duration-700"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${0.1 + (scrollProgress * 0.85)})`,
          backdropFilter: `blur(${4 + (scrollProgress * 4)}px)`
        }}>
        <div className="flex items-center gap-1.5">
          {/* Live indicator with color that adapts to state */}
          <div className="flex items-center gap-1">
            {/* Pulsing dot with adaptive color */}
            <div className="relative w-1.5 h-1.5">
              <div className="absolute inset-0 rounded-full bg-orange-500 shadow-lg transition-all duration-700"
                style={{boxShadow: `0 0 ${6 + (scrollProgress * 2)}px rgba(249, 115, 22, ${0.5 - (scrollProgress * 0.2)})`}}></div>
              <div className={`absolute inset-0 rounded-full bg-orange-500 ${pulsing ? 'animate-ping opacity-60' : 'opacity-0'} transition-all duration-700`}></div>
            </div>
            
            {/* Live text with adaptive color */}
            <span className="text-xs uppercase font-medium tracking-widest transition-all duration-700"
              style={{
                color: scrollProgress > 0.5 ? `rgba(75, 85, 99, ${0.7 + (scrollProgress * 0.3)})` : `rgba(255, 255, 255, ${0.9 - (scrollProgress * 0.3)})`,
                textShadow: `0 0 ${8 - (scrollProgress * 8)}px rgba(0, 0, 0, 0.2)`
              }}>live</span>
          </div>
          
          {/* Subtle separator with adaptive color */}
          <div className="mx-1 h-2.5 w-px transition-all duration-700"
            style={{
              backgroundColor: scrollProgress > 0.5 
                ? `rgba(75, 85, 99, ${0.2 + (scrollProgress * 0.1)})` 
                : `rgba(255, 255, 255, ${0.2 + (scrollProgress * 0.1)})`
            }}></div>
          
          {/* Viewer count with adaptive color */}
          <div className="flex items-center gap-1">
            <Eye 
              className="w-3 h-3 transition-all duration-700" 
              style={{
                color: scrollProgress > 0.5 
                  ? `rgba(75, 85, 99, ${0.6 + (scrollProgress * 0.3)})` 
                  : `rgba(255, 255, 255, ${0.7 - (scrollProgress * 0.2)})`
              }} 
              strokeWidth={2} 
            />
            <span className="text-xs font-medium transition-all duration-700"
              style={{
                color: scrollProgress > 0.5 
                  ? `rgba(75, 85, 99, ${0.7 + (scrollProgress * 0.3)})` 
                  : `rgba(255, 255, 255, ${0.8 - (scrollProgress * 0.2)})`
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
            backgroundColor: `rgba(243, 244, 246, ${0.2 + (scrollProgress * 0.8)})`,
            boxShadow: `0 2px 4px rgba(0, 0, 0, ${0.02 + (scrollProgress * 0.03)})`
          }}>
          <div className="absolute left-2 flex items-center justify-center">
            <Search 
              size={14} 
              className="transition-all duration-700"
              style={{
                color: `rgba(75, 85, 99, ${0.5 + (scrollProgress * 0.3)})`
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
              color: `rgba(75, 85, 99, ${0.8 + (scrollProgress * 0.2)})`,
              caretColor: "#f97316"
            }}
          />
        </div>
      </div>
    );
  };
  
  // Simulate scroll effects for preview with smooth transition
  useEffect(() => {
    const toggleScroll = () => {
      // Start the animation
      const duration = 1500; // 1.5 second transition for smoother effect
      const startTime = Date.now();
      const startValue = isScrolled ? 1 : 0;
      const endValue = isScrolled ? 0 : 1;
      
      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth transition (ease-in-out)
        const easedProgress = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        setScrollProgress(startValue + (endValue - startValue) * easedProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animateProgress);
        } else {
          setIsScrolled(!isScrolled);
        }
      };
      
      requestAnimationFrame(animateProgress);
    };
    
    // Initial animation after component mount
    setTimeout(toggleScroll, 1000);
    
    // Set up interval for continuous animation
    const interval = setInterval(toggleScroll, 5000);
    return () => clearInterval(interval);
  }, [isScrolled]);

  // Back button with proper icon
  const BackButton = () => (
    <div className="rounded-full transition-all duration-700 overflow-hidden"
      style={{backgroundColor: `rgba(255, 255, 255, ${0.1 * (1 - scrollProgress)})`}}>
      <button className="h-7 w-7 rounded-full flex items-center justify-center transition-all duration-700"
        style={{
          backgroundColor: scrollProgress > 0.5 ? `rgba(243, 244, 246, ${(scrollProgress - 0.5) * 0.4})` : 'transparent'
        }}>
        <ChevronLeft 
          className="transition-all duration-700"
          style={{
            color: scrollProgress > 0.5 ? `rgba(75, 85, 99, ${0.7 + (scrollProgress * 0.3)})` : `rgba(255, 255, 255, ${0.9 - (scrollProgress * 0.2)})`
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
        backgroundColor: `rgba(255, 255, 255, ${scrollProgress * 0.95})`,
        backdropFilter: `blur(${scrollProgress * 8}px)`,
        boxShadow: `0 ${scrollProgress * 4}px ${scrollProgress * 8}px rgba(0, 0, 0, ${scrollProgress * 0.08})`
      }}>
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2 flex-1">
          <BackButton />
          {scrollProgress < 0.5 ? <LiveBadge /> : <SearchBar />}
        </div>
        
        <div className="flex gap-2">
          <div className="rounded-full transition-all duration-700"
            style={{backgroundColor: `rgba(255, 255, 255, ${0.1 * (1 - scrollProgress)})`}}>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="h-7 w-7 rounded-full flex items-center justify-center transition-all duration-700"
              style={{
                backgroundColor: scrollProgress > 0.5 && !isFavorite ? `rgba(243, 244, 246, ${(scrollProgress - 0.5) * 0.4})` : 'transparent'
              }}
            >
              <Heart 
                className="transition-all duration-700"
                style={{
                  fill: isFavorite ? '#f97316' : 'transparent',
                  color: isFavorite ? '#f97316' : scrollProgress > 0.5 ? `rgba(75, 85, 99, ${0.7 + (scrollProgress * 0.3)})` : `rgba(255, 255, 255, ${0.9 - (scrollProgress * 0.3)})`
                }}
                strokeWidth={1.5}
                size={18}
              />
            </button>
          </div>
          
          <div className="rounded-full transition-all duration-700"
            style={{backgroundColor: `rgba(255, 255, 255, ${0.1 * (1 - scrollProgress)})`}}>
            <button 
              className="h-7 w-7 rounded-full flex items-center justify-center transition-all duration-700"
              style={{
                backgroundColor: scrollProgress > 0.5 ? `rgba(243, 244, 246, ${(scrollProgress - 0.5) * 0.4})` : 'transparent'
              }}
            >
              <Share 
                className="transition-all duration-700"
                style={{
                  color: scrollProgress > 0.5 ? `rgba(75, 85, 99, ${0.7 + (scrollProgress * 0.3)})` : `rgba(255, 255, 255, ${0.9 - (scrollProgress * 0.3)})`
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
                transform: `scale(${1 + (scrollProgress * 0.05)})`,
                boxShadow: `0 ${2 + (scrollProgress * 2)}px ${4 + (scrollProgress * 4)}px rgba(0, 0, 0, ${0.1 + (scrollProgress * 0.1)})`
              }}
            >
              <ShoppingCart 
                className="transition-all duration-700"
                style={{
                  color: 'white',
                  transform: `scale(${1 - (scrollProgress * 0.05)})`
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
