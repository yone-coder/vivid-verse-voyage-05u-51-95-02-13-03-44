import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Clock, Gift, Truck } from "lucide-react";
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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
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
                        Don’t miss out on amazing savings.
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

      {/* Promo Items */}
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