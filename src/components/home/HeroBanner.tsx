import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Clock, Newspaper, AlertCircle, TrendingUp, ChevronUp, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const banners = [
  { id: 1, color: "from-orange-500 to-red-500", text: "Hot Deals" },
  { id: 2, color: "from-cyan-500 to-blue-500", text: "Fresh Drops" },
  { id: 3, color: "from-purple-500 to-pink-500", text: "Limited Time" },
  { id: 4, color: "from-green-400 to-teal-500", text: "Eco Picks" },
  { id: 5, color: "from-yellow-400 to-orange-500", text: "Top Rated" },
  { id: 6, color: "from-indigo-400 to-blue-700", text: "Editor's Choice" }
];

const newsItems = [
  { id: 1, icon: <AlertCircle className="w-3 h-3 text-white" />, text: "FLASH SALE: 30% OFF ALL ELECTRONICS TODAY ONLY!" },
  { id: 2, icon: <TrendingUp className="w-3 h-3 text-white" />, text: "NEW USER BONUS: GET ¥50 OFF YOUR FIRST ORDER" },
  { id: 3, icon: <Clock className="w-3 h-3 text-white" />, text: "24H DEALS: UP TO 70% OFF BESTSELLERS" },
  { id: 4, icon: <Newspaper className="w-3 h-3 text-white" />, text: "FREE SHIPPING ON ORDERS OVER ¥199" }
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNews, setShowNews] = useState(true);
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();
  const intervalRef = useRef(null);
  const newsIntervalRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const slideDuration = 5000;
  const newsDuration = 4000;

  const startSlideTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setProgress(0);
    const progressStep = (50 / slideDuration) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 100 : prev + progressStep));
    }, 50);

    intervalRef.current = setInterval(() => {
      setProgress(0);
      setActiveIndex(current => (current + 1) % banners.length);
    }, slideDuration);
  };

  const startNewsTimer = () => {
    if (newsIntervalRef.current) clearInterval(newsIntervalRef.current);
    
    newsIntervalRef.current = setInterval(() => {
      setActiveNewsIndex(current => (current + 1) % newsItems.length);
    }, newsDuration);
  };

  useEffect(() => {
    startSlideTimer();
    startNewsTimer();
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (newsIntervalRef.current) clearInterval(newsIntervalRef.current);
    };
  }, [activeIndex]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  // Removed handleNewsNavigation as we no longer have navigation arrows

  return (
    <>
      <div className={`relative bg-gradient-to-r ${banners[activeIndex].color} transition-colors duration-500`}>
        <Carousel
          className="w-full"
          currentIndex={activeIndex}
          setApi={(api) => {
            api?.on("select", () => {
              const selectedIndex = api.selectedScrollSnap();
              if (selectedIndex !== activeIndex) {
                setActiveIndex(selectedIndex);
              }
            });
          }}
        >
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className="relative h-[180px] md:h-[250px] lg:h-[300px] flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-lg">
                      <h2 className="text-xl md:text-3xl font-extrabold text-white mb-0.5 md:mb-2 drop-shadow-md">
                        {banner.text}
                      </h2>
                      <p className="text-white text-xs md:text-base mb-2 md:mb-4 max-w-md drop-shadow-md font-medium">
                        Don't miss out on amazing savings.
                      </p>
                      <Button className="bg-white text-black hover:bg-gray-100 font-medium text-xs md:text-sm rounded-full h-7 md:h-auto">
                        Shop Now
                        <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {!isMobile && (
            <>
              <CarouselPrevious 
                className="left-6 bg-white/80 hover:bg-white hidden md:flex"
                onClick={() => {
                  setActiveIndex((current) => (current - 1 + banners.length) % banners.length);
                }}
              />
              <CarouselNext 
                className="right-6 bg-white/80 hover:bg-white hidden md:flex"
                onClick={() => {
                  setActiveIndex((current) => (current + 1) % banners.length);
                }}
              />
            </>
          )}
        </Carousel>

        {/* Animated Dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {banners.map((_, index) => (
            <button
              key={index}
              className="relative h-1 rounded-full bg-gray-300 w-5 overflow-hidden"
              onClick={() => handleDotClick(index)}
            >
              <div className="absolute inset-0 bg-gray-300 rounded-full"></div>
              {activeIndex === index && (
                <div 
                  className="absolute inset-0 bg-orange-500 rounded-full origin-left"
                  style={{
                    width: `${progress}%`,
                    transition: 'width 0.05s linear'
                  }}
                ></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Sliding News Banner - AliExpress Style */}
      {showNews && (
        <div className="bg-red-50">
          <div className="max-w-screen-xl mx-auto">
            <div className="relative overflow-hidden h-7">
              {newsItems.map((item, index) => {
                // AliExpress-like color schemes
                const bgColors = [
                  "bg-red-600", "bg-orange-500", "bg-blue-600", "bg-purple-600"
                ];
                const bgColor = bgColors[index % bgColors.length];
                
                return (
                  <div 
                    key={item.id}
                    className={`absolute inset-0 flex items-center px-2 transition-transform duration-500 ease-in-out ${bgColor} ${
                      index === activeNewsIndex ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                    }`}
                  >
                    <span className="flex-shrink-0 mr-1">{item.icon}</span>
                    <span className="text-xs font-medium text-white truncate">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}