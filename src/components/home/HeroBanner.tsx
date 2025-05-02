import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ArrowRight, Truck, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const banners = [
  {
    id: 1,
    title: "MEGA SALE",
    subtitle: "Up to 70% OFF on thousands of items",
    image: "https://placehold.co/1200x400/FF6B6B/FFF?text=MEGA+SALE",
    color: "from-orange-500 to-red-500",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "NEW ARRIVALS",
    subtitle: "Fresh tech and trending products",
    image: "https://placehold.co/1200x400/4ECDC4/FFF?text=NEW+ARRIVALS",
    color: "from-cyan-500 to-blue-500",
    cta: "Discover"
  },
  {
    id: 3,
    title: "FLASH DEALS",
    subtitle: "Time-limited offers - Hurry!",
    image: "https://placehold.co/1200x400/FF9A8B/FFF?text=FLASH+DEALS",
    color: "from-orange-400 to-red-400",
    cta: "Grab Deals"
  }
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPromo, setShowPromo] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative">
        <Carousel
          className="w-full"
          setApi={(api) => {
            api?.on("select", () => {
              const selectedIndex = api.selectedScrollSnap();
              setActiveIndex(selectedIndex);
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
              <CarouselPrevious className="left-6 bg-white/80 hover:bg-white hidden md:flex" />
              <CarouselNext className="right-6 bg-white/80 hover:bg-white hidden md:flex" />
            </>
          )}
        </Carousel>

        {/* Indicators */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`h-1 rounded-full transition-all ${
                activeIndex === index ? "bg-orange-500 w-5" : "bg-gray-300 w-2.5"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Ultra-sleek promotional banner */}
      {showPromo && (
        <div className="relative bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 shadow-md">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2 text-sm md:text-base font-medium text-black">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
              <span>
                Free shipping on orders over <strong>$50</strong>. Limited time only!
              </span>
              <a href="/promos/free-shipping" className="ml-2 text-blue-700 underline hover:text-blue-900 transition-colors">
                Learn more
              </a>
            </div>
            <button
              onClick={() => setShowPromo(false)}
              className="p-1 rounded-full hover:bg-black/5 transition"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}