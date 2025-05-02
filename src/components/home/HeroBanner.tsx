import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ArrowRight, Clock, Gift, Truck, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const banners = [
  {
    id: 1,
    title: "MEGA SALE",
    subtitle: "Up to 70% OFF on thousands of items",
    image: "/api/placeholder/1200/400",
    color: "from-orange-500 to-red-500",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "NEW ARRIVALS",
    subtitle: "Fresh tech and trending products",
    image: "/api/placeholder/1200/400",
    color: "from-cyan-500 to-blue-500",
    cta: "Discover"
  },
  {
    id: 3,
    title: "FLASH DEALS",
    subtitle: "Time-limited offers - Hurry!",
    image: "/api/placeholder/1200/400",
    color: "from-orange-400 to-red-400",
    cta: "Grab Deals"
  }
];

// AliExpress-style promo items
const promoItems = [
  { id: 1, icon: <Truck className="w-3.5 h-3.5 text-orange-500" />, text: "Free Shipping" },
  { id: 2, icon: <Gift className="w-3.5 h-3.5 text-pink-500" />, text: "New User Bonus" },
  { id: 3, icon: <Clock className="w-3.5 h-3.5 text-blue-500" />, text: "24h Flash Deals" },
  { id: 4, icon: <ArrowRight className="w-3.5 h-3.5 text-purple-500" />, text: "View All" }
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPromo, setShowPromo] = useState(true);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();
  const intervalRef = useRef(null);
  const animationRef = useRef(null);
  const slideDuration = 5000; // 5 seconds per slide
  
  const resetSlideTimer = () => {
    // Clear existing timers
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    
    // Reset progress
    setProgress(0);
    
    // Animation for progress
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min(100, (elapsed / slideDuration) * 100);
      setProgress(newProgress);
      
      if (elapsed < slideDuration) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Setup next slide timer
    intervalRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, slideDuration);
  };

  useEffect(() => {
    resetSlideTimer();
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [activeIndex]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    resetSlideTimer();
  };

  return (
    <>
      <div className="relative">
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
                <div className="relative h-[180px] md:h-[250px] lg:h-[300px] overflow-hidden rounded-none">
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-30`} />
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                      <div className="max-w-lg">
                        <h2 className="text-xl md:text-3xl font-extrabold text-white mb-0.5 md:mb-2 drop-shadow-md">
                          {banner.title}
                        </h2>
                        <p className="text-white text-xs md:text-base mb-2 md:mb-4 max-w-md drop-shadow-md font-medium">
                          {banner.subtitle}
                        </p>
                        <Button className="bg-white text-black hover:bg-gray-100 font-medium text-xs md:text-sm rounded-full h-7 md:h-auto">
                          {banner.cta}
                          <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 ml-1" />
                        </Button>
                      </div>
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

        {/* Animated Indicators */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {banners.map((_, index) => (
            <button
              key={index}
              className="relative h-1 rounded-full bg-gray-300 w-5 overflow-hidden"
              onClick={() => handleDotClick(index)}
            >
              {/* Background for inactive dots */}
              <div className="absolute inset-0 bg-gray-300 rounded-full"></div>
              
              {/* Animated fill for active dot */}
              {activeIndex === index && (
                <div 
                  className="absolute inset-0 bg-orange-500 rounded-full origin-left"
                  style={{
                    width: `${progress}%`,
                    transition: 'width 0.1s linear'
                  }}
                ></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* AliExpress-Style Promotional Banner - Single Row, Mobile-Friendly */}
      {showPromo && (
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-screen-xl mx-auto px-2">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex items-center py-2 min-w-max">
                {promoItems.map((item, index) => (
                  <a 
                    key={item.id}
                    href="#"
                    className={`flex items-center flex-shrink-0 ${
                      index < promoItems.length - 1 
                        ? "pr-3 mr-3 border-r border-gray-200" 
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="text-xs font-medium text-gray-700">{item.text}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}