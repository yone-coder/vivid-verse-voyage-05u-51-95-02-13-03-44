import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Clock,
  Newspaper,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

const banners = [
  { id: 1, color: "from-orange-500 to-red-500", text: "Hot Deals" },
  { id: 2, color: "from-cyan-500 to-blue-500", text: "Fresh Drops" },
  { id: 3, color: "from-purple-500 to-pink-500", text: "Limited Time" },
  { id: 4, color: "from-green-400 to-teal-500", text: "Eco Picks" },
  { id: 5, color: "from-yellow-400 to-orange-500", text: "Top Rated" },
  { id: 6, color: "from-indigo-400 to-blue-700", text: "Editor's Choice" }
];

const newsItems = [
  { id: 1, icon: <AlertCircle className="w-3 h-3 text-white" />, text: "FLASH SALE: 30% OFF ALL ELECTRONICS TODAY ONLY!", color: "bg-red-600" },
  { id: 2, icon: <TrendingUp className="w-3 h-3 text-white" />, text: "NEW USER BONUS: GET ¥50 OFF YOUR FIRST ORDER", color: "bg-orange-500" },
  { id: 3, icon: <Clock className="w-3 h-3 text-white" />, text: "24H DEALS: UP TO 70% OFF BESTSELLERS", color: "bg-blue-600" },
  { id: 4, icon: <Newspaper className="w-3 h-3 text-white" />, text: "FREE SHIPPING ON ORDERS OVER ¥199", color: "bg-purple-600" }
];

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [newsAnimation, setNewsAnimation] = useState('idle'); // 'idle', 'slide-out', 'slide-in'
  const [nextNewsIndex, setNextNewsIndex] = useState(1);
  
  const isMobile = useState(false)[0]; // Simplified for demo
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const newsTimeoutRef = useRef(null);

  const slideDuration = 5000;
  const newsDisplayDuration = 5000;
  const newsTransitionDuration = 500; // ms for the slide animation

  // Slide banners
  const startSlideTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    setProgress(0);
    const step = (50 / slideDuration) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + step));
    }, 50);

    intervalRef.current = setInterval(() => {
      setProgress(0);
      setActiveIndex((current) => (current + 1) % banners.length);
    }, slideDuration);
  };

  useEffect(() => {
    startSlideTimer();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (newsTimeoutRef.current) clearTimeout(newsTimeoutRef.current);
    };
  }, [activeIndex]);

  // News vertical slide animation
  useEffect(() => {
    const rotateNews = () => {
      // Calculate next news index
      const nextIdx = (currentNewsIndex + 1) % newsItems.length;
      setNextNewsIndex(nextIdx);
      
      // Start slide-out animation
      setNewsAnimation('slide-out');
      
      // After slide-out animation completes, change content and start slide-in
      newsTimeoutRef.current = setTimeout(() => {
        setCurrentNewsIndex(nextIdx);
        setNewsAnimation('slide-in');
        
        // Reset to idle state after slide-in completes
        newsTimeoutRef.current = setTimeout(() => {
          setNewsAnimation('idle');
        }, newsTransitionDuration);
        
      }, newsTransitionDuration);
    };
    
    const intervalId = setInterval(rotateNews, newsDisplayDuration);
    
    return () => {
      clearInterval(intervalId);
      if (newsTimeoutRef.current) clearTimeout(newsTimeoutRef.current);
    };
  }, [currentNewsIndex]);

  const handleDotClick = (index) => setActiveIndex(index);

  // Get animation classes based on current state
  const getNewsAnimationClass = () => {
    switch (newsAnimation) {
      case 'slide-out':
        return '-translate-y-full';
      case 'slide-in':
      case 'idle':
      default:
        return 'translate-y-0';
    }
  };

  // Current and next news items
  const currentNews = newsItems[currentNewsIndex];
  const nextNews = newsItems[nextNewsIndex];

  // Simplified carousel for demo
  const renderCarousel = () => (
    <div className="w-full">
      <div className="flex transition-transform duration-500">
        <div className="flex-shrink-0 w-full">
          <div className={`relative h-[180px] md:h-[250px] lg:h-[300px] flex items-center bg-gradient-to-r ${banners[activeIndex].color}`}>
            <div className="container mx-auto px-4">
              <div className="max-w-lg">
                <h2 className="text-xl md:text-3xl font-extrabold text-white mb-0.5 md:mb-2 drop-shadow-md">
                  {banners[activeIndex].text}
                </h2>
                <p className="text-white text-xs md:text-base mb-2 md:mb-4 max-w-md drop-shadow-md font-medium">
                  Don't miss out on amazing savings.
                </p>
                <button className="px-4 py-2 bg-white text-black font-medium text-xs md:text-sm rounded-full h-7 md:h-auto flex items-center">
                  Shop Now
                  <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {!isMobile && (
        <>
          <button 
            className="absolute top-1/2 -translate-y-1/2 left-6 p-2 rounded-full bg-white/80 hover:bg-white hidden md:flex" 
            onClick={() => setActiveIndex((current) => (current - 1 + banners.length) % banners.length)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3L4 7.5L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="absolute top-1/2 -translate-y-1/2 right-6 p-2 rounded-full bg-white/80 hover:bg-white hidden md:flex" 
            onClick={() => setActiveIndex((current) => (current + 1) % banners.length)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 3L11 7.5L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}
    </div>
  );

  return (
    <>
      <div className="relative">
        {renderCarousel()}

        {/* Dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {banners.map((_, index) => (
            <button
              key={index}
              className="relative h-1 rounded-full bg-gray-300 w-5 overflow-hidden"
              onClick={() => handleDotClick(index)}
            >
              <div className="absolute inset-0 bg-gray-300 rounded-full" />
              {activeIndex === index && (
                <div
                  className="absolute inset-0 bg-orange-500 rounded-full origin-left"
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.05s linear"
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* News Vertical Slide Animation */}
      <div className="h-7 overflow-hidden relative">
        {/* Container for current news with vertical animation */}
        <div 
          className={`flex items-center h-7 px-3 ${currentNews.color} transition-transform duration-500 ${getNewsAnimationClass()}`} 
          style={{ transitionDuration: `${newsTransitionDuration}ms` }}
        >
          <span className="mr-1">{currentNews.icon}</span>
          <span className="text-xs font-medium text-white truncate">
            {currentNews.text}
          </span>
        </div>
        
        {/* Next news item, showing when current is sliding out */}
        {newsAnimation === 'slide-out' && (
          <div 
            className={`flex items-center h-7 px-3 ${nextNews.color} absolute top-full left-0 right-0 w-full transition-transform duration-500 -translate-y-full`}
            style={{ transitionDuration: `${newsTransitionDuration}ms` }}
          >
            <span className="mr-1">{nextNews.icon}</span>
            <span className="text-xs font-medium text-white truncate">
              {nextNews.text}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default HeroBanner;