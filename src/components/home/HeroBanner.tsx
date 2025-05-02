import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ArrowRight, Clock, Gift, Truck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const banners = [
  { id: 1, image: "/api/placeholder/1200/400?1", color: "from-orange-500 to-red-500" },
  { id: 2, image: "/api/placeholder/1200/400?2", color: "from-cyan-500 to-blue-500" },
  { id: 3, image: "/api/placeholder/1200/400?3", color: "from-orange-400 to-red-400" },
  { id: 4, image: "/api/placeholder/1200/400?4", color: "from-purple-500 to-pink-500" },
  { id: 5, image: "/api/placeholder/1200/400?5", color: "from-green-400 to-teal-500" },
  { id: 6, image: "/api/placeholder/1200/400?6", color: "from-yellow-400 to-orange-500" }
];

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
  const progressIntervalRef = useRef(null);
  const slideDuration = 5000;

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

  useEffect(() => {
    startSlideTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [activeIndex]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
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
                    alt={`Banner ${banner.id}`}
                    className="w-full h-full object-cover"
                  />
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